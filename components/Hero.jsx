import React from 'react';

export default function Hero() {
  const handleScroll = () => {
    const mapSection = document.getElementById("map-section");
    const navbar = document.querySelector(".navbar"); // adjust selector to your navbar class

    if (mapSection) {
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const sectionTop =
        mapSection.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });

      console.log("Button clicked, scrolling to map section.");
    }
  };
  return (
    <div>
      <div className="hero-overlay">
        <h1>Find Your Dream Home</h1>
        <button
          className="hero-button"
          onClick={handleScroll}
        >
          Explore Properties
        </button>
      </div>
    </div>
  );
}
