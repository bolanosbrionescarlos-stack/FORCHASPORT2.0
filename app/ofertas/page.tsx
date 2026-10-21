'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProducts } from '../store/products';
import { useCart } from '../store/cart-context';

export default function OfertasPage() {
  const { data: products, fetchProducts, hasMore, isLoading } = useProducts();
  const { addItem } = useCart();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
            <Link href="/tienda" className="font-medium text-gray-500 hover:text-primary transition-colors">
              ← Volver a la tienda
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Ofertas Especiales</h1>
          </div>
        </header>

        <section className="py-12">
          <div className="max-w-7xl mx-auto">
            <p className="text-gray-500 text-sm mb-6">
              Los mejores descuentos en ropa deportiva, zapatillas y accesorios
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products
                .filter((p) => p.is_on_sale && p.is_active)
                .slice(0, 24)
                .map((product) => (
                  <div
                    key={product.id}
                    className="group border rounded-lg overflow-hidden hover:border-primary transition-colors border-gray-200"
                  >
                    <Image
                      src=product.images?.[0]?.url || '/productos/default.jpg'
                      alt={product.name}
                      width={200}
                      height={150}
                      className="aspect-w-4 aspect-h-3 object-cover w-full h-48"
                    />
                    <div className="p-3 flex flex-col flex-1">
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-2">{product.name}</h3>
                      <p className="text-xs text-gray-500 line-clamp-1">{product.brand?.name || ''}</p>
                      <div className="mt-2 flex items-baseline">
                        <span className="line-through text-gray-400 text-xs mr-1">{product.price_normal} S/<span>
                        <span className="text-red-600 font-bold text-xs">{product.price_promo} S/<span>
                      </div>
                    </div>
                    <div className="p-2 border-t border-gray-100">
                      <button
                        onClick={() => addItem({
                          id: product.id,
                          product_id: product.id,
                          name: product.name,
                          price: product.price_promo,
                          quantity: 1,
                          image_url: product.images?.[0]?.url || '/productos/default.jpg',
                        })}
                        className="w-full bg-primary text-white text-xs py-2 rounded font-medium hover:bg-secondary transition-colors"
                      >
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                ))
            }
        }
        </div>
        </section>
      </div>
    </main>
  );
}