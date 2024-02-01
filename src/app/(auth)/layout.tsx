import * as React from "react";
import Header from "@/components/Header";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main>{props.children}</main>
    </div>
  );
}
