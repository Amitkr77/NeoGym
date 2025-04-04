
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Calendar,
  CreditCard,
  Home,
  LogOut,
  Settings,
  User,
  Menu,
  X,
  Bell,
  ChevronRight,
  Dumbbell,
  Activity,
  Clock,
  Flame,
  Award,
  Plus,
  Trash2,
  Check,
  Edit,
  FileText,
  Lock,
  Mail,
  Phone,
  MapPin,
  CalendarRange,
  ArrowRight,
  ArrowLeft,
  ListFilter,
  FileLineChart,
  CreditCard as CreditCardIcon,
  History,
  Heart,
  ExternalLink,
  Shield,
  UserCog,
  BellRing,
  Smartphone,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const userData = {
  name: "John Doe",
  email: "johndoe@example.com",
  membership: "Premium",
  joinDate: "January 15, 2024",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  stats: {
    workoutsCompleted: 24,
    totalHours: 32,
    caloriesBurned: 12580,
    achievements: 5
  },
  goals: {
    weight: {
      current: 85,
      target: 75,
      unit: "kg",
      progress: 40
    },
    workoutsPerWeek: {
      current: 3,
      target: 4,
      progress: 75
    },
    cardio: {
      current: 2,
      target: 3,
      unit: "hours",
      progress: 66
    }
  },
  upcomingClasses: [
    {
      id: 1,
      name: "HIIT Training",
      instructor: "Sarah Williams",
      time: "Tomorrow, 10:00 AM",
      duration: "45 min"
    },
    {
      id: 2,
      name: "Yoga Flow",
      instructor: "Michael Chen",
      time: "Wednesday, 6:00 PM",
      duration: "60 min"
    }
  ],
  workoutHistory: [
    {
      date: "April 1, 2025",
      type: "Strength Training",
      duration: "1h 15m",
      caloriesBurned: 450
    },
    {
      date: "March 30, 2025",
      type: "Cardio",
      duration: "45m",
      caloriesBurned: 320
    },
    {
      date: "March 28, 2025",
      type: "Full Body",
      duration: "1h",
      caloriesBurned: 380
    }
  ],
  notifications: [
    {
      id: 1,
      message: "New HIIT class added to the schedule",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      message: "Your membership will renew in 7 days",
      time: "1 day ago",
      read: true
    },
    {
      id: 3,
      message: "Congratulations on completing 20 workouts!",
      time: "3 days ago",
      read: true
    }
  ],
  profile: {
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "05/12/1990",
    phoneNumber: "+1 (555) 123-4567",
    address: "123 Fitness Street, Workout City, 10001",
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543"
    },
    healthInfo: {
      height: 180,
      weight: 85,
      medicalConditions: "None",
      allergies: "None"
    }
  },
  paymentInfo: {
    cards: [
      {
        id: 1,
        type: "Visa",
        lastFour: "4242",
        expiry: "04/28",
        isDefault: true
      },
      {
        id: 2,
        type: "Mastercard",
        lastFour: "5555",
        expiry: "09/26",
        isDefault: false
      }
    ],
    billingHistory: [
      {
        id: 1,
        date: "April 1, 2025",
        description: "Monthly Membership Fee",
        amount: 49.99,
        status: "Paid"
      },
      {
        id: 2,
        date: "March 1, 2025",
        description: "Monthly Membership Fee",
        amount: 49.99,
        status: "Paid"
      },
      {
        id: 3,
        date: "February 1, 2025",
        description: "Monthly Membership Fee",
        amount: 49.99,
        status: "Paid"
      }
    ],
    nextPayment: {
      date: "May 1, 2025",
      amount: 49.99
    }
  },
  fitnessProgress: {
    weights: [
      { date: "January", value: 89 },
      { date: "February", value: 87 },
      { date: "March", value: 86 },
      { date: "April", value: 85 }
    ],
    measurements: {
      chest: 102,
      waist: 88,
      hips: 95,
      biceps: 33,
      thighs: 58
    },
    personalRecords: [
      { exercise: "Bench Press", weight: "90kg", date: "March 15, 2025" },
      { exercise: "Squat", weight: "120kg", date: "March 22, 2025" },
      { exercise: "Deadlift", weight: "140kg", date: "April 1, 2025" }
    ],
    fitnessAssessments: [
      { 
        date: "January 15, 2025", 
        results: {
          cardio: "Good",
          strength: "Average",
          flexibility: "Needs Improvement"
        }
      },
      { 
        date: "April 1, 2025", 
        results: {
          cardio: "Very Good",
          strength: "Good",
          flexibility: "Average"
        }
      }
    ]
  },
  availableClasses: [
    {
      id: 1,
      name: "HIIT Training",
      instructor: "Sarah Williams",
      day: "Monday",
      time: "10:00 AM",
      duration: "45 min",
      level: "Intermediate",
      spots: 8
    },
    {
      id: 2,
      name: "Yoga Flow",
      instructor: "Michael Chen",
      day: "Wednesday",
      time: "6:00 PM",
      duration: "60 min",
      level: "All Levels",
      spots: 12
    },
    {
      id: 3,
      name: "Spin Class",
      instructor: "Kara Johnson",
      day: "Tuesday",
      time: "5:30 PM",
      duration: "45 min",
      level: "Intermediate",
      spots: 15
    },
    {
      id: 4,
      name: "Power Lifting",
      instructor: "Alex Davis",
      day: "Thursday",
      time: "7:00 PM",
      duration: "60 min",
      level: "Advanced",
      spots: 6
    },
    {
      id: 5,
      name: "Pilates",
      instructor: "Claudia Martinez",
      day: "Friday",
      time: "9:00 AM",
      duration: "50 min",
      level: "All Levels",
      spots: 10
    },
    {
      id: 6,
      name: "Body Pump",
      instructor: "James Wilson",
      day: "Saturday",
      time: "11:00 AM",
      duration: "50 min",
      level: "Intermediate",
      spots: 20
    }
  ]
};

const UserDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsData, setNotificationsData] = useState(userData.notifications);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out Successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };

  const markAllNotificationsAsRead = () => {
    const updatedNotifications = notificationsData.map(notification => ({
      ...notification,
      read: true
    }));
    setNotificationsData(updatedNotifications);
    toast({
      title: "Notifications Marked as Read",
      description: "All notifications have been marked as read.",
    });
  };

  const unreadCount = notificationsData.filter(n => !n.read).length;

  // Initial form data states for profile
  const [profileData, setProfileData] = useState(userData.profile);

  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState(userData.paymentInfo.cards);
  
  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    darkMode: false,
    twoFactorAuth: false,
    language: "english",
    currency: "usd"
  });

  // Schedule state - selected class
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);

  return (
    <div className="flex h-screen bg-gray-100">
      <motion.aside 
        className={`bg-neogym-dark text-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 fixed h-full z-10`}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 flex justify-between items-center">
          <h1 className={`font-bold text-xl ${!isSidebarOpen && 'hidden'}`}>
            <span className="text-neogym-red">NEO</span>GYM
          </h1>
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-700"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: Home },
              { id: 'profile', name: 'My Profile', icon: User },
              { id: 'schedule', name: 'Class Schedule', icon: Calendar },
              { id: 'progress', name: 'Fitness Progress', icon: BarChart3 },
              { id: 'payments', name: 'Payments', icon: CreditCard },
              { id: 'settings', name: 'Settings', icon: Settings },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center py-2 px-4 rounded-md w-full ${
                    activeTab === item.id 
                      ? 'bg-neogym-red text-white' 
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <item.icon size={20} />
                  {isSidebarOpen && <span className="ml-3">{item.name}</span>}
                </button>
              </li>
            ))}
            
            <li className="pt-6">
              <button
                onClick={handleLogout}
                className="flex items-center py-2 px-4 rounded-md w-full hover:bg-gray-700 text-red-400"
              >
                <LogOut size={20} />
                {isSidebarOpen && <span className="ml-3">Log Out</span>}
              </button>
            </li>
          </ul>
        </nav>
      </motion.aside>

      <main className={`flex-1 overflow-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-xl font-bold">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'profile' && 'My Profile'}
              {activeTab === 'schedule' && 'Class Schedule'}
              {activeTab === 'progress' && 'Fitness Progress'}
              {activeTab === 'payments' && 'Payments'}
              {activeTab === 'settings' && 'Settings'}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full hover:bg-gray-100 relative"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-neogym-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50">
                  <div className="p-3 border-b">
                    <h3 className="font-bold">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notificationsData.length === 0 ? (
                      <p className="p-4 text-center text-gray-500">No notifications</p>
                    ) : (
                      notificationsData.map((notification) => (
                        <div 
                          key={notification.id}
                          className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                        >
                          <p className="text-sm font-medium">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-2 text-center border-t">
                    <Button 
                      variant="link" 
                      className="text-neogym-red text-sm"
                      onClick={markAllNotificationsAsRead}
                    >
                      Mark all as read
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center">
              <img 
                src={userData.avatar}
                alt="User Avatar" 
                className="h-8 w-8 rounded-full"
              />
              <span className="ml-2 font-medium hidden md:block">{userData.name}</span>
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <motion.div
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Welcome back, {userData.name}!</h3>
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <p className="text-gray-600">
                    <span className="font-medium">Membership:</span> {userData.membership}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Member since:</span> {userData.joinDate}
                  </p>
                </div>
                <Button 
                  className="mt-4 md:mt-0 bg-neogym-red hover:bg-neogym-red/90 text-white"
                  onClick={() => setActiveTab('schedule')}
                >
                  Book a Class
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <motion.div 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <div className="flex items-center mb-2">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Dumbbell className="text-blue-500" size={20} />
                  </div>
                  <h4 className="font-bold">Workouts</h4>
                </div>
                <p className="text-3xl font-bold">{userData.stats.workoutsCompleted}</p>
                <p className="text-gray-600 text-sm">Completed workouts</p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <div className="flex items-center mb-2">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Clock className="text-green-500" size={20} />
                  </div>
                  <h4 className="font-bold">Hours</h4>
                </div>
                <p className="text-3xl font-bold">{userData.stats.totalHours}</p>
                <p className="text-gray-600 text-sm">Total training hours</p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <div className="flex items-center mb-2">
                  <div className="bg-red-100 p-3 rounded-full mr-4">
                    <Flame className="text-red-500" size={20} />
                  </div>
                  <h4 className="font-bold">Calories</h4>
                </div>
                <p className="text-3xl font-bold">{userData.stats.caloriesBurned.toLocaleString()}</p>
                <p className="text-gray-600 text-sm">Calories burned</p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <div className="flex items-center mb-2">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <Award className="text-purple-500" size={20} />
                  </div>
                  <h4 className="font-bold">Achievements</h4>
                </div>
                <p className="text-3xl font-bold">{userData.stats.achievements}</p>
                <p className="text-gray-600 text-sm">Completed achievements</p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Your Fitness Goals</h3>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('progress')}>
                    Update Goals
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <h4 className="font-medium">Weight Goal</h4>
                        <p className="text-sm text-gray-600">
                          Current: {userData.goals.weight.current} {userData.goals.weight.unit} / 
                          Target: {userData.goals.weight.target} {userData.goals.weight.unit}
                        </p>
                      </div>
                      <span className="text-sm font-medium">{userData.goals.weight.progress}%</span>
                    </div>
                    <Progress value={userData.goals.weight.progress} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <h4 className="font-medium">Weekly Workouts</h4>
                        <p className="text-sm text-gray-600">
                          Current: {userData.goals.workoutsPerWeek.current} / 
                          Target: {userData.goals.workoutsPerWeek.target} workouts
                        </p>
                      </div>
                      <span className="text-sm font-medium">{userData.goals.workoutsPerWeek.progress}%</span>
                    </div>
                    <Progress value={userData.goals.workoutsPerWeek.progress} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <h4 className="font-medium">Cardio per Week</h4>
                        <p className="text-sm text-gray-600">
                          Current: {userData.goals.cardio.current} {userData.goals.cardio.unit} / 
                          Target: {userData.goals.cardio.target} {userData.goals.cardio.unit}
                        </p>
                      </div>
                      <span className="text-sm font-medium">{userData.goals.cardio.progress}%</span>
                    </div>
                    <Progress value={userData.goals.cardio.progress} className="h-2" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4">Upcoming Classes</h3>
                
                {userData.upcomingClasses.length === 0 ? (
                  <p className="text-gray-500">No upcoming classes</p>
                ) : (
                  <div className="space-y-4">
                    {userData.upcomingClasses.map((cls) => (
                      <motion.div 
                        key={cls.id}
                        className="border rounded-md p-3 hover:border-neogym-red cursor-pointer"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <h4 className="font-medium">{cls.name}</h4>
                        <p className="text-sm text-gray-600">Instructor: {cls.instructor}</p>
                        <div className="flex justify-between mt-2 text-sm">
                          <span className="text-gray-600">{cls.time}</span>
                          <span className="text-gray-600">{cls.duration}</span>
                        </div>
                      </motion.div>
                    ))}
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-2"
                      onClick={() => setActiveTab('schedule')}
                    >
                      View All Classes
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Recent Workout History</h3>
                <Button 
                  variant="link" 
                  className="text-neogym-red"
                  onClick={() => setActiveTab('progress')}
                >
                  View All <ChevronRight size={16} />
                </Button>
              </div>
              
              {userData.workoutHistory.length === 0 ? (
                <p className="text-gray-500">No workout history</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workout Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calories</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userData.workoutHistory.map((workout, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{workout.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{workout.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{workout.duration}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{workout.caloriesBurned}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'profile' && (
          <motion.div
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="w-32 h-32 relative mb-4">
                      <img 
                        src={userData.avatar}
                        alt="User Avatar" 
                        className="w-full h-full rounded-full object-cover border-4 border-gray-200"
                      />
                      <Button 
                        size="sm" 
                        className="absolute bottom-0 right-0 rounded-full bg-neogym-red text-white hover:bg-neogym-red/90 h-8 w-8 p-0"
                      >
                        <Edit size={14} />
                      </Button>
                    </div>
                    <h3 className="text-xl font-bold">{userData.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{userData.email}</p>
                    
                    <div className="w-full space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Member Since</span>
                        <span>{userData.joinDate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Membership</span>
                        <span className="font-medium">{userData.membership}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Status</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View Membership Details</Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="md:col-span-2">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName" 
                            value={profileData.firstName}
                            onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName" 
                            value={profileData.lastName}
                            onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" value={userData.email} disabled />
                          <p className="text-sm text-gray-500">To change your email, please contact support</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            value={profileData.phoneNumber}
                            onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          value={profileData.address}
                          onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth">Date of Birth</Label>
                          <Input 
                            id="dateOfBirth" 
                            value={profileData.dateOfBirth}
                            onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                          />
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button 
                      className="bg-neogym-red hover:bg-neogym-red/90"
                      onClick={() => {
                        toast({
                          title: "Profile Updated",
                          description: "Your profile has been updated successfully."
                        });
                      }}
                    >
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Emergency Contact</CardTitle>
                    <CardDescription>Who should we contact in case of emergency</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergencyName">Contact Name</Label>
                          <Input 
                            id="emergencyName" 
                            value={profileData.emergencyContact.name}
                            onChange={(e) => setProfileData({
                              ...profileData, 
                              emergencyContact: {
                                ...profileData.emergencyContact,
                                name: e.target.value
                              }
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="relationship">Relationship</Label>
                          <Input 
                            id="relationship" 
                            value={profileData.emergencyContact.relationship}
                            onChange={(e) => setProfileData({
                              ...profileData, 
                              emergencyContact: {
                                ...profileData.emergencyContact,
                                relationship: e.target.value
                              }
                            })}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emergencyPhone">Phone Number</Label>
                        <Input 
                          id="emergencyPhone" 
                          value={profileData.emergencyContact.phone}
                          onChange={(e) => setProfileData({
                            ...profileData, 
                            emergencyContact: {
                              ...profileData.emergencyContact,
                              phone: e.target.value
                            }
                          })}
                        />
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button 
                      className="bg-neogym-red hover:bg-neogym-red/90"
                      onClick={() => {
                        toast({
                          title: "Emergency Contact Updated",
                          description: "Your emergency contact has been updated successfully."
                        });
                      }}
                    >
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Health Information</CardTitle>
                    <CardDescription>Important information for your workouts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="height">Height (cm)</Label>
                          <Input 
                            id="height" 
                            type="number" 
                            value={profileData.healthInfo.height}
                            onChange={(e) => setProfileData({
                              ...profileData, 
                              healthInfo: {
                                ...profileData.healthInfo,
                                height: parseInt(e.target.value)
                              }
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="weight">Weight (kg)</Label>
                          <Input 
                            id="weight" 
                            type="number" 
                            value={profileData.healthInfo.weight}
                            onChange={(e) => setProfileData({
                              ...profileData, 
                              healthInfo: {
                                ...profileData.healthInfo,
                                weight: parseInt(e.target.value)
                              }
                            })}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="medicalConditions">Medical Conditions</Label>
                        <Textarea 
                          id="medicalConditions" 
                          placeholder="List any medical conditions that our trainers should know about" 
                          value={profileData.healthInfo.medicalConditions}
                          onChange={(e) => setProfileData({
                            ...profileData, 
                            healthInfo: {
                              ...profileData.healthInfo,
                              medicalConditions: e.target.value
                            }
                          })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="allergies">Allergies</Label>
                        <Textarea 
                          id="allergies" 
                          placeholder="List any allergies" 
                          value={profileData.healthInfo.allergies}
                          onChange={(e) => setProfileData({
                            ...profileData, 
                            healthInfo: {
                              ...profileData.healthInfo,
                              allergies: e.target.value
                            }
                          })}
                        />
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button 
                      className="bg-neogym-red hover:bg-neogym-red/90"
                      onClick={() => {
                        toast({
                          title: "Health Information Updated",
                          description: "Your health information has been updated successfully."
                        });
                      }}
                    >
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'schedule' && (
          <motion.div
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Class Schedule</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <ListFilter size={16} className="mr-2" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <CalendarRange size={16} className="mr-2" />
                          Weekly View
                        </Button>
                      </div>
                    </div>
                    <CardDescription>Browse and book available classes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex overflow-x-auto pb-2 mb-4">
                        <div className="flex space-x-2">
                          {['All Classes', 'HIIT', 'Yoga', 'Spin', 'Strength', 'Cardio', 'Pilates'].map((category) => (
                            <Button 
                              key={category} 
                              variant={category === 'All Classes' ? 'default' : 'outline'} 
                              size="sm"
                              className={category === 'All Classes' ? 'bg-neogym-red hover:bg-neogym-red/90' : ''}
                            >
                              {category}
                            </Button>
                          ))}
                        </div>
                      </div>
                    
                      <div className="space-y-4">
                        {userData.availableClasses.map((cls) => (
                          <div 
                            key={cls.id} 
                            className={`border rounded-lg p-4 transition-all hover:shadow-md cursor-pointer ${selectedClassId === cls.id ? 'border-neogym-red bg-red-50' : ''}`}
                            onClick={() => setSelectedClassId(cls.id === selectedClassId ? null : cls.id)}
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                              <div>
                                <h4 className="font-bold text-lg">{cls.name}</h4>
                                <p className="text-gray-500">Instructor: {cls.instructor}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <div className="flex items-center text-sm text-gray-600">
                                    <Calendar size={14} className="mr-1" />
                                    <span>{cls.day}</span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <Clock size={14} className="mr-1" />
                                    <span>{cls.time} ({cls.duration})</span>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4 md:mt-0 flex flex-col items-end">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  cls.level === 'Advanced' ? 'bg-red-100 text-red-800' : 
                                  cls.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {cls.level}
                                </span>
                                <span className="text-sm text-gray-600 mt-2">{cls.spots} spots left</span>
                                {selectedClassId === cls.id && (
                                  <Button 
                                    className="mt-2 bg-neogym-red hover:bg-neogym-red/90"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toast({
                                        title: "Class Booked",
                                        description: `You have successfully booked a spot in ${cls.name} for ${cls.day} at ${cls.time}.`
                                      });
                                      setSelectedClassId(null);
                                    }}
                                  >
                                    Book Class
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Upcoming Classes</CardTitle>
                    <CardDescription>Your booked classes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userData.upcomingClasses.length === 0 ? (
                      <div className="text-center p-4">
                        <p className="text-gray-500 mb-2">No upcoming classes</p>
                        <p className="text-sm text-gray-400">Book a class to get started!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {userData.upcomingClasses.map((cls) => (
                          <div key={cls.id} className="border rounded-lg p-3 hover:border-neogym-red">
                            <h4 className="font-medium">{cls.name}</h4>
                            <p className="text-sm text-gray-600">Instructor: {cls.instructor}</p>
                            <div className="flex justify-between mt-2 text-sm">
                              <span className="text-gray-600">{cls.time}</span>
                              <span className="text-gray-600">{cls.duration}</span>
                            </div>
                            <div className="mt-3 flex justify-end">
                              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Class Recommendations</CardTitle>
                    <CardDescription>Based on your preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                        <h4 className="font-medium text-blue-700">Yoga Flow</h4>
                        <p className="text-sm text-blue-600">Perfect for recovery after your recent strength training.</p>
                        <Button className="mt-3 w-full bg-blue-600 hover:bg-blue-700">
                          View Details
                        </Button>
                      </div>
                      <div className="rounded-lg bg-purple-50 border border-purple-200 p-4">
                        <h4 className="font-medium text-purple-700">HIIT Challenge</h4>
                        <p className="text-sm text-purple-600">Boost your cardio and meet your calorie goals faster.</p>
                        <Button className="mt-3 w-full bg-purple-600 hover:bg-purple-700">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'progress' && (
          <motion.div
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Fitness Progress</CardTitle>
                      <Tabs defaultValue="weight" className="w-[300px]">
                        <TabsList>
                          <TabsTrigger value="weight">Weight</TabsTrigger>
                          <TabsTrigger value="workouts">Workouts</TabsTrigger>
                          <TabsTrigger value="measurements">Measurements</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                      <div className="text-center">
                        <FileLineChart size={48} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500">Progress chart visualization would appear here</p>
                        <p className="text-sm text-gray-400">Weight tracking over time</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                      {userData.fitnessProgress.weights.map((entry, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-md text-center">
                          <p className="text-sm text-gray-500">{entry.date}</p>
                          <p className="text-xl font-bold">{entry.value} kg</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Body Measurements</CardTitle>
                      <CardDescription>Track your physical changes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(userData.fitnessProgress.measurements).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-gray-600 capitalize">{key}</span>
                            <div className="flex items-center">
                              <span className="font-medium">{value} cm</span>
                              <Button variant="ghost" size="sm" className="ml-2 h-8 w-8 p-0">
                                <Edit size={14} />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full mt-2">
                          Update Measurements
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Workout Goals</CardTitle>
                      <CardDescription>Track your fitness goals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Weight Goal</span>
                            <span className="text-sm text-gray-500">
                              {userData.goals.weight.current}/{userData.goals.weight.target} kg
                            </span>
                          </div>
                          <Progress value={userData.goals.weight.progress} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Weekly Workouts</span>
                            <span className="text-sm text-gray-500">
                              {userData.goals.workoutsPerWeek.current}/{userData.goals.workoutsPerWeek.target}
                            </span>
                          </div>
                          <Progress value={userData.goals.workoutsPerWeek.progress} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Cardio per Week</span>
                            <span className="text-sm text-gray-500">
                              {userData.goals.cardio.current}/{userData.goals.cardio.target} hours
                            </span>
                          </div>
                          <Progress value={userData.goals.cardio.progress} className="h-2" />
                        </div>
                        
                        <Button className="w-full mt-2 bg-neogym-red hover:bg-neogym-red/90">
                          Set New Goals
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Workout History</CardTitle>
                    <CardDescription>Your recent workouts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Workout Type</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Calories</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userData.workoutHistory.map((workout, index) => (
                          <TableRow key={index}>
                            <TableCell>{workout.date}</TableCell>
                            <TableCell>{workout.type}</TableCell>
                            <TableCell>{workout.duration}</TableCell>
                            <TableCell>{workout.caloriesBurned}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">Details</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="flex justify-center mt-4">
                      <Button variant="outline" size="sm" className="mx-1">
                        <ArrowLeft size={16} className="mr-1" /> Previous
                      </Button>
                      <Button variant="outline" size="sm" className="mx-1">
                        Next <ArrowRight size={16} className="ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Personal Records</CardTitle>
                    <CardDescription>Your best performances</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userData.fitnessProgress.personalRecords.map((record, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium">{record.exercise}</h4>
                          <div className="flex justify-between mt-2">
                            <span className="text-2xl font-bold">{record.weight}</span>
                            <span className="text-sm text-gray-500 self-end">{record.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Add New Record
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Fitness Assessments</CardTitle>
                    <CardDescription>Professional evaluations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userData.fitnessProgress.fitnessAssessments.map((assessment, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-medium">Assessment</h4>
                            <span className="text-sm text-gray-500">{assessment.date}</span>
                          </div>
                          <div className="space-y-2 mt-3">
                            {Object.entries(assessment.results).map(([category, rating]) => (
                              <div key={category} className="flex justify-between">
                                <span className="text-gray-600 capitalize">{category}</span>
                                <span className={`font-medium ${
                                  rating === 'Good' || rating === 'Very Good' ? 'text-green-600' : 
                                  rating === 'Average' ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                  {rating}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4 bg-neogym-red hover:bg-neogym-red/90">
                      Schedule New Assessment
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'payments' && (
          <motion.div
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>View your payment history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userData.paymentInfo.billingHistory.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell>{payment.description}</TableCell>
                            <TableCell>${payment.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                                payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'
                              }`}>
                                {payment.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" className="flex items-center">
                                <FileText size={14} className="mr-1" />
                                Receipt
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="flex justify-center mt-4">
                      <Button variant="outline" size="sm" className="mx-1">
                        <ArrowLeft size={16} className="mr-1" /> Previous
                      </Button>
                      <Button variant="outline" size="sm" className="mx-1">
                        Next <ArrowRight size={16} className="ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment options</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {paymentMethods.map((card) => (
                        <div 
                          key={card.id} 
                          className={`border rounded-lg p-4 hover:border-neogym-red transition-colors ${
                            card.isDefault ? 'bg-gray-50 border-gray-300' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center mr-3">
                                <CreditCardIcon size={20} />
                              </div>
                              <div>
                                <p className="font-medium">{card.type} •••• {card.lastFour}</p>
                                <p className="text-sm text-gray-500">Expires {card.expiry}</p>
                              </div>
                            </div>
                            {card.isDefault && (
                              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">Default</span>
                            )}
                          </div>
                          
                          <div className="flex justify-end mt-3 space-x-2">
                            {!card.isDefault && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  const updatedMethods = paymentMethods.map(method => ({
                                    ...method,
                                    isDefault: method.id === card.id
                                  }));
                                  setPaymentMethods(updatedMethods);
                                  toast({
                                    title: "Default Payment Method Updated",
                                    description: `${card.type} ending in ${card.lastFour} is now your default payment method.`
                                  });
                                }}
                              >
                                Set Default
                              </Button>
                            )}
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4 bg-neogym-red hover:bg-neogym-red/90">
                      <Plus size={16} className="mr-2" />
                      Add Payment Method
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Payment</CardTitle>
                    <CardDescription>Your next billing date</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-3">
                        <p className="text-gray-600">Next payment</p>
                        <p className="font-bold">${userData.paymentInfo.nextPayment.amount.toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-gray-600">Date</p>
                        <p>{userData.paymentInfo.nextPayment.date}</p>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-gray-500 mb-2">
                          Your {userData.membership} membership will be automatically renewed.
                        </p>
                        <div className="flex justify-end">
                          <Button variant="link" className="text-neogym-red text-sm p-0">
                            View membership details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="emailNotif">Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive emails about your account activity</p>
                        </div>
                        <Switch 
                          id="emailNotif" 
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="pushNotif">Push Notifications</Label>
                          <p className="text-sm text-gray-500">Receive push notifications on your devices</p>
                        </div>
                        <Switch 
                          id="pushNotif" 
                          checked={settings.pushNotifications}
                          onCheckedChange={(checked) => setSettings({...settings, pushNotifications: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="smsNotif">SMS Notifications</Label>
                          <p className="text-sm text-gray-500">Receive text messages for important updates</p>
                        </div>
                        <Switch 
                          id="smsNotif" 
                          checked={settings.smsNotifications}
                          onCheckedChange={(checked) => setSettings({...settings, smsNotifications: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="marketingNotif">Marketing Emails</Label>
                          <p className="text-sm text-gray-500">Receive emails about promotions and news</p>
                        </div>
                        <Switch 
                          id="marketingNotif" 
                          checked={settings.marketingEmails}
                          onCheckedChange={(checked) => setSettings({...settings, marketingEmails: checked})}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Change Password</h4>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" type="password" />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password" />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input id="confirmPassword" type="password" />
                          </div>
                          <Button 
                            className="mt-2 bg-neogym-red hover:bg-neogym-red/90"
                            onClick={() => {
                              toast({
                                title: "Password Updated",
                                description: "Your password has been successfully updated."
                              });
                            }}
                          >
                            Change Password
                          </Button>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <Switch 
                          id="twoFactorAuth" 
                          checked={settings.twoFactorAuth}
                          onCheckedChange={(checked) => {
                            setSettings({...settings, twoFactorAuth: checked});
                            toast({
                              title: checked ? "Two-Factor Authentication Enabled" : "Two-Factor Authentication Disabled",
                              description: checked ? 
                                "Your account is now more secure with 2FA." : 
                                "Two-factor authentication has been disabled."
                            });
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Customize your app experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="darkMode">Dark Mode</Label>
                          <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                        </div>
                        <Switch 
                          id="darkMode" 
                          checked={settings.darkMode}
                          onCheckedChange={(checked) => setSettings({...settings, darkMode: checked})}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <div className="space-y-1">
                          <Label htmlFor="language">Language</Label>
                          <Select 
                            value={settings.language}
                            onValueChange={(value) => setSettings({...settings, language: value})}
                          >
                            <SelectTrigger id="language">
                              <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="spanish">Spanish</SelectItem>
                              <SelectItem value="french">French</SelectItem>
                              <SelectItem value="german">German</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="currency">Currency</Label>
                          <Select 
                            value={settings.currency}
                            onValueChange={(value) => setSettings({...settings, currency: value})}
                          >
                            <SelectTrigger id="currency">
                              <SelectValue placeholder="Select a currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="usd">USD ($)</SelectItem>
                              <SelectItem value="eur">EUR (€)</SelectItem>
                              <SelectItem value="gbp">GBP (£)</SelectItem>
                              <SelectItem value="jpy">JPY (¥)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button 
                      className="bg-neogym-red hover:bg-neogym-red/90"
                      onClick={() => {
                        toast({
                          title: "Settings Saved",
                          description: "Your preferences have been updated."
                        });
                      }}
                    >
                      Save Preferences
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Connected Accounts</CardTitle>
                    <CardDescription>Manage connected services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center mr-3">
                            <Globe size={20} />
                          </div>
                          <div>
                            <p className="font-medium">Google</p>
                            <p className="text-sm text-gray-500">Connected</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Disconnect</Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center mr-3">
                            <Heart size={20} />
                          </div>
                          <div>
                            <p className="font-medium">Apple Health</p>
                            <p className="text-sm text-gray-500">Not connected</p>
                          </div>
                        </div>
                        <Button size="sm" className="bg-neogym-red hover:bg-neogym-red/90">Connect</Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center mr-3">
                            <Activity size={20} />
                          </div>
                          <div>
                            <p className="font-medium">Fitbit</p>
                            <p className="text-sm text-gray-500">Not connected</p>
                          </div>
                        </div>
                        <Button size="sm" className="bg-neogym-red hover:bg-neogym-red/90">Connect</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Account Support</CardTitle>
                    <CardDescription>Get help with your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full flex justify-between items-center">
                        <span className="flex items-center">
                          <Mail size={16} className="mr-2" />
                          Contact Support
                        </span>
                        <ExternalLink size={14} />
                      </Button>
                      
                      <Button variant="outline" className="w-full flex justify-between items-center">
                        <span className="flex items-center">
                          <FileText size={16} className="mr-2" />
                          Help Center
                        </span>
                        <ExternalLink size={14} />
                      </Button>
                      
                      <Button variant="outline" className="w-full flex justify-between items-center">
                        <span className="flex items-center">
                          <History size={16} className="mr-2" />
                          Request Data Export
                        </span>
                        <ExternalLink size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                    <CardDescription>Irreversible account actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button variant="destructive" className="w-full">
                        Deactivate Account
                      </Button>
                      <p className="text-sm text-gray-500">
                        Deactivating your account will suspend your membership and access to the gym facilities. Your data will be retained.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;

