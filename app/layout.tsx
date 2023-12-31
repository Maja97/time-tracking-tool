import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import { cookies } from 'next/headers';
import { PrimeReactProvider } from 'primereact/api';
import NavBar from './_components/navbar';
import './globals.scss';
import './_styles/primereact-theme/mytheme/theme.scss';
import { ClientCookiesProvider } from './_wrappers/CookiesProvider';

const nunitoSans = Nunito_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Time tracking tool',
  description: 'Fun task'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientCookiesProvider value={cookies().getAll()}>
      <PrimeReactProvider>
        <html placeholder="blur" lang="en">
          <body className={nunitoSans.className}>
            <NavBar />
            {children}
          </body>
        </html>
      </PrimeReactProvider>
    </ClientCookiesProvider>
  );
}
