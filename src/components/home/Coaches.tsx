import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const coaches = [
  {
    name: "Michael Johnson",
    role: "Head Trainer",
    specialty: "Strength Training",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    bio: "Michael has over 10 years of experience in strength training and nutrition."
  },
  {
    name: "Emily Parker",
    role: "Fitness Coach",
    specialty: "HIIT & Cardio",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    bio: "Emily specializes in high-intensity interval training and cardio programs."
  },
  {
    name: "David Rodriguez",
    role: "Yoga Instructor",
    specialty: "Flexibility & Meditation",
    image: "https://images.unsplash.com/photo-1530645298377-82c8416d3f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", 
    bio: "David brings calmness and focus through his specialized yoga sessions."
  },
  {
    name: "Sarah Thompson",
    role: "Nutrition Expert",
    specialty: "Diet & Wellness",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    bio: "Sarah helps members achieve their goals through proper nutrition planning."
  }
];

const Coaches = () => {
  return (
    <section className="section-padding bg-white animate-fade-in" style={{animationDelay:'0.27s',animationFillMode:'both'}}>
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in" style={{animationDelay:'0.28s',animationFillMode:'both'}}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            Our <span className="text-neogym-red">Best Coaches</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{animationDelay:'0.29s',animationFillMode:'both'}}>
            Meet our team of certified fitness professionals dedicated to helping you 
            achieve your fitness goals and transform your life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coaches.map((coach, index) => (
            <Card key={index} className="overflow-hidden hover-scale animate-fade-in" style={{animationDelay:`${0.35 + index*0.08}s`,animationFillMode:'both'}}>
              <div className="h-64 overflow-hidden">
                <img 
                  src={coach.image} 
                  alt={coach.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1">{coach.name}</h3>
                <p className="text-neogym-red font-semibold mb-1">{coach.role}</p>
                <p className="text-sm text-gray-500 mb-3">Specialty: {coach.specialty}</p>
                <p className="text-gray-600 mb-4">{coach.bio}</p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-neogym-red transition-colors hover-scale">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-neogym-red transition-colors hover-scale">
                    <Facebook size={18} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-neogym-red transition-colors hover-scale">
                    <Twitter size={18} />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Coaches;
