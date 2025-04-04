
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight, Calendar, User, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Building Muscle Fast",
    excerpt: "Discover the most effective strategies for building muscle mass quickly while maintaining a healthy lifestyle.",
    author: "Michael Johnson",
    date: "April 2, 2025",
    category: "Strength Training",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["muscle growth", "strength training", "nutrition"]
  },
  {
    id: 2,
    title: "The Ultimate Guide to Cardio Workouts",
    excerpt: "Everything you need to know about effective cardio training for fat loss, endurance, and overall health.",
    author: "Sarah Williams",
    date: "March 28, 2025",
    category: "Cardio",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["cardio", "fat loss", "endurance"]
  },
  {
    id: 3,
    title: "Nutrition 101: What to Eat Before and After Workouts",
    excerpt: "Learn the optimal nutrition timing and food choices to maximize your workout performance and recovery.",
    author: "David Chen",
    date: "March 15, 2025",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["nutrition", "meal planning", "recovery"]
  },
  {
    id: 4,
    title: "How to Create a Balanced Workout Routine",
    excerpt: "Find the perfect balance between strength, cardio, and flexibility training for optimal results.",
    author: "Emily Rodriguez",
    date: "March 10, 2025",
    category: "Fitness Planning",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["workout routine", "fitness plan", "balance"]
  },
  {
    id: 5,
    title: "The Science Behind HIIT Workouts",
    excerpt: "Explore the scientific principles that make High-Intensity Interval Training so effective for fitness gains.",
    author: "Michael Johnson",
    date: "February 22, 2025",
    category: "HIIT",
    image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["HIIT", "science", "workout efficiency"]
  },
  {
    id: 6,
    title: "Mind-Muscle Connection: The Key to Effective Training",
    excerpt: "Understanding how to establish a strong mind-muscle connection can dramatically improve your workout results.",
    author: "Sarah Williams",
    date: "February 15, 2025",
    category: "Training Techniques",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["mind-muscle connection", "training techniques", "focus"]
  }
];

// Sample categories
const categories = [
  "All",
  "Strength Training",
  "Cardio",
  "Nutrition",
  "HIIT",
  "Fitness Planning",
  "Training Techniques",
  "Success Stories"
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter posts based on search query and selected category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <section className="bg-neogym-dark text-white py-20">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Fitness <span className="text-neogym-red">Blog</span>
          </motion.h1>
          <motion.p 
            className="text-lg mb-8 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover the latest fitness tips, nutrition advice, and workout strategies to help you achieve your goals.
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="md:w-2/3">
              {/* Search Bar */}
              <motion.div 
                className="mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    type="text" 
                    placeholder="Search articles..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </motion.div>
              
              {/* Category Filter - Mobile */}
              <div className="mb-8 md:hidden">
                <label htmlFor="category-select" className="block mb-2 font-medium">
                  Filter by Category
                </label>
                <select 
                  id="category-select"
                  className="w-full p-2 border rounded-md"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              {/* Blog Posts */}
              <div className="space-y-10">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post, index) => (
                    <motion.article 
                      key={post.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="md:w-1/3">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="h-64 md:h-full w-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <h2 className="text-2xl font-bold mb-2 hover:text-neogym-red transition-colors">
                          <a href={`/blog/${post.id}`}>{post.title}</a>
                        </h2>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-1" />
                            {post.date}
                          </div>
                          <div className="flex items-center">
                            <User size={16} className="mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Tag size={16} className="mr-1" />
                            {post.category}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{post.excerpt}</p>
                        <Button 
                          variant="link" 
                          className="text-neogym-red p-0 hover:text-neogym-red/80"
                          onClick={() => window.location.href = `/blog/${post.id}`}
                        >
                          Read More <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </motion.article>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-lg text-gray-600">No articles found matching your search criteria.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("All");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Pagination */}
              {filteredPosts.length > 0 && (
                <div className="flex justify-center mt-12">
                  <nav className="flex space-x-2">
                    <Button variant="outline" disabled>Previous</Button>
                    <Button variant="outline" className="bg-neogym-red text-white hover:bg-neogym-red/90">1</Button>
                    <Button variant="outline">2</Button>
                    <Button variant="outline">3</Button>
                    <Button variant="outline">Next</Button>
                  </nav>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="md:w-1/3">
              {/* Categories */}
              <motion.div 
                className="bg-white rounded-lg shadow-md p-6 mb-8"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-bold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <button
                        className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 transition-colors ${selectedCategory === category ? 'bg-gray-100 font-medium text-neogym-red' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Recent Posts */}
              <motion.div 
                className="bg-white rounded-lg shadow-md p-6 mb-8"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
                <ul className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <li key={post.id} className="border-b pb-4 last:border-0 last:pb-0">
                      <a 
                        href={`/blog/${post.id}`}
                        className="hover:text-neogym-red transition-colors"
                      >
                        {post.title}
                      </a>
                      <div className="text-sm text-gray-600 mt-1">{post.date}</div>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Popular Tags */}
              <motion.div 
                className="bg-white rounded-lg shadow-md p-6"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {[...new Set(blogPosts.flatMap(post => post.tags))].map((tag, index) => (
                    <button
                      key={index}
                      className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm transition-colors"
                      onClick={() => setSearchQuery(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
