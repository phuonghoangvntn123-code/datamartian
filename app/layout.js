import Script from 'next/script'
import './globals.css'

export const metadata = {
  title: 'KeymapHub — Keymap Sharing for Martian Launcher',
  description: 'Share and discover custom keymap layouts for Martian Launcher. Browse community-created touch control layouts for Minecraft: Java Edition on Android.',
  icons: [{ rel: 'icon', url: '/mars_128x.png' }, { rel: 'apple-touch-icon', url: '/mars_128x.png' }],
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/duotone/style.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-950 text-gray-100 antialiased">
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        {children}
        <Script src="/assets/js/i18n.js" strategy="afterInteractive" />
        <Script src="/assets/js/app.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
