
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-neogym-dark py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-heading font-bold flex items-center">
          <span className="text-neogym-red">NEO</span>GYM
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-neogym-red transition-colors">Home</Link>
          <Link to="/about" className="text-white hover:text-neogym-red transition-colors">About Us</Link>
          <Link to="/facilities" className="text-white hover:text-neogym-red transition-colors">Facilities</Link>
          <Link to="/pricing" className="text-white hover:text-neogym-red transition-colors">Pricing</Link>
          <Link to="/blog" className="text-white hover:text-neogym-red transition-colors">Blog</Link>
          <Link to="/reviews" className="text-white hover:text-neogym-red transition-colors">Reviews</Link>
          <Link to="/contact" className="text-white hover:text-neogym-red transition-colors">Contact Us</Link>
          <Link to="/member-login" className="text-white hover:text-neogym-red transition-colors">Member Login</Link>
          <Link to="/admin-login" className="text-white hover:text-neogym-red transition-colors">Admin Login</Link>
        </div>

        {/* Join Now Button - Desktop */}
        <div className="hidden lg:block">
          <Button className="bg-neogym-red hover:bg-neogym-red/90 text-white font-bold">
            Join Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button 
            onClick={toggleMenu}
            className="text-white p-2"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-neogym-dark border-t border-gray-800 mt-4 py-4 animate-fade-in">
          <div className="container mx-auto flex flex-col space-y-4">
            <Link to="/" className="text-white hover:text-neogym-red transition-colors px-4 py-2" onClick={toggleMenu}>Home</Link>
            <Link to="/about" className="text-white hover:text-neogym-red transition-colors px-4 py-2" onClick={toggleMenu}>About Us</Link>
            <Link to="/facilities" className="text-white hover:text-neogym-red transition-colors px-4 py-2" onClick={toggleMenu}>Facilities</Link>
            <Link to="/pricing" className="text-white hover:text-neogym-red transition-colors px-4 py-2" onClick={toggleMenu}>Pricing</Link>
            <Link to="/blog" className="text-white hover:text-neogym-red transition-colors px-4 py-2" onClick={toggleMenu}>Blog</Link>
            <Link to="/reviews" className="text-white hover:text-neogym-red transition-colors px-4 py-2" onClick={toggleMenu}>Reviews</Link>
            <Link to="/contact" className="text-white hover:text-neogym-red transition-colors px-4 py-2" onClick={toggleMenu}>Contact Us</Link>
            <Link to="/member-login" className="text-white hover:text-neogym-red transition-colors px-4 py-2" onClick={toggleMenu}>Member Login</Link>
            <Link to="/admin-login" className="text-white hover:text-neogym-red transition-colors px-4 py-2" onClick={toggleMenu}>Admin Login</Link>
            <Button className="bg-neogym-red hover:bg-neogym-red/90 text-white font-bold w-full">Join Now</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
