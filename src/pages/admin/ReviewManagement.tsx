
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
  X, 
  Star, 
  Info, 
  MessageCircle, 
  AlertTriangle, 
  CheckCircle, 
  XCircle 
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

interface Review {
  id: number;
  name: string;
  email: string;
  userId?: number;
  image: string;
  date: string;
  stars: number;
  text: string;
  status: 'pending' | 'approved' | 'rejected';
  category: string;
  response?: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    name: "Michael Thompson",
    email: "michael.t@example.com",
    userId: 123,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100",
    date: "2025-04-01",
    stars: 5,
    text: "The personal trainers here are phenomenal! I've lost 15 pounds in just 2 months with their help and expert advice.",
    status: "pending",
    category: "training"
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    userId: 456,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100",
    date: "2025-04-02",
    stars: 2,
    text: "I find the gym overcrowded during peak hours. It's hard to get on machines and sometimes I have to wait 15-20 minutes.",
    status: "pending",
    category: "facilities"
  },
  {
    id: 3,
    name: "James Rodriguez",
    email: "james.r@example.com",
    userId: 789,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100",
    date: "2025-04-03",
    stars: 4,
    text: "Great variety of classes! The spinning instructor is particularly motivating. Would appreciate a few more class options on weekends.",
    status: "approved",
    category: "classes",
    response: "Thank you for your feedback, James! We're looking into adding more weekend classes in our next schedule update."
  },
  {
    id: 4,
    name: "Lisa Chen",
    email: "lisa.c@example.com",
    userId: 101,
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=100",
    date: "2025-04-04",
    stars: 1,
    text: "I cancelled my membership due to poor customer service. When I asked for help with adjusting equipment, the staff was dismissive and unhelpful.",
    status: "rejected",
    category: "service"
  },
  {
    id: 5,
    name: "Robert Johnson",
    email: "robert.j@example.com",
    userId: 202,
    image: "https://images.unsplash.com/photo-1546456073-92b9f0a8d413?auto=format&fit=crop&w=100",
    date: "2025-04-05",
    stars: 5,
    text: "The new squat racks are amazing! So much more stable than the old ones. The gym keeps investing in top-notch equipment and it shows.",
    status: "approved",
    category: "facilities"
  }
];

