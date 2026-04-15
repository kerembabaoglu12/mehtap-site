/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { ShieldCheck, Target, Lightbulb, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HakkimizdaClient({ settings }: { settings: any }) {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Header settings={settings} />
      
      {/* Hero */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-900 border-b border-red-600">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80" 
            alt="Hakkımızda"
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40"></div>
          <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 font-bold tracking-widest uppercase mb-4 block"
          >
            Kurumsal
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
          >
            Hakkımızda
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Sektördeki engin tecrübemiz ve yenilikçi vizyonumuzla, kurumlar için sürdürülebilir, güvenilir ve uçtan uca danışmanlık hizmetleri sunuyoruz.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl">
                <Image src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80" alt="Kurumsal Vizyon" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-slate-900">15+</div>
                    <div className="text-slate-500 font-medium">Yıllık Güven</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">Geleceği Güvenle<br/>Şekillendiriyoruz.</h2>
              <div className="w-20 h-2 bg-red-600 rounded-full"></div>
              <p className="text-lg text-slate-600 font-light leading-relaxed">
                ADY Grup olarak, işletmelerin ihtiyaç duyduğu tüm danışmanlık, güvenlik ve eğitim süreçlerinde, ulusal ve uluslararası standartlara uygun stratejiler geliştiriyoruz. Bizim için başarı; müşterilerimizin iş süreçlerinde elde ettiği operasyonel mükemmelliktir.
              </p>
              <p className="text-lg text-slate-600 font-light leading-relaxed">
                Amacımız sadece hizmet sunmak değil, kurumunuzun büyüme hedeflerini içselleştiren, etik değerlere sıkı sıkıya bağlı ve teknolojik yenilikleri iş modelinize entegre eden gerçek bir çözüm ortağı olmaktır.
              </p>
              
              <ul className="space-y-4 pt-4">
                {[
                  "Uluslararası Kalite Standartları",
                  "Gelişmiş Risk Yönetimi",
                  "Müşteri Odaklı Stratejiler",
                  "Sıfır Hata Prensibi"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-800 font-medium">
                    <CheckCircle2 className="text-red-500 w-6 h-6" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-red-500 font-bold tracking-widest uppercase mb-4 block">Değerlerimiz</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Kurumsal Kültürümüzün Temel Taşları</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 hover:bg-white/10 transition-colors">
              <Target className="w-12 h-12 text-red-500 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Vizyonumuz</h3>
              <p className="text-slate-400 leading-relaxed font-light">Sektöre yön veren, yenilikçi yaklaşımları hızla entegre eden, global standartlarda en çok tercih edilen, güvenilir ve lider çözüm ortağı olmak.</p>
            </div>
            
            <div className="bg-red-600 rounded-3xl p-10 shadow-2xl shadow-red-600/20 md:-translate-y-4">
              <ShieldCheck className="w-12 h-12 text-white mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Misyonumuz</h3>
              <p className="text-red-100 leading-relaxed font-light">Müşterilerimizin rekabet gücünü maksimize eden, kalite ve dürüstlükten taviz vermeden operasyonel süreçlerinde katma değer sağlayan benzersiz hizmetler sunmak.</p>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 hover:bg-white/10 transition-colors">
              <Lightbulb className="w-12 h-12 text-red-500 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Yaklaşımımız</h3>
              <p className="text-slate-400 leading-relaxed font-light">Sürekli kendini yenileyen eğitimli profesyonellerimizle, şeffaf, ölçülebilir ve tamamen müşteri hedeflerine kilitlenmiş bir çalışma disiplini.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer settings={settings} />
    </div>
  );
}
