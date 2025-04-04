
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import Layout from '../components/Layout';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Success",
        description: "Password reset instructions sent to your email",
      });
    }, 1500);
  };

  return (
    <Layout>
      <section className="py-16 min-h-[calc(100vh-64px)] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <motion.div 
              className="bg-white rounded-lg shadow-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/login" className="flex items-center text-neogym-red hover:underline mb-6">
                <ArrowLeft size={16} className="mr-1" /> Back to Login
              </Link>
              
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
                <p className="text-gray-600">
                  {!isSubmitted 
                    ? "Enter your email and we'll send you instructions to reset your password" 
                    : "Check your email for password reset instructions"}
                </p>
              </div>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email" 
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-neogym-red hover:bg-neogym-red/90 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Reset Password"}
                  </Button>
                </form>
              ) : (
                <div className="text-center">
                  <div className="mb-6 mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-6">
                    We've sent password reset instructions to:<br />
                    <span className="font-medium">{email}</span>
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                  >
                    Send to a different email
                  </Button>
                </div>
              )}
              
              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Remember your password?{" "}
                  <Link to="/login" className="text-neogym-red hover:underline">
                    Back to Sign In
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ForgotPassword;
