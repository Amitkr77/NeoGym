
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

const Index = () => {
  return (
    <Layout showPromoBanner={true}>
      <Hero />
      <PromoBanner />
      <WhyChooseUs />
      <AboutSection />
      <Coaches />
      <FacilitiesPricing />
      <Reviews />
      <BlogSection />
      <CallToAction />
    </Layout>
  );
};

export default Index;
