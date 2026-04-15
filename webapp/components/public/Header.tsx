"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export function Header({ settings }: { settings?: any }) {
  const btnText = settings?.header_button_text || 'Teklif Al';
  const btnLink = settings?.header_button_link || '/iletisim';

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top when clicking "Ana Sayfa" while already on "/"
  const handleHomeClick = useCallback((e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setMobileMenuOpen(false);
    } else {
      setMobileMenuOpen(false);
      router.push('/');
    }
  }, [pathname, router]);

  const navLinkClass = "text-sm tracking-wide font-semibold hover:text-red-500 transition-colors text-slate-200";

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg py-3' 
          : 'bg-gradient-to-b from-slate-900/80 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" onClick={handleHomeClick} className="flex items-center gap-3 group">
          <div className="relative overflow-hidden rounded-full border-2 border-white/20 group-hover:border-red-500 transition-colors">
            <Image 
              src="/logo.jpeg" 
              alt="ADY Grup Logo" 
              width={isScrolled ? 48 : 64} 
              height={isScrolled ? 48 : 64} 
              className="object-cover transition-all duration-300" 
            />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white">
            ADY <span className="text-red-500">Grup</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          <a href="/" onClick={handleHomeClick} className={navLinkClass}>Ana Sayfa</a>
          <Link href="/hakkimizda" scroll={true} onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>Hakkımızda</Link>
          <Link href="/hizmetler" scroll={true} onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>Hizmetlerimiz</Link>
          <Link href="/iletisim" scroll={true} onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>İletişim</Link>
        </nav>

        <div className="hidden md:block">
          <Link href={btnLink}>
            <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 h-12 text-sm font-bold shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.8)] transition-all duration-300 hover:scale-105">
              {btnText}
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-white bg-slate-900 rounded-full"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col items-center py-6 gap-6">
              <a href="/" onClick={handleHomeClick} className="text-slate-300 hover:text-red-500 font-semibold">Ana Sayfa</a>
              <Link href="/hakkimizda" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-red-500 font-semibold">Hakkımızda</Link>
              <Link href="/hizmetler" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-red-500 font-semibold">Hizmetlerimiz</Link>
              <Link href="/iletisim" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-red-500 font-semibold">İletişim</Link>
              <Link href={btnLink} onClick={() => setMobileMenuOpen(false)}>
                <Button className="bg-red-600 text-white rounded-full px-8">{btnText}</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
