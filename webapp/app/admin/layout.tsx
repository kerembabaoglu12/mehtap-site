import { getAdminUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const dynamic = 'force-dynamic'; // Never cache admin pages

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getAdminUser();

  // If no valid user and not already on the login page, redirect
  if (!user) {
    // We check the URL via headers — but since layout can't access URL easily,
    // we just render children (login page) without sidebar
    return <div className="min-h-screen bg-slate-50 flex flex-col">{children}</div>;
  }

  // Dashboard layout
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar username={user.username} />
      <main className="flex-1 ml-56 lg:ml-60 p-6 lg:p-8 overflow-y-auto min-h-screen">
        {children}
      </main>
    </div>
  );
}
