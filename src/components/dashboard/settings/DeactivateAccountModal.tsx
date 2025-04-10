import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"; // Ensure the import path is correct
import { Button } from "@/components/ui/button"; // Assuming the Button component is from this path

interface DeactivateAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeactivateAccountModal = ({ open, onOpenChange }: DeactivateAccountModalProps) => {
  const handleDeactivateAccount = () => {
    // Add your deactivation logic here (e.g., API call to deactivate the account)
    console.log("Account deactivated!");
    onOpenChange(false); // Close the modal after the action
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action will deactivate your account, suspend your membership, and hide your profile.
            You can reactivate by logging back in within 30 days. After 30 days, your account may
            be permanently deleted.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={handleDeactivateAccount}
          >
            Yes, Deactivate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeactivateAccountModal;
