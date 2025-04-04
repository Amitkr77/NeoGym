
import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-neogym-dark flex items-center">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-black opacity-70 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      />
      
      {/* Content */}
      <div className="container mx-auto relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Achieve Your Fitness Goals with <span className="text-neogym-red">NeoGym</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Join our community of fitness enthusiasts, experts, and coaches. 
            Experience fitness like never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-neogym-red hover:bg-neogym-red/90 text-white text-lg px-8 py-6">
              Get Started
            </Button>
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 text-lg px-8 py-6">
              Take a Tour <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
