import type { Metadata } from "next";
import { Kaushan_Script, Manrope } from "next/font/google";
import "../globals.css";
import { getContent } from "../lib/content";
import { SITE_URL } from "../lib/data";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const kaushan = Kaushan_Script({
  variable: "--font-kaushan",
  subsets: ["latin"],
  weight: "400",
});

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getContent();
  const title = settings.seoTitle;
  const description = settings.seoDescription;
  return {
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
      siteName: settings.siteName,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { settings, contact } = await getContent();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#business`,
    name: settings.siteName,
    slogan: settings.slogan,
    description: settings.seoDescription,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image.jpg`,
    logo: `${SITE_URL}/images/logo.png`,
    telephone: `+${contact.phoneIntl}`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressLocality: contact.city,
      addressCountry: "CM",
    },
    ...(contact.mapsUrl && { hasMap: contact.mapsUrl }),
    areaServed: { "@type": "Country", name: "Cameroun" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: contact.opens,
      closes: contact.closes,
    },
    sameAs: contact.socials.map((s) => s.url),
  };
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
