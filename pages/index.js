export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* A. BARRA SUPERIOR */}
      <header className="bg-black border-b border-border px-4 py-2 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-col sm:flex-row gap-2 sm:gap-0">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-lima">FORCHA</span>
            <span className="text-lg font-semibold">SPORT</span>
          </div>
          <nav className="hidden sm:block flex items-center gap-8">
            <a href="/tienda" className="text-gray-claro text-sm hover:text-green-lima transition-colors">Tienda</a>
            <a href="/ofertas" className="text-gray-claro text-sm hover:text-green-lima transition-colors">Ofertas</a>
            <a href="/novedades" className="text-gray-claro text-sm hover:text-green-lima transition-colors">Novedades</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="/carrito" className="relative">
              <svg className="w-5 h-5 text-gray-claro" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1l4 4l14 M21 1l-4 4l-14"></path>
              </svg>
              <span className="absolute -top-1 -right-1 bg-green-lima text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">3</span>
            </a>
            <a href="/contacto" className="text-gray-claro text-sm hover:text-green-lima transition-colors">Contacto</a>
          </div>
        </div>
      </header>

      {/* B. HERO PRINCIPAL */}
      <section className="section relative">
        <div className="relative grid lg:grid-cols-[600px_1fr] gap-8 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-green-lima text-black text-sm font-medium tracking-wider mb-6">NUEVA COLECCIÓN 2024</span>
            <h1 className="h1 mb-6">Rendimiento Sin Límites</h1>
            <p className="body mb-8 max-w-2xl">
              Equipamiento deportivo premium para atletas que exigen lo mejor. Zapatillas de rendimiento, ropa técnica y accesorios diseñados para la excelencia.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary">Explore la Colección</button>
              <button className="btn-secondary">Ver Todas las Ofertas</button>
            </div>
          </div>
          <div className="relative">
            {/* Background pattern or product image placeholder */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-800/50 h-[400px] sm:h-[500px] lg:h-[600px]">
              {/* Decorative element or product showcase */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-lima/20 to-transparent"></div>
              <div className="absolute bottom-0 right-0 p-6">
                <span className="text-green-oscuro font-medium text-sm">Envío Gratis</span>
                <span className="text-white font-bold text-lg ml-2">|</span>
                <span className="text-green-oscuro font-medium text-sm">Devoluciones 30 días</span>
              </div>
            </div>
          </div>
        </div>
        {/* Floating shapes decoration */}
        <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-green-lima/5 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -top-4 -right-4 w-48 h-48 bg-green-oscuro/5 rounded-full blur-3xl opacity-30"></div>
      </section>

      {/* C. SECCIÓN DE CATEGORÍAS */}
      <section className="section bg-gray-grafito">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            <div className="card hover:bg-gray-claro/5 transition-colors cursor-pointer">
              <div className="h-20 bg-gradient-to-b from-green-lima/20 to-transparent flex items-center justify-center">
                <span className="text-4xl font-bold text-green-lima">👟</span>
              </div>
              <h3 className="h3 mt-4 text-center">Zapatillas</h3>
              <p className="caption text-center mt-2">Rendimiento en cada paso</p>
              <a href="/tienda" className="text-green-lima text-sm font-medium mt-3 block">Ver productos</a>
            </div>
            <div className="card hover:bg-gray-claro/5 transition-colors cursor-pointer">
              <div className="h-20 bg-gradient-to-b from-green-oscuro/20 to-transparent flex items-center justify-center">
                <span className="text-4xl font-bold text-green-oscuro">👕</span>
              </div>
              <h3 className="h3 mt-4 text-center">Ropa Deportiva</h3>
              <p className="caption text-center mt-2">Tecnología y comodidad</p>
              <a href="/tienda" className="text-green-lima text-sm font-medium mt-3 block">Ver productos</a>
            </div>
            <div className="card hover:bg-gray-claro/5 transition-colors cursor-pointer">
              <div className="h-20 bg-gradient-to-b from-green-lima/20 to-transparent flex items-center justify-center">
                <span className="text-4xl font-bold text-green-lima">🎒</span>
              </div>
              <h3 className="h3 mt-4 text-center">Accesorios</h3>
              <p className="caption text-center mt-2">Completa tu outfit</p>
              <a href="/tienda" className="text-green-lima text-sm font-medium mt-3 block">Ver productos</a>
            </div>
            <div className="card hover:bg-gray-claro/5 transition-colors cursor-pointer">
              <div className="h-20 bg-gradient-to-b from-red/20 to-transparent flex items-center justify-center">
                <span className="text-4xl font-bold text-red">⚡</span>
              </div>
              <h3 className="h3 mt-4 text-center">Equipamiento</h3>
              <p className="caption text-center mt-2">Para tu entrenamiento</p>
              <a href="/tienda" className="text-green-lima text-sm font-medium mt-3 block">Ver productos</a>
            </div>
          </div>
        </div>
      </section>

      {/* D. SECCIÓN DE OFERTAS */}
      <section className="section bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[600px_1fr] gap-8 items-center">
            <div>
              <span className="inline-block px-3 py-1.5 bg-green-oscuro text-white text-xs font-medium tracking-wider mb-4">PROMO ESPECIAL</span>
              <h2 className="h2 mb-6">Ofertas Imperdibles</h2>
              <p className="body mb-6 max-w-xl text-gray-claro">
                Descuentos exclusivos en productos seleccionados. Calidad FORCHA SPORT a precios especiales.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {/* Oferta 1 */}
                <div className="card featured p-6 flex flex-col items-start border-green-lima/30">
                  <span className="text-xs text-green-oscuro font-medium mb-2">-30%</span>
                  <h4 className="h3 font-bold mb-2">Zapatillas Pro X</h4>
                  <p className="caption mb-3">Rendimiento máximo</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-green-lima">$159</span>
                    <span className="text-green-oscuro line-through text-opacity-60 text-sm">$229</span>
                  </div>
                </div>
                {/* Oferta 2 */}
                <div className="card featured p-6 flex flex-col items-start border-green-lima/30">
                  <span className="text-xs text-green-oscuro font-medium mb-2">-25%</span>
                  <h4 className="h3 font-bold mb-2">Malla Técnica Pro</h4>
                  <p className="caption mb-3">Secado rápido</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-green-lima">$45</span>
                    <span className="text-green-oscuro line-through text-opacity-60 text-sm">$60</span>
                  </div>
                </div>
              </div>
              <a href="/ofertas" className="btn-primary mt-6">Ver Todas las Ofertas</a>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden bg-gray-800/50 h-[400px] sm:h-[500px] lg:h-[600px]">
                {/* Decorative product image */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-lima via-green-lima/20 to-transparent"></div>
                <div className="absolute top-0 left-0 w-1/2 h-full bg-black opacity-80"></div>
                <div className="absolute bottom-0 right-0 p-8">
                  <span className="text-2xl font-bold bg-gradient-to-r from-green-lima to-green-oscuro bg-clip-text text-transparent">-30%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E. SECCIÓN DE NOVEDADES */}
      <section className="section bg-gray-grafito">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-black text-green-lima text-sm font-medium tracking-wider mb-6">NOVEDAD</span>
              <h2 className="h2 mb-6">Lanzamientos Recientes</h2>
              <p className="body mb-6 text-gray-claro">
                Los productos más nuevos disponibles en nuestro catálogo. Calidad y estilo garantizados.
              </p>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                {/* Producto 1 */}
                <div className="card border-green-lima/30 p-6 hover:border-green-lima transition-colors">
                  <div className="h-32 bg-gray-800/50 rounded-md mb-4 flex items-center justify-center">
                    <span className="text-3xl text-opacity-50">Z</span>
                  </div>
                  <h4 className="h3 font-bold mb-2">Zapatillas Aero Pro</h4>
                  <p className="caption text-opacity-60 mb-3">Nueva tecnología de amortiguación</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-green-lima">$129</span>
                  </div>
                </div>
                {/* Producto 2 */}
                <div className="card border-green-lima/30 p-6 hover:border-green-lima transition-colors">
                  <div className="h-32 bg-gray-800/50 rounded-md flex items-center justify-center">
                    <span className="text-3xl text-opacity-50">R</span>
                  </div>
                  <h4 className="h3 font-bold mb-2">Malla Termorreguladora</h4>
                  <p className="caption text-opacity-60 mb-3">Temperatura corporal ideal</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-green-lima">$65</span>
                  </div>
                </div>
                {/* Producto 3 */}
                <div className="card border-green-lima/30 p-6 hover:border-green-lima transition-colors">
                  <div className="h-32 bg-gray-800/50 rounded-md flex items-center justify-center">
                    <span className="text-3xl text-opacity-50">A</span>
                  </div>
                  <h4 className="h3 font-bold mb-2">Accesorio Power Grip</h4>
                  <p className="caption text-opacity-60 mb-3">Agarre superior</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-green-lima">$35</span>
                  </div>
                </div>
                {/* Producto 4 */}
                <div className="card border-green-lima/30 p-6 hover:border-green-lima transition-colors">
                  <div className="h-32 bg-gray-800/50 rounded-md flex items-center justify-center">
                    <span className="text-3xl text-opacity-50">F</span>
                  </div>
                  <h4 className="h3 font-bold mb-2">Botella Hidratación</h4>
                  <p className="caption text-opacity-60 mb-3">Capacidad 750ml</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-green-lima">$45</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* F. FOOTER */}
      <footer className="bg-gray-grafito border-t border-border pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold text-green-lima">FORCHA</span>
                <span className="text-lg font-semibold">SPORT</span>
              </div>
              <p className="text-opacity-60 text-sm max-w-xs">
                Equipamiento deportivo premium para atletas que exigen lo mejor en rendimiento y estilo.
              </p>
              <div className="mt-4 flex gap-4">
                <a href="#" className="text-gray-claro text-sm hover:text-green-lima transition-colors">Instagram</a>
                <a href="#" className="text-gray-claro text-sm hover:text-green-lima transition-colors">Facebook</a>
                <a href="#" className="text-gray-claro text-sm hover:text-green-lima transition-colors">Twitter</a>
                <a href="#" className="text-gray-claro text-sm hover:text-green-lima transition-colors">YouTube</a>
              </div>
            </div>
            <div>
              <h4 className="h3 font-medium mb-4">Categorías</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/tienda" className="text-gray-claro hover:text-green-lima transition-colors">Zapatillas</a></li>
                <li><a href="/tienda" className="text-gray-claro hover:text-green-lima transition-colors">Ropa</a></li>
                <li><a href="/tienda" className="text-gray-claro hover:text-green-lima transition-colors">Accesorios</a></li>
                <li><a href="/tienda" className="text-gray-claro hover:text-green-lima transition-colors">Equipamiento</a></li>
              </ul>
            </div>
            <div>
              <h4 className="h3 font-medium mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/nosotros" className="text-gray-claro hover:text-green-lima transition-colors">Nosotros</a></li>
                <li><a href="/politica-de-envios" className="text-gray-claro hover:text-green-lima transition-colors">Envíos</a></li>
                <li><a href="/politica-de-devoluciones" className="text-gray-claro hover:text-green-lima transition-colors">Devoluciones</a></li>
                <li><a href="/politica-de-privacidad" className="text-gray-claro hover:text-green-lima transition-colors">Privacidad</a></li>
              </ul>
            </div>
            <div>
              <h4 className="h3 font-medium mb-4">Soporte</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/contacto" className="text-gray-claro hover:text-green-lima transition-colors">Contacto</a></li>
                <li><a href="#" className="text-gray-claro hover:text-green-lima transition-colors">Preguntas Frecuentes</a></li>
                <li><a href="#" className="text-gray-claro hover:text-green-lima transition-colors">Rastrear Pedido</a></li>
              </ul>
            </div>
            <div>
              <h4 className="h3 font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/terminos-y-condiciones" className="text-gray-claro hover:text-green-lima transition-colors">Términos y Condiciones</a></li>
                <li><a href="/politica-de-privacidad" className="text-gray-claro hover:text-green-lima transition-colors">Política de Privacidad</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-opacity-50 text-sm">2024 FORCHA SPORT. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-claro text-sm hover:text-green-lima transition-colors">Política de Devoluciones</a>
              <a href="#" className="text-gray-claro text-sm hover:text-green-lima transition-colors">Términos de Venta</a>
              <a href="#" className="text-gray-claro text-sm hover:text-green-lima transition-colors">Soporte al Cliente</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}