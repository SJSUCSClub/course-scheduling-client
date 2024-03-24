import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/app/global.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | SJSU Course Planner',
    default: 'SJSU Course Planner',
  },
  description: 'Welcome to SJSU Course Planner! Plan your courses with ease.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} text-body`}>{children}</body>
    </html>
  );
}
