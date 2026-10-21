'use strict';
import { createClient } from '@supabase/supabase-js';

// Estas variables deben configurarse en las variables de entorno de Vercel
// NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tu-proyecto.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'tu-anon-key-aqui';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoSignIn: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});