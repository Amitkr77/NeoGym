
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Calendar,
  Users,
  Home,
  LogOut,
  Settings,
  User,
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

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
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
  const filteredMembers = adminData.recentMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.membership.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                className="bg-white rounded-lg shadow-md overflow-hidden"
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
                        {adminData.recentMembers.slice(0, 4).map((member) => (
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
                <Button className="bg-neogym-red hover:bg-neogym-red/90 text-white">
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
              
              {/* Pagination */}
              <div className="flex justify-between items-center mt-6">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredMembers.length}</span> of <span className="font-medium">{adminData.stats.totalMembers}</span> members
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
          </motion.div>
        )}

        {/* Placeholder for other tabs */}
        {(activeTab === 'classes' || activeTab === 'finances' || 
          activeTab === 'equipment' || activeTab === 'reports' || activeTab === 'settings') && (
          <motion.div
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-6">
              {activeTab === 'classes' && 'Class Management'}
              {activeTab === 'finances' && 'Financial Reports'}
              {activeTab === 'equipment' && 'Equipment Management'}
              {activeTab === 'reports' && 'Reports'}
              {activeTab === 'settings' && 'System Settings'}
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

export default AdminDashboard;
