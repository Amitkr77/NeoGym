
import React from 'react';
import { Button } from '../ui/button';

const CallToAction = () => {
  return (
    <section className="py-20 bg-neogym-dark text-white relative overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 opacity-70 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      />
              <div className="absolute inset-0 bg-black opacity-70 z-10"></div>

      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Start Your <span className="text-neogym-red">Fitness Journey</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join NeoGym today and take the first step towards a healthier, stronger you. 
            Our expert trainers and state-of-the-art facilities are waiting for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-neogym-red hover:bg-neogym-red/90 text-white text-lg px-10 py-6">
              Join NeoGym Today
            </Button>
            <Button variant="outline" className="border-white text-black hover:bg-white/10 text-lg px-10 py-6">
              Book a Free Tour
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
