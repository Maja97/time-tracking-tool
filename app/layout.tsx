import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.scss';
import '/primereact-theme/mytheme/theme.scss';
import NavBar from './components/navbar';
import { PrimeReactProvider } from 'primereact/api';

const nunitoSans = Nunito_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Time tracking tool',
  description: 'Fun task'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <PrimeReactProvider>
        <body className={nunitoSans.className}>
          <NavBar />
          {children}
        </body>
      </PrimeReactProvider>
    </html>
  );
}
