import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export default async function HizmetlerGenelPage() {
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('order_num', { ascending: true });

  const { data: settings } = await supabase.from('site_settings').select('*').single();

  function cleanSlug(slug: string): string {
    return slug.startsWith('/') ? slug.substring(1) : slug;
  }

  const FALLBACK_IMG = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80';
  function safeImg(url: string | null | undefined): string {
    if (!url || url.trim() === '') return FALLBACK_IMG;
    if (url.startsWith('data:')) return url;
    if (url.includes('images.unsplash.com')) return url;
    if (url.includes('unsplash.com/photos')) return FALLBACK_IMG;
    return url;
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header settings={settings} />
      
      {/* Hero for Services Page */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-900 border-b border-white/10">
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600 rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-red-500 font-bold tracking-widest uppercase mb-4 block">Portfolyo</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">Hizmetlerimiz</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Farklı sektörlerin dinamiklerine uygun tasarlanmış profesyonel hizmet yelpazemizle yüksek kaliteli kurumsal çözümler sağlıyoruz.
          </p>
        </div>
      </section>

      <main className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {(!services || services.length === 0) && (
               <p className="col-span-3 text-center text-slate-500 py-12 text-lg">Detaylı hizmet bilgileri yakında eklenecektir.</p>
            )}
            
            {services?.map((service) => (
              <Link href={`/hizmetler/${cleanSlug(service.slug)}`} key={service.id} className="block group">
                <Card className="h-full bg-white border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-2xl lg:rounded-[2rem] overflow-hidden relative group">
                  <div className="relative h-48 sm:h-52 lg:h-60 w-full overflow-hidden">
                    <Image 
                      src={safeImg(service.image_url)} 
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      {...(safeImg(service.image_url).startsWith('data:') ? { unoptimized: true } : {})}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-6 left-6 flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-white">
                      <Sparkles className="w-7 h-7" />
                    </div>
                  </div>
                  
                  <CardContent className="p-6 sm:p-7 lg:p-8 pb-8 lg:pb-10 flex flex-col items-start">
                    <h3 className="text-2xl font-bold mb-4 text-slate-900">{service.title}</h3>
                    <p className="text-slate-600 leading-relaxed font-light mb-8 line-clamp-3">
                      {service.short_desc}
                    </p>
                    
                    <div className="mt-auto flex items-center text-red-600 font-bold group-hover:text-slate-900 transition-colors">
                      Detaylı İncele 
                      <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer settings={settings} />
    </div>
  );
}
