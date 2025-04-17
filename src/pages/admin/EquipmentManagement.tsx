import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dumbbell, MoreHorizontal, Plus, Search, Settings, Wrench, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import AddEquipmentModal from '@/components/dashboard/equipment/AddEquipmentModal';
import EditEquipmentModal from '@/components/dashboard/equipment/EditEquipmentModal';
import ScheduleMaintenanceModal from '@/components/dashboard/equipment/ScheduleMaintenanceModal';

const dummyEquipment = [
  {
    id: 1,
    name: "Treadmill",
    description: "Cardiovascular machine for walking or running in place.",
    category: "cardio",
    status: "operational",
    image: "/placeholder.svg",
    lastMaintenance: "2023-10-15",
    nextMaintenance: "2024-04-15",
  },
  {
    id: 2,
    name: "Bench Press",
    description: "Strength training equipment for chest muscles.",
    category: "strength",
    status: "operational",
    image: "/placeholder.svg",
    lastMaintenance: "2023-11-20",
    nextMaintenance: "2024-05-20",
  },
  {
    id: 3,
    name: "Leg Press",
    description: "Machine for lower body strength training.",
    category: "strength",
    status: "maintenance",
    image: "/placeholder.svg",
    lastMaintenance: "2024-01-30",
    nextMaintenance: "2024-07-30",
  },
  {
    id: 4,
    name: "Elliptical Trainer",
    description: "Low-impact cardiovascular machine.",
    category: "cardio",
    status: "operational",
    image: "/placeholder.svg",
    lastMaintenance: "2023-12-05",
    nextMaintenance: "2024-06-05",
  }
];

const EquipmentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [equipment, setEquipment] = useState(dummyEquipment);
  const [selectedEquipment, setSelectedEquipment] = useState<any | null>(null);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddEquipment = (newEquipment: any) => {
    const equipmentWithId = {
      ...newEquipment,
      id: equipment.length + 1,
    };
    setEquipment([...equipment, equipmentWithId]);
    toast({
      title: "Equipment Added",
      description: `${newEquipment.name} has been added successfully.`,
    });
  };

  const handleEditEquipment = (updatedEquipment: any) => {
    setEquipment(equipment.map(item => 
      item.id === updatedEquipment.id ? updatedEquipment : item
    ));
    toast({
      title: "Equipment Updated",
      description: `${updatedEquipment.name} has been updated successfully.`,
    });
  };

  const handleScheduleMaintenance = (equipmentId: number, maintenanceData: any) => {
    setEquipment(equipment.map(item => 
      item.id === equipmentId 
        ? { 
            ...item, 
            status: "maintenance",
            lastMaintenance: new Date().toISOString().split('T')[0],
            nextMaintenance: maintenanceData.nextMaintenance
          } 
        : item
    ));
    toast({
      title: "Maintenance Scheduled",
      description: `Maintenance has been scheduled for the selected equipment.`,
    });
  };

  const handleDeleteEquipment = () => {
    if (!selectedEquipment) return;
    
    setEquipment(equipment.filter(item => item.id !== selectedEquipment.id));
    setIsDeleteDialogOpen(false);
    toast({
      title: "Equipment Deleted",
      description: `${selectedEquipment.name} has been removed from the system.`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Equipment Management</h1>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Equipment
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="cardio">Cardio</SelectItem>
                <SelectItem value="strength">Strength</SelectItem>
                <SelectItem value="flexibility">Flexibility</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="maintenance">Under Maintenance</SelectItem>
                <SelectItem value="outOfService">Out of Service</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Maintenance</TableHead>
                <TableHead>Next Maintenance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEquipment.length > 0 ? (
                filteredEquipment.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded overflow-hidden mr-3">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        {item.name}
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{item.category}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          item.status === 'operational' ? 'default' : 
                          item.status === 'maintenance' ? 'secondary' : 'destructive'
                        }
                      >
                        {item.status === 'operational' 
                          ? 'Operational' 
                          : item.status === 'maintenance' 
                            ? 'Under Maintenance' 
                            : 'Out of Service'}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.lastMaintenance}</TableCell>
                    <TableCell>{item.nextMaintenance}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => {
                            setSelectedEquipment(item);
                            setIsEditModalOpen(true);
                          }}>
                            <Settings className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedEquipment(item);
                            setIsMaintenanceModalOpen(true);
                          }}>
                            <Wrench className="mr-2 h-4 w-4" />
                            Schedule Maintenance
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive"
                            onClick={() => {
                              setSelectedEquipment(item);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    No equipment found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <AddEquipmentModal 
          open={isAddModalOpen} 
          onOpenChange={setIsAddModalOpen}
        />

        {selectedEquipment && (
          <EditEquipmentModal
            open={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
            equipment={selectedEquipment}
            onSave={handleEditEquipment}
          />
        )}

        {selectedEquipment && (
          <ScheduleMaintenanceModal
            equipmentId={selectedEquipment.id.toString()}
          />
        )}

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedEquipment?.name}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteEquipment}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default EquipmentManagement;
