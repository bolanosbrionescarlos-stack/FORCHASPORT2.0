import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useProduct } from '@/app/(store)/product-detail';
import { useCart } from '@/app/(store)/cart-context';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [variant, setVariant] = useState<any>(null);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      
      // Obtener producto por slug
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories (*),
          brand:brands (*),
          images:product_images (*),
          variants:product_variants (*)
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setProduct(data);

      // Extraer tallas y colores de variantes
      if (data.variants) {
        const uniqueSizes = [...new Set(data.variants
          .filter((v: any) => v.size)
          .map((v: any) => v.size))];
        const uniqueColors = [...new Set(data.variants
          .filter((v: any) => v.color)
          .map((v: any) => v.color))];
        setSizes(uniqueSizes);
        setColors(uniqueColors);
      }
    } catch (err: any) {
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (variantId: string, quantity: number = 1) => {
    // Obtener la variante actual o el producto principal
    const selectedVariant = variant?.id 
      ? { id: variantId, product_id: product.id }
      : undefined;

    addItem({
      id: product.id,
      product_id: product.id,
      name: product.name,
      price: variant?.price_override || product.price_promo || product.price_normal,
      quantity,
      size: variant?.size || null,
      color: variant?.color || null,
      image_url: product.images?.[0]?.url || '/productos/default.jpg',
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Producto no encontrado</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex flex-col space-y-1 max-w-2xl">
            <li>
              <a href="/" className="text-gray-500 hover:text-primary transition-colors">
                Inicio
              </a>
            </li>
            <li className="text-gray-400">
              <span>{product.category?.name || 'Tienda'}</span>
            </li>
            <li>
              <span>{product.name}</span>
            </li>
          </ol>
        </nav>

        {/* Product Gallery */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Imagen principal */}
          <div>
            <Image
              src=product.images?.[0]?.url || '/productos/default.jpg'
              alt={product.name}
              width={600}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>

          {/* Miniaturas */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Galería</h3>
            <div className="grid grid-cols-3 gap-2">
              {product.images?.map((img: any, index: number) => (
                <button
                  key={img.id}
                  onClick={() => {}}
                  className="border rounded-lg p-2 cursor-pointer hover:border-primary transition-colors"
                >
                  <Image
                    src={img.url}
                    alt={`Producto ${index}`}
                    width={100}
                    height={100}
                    className="object-cover rounded"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Información del producto */}
        <section className="bg-white rounded-lg p-6 shadow-sm">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              
              {/* Marca */}
              {product.brand && (
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <span>Marca: </span>
                  <span className="font-medium">{product.brand.name}</span>
                </div>
              )}

              {/* Categoría */}
              {product.category && (
                <div className="mt-2 text-sm text-gray-500">
                  <span>Categoría: </span>
                  <span className="font-medium">{product.category.name}</span>
                </div>
              )}

              {/* Precio */}
              <div className="mt-4 flex items-baseline gap-2">
                {product.price_promo && product.price_normal ? (
                  <div>
                    <span className="line-through text-gray-400 text-base">{product.price_normal} S/<span>
                    <span className="text-2xl font-bold text-red-600">{product.price_promo} S/<span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-primary">{product.price_normal} S/<span>
                )}

                {product.is_on_sale && (
                  <span className="ml-2 bg-red-100 text-red-800 text-xs rounded px-2 py-1">
                    -{Math.round(((product.price_normal - product.price_promo) / product.price_normal) * 100)}%
                  </span>
                )}
              </div>

              {/* Stock */}
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <span>Stock disponible: </span>
                <span className="font-medium" id="stock-value">
                  {product.stock_total > 0 ? product.stock_total : 'Agotado'}
                </span>
              </div>

              {/* Selectores de variante */}
              {product.variants && product.variants.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Seleccionar variante</h4>
                  
                  {/* Tallas */}
                  {sizes.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setVariant(prev => ({
                            ...prev,
                            size,
                            price_override: product.variants?.find((v: any) => v.size === size)?.price_override,
                          ))}
                          className={`px-3 py-1 rounded text-sm ${
                            variant?.size === size 
                              ? 'bg-primary text-white' 
                              : 'text-gray-500 hover:bg-gray-100'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Colores */}
                  {colors.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setVariant(prev => ({
                            ...prev,
                            color,
                            price_override: product.variants?.find((v: any) => v.color === color)?.price_override,
                          ))}
                          className={`w-6 h-6 rounded-full ${
                            color === 'negro' ? 'bg-gray-900' :
                            color === 'blanco' ? 'bg-white' :
                            color === 'rojo' ? 'bg-red-500' :
                            color === 'azul' ? 'bg-blue-500' :
                            color === 'gris' ? 'bg-gray-300' :
                            'border-2 border-gray-300'
                          } ${variant?.color === color ? 'ring-2 ring-primary' : ''}`
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Cantidad */}
              <div className="mt-4 flex items-center gap-2">
                <button 
                  onClick={() => {}}
                  className="flex-1 px-3 py-1 rounded border text-sm hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{1}</span>
                <button 
                  onClick={() => {}}
                  className="flex-1 px-3 py-1 rounded border text-sm hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Botón de agregar al carrito */}
              <div className="mt-6">
                <button 
                  onClick={() => addToCart(variant?.id || product.id, 1)}
                  className="w-full bg-primary text-white py-3 rounded-full font-medium hover:bg-secondary transition-colors"
                >
                  {variant 
                    ? `Agregar talla ${variant.size || ''} color ${variant.color || ''} al carrito`
                    : 'Agregar al carrito'
                  }
                </button>
              </div>
            </div>

            {/* Información adicional */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Descripción</h3>
              <p className="text-gray-600 text-lg line-clamp-4 mb-6">
                {product.description_long || product.description_short || 'No hay descripción disponible'}
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Detalles</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <span className="font-medium">SKU: </span>
                  <span>{product.sku}</span>
                </li>
                <li>
                  <span className="font-medium">Referencia: </span>
                  <span>{product.sku}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Productos relacionados */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Productos relacionados</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Aquí irían productos relacionados basados en categoría o marca */}
              <div className="p-4 rounded-lg border-gray-200 hover:border-primary transition-colors">
                <h4 className="font-medium">Producto relacionado 1</h4>
                <p className="text-xs text-gray-400 mt-1">Ver producto</p>
              </div>
              <div className="p-4 rounded-lg border-gray-200 hover:border-primary transition-colors">
                <h4 className="font-medium">Producto relacionado 2</h4>
                <p className="text-xs text-gray-400 mt-1">Ver producto</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}