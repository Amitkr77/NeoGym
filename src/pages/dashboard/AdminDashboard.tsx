
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Calendar,
  Users,
  Home,
  LogOut,
  Settings,
  Menu,
  X,
  Bell,
  DollarSign,
  Dumbbell,
  Search,
  PlusCircle,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  FileText,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Sample admin data
const adminData = {
  name: "Admin User",
  email: "admin@example.com",
  avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  stats: {
    totalMembers: 245,
    activeMembers: 208,
    newMembersThisMonth: 18,
    revenue: {
      thisMonth: 12580,
      lastMonth: 11750,
      percentChange: 7.06
    },
    classes: {
      total: 40,
      mostPopular: "HIIT Training"
    },
    equipment: {
      total: 75,
      needMaintenance: 3
    }
  },
  notifications: [
    {
      id: 1,
      message: "Membership renewal failed for user #1234",
      time: "30 minutes ago",
      type: "error",
      read: false
    },
    {
      id: 2,
      message: "5 new members joined today",
      time: "2 hours ago",
      type: "info",
      read: false
    },
    {
      id: 3,
      message: "Monthly revenue report is ready",
      time: "1 day ago",
      type: "info",
      read: true
    }
  ],
  recentMembers: [
    {
      id: 1,
      name: "Emma Watson",
      email: "emma@example.com",
      joinDate: "April 2, 2025",
      status: "active",
      membership: "Premium"
    },
    {
      id: 2,
      name: "James Smith",
      email: "james@example.com",
      joinDate: "April 1, 2025",
      status: "active",
      membership: "Standard"
    },
    {
      id: 3,
      name: "Sofia Rodriguez",
      email: "sofia@example.com",
      joinDate: "March 28, 2025",
      status: "active",
      membership: "Premium"
    },
    {
      id: 4,
      name: "Michael Johnson",
      email: "michael@example.com",
      joinDate: "March 25, 2025",
      status: "inactive",
      membership: "Standard"
    },
    {
      id: 5,
      name: "Oliver Brown",
      email: "oliver@example.com",
      joinDate: "March 22, 2025",
      status: "active",
      membership: "Standard"
    }
  ],
  classes: [
    {
      id: 1,
      name: "HIIT Training",
      instructor: "Alex Johnson",
      time: "Mon, Wed, Fri - 6:00 AM",
      capacity: 20,
      enrolled: 18
    },
    {
      id: 2,
      name: "Yoga",
      instructor: "Maria Garcia",
      time: "Tue, Thu - 7:30 AM",
      capacity: 15,
      enrolled: 15
    },
    {
      id: 3,
      name: "Spinning",
      instructor: "John Smith",
      time: "Mon, Wed, Fri - 5:30 PM",
      capacity: 25,
      enrolled: 20
    },
    {
      id: 4,
      name: "Zumba",
      instructor: "Sofia Martinez",
      time: "Tue, Thu - 6:00 PM",
      capacity: 30,
      enrolled: 25
    },
    {
      id: 5,
      name: "Cross Training",
      instructor: "Mike Wilson",
      time: "Sat - 9:00 AM",
      capacity: 15,
      enrolled: 12
    }
  ],
  equipment: [
    {
      id: 1,
      name: "Treadmill",
      location: "Cardio Area",
      status: "operational",
      lastMaintenance: "March 15, 2025"
    },
    {
      id: 2,
      name: "Bench Press",
      location: "Weight Room",
      status: "operational",
      lastMaintenance: "March 10, 2025"
    },
    {
      id: 3,
      name: "Elliptical Machine",
      location: "Cardio Area",
      status: "needs maintenance",
      lastMaintenance: "January 5, 2025"
    },
    {
      id: 4,
      name: "Squat Rack",
      location: "Weight Room",
      status: "operational",
      lastMaintenance: "February 20, 2025"
    },
    {
      id: 5,
      name: "Rowing Machine",
      location: "Cardio Area",
      status: "operational",
      lastMaintenance: "March 1, 2025"
    }
  ],
  revenues: [
    { month: "Jan", amount: 10500 },
    { month: "Feb", amount: 11200 },
    { month: "Mar", amount: 10800 },
    { month: "Apr", amount: 12580 },
    { month: "May", amount: 0 },
    { month: "Jun", amount: 0 },
    { month: "Jul", amount: 0 },
    { month: "Aug", amount: 0 },
    { month: "Sep", amount: 0 },
    { month: "Oct", amount: 0 },
    { month: "Nov", amount: 0 },
    { month: "Dec", amount: 0 }
  ],
  expenses: [
    { category: "Staff Salaries", amount: 5500 },
    { category: "Equipment Maintenance", amount: 800 },
    { category: "Utilities", amount: 1200 },
    { category: "Marketing", amount: 1000 },
    { category: "Insurance", amount: 750 },
    { category: "Other", amount: 500 }
  ],
  classesByDay: [
    { day: "Mon", count: 8 },
    { day: "Tue", count: 10 },
    { day: "Wed", count: 12 },
    { day: "Thu", count: 9 },
    { day: "Fri", count: 11 },
    { day: "Sat", count: 7 },
    { day: "Sun", count: 5 }
  ],
  membershipsByType: [
    { type: "Premium", count: 95 },
    { type: "Standard", count: 138 },
    { type: "Basic", count: 12 }
  ],
  tasks: [
    { id: 1, text: "Review membership renewal reports", completed: false },
    { id: 2, text: "Schedule maintenance for cardio machines", completed: false },
    { id: 3, text: "Approve new trainer applications", completed: true },
    { id: 4, text: "Update class schedule for next month", completed: false }
  ]
};

