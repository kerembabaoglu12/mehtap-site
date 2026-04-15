import { getAdminUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const user = await getAdminUser();
  if (!user) redirect('/admin/login');

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Genel Bakış</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-xs font-medium uppercase tracking-wider">Toplam Hizmet</h3>
          <p className="text-2xl font-bold mt-2 text-indigo-600">6</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-xs font-medium uppercase tracking-wider">Okunmamış Mesajlar</h3>
          <p className="text-2xl font-bold mt-2 text-rose-600">12</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-xs font-medium uppercase tracking-wider">Aktif Blog Yazısı</h3>
          <p className="text-2xl font-bold mt-2 text-emerald-600">4</p>
        </div>
      </div>

      <div className="mt-6 bg-white p-5 rounded-xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold mb-3">Sistem Durumu</h2>
        <p className="text-slate-600 text-sm">Hoş geldiniz. Sol menüyü kullanarak içeriklerinizi güncelleyebilirsiniz.</p>
      </div>
    </div>
  );
}
