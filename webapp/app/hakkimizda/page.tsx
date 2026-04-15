import { supabase } from '@/lib/supabaseClient';
import HakkimizdaClient from './HakkimizdaClient';

export const revalidate = 60;

export default async function HakkimizdaPage() {
  const { data: settings } = await supabase.from('site_settings').select('*').single();
  return <HakkimizdaClient settings={settings || {}} />;
}
