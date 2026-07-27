import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
