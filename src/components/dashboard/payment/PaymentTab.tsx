
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, DollarSign, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PaymentHistoryTable from "./PaymentHistoryTable";
import PaymentMethodModal from "./PaymentMethodModal";

const upcomingPayment = {
  date: "2023-05-15",
  amount: 49.99,
  planType: "Premium Membership",
};

const PaymentTab = () => {
  const { toast } = useToast();
  const [paymentHistory, setPaymentHistory] = useState([
    { id: 1, date: "2023-04-15", amount: 49.99, method: "Credit Card", status: "Paid" },
    { id: 2, date: "2023-03-15", amount: 49.99, method: "PayPal", status: "Paid" },
    { id: 3, date: "2023-02-15", amount: 49.99, method: "Credit Card", status: "Paid" },
  ]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [nextPaymentDate, setNextPaymentDate] = useState("2023-05-15");

  const handlePaymentSuccess = () => {
    // Add current payment to history
    const newPayment = {
      id: paymentHistory.length + 1,
      date: new Date().toISOString().split("T")[0],
      amount: upcomingPayment.amount,
      method: "Credit Card", // This would come from the payment method selected
      status: "Paid",
    };
    
    setPaymentHistory([newPayment, ...paymentHistory]);
    
    // Update next payment date (add one month)
    const nextDate = new Date();
    nextDate.setMonth(nextDate.getMonth() + 1);
    const formattedNextDate = nextDate.toISOString().split("T")[0];
    setNextPaymentDate(formattedNextDate);
    
    // Show success message
    toast({
      title: "Payment Successful",
      description: `Your payment of $${upcomingPayment.amount} for ${upcomingPayment.planType} has been processed.`,
    });
    
    // Close modal
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Payment</CardTitle>
          <CardDescription>Your next payment is due soon</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium">Due Date: {nextPaymentDate}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium">Amount: ${upcomingPayment.amount}</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium">Plan: {upcomingPayment.planType}</span>
              </div>
            </div>
            <Button 
              onClick={() => setIsPaymentModalOpen(true)}
              className="bg-neogym-red hover:bg-neogym-red/90"
            >
              Pay Now
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Your previous payments</CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentHistoryTable payments={paymentHistory} />
        </CardContent>
      </Card>

      <PaymentMethodModal 
        open={isPaymentModalOpen} 
        onOpenChange={setIsPaymentModalOpen}
        onPaymentSuccess={handlePaymentSuccess}
        amount={upcomingPayment.amount}
        planType={upcomingPayment.planType}
      />
    </div>
  );
};

export default PaymentTab;
