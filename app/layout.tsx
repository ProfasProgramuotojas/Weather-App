import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/app/Providers/Providers";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Weather App",
  description: "Axiology Home Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
