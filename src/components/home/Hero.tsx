
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { ArrowRight, Play, Pause } from 'lucide-react';

const Hero = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // This would be replaced with actual auth logic
  useEffect(() => {
    // For demo purposes, check if user is logged in
    const checkLoginStatus = () => {
      // This is just placeholder logic - would be replaced with actual auth check
      const token = localStorage.getItem('auth_token');
      setIsLoggedIn(!!token);
    };
    
    checkLoginStatus();
  }, []);

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
    
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      if (isVideoPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center pt-16">
      {/* Video Background */}
      <div className="absolute inset-0 bg-black z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
        <video 
          id="hero-video"
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        >
          <source src="https://player.vimeo.com/external/414182181.sd.mp4?s=ca8f91bdf5f87381468b7b745d142ce23a698b3a&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button 
          onClick={toggleVideo} 
          className="absolute bottom-5 right-5 z-20 bg-neogym-dark/50 p-2 rounded-full text-white hover:bg-neogym-dark transition-colors"
          aria-label={isVideoPlaying ? "Pause background video" : "Play background video"}
        >
          {isVideoPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>
      
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
              {isLoggedIn ? "Track Your Progress" : "Get Started"}
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
