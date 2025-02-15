import React from "react";
import { scrollToProducts } from "../utils/scrollToProducts";


const Hero = () => {
  // Function to scroll to the products section
  const handleScroll = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="h-[800px] bg-cover bg-center py-24 flex items-center relative"
      style={{
        backgroundImage: "linear-gradient(to right, #ffe4e6, #fff1f2), url('/your-image.jpg')",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="container mx-auto flex flex-col items-start text-left">
        
        {/* Highlight Section */}
        <div className="text-red-500 font-bold uppercase tracking-widest text-lg flex items-center">
          <div className="w-10 h-[2px] bg-red-500 mr-3"></div>Exclusive Offer
        </div>

        {/* Main Headline */}
        <h1 className="text-[80px] leading-tight font-bold mb-6 text-gray-900">
          Elevate Your <br />
          <span className="text-pink-500 italic">Winter Wardrobe</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg text-gray-700 mb-6">
          Discover the latest trends and get up to <span className="font-bold">50% off</span> this season!
        </p>

        {/* CTA Button - Scrolls Down to Products */}
         <button
          onClick={scrollToProducts}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white 
                              px-8 py-4 rounded-full shadow-lg hover:scale-105 
                              transition-all duration-300 font-semibold text-lg">
          Happy Shopping :)
          </button>
      </div>
    </section>
  );
};

export default Hero;
