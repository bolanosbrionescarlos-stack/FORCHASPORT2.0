'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
            {/* Logo */}
            <Link href="/" className="font-bold text-2xl text-gray-900 tracking-wider">
              FORCHA SPORT
            </Link>

            {/* Navegación */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/tienda" className="text-gray-500 hover:text-primary transition-colors">
                Tienda
              </Link>
              <Link href="/ofertas" className="text-gray-500 hover:text-primary transition-colors">
                Ofertas
              </Link>
              <Link href="/novedades" className="text-gray-500 hover:text-primary transition-colors">
                Novedades
              </Link>
              <Link href="/carrito" className="relative">
                Carrito
                <span className="absolute -top-1 right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>
            </nav>

            {/* Botón de búsqueda y usuario */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowSearch(true)}
                  className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="M21 21l-4.3-4.3"></path>
                  </svg>
                  Buscar
                </button>
              </div>

              {/* Acceso a cuenta */}
              <Link href="/mi-cuenta" className="hidden md:block text-gray-500 hover:text-primary transition-colors">
                Cuenta
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Equipamiento deportivo de calidad
                </h1>
                <p className="text-lg text-gray-600 mt-4 max-w-xl">
                  En FORCHA SPORT encontrarás ropa deportiva, zapatillas, accesorios y equipamiento para tus entrenamientos y competencias.
                </p>
                <div className="mt-6">
                  <a href="/tienda" className="inline-block bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-secondary transition-colors">
                    Ver Catálogo
                  </a>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/productos/hero-banner.jpg"
                  alt="Banner principal FORCHA SPORT"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Categorías */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Categorías</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Categorías se cargarán dinámicamente */}
            </div>
          </div>
        </section>

        {/* Productos Destacados */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Productos Destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Productos se cargarán dinámicamente */}
            </div>
          </div>
        </section>

        {/* Ofertas y Novedades */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 gap-6">
              {/* Ofertas y Novedades se cargarán dinámicamente */}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}