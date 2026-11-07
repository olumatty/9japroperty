import { Hero } from "@/app/components/hero/Hero";
import { FeaturedProperties } from "@/app/components/properties/FeaturedProperties";
import { DecemberExperience } from "@/app/components/december/DecemberExperience";
import { Approach } from "@/app/components/approach/Approach";
import { Services } from "@/app/components/services/Services";
import { Ebook } from "@/app/components/ebook/Ebook";
import { Footer } from "@/app/components/footer/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <FeaturedProperties />
        <DecemberExperience />
        <Approach />
        <Services />
        <Ebook />
      </main>
      <Footer />
    </>
  );
}
