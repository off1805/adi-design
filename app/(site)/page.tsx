import { Contact } from "../components/sections/Contact";
import { Faq } from "../components/sections/Faq";
import { Featured } from "../components/sections/Featured";
import { Footer, WhatsAppButton } from "../components/sections/Footer";
import { Header } from "../components/sections/Header";
import { Hero } from "../components/sections/Hero";
import { Intro } from "../components/sections/Intro";
import { Process } from "../components/sections/Process";
import { Services } from "../components/sections/Services";
import { Testimonials } from "../components/sections/Testimonials";
import { Transformation } from "../components/sections/Transformation";
import { ContentProvider } from "../lib/ContentProvider";
import { getContent } from "../lib/content";

export default async function Home() {
  const content = await getContent();
  const t = content.temoignages;
  return (
    <ContentProvider value={content}>
      <main className="overflow-x-clip">
        <Header />
        <Hero />
        <Intro />
        <Featured />
        <Services />
        <Transformation />
        <Process />
        {t.visible && t.items.length > 0 && <Testimonials />}
        <Faq />
        <Contact />
        <Footer />
        <WhatsAppButton />
      </main>
    </ContentProvider>
  );
}
