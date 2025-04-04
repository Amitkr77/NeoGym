
import React from 'react';
import { 
  Dumbbell, 
  Users, 
  Clock, 
  Star 
} from 'lucide-react';

const features = [
  {
    icon: <Dumbbell className="h-12 w-12 text-neogym-red" />,
    title: "State-of-the-art Equipment",
    description: "Access to the latest fitness equipment to maximize your workout efficiency and results."
  },
  {
    icon: <Users className="h-12 w-12 text-neogym-red" />,
    title: "Certified Coaches",
    description: "Our expert trainers are certified professionals dedicated to helping you achieve your goals."
  },
  {
    icon: <Clock className="h-12 w-12 text-neogym-red" />,
    title: "Flexible Hours",
    description: "Open 24/7 to accommodate your schedule, whenever you prefer to train."
  },
  {
    icon: <Star className="h-12 w-12 text-neogym-red" />,
    title: "Personalized Programs",
    description: "Custom fitness plans tailored to your unique needs and fitness objectives."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-neogym-red">NeoGym</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're more than just a gym. We're a community dedicated to helping you achieve 
            your fitness goals in a motivating and supportive environment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-6 rounded-lg text-center hover-scale"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
