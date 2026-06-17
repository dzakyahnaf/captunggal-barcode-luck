import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const rossanova = localFont({
  src: [
    { path: "../../public/fonts/rossanova/RossanovaTrial-Light.ttf", weight: "300" },
    { path: "../../public/fonts/rossanova/RossanovaTrial-Regular.ttf", weight: "400" },
    { path: "../../public/fonts/rossanova/RossanovaTrial-Bold.ttf", weight: "700" },
    { path: "../../public/fonts/rossanova/RossanovaTrial-Black.ttf", weight: "900" },
  ],
  variable: "--font-rossanova",
  display: "swap",
});

const openSauce = localFont({
  src: [
    { path: "../../public/fonts/Open Sauce Fonts/Fonts/OpenSauceOne-Light.ttf", weight: "300" },
    { path: "../../public/fonts/Open Sauce Fonts/Fonts/OpenSauceOne-Regular.ttf", weight: "400" },
    { path: "../../public/fonts/Open Sauce Fonts/Fonts/OpenSauceOne-Medium.ttf", weight: "500" },
    { path: "../../public/fonts/Open Sauce Fonts/Fonts/OpenSauceOne-SemiBold.ttf", weight: "600" },
    { path: "../../public/fonts/Open Sauce Fonts/Fonts/OpenSauceOne-Bold.ttf", weight: "700" },
    { path: "../../public/fonts/Open Sauce Fonts/Fonts/OpenSauceOne-ExtraBold.ttf", weight: "800" },
    { path: "../../public/fonts/Open Sauce Fonts/Fonts/OpenSauceOne-Black.ttf", weight: "900" },
  ],
  variable: "--font-opensauce",
  display: "swap",
});

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
    <html lang="id" className={`${rossanova.variable} ${openSauce.variable}`}>
      <head>
        <link rel="icon" href="/images/logo-cap-tunggal.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  );
}