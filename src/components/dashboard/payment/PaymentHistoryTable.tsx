
import React from "react";
import { Badge } from "@/components/ui/badge";

interface Payment {
  id: number;
  date: string;
  amount: number;
  method: string;
  status: string;
}

interface PaymentHistoryTableProps {
  payments: Payment[];
}

const PaymentHistoryTable = ({ payments }: PaymentHistoryTableProps) => {
  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-4 font-medium text-sm p-3 border-b bg-gray-50">
        <div>Date</div>
        <div>Amount</div>
        <div>Method</div>
        <div>Status</div>
      </div>
      {payments.length > 0 ? (
        payments.map((payment) => (
          <div key={payment.id} className="grid grid-cols-4 p-3 text-sm border-b last:border-b-0">
            <div>{payment.date}</div>
            <div>${payment.amount.toFixed(2)}</div>
            <div>{payment.method}</div>
            <div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {payment.status}
              </Badge>
            </div>
          </div>
        ))
      ) : (
        <div className="p-3 text-sm text-center text-gray-500">No payment history available</div>
      )}
    </div>
  );
};

export default PaymentHistoryTable;
