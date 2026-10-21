import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useProductFilter } from '@/app/(store)/product-filters';
import { useCategories } from '@/app/(store)/categories';
import { useBrands } from '@/app/(store)/brands';
import { useProducts } from '@/app/(store)/products';
import { useCart } from '@/app/(store)/cart-context';

export default function TiendaPage() {
  const [filters, setFilters] = useState(() => useProductFilter.getDefault());
  const { data: products, fetchProducts, hasMore, isLoading } = useProducts(filters);
  const { data: categories, fetchCategories } = useCategories();
  const { data: brands, fetchBrands } = useBrands();
  const { addItem } = useCart();

  // Cargar datos al iniciar
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, [fetchProducts, fetchCategories, fetchBrands]);

  const handleSearch = useCallback((query: string) => {
    setFilters({ ...filters, query });
  }, [filters]);

  const handleCategoryFilter = useCallback((categoryId: string) => {
    setFilters({ ...filters, category: categoryId });
  }, [filters]);

  const handleBrandFilter = useCallback((brandId: string) => {
    setFilters({ ...filters, brand: brandId });
  }, [filters]);

  const handlePriceFilter = useCallback((min: number, max: number) => {
    setFilters({ ...filters, min_price: min, max_price: max });
  }, [filters]);

  const handleSizeFilter = useCallback((size: string) => {
    setFilters({ ...filters, size });
  }, [filters]);

  const handleColorFilter = useCallback((color: string) => {
    setFilters({ ...filters, color });
  }, [filters]);

  const handleSortChange = useCallback((sortBy: string) => {
    setFilters({ ...filters, sort_by: sortBy });
  }, [filters]);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header de la tienda */}
        <header className="border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
            {/* Logo */}
            <Link href="/" className="font-bold text-2xl text-gray-900 tracking-wider">
              FORCHA SPORT
            </Link>

            {/* Buscar */}
            <div className="relative flex items-center gap-2">
              <svg className="absolute left-3 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="M21 21l-4.3-4.3"></path>
              </svg>
              <input
                type="text"
                placeholder="Buscar por nombre, categoría, marca o SKU"
                className="pl-10 pr-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={filters.query || ''}
              />
            </div>

            {/* Navegación */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/categoria/hombres" className="text-gray-500 hover:text-primary transition-colors">
                Hombres
              </Link>
              <Link href="/categoria/mujeres" className="text-gray-500 hover:text-primary transition-colors">
                Mujeres
              </Link>
              <Link href="/categoria/ninos" className="text-gray-500 hover:text-primary transition-colors">
                Niños
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
                  {0}
                </span>
              </Link>
            </nav>
          </div>
        </header>

        {/* Filtros laterales */}
        <section className="py-6 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Filtro por categoría */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Categoría</h3>
                <div className="space-y-1">
                  <label key="all" className="flex items-center gap-2 cursor-pointer select-none rounded border py-2 px-3 ${
                    !filters.category 
                      ? 'border-primary bg-primary/5 text-primary' 
                      : 'border-gray-300 text-gray-600'
                  }" onClick={() => handleCategoryFilter('')}>
                    Todas
                  </label>
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer select-none rounded border py-2 px-3 ${
                      filters.category === cat.id 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-gray-300 text-gray-600'
                    }" onClick={() => handleCategoryFilter(cat.id)}>
                      {cat.name}
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtro por marca */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Marca</h3>
                <div className="space-y-1">
                  <label key="all-brands" className="flex items-center gap-2 cursor-pointer select-none rounded border py-2 px-3 ${
                    !filters.brand 
                      ? 'border-primary bg-primary/5 text-primary' 
                      : 'border-gray-300 text-gray-600'
                  }" onClick={() => handleBrandFilter('')}>
                    Todas
                  </label>
                  {brands.map((brand) => (
                    <label key={brand.id} className="flex items-center gap-2 cursor-pointer select-none rounded border py-2 px-3 ${
                      filters.brand === brand.id 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-gray-300 text-gray-600'
                    }" onClick={() => handleBrandFilter(brand.id)}>
                      {brand.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Filtros de precio, talla, color */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Precio */}
              <div>
                <h3 className="text-xs font-medium text-gray-500 mb-2">Precio</h3>
                <div className="space-y-2">
                  <input
                    type="number"
                    placeholder="Precio mínimo"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    value={filters.min_price || ''}
                    onChange={(e) => handlePriceFilter(parseInt(e.target.value) || undefined, filters.max_price)}
                  />
                  <input
                    type="number"
                    placeholder="Precio máximo"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    value={filters.max_price || ''}
                    onChange={(e) => handlePriceFilter(filters.min_price, parseInt(e.target.value) || undefined)}
                  />
                </div>
              </div>

              {/* Talla */}
              <div>
                <h3 className="text-xs font-medium text-gray-500 mb-2">Talla</h3>
                <div className="space-y-1">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <label key={size} className="flex items-center gap-2 cursor-pointer select-none rounded border py-1 px-2 ${
                      filters.size === size ? 'border-primary bg-primary/5 text-primary' : 'border-gray-300 text-gray-600'
                    }" onClick={() => handleSizeFilter(size)}>
                      {size}
                    </label>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <h3 className="text-xs font-medium text-gray-500 mb-2">Color</h3>
                <div className="space-y-1">
                  {['negro', 'blanco', 'rojo', 'azul', 'gris'].map((color) => (
                    <label key={color} className="flex items-center gap-2 cursor-pointer select-none rounded w-6 h-6 border ${
                      filters.color === color ? 'border-primary bg-primary text-white' : 'border-transparent'
                    }" onClick={() => handleColorFilter(color)} />
                  ))}
                </div>
              </div>
            </div>

            {/* Ordenar */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-xs font-medium text-gray-500 mb-2">Ordenar por</h3>
              <div className="grid grid-cols-5 gap-1">
                <button
                  onClick={() => handleSortChange('relevance')}
                  className={`px-3 py-1 rounded text-xs ${
                    filters.sort_by === 'relevance' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  Relevancia
                </button>
                <button
                  onClick={() => handleSortChange('price_asc')}
                  className={`px-3 py-1 rounded text-xs ${
                    filters.sort_by === 'price_asc' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  Precio: Menor a Mayor
                </button>
                <button
                  onClick={() => handleSortChange('price_desc')}
                  className={`px-3 py-1 rounded text-xs ${
                    filters.sort_by === 'price_desc' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  Precio: Mayor a Menor
                </button>
                <button
                  onClick={() => handleSortChange('newest')}
                  className={`px-3 py-1 rounded text-xs ${
                    filters.sort_by === 'newest' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  Novedades
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Resultados de productos */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto">
            {/* Contador de resultados */}
            {products.length > 0 || !isLoading ? (
              <p className="text-gray-500 text-sm mb-4">
                {products.length} resultados{' '}
                {filters.query && <span className="font-medium">para</span> "{filters.query}"}
              </p>
            ) : (
              <p className="text-gray-500 text-sm mb-4">No se encontraron productos</p>
            )}

            {/* Grid de productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCardSummary
                  key={product.id}
                  product={product}
                  onAddToCart={() => addItem({
                    id: product.id,
                    product_id: product.id,
                    name: product.name,
                    price: product.price_promo || product.price_normal,
                    quantity: 1,
                    image_url: product.images?.[0]?.url || '/productos/default.jpg',
                  })}
                />
              ))}
            </div>

            {/* Paginación */}
            {hasMore && !isLoading && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    // Cargar más productos
                    setFilters({ ...filters, page: (filters.page || 1) + 1 });
                  }}
                  className="px-4 py-2 border rounded text-sm hover:bg-gray-50 transition-colors"
                >
                  Cargar más
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

// Componente resumen de producto
function ProductCardSummary({
  product,
  onAddToCart,
}: {
  product: any;
  onAddToCart: (item: any) => void;
}) {
  const price = product.price_promo || product.price_normal;
  const isOnSale = product.price_promo && product.price_normal;

  return (
    <div className="group border rounded-lg overflow-hidden hover:border-primary transition-colors">
      <Image
        src=product.images?.[0]?.url || '/productos/default.jpg'
        alt={product.name}
        width={250}
        height={180}
        className="aspect-w-4 aspect-h-3 object-cover w-full h-48"
      />
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-medium text-gray-900 text-sm line-clamp-2">{product.name}</h3>
        <p className="text-xs text-gray-500 line-clamp-1">{product.brand?.name || ''}</p>
        
        <div className="mt-2 flex items-baseline">
          {isOnSale ? (
            <span className="line-through text-gray-400 text-xs mr-1">{product.price_normal} S/<span>
            <span className="text-red-600 font-bold text-xs">{product.price_promo} S/<span>
          ) : (
            <span className="font-bold text-primary text-xs">{price} S/<span>
          )}
        </div>
      </div>
    </div>
  );
}