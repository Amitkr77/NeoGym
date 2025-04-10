
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dumbbell, Clock, Flame, Medal } from "lucide-react";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: string;
}

interface WorkoutDetails {
  id: number;
  date: string;
  title: string;
  duration: string;
  caloriesBurned: number;
  intensity: string;
  exercises: Exercise[];
}

interface WorkoutDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workout: WorkoutDetails | null;
}

const WorkoutDetailsModal = ({ open, onOpenChange, workout }: WorkoutDetailsModalProps) => {
  if (!workout) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Workout Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold">{workout.title}</h3>
            <p className="text-sm text-gray-500">{workout.date}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 p-3 rounded-md flex flex-col items-center">
              <Clock className="h-5 w-5 text-gray-600 mb-1" />
              <span className="text-sm font-medium">Duration</span>
              <span className="text-sm">{workout.duration}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-md flex flex-col items-center">
              <Flame className="h-5 w-5 text-neogym-red mb-1" />
              <span className="text-sm font-medium">Calories</span>
              <span className="text-sm">{workout.caloriesBurned}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-md flex flex-col items-center">
              <Medal className="h-5 w-5 text-amber-500 mb-1" />
              <span className="text-sm font-medium">Intensity</span>
              <span className="text-sm">{workout.intensity}</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Exercises</h4>
            <div className="rounded-md border">
              <div className="grid grid-cols-4 font-medium text-sm p-3 border-b bg-gray-50">
                <div>Exercise</div>
                <div>Sets</div>
                <div>Reps</div>
                <div>Weight</div>
              </div>
              {workout.exercises.map((exercise, index) => (
                <div key={index} className="grid grid-cols-4 p-3 text-sm border-b last:border-b-0">
                  <div className="flex items-center">
                    <Dumbbell className="h-4 w-4 mr-2 text-gray-500" />
                    {exercise.name}
                  </div>
                  <div>{exercise.sets}</div>
                  <div>{exercise.reps}</div>
                  <div>{exercise.weight}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkoutDetailsModal;
