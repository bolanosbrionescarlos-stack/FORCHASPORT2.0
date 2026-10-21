'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { productFilterSchema, type ProductFilter } from '@/lib/types';
import { z } from 'zod';

// Tipos
export interface Product {
  id: string;
  name: string;
  slug: string;
  description_short: string;
  description_long: string | null;
  category_id: string | null;
  brand_id: string | null;
  price_normal: number;
  price_promo: number | null;
  sku: string;
  is_active: boolean;
  is_featured: boolean;
  is_on_sale: boolean;
  stock_total: number;
  sort_order: number;
  created_at: string;
  updated_at: string | null;
  category?: any;
  brand?: any;
  images?: Image[];
}

export interface Image {
  id: string;
  product_id: string;
  url: string;
  alt_text: string | null;
  is_primary: boolean;
  sort_order: number;
}

export function useProducts(filter?: ProductFilter) {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const defaultFilter: ProductFilter = {
    page: 1,
    page_size: 12,
    sort_by: undefined,
    ...filter,
  };

  useEffect(() => {
    fetchProducts();
  }, [defaultFilter]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Construir la consulta base
      let query = supabase
        .from('products')
        .select(`
          *,
          category:categories (*),
          brand:brands (*),
          images:product_images (*)
        `, { count: 'exact' })
        .eq('is_active', true);

      // Aplicar filtros
      if (defaultFilter.query) {
        query = query.or(`name.ilike.%${defaultFilter.query}%,sku.ilike.%${defaultFilter.query}%`);
      }
      
      if (defaultFilter.category) {
        query = query.eq('category_id', defaultFilter.category);
      }
      
      if (defaultFilter.brand) {
        query = query.eq('brand_id', defaultFilter.brand);
      }
      
      if (defaultFilter.min_price !== undefined) {
        query = query.gte('price_normal', defaultFilter.min_price);
      }
      
      if (defaultFilter.max_price !== undefined) {
        query = query.lte('price_normal', defaultFilter.max_price);
      }

      // Aplicar ordenamiento
      const sortBy = defaultFilter.sort_by;
      if (sortBy === 'price_asc') {
        query = query.order('price_normal', { ascending: true });
      } else if (sortBy === 'price_desc') {
        query = query.order('price_normal', { ascending: false });
      } else if (sortBy === 'newest') {
        query = query.order('created_at', { ascending: false });
      } else if (sortBy === 'featured') {
        query = query.order('is_featured', { ascending: false }).order('created_at', { ascending: false });
      }

      // Aplicar paginación
      const from = (defaultFilter.page - 1) * defaultFilter.page_size;
      const to = from + defaultFilter.page_size - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;
      
      setData(data ?? []);
      setHasMore(defaultFilter.page < (count ?? 0) / defaultFilter.page_size);
      setPage(defaultFilter.page + 1);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, hasMore, refetch: fetchProducts };
}