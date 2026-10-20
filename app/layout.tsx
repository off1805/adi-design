import type { Metadata } from "next";
import { Kaushan_Script, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const kaushan = Kaushan_Script({
  variable: "--font-kaushan",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "ADI Design — L'apôtre du design intérieur | Yaoundé",
  description:
    "Cabinet d'architecture d'intérieur à Yaoundé : conception 3D, staff, carrelage, peinture, mobilier sur mesure et aménagement complet. Le luxe chez vous à petit prix.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${kaushan.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
