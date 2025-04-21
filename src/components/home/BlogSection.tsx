
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    title: "10 Tips for Building Muscle Effectively",
    excerpt: "Learn the essential strategies to build muscle mass efficiently and effectively with our expert guide.",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "April 2, 2025",
    author: "Michael Johnson",
    category: "Strength Training"
  },
  {
    title: "The Ultimate Guide to Proper Nutrition",
    excerpt: "Discover how proper nutrition can transform your fitness results and overall wellness.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "March 28, 2025",
    author: "Sarah Thompson",
    category: "Nutrition"
  },
  {
    title: "5 Common Workout Mistakes to Avoid",
    excerpt: "Avoid these common pitfalls that could be holding you back from reaching your fitness goals.",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "March 20, 2025",
    author: "David Rodriguez",
    category: "Fitness Tips"
  }
];

const BlogSection = () => {
  return (
    <section className="section-padding bg-gray-100 animate-fade-in">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            Latest from the <span className="text-neogym-red">Blog</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{animationDelay:'0.1s',animationFillMode:'both'}}>
            Stay updated with the latest fitness tips, success stories, and health advice from our experts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => (
            <Card key={idx} className="overflow-hidden hover-scale animate-fade-in" style={{animationDelay:`${0.15+idx*0.09}s`,animationFillMode:'both'}}>
              <div className="h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-neogym-red/10 text-neogym-red text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm ml-3">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    By <span className="font-semibold">{post.author}</span>
                  </div>
                  <Link to="/blog" className="text-neogym-red font-semibold hover:underline flex items-center">
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/blog">
            <Button className="bg-neogym-dark hover:bg-neogym-dark/90 text-white animate-fade-in hover-scale">
              View All Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
