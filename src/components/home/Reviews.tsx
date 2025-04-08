
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Star, MessageSquarePlus } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '../ui/textarea';
import { useNavigate } from 'react-router-dom';

const testimonials = [
  {
    name: "Jessica Smith",
    role: "Member for 2 years",
    image: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    stars: 5,
    text: "NeoGym transformed my fitness journey. The trainers are incredibly supportive and the facility is top-notch. I've achieved results I never thought possible!"
  },
  {
    name: "Mark Wilson",
    role: "Member for 1 year",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    stars: 5,
    text: "The personal training at NeoGym is exceptional. My trainer created a customized plan that helped me lose 30 pounds in 6 months. The community here is amazing!"
  },
  {
    name: "Amy Chen",
    role: "Member for 3 years",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    stars: 4,
    text: "I love the variety of classes at NeoGym. The yoga and HIIT classes are my favorites, and the instructors are knowledgeable and motivating."
  },
  {
    name: "Robert James",
    role: "Member for 6 months",
    image: "https://images.unsplash.com/photo-1542178243-bc20204b769f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    stars: 5,
    text: "As a beginner, I was intimidated at first, but the staff at NeoGym made me feel welcome from day one. The equipment is modern and well-maintained."
  }
];

const Reviews = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('auth_token');
    setIsLoggedIn(!!token);
  }, []);

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
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-neogym-red">Members Say</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our members have to say about their experience at NeoGym.
          </p>
          <Button 
            className="mt-4 bg-neogym-red hover:bg-neogym-red/90 flex items-center gap-2"
            onClick={handleAddReview}
          >
            <MessageSquarePlus size={16} />
            Share Your Experience
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover-scale">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < testimonial.stars 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="/reviews" className="inline-block text-neogym-red font-bold hover:underline">
            View All Reviews
          </a>
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
      </div>
    </section>
  );
};

export default Reviews;
