'use client';
import { createClient } from '@supabase/supabase-js';
import { useEffect } from 'react';

function createSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  return createClient(url, key);
}

export function useSupabase() {
  const supabase = createSupabaseClient();

  return {
    supabase,
    // Hook para obtener la sesión actual
    getSession: async () => {
      const { data: { session} } = await supabase.auth.getSession();
      return session;
    },
    // Hook para iniciar sesión
    signIn: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { data, error };
    },
    // Hook para registrar usuario
    signUp: async (email: string, password: string, fullName: string) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      return { data, error };
    },
    // Hook para cerrar sesión
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      return { error };
    },
    // Hook para actualizar perfil
    updateProfile: async (profile: { full_name: string; phone: string }) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', supabase.auth.getSession().then(({ data }) => data.session?.user.id));
      return { data, error };
    },
  };
}