
import React from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const FloatingHomeButton = () => {
  const navigate = useNavigate();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => navigate("/")}
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-neogym-red hover:bg-neogym-red/90 shadow-lg flex items-center justify-center"
            aria-label="Go to home page"
          >
            <Home className="h-5 w-5 text-white" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Go to home page</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FloatingHomeButton;
