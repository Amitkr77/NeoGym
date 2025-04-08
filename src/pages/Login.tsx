
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import Layout from '../components/Layout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginType, setLoginType] = useState<'member' | 'admin'>('member');
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check if type=admin in URL
    const type = searchParams.get('type');
    if (type === 'admin') {
      setLoginType('admin');
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (loginType === 'admin') {
        // Admin login credentials
        if (email === 'admin@example.com' && password === 'admin') {
          localStorage.setItem('auth_token', 'admin-token-123');
          localStorage.setItem('user_role', 'admin');
          toast({
            title: "Success",
            description: "Logged in as admin successfully",
          });
          navigate('/admin');
        } else {
          toast({
            title: "Error",
            description: "Invalid admin credentials",
            variant: "destructive",
          });
        }
      } else {
        // Member login credentials
        if (email === 'user@example.com' && password === 'password') {
          localStorage.setItem('auth_token', 'user-token-123');
          localStorage.setItem('user_role', 'user');
          toast({
            title: "Success",
            description: "Logged in successfully",
          });
          navigate('/dashboard');
        } else {
          toast({
            title: "Error",
            description: "Invalid email or password",
            variant: "destructive",
          });
        }
      }
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">
                  {loginType === 'admin' ? 'Admin Login' : 'Member Login'}
                </h1>
                <p className="text-gray-600">
                  {loginType === 'admin' 
                    ? 'Sign in to access the admin dashboard' 
                    : 'Sign in to access your member dashboard'}
                </p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-6">
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
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-neogym-red hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter your password" 
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
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-neogym-red hover:bg-neogym-red/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
                
                {loginType === 'member' && (
                  <div className="text-center mt-6">
                    <p className="text-gray-600">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-neogym-red hover:underline">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                )}
                
                <div className="text-center mt-2">
                  <p className="text-gray-600">
                    {loginType === 'admin' 
                      ? "Need to access member login?" 
                      : "Need to access admin panel?"}
                    {" "}
                    <Link 
                      to={loginType === 'admin' ? "/login" : "/login?type=admin"} 
                      className="text-neogym-red hover:underline"
                    >
                      {loginType === 'admin' ? "Member Login" : "Admin Login"}
                    </Link>
                  </p>
                </div>
              </form>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-center text-gray-500 text-sm mb-4">Demo Accounts:</p>
                <div className="space-y-2 text-sm text-gray-600">
                  {loginType === 'member' ? (
                    <p>Member: user@example.com / password</p>
                  ) : (
                    <p>Admin: admin@example.com / admin</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
