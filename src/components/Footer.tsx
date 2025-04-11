
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Footer = () => {
  return (
    <footer className="bg-neogym-dark text-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">
              <span className="text-neogym-red">NEO</span>GYM
            </h3>
            <p className="mb-4 text-gray-300">
              Your ultimate fitness destination with state-of-the-art equipment, expert trainers, and a motivating environment to help you achieve your fitness goals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-neogym-red transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-neogym-red transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-neogym-red transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-neogym-red transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-heading font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-neogym-red transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-neogym-red transition-colors">About Us</Link></li>
              <li><Link to="/facilities" className="text-gray-300 hover:text-neogym-red transition-colors">Facilities</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-neogym-red transition-colors">Pricing</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-neogym-red transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-neogym-red transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-heading font-bold mb-4">Contact Us</h4>
            <address className="not-italic text-gray-300 space-y-2">
              <p>123 Fitness Street</p>
              <p>New York, NY 10001</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@neogym.com</p>
            </address>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-heading font-bold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <div className="flex flex-col space-y-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button className="bg-neogym-red hover:bg-neogym-red/90 w-full">
                <Mail className="mr-2 h-4 w-4" /> Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} NeoGym. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/terms" className="hover:text-neogym-red transition-colors">Terms of Service</Link>
            <Link to="/privacy-policy" className="hover:text-neogym-red transition-colors">Privacy Policy</Link>
            <Link to="/sitemap" className="hover:text-neogym-red transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
