import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TeLoArreglo",
  description: "Asesoría de Reformas y Gremios",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <header className="bg-[#66a032] text-white p-3 shadow-md sticky top-0 z-50">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4 gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-white rounded-lg p-1.5 shadow-sm flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="TeLoArreglo Logo" 
                  width={180} 
                  height={60} 
                  className="object-contain" 
                  priority
                />
              </div>
            </Link>

            <form action="/" method="GET" className="w-full sm:w-auto flex-1 max-w-md">
              <div className="relative">
                <input 
                  type="text" 
                  name="q"
                  placeholder="Buscar empresa o profesional..." 
                  className="w-full pl-4 pr-10 py-2 rounded-full text-gray-900 bg-white border border-transparent focus:outline-none focus:ring-2 focus:border-transparent focus:ring-[#1b4d70] shadow-sm"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1b4d70]" aria-label="Buscar">
                  🔍
                </button>
              </div>
            </form>
          </div>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
