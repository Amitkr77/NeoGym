
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash, FileText } from "lucide-react";
import ProgressChart from "../ProgressChart";
import AddRecordModal from "./AddRecordModal";
import AddGoalModal from "./AddGoalModal";
import AddAssessmentModal from "./AddAssessmentModal";
import UpdateMeasurementsModal from "./UpdateMeasurementsModal";
import WorkoutDetailsModal from "./WorkoutDetailsModal";
import { useToast } from "@/hooks/use-toast";

const recordsData = [
  { id: 1, exercise: "Bench Press", weight: "80kg", reps: 10, sets: 3, date: "2023-04-01" },
  { id: 2, exercise: "Squat", weight: "100kg", reps: 8, sets: 4, date: "2023-04-03" },
  { id: 3, exercise: "Deadlift", weight: "120kg", reps: 6, sets: 3, date: "2023-04-05" },
];

const goalsData = [
  { id: 1, title: "Increase Bench Press", target: "100kg", category: "Strength", deadline: "2023-06-30", progress: 75 },
  { id: 2, title: "Run 10km", target: "10km", category: "Cardio", deadline: "2023-07-15", progress: 60 },
  { id: 3, title: "Lose Weight", target: "5kg", category: "Weight", deadline: "2023-08-01", progress: 40 },
];

const assessmentsData = [
  { id: 1, date: "2023-03-01", weight: "85kg", bodyFat: "18%", measurements: { chest: "105cm", waist: "90cm", arms: "38cm", legs: "60cm" } },
  { id: 2, date: "2023-04-01", weight: "83kg", bodyFat: "17%", measurements: { chest: "106cm", waist: "88cm", arms: "39cm", legs: "61cm" } },
];

const workoutHistoryData = [
  { 
    id: 1, 
    date: "2023-04-15", 
    title: "Upper Body Workout", 
    duration: "45 min", 
    caloriesBurned: 320, 
    intensity: "Medium",
    exercises: [
      { name: "Bench Press", sets: 3, reps: 10, weight: "80kg" },
      { name: "Shoulder Press", sets: 3, reps: 12, weight: "50kg" },
      { name: "Bicep Curls", sets: 3, reps: 15, weight: "15kg" },
      { name: "Tricep Extensions", sets: 3, reps: 15, weight: "20kg" },
    ]
  },
  { 
    id: 2, 
    date: "2023-04-13", 
    title: "Lower Body Workout", 
    duration: "50 min", 
    caloriesBurned: 400, 
    intensity: "High",
    exercises: [
      { name: "Squats", sets: 4, reps: 8, weight: "100kg" },
      { name: "Deadlifts", sets: 3, reps: 8, weight: "120kg" },
      { name: "Leg Press", sets: 3, reps: 12, weight: "150kg" },
      { name: "Calf Raises", sets: 3, reps: 20, weight: "50kg" },
    ]
  },
  { 
    id: 3, 
    date: "2023-04-10", 
    title: "Core Workout", 
    duration: "30 min", 
    caloriesBurned: 250, 
    intensity: "Medium",
    exercises: [
      { name: "Crunches", sets: 3, reps: 20, weight: "Body Weight" },
      { name: "Planks", sets: 3, reps: 1, weight: "Body Weight (60s)" },
      { name: "Russian Twists", sets: 3, reps: 16, weight: "10kg" },
      { name: "Leg Raises", sets: 3, reps: 15, weight: "Body Weight" },
    ]
  },
];

