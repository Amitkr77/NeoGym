
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dumbbell, ArrowLeft, Info } from "lucide-react";
import EquipmentDetail from './EquipmentDetail';

// Sample equipment data - in a real application, this would come from an API or database
const dummyEquipment = [
  {
    id: 1,
    name: "Treadmill",
    description: "Cardiovascular machine for walking or running in place.",
    category: "cardio",
    status: "operational",
    image: "/placeholder.svg",
    benefits: "Improves cardiovascular health, burns calories, enhances leg strength.",
    instructions: "1. Step onto the treadmill.\n2. Use the console to set your desired speed and incline.\n3. Begin walking or running at a comfortable pace.\n4. Use the handrails for balance if needed.\n5. To stop, reduce speed gradually before stepping off.",
    safety: "Keep your body centered on the belt. Don't look down at your feet. Maintain good posture. Use the emergency stop if needed."
  },
  {
    id: 2,
    name: "Bench Press",
    description: "Strength training equipment for chest muscles.",
    category: "strength",
    status: "operational",
    image: "/placeholder.svg",
    benefits: "Builds chest muscles, strengthens shoulders and triceps, improves upper body strength.",
    instructions: "1. Lie on the bench with your feet flat on the floor.\n2. Grip the bar with hands slightly wider than shoulder-width.\n3. Lower the bar to your chest, keeping elbows at 90 degrees.\n4. Push the bar back up to the starting position.\n5. Repeat for the desired number of repetitions.",
    safety: "Always use a spotter when lifting heavy weights. Keep your feet flat on the floor and maintain proper form throughout the exercise."
  },
  {
    id: 3,
    name: "Leg Press",
    description: "Machine for lower body strength training.",
    category: "strength",
    status: "maintenance",
    image: "/placeholder.svg",
    benefits: "Strengthens quadriceps, hamstrings, and glutes. Safer alternative to squats for some individuals.",
    instructions: "1. Sit in the machine with your back against the padded support.\n2. Place feet on the platform shoulder-width apart.\n3. Release the safety bars and lower the weight by bending your knees.\n4. Push through your heels to extend your legs without locking your knees.\n5. Return to starting position and repeat.",
    safety: "Never lock your knees at the top of the movement. Keep your back against the pad throughout the exercise. Don't use excessive weight."
  },
  {
    id: 4,
    name: "Elliptical Trainer",
    description: "Low-impact cardiovascular machine.",
    category: "cardio",
    status: "operational",
    image: "/placeholder.svg",
    benefits: "Provides a full-body, low-impact workout. Burns calories and improves cardiovascular health.",
    instructions: "1. Step onto the pedals and grip the handlebars.\n2. Begin moving your feet in an elliptical motion.\n3. Use the console to adjust resistance and incline as desired.\n4. Maintain good posture throughout the exercise.\n5. To stop, slow down gradually before stepping off.",
    safety: "Maintain proper posture with your back straight. Don't lean on the handlebars. Step on and off only when the pedals are not moving."
  }
];

const EquipmentDisplay = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState<null | any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // Filter equipment based on search and filters
  const filteredEquipment = dummyEquipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleEquipmentClick = (equipment: any) => {
    setSelectedEquipment(equipment);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Search and filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Search equipment..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="cardio">Cardio</SelectItem>
            <SelectItem value="strength">Strength</SelectItem>
            <SelectItem value="flexibility">Flexibility</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="operational">Operational</SelectItem>
            <SelectItem value="maintenance">Under Maintenance</SelectItem>
            <SelectItem value="outOfService">Out of Service</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Equipment grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredEquipment.map((equipment) => (
          <Card 
            key={equipment.id} 
            className={`cursor-pointer hover:shadow-lg transition-shadow ${
              equipment.status === 'maintenance' ? 'border-amber-400' : 
              equipment.status === 'outOfService' ? 'border-red-400' : ''
            }`}
            onClick={() => handleEquipmentClick(equipment)}
          >
            <CardContent className="p-4">
              <div className="aspect-square relative mb-4">
                <img 
                  src={equipment.image} 
                  alt={equipment.name} 
                  className="w-full h-full object-cover rounded-md"
                />
                {equipment.status !== 'operational' && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                    <span className={`px-3 py-1 rounded-full text-white text-sm ${
                      equipment.status === 'maintenance' ? 'bg-amber-500' : 'bg-red-500'
                    }`}>
                      {equipment.status === 'maintenance' ? 'Under Maintenance' : 'Out of Service'}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{equipment.name}</h3>
                  <p className="text-gray-500 text-sm">{equipment.category.charAt(0).toUpperCase() + equipment.category.slice(1)}</p>
                </div>
                <Dumbbell className="text-primary h-5 w-5" />
              </div>
              <p className="text-sm mt-2 line-clamp-2">{equipment.description}</p>
              <Button variant="outline" size="sm" className="w-full mt-4">
                <Info className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEquipment.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No equipment found matching your criteria.</p>
        </div>
      )}

      {/* Equipment detail dialog */}
      {selectedEquipment && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mr-2 p-0 h-8 w-8"
                  onClick={() => setIsDetailOpen(false)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                {selectedEquipment.name}
              </DialogTitle>
              <DialogDescription>
                {selectedEquipment.description}
              </DialogDescription>
            </DialogHeader>
            <EquipmentDetail equipment={selectedEquipment} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EquipmentDisplay;
