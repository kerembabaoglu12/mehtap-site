"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AdminSidebar({ username }: { username: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    toast.success('Çıkış yapıldı');
    router.refresh(); // Or redirect to /admin/login
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Genel Ayarlar', path: '/admin/settings' },
    { name: 'Hizmetler', path: '/admin/services' },
    { name: 'Form Başvuruları', path: '/admin/submissions' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0">
      <div className="p-4 text-2xl font-bold border-b border-slate-800">
        ADY Admin
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} href={item.path} passHref>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={`w-full justify-start text-left ${isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
              >
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <Button variant="destructive" className="w-full" onClick={handleLogout}>
          Çıkış Yap ({username})
        </Button>
      </div>
    </aside>
  );
}
