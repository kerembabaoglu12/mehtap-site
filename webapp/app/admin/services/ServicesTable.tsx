/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useCallback } from 'react';
import { upsertService, deleteService } from '@/app/actions/admin';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { PlusCircle, Pencil, Trash2, Upload, AlertTriangle, CheckCircle2 } from 'lucide-react';

/** Check if a URL is a direct image link vs an Unsplash page link */
function validateImageUrl(url: string): { valid: boolean; warning?: string; converted?: string } {
  if (!url || url.trim() === '') return { valid: true }; // empty = use fallback

  const trimmed = url.trim();

  // Unsplash page URLs (NOT direct images)
  if (trimmed.includes('unsplash.com/photos/') && !trimmed.includes('images.unsplash.com')) {
    // Try to extract the photo ID and convert
    const match = trimmed.match(/unsplash\.com\/photos\/(?:[^/]+-)?([a-zA-Z0-9_-]+)/);
    if (match) {
      const photoId = match[1];
      const directUrl = `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=1200&q=80`;
      return {
        valid: false,
        warning: 'Bu bir Unsplash sayfa linki, doğrudan görsel URL değil. Lütfen Unsplash üzerinde görsele sağ tıklayıp "Resim adresini kopyala" seçeneğini kullanın veya aşağıdaki direkt linki deneyin.',
        converted: directUrl
      };
    }
    return {
      valid: false,
      warning: 'Bu bir Unsplash sayfa linki, doğrudan görsel URL değil. Lütfen görsele sağ tıklayıp "Resim adresini kopyala" yapın.'
    };
  }

  // Check for common image extensions or image hosting
  const isImageUrl = /\.(jpg|jpeg|png|gif|svg|webp|avif|bmp)/i.test(trimmed)
    || trimmed.includes('images.unsplash.com')
    || trimmed.includes('img.')
    || trimmed.includes('/image/')
    || trimmed.includes('cdn.')
    || trimmed.includes('cloudinary.com')
    || trimmed.includes('imgur.com')
    || trimmed.startsWith('data:image/');

  if (!isImageUrl && trimmed.startsWith('http')) {
    return {
      valid: true,
      warning: 'Bu URL bir görsel dosyası olmayabilir. Preview ile kontrol edin.'
    };
  }

  return { valid: true };
}

