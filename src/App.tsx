
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* These routes will be implemented in the future */}
          <Route path="/about" element={<NotFound />} />
          <Route path="/facilities" element={<NotFound />} />
          <Route path="/pricing" element={<NotFound />} />
          <Route path="/blog" element={<NotFound />} />
          <Route path="/reviews" element={<NotFound />} />
          <Route path="/contact" element={<NotFound />} />
          <Route path="/member-login" element={<NotFound />} />
          <Route path="/admin-login" element={<NotFound />} />
          <Route path="/terms" element={<NotFound />} />
          <Route path="/privacy" element={<NotFound />} />
          <Route path="/sitemap" element={<NotFound />} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