// Form schema for member creation/editing
const memberFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  membership: z.string().min(1, { message: "Please select a membership type." }),
  status: z.string().min(1, { message: "Please select a status." }),
  notes: z.string().optional(),
});

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState(adminData.recentMembers);
  const [classes, setClasses] = useState(adminData.classes);
  const [equipment, setEquipment] = useState(adminData.equipment);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<any>(null);
  
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

  // Count unread notifications
  const unreadCount = adminData.notifications.filter(n => !n.read).length;

  // Filter members based on search query
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.membership.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Form handling for adding/editing members
  const form = useForm<z.infer<typeof memberFormSchema>>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      name: "",
      email: "",
      membership: "",
      status: "active",
      notes: "",
    },
  });

  const openAddMemberDialog = () => {
    form.reset({
      name: "",
      email: "",
      membership: "",
      status: "active",
      notes: "",
    });
    setEditingMember(null);
    setIsAddMemberOpen(true);
  };

  const openEditMemberDialog = (member: any) => {
    form.reset({
      name: member.name,
      email: member.email,
      membership: member.membership,
      status: member.status,
      notes: member.notes || "",
    });
    setEditingMember(member);
    setIsAddMemberOpen(true);
  };

  const handleMemberSubmit = (values: z.infer<typeof memberFormSchema>) => {
    if (editingMember) {
      // Update existing member
      const updatedMembers = members.map(member => 
        member.id === editingMember.id 
          ? { ...member, ...values, joinDate: member.joinDate } 
          : member
      );
      setMembers(updatedMembers);
      toast({
        title: "Member Updated",
        description: `${values.name}'s information has been updated.`,
      });
    } else {
      // Add new member
      const newMember = {
        id: members.length + 1,
        name: values.name,
        email: values.email,
        membership: values.membership,
        status: values.status,
        joinDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        notes: values.notes
      };
      setMembers([newMember, ...members]);
      toast({
        title: "Member Added",
        description: `${values.name} has been added as a new member.`,
      });
    }
    setIsAddMemberOpen(false);
  };

  const openDeleteMemberDialog = (member: any) => {
    setMemberToDelete(member);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteMember = () => {
    if (memberToDelete) {
      const updatedMembers = members.filter(member => member.id !== memberToDelete.id);
      setMembers(updatedMembers);
      toast({
        title: "Member Deleted",
        description: `${memberToDelete.name} has been removed from the system.`,
      });
      setIsDeleteDialogOpen(false);
      setMemberToDelete(null);
    }
  };

  return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <motion.aside 
          className={`bg-neogym-dark text-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 fixed h-full z-10`}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 flex justify-between items-center">
            <h1 className={`font-bold text-xl ${!isSidebarOpen && 'hidden'}`}>
              <span className="text-neogym-red">ADMIN</span>PANEL
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
                { id: 'members', name: 'Members', icon: Users },
                { id: 'classes', name: 'Classes', icon: Calendar },
                { id: 'finances', name: 'Finances', icon: DollarSign },
                { id: 'equipment', name: 'Equipment', icon: Dumbbell },
                { id: 'reports', name: 'Reports', icon: FileText },
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

        {/* Main Content */}
        <main className={`flex-1 overflow-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
          {/* Header */}
          <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            <div className="flex items-center">
              <h2 className="text-xl font-bold">
                {activeTab === 'dashboard' && 'Admin Dashboard'}
                {activeTab === 'members' && 'Member Management'}
                {activeTab === 'classes' && 'Class Schedule'}
                {activeTab === 'finances' && 'Financial Reports'}
                {activeTab === 'equipment' && 'Equipment Management'}
                {activeTab === 'reports' && 'Reports'}
                {activeTab === 'settings' && 'System Settings'}
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
                      {adminData.notifications.length === 0 ? (
                        <p className="p-4 text-center text-gray-500">No notifications</p>
                      ) : (
                        adminData.notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                          >
                            <div className="flex items-start">
                              {notification.type === 'error' ? (
                                <AlertCircle size={16} className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                              ) : (
                                <Bell size={16} className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                              )}
                              <div>
                                <p className="text-sm font-medium">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                              </div>
                            </div>
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
                  src={adminData.avatar}
                  alt="Admin Avatar" 
                  className="h-8 w-8 rounded-full"
                />
                <span className="ml-2 font-medium hidden md:block">{adminData.name}</span>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
            <motion.div
              className="p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <motion.div 
                  className="bg-white rounded-lg  overflow-hidden"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <div className="bg-blue-500 p-3 text-white font-medium">
                    Total Members
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-3xl font-bold">{adminData.stats.totalMembers}</p>
                        <p className="text-gray-600 text-sm">
                          <span className="text-green-500">+{adminData.stats.newMembersThisMonth}</span> this month
                        </p>
                      </div>
                      <Users size={36} className="text-blue-500" />
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <div className="bg-green-500 p-3 text-white font-medium">
                    Revenue
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-3xl font-bold">${adminData.stats.revenue.thisMonth.toLocaleString()}</p>
                        <p className="text-gray-600 text-sm">
                          <span className={adminData.stats.revenue.percentChange >= 0 ? "text-green-500" : "text-red-500"}>
                            {adminData.stats.revenue.percentChange >= 0 ? "+" : ""}
                            {adminData.stats.revenue.percentChange.toFixed(1)}%
                          </span> vs last month
                        </p>
                      </div>
                      <DollarSign size={36} className="text-green-500" />
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <div className="bg-purple-500 p-3 text-white font-medium">
                    Classes
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-3xl font-bold">{adminData.stats.classes.total}</p>
                        <p className="text-gray-600 text-sm truncate max-w-[150px]">
                          Most popular: {adminData.stats.classes.mostPopular}
                        </p>
                      </div>
                      <Calendar size={36} className="text-purple-500" />
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <div className="bg-orange-500 p-3 text-white font-medium">
                    Equipment
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-3xl font-bold">{adminData.stats.equipment.total}</p>
                        <p className="text-gray-600 text-sm">
                          <span className="text-red-500">{adminData.stats.equipment.needMaintenance}</span> need maintenance
                        </p>
                      </div>
                      <Dumbbell size={36} className="text-orange-500" />
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Charts & Recent Members */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Weekly Classes Chart */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Weekly Class Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] flex items-end justify-between">
                      {adminData.classesByDay.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div 
                            className="w-10 bg-neogym-red rounded-t-md" 
                            style={{ height: `${(item.count / 12) * 200}px` }}
                          ></div>
                          <p className="mt-2 text-sm font-medium">{item.day}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Membership Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Membership Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {adminData.membershipsByType.map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <p className="text-sm font-medium">{item.type}</p>
                            <p className="text-sm text-gray-500">{item.count} members</p>
                          </div>
                          <Progress 
                            value={Math.round((item.count / adminData.stats.totalMembers) * 100)} 
                            className="h-2"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Tasks & Recent Members */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Tasks */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Tasks</CardTitle>
                    <Button variant="ghost" size="sm">
                      <PlusCircle size={16} className="mr-1" /> Add
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {adminData.tasks.map((task) => (
                        <div key={task.id} className="flex items-start">
                          <input 
                            type="checkbox" 
                            checked={task.completed}
                            onChange={() => {}}
                            className="mt-1 mr-3"
                          />
                          <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : ''}`}>
                            {task.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Recent Members */}
                <Card className="lg:col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Members</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setActiveTab('members')}
                    >
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium">Name</th>
                            <th className="text-left py-3 px-4 font-medium">Membership</th>
                            <th className="text-left py-3 px-4 font-medium">Join Date</th>
                            <th className="text-left py-3 px-4 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {members.slice(0, 4).map((member) => (
                            <tr key={member.id} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4">
                                <div className="font-medium">{member.name}</div>
                                <div className="text-gray-500 text-xs">{member.email}</div>
                              </td>
                              <td className="py-3 px-4">{member.membership}</td>
                              <td className="py-3 px-4">{member.joinDate}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  member.status === 'active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {member.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Members Tab */}
          {activeTab === 'members' && (
            <motion.div
              className="p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                      placeholder="Search members..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button 
                    className="bg-neogym-red hover:bg-neogym-red/90 text-white"
                    onClick={openAddMemberDialog}
                  >
                    <PlusCircle size={18} className="mr-2" /> Add New Member
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Membership</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium">{member.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{member.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{member.membership}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{member.joinDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              member.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {member.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex space-x-2">
                              <button 
                                className="text-blue-600 hover:text-blue-800"
                                onClick={() => openEditMemberDialog(member)}
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                className="text-red-600 hover:text-red-800"
                                onClick={() => openDeleteMemberDialog(member)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="flex justify-between items-center mt-6">
                  <p className="text-sm text-gray-600">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredMembers.length}</span> of <span className="font-medium">{members.length}</span> members
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      <ChevronLeft size={16} />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-neogym-red text-white">1</Button>
                    <Button variant="outline" size="sm">2</Button>
                    <Button variant="outline" size="sm">3</Button>
                    <Button variant="outline" size="sm">
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Member Form Dialog */}
              <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>{editingMember ? 'Edit Member' : 'Add New Member'}</DialogTitle>
                    <DialogDescription>
                      {editingMember 
                        ? 'Update the member details below.' 
                        : 'Fill in the information below to add a new member.'}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleMemberSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="jane@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="membership"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Membership Type</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a membership type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Premium">Premium</SelectItem>
                                <SelectItem value="Standard">Standard</SelectItem>
                                <SelectItem value="Basic">Basic</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notes (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Additional information about the member"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsAddMemberOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-neogym-red hover:bg-neogym-red/90">
                          {editingMember ? 'Update Member' : 'Add Member'}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>

              {/* Delete Member Dialog */}
              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Delete Member</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete the member {memberToDelete?.name}? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={confirmDeleteMember}>
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </motion.div>
          )}

          {/* Classes Tab */}
          {activeTab === 'classes' && (
            <motion.div
              className="p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Class Schedule Management</h3>
                
                <div className="flex justify-between items-center mb-6">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input placeholder="Search classes..." className="pl-10" />
                  </div>
                  <Button className="bg-neogym-red hover:bg-neogym-red/90 text-white">
                    <PlusCircle size={18} className="mr-2" /> Add New Class
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {classes.map((classItem) => (
                        <tr key={classItem.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap font-medium">{classItem.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{classItem.instructor}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{classItem.time}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{classItem.capacity}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="mr-2">{classItem.enrolled}</span>
                              <Progress 
                                value={(classItem.enrolled / classItem.capacity) * 100} 
                                className="h-2 w-20"
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Edit size={16} />
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Class Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] flex items-end justify-between">
                      {adminData.classesByDay.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div 
                            className="w-10 bg-purple-500 rounded-t-md" 
                            style={{ height: `${(item.count / 12) * 200}px` }}
                          ></div>
                          <p className="mt-2 text-sm font-medium">{item.day}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Popular Classes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {classes.slice(0, 4).map((classItem, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <p className="text-sm font-medium">{classItem.name}</p>
                          <p className="text-sm text-gray-500">{classItem.enrolled}/{classItem.capacity}</p>
                        </div>
                        <Progress 
                          value={(classItem.enrolled / classItem.capacity) * 100} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Finances Tab */}
          {activeTab === 'finances' && (
            <motion.div
              className="p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Total Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">${adminData.stats.revenue.thisMonth.toLocaleString()}</div>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className={adminData.stats.revenue.percentChange >= 0 ? "text-green-500" : "text-red-500"}>
                        {adminData.stats.revenue.percentChange >= 0 ? "+" : ""}
                        {adminData.stats.revenue.percentChange.toFixed(1)}%
                      </span> from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Monthly Expenses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$9,750</div>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="text-red-500">+2.5%</span> from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Net Profit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$2,830</div>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="text-green-500">+12.3%</span> from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Revenue Overview (2025)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-end space-x-2">
                      {adminData.revenues.map((item, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div 
                            className={`w-full rounded-t-md ${item.amount > 0 ? 'bg-green-500' : 'bg-gray-200'}`}
                            style={{ height: `${(item.amount / 15000) * 250}px` }}
                          ></div>
                          <p className="mt-2 text-xs font-medium">{item.month}</p>
                          {item.amount > 0 && (
                            <p className="text-xs text-gray-500">${item.amount.toLocaleString()}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Expense Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {adminData.expenses.map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <p className="text-sm font-medium">{item.category}</p>
                            <p className="text-sm text-gray-500">${item.amount}</p>
                          </div>
                          <Progress 
                            value={(item.amount / 9750) * 100} 
                            className="h-2"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">Apr 3, 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap">Membership Fee - James Smith</td>
                        <td className="px-6 py-4 whitespace-nowrap">Revenue</td>
                        <td className="px-6 py-4 whitespace-nowrap text-green-600">+$89.00</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">Apr 2, 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap">Equipment Maintenance</td>
                        <td className="px-6 py-4 whitespace-nowrap">Expense</td>
                        <td className="px-6 py-4 whitespace-nowrap text-red-600">-$250.00</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">Apr 1, 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap">Premium Plan - Emma Watson</td>
                        <td className="px-6 py-4 whitespace-nowrap">Revenue</td>
                        <td className="px-6 py-4 whitespace-nowrap text-green-600">+$129.00</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">Mar 30, 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap">Utilities Payment</td>
                        <td className="px-6 py-4 whitespace-nowrap">Expense</td>
                        <td className="px-6 py-4 whitespace-nowrap text-red-600">-$450.00</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">Mar 28, 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap">Personal Training - Michael Johnson</td>
                        <td className="px-6 py-4 whitespace-nowrap">Revenue</td>
                        <td className="px-6 py-4 whitespace-nowrap text-green-600">+$75.00</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Equipment Tab */}
          {activeTab === 'equipment' && (
            <motion.div
              className="p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Equipment Management</h3>
                
                <div className="flex justify-between items-center mb-6">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input placeholder="Search equipment..." className="pl-10" />
                  </div>
                  <Button className="bg-neogym-red hover:bg-neogym-red/90 text-white">
                    <PlusCircle size={18} className="mr-2" /> Add New Equipment
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Maintenance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {equipment.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap font-medium">{item.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              item.status === 'operational' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {item.status === 'operational' ? 'Operational' : 'Needs Maintenance'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.lastMaintenance}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Edit size={16} />
                              </button>
                              <button className="text-yellow-600 hover:text-yellow-800">
                                <span className="border border-yellow-600 rounded px-2 py-1 text-xs">Maintenance</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Equipment Status Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                          <span>Operational</span>
                        </div>
                        <span className="font-medium">{equipment.filter(e => e.status === 'operational').length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                          <span>Needs Maintenance</span>
                        </div>
                        <span className="font-medium">{equipment.filter(e => e.status === 'needs maintenance').length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-gray-300 mr-2"></div>
                          <span>Out of Order</span>
                        </div>
                        <span className="font-medium">0</span>
                      </div>
                      <div className="mt-6">
                        <Progress 
                          value={(equipment.filter(e => e.status === 'operational').length / equipment.length) * 100} 
                          className="h-4"
                        />
                        <p className="text-sm text-gray-500 mt-2 text-center">
                          {((equipment.filter(e => e.status === 'operational').length / equipment.length) * 100).toFixed(1)}% of equipment operational
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Maintenance Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-red-50 p-4 rounded-md border border-red-200">
                        <h4 className="font-medium text-red-800 mb-2">Urgent Maintenance Required</h4>
                        <ul className="space-y-2">
                          {equipment
                            .filter(e => e.status === 'needs maintenance')
                            .map(item => (
                              <li key={item.id} className="flex justify-between">
                                <span>{item.name}</span>
                                <span className="text-gray-500 text-sm">Last: {item.lastMaintenance}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                      
                      <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                        <h4 className="font-medium text-yellow-800 mb-2">Upcoming Maintenance</h4>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span>Treadmill (ID #8)</span>
                            <span className="text-gray-500 text-sm">Due: Apr 15, 2025</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Leg Press Machine</span>
                            <span className="text-gray-500 text-sm">Due: Apr 20, 2025</span>
                          </li>
                        </ul>
                      </div>
                      
                      <Button className="w-full">Schedule Maintenance</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <motion.div
              className="p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Retention Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">87.4%</div>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="text-green-500">+2.1%</span> from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>New Sign-ups</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">18</div>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="text-red-500">-3</span> compared to last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Class Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">92.6%</div>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="text-green-500">+5.3%</span> from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Report Library</h3>
                
                <Tabs defaultValue="member" className="w-full">
                  <TabsList className="mb-4 flex space-x-1 bg-muted/50 p-1 w-full max-w-lg">
                    <TabsTrigger value="member" className="flex-1">Member Reports</TabsTrigger>
                    <TabsTrigger value="finance" className="flex-1">Financial Reports</TabsTrigger>
                    <TabsTrigger value="activity" className="flex-1">Activity Reports</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="member" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="bg-gray-50 hover:bg-gray-100 p-4 rounded-md border flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Membership Growth Report</h4>
                          <p className="text-sm text-gray-500">Track member acquisition and churn</p>
                        </div>
                        <FileText className="text-gray-400" />
                      </button>
                      
                      <button className="bg-gray-50 hover:bg-gray-100 p-4 rounded-md border flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Member Demographics</h4>
                          <p className="text-sm text-gray-500">Age, gender, and location breakdown</p>
                        </div>
                        <FileText className="text-gray-400" />
                      </button>
                      
                      <button className="bg-gray-50 hover:bg-gray-100 p-4 rounded-md border flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Membership Renewal Report</h4>
                          <p className="text-sm text-gray-500">Renewal rates and upcoming renewals</p>
                        </div>
                        <FileText className="text-gray-400" />
                      </button>
                      
                      <button className="bg-gray-50 hover:bg-gray-100 p-4 rounded-md border flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Member Engagement</h4>
                          <p className="text-sm text-gray-500">Visit frequency and class participation</p>
                        </div>
                        <FileText className="text-gray-400" />
                      </button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="finance" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="bg-gray-50 hover:bg-gray-100 p-4 rounded-md border flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Monthly Revenue Report</h4>
                          <p className="text-sm text-gray-500">Revenue by membership type</p>
                        </div>
                        <FileText className="text-gray-400" />
                      </button>
                      
                      <button className="bg-gray-50 hover:bg-gray-100 p-4 rounded-md border flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Expense Breakdown</h4>
                          <p className="text-sm text-gray-500">Monthly expenses by category</p>
                        </div>
                        <FileText className="text-gray-400" />
                      </button>
                      
                      <button className="bg-gray-50 hover:bg-gray-100 p-4 rounded-md border flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Profit/Loss Statement</h4>
                          <p className="text-sm text-gray-500">Monthly P&L with comparison</p>
                        </div>
                        <FileText className="text-gray-400" />
                      </button>
                      
                      <button className="bg-gray-50 hover:bg-gray-100 p-4 rounded-md border flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Outstanding Payments</h4>
                          <p className="text-sm text-gray-500">Members with pending payments</p>
                        </div>
                        <FileText className="text-gray-400" />
                      </button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="activity" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="bg-gray-50 hover:bg-gray-100 p-4 rounded-md border flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Class Attendance Report</h4>
                          <p className="text-sm text-gray-500">Attendance rates for all classes</p>
                        </div>
                        <FileText className="text-gray-400" />
                      </button>
                      
                      <button className="bg-gray-50 hover:bg-gray-100 p-4 rounded-md border flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Peak Hours Analysis</h4>
                          <p className="text-sm text-gray-500">Busiest times in the gym</p>
                        </div>
                        <FileText className="text-gray-400" />
                      </button>
                      
                      <button className="bg-gray-50 hover:bg-gray-100 p-4 rounded-md border flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Equipment Usage</h4>
                          <p className="text-sm text-gray-500">Most and least used equipment</p>
                        </div>
                        <FileText className="text-gray-400" />
                      </button>
                      
                      <button className="bg-gray-50 hover:bg-gray-100 p-4 rounded-md border flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Trainer Performance</h4>
                          <p className="text-sm text-gray-500">Classes and personal training sessions</p>
                        </div>
                        <FileText className="text-gray-400" />
                      </button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Custom Report Generator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Report Type</label>
                      <Select defaultValue="membership">
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="membership">Membership</SelectItem>
                          <SelectItem value="financial">Financial</SelectItem>
                          <SelectItem value="activity">Activity</SelectItem>
                          <SelectItem value="equipment">Equipment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Date Range</label>
                      <Select defaultValue="lastMonth">
                        <SelectTrigger>
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="thisWeek">This Week</SelectItem>
                          <SelectItem value="lastMonth">Last Month</SelectItem>
                          <SelectItem value="lastQuarter">Last Quarter</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Additional Filters</label>
                      <div className="flex flex-wrap gap-2">
                        <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">
                          Premium Members
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">
                          New Members
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">
                          Group Classes
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">
                          + Add Filter
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="outline" className="mr-2">Save Template</Button>
                    <Button className="bg-neogym-red hover:bg-neogym-red/90 text-white">Generate Report</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              className="p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <Tabs defaultValue="account" className="w-full">
                  <TabsList className="flex w-full border-b bg-transparent p-0">
                    <TabsTrigger
                      value="account"
                      className="flex-1 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-neogym-red"
                    >
                      Account Settings
                    </TabsTrigger>
                    <TabsTrigger
                      value="notifications"
                      className="flex-1 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-neogym-red"
                    >
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger
                      value="gym"
                      className="flex-1 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-neogym-red"
                    >
                      Gym Settings
                    </TabsTrigger>
                    <TabsTrigger
                      value="security"
                      className="flex-1 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-neogym-red"
                    >
                      Security
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="account" className="p-6">
                    <h3 className="text-lg font-bold mb-4">Account Information</h3>
                    
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/3 flex flex-col items-center">
                        <div className="relative">
                          <img 
                            src={adminData.avatar} 
                            alt="Profile" 
                            className="w-32 h-32 rounded-full object-cover"
                          />
                          <button className="absolute bottom-0 right-0 bg-neogym-red text-white p-2 rounded-full">
                            <Edit size={16} />
                          </button>
                        </div>
                        <p className="mt-4 font-medium text-lg">{adminData.name}</p>
                        <p className="text-gray-500">{adminData.email}</p>
                        <p className="text-sm text-gray-500 mt-2">Admin / Manager</p>
                      </div>
                      
                      <div className="md:w-2/3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <label className="block text-sm font-medium mb-1">Full Name</label>
                            <Input defaultValue={adminData.name} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <Input defaultValue={adminData.email} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Phone Number</label>
                            <Input defaultValue="+1 (555) 123-4567" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Role</label>
                            <Select defaultValue="admin">
                              <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="manager">Manager</SelectItem>
                                <SelectItem value="trainer">Trainer</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <Button className="bg-neogym-red hover:bg-neogym-red/90 text-white">
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notifications" className="p-6">
                    <h3 className="text-lg font-bold mb-4">Notification Preferences</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Email Notifications</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm">New member registrations</label>
                            <input type="checkbox" defaultChecked className="w-4 h-4" />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm">Payment confirmations</label>
                            <input type="checkbox" defaultChecked className="w-4 h-4" />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm">Failed payments</label>
                            <input type="checkbox" defaultChecked className="w-4 h-4" />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm">Equipment maintenance alerts</label>
                            <input type="checkbox" defaultChecked className="w-4 h-4" />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm">Weekly summary reports</label>
                            <input type="checkbox" defaultChecked className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">System Notifications</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm">Member check-ins</label>
                            <input type="checkbox" className="w-4 h-4" />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm">Class bookings</label>
                            <input type="checkbox" defaultChecked className="w-4 h-4" />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm">Low inventory alerts</label>
                            <input type="checkbox" defaultChecked className="w-4 h-4" />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm">Staff login activity</label>
                            <input type="checkbox" className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                      
                      <Button className="bg-neogym-red hover:bg-neogym-red/90 text-white">
                        Save Preferences
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="gym" className="p-6">
                    <h3 className="text-lg font-bold mb-4">Gym Settings</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Business Information</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm mb-1">Gym Name</label>
                            <Input defaultValue="NeoGym Fitness Center" />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">Address</label>
                            <Input defaultValue="123 Fitness Street, Workout City, WO 12345" />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">Contact Phone</label>
                            <Input defaultValue="+1 (555) 987-6543" />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">Contact Email</label>
                            <Input defaultValue="info@neogym.com" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Operating Hours</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm">Monday - Friday</label>
                            <Input defaultValue="5:00 AM - 11:00 PM" className="w-40" />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm">Saturday</label>
                            <Input defaultValue="6:00 AM - 10:00 PM" className="w-40" />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm">Sunday</label>
                            <Input defaultValue="7:00 AM - 8:00 PM" className="w-40" />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm">Holidays</label>
                            <Input defaultValue="8:00 AM - 6:00 PM" className="w-40" />
                          </div>
                        </div>
                        
                        <h4 className="font-medium mb-3 mt-6">Membership Settings</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm mb-1">Trial Period (Days)</label>
                            <Input type="number" defaultValue="7" />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">Default Membership Duration</label>
                            <Select defaultValue="monthly">
                              <SelectTrigger>
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="quarterly">Quarterly</SelectItem>
                                <SelectItem value="biannual">Bi-Annual</SelectItem>
                                <SelectItem value="annual">Annual</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="bg-neogym-red hover:bg-neogym-red/90 text-white mt-6">
                      Save Settings
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="security" className="p-6">
                    <h3 className="text-lg font-bold mb-4">Security Settings</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-3">Change Password</h4>
                        <div className="space-y-3 max-w-md">
                          <div>
                            <label className="block text-sm mb-1">Current Password</label>
                            <Input type="password" />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">New Password</label>
                            <Input type="password" />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">Confirm New Password</label>
                            <Input type="password" />
                          </div>
                          <Button className="mt-2">Update Password</Button>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Two-Factor Authentication</h4>
                        <div className="flex items-center justify-between max-w-md">
                          <div>
                            <p className="text-sm">Enable two-factor authentication for added security</p>
                            <p className="text-xs text-gray-500 mt-1">Protect your account with an additional security layer</p>
                          </div>
                          <input type="checkbox" className="w-4 h-4" />
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Login History</h4>
                        <div className="bg-gray-50 rounded-md p-4 max-w-md">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium">Today, 8:45 AM</p>
                                <p className="text-xs text-gray-500">Chrome on Windows</p>
                              </div>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Current</span>
                            </div>
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium">Yesterday, 6:30 PM</p>
                                <p className="text-xs text-gray-500">Safari on Mac</p>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium">April 1, 2025, 9:15 AM</p>
                                <p className="text-xs text-gray-500">Firefox on Windows</p>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="mt-3 w-full">View Full History</Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          )}
        </main>
      </div>
  );
};

export default AdminDashboard;
