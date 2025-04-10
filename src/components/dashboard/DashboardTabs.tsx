
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FitnessTab from "./fitness/FitnessTab";
import ClassScheduleTab from "./schedule/ClassScheduleTab";
import PaymentTab from "./payment/PaymentTab";

interface DashboardTabsProps {
  defaultValue?: string;
}

const DashboardTabs = ({ defaultValue = "fitness" }: DashboardTabsProps) => {
  return (
    <Tabs defaultValue={defaultValue} className="space-y-4">
      <TabsList className="grid grid-cols-3 h-auto p-1">
        <TabsTrigger value="fitness" className="py-2">
          Fitness
        </TabsTrigger>
        <TabsTrigger value="schedule" className="py-2">
          Class Schedule
        </TabsTrigger>
        <TabsTrigger value="payment" className="py-2">
          Payment
        </TabsTrigger>
      </TabsList>

      <TabsContent value="fitness" className="mt-0">
        <FitnessTab />
      </TabsContent>

      <TabsContent value="schedule" className="mt-0">
        <ClassScheduleTab />
      </TabsContent>

      <TabsContent value="payment" className="mt-0">
        <PaymentTab />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
