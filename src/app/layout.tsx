import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Manrope } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/layout/navigation';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
});

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'Nathan Healea',
  description: 'Software Engineer & Full Stack Developer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${manrope.variable} antialiased`}
    >
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
