
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Heart, HelpCircle, ShieldAlert } from "lucide-react";

const EquipmentDetail = ({ equipment }: { equipment: any }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <img 
            src={equipment.image} 
            alt={equipment.name} 
            className="w-full aspect-square object-cover rounded-lg"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="capitalize">
              {equipment.category}
            </Badge>
            <Badge 
              variant={
                equipment.status === 'operational' ? 'default' : 
                equipment.status === 'maintenance' ? 'warning' : 'destructive'
              }
            >
              {equipment.status === 'operational' 
                ? 'Operational' 
                : equipment.status === 'maintenance' 
                  ? 'Under Maintenance' 
                  : 'Out of Service'}
            </Badge>
          </div>
        </div>
        
        <div className="w-full md:w-2/3">
          <Tabs defaultValue="instructions">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="instructions" className="flex items-center">
                <Dumbbell className="h-4 w-4 mr-2" />
                Instructions
              </TabsTrigger>
              <TabsTrigger value="benefits" className="flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                Benefits
              </TabsTrigger>
              <TabsTrigger value="safety" className="flex items-center">
                <ShieldAlert className="h-4 w-4 mr-2" />
                Safety
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="instructions" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>How to Use This Equipment</CardTitle>
                  <CardDescription>
                    Follow these step-by-step instructions for proper usage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {equipment.instructions.split('\n').map((step: string, index: number) => (
                      <div key={index} className="flex">
                        <span className="mr-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                          {index + 1}
                        </span>
                        <p>{step.replace(/^\d+\.\s*/, '')}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="benefits" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Benefits</CardTitle>
                  <CardDescription>
                    How this equipment contributes to your fitness goals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {equipment.benefits.split('.').filter((benefit: string) => benefit.trim()).map((benefit: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <Heart className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <p>{benefit.trim()}.</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="safety" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Safety Guidelines</CardTitle>
                  <CardDescription>
                    Important safety information to prevent injuries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {equipment.safety.split('.').filter((tip: string) => tip.trim()).map((tip: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <ShieldAlert className="h-5 w-5 text-destructive mr-2 mt-0.5" />
                        <p>{tip.trim()}.</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetail;
