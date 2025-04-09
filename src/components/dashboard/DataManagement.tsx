
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Trash2 } from "lucide-react";

const DataManagement = () => {
  const [exportLoading, setExportLoading] = useState(false);

  const handleExportData = () => {
    setExportLoading(true);
    
    // Simulate API call to export data
    setTimeout(() => {
      // In a real application, this would generate a file for download
      
      // Create dummy data for demonstration
      const userData = {
        personalInfo: {
          name: "John Doe",
          email: "john@example.com",
          joined: "2023-01-15",
        },
        membership: {
          plan: "Premium",
          status: "Active",
          startDate: "2023-01-15",
          endDate: "2024-01-15",
        },
        workoutHistory: [
          { date: "2023-06-01", type: "Strength", duration: 45 },
          { date: "2023-06-03", type: "Cardio", duration: 30 },
          { date: "2023-06-05", type: "Yoga", duration: 60 },
        ],
        paymentHistory: [
          { date: "2023-05-15", amount: 49.99, status: "Completed" },
          { date: "2023-04-15", amount: 49.99, status: "Completed" },
          { date: "2023-03-15", amount: 49.99, status: "Completed" },
        ],
      };
      
      // Convert to JSON string
      const dataStr = JSON.stringify(userData, null, 2);
      
      // Create a download link
      const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
      const exportFileDefaultName = "neogym-user-data.json";
      
      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
      
      setExportLoading(false);
    }, 1500);
  };

  const handleDeactivateAccount = () => {
    // In a real application, this would call an API to deactivate the account
    alert("Account deactivation request submitted. You will receive a confirmation email.");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="h-5 w-5 mr-2 text-neogym-red" />
            Export Your Data
          </CardTitle>
          <CardDescription>
            Download a copy of your personal data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            You can download all your personal data in JSON format. This file will contain your profile information, membership details, workout history, and payment records.
          </p>
          <Button 
            onClick={handleExportData}
            disabled={exportLoading}
            className="bg-neogym-red hover:bg-neogym-red/90"
          >
            {exportLoading ? "Preparing Download..." : "Export Data"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-red-600">
            <Trash2 className="h-5 w-5 mr-2" />
            Deactivate Account
          </CardTitle>
          <CardDescription>
            Temporarily deactivate your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Deactivating your account will suspend your membership and hide your profile. You can reactivate at any time by logging back in.
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                Deactivate Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will deactivate your account, suspend your membership, and hide your profile. You can reactivate by logging back in within 30 days. After 30 days, your account may be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeactivateAccount}>
                  Yes, Deactivate
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataManagement;
