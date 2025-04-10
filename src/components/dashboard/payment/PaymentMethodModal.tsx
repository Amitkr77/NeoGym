
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { CreditCard, Check } from "lucide-react";

interface PaymentMethodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaymentSuccess: () => void;
  amount: number;
  planType: string;
}

const PaymentMethodModal = ({ open, onOpenChange, onPaymentSuccess, amount, planType }: PaymentMethodModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success'>('form');
  
  const form = useForm({
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      nameOnCard: "",
      paymentMethod: "credit_card"
    },
  });

  const onSubmit = (data: any) => {
    setIsProcessing(true);
    setPaymentStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep('success');
      
      // Simulate success after showing confirmation
      setTimeout(() => {
        onPaymentSuccess();
        setPaymentStep('form');
        form.reset();
        setIsProcessing(false);
      }, 1500);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {paymentStep === 'form' && 'Make a Payment'}
            {paymentStep === 'processing' && 'Processing Payment...'}
            {paymentStep === 'success' && 'Payment Successful!'}
          </DialogTitle>
        </DialogHeader>

        {paymentStep === 'form' && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="text-sm font-medium">Payment Details</p>
                <p className="text-sm text-gray-500">Plan: {planType}</p>
                <p className="text-lg font-bold mt-1">${amount.toFixed(2)}</p>
              </div>

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="credit_card">Credit Card</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch('paymentMethod') === 'credit_card' && (
                <>
                  <FormField
                    control={form.control}
                    name="nameOnCard"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name on Card</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="John Doe" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="**** **** **** ****" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="MM/YY" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="***" type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-neogym-red hover:bg-neogym-red/90">
                  Pay ${amount.toFixed(2)}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}

        {paymentStep === 'processing' && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neogym-red mb-4"></div>
            <p className="text-sm text-gray-500">Processing your payment. Please wait...</p>
          </div>
        )}

        {paymentStep === 'success' && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <p className="font-medium mb-2">Payment Completed Successfully!</p>
            <p className="text-sm text-gray-500 text-center">
              Your payment of ${amount.toFixed(2)} for {planType} has been processed.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodModal;
