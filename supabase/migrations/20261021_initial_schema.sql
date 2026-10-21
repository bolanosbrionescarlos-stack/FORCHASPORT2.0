-- Migration: 20261021_initial_schema
-- Initial schema for FORCHA SPORT e-commerce platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. perfiles table - Perfiles de usuario extendidos
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin', 'product_manager', 'order_manager')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. user_roles table - Roles y permisos de usuarios
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL CHECK (role IN ('user', 'admin', 'super_admin', 'product_manager', 'order_manager')),
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- 3. categories table - Categorías de productos
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. brands table - Marcas deportivas
CREATE TABLE IF NOT EXISTS brands (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. products table - Productos del catálogo
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description_short TEXT NOT NULL,
  description_long TEXT,
  category_id UUID REFERENCES categories(id),
  brand_id UUID REFERENCES brands(id),
  price_normal INTEGER NOT NULL, -- Almacenado en centavos para precisión
  price_promo INTEGER, -- Precio promocional en centavos, NULL si no hay oferta
  sku VARCHAR(100) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_on_sale BOOLEAN DEFAULT DEFAULT false,
  stock_total INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. product_images table - Imágenes de productos
CREATE TABLE IF NOT EXISTS product_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text VARCHAR(255),
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. product_variants table - Variantes de producto (talla/color)
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  sku VARCHAR(100) NOT NULL,
  size VARCHAR(50),
  color VARCHAR(50),
  price_override INTEGER, -- Sobrescribir precio para esta variante, NULL si usa precio normal
  compare_at_price INTEGER, -- Precio comparativo (tachado)
  stock INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, sku)
);

-- 8. inventory_movements table - Movimientos de inventario
CREATE TABLE IF NOT EXISTS inventory_movements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_variant_id UUID REFERENCES product_variants(id),
  product_id UUID REFERENCES products(id),
  type VARCHAR(50) NOT CHECK (type IN ('entry', 'exit', 'adjustment')),
  quantity INTEGER NOT NULL,
  reason VARCHAR(100),
  reference_id UUID, -- Referencia a orden, venta, ajuste, etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. orders table - Órdenes de compra
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  status VARCHAR(50) DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'pagado', 'enviado', 'entregado', 'cancelado', 'reembolsado')),
  payment_status VARCHAR(50) DEFAULT 'pendiente' CHECK (payment_status IN ('pendiente', 'aprobado', 'rechazado', 'reembolsado', 'cancelado')),
  payment_method VARCHAR(50) DEFAULT 'mercado_pago', -- mercado_pago, transferencia, contra_entrega
  subtotal INTEGER NOT NULL, -- En centavos
  discount INTEGER DEFAULT 0, -- En centavos
  shipping INTEGER DEFAULT 0, -- En centavos
  total INTEGER NOT NULL, -- En centavos
  transaction_id VARCHAR(255), -- ID de transacción del proveedor de pagos
  coupon_code VARCHAR(50), -- Código de cupón aplicado
  shipping_address JSONB, -- Datos completos de envío
  items JSONB NOT NULL, -- Detalle de items comprados
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. order_items table - Items de una orden
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id),
  product_name VARCHAR(255) NOT NULL,
  product_slug VARCHAR(255) NOT NULL,
  price_at_purchase INTEGER NOT NULL, -- Precio al momento de la compra en centavos
  quantity INTEGER NOT NULL,
  size VARCHAR(50),
  color VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. payments table - Registros de pagos
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) UNIQUE,
  provider VARCHAR(50) NOT NULL, -- mercado_pago, stripe, transferencia
  provider_payment_id VARCHAR(255), -- ID del pago en el proveedor
  amount INTEGER NOT NULL, -- En centavos
  status VARCHAR(50) DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'aprobado', 'rechazado', 'reembolsado', 'cancelado')),
  currency VARCHAR(10) DEFAULT 'PEN',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. payment_events table - Eventos de pago (webhooks)
