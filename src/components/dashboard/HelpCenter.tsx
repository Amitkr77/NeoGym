
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail, MessageSquare, PhoneCall } from "lucide-react";
import HelpCenterModal from '@/components/dashboard/settings/HelpCenterModal';

const HelpCenter = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Help Center</h1>
          <p className="text-gray-600 mb-10">
            Find answers to frequently asked questions, contact support, or browse our knowledge base to get the most out of your fitness journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Find answers to common questions about our gym and services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-primary hover:underline">What are your opening hours?</a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline">How do I cancel or change my membership?</a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline">Do you offer personal training?</a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline">Can I freeze my membership?</a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline">How do I book a class?</a>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setOpen(true)}>
                  View All FAQs
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Contact Support
                </CardTitle>
                <CardDescription>
                  Get in touch with our friendly support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <PhoneCall className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Phone Support</h4>
                    <p className="text-sm text-gray-600">
                      Available Monday to Friday, 9am - 5pm
                    </p>
                    <p className="text-primary font-medium mt-1">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Email Support</h4>
                    <p className="text-sm text-gray-600">
                      We usually respond within 24 hours
                    </p>
                    <p className="text-primary font-medium mt-1">support@gymfitness.com</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Contact Support
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <HelpCenterModal open={open} onOpenChange={setOpen} />
    </Layout>
  );
};

export default HelpCenter;
