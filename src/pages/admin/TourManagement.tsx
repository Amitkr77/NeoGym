
import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '../../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  Check, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  User, 
  Map, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  CalendarDays,
  MessageSquare
} from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { useToast } from '../../hooks/use-toast';
import { Textarea } from '../../components/ui/textarea';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../../components/ui/dropdown-menu';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

interface Tour {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  assignedTo?: string;
  createdAt: string;
}

const mockTours: Tour[] = [
  {
    id: 1,
    name: "Jennifer Adams",
    email: "jennifer.a@example.com",
    phone: "555-123-4567",
    date: "2025-04-15",
    time: "Morning (9am-12pm)",
    message: "I'm interested in learning more about your personal training options.",
    status: "pending",
    createdAt: "2025-04-07"
  },
  {
    id: 2,
    name: "Thomas Wilson",
    email: "thomas.w@example.com",
    phone: "555-987-6543",
    date: "2025-04-16",
    time: "Afternoon (12pm-4pm)",
    status: "confirmed",
    assignedTo: "Sarah (Fitness Consultant)",
    createdAt: "2025-04-06"
  },
  {
    id: 3,
    name: "Maria Lopez",
    email: "maria.l@example.com",
    phone: "555-456-7890",
    date: "2025-04-10",
    time: "Evening (4pm-8pm)",
    message: "I've never been to a gym before and I'm a bit nervous. Looking for a beginner-friendly introduction.",
    status: "completed",
    notes: "Showed interest in the Premium membership. Follow up in one week.",
    assignedTo: "Carlos (Membership Advisor)",
    createdAt: "2025-04-03"
  },
  {
    id: 4,
    name: "Daniel Brown",
    email: "daniel.b@example.com",
    phone: "555-333-2222",
    date: "2025-04-12",
    time: "Morning (9am-12pm)",
    status: "cancelled",
    notes: "Cancelled due to scheduling conflict. Wants to reschedule for next week.",
    createdAt: "2025-04-04"
  },
  {
    id: 5,
    name: "Rebecca Johnson",
    email: "rebecca.j@example.com",
    phone: "555-777-8888",
    date: "2025-04-18",
    time: "Afternoon (12pm-4pm)",
    message: "I'm comparing several gyms in the area. Particularly interested in your group classes.",
    status: "pending",
    createdAt: "2025-04-08"
  }
];

const staffMembers = [
  { id: 1, name: "Sarah", role: "Fitness Consultant" },
  { id: 2, name: "Carlos", role: "Membership Advisor" },
  { id: 3, name: "Jasmine", role: "Personal Trainer" },
  { id: 4, name: "Marcus", role: "Facility Manager" }
];

