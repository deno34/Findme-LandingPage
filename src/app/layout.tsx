import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { GlobalParticleBackground } from '@/components/global-particle-background';

export const metadata: Metadata = {
  title: 'Brainsay',
  description: 'AI-Powered Messaging. Smarter Chats, Seamless Connections.',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <GlobalParticleBackground />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
