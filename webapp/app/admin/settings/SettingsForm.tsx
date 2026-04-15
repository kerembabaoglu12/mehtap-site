/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from 'react';
import { updateSettings } from '@/app/actions/admin';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Save, Globe, Mail, Phone, MessageCircle, Share2, Layout, MousePointer2 } from 'lucide-react';

export default function SettingsForm({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: initialData.id,
    site_title: initialData.site_title || '',
    contact_email: initialData.contact_email || '',
    contact_phone: initialData.contact_phone || '',
    contact_address: initialData.contact_address || '',
    whatsapp_number: initialData.whatsapp_number || '',
    instagram_url: initialData.instagram_url || '',
    linkedin_url: initialData.linkedin_url || '',
    facebook_url: initialData.facebook_url || '',
    twitter_url: initialData.twitter_url || '',
    footer_text: initialData.footer_text || '',
    form_email: initialData.form_email || 'kerembabaoglu1@gmail.com',
    header_button_text: initialData.header_button_text || 'Teklif Al',
    header_button_link: initialData.header_button_link || '/iletisim',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await updateSettings(formData);
    if(result.success) {
      toast.success('Ayarlar başarıyla güncellendi.');
    } else {
      toast.error('Ayarlar güncellenemedi: ' + result.error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* Genel Bilgiler */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-900">Genel Bilgiler</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Site Başlığı</label>
            <input type="text" name="site_title" value={formData.site_title} onChange={handleChange} className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" required />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Form Gidecek E-posta</label>
            <input type="email" name="form_email" value={formData.form_email} onChange={handleChange} className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" required />
          </div>
        </div>
      </div>

      {/* İletişim Bilgileri */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Mail className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-900">İletişim Bilgileri</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">E-posta Adresi</label>
            <input type="email" name="contact_email" value={formData.contact_email} onChange={handleChange} className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" required />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Telefon</label>
            <input type="text" name="contact_phone" value={formData.contact_phone} onChange={handleChange} className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" required />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">WhatsApp Numarası</label>
            <input type="text" name="whatsapp_number" value={formData.whatsapp_number} onChange={handleChange} className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="905xxxxxxxxx" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Fiziksel Adres</label>
            <input type="text" name="contact_address" value={formData.contact_address} onChange={handleChange} className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" required />
          </div>
        </div>
      </div>

      {/* Sosyal Medya */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Share2 className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-900">Sosyal Medya Linkleri</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">LinkedIn</label>
            <input type="text" name="linkedin_url" value={formData.linkedin_url} onChange={handleChange} className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Instagram</label>
            <input type="text" name="instagram_url" value={formData.instagram_url} onChange={handleChange} className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Facebook</label>
            <input type="text" name="facebook_url" value={formData.facebook_url} onChange={handleChange} className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Twitter / X</label>
            <input type="text" name="twitter_url" value={formData.twitter_url} onChange={handleChange} className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
        </div>
      </div>

      {/* Görünüm Ayarları */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Layout className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-900">Görünüm & Footer</h2>
        </div>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Header Buton Metni</label>
              <input type="text" name="header_button_text" value={formData.header_button_text} onChange={handleChange} className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Header Buton Linki</label>
              <input type="text" name="header_button_link" value={formData.header_button_link} onChange={handleChange} className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Footer Metni (Copyright Altı)</label>
            <textarea name="footer_text" value={formData.footer_text} onChange={handleChange} rows={3} className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"></textarea>
          </div>
        </div>
      </div>

      <div className="flex justify-end p-2">
        <Button 
          type="submit" 
          disabled={loading} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-12 rounded-xl font-bold shadow-lg shadow-indigo-600/20 active:scale-95 transition-all flex items-center gap-2"
        >
          {loading ? 'Kaydediliyor...' : <><Save className="w-4 h-4" /> Ayarları Kaydet</>}
        </Button>
      </div>
    </form>
  );
}
