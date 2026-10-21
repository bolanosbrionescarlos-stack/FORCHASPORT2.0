import Link from 'next/link';

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg p-8 shadow-sm max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Contacto</h1>
          
          <p className="text-gray-600 text-lg mb-8">
            Tenemos gusto en escucharte. Si tienes preguntas, sugerencias o comentarios, 
            complete el formulario a continuación y nos pondremos en contacto contigo a la brevedad.
          </p>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Asunto
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Asunto del mensaje"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje
              </label>
              <textarea
                rows={5}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                placeholder="Escribe tu mensaje aquí..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-full font-medium hover:bg-secondary transition-colors"
            >
              Enviar mensaje
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Siguenos</h2>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path className="stroke-2" d="M16 8a6 6 0 016 6v7h-7v-7a5 5 0 00-5-5H6a5 5 0 00-5 5v7h-7v-7a3 3 0 00-3 3v7h-7v-7a1 1 0 00-1 1v7h-7v-7a1 1 0 00-1-1v-7H3v7a1 1 0 001 1h7v7a3 3 0 003-3v-7h7v7a1 1 0 001-1v-7H8.293a1 1 0 1-.707-.293"/>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path className="stroke-2" d="M16 8a6 6 0 016 6v7h-7v-7a5 5 0 00-5-5H6a5 5 0 00-5 5v7h-7v-7a3 3 0 00-3 3v7h-7v-7a1 1 0 00-1 1v7h-7v-7a1 1 0 00-1-1v-7H3v7a1 1 0 001 1h7v7a3 3 0 003-3v-7h7v7a1 1 0 001-1v-7H3v7a1 1 0 001 1h7v-7a1 1 0 00-1-1v-7H3a1 1 0 00-1 1v7h7z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path className="stroke-2" d="M2 2h20a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm8-1.106C12.18 3.355 13.85 3 16 3s3.82.355 5 .994C21.82 3.355 23 4.355 23 6.106V15a2 2 0 01-2 2h-6.726zM8 5c.09 0 .179.03.27.084l2.829 2.905c.128.131.176.31.176.508v7.09a2 2 0 01-2 2H4a2 2 0 01-2-2V7.182l2.83-2.905c.088-.09.18-.145.28-.145zm7.536 4.276-.188.188a1 1 0 01-.707.293l-2.06 2.06a1 1 0 01-.707.293l2.06 2.06a1 1 0 01.293.707l1.316-.615c.248-.117.391-.31.391-.573V5a.5.5 0 011 0v1.963z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}