const TourManagement = () => {
  const { toast } = useToast();
  const [tours, setTours] = useState<Tour[]>(mockTours);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editTourData, setEditTourData] = useState<Partial<Tour>>({});
  const [notesText, setNotesText] = useState("");
  const [assignedStaff, setAssignedStaff] = useState("");
  
  const pendingTours = tours.filter(tour => tour.status === 'pending');
  const confirmedTours = tours.filter(tour => tour.status === 'confirmed');
  const completedTours = tours.filter(tour => tour.status === 'completed');
  const cancelledTours = tours.filter(tour => tour.status === 'cancelled');

  const today = new Date().toISOString().split('T')[0];
  const upcomingTourToday = confirmedTours.filter(tour => tour.date === today);

  const handleStatusChange = (id: number, newStatus: Tour['status']) => {
    setTours(tours.map(tour => 
      tour.id === id ? { ...tour, status: newStatus } : tour
    ));
    
    const statusMessages = {
      confirmed: "Tour confirmed",
      completed: "Tour marked as completed",
      cancelled: "Tour cancelled"
    };
    
    toast({
      title: statusMessages[newStatus] || "Status updated",
      description: `The tour status has been updated to ${newStatus}`
    });
  };

  const handleViewTour = (tour: Tour) => {
    setSelectedTour(tour);
    setIsViewDialogOpen(true);
  };

  const handleOpenEditDialog = (tour: Tour) => {
    setSelectedTour(tour);
    setEditTourData({
      date: tour.date,
      time: tour.time,
      assignedTo: tour.assignedTo || ""
    });
    setNotesText(tour.notes || "");
    setAssignedStaff(tour.assignedTo?.split(" (")[0] || "");
    setIsEditDialogOpen(true);
  };

  const handleSaveChanges = () => {
    if (!selectedTour) return;
    
    const assignedString = assignedStaff 
      ? `${assignedStaff} (${staffMembers.find(s => s.name === assignedStaff)?.role || 'Staff'})`
      : undefined;
    
    setTours(tours.map(tour => 
      tour.id === selectedTour.id 
        ? { 
            ...tour, 
            date: editTourData.date || tour.date, 
            time: editTourData.time || tour.time,
            notes: notesText || undefined,
            assignedTo: assignedString
          } 
        : tour
    ));
    
    toast({
      title: "Changes saved",
      description: "The tour details have been updated"
    });
    
    setIsEditDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Confirmed</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderTourCard = (tour: Tour) => (
    <Card key={tour.id} className="mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold">{tour.name}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{tour.date}</span>
              <span className="mx-1">•</span>
              <Clock className="h-3 w-3 mr-1" />
              <span>{tour.time}</span>
            </div>
          </div>
          
          <div className="flex items-center">
            {getStatusBadge(tour.status)}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm">
            <Phone className="h-3 w-3 mr-2 text-gray-500" />
            <span>{tour.phone}</span>
          </div>
          <div className="flex items-center text-sm">
            <Mail className="h-3 w-3 mr-2 text-gray-500" />
            <span>{tour.email}</span>
          </div>
        </div>
        
        {tour.message && (
          <div className="mb-4">
            <p className="text-sm text-gray-700 italic line-clamp-2">"{tour.message}"</p>
          </div>
        )}
        
        {tour.assignedTo && (
          <div className="mb-4">
            <div className="flex items-center text-sm">
              <User className="h-3 w-3 mr-2 text-gray-500" />
              <span>Assigned to: <span className="font-medium">{tour.assignedTo}</span></span>
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleViewTour(tour)}
          >
            View Details
          </Button>
          
          {tour.status === 'pending' && (
            <Button 
              variant="outline" 
              size="sm"
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
              onClick={() => handleStatusChange(tour.id, 'confirmed')}
            >
              <Check className="h-4 w-4 mr-1" /> Confirm
            </Button>
          )}
          
          {tour.status === 'confirmed' && (
            <Button 
              variant="outline" 
              size="sm"
              className="text-green-600 border-green-600 hover:bg-green-50"
              onClick={() => handleStatusChange(tour.id, 'completed')}
            >
              <CheckCircle className="h-4 w-4 mr-1" /> Mark Completed
            </Button>
          )}
          
          {(tour.status === 'pending' || tour.status === 'confirmed') && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleOpenEditDialog(tour)}
            >
              Edit
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">More</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {(tour.status === 'pending' || tour.status === 'confirmed') && (
                <DropdownMenuItem onClick={() => handleStatusChange(tour.id, 'cancelled')}>
                  <XCircle className="h-4 w-4 mr-2" /> Cancel Tour
                </DropdownMenuItem>
              )}
              {tour.status === 'cancelled' && (
                <DropdownMenuItem onClick={() => handleStatusChange(tour.id, 'pending')}>
                  <AlertTriangle className="h-4 w-4 mr-2" /> Reactivate as Pending
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Tour Management</h1>
        <p className="text-gray-600">Schedule and manage facility tours for prospective members</p>
      </div>
      
      {upcomingTourToday.length > 0 && (
        <div className="mb-6">
          <Alert className="bg-blue-50 border-blue-200">
            <AlertDescription>
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-2 text-blue-600" />
                <span><strong>{upcomingTourToday.length}</strong> {upcomingTourToday.length === 1 ? 'tour is' : 'tours are'} scheduled for today!</span>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      <div className="mb-6">
        <Alert>
          <AlertDescription>
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-yellow-600" />
              <span><strong>{pendingTours.length}</strong> pending {pendingTours.length === 1 ? 'tour request' : 'tour requests'} require confirmation</span>
            </div>
          </AlertDescription>
        </Alert>
      </div>
      
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="pending" className="relative">
            Pending
            {pendingTours.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {pendingTours.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-0">
          {pendingTours.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No pending tour requests</h3>
              <p className="text-gray-500">All tour requests have been processed</p>
            </div>
          ) : (
            pendingTours.map(renderTourCard)
          )}
        </TabsContent>
        
        <TabsContent value="confirmed" className="mt-0">
          {confirmedTours.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No confirmed tours</h3>
              <p className="text-gray-500">Confirmed tours will appear here</p>
            </div>
          ) : (
            confirmedTours.map(renderTourCard)
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          {completedTours.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <CheckCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No completed tours</h3>
              <p className="text-gray-500">Completed tours will appear here</p>
            </div>
          ) : (
            completedTours.map(renderTourCard)
          )}
        </TabsContent>
        
        <TabsContent value="cancelled" className="mt-0">
          {cancelledTours.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <XCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No cancelled tours</h3>
              <p className="text-gray-500">Cancelled tours will appear here</p>
            </div>
          ) : (
            cancelledTours.map(renderTourCard)
          )}
        </TabsContent>
      </Tabs>
      
      {/* View Tour Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Tour Details</DialogTitle>
          </DialogHeader>
          
          {selectedTour && (
            <div>
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg">{selectedTour.name}</h3>
                  {getStatusBadge(selectedTour.status)}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                  <div>
                    <p className="text-sm text-gray-500">Contact Information</p>
                    <div className="flex items-center mt-1">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{selectedTour.phone}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{selectedTour.email}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Scheduled For</p>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{selectedTour.date}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{selectedTour.time}</span>
                    </div>
                  </div>
                </div>
                
                {selectedTour.assignedTo && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Assigned Staff</p>
                    <div className="flex items-center mt-1">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{selectedTour.assignedTo}</span>
                    </div>
                  </div>
                )}
                
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Request Received</p>
                  <div className="flex items-center mt-1">
                    <CalendarDays className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{selectedTour.createdAt}</span>
                  </div>
                </div>
              </div>
              
              {selectedTour.message && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Additional Information</h3>
                  <p className="text-gray-700 bg-blue-50 p-3 rounded-md italic">"{selectedTour.message}"</p>
                </div>
              )}
              
              {selectedTour.notes && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Staff Notes</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{selectedTour.notes}</p>
                </div>
              )}
              
              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenEditDialog(selectedTour)}
                >
                  Edit Details
                </Button>
                
                {selectedTour.status === 'pending' && (
                  <Button
                    type="button"
                    onClick={() => {
                      handleStatusChange(selectedTour.id, 'confirmed');
                      setIsViewDialogOpen(false);
                    }}
                  >
                    Confirm Tour
                  </Button>
                )}
                
                {selectedTour.status === 'confirmed' && (
                  <Button
                    type="button"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      handleStatusChange(selectedTour.id, 'completed');
                      setIsViewDialogOpen(false);
                    }}
                  >
                    Mark as Completed
                  </Button>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Edit Tour Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Tour Details</DialogTitle>
          </DialogHeader>
          
          {selectedTour && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="tourDate">Date</Label>
                  <Input 
                    id="tourDate"
                    type="date"
                    value={editTourData.date}
                    onChange={(e) => setEditTourData({...editTourData, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tourTime">Time</Label>
                  <Select 
                    value={editTourData.time} 
                    onValueChange={(value) => setEditTourData({...editTourData, time: value})}
                  >
                    <SelectTrigger id="tourTime">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Morning (9am-12pm)">Morning (9am-12pm)</SelectItem>
                      <SelectItem value="Afternoon (12pm-4pm)">Afternoon (12pm-4pm)</SelectItem>
                      <SelectItem value="Evening (4pm-8pm)">Evening (4pm-8pm)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <Label htmlFor="assignStaff">Assign Staff Member</Label>
                <Select 
                  value={assignedStaff} 
                  onValueChange={setAssignedStaff}
                >
                  <SelectTrigger id="assignStaff">
                    <SelectValue placeholder="Select staff member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Unassigned</SelectItem>
                    {staffMembers.map(staff => (
                      <SelectItem key={staff.id} value={staff.name}>
                        {staff.name} ({staff.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 mb-4">
                <Label htmlFor="notes">Staff Notes</Label>
                <Textarea
                  id="notes"
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="Add private notes about this tour (not visible to the client)"
                  rows={4}
                />
              </div>
              
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TourManagement;
