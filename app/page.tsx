import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Manifesto from "@/components/landing/Manifesto";
import HowItWorks from "@/components/landing/HowItWorks";
import Stories from "@/components/landing/Stories";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Manifesto />
        <HowItWorks />
        <Stories />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
