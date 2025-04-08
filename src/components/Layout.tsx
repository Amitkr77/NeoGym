
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

type LayoutProps = {
  children: React.ReactNode;
  showPromoBanner?: boolean;
  hideFooter?: boolean;
  fullWidth?: boolean;
};

const Layout = ({ children, showPromoBanner = false, hideFooter = false, fullWidth = true }: LayoutProps) => {
  const location = useLocation();
  
  // Check if current path is a dashboard
  const isDashboard = location.pathname.includes('/dashboard') || location.pathname.includes('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-grow ${fullWidth ? '' : 'container mx-auto px-4'}`}>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
