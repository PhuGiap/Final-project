import Header from "../components/layout/header";
import HeroSection from "../components/home/HeroSection";
import FeatureSection from "../components/home/FeatureSection";
import PopularRoutesSection from "../components/home/PopularRoutesSection";
import CallToAction from "../components/home/CallToAction";
import Footer from "../components/layout/footer";

function HomePage() {
  return (
    <>
      <Header />

      <main>
        <HeroSection />
        <FeatureSection />
        <PopularRoutesSection />
        <CallToAction />
      </main>

      <Footer />
    </>
  );
}

export default HomePage;