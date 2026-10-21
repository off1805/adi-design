import { Contact } from "./components/sections/Contact";
import { Faq } from "./components/sections/Faq";
import { Featured } from "./components/sections/Featured";
import { Footer, WhatsAppButton } from "./components/sections/Footer";
import { Header } from "./components/sections/Header";
import { Hero } from "./components/sections/Hero";
import { Preloader } from "./components/sections/Preloader";
import { Intro } from "./components/sections/Intro";
import { Process } from "./components/sections/Process";
import { Services } from "./components/sections/Services";
import { Transformation } from "./components/sections/Transformation";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Preloader />
      <Header />
      <Hero />
      <Intro />
      <Featured />
      <Services />
      <Transformation />
      <Process />
      <Faq />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
