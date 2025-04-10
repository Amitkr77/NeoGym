
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, AlertCircle, CheckCircle, Calendar as CalendarIcon } from "lucide-react";
import ClassBookingModal from "./ClassBookingModal";

const classScheduleData = [
  { 
    id: 1, 
    name: "Yoga", 
    trainer: "Sarah Williams", 
    time: "08:00 AM - 09:00 AM", 
    capacity: "15/20",
    days: ["Monday", "Wednesday", "Friday"]
  },
  { 
    id: 2, 
    name: "HIIT", 
    trainer: "Mike Johnson", 
    time: "06:00 PM - 07:00 PM", 
    capacity: "12/15",
    days: ["Tuesday", "Thursday"]
  },
  { 
    id: 3, 
    name: "Spin", 
    trainer: "Jane Smith", 
    time: "07:00 PM - 08:00 PM", 
    capacity: "18/20", 
    days: ["Monday", "Wednesday"]
  },
  { 
    id: 4, 
    name: "Pilates", 
    trainer: "John Doe", 
    time: "10:00 AM - 11:00 AM", 
    capacity: "8/12",
    days: ["Tuesday", "Thursday", "Saturday"]
  },
  { 
    id: 5, 
    name: "Boxing", 
    trainer: "Mike Johnson", 
    time: "05:00 PM - 06:00 PM", 
    capacity: "10/10", 
    days: ["Monday", "Friday"]
  },
];

const myBookingsData = [
  { 
    id: 1, 
    className: "Yoga", 
    date: "April 15, 2023", 
    time: "08:00 AM - 09:00 AM", 
    trainer: "Sarah Williams", 
    status: "upcoming" 
  },
  { 
    id: 2, 
    className: "HIIT", 
    date: "April 18, 2023", 
    time: "06:00 PM - 07:00 PM", 
    trainer: "Mike Johnson", 
    status: "upcoming" 
  },
  { 
    id: 3, 
    className: "Spin", 
    date: "April 3, 2023", 
    time: "07:00 PM - 08:00 PM", 
    trainer: "Jane Smith", 
    status: "completed" 
  },
  { 
    id: 4, 
    className: "Pilates", 
    date: "March 28, 2023", 
    time: "10:00 AM - 11:00 AM", 
    trainer: "John Doe", 
    status: "completed" 
  },
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const ClassScheduleTab = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Class Schedule</CardTitle>
            <Button 
              onClick={() => setIsBookingModalOpen(true)} 
              className="bg-neogym-red hover:bg-neogym-red/90"
            >
              Book a Class
            </Button>
          </div>
          <CardDescription>View and book fitness classes</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="schedule" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="schedule">
              <div className="overflow-x-auto">
                <table className="min-w-full border rounded-md">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 border-b text-left font-medium text-sm">Class</th>
                      {daysOfWeek.map(day => (
                        <th key={day} className="py-2 px-4 border-b text-left font-medium text-sm">{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {classScheduleData.map(classItem => (
                      <tr key={classItem.id} className="border-b last:border-b-0">
                        <td className="py-3 px-4">
                          <div className="font-medium">{classItem.name}</div>
                          <div className="text-xs text-gray-500">{classItem.trainer}</div>
                          <div className="text-xs flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {classItem.time}
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <Users className="h-3 w-3 mr-1" />
                            {classItem.capacity}
                          </div>
                        </td>
                        {daysOfWeek.map(day => (
                          <td key={day} className="py-3 px-4">
                            {classItem.days.includes(day) ? (
                              <Button 
                                onClick={() => setIsBookingModalOpen(true)}
                                size="sm"
                                className="w-full bg-neogym-red hover:bg-neogym-red/90 text-xs"
                              >
                                Book
                              </Button>
                            ) : (
                              <div className="text-center text-gray-300">—</div>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="bookings">
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <h3 className="font-medium mr-2">Filter:</h3>
                  <Button variant="outline" size="sm" className="mr-2">All</Button>
                  <Button variant="outline" size="sm" className="mr-2 bg-blue-50 border-blue-200">Upcoming</Button>
                  <Button variant="outline" size="sm">Completed</Button>
                </div>
                
                {myBookingsData.map(booking => (
                  <div key={booking.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-lg">{booking.className}</h4>
                        <div className="text-sm flex items-center mt-1">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {booking.date}
                        </div>
                        <div className="text-sm flex items-center mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          {booking.time}
                        </div>
                        <div className="text-sm mt-1">
                          Instructor: {booking.trainer}
                        </div>
                      </div>
                      <div>
                        {booking.status === 'upcoming' ? (
                          <div className="flex items-center text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            Upcoming
                          </div>
                        ) : (
                          <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Completed
                          </div>
                        )}
                      </div>
                    </div>
                    {booking.status === 'upcoming' && (
                      <div className="flex mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2"
                        >
                          Reschedule
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 border-red-200 hover:bg-red-50"
                        >
                          Cancel Booking
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <ClassBookingModal 
        open={isBookingModalOpen} 
        onOpenChange={setIsBookingModalOpen} 
      />
    </div>
  );
};

export default ClassScheduleTab;
