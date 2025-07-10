import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import Menu from '@/components/Menu';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Molly Rose - Driving Awareness of Childhood Cancer",
  description: "The Molly Rose Foundation drives awareness of childhood cancer and provides information about signs, symptoms, and support for families affected by childhood cancer.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' }
    ],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>
      <body className={inter.className}>
        <Menu />
        {children}
        <Footer />
      </body>
    </html>
  );
}
