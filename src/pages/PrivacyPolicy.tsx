
import React from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
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
            Privacy <span className="text-neogym-red">Policy</span>
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
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="mb-6">
                  At NeoGym, we respect your privacy and are committed to protecting your personal data. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you visit our website or use our services.
                </p>
                
                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                <p className="mb-3">We collect information that you provide directly to us, including:</p>
                <ul className="list-disc ml-6 mb-6 space-y-1">
                  <li>Personal identification information (Name, email address, phone number, etc.)</li>
                  <li>Membership and billing information</li>
                  <li>Health and fitness data</li>
                  <li>Profile information</li>
                  <li>Communications you send to us</li>
                </ul>
                
                <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                <p className="mb-3">We use the information we collect for various purposes, including:</p>
                <ul className="list-disc ml-6 mb-6 space-y-1">
                  <li>Providing and maintaining our services</li>
                  <li>Processing membership payments</li>
                  <li>Personalizing your experience</li>
                  <li>Sending administrative information</li>
                  <li>Marketing and promotional communications (with your consent)</li>
                  <li>Analyzing usage to improve our services</li>
                  <li>Preventing fraudulent activity</li>
                </ul>
                
                <h2 className="text-2xl font-bold mb-4">4. Sharing Your Information</h2>
                <p className="mb-6">
                  We may share your information with third parties in limited circumstances, including:
                </p>
                <ul className="list-disc ml-6 mb-6 space-y-1">
                  <li>Service providers who perform services on our behalf</li>
                  <li>Partners (with your consent)</li>
                  <li>For legal purposes when required by law</li>
                  <li>In connection with a business transaction such as a merger or acquisition</li>
                </ul>
                
                <h2 className="text-2xl font-bold mb-4">5. Your Privacy Rights</h2>
                <p className="mb-6">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc ml-6 mb-6 space-y-1">
                  <li>Access to your personal data</li>
                  <li>Correction of inaccurate information</li>
                  <li>Deletion of your personal data</li>
                  <li>Restriction of processing</li>
                  <li>Data portability</li>
                  <li>Objection to processing</li>
                  <li>Withdrawal of consent</li>
                </ul>
                
                <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
                <p className="mb-6">
                  We implement appropriate security measures to protect your personal information. 
                  However, no method of transmission over the Internet or electronic storage is 100% secure, 
                  so we cannot guarantee absolute security.
                </p>
                
                <h2 className="text-2xl font-bold mb-4">7. Third-Party Links</h2>
                <p className="mb-6">
                  Our website may contain links to third-party websites. We are not responsible for the 
                  privacy practices or content of these sites. We encourage you to read the privacy 
                  policies of any third-party sites you visit.
                </p>
                
                <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
                <p className="mb-6">
                  Our services are not intended for individuals under the age of 16. We do not knowingly 
                  collect personal information from children. If you are a parent or guardian and believe 
                  your child has provided us with personal information, please contact us.
                </p>
                
                <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
                <p className="mb-6">
                  We may update this Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new policy on this page and updating the "Last updated" date.
                </p>
                
                <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                <p className="mb-6">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <address className="not-italic mb-6">
                  <strong>NeoGym</strong><br />
                  123 Fitness Avenue<br />
                  New York, NY 10001<br />
                  Email: privacy@neogym.com<br />
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

export default PrivacyPolicy;
