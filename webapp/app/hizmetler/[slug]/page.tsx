import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import { formatServiceContent } from '@/lib/formatContent';

export const revalidate = 60;

export default async function HizmetDetayPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const cleanSlug = params.slug.startsWith('/') ? params.slug.substring(1) : params.slug;
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .or(`slug.eq.${cleanSlug},slug.eq./${cleanSlug}`)
    .single();

  const { data: settings } = await supabase.from('site_settings').select('*').single();

  if (!service) {
    notFound();
  }

  const FALLBACK_IMG = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1920&q=80';
  function safeImg(url: string | null | undefined): string {
    if (!url || url.trim() === '') return FALLBACK_IMG;
    if (url.includes('unsplash.com/photos') && !url.includes('images.unsplash.com')) return FALLBACK_IMG;
    return url;
  }

  const heroImage = safeImg(service.image_url);
  const isDataUrl = heroImage.startsWith('data:');

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header settings={settings} />

      {/* Detail Hero */}
      <section className="relative pt-40 pb-32 md:pt-56 md:pb-40 overflow-hidden bg-slate-900 border-b border-red-600">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={service.title}
            fill
            className="object-cover opacity-30 mix-blend-luminosity"
            priority
            {...(isDataUrl ? { unoptimized: true } : {})}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
          <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-red-600/30 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-red-500 font-bold tracking-widest uppercase mb-6 text-sm">
            <Link href="/hizmetler" className="hover:text-white transition-colors">Hizmetler</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{service.title}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight max-w-4xl">{service.title}</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-3xl">
            {service.short_desc}
          </p>
        </div>
      </section>

      {/* Content Area */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

            {/* Main Content */}
            <div className="lg:w-[65%] xl:w-[62%]">
              <div className="bg-white rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
                {/* Top accent bar */}
                <div className="h-1.5 bg-gradient-to-r from-red-600 via-red-500 to-orange-400"></div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-50/60 rounded-bl-[120px] -mr-10 -mt-2 pointer-events-none"></div>

                <div className="p-8 sm:p-10 md:p-14 lg:p-16 relative z-10">
                  {/* Section label */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-red-600" />
                    </div>
                    <span className="text-red-600 font-bold tracking-widest uppercase text-xs">Hizmet Detayları</span>
                  </div>

                  {/* Prose content area */}
                  <div
                    className="
                      prose prose-lg prose-slate max-w-none
                      prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-slate-900
                      prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-red-500 prose-h2:pl-5
                      prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-10 prose-h3:mb-4
                      prose-p:leading-[1.9] prose-p:text-slate-600 prose-p:text-base prose-p:md:text-lg prose-p:mb-6 prose-p:font-light
                      prose-li:text-slate-600 prose-li:leading-relaxed prose-li:mb-2
                      prose-ul:my-6 prose-ul:space-y-2
                      prose-strong:text-slate-800 prose-strong:font-bold
                      prose-a:text-red-600 prose-a:no-underline prose-a:hover:underline
                    "
                    dangerouslySetInnerHTML={{ __html: formatServiceContent(service.content) }}
                  />

                  {/* Bottom divider */}
                  <div className="mt-12 pt-8 border-t border-slate-100 flex items-center gap-4">
                    <div className="w-12 h-1 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-slate-400 font-medium">ADY Grup — {service.title}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:w-[35%] xl:w-[38%]">
              <div className="sticky top-32 space-y-8">
                {/* CTA Card */}
                <div className="bg-slate-900 rounded-3xl p-8 lg:p-10 shadow-2xl text-white relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-600 rounded-full blur-[50px] opacity-50"></div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-4 relative z-10">Kurumunuza Özel Teklif İster misiniz?</h3>
                  <p className="text-slate-300 font-light mb-8 relative z-10 text-sm lg:text-base leading-relaxed">İhtiyaçlarınıza uygun optimum çözümü sağlamak için uzmanlarımızla iletişime geçin.</p>

                  <ul className="space-y-4 mb-8 text-sm text-slate-300 relative z-10">
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-red-500 w-5 h-5 shrink-0" /> Ücretsiz Ön Analiz</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-red-500 w-5 h-5 shrink-0" /> Kişiselleştirilmiş Yol Haritası</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-red-500 w-5 h-5 shrink-0" /> 7/24 Kesintisiz Destek</li>
                  </ul>

                  <Link href="/iletisim" className="block relative z-10">
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white h-14 text-lg font-bold rounded-xl transition-all hover:scale-[1.02]">
                      İletişime Geçin
                    </Button>
                  </Link>
                </div>

                {/* Quick info card */}
                <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Neden Bu Hizmet?</h4>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0"></span>
                      Sektör standartlarına uygun profesyonel yaklaşım
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0"></span>
                      Deneyimli ve sertifikalı uzman kadro
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0"></span>
                      Ölçülebilir sonuçlar ve raporlama
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer settings={settings} />
    </div>
  );
}
