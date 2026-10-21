import Link from 'next/link';

export default function PoliticaDeDevolucionesPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
            <Link href="/tienda" className="font-medium text-gray-500 hover:text-primary transition-colors">
              ← Volver a la tienda
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Política de devoluciones y cambios</h1>
          </div>
        </header>

        <div className="bg-white rounded-lg p-8 shadow-sm max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Política de devoluciones y cambios</h2>
          
          <p className="text-gray-600 text-sm mb-6">
            En FORCHA SPORT nos comprometemos con tu satisfacción. A continuación 
            detallamos nuestras políticas de devolución y cambio:
          </p>

          <div className="space-y-4 text-sm text-gray-500">
            <div>
              <p className="font-medium text-gray-700">Plazo de devolución:</p>
              <p>Tienes 30 días hábiles desde la fecha de entrega para solicitar 
              una devolución o cambio de tu producto.</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">Productos elegibles:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Productos en su estado original, sin usar y con etiquetas</li>
                <li>Productos en su empaque original</li>
                <li>Productos sin signos de uso o lavado</li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-700">Productos no elegibles:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Productos íntimos (pañuelos, calcetines, lencería)</li>
                <li>Productos personalizados o con grabado</li>
                <li>Tarjetas de regalo</li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-700">Proceso de cambio:</p>
              <ol classList pl-5 space-y-1>
                <li>Contacta a nuestro servicio al cliente dentro del plazo establecido</li>
                <li>Proporciona el número de orden y fotos del producto</li>
                <li>Espera la autorización y la etiqueta de envío</li>
                <li>Envía el producto en su empaque original</li>
                <li>Recibe tu cambio o reembolso en un plazo de 7-10 días hábiles</li>
              </ol>
            </div>

            <div>
              <p className="font-medium text-gray-700">Reembolso:</p>
              <p>Los reembolsos se procesarán dentro de los 7-10 días hábiles 
              posteriores a la recepción y inspección del producto devuelto. El 
              reembolso se hará al mismo método de pago utilizado en la compra.</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Para iniciar una devolución, por favor contacta a: 
              <a href="mailto:devoluciones@forchasport.com" className="text-primary hover:text-secondary transition-colors">
                devoluciones@forchasport.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}