export default function ServicesTable({ initialData }: { initialData: any[] }) {
  const [services, setServices] = useState<any[]>(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<any>(null);
  const [imageWarning, setImageWarning] = useState<string>('');
  const [imageValid, setImageValid] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = (service: any) => {
    setCurrentService(service);
    setImageWarning('');
    setImageValid(true);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentService({
      id: undefined,
      title: '',
      slug: '',
      short_desc: '',
      content: '',
      icon: '',
      image_url: '',
      order_num: services.length + 1,
      is_active: true
    });
    setImageWarning('');
    setImageValid(true);
    setIsEditing(true);
  };

  const handleImageUrlChange = (url: string) => {
    setCurrentService({ ...currentService, image_url: url });
    const result = validateImageUrl(url);
    setImageValid(result.valid);
    setImageWarning(result.warning || '');
  };

  /** Convert file to data URL for instant preview + storage */
  const handleFileUpload = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Sadece görsel dosyaları yüklenebilir (png, jpg, svg, webp).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Dosya boyutu 5MB\'dan küçük olmalıdır.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setCurrentService((prev: any) => ({ ...prev, image_url: dataUrl }));
      setImageWarning('');
      setImageValid(true);
      toast.success(`${file.name} başarıyla yüklendi.`);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentService) return;

    // Validate image URL before saving
    if (currentService.image_url) {
      const result = validateImageUrl(currentService.image_url);
      if (!result.valid) {
        toast.error('Lütfen geçerli bir görsel URL\'si girin. Unsplash sayfa linkleri desteklenmiyor.');
        return;
      }
    }

    const result = await upsertService(currentService);
    if (result.success) {
      toast.success('Hizmet başarıyla kaydedildi.');
      window.location.reload();
    } else {
      toast.error('Kayıt başarısız: ' + result.error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu hizmeti silmek istediğinize emin misiniz?')) return;
    const result = await deleteService(id);
    if (result.success) {
      toast.success('Hizmet silindi.');
      setServices(services.filter(s => s.id !== id));
    } else {
      toast.error('Silinemedi: ' + result.error);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h3 className="text-xl font-bold mb-4">{currentService?.id ? "Hizmeti Düzenle" : "Yeni Hizmet Ekle"}</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Hizmet Adı</label>
              <input type="text" value={currentService.title} onChange={e => setCurrentService({...currentService, title: e.target.value})} className="w-full border p-2 rounded" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Slug (URL)</label>
              <input type="text" value={currentService.slug} onChange={e => {
                let val = e.target.value.toLowerCase().replace(/ /g, '-');
                while (val.startsWith('/')) val = val.substring(1);
                setCurrentService({...currentService, slug: val});
              }} className="w-full border p-2 rounded" required />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Kısa Açıklama (Ana Sayfa İçin)</label>
            <input type="text" value={currentService.short_desc} onChange={e => setCurrentService({...currentService, short_desc: e.target.value})} className="w-full border p-2 rounded" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tam İçerik Metni (Detay İçin)</label>
            <p className="text-xs text-slate-400 -mt-1">Düz metin yazabilirsiniz. Satır başları, maddeler (- ile başlayan satırlar) ve başlıklar otomatik olarak güzel görünecektir.</p>
            <textarea value={currentService.content || ''} onChange={e => setCurrentService({...currentService, content: e.target.value})} rows={6} className="w-full border p-2 rounded font-mono text-sm"></textarea>
          </div>

          {/* Image Upload Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Hizmet Görseli</label>

              {/* URL Input */}
              <input
                type="text"
                value={currentService.image_url?.startsWith('data:') ? '(Dosya yüklendi)' : (currentService.image_url || '')}
                onChange={e => handleImageUrlChange(e.target.value)}
                className={`w-full border p-2 rounded text-sm ${!imageValid ? 'border-red-400 bg-red-50' : ''}`}
                placeholder="https://images.unsplash.com/photo-... veya boş bırakın"
                readOnly={currentService.image_url?.startsWith('data:')}
              />

              {/* Warning / validation messages */}
              {imageWarning && (
                <div className={`flex items-start gap-2 p-3 rounded-lg text-xs ${!imageValid ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{imageWarning}</span>
                </div>
              )}

              {!imageWarning && currentService.image_url && imageValid && (
                <div className="flex items-center gap-2 text-xs text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Geçerli görsel URL&apos;si</span>
                </div>
              )}

              {!currentService.image_url && (
                <p className="text-xs text-slate-400">Boş bırakırsanız otomatik görsel atanır.</p>
              )}

              {/* Drag & Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`mt-2 border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-red-400 bg-red-50 scale-[1.02]'
                    : 'border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <Upload className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                <p className="text-xs text-slate-500 font-medium">
                  {isDragging ? 'Bırakın...' : 'Görsel sürükleyin veya tıklayarak seçin'}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">PNG, JPEG, SVG, WebP • Max 5MB</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp,image/gif"
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />

              {/* Preview */}
              {currentService.image_url && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">Önizleme:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentService({...currentService, image_url: ''});
                        setImageWarning('');
                        setImageValid(true);
                      }}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Görseli Kaldır
                    </button>
                  </div>
                  <div className="relative w-full h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={currentService.image_url}
                      alt="Önizleme"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const parent = (e.target as HTMLImageElement).parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="flex items-center justify-center h-full text-xs text-red-500">Görsel yüklenemedi — URL geçersiz olabilir</div>';
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sıra No</label>
              <input type="number" value={currentService.order_num} onChange={e => setCurrentService({...currentService, order_num: parseInt(e.target.value)})} className="w-full border p-2 rounded" required />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" id="is_active" checked={currentService.is_active} onChange={e => setCurrentService({...currentService, is_active: e.target.checked})} className="w-5 h-5 rounded border-gray-300" />
            <label htmlFor="is_active" className="font-medium text-slate-700">Aktif olarak göster</label>
          </div>
          
          <div className="flex gap-4 mt-6">
            <Button type="submit" className="bg-slate-900 text-white">Kaydet</Button>
            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>İptal</Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAddNew} className="bg-red-600 hover:bg-red-700 flex items-center gap-2">
          <PlusCircle className="w-4 h-4" /> Yeni Ekle
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b bg-slate-50 text-slate-600 text-sm">
              <th className="py-3 px-4 rounded-tl-lg">Sıra</th>
              <th className="py-3 px-4">Hizmet Adı</th>
              <th className="py-3 px-4">URL (Slug)</th>
              <th className="py-3 px-4 text-center">Görsel</th>
              <th className="py-3 px-4 text-center">Durum</th>
              <th className="py-3 px-4 text-right rounded-tr-lg">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {services.map((sub) => (
              <tr key={sub.id} className="border-b hover:bg-slate-50 transition">
                <td className="py-4 px-4 text-sm font-medium text-slate-400">{sub.order_num}</td>
                <td className="py-4 px-4 font-semibold text-slate-800">{sub.title}</td>
                <td className="py-4 px-4 text-sm text-slate-500 font-mono">/{sub.slug}</td>
                <td className="py-4 px-4 text-center">
                  {sub.image_url ? (
                    <div className="w-12 h-8 rounded overflow-hidden mx-auto border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={sub.image_url} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=60&q=40'; }} />
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400">—</span>
                  )}
                </td>
                <td className="py-4 px-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${sub.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                    {sub.is_active ? 'Aktif' : 'Pasif'}
                  </span>
                </td>
                <td className="py-4 px-4 text-right flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(sub)} title="Düzenle">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(sub.id)} title="Sil">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
