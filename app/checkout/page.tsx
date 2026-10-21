'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../store/cart-context';
import { useSupabase } from '../store/lib/supabase-context';

export default function CheckoutPage() {
  const { addItem, cart, total } = useCart();
  const { supabase, getSession } = useSupabase();
  const [clientData, setClientData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
    distrito: '',
    departamento: '',
    codigo_postal: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderCreated, setOrderCreated] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: session, error: authError } = await supabase.auth.getSession();
      if (authError) throw new Error('Error de autenticación');

      const userId = session.session?.user?.id;
      if (!userId) throw new Error('Usuario no autenticado');

      const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const discount = 0;
      const shipping = subtotal > 150 ? 0 : 15;
      const grandTotal = subtotal + shipping - discount;

      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userId,
          status: 'pendiente',
          payment_status: 'pendiente',
          payment_method: 'mercado_pago',
          subtotal,
          discount,
          shipping,
          total: grandTotal,
          shipping_address: {
            street: clientData.direccion,
            district: clientData.distrito,
            department: clientData.departamento,
            postal_code: clientData.codigo_postal,
            city: 'Lima',
            phone: clientData.telefono,
          },
          items: cart.items.map((item) => ({
            product_id: item.product_id,
            variant_id: item.variant_id,
            product_name: item.name,
            price_at_purchase: item.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
          })),
          coupon_code: null,
        });

      if (orderError) throw orderError;

      setOrderCreated(true);

      // Resetear carrito
      setCart({ items: [], total: 0, subtotal: 0, itemCount: 0 });

    } catch (err: any) {
      setError(err.message || 'Error desconocido al procesar el pedido');
      console.error('Error en checkout:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
            <Link href="/carrito" className="font-medium text-gray-500 hover:text-primary transition-colors">
              ← Volver al carrito
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Finalizar compra</h1>
          </div>
        </header>

        {/* Formulario de datos */}
        {orderCreated ? (
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Orden confirmada</h2>
            <p className="text-gray-500 mb-6">
              Tu pedido ha sido creado exitosamente. Recibirás un correo electrónico con la confirmación y el número de seguimiento.
            </p>
            <div className="bg-gray-100 rounded p-4 mb-6">
              <p className="font-medium">Número de orden: <span className="font-mono">ORD-#{Math.random().toString(36).substr(2, 8).toUpperCase()}</span></p>
              <p className="text-sm">Fecha: {new Date().toLocaleDateString('es-PE')}</p>
            </div>
            <Link href="/mi-cuenta" className="inline-block bg-primary text-white px-6 py-3 rounded font-medium hover:bg-secondary transition-colors">
              Ver mi pedido
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Datos de entrega</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={clientData.nombre}
                  onChange={(e) => setClientData({ ...clientData, nombre: e.target.value })}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={clientData.telefono}
                  onChange={(e) => setClientData({ ...clientData, telefono: e.target.value })}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+51 9XX XXX XXX"
                  required
                />
              </div>

              {/* Correo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={clientData.email}
                  onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              {/* Dirección */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección
                </label>
                <input
                  type="text"
                  value={clientData.direccion}
                  onChange={(e) => setClientData({ ...clientData, direccion: e.target.value })}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Calle principal número 123"
                  required
                />
              </div>

              {/* Distrito y Departamento */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Distrito
                  </label>
                  <input
                    type="text"
                    value={clientData.distrito}
                    onChange={(e) => setClientData({ ...clientData, distrito: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="San Isidro"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departamento
                  </label>
                  <input
                    type="text"
                    value={clientData.departamento}
                    onChange={(e) => setClientData({ ...clientData, departamento: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Lima"
                    required
                  />
                </div>
              </div>

              {/* Código postal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código postal
                </label>
                <input
                  type="text"
                  value={clientData.codigo_postal}
                  onChange={(e) => setClientData({ ...clientData, codigo_postal: e.target.value })}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="15047"
                  required
                />
              </div>

              {/* Método de pago */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Método de pago
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <label
                    key="mp"
                    className={`flex items-center gap-2 px-3 py-1 rounded border ${
                      'mercado_pago' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-300 text-gray-400'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M2 12l2-2m0 0l7-7 7 7M5 10l7-7 7 7M5 14l7-7 7-7"/>
                    </path>
                  </label>
                  <span className="font-medium">Mercado Pago</span>
                </label>
                </div>
              </div>

              {/* Observaciones */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observaciones (opcional)
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Instrucciones de entrega especiales..."
                ></textarea>
              </div>

              {/* Botón de continuar */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-full font-medium hover:bg-secondary transition-colors"
              >
                {loading ? 'Procesando...' : 'Continuar a pago'}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}