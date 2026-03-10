import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-main',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
  title: 'Amravan Healthcare | Premium Ayurvedic Supplements',
  description: 'The power of nature in every capsule. High performance ayurvedic supplements rooted in 5000 years of tradition.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
