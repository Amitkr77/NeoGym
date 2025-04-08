
import React from 'react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const facilities = [
  {
    title: "Cardio Section",
    description: "Our cardio section features state-of-the-art equipment from industry-leading brands. Treadmills, ellipticals, stair climbers, and stationary bikes are all available to help you achieve your cardiovascular fitness goals.",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    features: ["25+ modern cardio machines", "Personal TV screens", "Heart rate monitoring", "Virtual training programs"]
  },
  {
    title: "Strength Training Area",
    description: "Our comprehensive strength training area includes free weights, resistance machines, and dedicated spaces for functional training. Whether you're a beginner or an experienced lifter, our facility provides everything you need.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    features: ["Full range of free weights", "Hammer Strength equipment", "Cable machines", "Dedicated squat racks and platforms"]
  },
  {
    title: "Group Exercise Studios",
    description: "Our spacious group exercise studios host a variety of classes for all fitness levels. From high-intensity interval training to mindful yoga sessions, our certified instructors guide you through effective and enjoyable workouts.",
    image: "https://images.unsplash.com/photo-1602827114685-efbb2717da9f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: ["Multiple studio spaces", "Professional sound systems", "Climate control", "Classes for all fitness levels"]
  },
  {
    title: "Recovery & Wellness Zone",
    description: "Our recovery and wellness zone is designed to help you optimize your post-workout recovery. Featuring saunas, steam rooms, and cold plunge pools, this area promotes muscle recovery, reduces stress, and improves overall well-being.",
    image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    features: ["Dry sauna", "Steam room", "Cold plunge pool", "Relaxation area"]
  },
  {
    title: "Indoor Swimming Pool",
    description: "Our 25-meter indoor swimming pool is perfect for lap swimming, aquatic exercises, and swimming lessons. The controlled environment ensures you can enjoy water-based activities year-round.",
    image: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    features: ["25-meter lap pool", "Heated water", "Dedicated swim lanes", "Aquatic fitness classes"]
  },
  {
    title: "Personal Training Spaces",
    description: "Our dedicated personal training areas provide a semi-private environment where you can work one-on-one with our expert trainers. These spaces are equipped with specialized tools to help you achieve your specific fitness goals.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    features: ["Private training areas", "Specialized equipment", "Functional training tools", "Assessment technology"]
  }
];

const Facilities = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-neogym-dark py-24">
        <div className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl text-white font-bold mb-6">World-Class <span className="text-neogym-red">Facilities</span></h1>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">Experience fitness in a premier environment designed to inspire and support your journey to better health and performance.</p>
          <div className="flex flex-wrap gap-4">
            <Button 
              className="bg-neogym-red hover:bg-neogym-red/90 text-white"
              onClick={() => navigate('/contact?tour=true')}
            >
              Book a Tour
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate('/pricing')}
            >
              View Membership Options
            </Button>
          </div>
        </div>
      </div>
      
      {/* Facilities List */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Explore Our <span className="text-neogym-red">Premium Facilities</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover the range of state-of-the-art facilities available to all NeoGym members. Each area is thoughtfully designed to maximize your workout experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {facilities.map((facility, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-[1.01]">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={facility.image} 
                    alt={facility.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{facility.title}</h3>
                  <p className="text-gray-600 mb-4">{facility.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2 text-neogym-red">Key Features:</h4>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      {facility.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold mb-4">Ready to experience our facilities?</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-neogym-red hover:bg-neogym-red/90 text-white"
                onClick={() => navigate('/signup')}
              >
                Join NeoGym Today
              </Button>
              <Button 
                variant="outline" 
                className="border-neogym-dark text-neogym-dark hover:bg-neogym-dark/10"
                onClick={() => navigate('/contact?tour=true')}
              >
                Schedule a Tour
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Brands */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Premium <span className="text-neogym-red">Equipment Brands</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We partner with the world's leading fitness equipment manufacturers to provide you with the best workout experience.</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
            <div className="w-36 h-12 flex items-center justify-center">
              <p className="text-gray-500 text-xl font-bold">LIFE FITNESS</p>
            </div>
            <div className="w-36 h-12 flex items-center justify-center">
              <p className="text-gray-500 text-xl font-bold">TECHNOGYM</p>
            </div>
            <div className="w-36 h-12 flex items-center justify-center">
              <p className="text-gray-500 text-xl font-bold">HAMMER</p>
            </div>
            <div className="w-36 h-12 flex items-center justify-center">
              <p className="text-gray-500 text-xl font-bold">PRECOR</p>
            </div>
            <div className="w-36 h-12 flex items-center justify-center">
              <p className="text-gray-500 text-xl font-bold">MATRIX</p>
            </div>
            <div className="w-36 h-12 flex items-center justify-center">
              <p className="text-gray-500 text-xl font-bold">NAUTILUS</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Facilities;
