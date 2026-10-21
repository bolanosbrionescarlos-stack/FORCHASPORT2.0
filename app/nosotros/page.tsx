import Link from 'next/link';

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
            <Link href="/tienda" className="font-medium text-gray-500 hover:text-primary transition-colors">
              ← Volver a la tienda
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Nosotros</h1>
          </div>
        </header>

        {/* Sección principal */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary rounded px-4 py-2 mb-8">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path className="stroke-2" d="M12 1v2m0 10l-3-3m3 3l3-3m2 4h2m7-4v12m0-10l3 3m-3-3l-3-3m-7 4v-12m0 10l-3 3M9 15H5a2 2 0 01-2-2V5a2 2 0 012-2h2a2 2 0 012 2v/8m-7 4h16a2 2 0 010 4h-2.688c.03.65.063 1.321.097 1.964a1.588 1.588 0 01.168.601l1.176 1.176c.267.266.693.266.96 0l1.176-1.176c.1-.1.168-.505.097-1.964A11.955 11.955 0 0112.688 3H5a2 2 0 01-2-2z"/>
              </svg>
              <span>Nuestra historia</span>
            </div>

            <img
              src="/nosotros-banner.jpg"
              alt="FORCHA SPORT equipo"
              width={400}
              height={300}
              className="rounded-lg my-8 object-cover"
            />

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprometidos con el deporte
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              En FORCHA SPORT nacimos con una misión clara: ofrecer a los deportistas de 
              todos los niveles el mejor equipamiento, ropa y calzado para alcanzar sus 
              metas. Desde nuestra fundación, nos enfocamos en la calidad, el rendimiento 
              y el estilo en cada producto que ofrecemos.
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div>
                <div className="flex items-center gap-2 text-primary mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path className="stroke-2" d="M12 1v2m0 10l-3-3m3 3l3-3m2 4h2m7-4v12m0-10l3 3m-3-3l-3-3m-7 4v-12m0 10l-3 3M9 15H5a2 2 0 01-2-2V5a2 2 0 012-2h2a2 2 0 012 2v/8m-7 4h16a2 2 0 010 4h-2.688c.03.65.063 1.321.097 1.964a1.588 1.588 0 01.168.601l1.176 1.176c.267.266.693.266.96 0l1.176-1.176c.1-.1.168-.505.097-1.964A11.955 11.955 0 0112.688 3H5a2 2 0 01-2-2z"/>
                  </svg>
                  <span>20+ años</span>
                </div>
                <p className="text-sm text-gray-500">
                  experiencia en el rubro
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-primary mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path className="stroke-2" d="M12 1v2m0 10l-3-3m3 3l3-3m2 4h2m7-4v12m0-10l3 3m-3-3l-3-3m-7 4v-12m0 10l-3 3M9 15H5a2 2 0 01-2-2V5a2 2 0 012-2h2a2 2 0 012 2v/8m-7 4h16a2 2 0 010 4h-2.688c.03.65.063 1.321.097 1.964a1.588 1.588 0 01.168.601l1.176 1.176c.267.266.693.266.96 0l1.176-1.176c.1-.1.168-.505.097-1.964A11.955 11.955 0 0112.688 3H5a2 2 0 01-2-2z"/>
                  </svg>
                  <span>5000+ clientes</span>
                </div>
                <p className="text-sm text-gray-500">
                  satisfacciones
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ubicación</h3>
              <address className="text-sm text-gray-500">
                <p>Av. Deportivo N° 123</p>
                <p>San Isidro, Lima - Perú</p>
                <p>Horario: Lunes a Sábado, 9:00 - 19:00</p>
              </address>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}