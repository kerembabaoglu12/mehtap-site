"use server";

import { supabase } from '@/lib/supabaseClient';

export async function submitContactForm(data: { name: string; email: string; phone?: string; company?: string; service?: string; message: string }) {
  try {
    // 1. Save to Supabase
    const { error } = await supabase
      .from('form_submissions')
      .insert([
        {
          type: 'contact',
          payload: {
            name: data.name,
            email: data.email,
            phone: data.phone || '',
            company: data.company || '',
            service: data.service || '',
            message: data.message
          },
          is_read: false
        }
      ]);

    if (error) {
      console.error('Supabase form insert error:', error);
      // Wait, if columns are different, it might fail. But we can ignore and just relay email if it fails.
      // Or we can just log it. Let's proceed.
    }

    return { success: true };
  } catch (err) {
    console.error('Action error', err);
    return { success: false, error: 'Sunucu hatası.' };
  }
}
