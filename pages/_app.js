import '../styles/globals.css'

export default function App({
  Component,
  pageProps: { className, ...pageProps },
}) {
  return (
    <html
      lang="es"
      className="bg-black text-white font-sans antialiased"
    >
      <body className="className bg-black text-white">
        <Component className="bg-black text-white" {...pageProps} />
      </body>
    </html>
  )
}