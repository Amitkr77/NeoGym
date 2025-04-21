
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Sample featured equipment data
const featuredEquipment = [
  {
    id: 1,
    name: "Treadmill",
    description: "Cardiovascular machine for walking or running",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Bench Press",
    description: "Strength training equipment for chest muscles",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Elliptical Trainer",
    description: "Low-impact cardiovascular machine",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Leg Press",
    description: "Machine for lower body strength training",
    image: "/placeholder.svg"
  }
];

const EquipmentFeature = () => {
  return (
    <section className="py-16 bg-gray-50 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            Our State-of-the-Art Equipment
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto animate-fade-in" style={{animationDelay:'0.1s',animationFillMode:'both'}}>
            Explore our premium fitness equipment designed to help you achieve your fitness goals. Each piece is 
            meticulously maintained and comes with detailed instructions for proper use.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {featuredEquipment.map((item, idx) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow hover-scale animate-fade-in" style={{animationDelay:`${0.15 + idx*0.09}s`,animationFillMode:'both'}}>
              <div className="aspect-video relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <Dumbbell className="text-primary h-5 w-5" />
                </div>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <Button asChild variant="outline" size="sm" className="w-full hover-scale">
                  <Link to="/equipment">
                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" className="hover-scale animate-fade-in">
            <Link to="/equipment">
              View All Equipment
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EquipmentFeature;
