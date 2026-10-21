'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function useBrands() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;
      setData(data ?? []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching brands:', err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch: fetchBrands };
}