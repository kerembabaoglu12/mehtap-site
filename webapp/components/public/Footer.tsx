/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  settings?: any;
}

export function Footer({ settings }: FooterProps) {
  const phone = settings?.contact_phone || '+90 555 123 45 67';
  const email = settings?.contact_email || 'info@adygrup.com';
  const address = settings?.contact_address || 'Şişli / İstanbul, Türkiye';
  const siteTitle = settings?.site_title || 'ADY Grup';

  return (
    <footer className="bg-slate-950 pt-24 pb-12 relative overflow-hidden border-t-4 border-red-600">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand Info */}
          <div className="col-span-1 lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <Image src="/logo.jpeg" alt="ADY Grup Logo" width={50} height={50} className="rounded-xl object-cover" />
                <span className="text-2xl font-black text-white tracking-tight">{siteTitle.split(' ')[0]} <span className="text-red-500">{siteTitle.split(' ').slice(1).join(' ') || 'Grup'}</span></span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-light">
              Danışmanlık, Güvenlik, Eğitim ve Tüm Destek Hizmetlerinde yüksek standartlı Çözüm Ortağınız.
              Geleceği güvenle birlikte inşa ediyoruz.
            </p>
            <div className="flex gap-4 pt-2">
              {settings?.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.272 2.695.072 7.053.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zM12 16c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-10.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              {settings?.linkedin_url && (
                <a
                  href={settings.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.202 0 22.225 0z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-white font-bold mb-6 tracking-wide">Kurumsal</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/" className="text-slate-400 hover:text-red-500 transition-colors flex items-center gap-2">&rarr; Ana Sayfa</Link></li>
              <li><Link href="/hakkimizda" className="text-slate-400 hover:text-red-500 transition-colors flex items-center gap-2">&rarr; Hakkımızda</Link></li>
              <li><Link href="/hizmetler" className="text-slate-400 hover:text-red-500 transition-colors flex items-center gap-2">&rarr; Hizmetlerimiz</Link></li>
              <li><Link href="/iletisim" className="text-slate-400 hover:text-red-500 transition-colors flex items-center gap-2">&rarr; İletişim</Link></li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="col-span-1 lg:col-span-3">
            <h4 className="text-white font-bold mb-6 tracking-wide">Uzmanlık Alanları</h4>
            <ul className="space-y-4 text-sm font-light grid grid-cols-1 gap-x-4">
              <li><Link href="/hizmetler/ady-danismanlik" className="text-slate-400 hover:text-red-500 transition-colors">&rarr; ADY Danışmanlık</Link></li>
              <li><Link href="/hizmetler/ady-guvenlik" className="text-slate-400 hover:text-red-500 transition-colors">&rarr; ADY Güvenlik</Link></li>
              <li><Link href="/hizmetler/ady-egitim" className="text-slate-400 hover:text-red-500 transition-colors">&rarr; ADY Eğitim</Link></li>
              <li><Link href="/hizmetler/ady-ilk-yardim" className="text-slate-400 hover:text-red-500 transition-colors">&rarr; ADY İlk Yardım</Link></li>
              <li><Link href="/hizmetler/ady-temizlik" className="text-slate-400 hover:text-red-500 transition-colors">&rarr; ADY Temizlik</Link></li>
            </ul>
          </div>

          {/* Contact Info — from settings */}
          <div className="col-span-1 lg:col-span-3">
            <h4 className="text-white font-bold mb-6 tracking-wide">İletişim</h4>
            <ul className="space-y-5 text-sm font-light text-slate-400">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-red-500 shrink-0" />
                <a href={`tel:${phone}`} className="text-slate-300 hover:text-white transition-colors">{phone}</a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-red-500 shrink-0" />
                <a href={`mailto:${email}`} className="text-slate-300 hover:text-white transition-colors">{email}</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="space-y-2">
            <p className="text-slate-500 text-sm font-light">
              &copy; {new Date().getFullYear()} {siteTitle}. Tüm hakları saklıdır.
            </p>
            {settings?.footer_text && (
              <p className="text-slate-600 text-xs font-light max-w-sm mx-auto md:mx-0">
                {settings.footer_text}
              </p>
            )}
          </div>
          <div className="flex gap-6 text-sm font-light text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-white transition-colors">KVKK</a>
          </div>
        </div>

        {/* Floating WhatsApp Button */}
        {settings?.whatsapp_number && (
          <a
            href={`https://wa.me/${settings.whatsapp_number.replace(/\s+/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group"
          >
            <svg className="w-8 h-8 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.43 5.623 1.43h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span className="absolute right-full mr-4 bg-white text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              WhatsApp Destek Hattı
            </span>
          </a>
        )}

      </div>
    </footer>
  );
}
