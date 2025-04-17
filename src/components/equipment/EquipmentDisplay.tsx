import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dumbbell, Search } from "lucide-react";
import EquipmentDetail from './EquipmentDetail';

// Sample equipment data
const equipmentData = [
  {
    id: 1,
    name: "Treadmill",
    description: "Cardiovascular machine for walking or running in place.",
    category: "cardio",
    status: "operational",
    image: "/placeholder.svg",
    instructions: "1. Step onto the treadmill and stand on the side rails\n2. Press the start button and set your desired speed\n3. Carefully step onto the moving belt and begin walking\n4. Use the handrails for balance if needed\n5. To stop, press the stop button and wait for the belt to completely stop",
    benefits: "Burns calories. Improves cardiovascular health. Strengthens leg muscles. Convenient indoor exercise option. Allows for controlled workout intensity.",
    safety: "Always use the safety clip. Start at a slow speed. Don't look backward while running. Keep children away from the machine. Maintain proper posture while running."
  },
  {
    id: 2,
    name: "Bench Press",
    description: "Strength training equipment for chest muscles.",
    category: "strength",
    status: "operational",
    image: "/placeholder.svg",
    instructions: "1. Lie on the bench with feet flat on the floor\n2. Grip the bar slightly wider than shoulder width\n3. Lower the bar to your mid-chest\n4. Push the bar back up to the starting position\n5. Repeat for desired number of repetitions",
    benefits: "Builds chest strength. Develops triceps and shoulder muscles. Improves upper body power. Enhances pushing strength for daily activities. Increases bone density.",
    safety: "Always use a spotter for heavy weights. Keep your back flat against the bench. Don't bounce the bar off your chest. Maintain control throughout the movement. Lock the weights properly before starting."
  },
  {
    id: 3,
    name: "Leg Press",
    description: "Machine for lower body strength training.",
    category: "strength",
    status: "maintenance",
    image: "/placeholder.svg",
    instructions: "1. Sit on the machine with your back against the padded support\n2. Place your feet on the platform shoulder-width apart\n3. Release the safety handles and lower the weight slowly\n4. Push through your heels to return to the starting position\n5. Re-engage safety handles when finished",
    benefits: "Strengthens quadriceps, hamstrings and glutes. Allows for heavy loading with reduced spinal compression. Builds lower body power. Improves functional leg strength. Suitable for rehabilitation.",
    safety: "Don't lock your knees at the top of the movement. Keep your back against the pad. Don't lift your hips off the seat. Control the weight throughout the movement. Use appropriate weight for your fitness level."
  },
  {
    id: 4,
    name: "Elliptical Trainer",
    description: "Low-impact cardiovascular machine.",
    category: "cardio",
    status: "operational",
    image: "/placeholder.svg",
    instructions: "1. Step onto the pedals and hold the handlebars\n2. Select your desired program on the console\n3. Begin pedaling forward in a smooth motion\n4. Maintain an upright posture throughout the workout\n5. To stop, gradually slow your pace before stepping off",
    benefits: "Provides low-impact cardio workout. Engages both upper and lower body. Burns calories efficiently. Improves balance and coordination. Reduces stress on joints compared to running.",
    safety: "Step on and off only when the machine is stopped. Maintain proper posture during use. Don't lean too heavily on the handlebars. Keep children away from moving parts. Hold handlebars when changing settings."
  },
  {
    id: 5,
    name: "Cable Machine",
    description: "Versatile equipment for various muscle groups.",
    category: "strength",
    status: "operational",
    image: "/placeholder.svg",
    instructions: "1. Adjust the cable to desired height\n2. Select appropriate attachment for your exercise\n3. Set the weight stack to your desired resistance\n4. Maintain proper form throughout the movement\n5. Return the weight stack slowly to starting position",
    benefits: "Allows for a wide variety of exercises. Provides constant tension throughout movements. Enables functional, multi-plane training. Suitable for all fitness levels. Helps develop stabilizing muscles.",
    safety: "Check that attachments are secure before use. Don't release the weight stack suddenly. Maintain control throughout the movement. Keep body parts clear of the weight stack. Use appropriate weight for your fitness level."
  },
  {
    id: 6,
    name: "Rowing Machine",
    description: "Full-body cardiovascular equipment.",
    category: "cardio",
    status: "out_of_service",
    image: "/placeholder.svg",
    instructions: "1. Sit on the seat and secure your feet in the straps\n2. Grab the handle with an overhand grip\n3. Push with your legs first, then pull with your arms\n4. Return to starting position by extending arms then bending knees\n5. Maintain a smooth, controlled rhythm throughout",
    benefits: "Provides full-body workout. Excellent for cardiovascular fitness. Builds back, arm and leg strength. Low-impact exercise option. Improves coordination and endurance.",
    safety: "Keep your back straight, not rounded. Don't hyperextend your knees. Control the return movement. Maintain a smooth rowing motion. Don't twist your body during the movement."
  }
];

const EquipmentDisplay = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter equipment based on search term and filters
  const filteredEquipment = equipmentData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div>
      {selectedEquipment ? (
        <div>
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setSelectedEquipment(null)}
              className="mb-4"
            >
              ← Back to Equipment List
            </Button>
            <h2 className="text-3xl font-bold">{selectedEquipment.name}</h2>
          </div>
          <EquipmentDetail equipment={selectedEquipment} />
        </div>
      ) : (
        <div>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="maintenance">Under Maintenance</SelectItem>
                  <SelectItem value="out_of_service">Out of Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipment.length > 0 ? (
              filteredEquipment.map((item) => (
                <Card 
                  key={item.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedEquipment(item)}
                >
                  <div className="aspect-video relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                    <Badge 
                      variant={
                        item.status === 'operational' ? 'default' : 
                        item.status === 'maintenance' ? 'secondary' : 'destructive'
                      }
                      className="absolute top-2 right-2"
                    >
                      {item.status === 'operational' 
                        ? 'Operational' 
                        : item.status === 'maintenance' 
                          ? 'Under Maintenance' 
                          : 'Out of Service'}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <Dumbbell className="text-primary h-5 w-5" />
                    </div>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                No equipment found matching your criteria.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentDisplay;
