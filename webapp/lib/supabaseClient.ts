import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables! Please check your .env or Vercel settings.')
}

// Standart export (Uygulamanın geri kalanı import { supabase } kullanıyor)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', // Build-time error almamak için fallback
  supabaseAnonKey || 'placeholder_key'
)
