import type { Metadata } from 'next';
import './globals.css';
import { Container } from '@/components/container';
import { Header } from '@/components/header';

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
    <html lang="en">
      <body className="bg-gray-100">
        <Container>
          <Header />
          <main className="flex-1 p-8  overflow-y-auto"> {children}</main>
        </Container>
      </body>
    </html>
  );
}
