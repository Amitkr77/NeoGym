import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`py-4 w-full  z-50 transition-all duration-300 bg-neogym-dark shadow-lg`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-white text-2xl font-heading font-bold flex items-center "
        >
          <span className="text-neogym-red">NEO</span>GYM
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link
            to="/"
            className="text-white hover:text-neogym-red transition-colors tracking-widest"
          >
            Home
          </Link>

          {/* Blog  */}
          <Link
            to="/blog"
            className="text-white hover:text-neogym-red transition-colors tracking-widest"
          >
            Blog
          </Link>

          <Link
            to="/contact"
            className="text-white hover:text-neogym-red transition-colors tracking-widest"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* Member Access */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-white hover:text-neogym-red transition-colors flex items-center border px-4 py-2 rounded-lg">
                Login <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-neogym-dark border-neogym-gray">
              <DropdownMenuItem asChild>
                <Link
                  to="/member-login"
                  className="text-white hover:bg-neogym-gray/50 cursor-pointer"
                >
                  Member Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/admin-login"
                  className="text-white hover:bg-neogym-gray/50 cursor-pointer"
                >
                  Admin Access
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Join Now Button - Desktop */}
          <div className="hidden lg:block">
            <Button className="bg-neogym-red hover:bg-neogym-red/90 text-white font-bold">
              Join Now
            </Button>
          </div>
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
            <Link
              to="/"
              className="text-white hover:text-neogym-red transition-colors px-4 py-2"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-neogym-red transition-colors px-4 py-2"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link
              to="/facilities"
              className="text-white hover:text-neogym-red transition-colors px-4 py-2"
              onClick={toggleMenu}
            >
              Facilities
            </Link>
            <Link
              to="/pricing"
              className="text-white hover:text-neogym-red transition-colors px-4 py-2"
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            <Link
              to="/classes"
              className="text-white hover:text-neogym-red transition-colors px-4 py-2"
              onClick={toggleMenu}
            >
              Classes
            </Link>
            <Link
              to="/blog"
              className="text-white hover:text-neogym-red transition-colors px-4 py-2"
              onClick={toggleMenu}
            >
              Blog
            </Link>
            <Link
              to="/reviews"
              className="text-white hover:text-neogym-red transition-colors px-4 py-2"
              onClick={toggleMenu}
            >
              Reviews
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-neogym-red transition-colors px-4 py-2"
              onClick={toggleMenu}
            >
              Contact Us
            </Link>
            <Link
              to="/member-login"
              className="text-white hover:text-neogym-red transition-colors px-4 py-2"
              onClick={toggleMenu}
            >
              Member Login
            </Link>
            <Link
              to="/admin-login"
              className="text-white hover:text-neogym-red transition-colors px-4 py-2"
              onClick={toggleMenu}
            >
              Admin Login
            </Link>
            <Button className="bg-neogym-red hover:bg-neogym-red/90 text-white font-bold w-full">
              Join Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
