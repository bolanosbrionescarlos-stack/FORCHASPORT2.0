import Link from 'next/link';

export default function PoliticaDeEnviosPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
            <Link href="/tienda" className="font-medium text-gray-500 hover:text-primary transition-colors">
              ← Volver a la tienda
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Política de envíos</h1>
          </div>
        </header>

        <div className="bg-white rounded-lg p-8 shadow-sm max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Política de envíos</h2>
          
          <p className="text-gray-600 text-sm mb-6">
            En FORCHA SPORT ofrecemos envíos a todo Perú. A continuación detallamos 
            nuestras políticas de envío:
          </p>

          <div className="space-y-4 text-sm text-gray-500">
            <div>
              <p className="font-medium text-gray-700">Zonas de envío:</p>
              <p>Envíos a todo el territorio peruano (Lima, Provincias, Callao, etc.)</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">Costos de envío:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Lima metropolitana: S/ 15.00</li>
                <li>Provincias: S/ 25.00</li>
                <li>Envío gratis en pedidos sobre S/ 150.00</li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-700">Tiempos de entrega:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Lima metropolitana: 2-3 días hábiles</li>
                <li>Provincias: 5-7 días hábiles</li>
                <li>Tiempo de procesamiento: 1-2 días hábiles después de confirmado el pago</li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-700">Métodos de envío:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Envío estándar: 5-7 días hábiles</li>
                <li>Envío express: 2-3 días hábiles (costo adicional)</li>
                <li>Retiro en tienda: Disponible en nuestra sede de San Isidro</li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-700">Dirección de entrega:</p>
              <p>Los pedidos pueden enviarse a cualquier dirección dentro del Perú. 
              Es responsabilidad del cliente proporcionar una dirección completa y 
              precisa. No nos hacemos responsables por entregas fallidas por datos 
              incompletos.</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">Seguimiento de pedidos:</p>
              <p>Una vez enviado tu pedido, recibirás un número de seguimiento por 
              correo electrónico. Puedes rastrear tu pedido en cualquier momento.</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">Pedidos internacionales:</p>
              <p>Actualmente solo realizamos envíos dentro del Perú. Para solicitudes 
              de envío internacional, por favor contacta a nuestro servicio al cliente.</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Para consultas sobre envíos, contacta a: 
              <a href="mailto:envio@forchasport.com" className="text-primary hover:text-secondary transition-colors">
                envio@forchasport.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}