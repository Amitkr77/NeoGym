
import React from 'react';
import { Button } from '../ui/button';

const PromoBanner = () => {
  return (
    <div className="bg-neogym-red py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-white text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-xl md:text-2xl font-bold">
              Limited Time Offer - First Month <span className="underline">FREE</span>
            </h3>
            <p className="mt-1">Join now and start your fitness journey today!</p>
          </div>
          <Button className="bg-white text-neogym-red hover:bg-gray-100 font-bold px-8">
            Claim Offer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
