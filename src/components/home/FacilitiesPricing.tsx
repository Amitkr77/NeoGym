
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Check } from 'lucide-react';

const facilities = [
  {
    title: "Cardio Section",
    description: "State-of-the-art cardio equipment including treadmills, ellipticals, and stationary bikes.",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    title: "Strength Training",
    description: "Free weights area with dumbbells, barbells, and a variety of weight machines.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    title: "Group Classes",
    description: "Energetic group sessions including HIIT, yoga, spinning, and more.",
    image: "https://images.unsplash.com/photo-1602827114685-efbb2717da9f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Recovery Zone",
    description: "Sauna, steam room, and cold plunge for optimal muscle recovery.",
    image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

const pricingPlans = [
  {
    name: "Basic",
    price: "29",
    duration: "monthly",
    features: [
      "Access to gym during off-peak hours",
      "Basic fitness equipment",
      "1 personal training session/month",
      "Locker access",
    ],
    recommended: false
  },
  {
    name: "Premium",
    price: "59",
    duration: "monthly",
    features: [
      "24/7 gym access",
      "Full access to all equipment",
      "3 personal training sessions/month",
      "Group classes included",
      "Towel service",
      "Locker access"
    ],
    recommended: true
  },
  {
    name: "Elite",
    price: "99",
    duration: "monthly",
    features: [
      "24/7 gym access",
      "Full access to all equipment",
      "Unlimited personal training",
      "Unlimited group classes",
      "Nutritional counseling",
      "Towel service",
      "Premium locker",
      "Sauna & recovery zone access"
    ],
    recommended: false
  }
];

const FacilitiesPricing = () => {
  return (
    <section className="section-padding bg-gray-100">
      <div className="container mx-auto">
        <Tabs defaultValue="facilities" className="w-full">
          <div className="text-center mb-12">
            <TabsList className="inline-flex bg-gray-200 p-1 rounded-lg">
              <TabsTrigger 
                value="facilities" 
                className="data-[state=active]:bg-neogym-red data-[state=active]:text-white px-8 py-3 rounded-md transition-all"
              >
                Our Facilities
              </TabsTrigger>
              <TabsTrigger 
                value="pricing" 
                className="data-[state=active]:bg-neogym-red data-[state=active]:text-white px-8 py-3 rounded-md transition-all"
              >
                Membership Pricing
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Facilities Content */}
          <TabsContent value="facilities" className="mt-0">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                State-of-the-Art <span className="text-neogym-red">Facilities</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience fitness at its finest with our modern equipment and specialized training areas.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {facilities.map((facility, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover-scale">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={facility.image} 
                      alt={facility.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{facility.title}</h3>
                    <p className="text-gray-600">{facility.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* Pricing Content */}
          <TabsContent value="pricing" className="mt-0">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Membership <span className="text-neogym-red">Plans</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose the membership that fits your fitness needs and budget.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-lg overflow-hidden shadow-md relative ${
                    plan.recommended ? 'border-2 border-neogym-red transform md:-translate-y-4' : ''
                  }`}
                >
                  {plan.recommended && (
                    <div className="bg-neogym-red text-white text-center py-2 font-semibold">
                      Most Popular
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-gray-500">/{plan.duration}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="text-neogym-red mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full ${
                      plan.recommended 
                        ? 'bg-neogym-red hover:bg-neogym-red/90' 
                        : 'bg-neogym-dark hover:bg-neogym-dark/90'
                    } text-white`}>
                      Choose Plan
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FacilitiesPricing;
