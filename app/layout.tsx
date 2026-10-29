import type { Metadata } from "next";
import { Kaushan_Script, Manrope } from "next/font/google";
import "./globals.css";
import { CONTACT, SITE_URL, SOCIALS } from "./lib/data";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const kaushan = Kaushan_Script({
  variable: "--font-kaushan",
  subsets: ["latin"],
  weight: "400",
});

const title = "ADI Design | Architecture & décoration intérieure à Yaoundé";
const description =
  "Architecture et décoration d'intérieur à Yaoundé (Mvog Bi) : conception 3D, faux plafond staff, carrelage, peinture, cuisines, dressings et meubles TV sur mesure. Le luxe chez vous à petit prix.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: [
    "décoration intérieure Yaoundé",
    "architecture d'intérieur Cameroun",
    "faux plafond staff Yaoundé",
    "cuisine sur mesure Yaoundé",
    "dressing sur mesure",
    "meuble TV marbre",
    "conception 3D intérieur",
    "Mvog Bi",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_CM",
    url: "/",
    siteName: "ADI Design",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "ADI Design",
  slogan: "L'apôtre du design intérieur",
  description,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.jpg`,
  logo: `${SITE_URL}/images/logo.png`,
  telephone: `+${CONTACT.phoneIntl}`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.address,
    addressLocality: CONTACT.city,
    addressCountry: "CM",
  },
  areaServed: { "@type": "Country", name: "Cameroun" },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "08:00",
    closes: "18:00",
  },
  sameAs: SOCIALS.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${kaushan.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
