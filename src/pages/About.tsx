
import React from 'react';
import Layout from '../components/Layout';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const About = () => {
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
            About <span className="text-neogym-red">NeoGym</span>
          </motion.h1>
          <motion.p 
            className="text-lg mb-8 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Where fitness meets innovation. Learn about our journey, mission, and the team behind NeoGym.
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2013, NeoGym was born from a passion to revolutionize the fitness industry. Our founders, 
                former professional athletes and certified trainers, recognized a gap in the market for a gym that 
                combines cutting-edge equipment with personalized training programs.
              </p>
              <p className="text-gray-700 mb-4">
                What started as a small facility with just 10 pieces of equipment has grown into a state-of-the-art 
                fitness center with multiple locations across the country. Our journey has been fueled by the 
                transformative stories of our members who've achieved incredible results with our guidance.
              </p>
              <p className="text-gray-700">
                Today, NeoGym stands as a testament to our commitment to innovation and excellence in fitness. 
                We continue to evolve, incorporating the latest research and technology to provide the best 
                possible experience for our members.
              </p>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                alt="NeoGym History" 
                className="rounded-lg shadow-xl w-full"
              />
              <div className="absolute -bottom-5 -right-5 bg-neogym-red text-white p-4 rounded shadow-lg">
                <p className="text-2xl font-bold">2013</p>
                <p className="text-sm">Year Founded</p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              className="order-2 lg:order-1 relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                alt="NeoGym Mission" 
                className="rounded-lg shadow-xl w-full"
              />
            </motion.div>
            <motion.div 
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                At NeoGym, our mission is to empower individuals to transform their lives through fitness. 
                We believe that everyone deserves access to the tools, knowledge, and support needed to 
                achieve their health and fitness goals.
              </p>
              <p className="text-gray-700 mb-4">
                We are committed to creating an inclusive environment where people of all fitness levels 
                feel welcome and supported. Our team of certified trainers and nutrition experts work 
                tirelessly to provide personalized guidance and motivation to each member.
              </p>
              <p className="text-gray-700">
                Beyond physical fitness, we strive to promote mental wellbeing through our mindfulness 
                programs and stress-reduction techniques. We believe that true fitness encompasses both 
                the body and mind.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="bg-gray-100 p-8 rounded-lg shadow-md mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm hover-scale">
                <h3 className="text-xl font-bold mb-3 text-neogym-red">Innovation</h3>
                <p className="text-gray-700">
                  We continuously seek out and implement the latest fitness methodologies and technologies 
                  to enhance our members' experience and results.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm hover-scale">
                <h3 className="text-xl font-bold mb-3 text-neogym-red">Excellence</h3>
                <p className="text-gray-700">
                  We hold ourselves to the highest standards in all aspects of our business, from our 
                  facility maintenance to our training programs.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm hover-scale">
                <h3 className="text-xl font-bold mb-3 text-neogym-red">Community</h3>
                <p className="text-gray-700">
                  We foster a supportive community where members can connect, motivate each other, and 
                  celebrate achievements together.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                {
                  name: "Michael Johnson",
                  role: "Founder & CEO",
                  image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "Sarah Williams",
                  role: "Co-Founder & Head Trainer",
                  image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "David Chen",
                  role: "Nutrition Director",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "Emily Rodriguez",
                  role: "Fitness Program Director",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                }
              ].map((member, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover-scale"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-neogym-red">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="text-center">
            <Button 
              className="bg-neogym-red hover:bg-neogym-red/90 text-white"
              onClick={() => window.location.href = '/contact'}
            >
              Get In Touch With Us <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
