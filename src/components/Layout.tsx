
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
  showPromoBanner?: boolean;
  hideFooter?: boolean;
  fullWidth?: boolean;
};

const Layout = ({ children, showPromoBanner = false, hideFooter = false, fullWidth = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-grow pt-16 ${fullWidth ? '' : 'container mx-auto px-4'}`}> {/* Added padding-top to account for fixed navbar */}
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
