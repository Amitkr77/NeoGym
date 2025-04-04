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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

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
  ]
};

const UserDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  
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

  const unreadCount = userData.notifications.filter(n => !n.read).length;

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
                    {userData.notifications.length === 0 ? (
                      <p className="p-4 text-center text-gray-500">No notifications</p>
                    ) : (
                      userData.notifications.map((notification) => (
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
                    <Button variant="link" className="text-neogym-red text-sm">
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
                  <Button variant="outline" size="sm">
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
                <Button variant="link" className="text-neogym-red">
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
            <h3 className="text-2xl font-bold mb-6">My Profile</h3>
            <p className="text-gray-600 mb-8">This section would contain user profile management functionality.</p>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-bold mb-4">Profile Content Placeholder</h4>
              <p>The profile page would typically include:</p>
              <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-600">
                <li>Personal information management</li>
                <li>Profile picture upload</li>
                <li>Password change functionality</li>
                <li>Contact information</li>
                <li>Fitness preferences</li>
              </ul>
            </div>
          </motion.div>
        )}

        {(activeTab === 'schedule' || activeTab === 'progress' || 
          activeTab === 'payments' || activeTab === 'settings') && (
          <motion.div
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-6">
              {activeTab === 'schedule' && 'Class Schedule'}
              {activeTab === 'progress' && 'Fitness Progress'}
              {activeTab === 'payments' && 'Payments'}
              {activeTab === 'settings' && 'Settings'}
            </h3>
            <p className="text-gray-600 mb-8">This page is under construction. Content for {activeTab} will be available soon.</p>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-bold mb-4">Placeholder Content</h4>
              <p>This tab would contain features for {activeTab}.</p>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
