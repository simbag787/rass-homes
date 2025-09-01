import { useEffect, useState } from "react";
import { MapSection } from "../components/MapSection";
import { PropertiesInfo } from "../components/PropertiesInfo";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function Home() {
  const [homeHeight, setHomeHeight] = useState("100vh"); // default

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      const navbarHeight = navbar.offsetHeight;
      setHomeHeight(`calc(100vh - ${navbarHeight}px)`);
    }
  }, []);

  return (
    <>
      <div className="hero-container" style={{ height: homeHeight }}>
        <Hero />
      </div>
      <div className="home-page" style={{ height: homeHeight, zIndex: 10 }}>
        <div className="map-section">
          <MapSection />
        </div>
        <div className="info-section">
          <PropertiesInfo />
        </div>
      </div>
      <Footer />
    </>

  );
}
