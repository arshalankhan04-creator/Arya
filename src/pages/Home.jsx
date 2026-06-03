import Hero from "../components/home/Hero";
import HeroStrip from "../components/home/HeroStrip";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Collections from "../components/home/Collections";
import Testimonials from "../components/home/Testimonials";
import InstagramGallery from "../components/home/InstagramGallery";

export default function Home() {
  return (
    <main>
      <Hero />
      <HeroStrip />
      <Categories />
      <FeaturedProducts />
      <Collections />
      <Testimonials />
      <InstagramGallery />
    </main>
  );
}
