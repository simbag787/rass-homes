import React from "react";
import ContactForm from "./ContactForm";

export default function WeBuyLand() {
  return (
    <div className="we-buy-land-page">
      {/* Two Column Section */}
      <div className="two-columns">
        
        {/* Left Column */}
        <div className="left-column">
          <h2>Why Sell Your Land to Us?</h2>

          <p className="intro-text">
          Selling your home should be simple and stress-free. At RASS Homes, we provide a clear, hassle-free process that lets you sell your property as-is, avoid costly repairs, and choose a closing date that works for you. Whether you’re downsizing, relocating, or handling an estate, we’re here to make the experience easy, transparent, and tailored to your needs—so you can focus on your next chapter with confidence.
          </p>

          <h3>Benefits</h3>
          <ul className="benefits-list">
            <li>Fast cash offers</li>
            <li>No realtor commissions</li>
            <li>We buy land in any condition</li>
            <li>Hassle-free process</li>
            <li>Close on your timeline</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="right-column">
          <ContactForm showAddress={true} />
        </div>

      </div>
    </div>
  );
}
