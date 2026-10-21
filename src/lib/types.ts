/// <reference types="next" />
/// <reference types="react" />
/// <reference types="react-dom" />

import { createSupabaseClient } from '@/lib/supabaseClient';
import { z } from 'zod';

// ======================
// Configuración de la tienda
// ======================
export const STORE_CONFIG = {
  name: 'FORCHA SPORT',
  description: 'Ropa deportiva, zapatillas y accesorios',
  currency: 'PEN',
  country: 'PE',
  currencySymbol: 'S/.',
  timezone: 'America/Lima',
} as const;

// ======================
// Roles y permisos
// ======================
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
  PRODUCT_MANAGER: 'product_manager',
  ORDER_MANAGER: 'order_manager',
} as const;

// ======================
// Esquemas de validación Zod
// ======================

// Categoría
export const categorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  is_active: z.boolean().default(true),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().optional(),
});

// Marca
export const brandSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  is_active: z.boolean().default(true),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().optional(),
});

// Producto - Schema básico para validación
export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  description_short: z.string(),
  description_long: z.string().optional(),
  category_id: z.string().uuid().optional(),
  brand_id: z.string().uuid().optional(),
  price_normal: z.number().positive(),
  price_promo: z.number().positive().optional(),
  sku: z.string().min(1),
  is_active: z.boolean().default(true),
  is_featured: z.boolean().default(false),
  is_on_sale: z.boolean().default(false),
  stock_total: z.number().int().default(0),
  sort_order: z.number().int().default(0),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().optional(),
});

// Variante de producto
export const productVariantSchema = z.object({
  id: z.string().uuid(),
  product_id: z.string().uuid(),
  sku: z.string().min(1),
  size: z.string().optional(),
  color: z.string().optional(),
  price_override: z.number().optional(),
  compare_at_price: z.number().optional(),
  stock: z.number().int().default(0),
  is_active: z.boolean().default(true),
});

// Imagen de producto
export const productImageSchema = z.object({
  id: z.string().uuid(),
  product_id: z.string().uuid(),
  url: z.string().url(),
  alt_text: z.string().optional(),
  is_primary: z.boolean().default(false),
  sort_order: z.number().int().default(0),
});

// Filtros de búsqueda
export const productFilterSchema = z.object({
  query: z.string().optional(),
  category: z.string().uuid().optional(),
  brand: z.string().uuid().optional(),
  min_price: z.number().optional(),
  max_price: z.number().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  sort_by: z.enum(['price_asc', 'price_desc', 'newest', 'featured']).optional(),
  page: z.number().int().default(1),
  page_size: z.number().int().default(12),
});

// Búsqueda de productos
export type ProductFilter = z.infer<typeof productFilterSchema>;

// ======================
// Tipos de dominio
// ======================

export type Category = z.infer<typeof categorySchema>;
export type Brand = z.infer<typeof brandSchema>;
export type Product = z.infer<typeof productSchema>;
export type ProductVariant = z.infer<typeof productVariantSchema>;
export type ProductImage = z.infer<typeof productImageSchema>;
export type ProductFilter = z.infer<typeof productFilterSchema>;

// ======================
// Carrito
// ======================
export type CartItem = {
  id: string;
  product_id: string;
  variant_id?: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image_url: string;
};

export type Cart = {
  items: CartItem[];
  total: number;
  subtotal: number;
  item_count: number;
};

// ======================
// Pedido
// ======================
export type OrderStatus = 
  | 'pendiente' 
  | 'pagado' 
  | 'enviado' 
  | 'entregado' 
  | 'cancelado' 
  | 'reembolsado';

export type PaymentMethod = 
  | 'mercado_pago' 
  | 'transferencia' 
  | 'contra_entrega';

export type PaymentStatus = 
  | 'pendiente' 
  | 'aprobado' 
  | 'rechazado' 
  | 'reembolsado' 
  | 'cancelado';

export interface Order {
  id: string;
  user_id: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shipping_address: ShippingAddress;
  items: OrderItem[];
  transaction_id?: string;
  coupon_code?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id?: string;
  product_name: string;
  product_slug: string;
  price_at_purchase: number;
  quantity: number;
  size?: string;
  color?: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  district: string;
  department: string;
  postal_code: string;
  phone: string;
}

export type PaymentMethod = z.infer<typeof z.enum(['mercado_pago', 'transferencia', 'contra_entrega'])>;

// ======================
// Cupón
// ======================
export type CouponCode = 'BIENVENIDA' | 'DEPORTES' | 'FRETEGRATIS';

export interface Coupon {
  code: CouponCode;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_purchase: number;
  max_uses: number;
  uses_count: number;
  is_active: boolean;
  expires_at: string;
}

// ======================
// Configuración de tienda
// ======================
export interface StoreSettings {
  store_name: string;
  store_logo?: string;
  currency: string;
  country: string;
  shipping_cost: number;
  free_shipping_threshold: number;
  return_policy: string;
  shipping_policy: string;
  privacy_policy: string;
  terms_policy: string;
  social_media: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

// ======================
// Perfil de usuario
// ======================
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  address?: string;
  created_at: string;
  updated_at: string;
}