"use client";

import { useState } from 'react';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { Button } from '@/components/ui/button';
import { submitContactForm } from '@/app/actions/contact';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import Image from 'next/image';

interface Settings {
  contact_email?: string;
  contact_phone?: string;
  contact_address?: string;
  [key: string]: unknown;
}

export default function IletisimPageClient({ settings }: { settings: Settings }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const phone = settings?.contact_phone || '+90 555 123 45 67';
  const email = settings?.contact_email || 'info@adygrup.com';
  const address = settings?.contact_address || 'Şişli / İstanbul, Türkiye';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Ad Soyad alanı zorunludur.';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'E-posta alanı zorunludur.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz.';
    }

    // Turkish phone validation: 05xx xxx xx xx or 5xx xxx xx xx
    const phoneRegex = /^(05|5)[0-9]{9}$/;
    const cleanPhone = formData.phone.replace(/\s/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon alanı zorunludur.';
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = 'Lütfen geçerli bir telefon numarası giriniz (Örn: 05xx xxx xx xx).';
    }

    if (!formData.company.trim()) newErrors.company = 'Şirket adı zorunludur.';
    if (!formData.service) newErrors.service = 'Lütfen bir hizmet alanı seçiniz.';
    if (!formData.message.trim()) newErrors.message = 'Mesaj alanı zorunludur.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Lütfen formdaki hataları düzeltiniz.');
      return;
    }
    setLoading(true);

    try {
      await submitContactForm(formData);

      const targetEmail = settings?.form_email || 'kerembabaoglu1@gmail.com';
      const emailResponse = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            ...formData,
            _subject: `Yeni Form Başvurusu: ${formData.name}`,
            _template: 'table'
        })
      });

      if (emailResponse.ok) {
        toast.success('Mesajınız başarıyla iletildi. En kısa sürede size döneceğiz.');
        setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
        setErrors({});
      } else {
        toast.error('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Beklenmeyen bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header settings={settings} />
      
      {/* Hero */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-900 border-b border-red-600">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1920&q=80" 
            alt="İletişim"
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 font-bold tracking-widest uppercase mb-4 block"
          >
            Bize Ulaşın
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
          >
            İletişim
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed"
          >
            İhtiyaçlarınızı analiz edip kurumunuza en uygun stratejileri belirlemek için buradayız.
          </motion.p>
        </div>
      </section>

      <main className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
            
            {/* Contact Info — from settings */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">Nasıl Yardımcı <br/> Olabiliriz?</h2>
              <p className="text-slate-600 font-light leading-relaxed">
                Operasyonlarınızı sorunsuz yürütmek, şirketinizin performansını zirveye taşımak için ilgili uzmanlarımız sizinle doğrudan iletişime geçecektir.
              </p>
              
              <div className="space-y-6 pt-6">
                <div className="flex gap-6 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm tracking-widest uppercase font-bold text-slate-400 mb-1">Kurumsal E-posta</h4>
                    <a href={`mailto:${email}`} className="text-xl font-medium text-slate-900 group-hover:text-red-600 transition-colors">{email}</a>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm tracking-widest uppercase font-bold text-slate-400 mb-1">Merkez Ofis</h4>
                    <a href={`tel:${phone}`} className="text-xl font-medium text-slate-900 group-hover:text-red-600 transition-colors">{phone}</a>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm tracking-widest uppercase font-bold text-slate-400 mb-1">Lokasyon</h4>
                    <p className="text-lg font-medium text-slate-900">{address}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-3"
            >
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-[80px] -z-10 -mr-20 -mt-20"></div>
                <h3 className="text-2xl font-bold mb-8 text-slate-900">Hemen Teklif ve Analiz İsteyin</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ad Soyad *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} className={`w-full bg-slate-50 border-transparent p-4 rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none ${errors.name ? 'border-red-500 bg-red-50' : ''}`} required />
                      {errors.name && <p className="text-red-500 text-[10px] font-bold mt-1 px-1">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Telefon *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`w-full bg-slate-50 border-transparent p-4 rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none ${errors.phone ? 'border-red-500 bg-red-50' : ''}`} placeholder="05xx xxx xx xx" required />
                      {errors.phone && <p className="text-red-500 text-[10px] font-bold mt-1 px-1">{errors.phone}</p>}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kurumsal E-posta *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full bg-slate-50 border-transparent p-4 rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none ${errors.email ? 'border-red-500 bg-red-50' : ''}`} required />
                      {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1 px-1">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Şirket Adı *</label>
                      <input type="text" name="company" value={formData.company} onChange={handleChange} className={`w-full bg-slate-50 border-transparent p-4 rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none ${errors.company ? 'border-red-500 bg-red-50' : ''}`} required />
                      {errors.company && <p className="text-red-500 text-[10px] font-bold mt-1 px-1">{errors.company}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">İlgilendiğiniz Hizmet Alanı *</label>
                    <div className="relative">
                      <select name="service" value={formData.service} onChange={handleChange} className={`w-full bg-slate-50 border-transparent p-4 rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none appearance-none ${errors.service ? 'border-red-500 bg-red-50' : ''}`} required>
                        <option value="">Lütfen Bir Alan Seçiniz</option>
                        <option value="Danışmanlık">ADY Danışmanlık ve Yönetim Hizmetleri</option>
                        <option value="Güvenlik">ADY Özel Güvenlik Hizmetleri</option>
                        <option value="Eğitim">ADY Eğitim Akademisi</option>
                        <option value="İlk Yardım">ADY İlk Yardım Eğitimi</option>
                        <option value="Temizlik">ADY Profesyonel Tesis Temizliği</option>
                        <option value="Catering">ADY Kurumsal Catering</option>
                        <option value="Yangın ve Güvenlik">ADY Endüstriyel Yangın ve Güvenlik</option>
                      </select>
                      {errors.service && <p className="text-red-500 text-[10px] font-bold mt-2 px-1">{errors.service}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Detaylı Talebiniz *</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows={5} className={`w-full bg-slate-50 border-transparent p-4 rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none resize-none ${errors.message ? 'border-red-500 bg-red-50' : ''}`} placeholder="Projeniz veya ihtiyaçlarınız hakkında kısaca bahseder misiniz?" required></textarea>
                    {errors.message && <p className="text-red-500 text-[10px] font-bold mt-1 px-1">{errors.message}</p>}
                  </div>
                  
                  <Button type="submit" disabled={loading} className="w-full group h-16 bg-red-600 hover:bg-red-700 text-white rounded-xl text-lg font-bold shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all active:scale-[0.98]">
                    {loading ? 'İşleniyor...' : (
                      <span className="flex items-center justify-center gap-3">
                        Formu Gönder <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
      <Footer settings={settings} />
    </div>
  );
}
