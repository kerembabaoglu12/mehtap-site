import { supabase } from '@/lib/supabaseClient';
import ServicesTable from './ServicesTable';

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('order_num', { ascending: true });

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Hizmetler Yönetimi</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
        <div className="mb-6">
          <p className="text-slate-600">Mevcut hizmetlerinizi kurumsal sitede görünecek şekilde güncelleyin.</p>
        </div>
        <ServicesTable initialData={services || []} />
      </div>
    </div>
  );
}
