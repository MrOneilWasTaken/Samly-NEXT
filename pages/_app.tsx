import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <h1>APP HEADER</h1>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
