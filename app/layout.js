import { Geist,  DM_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  weight: ['300','400', '500'],
  subsets: ["latin"]
}
)

export const metadata = {
  title: "PixelWorldGC",
  description: "Pixelworld Gaming Club",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet"/>
      </head>
      <body
        className={`${dmSans.className} ${geistSans.variable} flex antialiased scroll-smooth justify-center inset-0 h-full w-full text-white bg-black bg-[linear-gradient(to_right,#171717_0.094rem,transparent_1px),linear-gradient(to_bottom,#171717_0.094rem,transparent_1px)] bg-[size:7rem_9rem]`}
      >
        {children}
      </body>
    </html>
  );
}