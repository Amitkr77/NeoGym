
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CreditCard, UserCheck } from "lucide-react";

interface MembershipDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  membershipData: {
    plan: string;
    startDate: string;
    endDate: string;
    status: "active" | "expired" | "pending";
    autoRenew: boolean;
    price: number;
    currency: string;
    features: string[];
  };
}

const MembershipDetailsModal = ({
  open,
  onOpenChange,
  membershipData,
}: MembershipDetailsModalProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500 hover:bg-green-600";
      case "expired":
        return "bg-red-500 hover:bg-red-600";
      case "pending":
        return "bg-yellow-500 hover:bg-yellow-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const getCurrencySymbol = (currency: string) => {
    switch (currency.toLowerCase()) {
      case "usd":
        return "$";
      case "eur":
        return "€";
      case "gbp":
        return "£";
      case "inr":
        return "₹";
      case "jpy":
        return "¥";
      default:
        return currency;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-neogym-dark">
            Membership Details
          </DialogTitle>
          <DialogDescription>
            View your current membership information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-neogym-dark">
              {membershipData.plan}
            </h3>
            <Badge className={getBadgeColor(membershipData.status)}>
              {membershipData.status.charAt(0).toUpperCase() +
                membershipData.status.slice(1)}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-gray-500">Start Date</span>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-neogym-red" />
                <span>{formatDate(membershipData.startDate)}</span>
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-sm text-gray-500">End Date</span>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-neogym-red" />
                <span>{formatDate(membershipData.endDate)}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <div className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-neogym-red" />
              <span className="text-gray-700">
                {getCurrencySymbol(membershipData.currency)}
                {membershipData.price} / month
              </span>
            </div>
            <div className="flex items-center">
              <UserCheck className="h-4 w-4 mr-2 text-neogym-red" />
              <span className="text-gray-700">
                Auto-renew: {membershipData.autoRenew ? "Yes" : "No"}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-200">
            <h4 className="font-semibold mb-2">Included Features:</h4>
            <ul className="space-y-1">
              {membershipData.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-neogym-red mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="border-neogym-gray text-neogym-dark"
              >
                Close
              </Button>
            </DialogClose>
            {membershipData.status === "active" && (
              <Button className="bg-neogym-red hover:bg-neogym-red/90 text-white">
                Manage Plan
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MembershipDetailsModal;
