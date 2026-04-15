/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';

// -- SETTINGS --
export async function updateSettings(data: any) {
  const { error } = await supabase
    .from('site_settings')
    .update(data)
    .eq('id', data.id);
    
  if (error) {
    return { success: false, error: error.message };
  }
  revalidatePath('/');
  return { success: true };
}

// -- SERVICES --
export async function upsertService(data: any) {
  const { error } = await supabase
    .from('services')
    .upsert(data, { onConflict: 'id' });
    
  if (error) {
    return { success: false, error: error.message };
  }
  revalidatePath('/');
  revalidatePath('/hizmetler');
  return { success: true };
}

export async function deleteService(id: string) {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);
    
  if (error) {
    return { success: false, error: error.message };
  }
  revalidatePath('/');
  revalidatePath('/hizmetler');
  return { success: true };
}

// -- SUBMISSIONS --
export async function toggleSubmissionRead(id: string, is_read: boolean) {
  const { error } = await supabase
    .from('form_submissions')
    .update({ is_read })
    .eq('id', id);
    
  if (error) {
    return { success: false, error: error.message };
  }
  revalidatePath('/admin/submissions');
  return { success: true };
}
