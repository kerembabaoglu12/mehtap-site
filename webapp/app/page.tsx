import { supabase } from '@/lib/supabaseClient';
import HomePageContent from './HomePageContent';

export const revalidate = 60; // 1 dakika cache

export default async function Home() {
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('order_num', { ascending: true });

  const { data: settings } = await supabase
    .from('site_settings')
    .select('*')
    .single();

  return (
    <HomePageContent services={services || []} settings={settings || {}} />
  );
}
