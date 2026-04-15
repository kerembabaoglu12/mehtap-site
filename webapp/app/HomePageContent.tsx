/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ShieldCheck, ChevronRight, CheckCircle2, TrendingUp, Users,
  Briefcase, Shield, GraduationCap, Heart, Flame, Sparkles, UtensilsCrossed
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Hizmet başına zengin içerik haritası (slug → descriptor)
const SERVICE_META: Record<string, { icon: React.ReactNode; pitch: string; bullets: string[] }> = {
  'ady-danismanlik': {
    icon: <Briefcase className="w-7 h-7" />,
    pitch: 'Kurumsal gelişim süreçlerinizi yönetim danışmanlığı, ISO belgelendirme ve sürdürülebilirlik stratejileriyle hızlandırın.',
    bullets: ['ISO & Yönetim Sistemi Danışmanlığı', 'Kurumsal Süreç İyileştirme', 'Strateji ve Dönüşüm Danışmanlığı'],
  },
  'ady-guvenlik': {
    icon: <Shield className="w-7 h-7" />,
    pitch: 'Sabit nokta koruma, devriye ve teknolojik entegrasyon ile tesisinizin 7/24 güvenliğini kesintisiz sağlıyoruz.',
    bullets: ['Sabit Nokta & Devriye Güvenliği', 'Elektronik Güvenlik Sistemleri', 'Risk Analizi & Danışmanlık'],
  },
  'ady-egitim': {
    icon: <GraduationCap className="w-7 h-7" />,
    pitch: 'Bakanlık onaylı sertifika programları ve uzman eğitmenlerimizle personelinizin yetkinliğini bir üst seviyeye taşıyın.',
    bullets: ['Akredite Sertifika Programları', 'Kurum İçi Özel Eğitimler', 'E-Öğrenme & Karma Modeller'],
  },
  'ady-ilk-yardim': {
    icon: <Heart className="w-7 h-7" />,
    pitch: 'Acil müdahale kapasitesini artıran, yasal zorunlulukları karşılayan, hayat kurtaran ilk yardım eğitimleri sunuyoruz.',
    bullets: ['Temel & İleri İlk Yardım', 'İşyeri Zorunlu Eğitimleri', 'AED & CPR Sertifikasyonu'],
  },
  'ady-yangin-guvenlik': {
    icon: <Flame className="w-7 h-7" />,
    pitch: 'Projelendirmeden bakım-onarıma, yangın algılama ve söndürme sistemlerinde uçtan uca çözüm ortağınız.',
    bullets: ['Yangın Algılama Sistemleri', 'Söndürme Sistemi Montajı', 'Periyodik Bakım & Servis'],
  },
  'ady-temizlik': {
    icon: <Sparkles className="w-7 h-7" />,
    pitch: 'Endüstriyel çözümler ve eğitimli ekiplerimizle tüm tesis alanlarında hijyen standartlarınızı yükseltin.',
    bullets: ['Genel & Derin Temizlik', 'İnşaat Sonrası Temizlik', 'Hijyen Denetimi & Dezenfeksiyon'],
  },
  'ady-catering': {
    icon: <UtensilsCrossed className="w-7 h-7" />,
    pitch: 'Yerinde üretimden taşımalı yemeğe, gıda güvenliği standartlarını önceleyen kurumsal catering çözümleri.',
    bullets: ['Kurumsal Toplu Yemek', 'Organizasyon Catering', 'Menü Planlama & Diyetisyen Desteği'],
  },
};

// Fallback fotoğraflar: hizmet indexine göre güvenilir Unsplash resimleri
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
];

// Resmi güvenli bir URL'e normalize et
function safeImageUrl(url: string | null | undefined, fallback: string): string {
  if (!url || url.trim() === '') return fallback;
  if (url.startsWith('data:')) return url; // uploaded file
  if (url.includes('images.unsplash.com')) return url;
  if (url.includes('unsplash.com/photos')) return fallback; // page link, not image
  return url;
}

// Slug başındaki eğik çizgiyi sil
function cleanSlug(slug: string): string {
  return slug.startsWith('/') ? slug.substring(1) : slug;
}

