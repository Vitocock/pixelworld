import { Geist, DM_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  weight: ['300','400','500'],
  subsets: ["latin"]
});

// -------------------- JSON-LD ORG DATA --------------------
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "PixelWorldGC",
  "url": "https://www.pixelworldgc.com",
  "logo": "https://www.pixelworldgc.com/logo-redondo.png",
  "description": "Arriendo de consolas, videojuegos y accesorios para eventos en Santiago. Planes personalizados y diversión asegurada.",
  "sameAs": [
    "https://www.instagram.com/pixelworldgc/",
    "https://www.facebook.com/pixelworldgc/",
    "https://www.tiktok.com/@pixel_world_gc",
    "https://api.whatsapp.com/send?phone=56966715669"
  ],
  "contactPoint": [{
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": ["es"],
    "areaServed": "CL",
    "telephone": "+56-9-6671-5669" 
  }]
};
// -----------------------------------------------------------

export const metadata = {
  metadataBase: new URL('https://www.pixelworldgc.com'),
  title: "PixelWorldGC - Arriendo de consolas para eventos",
  description:
    "Arriendo de consolas, videojuegos y accesorios para eventos en Santiago. Planes personalizados y diversión asegurada.",
  keywords: [
    "arriendo consolas",
    "videojuegos",
    "eventos",
    "gaming",
    "PixelWorldGC",
    "gamer",
    "pixelworldgc"
  ],
  openGraph: {
    title: "PixelWorldGC - Arriendo de consolas para eventos",
    description:
      "Arriendo de consolas, videojuegos y accesorios para eventos en Santiago. Planes personalizados y diversión asegurada.",
    url: "https://www.pixelworldgc.com",
    siteName: "PixelWorldGC",
    images: [
      {
        url: "/logo-redondo.png",
        width: 500,
        height: 500,
        alt: "PixelWorldGC - Consolas para eventos"
      }
    ],
    locale: "es_CL",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelWorldGC - Arriendo de consolas para eventos",
    description:
      "Arriendo de consolas, videojuegos y accesorios para eventos en Santiago.",
    images: ["/logo-redondo.png"]
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/logo-redondo-192x912.png" 
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#00ff00"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />

        {/* Favicon & PWA */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/logo-redondo-192x912.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00ff00" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body
        className={`${dmSans.className} ${geistSans.variable} flex antialiased scroll-smooth justify-center inset-0 h-full w-full text-white bg-black bg-[linear-gradient(to_right,#171717_0.094rem,transparent_1px),linear-gradient(to_bottom,#171717_0.094rem,transparent_1px)] bg-[size:7rem_9rem]`}
      >
        {children}
      </body>
    </html>
  );
}