const ReviewManagement = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [responseText, setResponseText] = useState("");
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  
  const pendingReviews = reviews.filter(review => review.status === 'pending');
  const approvedReviews = reviews.filter(review => review.status === 'approved');
  const rejectedReviews = reviews.filter(review => review.status === 'rejected');

  const handleApproveReview = (id: number) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, status: 'approved' } : review
    ));
    
    toast({
      title: "Review approved",
      description: "The review has been published to the website"
    });
  };

  const handleRejectReview = (id: number) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, status: 'rejected' } : review
    ));
    
    toast({
      title: "Review rejected",
      description: "The review has been rejected and will not be displayed"
    });
  };

  const handleOpenResponseDialog = (review: Review) => {
    setSelectedReview(review);
    setResponseText(review.response || "");
    setIsResponseDialogOpen(true);
  };

  const handleSubmitResponse = () => {
    if (!selectedReview) return;
    
    setReviews(reviews.map(review => 
      review.id === selectedReview.id ? { ...review, response: responseText } : review
    ));
    
    toast({
      title: "Response added",
      description: "Your response has been added to the review"
    });
    
    setIsResponseDialogOpen(false);
  };

  const handleViewReview = (review: Review) => {
    setSelectedReview(review);
    setIsViewDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderReviewCard = (review: Review) => (
    <Card key={review.id} className="mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <img 
                src={review.image} 
                alt={review.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h3 className="font-semibold">{review.name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <span>{review.date}</span>
                <span className="mx-2">•</span>
                <span>{review.category}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            {getStatusBadge(review.status)}
          </div>
        </div>
        
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${
                i < review.stars 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300'
              }`} 
            />
          ))}
        </div>
        
        <p className="text-gray-700 mb-4">
          {review.text.length > 150 
            ? `${review.text.substring(0, 150)}...` 
            : review.text
          }
        </p>
        
        {review.response && (
          <div className="bg-gray-50 p-3 rounded-md mb-4">
            <p className="text-sm font-medium mb-1">Your response:</p>
            <p className="text-sm text-gray-600">
              {review.response.length > 100
                ? `${review.response.substring(0, 100)}...`
                : review.response
              }
            </p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleViewReview(review)}
          >
            <Info className="h-4 w-4 mr-1" /> View
          </Button>
          
          {review.status === 'pending' && (
            <>
              <Button 
                variant="outline" 
                size="sm"
                className="text-green-600 border-green-600 hover:bg-green-50"
                onClick={() => handleApproveReview(review.id)}
              >
                <Check className="h-4 w-4 mr-1" /> Approve
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="text-red-600 border-red-600 hover:bg-red-50"
                onClick={() => handleRejectReview(review.id)}
              >
                <X className="h-4 w-4 mr-1" /> Reject
              </Button>
            </>
          )}
          
          {review.status === 'approved' && (
            <Button 
              variant="outline" 
              size="sm"
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
              onClick={() => handleOpenResponseDialog(review)}
            >
              <MessageCircle className="h-4 w-4 mr-1" /> {review.response ? 'Edit Response' : 'Respond'}
            </Button>
          )}
          
          {review.status !== 'pending' && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">Actions</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {review.status === 'rejected' && (
                  <DropdownMenuItem onClick={() => handleApproveReview(review.id)}>
                    <CheckCircle className="h-4 w-4 mr-2" /> Approve Instead
                  </DropdownMenuItem>
                )}
                {review.status === 'approved' && (
                  <DropdownMenuItem onClick={() => handleRejectReview(review.id)}>
                    <XCircle className="h-4 w-4 mr-2" /> Reject Instead
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => {
                  setReviews(reviews.filter(r => r.id !== review.id));
                  toast({
                    title: "Review deleted",
                    description: "The review has been permanently removed"
                  });
                }}>
                  <AlertTriangle className="h-4 w-4 mr-2" /> Delete Permanently
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Review Management</h1>
        <p className="text-gray-600">Moderate and respond to member reviews</p>
      </div>
      
      <div className="mb-6">
        <Alert>
          <AlertDescription>
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-yellow-600" />
              <span><strong>{pendingReviews.length}</strong> pending {pendingReviews.length === 1 ? 'review' : 'reviews'} require your attention</span>
            </div>
          </AlertDescription>
        </Alert>
      </div>
      
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="pending" className="relative">
            Pending
            {pendingReviews.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {pendingReviews.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-0">
          {pendingReviews.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <MessageCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No pending reviews</h3>
              <p className="text-gray-500">All reviews have been moderated</p>
            </div>
          ) : (
            pendingReviews.map(renderReviewCard)
          )}
        </TabsContent>
        
        <TabsContent value="approved" className="mt-0">
          {approvedReviews.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <CheckCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No approved reviews</h3>
              <p className="text-gray-500">Approved reviews will appear here</p>
            </div>
          ) : (
            approvedReviews.map(renderReviewCard)
          )}
        </TabsContent>
        
        <TabsContent value="rejected" className="mt-0">
          {rejectedReviews.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <XCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No rejected reviews</h3>
              <p className="text-gray-500">Rejected reviews will appear here</p>
            </div>
          ) : (
            rejectedReviews.map(renderReviewCard)
          )}
        </TabsContent>
      </Tabs>
      
      {/* View Review Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
          </DialogHeader>
          
          {selectedReview && (
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={selectedReview.image} 
                    alt={selectedReview.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedReview.name}</h3>
                  <p className="text-sm text-gray-500">{selectedReview.email}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{selectedReview.date}</span>
                    <span className="mx-2">•</span>
                    <span>{selectedReview.category}</span>
                    <span className="mx-2">•</span>
                    {getStatusBadge(selectedReview.status)}
                  </div>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${
                      i < selectedReview.stars 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700">{selectedReview.text}</p>
              </div>
              
              {selectedReview.response && (
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <p className="font-medium mb-2">Your response:</p>
                  <p className="text-gray-600">{selectedReview.response}</p>
                </div>
              )}
              
              <DialogFooter>
                {selectedReview.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="text-red-600 border-red-600 hover:bg-red-50"
                      onClick={() => {
                        handleRejectReview(selectedReview.id);
                        setIsViewDialogOpen(false);
                      }}
                    >
                      Reject
                    </Button>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        handleApproveReview(selectedReview.id);
                        setIsViewDialogOpen(false);
                      }}
                    >
                      Approve
                    </Button>
                  </div>
                )}
                {selectedReview.status === 'approved' && (
                  <Button 
                    onClick={() => {
                      handleOpenResponseDialog(selectedReview);
                      setIsViewDialogOpen(false);
                    }}
                  >
                    {selectedReview.response ? 'Edit Response' : 'Add Response'}
                  </Button>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Response Dialog */}
      <Dialog open={isResponseDialogOpen} onOpenChange={setIsResponseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedReview?.response ? 'Edit Response' : 'Add Response'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedReview && (
            <div>
              <div className="mb-4 p-4 bg-gray-50 rounded-md">
                <p className="text-sm font-medium mb-1">Review from {selectedReview.name}:</p>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < selectedReview.stars 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-700">{selectedReview.text}</p>
              </div>
              
              <div className="space-y-2 mb-4">
                <label htmlFor="response" className="block font-medium text-sm">
                  Your Response
                </label>
                <Textarea
                  id="response"
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Write your response to this review..."
                  rows={5}
                />
                <p className="text-xs text-gray-500">
                  Your response will be publicly visible alongside the review.
                </p>
              </div>
              
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsResponseDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmitResponse}
                  disabled={!responseText.trim()}
                >
                  {selectedReview.response ? 'Update Response' : 'Add Response'}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewManagement;
