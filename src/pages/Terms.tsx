
import React from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <Layout>
      <section className="bg-neogym-dark text-white py-16">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Terms of <span className="text-neogym-red">Service</span>
          </motion.h1>
          <motion.p 
            className="text-lg mb-8 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Last updated: April 4, 2025
          </motion.p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="prose prose-lg max-w-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="mb-6">
                  By accessing or using the NeoGym website, mobile application, or any services provided by 
                  NeoGym (collectively, the "Services"), you agree to be bound by these Terms of Service.
                  If you do not agree to these terms, you should not use our Services.
                </p>
                
                <h2 className="text-2xl font-bold mb-4">2. Membership and Payment</h2>
                <p className="mb-3">By becoming a member of NeoGym, you agree to the following:</p>
                <ul className="list-disc ml-6 mb-6 space-y-1">
                  <li>You must provide accurate and complete information when registering for membership</li>
                  <li>Membership fees are charged in advance according to your chosen billing cycle</li>
                  <li>Fees may change with 30 days' prior notice</li>
                  <li>Cancellation policies apply as specified in your membership agreement</li>
                  <li>You are responsible for all charges incurred under your account</li>
                </ul>
                
                <h2 className="text-2xl font-bold mb-4">3. Conduct and Facility Rules</h2>
                <p className="mb-3">While using our facilities, you agree to:</p>
                <ul className="list-disc ml-6 mb-6 space-y-1">
                  <li>Follow all posted rules and staff instructions</li>
                  <li>Respect the rights and comfort of other members</li>
                  <li>Use equipment properly and safely</li>
                  <li>Wear appropriate athletic attire</li>
                  <li>Return equipment to its proper location after use</li>
                  <li>Not engage in any illegal or disruptive behavior</li>
                </ul>
                
                <h2 className="text-2xl font-bold mb-4">4. Health and Safety</h2>
                <p className="mb-6">
                  You acknowledge that physical exercise involves inherent risks. You are responsible for:
                </p>
                <ul className="list-disc ml-6 mb-6 space-y-1">
                  <li>Consulting with a physician before beginning any exercise program</li>
                  <li>Using the facilities and equipment in accordance with your physical abilities</li>
                  <li>Immediately stopping any activity that causes you discomfort or pain</li>
                  <li>Reporting any injuries or equipment malfunctions to staff immediately</li>
                </ul>
                
                <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
                <p className="mb-6">
                  To the maximum extent permitted by law, NeoGym and its affiliates, officers, employees, 
                  agents, partners, and licensors shall not be liable for any direct, indirect, incidental, 
                  special, consequential, or punitive damages resulting from:
                </p>
                <ul className="list-disc ml-6 mb-6 space-y-1">
                  <li>Your use or inability to use our Services</li>
                  <li>Any conduct or content of any third party on our Services</li>
                  <li>Personal injury or property damage resulting from use of our facilities</li>
                  <li>Any unauthorized access to or use of our servers and/or personal information</li>
                </ul>
                
                <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
                <p className="mb-6">
                  All content, features, and functionality on our website and mobile application, including 
                  but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, 
                  and software, are the exclusive property of NeoGym and are protected by copyright, 
                  trademark, and other intellectual property laws.
                </p>
                
                <h2 className="text-2xl font-bold mb-4">7. Account Security</h2>
                <p className="mb-6">
                  You are responsible for maintaining the confidentiality of your account credentials 
                  and for all activities that occur under your account. You agree to notify us immediately 
                  of any unauthorized use of your account.
                </p>
                
                <h2 className="text-2xl font-bold mb-4">8. Termination</h2>
                <p className="mb-6">
                  We reserve the right to terminate or suspend your account and access to our Services 
                  at our sole discretion, without notice, for conduct that we believe violates these 
                  Terms of Service or is harmful to other users, us, or third parties, or for any other reason.
                </p>
                
                <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
                <p className="mb-6">
                  We may modify these Terms of Service at any time. We will provide notice of any material 
                  changes through our website or by sending you an email. Your continued use of our Services 
                  after such modifications will constitute your acceptance of the updated terms.
                </p>
                
                <h2 className="text-2xl font-bold mb-4">10. Governing Law</h2>
                <p className="mb-6">
                  These Terms of Service shall be governed by and construed in accordance with the laws 
                  of the state of New York, without regard to its conflict of law provisions.
                </p>
                
                <h2 className="text-2xl font-bold mb-4">11. Contact Information</h2>
                <p className="mb-6">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <address className="not-italic mb-6">
                  <strong>NeoGym</strong><br />
                  123 Fitness Avenue<br />
                  New York, NY 10001<br />
                  Email: terms@neogym.com<br />
                  Phone: (555) 123-4567
                </address>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
