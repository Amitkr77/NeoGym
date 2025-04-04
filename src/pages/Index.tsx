
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/home/Hero';
import PromoBanner from '../components/home/PromoBanner';
import WhyChooseUs from '../components/home/WhyChooseUs';
import AboutSection from '../components/home/AboutSection';
import Coaches from '../components/home/Coaches';
import FacilitiesPricing from '../components/home/FacilitiesPricing';
import Reviews from '../components/home/Reviews';
import BlogSection from '../components/home/BlogSection';
import CallToAction from '../components/home/CallToAction';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <PromoBanner />
        <WhyChooseUs />
        <AboutSection />
        <Coaches />
        <FacilitiesPricing />
        <Reviews />
        <BlogSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
