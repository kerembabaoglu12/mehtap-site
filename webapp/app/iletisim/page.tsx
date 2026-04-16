import { supabase } from '@/lib/supabaseClient';
import IletisimPageClient from './IletisimPageClient';

export const dynamic = 'force-dynamic';

export default async function IletisimPage() {
  const { data: settings } = await supabase.from('site_settings').select('*').single();
  return <IletisimPageClient settings={settings || {}} />;
}
