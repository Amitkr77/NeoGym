
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

// Sample data
const weightData = [
  { date: "Jan", weight: 85 },
  { date: "Feb", weight: 83 },
  { date: "Mar", weight: 82 },
  { date: "Apr", weight: 80 },
  { date: "May", weight: 78 },
  { date: "Jun", weight: 76 },
  { date: "Jul", weight: 75 },
];

const strengthData = [
  { date: "Jan", benchPress: 60, squat: 80, deadlift: 100 },
  { date: "Feb", benchPress: 65, squat: 85, deadlift: 110 },
  { date: "Mar", benchPress: 70, squat: 90, deadlift: 120 },
  { date: "Apr", benchPress: 72, squat: 95, deadlift: 125 },
  { date: "May", benchPress: 75, squat: 100, deadlift: 130 },
  { date: "Jun", benchPress: 77, squat: 105, deadlift: 135 },
  { date: "Jul", benchPress: 80, squat: 110, deadlift: 140 },
];

const cardioData = [
  { date: "Jan", runtime: 35, distance: 3 },
  { date: "Feb", runtime: 33, distance: 3.2 },
  { date: "Mar", runtime: 32, distance: 3.5 },
  { date: "Apr", runtime: 30, distance: 4 },
  { date: "May", runtime: 28, distance: 4.3 },
  { date: "Jun", runtime: 27, distance: 4.7 },
  { date: "Jul", runtime: 25, distance: 5 },
];

const attendanceData = [
  { month: "Jan", visits: 8 },
  { month: "Feb", visits: 12 },
  { month: "Mar", visits: 15 },
  { month: "Apr", visits: 18 },
  { month: "May", visits: 20 },
  { month: "Jun", visits: 22 },
  { month: "Jul", visits: 24 },
];

const ProgressChart = () => {
  const [activeTab, setActiveTab] = useState("weight");
  const [chartPeriod, setChartPeriod] = useState("6m");
  
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Fitness Progress</CardTitle>
          <div className="space-x-2">
            <button 
              onClick={() => setChartPeriod("1m")} 
              className={`px-3 py-1 text-xs rounded-md ${chartPeriod === "1m" ? "bg-neogym-red text-white" : "bg-gray-200"}`}
            >
              1M
            </button>
            <button 
              onClick={() => setChartPeriod("3m")} 
              className={`px-3 py-1 text-xs rounded-md ${chartPeriod === "3m" ? "bg-neogym-red text-white" : "bg-gray-200"}`}
            >
              3M
            </button>
            <button 
              onClick={() => setChartPeriod("6m")} 
              className={`px-3 py-1 text-xs rounded-md ${chartPeriod === "6m" ? "bg-neogym-red text-white" : "bg-gray-200"}`}
            >
              6M
            </button>
            <button 
              onClick={() => setChartPeriod("1y")} 
              className={`px-3 py-1 text-xs rounded-md ${chartPeriod === "1y" ? "bg-neogym-red text-white" : "bg-gray-200"}`}
            >
              1Y
            </button>
          </div>
        </div>
        <CardDescription>Track your fitness journey progress</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weight" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="strength">Strength</TabsTrigger>
            <TabsTrigger value="cardio">Cardio</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weight" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="weight" stroke="#f43f5e" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="strength" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={strengthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="benchPress" stroke="#f43f5e" strokeWidth={2} />
                <Line type="monotone" dataKey="squat" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="deadlift" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="cardio" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cardioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#f43f5e" />
                <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="runtime" stroke="#f43f5e" strokeWidth={2} name="Run Time (min)" />
                <Line yAxisId="right" type="monotone" dataKey="distance" stroke="#3b82f6" strokeWidth={2} name="Distance (km)" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="attendance" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="visits" fill="#f43f5e" name="Gym Visits" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;
