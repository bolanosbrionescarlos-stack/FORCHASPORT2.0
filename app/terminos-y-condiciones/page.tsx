import Link from 'next/link';

export default function TerminosYCondicionesPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
            <Link href="/tienda" className="font-medium text-gray-500 hover:text-primary transition-colors">
              ← Volver a la tienda
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Términos y condiciones</h1>
          </div>
        </header>

        <div className="bg-white rounded-lg p-8 shadow-sm max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Términos y condiciones de compra</h2>
          
          <p className="text-gray-600 text-sm mb-6">
            Estas condiciones regulan el uso de este sitio web y la compra de productos 
            en FORCHA SPORT. Al acceder a este sitio o realizar una compra, aceptas 
            estar sujeto a los siguientes términos.
          </p>

          <div className="space-y-4 text-sm text-gray-500">
            <div>
              <p className="font-medium text-gray-700">1. Aceite de estos términos</p>
              <p>Al acceder a este sitio web y/o realizar una compra en FORCHA SPORT, 
              aceptas estar sujeto a estos términos y condiciones. Si no estás de acuerdo 
              con alguna parte de estos términos, por favor no uses este sitio web ni 
              realices compras.</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">2. Información de productos</p>
              <p>Todos los productos descritos en el sitio web se ofrecen sujetos a 
              disponibilidad. Nos reservamos el derecho de modificar o retirar cualquier 
              producto en cualquier momento. Los precios y disponibilidad pueden cambiar 
              sin previo aviso.</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">3. Precios y pago</p>
              <p>Todos los precios se muestran en Soles Peruanos (PEN) a menos que se 
              indique lo contrario. Nos reservamos el derecho de modificar precios en 
              cualquier momento. El pago se procesa a través de proveedores externos 
              seguros.</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">4. Envío y entrega</p>
              <p>Los tiempos de envío varían según la ubicación y el método de envío 
              seleccionado. Los costos de envío se calculan al finalizar la compra. No 
              nos hacemos responsables por retrasos causados por el transportista.</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">5. Devoluciones y cambios</p>
              <p>Consulte nuestra política de devoluciones y cambios para obtener 
              información detallada sobre plazos, condiciones y procesos.</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">6. Limitación de responsabilidad</p>
              <p>En la medida máxima permitida por la ley, FORCHA SPORT no será 
              responsable por daños indirectos, incidentales o consecuentes derivados 
              del uso o la imposibilidad de usar el sitio web.</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">7. Ley aplicable</p>
              <p>Estos términos se regirán e interpretarán de acuerdo con las leyes de 
              Perú. Cualquier disputa estará sujeta a la jurisdicción de los tribunales 
de Perú.</p>
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