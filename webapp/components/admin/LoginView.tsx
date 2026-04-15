"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Image from 'next/image';
import { ShieldCheck, Eye, EyeOff } from 'lucide-react';

export default function LoginView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        toast.success('Giriş başarılı, yönlendiriliyorsunuz...');
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Giriş başarısız');
      }
    } catch {
      toast.error('Giriş sırasında hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 mb-5">
            <Image src="/logo.jpeg" alt="ADY" width={40} height={40} className="rounded-lg" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            ADY <span className="text-red-500">Grup</span> Yönetim
          </h1>
          <p className="text-slate-400 text-sm mt-2">Yönetim paneline erişmek için giriş yapın</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/[0.07] backdrop-blur-2xl rounded-2xl border border-white/10 p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
            <ShieldCheck className="w-4 h-4 text-red-400" />
            <span className="text-xs text-red-300 font-medium">Güvenli oturum — tarayıcı kapatıldığında sona erer</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Kullanıcı Adı</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all text-sm"
                placeholder="admin"
                required
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Şifre</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all text-sm pr-12"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white h-12 rounded-xl text-sm font-bold shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Giriş yapılıyor...
                </span>
              ) : 'Giriş Yap'}
            </Button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">&copy; {new Date().getFullYear()} ADY Grup. Tüm hakları saklıdır.</p>
      </div>
    </div>
  );
}
