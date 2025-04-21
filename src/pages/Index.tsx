
import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/home/Hero';
import PromoBanner from '../components/home/PromoBanner';
import WhyChooseUs from '../components/home/WhyChooseUs';
import AboutSection from '../components/home/AboutSection';
import Coaches from '../components/home/Coaches';
import FacilitiesPricing from '../components/home/FacilitiesPricing';
import Reviews from '../components/home/Reviews';
import BlogSection from '../components/home/BlogSection';
import CallToAction from '../components/home/CallToAction';
import EquipmentFeature from '../components/home/EquipmentFeature';

const Index = () => {
  return (
    <Layout showPromoBanner={true}>
      <div className="space-y-6 animate-fade-in">
        <div className="animate-fade-in" style={{ animationDelay: '0.05s', animationFillMode: 'both' }}>
          <Hero />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <PromoBanner />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
          <WhyChooseUs />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.21s', animationFillMode: 'both' }}>
          <AboutSection />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.27s', animationFillMode: 'both' }}>
          <Coaches />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.33s', animationFillMode: 'both' }}>
          <EquipmentFeature />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.39s', animationFillMode: 'both' }}>
          <FacilitiesPricing />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.45s', animationFillMode: 'both' }}>
          <Reviews />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.51s', animationFillMode: 'both' }}>
          <BlogSection />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.57s', animationFillMode: 'both' }}>
          <CallToAction />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
