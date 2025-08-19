import type { Metadata } from 'next';
import './globals.css';

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
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
