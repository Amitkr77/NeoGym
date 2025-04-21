
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const dismissBanner = () => {
    setIsVisible(false);
    localStorage.setItem('promoBannerDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="bg-neogym-red py-6 relative animate-fade-in" style={{animationDelay:'0.12s',animationFillMode:'both'}}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between animate-fade-in" style={{animationDelay:'0.18s',animationFillMode:'both'}}>
          <div className="text-white text-center md:text-left mb-4 md:mb-0 pr-8">
            <h3 className="text-xl md:text-2xl font-bold animate-fade-in" style={{animationDelay:'0.2s',animationFillMode:'both'}}>
              Limited Time Offer - First Month <span className="underline">FREE</span>
            </h3>
            <p className="mt-1 animate-fade-in" style={{animationDelay:'0.25s',animationFillMode:'both'}}>Join now and start your fitness journey today! Offer ends in 7 days.</p>
          </div>
          <Button className="bg-white text-neogym-red hover:bg-gray-100 font-bold px-8 hover-scale animate-fade-in" style={{animationDelay:'0.28s',animationFillMode:'both'}}>
            Claim Offer
          </Button>
        </div>
      </div>
      <button 
        onClick={dismissBanner}
        className="absolute top-2 right-2 text-white hover:text-gray-200 p-1 transition duration-300 hover:scale-125"
        aria-label="Dismiss promotion"
        style={{transition: 'transform 0.2s'}}
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default PromoBanner;