const FitnessTab = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("records");
  const [isAddRecordModalOpen, setIsAddRecordModalOpen] = useState(false);
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
  const [isAddAssessmentModalOpen, setIsAddAssessmentModalOpen] = useState(false);
  const [isUpdateMeasurementsModalOpen, setIsUpdateMeasurementsModalOpen] = useState(false);
  const [isWorkoutDetailsModalOpen, setIsWorkoutDetailsModalOpen] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState<any>(null);
  const [measurements, setMeasurements] = useState({
    weight: "83kg",
    bodyFat: "17%",
    chest: "106cm",
    waist: "88cm",
    arms: "39cm",
    legs: "61cm"
  });

  const handleUpdateMeasurements = (data: any) => {
    setMeasurements(data);
    toast({
      title: "Measurements Updated",
      description: "Your body measurements have been successfully updated."
    });
  };

  const handleViewWorkoutDetails = (workout: any) => {
    setCurrentWorkout(workout);
    setIsWorkoutDetailsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <ProgressChart />
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Fitness Tracker</CardTitle>
          </div>
          <CardDescription>Track your fitness records, goals, and body assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="records" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="records">Records</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
              <TabsTrigger value="workouts">Workout History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="records">
              <div className="flex justify-end mb-4">
                <Button 
                  onClick={() => setIsAddRecordModalOpen(true)} 
                  className="bg-neogym-red hover:bg-neogym-red/90"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Record
                </Button>
              </div>
              
              <div className="rounded-md border">
                <div className="grid grid-cols-6 font-medium text-sm p-3 border-b bg-gray-50">
                  <div>Exercise</div>
                  <div>Weight</div>
                  <div>Reps</div>
                  <div>Sets</div>
                  <div>Date</div>
                  <div className="text-right">Actions</div>
                </div>
                {recordsData.map(record => (
                  <div key={record.id} className="grid grid-cols-6 p-3 text-sm border-b last:border-b-0">
                    <div>{record.exercise}</div>
                    <div>{record.weight}</div>
                    <div>{record.reps}</div>
                    <div>{record.sets}</div>
                    <div>{record.date}</div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="goals">
              <div className="flex justify-end mb-4">
                <Button 
                  onClick={() => setIsAddGoalModalOpen(true)} 
                  className="bg-neogym-red hover:bg-neogym-red/90"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Goal
                </Button>
              </div>
              
              <div className="space-y-4">
                {goalsData.map(goal => (
                  <div key={goal.id} className="rounded-md border p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{goal.title}</h4>
                        <p className="text-sm text-gray-500">Target: {goal.target} • Category: {goal.category}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm mb-1">Deadline: {goal.deadline}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-neogym-red h-2.5 rounded-full" 
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-right mt-1">{goal.progress}%</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="assessments">
              <div className="flex justify-between mb-4">
                <Button 
                  onClick={() => setIsUpdateMeasurementsModalOpen(true)} 
                  variant="outline"
                  className="border-neogym-red text-neogym-red hover:bg-neogym-red/10"
                >
                  <Edit className="mr-2 h-4 w-4" /> Update Measurements
                </Button>
                <Button 
                  onClick={() => setIsAddAssessmentModalOpen(true)} 
                  className="bg-neogym-red hover:bg-neogym-red/90"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Assessment
                </Button>
              </div>
              
              <div className="mb-6 p-4 border rounded-md bg-gray-50">
                <h3 className="text-sm font-medium mb-3">Current Measurements</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Weight</p>
                    <p className="font-medium">{measurements.weight}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Body Fat</p>
                    <p className="font-medium">{measurements.bodyFat}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Chest</p>
                    <p className="font-medium">{measurements.chest}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Waist</p>
                    <p className="font-medium">{measurements.waist}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Arms</p>
                    <p className="font-medium">{measurements.arms}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Legs</p>
                    <p className="font-medium">{measurements.legs}</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md border">
                <div className="grid grid-cols-5 font-medium text-sm p-3 border-b bg-gray-50">
                  <div>Date</div>
                  <div>Weight</div>
                  <div>Body Fat</div>
                  <div>Measurements</div>
                  <div className="text-right">Actions</div>
                </div>
                {assessmentsData.map(assessment => (
                  <div key={assessment.id} className="grid grid-cols-5 p-3 text-sm border-b last:border-b-0">
                    <div>{assessment.date}</div>
                    <div>{assessment.weight}</div>
                    <div>{assessment.bodyFat}</div>
                    <div>
                      <span className="text-xs inline-block px-2 py-1 bg-gray-100 rounded mr-1 mb-1">
                        Chest: {assessment.measurements.chest}
                      </span>
                      <span className="text-xs inline-block px-2 py-1 bg-gray-100 rounded mr-1 mb-1">
                        Waist: {assessment.measurements.waist}
                      </span>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="workouts">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 font-medium text-sm p-3 border-b bg-gray-50">
                  <div>Date</div>
                  <div>Workout</div>
                  <div>Duration</div>
                  <div>Calories</div>
                  <div className="text-right">Actions</div>
                </div>
                {workoutHistoryData.map(workout => (
                  <div key={workout.id} className="grid grid-cols-5 p-3 text-sm border-b last:border-b-0">
                    <div>{workout.date}</div>
                    <div>{workout.title}</div>
                    <div>{workout.duration}</div>
                    <div>{workout.caloriesBurned} kcal</div>
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => handleViewWorkoutDetails(workout)}
                      >
                        <FileText className="h-4 w-4" />
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <AddRecordModal 
        open={isAddRecordModalOpen} 
        onOpenChange={setIsAddRecordModalOpen} 
      />
      
      <AddGoalModal 
        open={isAddGoalModalOpen} 
        onOpenChange={setIsAddGoalModalOpen} 
      />
      
      <AddAssessmentModal 
        open={isAddAssessmentModalOpen} 
        onOpenChange={setIsAddAssessmentModalOpen} 
      />
      
      <UpdateMeasurementsModal
        open={isUpdateMeasurementsModalOpen}
        onOpenChange={setIsUpdateMeasurementsModalOpen}
        initialData={measurements}
        onSave={handleUpdateMeasurements}
      />
      
      <WorkoutDetailsModal
        open={isWorkoutDetailsModalOpen}
        onOpenChange={setIsWorkoutDetailsModalOpen}
        workout={currentWorkout}
      />
    </div>
  );
};

export default FitnessTab;
