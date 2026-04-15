import { supabase } from '@/lib/supabaseClient';
import SubmissionsTable from './SubmissionsTable';

// Server rendering ile SSR veriyi çekiyoruz
export const dynamic = 'force-dynamic';

export default async function SubmissionsPage() {
  const { data: submissions } = await supabase
    .from('form_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Form Başvuruları</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
        <p className="text-slate-600 mb-6">Web sitesi üzerinden gelen iletişim ve teklif formlarını buradan görüntüleyebilirsiniz.</p>
        <SubmissionsTable initialData={submissions || []} />
      </div>
    </div>
  );
}
