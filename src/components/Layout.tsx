
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation, Link } from 'react-router-dom';
import { X } from 'lucide-react';

type LayoutProps = {
  children: React.ReactNode;
  showPromoBanner?: boolean;
  hideFooter?: boolean;
  fullWidth?: boolean;
};

const Layout = ({ children, showPromoBanner = false, hideFooter = false, fullWidth = true }: LayoutProps) => {
  const [showBanner, setShowBanner] = useState(showPromoBanner);
  const location = useLocation();
  
  // Check if current path is a dashboard
  const isDashboard = location.pathname.includes('/dashboard') || location.pathname.includes('/admin');

  // Reset the banner visibility when the showPromoBanner prop changes
  useEffect(() => {
    setShowBanner(showPromoBanner);
  }, [showPromoBanner]);

  return (
    <div className="min-h-screen flex flex-col">
      {showBanner && !isDashboard && (
        <div className="bg-neogym-red text-white py-2 px-4 text-center relative">
          <p>
            🔥 Special Offer: Join now and get your first month at 50% off! <Link to="/pricing" className="underline font-bold">View Plans</Link>
          </p>
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200"
            onClick={() => setShowBanner(false)}
            aria-label="Close promotion banner"
          >
            <X size={18} />
          </button>
        </div>
      )}
      <Navbar />
      <main className={`flex-grow ${fullWidth ? '' : 'container mx-auto px-4'}`}>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
