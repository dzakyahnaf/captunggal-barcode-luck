import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QR Lucky Draw — Scan & Win!",
  description:
    "Scan QR Code dan menangkan hadiah menarik secara instan. Sistem undian digital real-time.",
  icons: {
    icon: "/images/logo-cap-tunggal.png",
    shortcut: "/images/logo-cap-tunggal.png",
    apple: "/images/logo-cap-tunggal.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/images/logo-cap-tunggal.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
