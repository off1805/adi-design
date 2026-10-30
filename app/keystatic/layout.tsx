import { SITE_URL } from "../lib/data";
import KeystaticApp from "./keystatic";

export const metadata = { metadataBase: new URL(SITE_URL), title: "Administration", robots: { index: false, follow: false } };

export default function Layout() {
  return (
    <html lang="fr">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
