import { useParams, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSupabase } from '@/app/(store)/supabase-context';

export default function PedidoPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { supabase } = useSupabase();

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      
      // Obtener la orden de la base de datos
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items:order_items (
            *,
            product:products (*)
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (err: any) {
      console.error('Error fetching order:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Cargando pedido...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Pedido no encontrado</p>
        <Link href="/tienda" className="text-primary hover:text-secondary transition-colors">Volver a la tienda</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
            <Link href="/mi-cuenta" className="font-medium text-gray-500 hover:text-primary transition-colars">
              ← Volver a mi cuenta
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Confirmación de pedido</h1>
          </div>
        </header>

        {/* Información del pedido */}
        <section className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="grid grid-cols-2 gap-6">
            
            {/* Datos de la orden */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Detalles del pedido</h2>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Número de orden:</span>
                  <span className="font-mono text-primary">#{id}</span>
                </div>
                <div>
                  <span className="font-method">Fecha:</span>
                  <span>{new Date(order.created_at).toLocaleDateString('es-PE')}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="font-medium text-gray-700">Estado:</p>
                <span className={`px-2 py-1 rounded text-xs ${
                  order.payment_status === 'aprobado' ? 'bg-green-100 text-green-800' :
                  order.payment_status === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                  order.payment_status === 'rechazado' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {order.payment_status}
                </span>
              </div>
            </div>

            {/* Resumen */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Resumen</h2>
              
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Subtotal:</span>
                  <span>{order.subtotal.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })}</span>
                </div>
                {order.discount > 0 && (
                  <div>
                    <span className="font-medium">Descuento:</span>
                    <span className="text-red-600">{order.discount.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })}</span>
                  </div>
                )}
                <div>
                  <span className="font-method">Envío:</span>
                  <span>{order.shipping.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })}</span>
                </div>
                <div>
                  <span className="font-medium">Total:</span>
                  <span className="text-xl font-bold text-red-600">{order.total.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Items del pedido */}
        <section className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Productos comprados</h2>
          <div className="space-y-4">
            {order.order_items.map((item: any) => (
              <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg">
                <Image
                  src=item.product.images?.[0]?.url || '/productos/default.jpg'
                  alt={item.product_name}
                  width={60}
                  height={60}
                  className="rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 line-clamp-1">{item.product_name}</p>
                  <p className="text-xs text-gray-500">Talla: {item.size || 'N/A'}, Color: {item.color || 'N/A'}</p>
                </div>
                <span className="font-medium">{item.quantity} x {item.price_at_purchase.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Información de seguimiento */}
        {order.shipping_tracking_number && (
          <section className="py-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Seguimiento de envío</h2>
              <p className="text-gray-500 mb-6">Tu pedido ha sido enviado</p>
              <div className="bg-gray-100 rounded p-6">
                <p className="font-medium">Número de seguimiento: <span className="font-mono bg-white rounded px-2">{order.shipping_tracking_number}</span></p>
                <p className="text-sm text-gray-500">Transportista: {order.shipping_company || 'Por definir'}</p>
              </div>
            </div>
          </section>
        )}

        {/* Botones de acción */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Link href="/mis-pedidos" className="flex-1 bg-gray-50 rounded px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-colors">
              Ver todos mis pedidos
            </Link>
            <Link href="/" className="flex-1 bg-primary text-white rounded px-4 py-2 text-sm hover:bg-secondary transition-colors">
              Continuar comprando
            </Link>
          </div>
          
          {order.payment_status !== 'aprobado' && (
            <button
              onClick={() => {}}
              className="w-full bg-red-500 text-white rounded px-4 py-2 text-sm hover:bg-red-600 transition-colors"
            >
              Contactar soporte
            </button>
          )}
        </div>
      </div>
    </main>
  );
}