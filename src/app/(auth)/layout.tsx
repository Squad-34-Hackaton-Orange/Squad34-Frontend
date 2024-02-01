import * as React from "react";
import Header from "@/components/Header";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        <main>{props.children}</main>
      </body>
    </html>
  );
}
