import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/style/css/globals.css";

const bdoGrotesk = localFont({
  src: "../fonts/BDOGroteskVF.woff2",
  variable: "--font-bdo-grotesk",
  weight: "100 900",
});

// const geistSans = localFont({
//   src: "../fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "../fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Crisop",
  description: "Make healthy life with grocery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bdoGrotesk.variable} font-bdoGrotesk antialiased scroll-smooth`}>
        {children}
      </body>
    </html>
  );
}
