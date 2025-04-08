
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent } from '../components/ui/card';
import { Star, MessageSquarePlus, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '../components/ui/textarea';
import { useNavigate, useLocation } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const allTestimonials = [
  {
    id: 1,
    name: "Jessica Smith",
    role: "Member for 2 years",
    image: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    stars: 5,
    text: "NeoGym transformed my fitness journey. The trainers are incredibly supportive and the facility is top-notch. I've achieved results I never thought possible!",
    category: "training"
  },
  {
    id: 2,
    name: "Mark Wilson",
    role: "Member for 1 year",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    stars: 5,
    text: "The personal training at NeoGym is exceptional. My trainer created a customized plan that helped me lose 30 pounds in 6 months. The community here is amazing!",
    category: "training"
  },
  {
    id: 3,
    name: "Amy Chen",
    role: "Member for 3 years",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    stars: 4,
    text: "I love the variety of classes at NeoGym. The yoga and HIIT classes are my favorites, and the instructors are knowledgeable and motivating.",
    category: "classes"
  },
  {
    id: 4,
    name: "Robert James",
    role: "Member for 6 months",
    image: "https://images.unsplash.com/photo-1542178243-bc20204b769f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    stars: 5,
    text: "As a beginner, I was intimidated at first, but the staff at NeoGym made me feel welcome from day one. The equipment is modern and well-maintained.",
    category: "facilities"
  },
  {
    id: 5,
    name: "Emily Rodriguez",
    role: "Member for 2 years",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    stars: 5,
    text: "The atmosphere at NeoGym is so motivating! I love how clean and well-organized everything is. The staff remembers my name and always checks in on my progress.",
    category: "facilities"
  },
  {
    id: 6,
    name: "David Kim",
    role: "Member for 8 months",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    stars: 4,
    text: "The nutrition guidance I received as part of my membership has been invaluable. I've completely changed my relationship with food, and combined with the workouts, I'm seeing amazing results.",
    category: "nutrition"
  },
  {
    id: 7,
    name: "Sarah Johnson",
    role: "Member for 1 year",
    image: "https://images.unsplash.com/photo-1499887142886-791eca5918cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    stars: 5,
    text: "I joined NeoGym after trying several other gyms in the area. The difference is night and day - from the equipment quality to the instructors' expertise. Worth every penny!",
    category: "facilities"
  },
  {
    id: 8,
    name: "Michael Brown",
    role: "Member for 3 months",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    stars: 4,
    text: "The HIIT classes here are challenging but so rewarding. I've improved my endurance significantly and have met some great workout buddies in the process.",
    category: "classes"
  }
];

const categories = [
  { value: "all", label: "All Reviews" },
  { value: "training", label: "Personal Training" },
  { value: "classes", label: "Group Classes" },
  { value: "facilities", label: "Facilities & Equipment" },
  { value: "nutrition", label: "Nutrition & Wellness" }
];

const ReviewsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filteredReviews, setFilteredReviews] = useState(allTestimonials);
  
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('auth_token');
    setIsLoggedIn(!!token);
    
    // Check for redirect from login page
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('redirect') === 'reviews' && token) {
      setIsReviewDialogOpen(true);
    }
  }, [location.search]);
  
  useEffect(() => {
    if (filterCategory === "all") {
      setFilteredReviews(allTestimonials);
    } else {
      setFilteredReviews(allTestimonials.filter(review => review.category === filterCategory));
    }
  }, [filterCategory]);

  const handleAddReview = () => {
    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      navigate('/login?redirect=reviews');
      return;
    }
    
    setIsReviewDialogOpen(true);
  };

  const handleSubmitReview = () => {
    if (reviewText.trim().length === 0) {
      toast({
        title: "Review text is required",
        description: "Please share your experience in the review.",
        variant: "destructive"
      });
      return;
    }

    // Here we would normally submit the review to a backend
    // For now we'll just show a success toast
    toast({
      title: "Review submitted",
      description: "Thank you for sharing your experience! Your review is pending approval.",
    });
    
    setIsReviewDialogOpen(false);
    setReviewText("");
    setRating(5);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-neogym-dark py-24">
        <div className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl text-white font-bold mb-6">Member <span className="text-neogym-red">Reviews</span></h1>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">See what our community has to say about their fitness journey at NeoGym.</p>
          <Button 
            className="bg-neogym-red hover:bg-neogym-red/90 flex items-center gap-2"
            onClick={handleAddReview}
          >
            <MessageSquarePlus size={16} />
            Share Your Experience
          </Button>
        </div>
      </div>
      
      {/* Reviews Content */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Filter controls */}
          <div className="mb-12 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-bold">
              {filterCategory === "all" ? "All Reviews" : categories.find(c => c.value === filterCategory)?.label}
            </h2>
            
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter reviews" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Reviews grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReviews.map((review) => (
              <Card key={review.id} className="hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={review.image} 
                        alt={review.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{review.name}</h4>
                      <p className="text-sm text-gray-500">{review.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${
                          i < review.stars 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-gray-600 italic">"{review.text}"</p>
                  
                  <div className="mt-4">
                    <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {categories.find(c => c.value === review.category)?.label || review.category}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredReviews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No reviews found in this category.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Share Your Experience</DialogTitle>
          <DialogDescription>
            Let others know about your experience at NeoGym. Your review will be published after approval.
          </DialogDescription>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star 
                      className={`h-6 w-6 ${
                        star <= rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select defaultValue="facilities">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter(c => c.value !== "all").map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="review" className="block text-sm font-medium mb-2">Your Review</label>
              <Textarea
                id="review"
                placeholder="Share your experience with NeoGym..."
                rows={5}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" className="bg-neogym-red hover:bg-neogym-red/90" onClick={handleSubmitReview}>
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ReviewsPage;
