import Link from 'next/link';

export default function PoliticaDePrivacidadPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
            <Link href="/tienda" className="font-medium text-gray-500 hover:text-primary transition-colors">
              ← Volver a la tienda
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Política de privacidad</h1>
          </div>
        </header>

        <div className="bg-white rounded-lg p-8 shadow-sm max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Política de privacidad</h2>
          
          <p className="text-gray-600 text-sm mb-6">
            En FORCHA SPORT valoramos tu privacidad. Esta política describe cómo 
            recopilamos, usamos y protegemos tu información personal.
          </p>

          <div className="space-y-4 text-sm text-gray-500">
            <div>
              <p className="font-medium text-gray-700">Información que recopilamos:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Nombre y apellidos</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Dirección de envío y facturación</li>
                <li>Historial de compras</li>
                <li>Datos de pago (procesados de forma segura por proveedores)</li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-700">Cómo utilizamos tu información:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Para procesar y entregar tus pedidos</li>
                <li>Para comunicarnos contigo sobre tus pedidos</li>
                <li>Para mejorar nuestros productos y servicios</li>
                <li>Para enviar comunicaciones de marketing (si has consentido)</li>
                <li>Para cumplir con obligaciones legales</li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-700">Protección de datos:</p>
              <p>No vendemos ni compartimos tus datos personales con terceros para 
              fines de marketing, excepto cuando sea necesario para procesar tus 
              pedidos (transportistas, proveedores de pago).</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">Tus derechos:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Acceder a tus datos personales</li>
                <li>Solicitar la corrección de información inexacta</li>
                <li>Solicitar la eliminación de tus datos</li>
                <li>Oponerte al tratamiento de tus datos</li>
                <li>Solicitar la limitación del tratamiento</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Última actualización: octubre 2026
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}