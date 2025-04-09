
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CurrencySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const currencies = [
  { value: "usd", label: "USD - $", symbol: "$" },
  { value: "eur", label: "EUR - €", symbol: "€" },
  { value: "gbp", label: "GBP - £", symbol: "£" },
  { value: "inr", label: "INR - ₹", symbol: "₹" },
  { value: "jpy", label: "JPY - ¥", symbol: "¥" },
];

const CurrencySelector = ({ value, onChange }: CurrencySelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Select Currency" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.value} value={currency.value}>
            {currency.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;
