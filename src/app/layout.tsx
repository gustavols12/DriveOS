import type { Metadata } from 'next';
import './globals.css';
import { Container } from '@/components/container';
import { Header } from '@/components/header';
import { Poppins } from 'next/font/google';
import AuthProvider from '@/providers/auth';
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'DriveOS',
  description:
    'Sistema inteligente de gestão para oficinas automotivas. Controle completo para seu negócio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <AuthProvider>
          <Container>
            <Header />
            <Toaster position="top-center" reverseOrder={false} />
            <main className="flex-1 overflow-y-auto"> {children}</main>
          </Container>
        </AuthProvider>
      </body>
    </html>
  );
}
