
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface Measurements {
  weight: string;
  bodyFat: string;
  chest: string;
  waist: string;
  arms: string;
  legs: string;
}

interface UpdateMeasurementsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: Measurements;
  onSave: (data: Measurements) => void;
}

const UpdateMeasurementsModal = ({ 
  open, 
  onOpenChange, 
  initialData, 
  onSave 
}: UpdateMeasurementsModalProps) => {
  const { toast } = useToast();
  const form = useForm<Measurements>({
    defaultValues: initialData
  });

  const onSubmit = (data: Measurements) => {
    onSave(data);
    toast({
      title: "Measurements Updated",
      description: "Your body measurements have been successfully updated.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Body Measurements</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bodyFat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body Fat (%)</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="chest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chest (cm)</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="waist"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waist (cm)</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="arms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Arms (cm)</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="legs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Legs (cm)</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="bg-neogym-red hover:bg-neogym-red/90">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMeasurementsModal;
