import Features from "@/components/features/landing/Features";
import Hero from "@/components/features/landing/Hero";
import Benefits from "@/components/features/landing/Benefits";
import Pricing from "@/components/features/landing/Pricing";
import Testimonials from "@/components/features/landing/Testimonials";
import Footer from "@/components/features/landing/Footer";

const LandingPage = () => {
  return (
    <>
      <Hero />
      <Features />
      <Benefits />
      <Pricing />
      <Testimonials />
      <Footer />
    </>
  );
};

export default LandingPage;
