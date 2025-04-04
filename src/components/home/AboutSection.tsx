
import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section className="section-padding bg-gray-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                alt="NeoGym Facility" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-neogym-red text-white p-6 rounded-lg shadow-lg hidden md:block">
              <p className="text-3xl font-bold">10+</p>
              <p className="text-sm uppercase">Years of Experience</p>
            </div>
          </div>
          
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="text-neogym-red">NeoGym</span>
            </h2>
            <p className="text-gray-700 mb-4">
              Founded in 2013, NeoGym has been at the forefront of fitness innovation, 
              providing a premium gym experience that combines cutting-edge equipment, 
              expert guidance, and a supportive community.
            </p>
            <p className="text-gray-700 mb-6">
              Our mission is to empower individuals to transform their lives through 
              fitness. We believe that everyone deserves access to the tools, knowledge, 
              and support needed to achieve their health and fitness goals.
            </p>
            
            {/* Testimonial */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <p className="italic text-gray-600 mb-4">
                "NeoGym changed my life. The trainers are exceptional, and the community 
                is so supportive. I've achieved results I never thought possible!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <p className="font-bold">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Member since 2018</p>
                </div>
              </div>
            </div>
            
            <Link to="/about">
              <Button className="bg-neogym-dark hover:bg-neogym-dark/90 text-white">
                Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
