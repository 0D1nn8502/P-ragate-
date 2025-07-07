import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Paragate landing page",
  description: "Made with love and mindfulness", 
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body> 
        {children}
      </body>
    </html>
  );
}