export default function HomePageContent({ services, settings }: { services: any[]; settings: any }) {
  const heroTitle = 'Gücümüz Hizmet, Önceliğimiz Güven';
  const heroSub = settings?.hero_subtitle || 'Danışmanlık, Güvenlik, Eğitim ve Tüm Destek Hizmetlerinde Kurumsal Çözüm Ortağınız.';

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroRef = useRef<HTMLElement>(null);

  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-red-500 selection:text-white">
      <Header settings={settings} />

      <main>
        {/* HERO SECTION */}
        <section ref={heroRef} id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900 border-b-8 border-red-600">
          {/* Parallax Background */}
          <motion.div style={{ y }} className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
              alt="Kurumsal Arka Plan"
              fill
              className="object-cover opacity-50 mix-blend-luminosity"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-slate-900/50"></div>
          </motion.div>

          {/* Abstract Glows */}
          <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-red-600/30 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-white text-sm font-semibold tracking-widest uppercase">Gelişmiş Çözüm Ortaklığı</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.1] mb-8"
              >
                {heroTitle.split(' ').map((word: string, i: number) => (
                  <span key={i} className={i === 1 || i === 2 ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500' : ''}>
                    {word}{' '}
                  </span>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-slate-300 max-w-3xl font-light leading-relaxed mb-12"
              >
                {heroSub}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto"
              >
                <Link href="/iletisim">
                  <Button size="lg" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white rounded-full px-12 h-16 text-lg font-bold shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_35px_rgba(220,38,38,0.8)] transition-all duration-300 hover:-translate-y-1">
                    Projeyi Başlat
                  </Button>
                </Link>
                <Link href="/hizmetler">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-12 h-16 text-lg font-bold backdrop-blur-md transition-all duration-300 hover:-translate-y-1">
                    Hizmetleri Keşfet
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
            <span className="text-white text-xs tracking-widest uppercase">Keşfet</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent"></div>
          </div>
        </section>

        {/* STATS OVERLAY */}
        <section className="relative -mt-20 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-100 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100 justify-between items-center"
          >
            <div className="flex-1 text-center py-6 md:py-0">
              <h3 className="text-4xl font-black text-slate-900 mb-2">15+</h3>
              <p className="text-slate-500 font-medium">Yıllık Tecrübe</p>
            </div>
            <div className="flex-1 text-center py-6 md:py-0">
              <h3 className="text-4xl font-black text-slate-900 mb-2">500+</h3>
              <p className="text-slate-500 font-medium">Başarılı Proje</p>
            </div>
            <div className="flex-1 text-center py-6 md:py-0">
              <h3 className="text-4xl font-black text-slate-900 mb-2">7</h3>
              <p className="text-slate-500 font-medium">Uzmanlık Alanı</p>
            </div>
            <div className="flex-1 text-center py-6 md:py-0">
              <h3 className="text-4xl font-black text-slate-900 mb-2">100%</h3>
              <p className="text-slate-500 font-medium">Müşteri Memnuniyeti</p>
            </div>
          </motion.div>
        </section>

        {/* SERVICES GRID */}
        <section className="py-24 relative overflow-hidden bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-3xl">
                <span className="text-red-600 font-bold tracking-widest uppercase mb-4 block">Uzmanlık Alanlarımız</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Sektörel Standartları Belirliyoruz.</h2>
              </div>
              <Link href="/hizmetler" className="group flex items-center gap-2 font-bold text-slate-900 hover:text-red-600 transition-colors">
                Tüm Hizmetler <span className="bg-slate-200 group-hover:bg-red-100 p-2 rounded-full transition-colors"><ChevronRight className="w-5 h-5" /></span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.length === 0 && <p className="col-span-3 text-slate-500">Henüz hizmet eklenmedi.</p>}

              {services.map((service, idx) => {
                const slugKey = service.slug ? cleanSlug(service.slug) : '';
                const meta = SERVICE_META[slugKey] ?? null;
                const fallbackImg = FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];
                const imgSrc = safeImageUrl(service.image_url, fallbackImg);

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: idx * 0.08, duration: 0.6 }}
                  >
                    <Link href={`/hizmetler/${service.slug ? cleanSlug(service.slug) : ''}`} className="block group h-full">
                      <Card className="h-full border-none shadow-lg hover:shadow-2xl transition-all duration-500 bg-white rounded-2xl lg:rounded-3xl overflow-hidden relative hover:-translate-y-2">
                        {/* Image */}
                        <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden">
                          <Image
                            src={imgSrc}
                            alt={service.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            {...(imgSrc.startsWith('data:') ? { unoptimized: true } : {})}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                          {/* Icon badge */}
                          {meta && (
                            <div className="absolute top-4 right-4 w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-600/50">
                              {meta.icon}
                            </div>
                          )}
                          <div className="absolute bottom-5 left-6 right-6">
                            <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                            <div className="w-10 h-1 bg-red-500 rounded-full transition-all duration-500 group-hover:w-24"></div>
                          </div>
                        </div>

                        <CardContent className="p-5 sm:p-6 lg:p-7 space-y-3 lg:space-y-4">
                          {/* Rich description */}
                          <p className="text-slate-600 leading-relaxed text-sm line-clamp-3">
                            {meta?.pitch || service.short_desc}
                          </p>
                          {/* Bullet features */}
                          {meta?.bullets && (
                            <ul className="space-y-1.5">
                              {meta.bullets.map((b, bi) => (
                                <li key={bi} className="flex items-center gap-2 text-xs text-slate-500">
                                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                                  {b}
                                </li>
                              ))}
                            </ul>
                          )}
                          <div className="flex items-center text-slate-900 font-bold group-hover:text-red-600 transition-colors pt-2">
                            <span className="mr-3 tracking-wide text-sm">Detaylı İncele</span>
                            <span className="bg-slate-100 group-hover:bg-red-50 p-2 rounded-full group-hover:translate-x-3 transition-all duration-300">
                              <ChevronRight className="w-5 h-5" />
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-20 lg:py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2 space-y-8"
              >
                <span className="text-red-600 font-bold tracking-widest uppercase block">Neden Biz?</span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">İşinizi Güvenle Büyütmek İçin Stratejik Ortağınız.</h2>
                <p className="text-xl text-slate-600 font-light leading-relaxed">
                  Sektördeki engin tecrübemiz ve alanında uzman kadromuz ile kurumunuzun ihtiyaç duyduğu tüm yapısal süreçlerde uçtan uca destek veriyoruz.
                </p>

                <div className="grid sm:grid-cols-2 gap-6 pt-8">
                  {[
                    { icon: <ShieldCheck className="w-6 h-6 text-red-500" />, title: 'Güvenilir Çözümler', desc: 'Uluslararası standartlara tam uyum.' },
                    { icon: <TrendingUp className="w-6 h-6 text-red-500" />, title: 'Sonuç Odaklılık', desc: 'Gerçekçi ve ölçülebilir büyüme.' },
                    { icon: <Users className="w-6 h-6 text-red-500" />, title: 'Uzman Kadro', desc: 'Endüstri lideri yetkin ekipler.' },
                    { icon: <CheckCircle2 className="w-6 h-6 text-red-500" />, title: '7/24 Kesintisiz Destek', desc: 'Operasyonlarda tam zamanlı yanınızdayız.' },
                  ].map((item, id) => (
                    <div key={id} className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                      <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2 relative h-[400px] md:h-[550px] lg:h-[650px] w-full rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl"
              >
                <Image src="https://images.unsplash.com/photo-1523875194681-bedd468c58bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3RyYXRlZ3l8ZW58MHx8MHx8fDA%3D" alt="Neden Biz" fill className="object-cover" />
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>

                <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shrink-0 shadow-lg shadow-red-600/50">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">Sürdürülebilir Başarı</h4>
                      <p className="text-white/80 mt-1">Geleceğe değer katan vizyoner yaklaşımlar.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-32 relative overflow-hidden bg-slate-900">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600 rounded-full blur-[200px] opacity-20 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">Yenilikçi Çözümlerle<br />Rekabette Öne Çıkın.</h2>
              <p className="text-xl text-slate-300 mb-12 font-light">Kurumunuz için detaylı bir analiz ve profesyonel teklif almak isterseniz randevu talebi oluşturabilirsiniz.</p>

              <Link href="/iletisim">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-16 h-20 text-xl font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-105">
                  Hemen İletişime Geçin
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
