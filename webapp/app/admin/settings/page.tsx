import { supabase } from '@/lib/supabaseClient';
import SettingsForm from './SettingsForm';

export default async function SettingsPage() {
  const { data: settings } = await supabase.from('site_settings').select('*').single();

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Genel Ayarlar</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 max-w-2xl">
        <p className="text-slate-600 mb-4">Sitenizin adı, iletişim ayarları ve meta metinlerini değiştirebilirsiniz.</p>
        <SettingsForm initialData={settings || {}} />
      </div>
    </div>
  );
}
