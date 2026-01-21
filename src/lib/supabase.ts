import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type WaitlistEntry = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  country: string;
  language: 'fr' | 'en' | 'es';
  currency: string;
  terms_accepted: boolean;
  created_at?: string;
};
