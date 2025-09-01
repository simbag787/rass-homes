import React from 'react';

export default function Hero() {
  return (
    <div>
      <div className="hero-overlay">
        <h1>Find Your Dream Home</h1>
        <button
          className="hero-button"
          onClick={() => {
            const mapSection = document.getElementById("map-section");
            if (mapSection) {
              mapSection.scrollIntoView({ behavior: "smooth" });
              {console.log("Button clicked, scrolling to map section.")}
            }
          }}
        >
          Explore Properties
        </button>
      </div>
    </div>
  );
}
