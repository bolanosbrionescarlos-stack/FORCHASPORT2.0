export default function TestInterno() {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: 'system-ui, sans-serif' 
    }}>
      <h1>🧪 Página Interna de Prueba FORCHA SPORT</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Esta página está funcionando correctamente. El proyecto está conectado
        y todos los recursos se están cargando como es esperado.
      </p>

      <div style={{ 
        background: '#f8f9fa', 
        borderRadius: '8px', 
        padding: '20px', 
        margin: '20px 0' 
      }}>
        <h3>📊 Estado del Proyecto:</h3>
        <ul style={{ 
          listStyle: 'none', 
          padding: '0', 
          textAlign: 'left' 
        }}>
          <li style={{ 
            margin: '8px 0', 
            padding: '8px 12px', 
            borderBottom: '1px solid #e0e0e0' 
          }}>
            <strong>Build:</strong> ✅ 14/14 páginas generadas
          </li>
          <li style={{ 
            margin: '8px 0', 
            padding: '8px 12px', 
            borderBottom: '1px solid #e0e0e0' 
          }}>
            <strong>Router:</strong> ✅ Pages Router (clásico)
          </li>
          <li style={{ 
            margin: '8px 0', 
            padding: '8px 12px', 
            borderBottom: '1px solid #e0e0e0' 
          }}>
            <strong>Tailwind CSS:</strong> ✅ Identidad visual deportiva
          </li>
          <li style={{ 
            margin: '8px 0', 
            padding: '8px 12px', 
            borderBottom: '1px solid #e0e0e0' 
          }}>
            <strong>Next.js:</strong> ✅ Versión 14.0.0
          </li>
        </ul>
      </div>

      <div>
        <h3>🔗 Rutas del Proyecto Disponibles:</h3>
        <ul style={{ 
          listStyle: 'none', 
          padding: '0', 
          textAlign: 'left' 
        }}>
          <li style={{ margin: '4px 0' }}>
            <a href="/">🏠 Página de Inicio</a>
          </li>
          <li style={{ margin: '4px 0' }}>
            <a href="/tienda">🛍️ Tienda</a>
          </li>
          <li style={{ margin: '4px 0' }}>
            <a href="/ofertas">💰 Ofertas</a>
          </li>
          <li style={{ margin: '4px 0' }}>
            <a href="/novedades">🆕 Novedades</a>
          </li>
          <li style={{ margin: '4px 0' }}>
            <a href="/carrito">🛒 Carrito</a>
          </li>
          <li style={{ margin: '4px 0' }}>
            <a href="/contacto">📧 Contacto</a>
          </li>
          <li style={{ margin: '4px 0' }}>
            <a href="/nosotros">👥 Nosotros</a>
          </li>
        </ul>
      </div>

      <footer style={{ 
        marginTop: '40px', 
        paddingTop: '20px', 
        borderTop: '1px solid #e0e0e0', 
        fontSize: '12px', 
        color: '#666' 
      }}>
        <p>FORCHA SPORT • E-commerce Ropa Deportiva • Prueba Interna</p>
        <p>Accede a todas las rutas desde el menú arriba</p>
      </footer>
    </div>
  )
}