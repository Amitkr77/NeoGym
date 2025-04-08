
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Lock, Mail, User, Phone, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import Layout from '../components/Layout';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const SignUp = () => {
  const [step, setStep] = useState<'account' | 'subscription' | 'payment'>('account');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'elite' | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 29.99,
      features: ['Gym access (6 AM - 10 PM)', 'Basic fitness equipment', 'Locker access']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 49.99,
      features: ['24/7 gym access', 'All fitness equipment', 'Group classes', 'Personal training discount']
    },
    {
      id: 'elite',
      name: 'Elite',
      price: 79.99,
      features: ['24/7 gym access', 'All premium features', '2 free PT sessions/month', 'Spa & pool access', 'Guest passes']
    }
  ];

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (!agreedToTerms) {
      toast({
        title: "Error",
        description: "You must agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }
    
    setStep('subscription');
  };

  const handleSubscriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlan) {
      toast({
        title: "Error",
        description: "Please select a membership plan",
        variant: "destructive",
      });
      return;
    }
    
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      localStorage.setItem('auth_token', 'user-token-' + Date.now());
      localStorage.setItem('user_role', 'user');
      
      toast({
        title: "Success",
        description: "Your account has been created successfully",
      });
      navigate('/dashboard');
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              className="bg-white rounded-lg shadow-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step === 'account' || step === 'subscription' || step === 'payment' ? 'bg-neogym-red text-white' : 'bg-gray-200'}`}>
                      1
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium">Account</p>
                    </div>
                  </div>
                  <div className="flex-1 h-1 mx-4 bg-gray-200">
                    <div className={`h-full ${step === 'subscription' || step === 'payment' ? 'bg-neogym-red' : 'bg-gray-200'}`} style={{ width: '100%' }} />
                  </div>
                  <div className="flex items-center">
                    <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step === 'subscription' || step === 'payment' ? 'bg-neogym-red text-white' : 'bg-gray-200'}`}>
                      2
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium">Subscription</p>
                    </div>
                  </div>
                  <div className="flex-1 h-1 mx-4 bg-gray-200">
                    <div className={`h-full ${step === 'payment' ? 'bg-neogym-red' : 'bg-gray-200'}`} style={{ width: '100%' }} />
                  </div>
                  <div className="flex items-center">
                    <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step === 'payment' ? 'bg-neogym-red text-white' : 'bg-gray-200'}`}>
                      3
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium">Payment</p>
                    </div>
                  </div>
                </div>
              </div>

              {step === 'account' && (
                <>
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
                    <p className="text-gray-600">Join NeoGym to start your fitness journey</p>
                  </div>
                  
                  <form onSubmit={handleAccountSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input 
                          id="fullName" 
                          placeholder="Enter your full name" 
                          className="pl-10"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
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
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input 
                          id="phone" 
                          type="tel" 
                          placeholder="Enter your phone number" 
                          className="pl-10"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input 
                          id="password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Create a password" 
                          className="pl-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Password must be at least 8 characters long with numbers and letters
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input 
                          id="confirmPassword" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Confirm your password" 
                          className="pl-10"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                        className="mt-1"
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm text-gray-600"
                      >
                        I agree to the{" "}
                        <Link to="/terms" className="text-neogym-red hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy-policy" className="text-neogym-red hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-neogym-red hover:bg-neogym-red/90 text-white"
                    >
                      Continue <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                    
                    <div className="text-center mt-6">
                      <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-neogym-red hover:underline">
                          Sign In
                        </Link>
                      </p>
                    </div>
                  </form>
                </>
              )}

              {step === 'subscription' && (
                <>
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Choose Your Membership</h1>
                    <p className="text-gray-600">Select the plan that fits your fitness goals</p>
                  </div>
                  
                  <form onSubmit={handleSubscriptionSubmit} className="space-y-6">
                    <RadioGroup value={selectedPlan || ''} onValueChange={(value) => setSelectedPlan(value as any)}>
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                        {plans.map((plan) => (
                          <div 
                            key={plan.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedPlan === plan.id ? 'border-neogym-red shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                            onClick={() => setSelectedPlan(plan.id as any)}
                          >
                            <div className="flex items-start mb-4">
                              <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                              <div className="ml-2">
                                <Label htmlFor={plan.id} className="text-xl font-bold block">{plan.name}</Label>
                                <p className="text-2xl font-bold text-neogym-red">${plan.price}<span className="text-sm text-gray-500">/month</span></p>
                              </div>
                            </div>
                            <ul className="space-y-2 ml-6 list-disc text-gray-600">
                              {plan.features.map((feature, idx) => (
                                <li key={idx}>{feature}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                    
                    <div className="flex justify-between pt-4">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setStep('account')}
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-neogym-red hover:bg-neogym-red/90 text-white"
                      >
                        Continue to Payment <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </>
              )}

              {step === 'payment' && (
                <>
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Payment Information</h1>
                    <p className="text-gray-600">Complete your membership purchase</p>
                  </div>
                  
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h2 className="font-bold text-lg mb-2">Order Summary</h2>
                      <div className="flex justify-between mb-2">
                        <span>{plans.find(p => p.id === selectedPlan)?.name} Membership</span>
                        <span>${plans.find(p => p.id === selectedPlan)?.price}/month</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 border-t">
                        <span>Total</span>
                        <span>${plans.find(p => p.id === selectedPlan)?.price}/month</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input 
                        id="cardName" 
                        placeholder="Enter name on card" 
                        defaultValue={fullName}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        placeholder="1234 5678 9012 3456" 
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input 
                          id="expiry" 
                          placeholder="MM/YY" 
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv" 
                          placeholder="123" 
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="autoRenew" 
                        defaultChecked
                        className="mt-1"
                      />
                      <label
                        htmlFor="autoRenew"
                        className="text-sm text-gray-600"
                      >
                        I understand this is a recurring monthly subscription and will be automatically renewed
                      </label>
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setStep('subscription')}
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-neogym-red hover:bg-neogym-red/90 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Complete Purchase"}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SignUp;
