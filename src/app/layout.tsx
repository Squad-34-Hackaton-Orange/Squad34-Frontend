import type { Metadata } from "next";
import "./global.scss";


export const metadata: Metadata = {
  title: "Orange Portfólio"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
