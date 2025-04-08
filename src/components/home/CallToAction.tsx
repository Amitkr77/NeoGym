
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, Clock } from 'lucide-react';

const CallToAction = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [tourForm, setTourForm] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleTourFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTourForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setTourForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitTour = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!tourForm.name || !tourForm.email || !tourForm.phone || !tourForm.preferredDate || !tourForm.preferredTime) {
      toast({
        title: "Please complete all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Here we would normally submit to backend
    toast({
      title: "Tour request submitted!",
      description: "We'll contact you shortly to confirm your booking."
    });
    
    // Reset form and close modal
    setTourForm({
      name: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    });
    setIsTourModalOpen(false);
  };

  return (
    <section className="py-20 bg-neogym-dark text-white relative overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 opacity-70 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      />
      <div className="absolute inset-0 bg-black opacity-70 z-10"></div>

      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Start Your <span className="text-neogym-red">Fitness Journey</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join NeoGym today and take the first step towards a healthier, stronger you. 
            Our expert trainers and state-of-the-art facilities are waiting for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-neogym-red hover:bg-neogym-red/90 text-white text-lg px-10 py-6"
              onClick={() => navigate(isLoggedIn ? '/dashboard' : '/signup')}
            >
              {isLoggedIn ? 'Go to Dashboard' : 'Join NeoGym Today'}
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 text-lg px-10 py-6"
              onClick={() => setIsTourModalOpen(true)}
            >
              Book a Free Tour
            </Button>
          </div>
        </div>
      </div>

      {/* Tour Booking Modal */}
      <Dialog open={isTourModalOpen} onOpenChange={setIsTourModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book a Free Gym Tour</DialogTitle>
            <DialogDescription>
              Schedule a free tour to see our facilities and meet our team. 
              We'll show you around and answer any questions you may have.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitTour} className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name*</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Your name" 
                  value={tourForm.name}
                  onChange={handleTourFormChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email*</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="Your email" 
                  value={tourForm.email}
                  onChange={handleTourFormChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number*</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  placeholder="Your phone number" 
                  value={tourForm.phone}
                  onChange={handleTourFormChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Preferred Date*</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      id="preferredDate" 
                      name="preferredDate" 
                      type="date" 
                      className="pl-10"
                      value={tourForm.preferredDate}
                      onChange={handleTourFormChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="preferredTime">Preferred Time*</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Select 
                      value={tourForm.preferredTime} 
                      onValueChange={(value) => handleSelectChange('preferredTime', value)}
                    >
                      <SelectTrigger id="preferredTime" className="pl-10">
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
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Additional Information (Optional)</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  placeholder="Let us know if you have any specific areas of interest or questions"
                  rows={3}
                  value={tourForm.message}
                  onChange={handleTourFormChange}
                />
              </div>
            </div>
            
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsTourModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-neogym-red hover:bg-neogym-red/90">
                Book Tour
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CallToAction;
