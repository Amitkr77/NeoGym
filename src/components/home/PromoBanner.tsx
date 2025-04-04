
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const dismissBanner = () => {
    setIsVisible(false);
    // Optionally store this preference in localStorage
    localStorage.setItem('promoBannerDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="bg-neogym-red py-6 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-white text-center md:text-left mb-4 md:mb-0 pr-8">
            <h3 className="text-xl md:text-2xl font-bold">
              Limited Time Offer - First Month <span className="underline">FREE</span>
            </h3>
            <p className="mt-1">Join now and start your fitness journey today! Offer ends in 7 days.</p>
          </div>
          <Button className="bg-white text-neogym-red hover:bg-gray-100 font-bold px-8">
            Claim Offer
          </Button>
        </div>
      </div>
      <button 
        onClick={dismissBanner}
        className="absolute top-2 right-2 text-white hover:text-gray-200 p-1"
        aria-label="Dismiss promotion"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default PromoBanner;
