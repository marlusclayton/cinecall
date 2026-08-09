import './globals.css';
import { ToastProvider } from '../components/ToastProvider';

export const metadata = {
  title: 'CineCall',
  description: 'Roleta e indicações semanais do CineCall',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <html lang="pt-BR">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
