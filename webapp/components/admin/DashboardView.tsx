"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function DashboardView({ username }: { username: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    toast.success('Çıkış yapıldı');
    router.refresh();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-slate-800">
          ADY Admin
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-left text-white hover:bg-slate-800 hover:text-white">Dashboard</Button>
          <Button variant="ghost" className="w-full justify-start text-left text-white hover:bg-slate-800 hover:text-white">Genel Ayarlar</Button>
          <Button variant="ghost" className="w-full justify-start text-left text-white hover:bg-slate-800 hover:text-white">Ana Sayfa</Button>
          <Button variant="ghost" className="w-full justify-start text-left text-white hover:bg-slate-800 hover:text-white">Hizmetler</Button>
          <Button variant="ghost" className="w-full justify-start text-left text-white hover:bg-slate-800 hover:text-white">Form Başvuruları</Button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Button variant="destructive" className="w-full" onClick={handleLogout}>Çıkış Yap ({username})</Button>
        </div>
      </aside>
      <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Genel Bakış</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Toplam Hizmet</h3>
            <p className="text-3xl font-bold mt-2 text-indigo-600">6</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Okunmamış Mesajlar</h3>
            <p className="text-3xl font-bold mt-2 text-rose-600">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Aktif Blog Yazısı</h3>
            <p className="text-3xl font-bold mt-2 text-emerald-600">4</p>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4">Sistem Durumu</h2>
          <p className="text-gray-600">Hoş geldiniz. Sol menüyü kullanarak içeriklerinizi güncelleyebilirsiniz.</p>
        </div>
      </main>
    </div>
  );
}