CREATE TABLE IF NOT EXISTS payment_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  payment_id UUID REFERENCES payments(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL, -- payment.created, payment.approved, payment.refunded, etc.
  provider_data JSONB, -- Datos completos del evento del proveedor
  processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. addresses table - Direcciones guardadas de usuarios
CREATE TABLE IF NOT EXISTS addresses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  label VARCHAR(100), -- 'home', 'work', etc.
  street VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  district VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  phone VARCHAR(50),
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. coupons table - Cupones de descuento
CREATE TABLE IF NOT EXISTS coupons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN 'percentage', 'fixed'),
  discount_value INTEGER NOT NULL, -- Valor del descuento (porcentaje o monto fijo)
  min_purchase INTEGER DEFAULT 0, -- Compra mínima requerida para usar el cupón
  max_uses INTEGER DEFAULT NULL, -- Número máximo de usos (NULL = ilimitado)
  uses_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. coupon_redemptions table - Redenciones de cupones
CREATE TABLE IF NOT EXISTS coupon_redemptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  coupon_id UUID REFERENCES coupons(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id),
  user_id UUID REFERENCES profiles(id),
  used_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(coupon_id, order_id)
);

-- 16. shipments table - Información de envíos
CREATE TABLE IF NOT EXISTS shipments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) UNIQUE,
  tracking_number VARCHAR(255),
  carrier VARCHAR(100), -- Nombre del transportista
  status VARCHAR(50) DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'enviado', 'en_tránsito', 'entregado', 'devuelto')),
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. store_settings table - Configuración de la tienda
CREATE TABLE IF NOT EXISTS store_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  value_type VARCHAR(50) DEFAULT 'string' CHECK (value_type IN ('string', 'integer', 'boolean', 'json')),
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. audit_logs table - Registros de auditoría
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  action VARCHAR(100) NOT NULL,
  table_name VARCHAR(100),
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para optimización de consultas

-- Índices en products
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand_id ON products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_is_on_sale ON products(is_on_sale);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_price_normal ON products(price_normal);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

-- Índices en product_images
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_images_primary ON product_images(product_id, is_primary);

-- Índices en product_variants
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_sku ON product_variants(sku);
CREATE INDEX IF NOT EXISTS idx_product_variants_size ON product_variants(size);
CREATE INDEX IF NOT EXISTS idx_product_variants_color ON product_variants(color);

-- Índices en orders
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders.payment_status;
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_transaction_id ON orders(transaction_id);

-- Índices en order_items
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- Índices en payments
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

-- Índices en coupons
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_active ON coupons(is_active);
CREATE INDEX IF NOT EXISTS idx_coupons_expires_at ON coupons(expires_at);

-- Índices en store_settings
CREATE INDEX IF NOT EXISTS idx_store_settings_key ON store_settings(key);

-- Índices en audit_logs
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);

-- Comentarios en la base de datos
COMMENT ON TABLE profiles IS 'Perfiles de usuario extendidos con roles y permisos';
COMMENT ON TABLE categories IS 'Categorías de productos para el catálogo';
COMMENT ON TABLE brands IS 'Marcas deportivas disponibles en la tienda';
COMMENT ON TABLE products IS 'Catálogo de productos disponibles para la venta';
COMMENT ON TABLE product_images IS 'Imágenes asociadas a cada producto';
COMMENT ON TABLE product_variants IS 'Variantes de producto por talla y color';
COMMENT ON TABLE inventory_movements IS 'Registro de movimientos de inventario (entradas, salidas, ajustes)';
COMMENT ON TABLE orders IS 'Órdenes de compra de los clientes';
COMMENT ON TABLE order_items IS 'Items individuales dentro de cada orden';
COMMENT ON TABLE payments IS 'Registros de transacciones de pago';
COMMENT ON TABLE payment_events IS 'Eventos de webhook del proveedor de pagos';
COMMENT ON TABLE addresses IS 'Direcciones guardadas de los usuarios';
COMMENT ON TABLE coupons IS 'Cupones de descuento para promociones';
COMMENT ON TABLE coupon_redemptions IS 'Historial de uso de cupones por órdenes';
COMMENT ON TABLE shipments IS 'Información de seguimiento y envíos';
COMMENT ON TABLE store_settings IS 'Configuración general de la tienda';
COMMENT ON TABLE audit_logs IS 'Registros de auditoría para todas las operaciones administrativas';