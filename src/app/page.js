import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import InfoBar from '@/components/InfoBar';
import FeaturedProducts from '@/components/FeaturedProducts';
import Benefits from '@/components/Benefits';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <InfoBar />
        <FeaturedProducts />
        <Benefits />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
