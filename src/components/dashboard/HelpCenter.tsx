
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HelpCircle, Mail, MessageSquare, Send } from "lucide-react";

const HelpCenter = () => {
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the support request
    alert("Support request sent successfully!");
    setSubject("");
    setMessage("");
  };

  const faqs = [
    {
      question: "How do I update my payment method?",
      answer:
        "Go to the Payments tab in your dashboard, click on 'Manage Payment Methods', and follow the instructions to add or update your payment details.",
    },
    {
      question: "Can I freeze my membership temporarily?",
      answer:
        "Yes, you can freeze your membership for up to 3 months per year. Go to your Profile tab, click on 'View Membership Details', and select the 'Freeze Membership' option.",
    },
    {
      question: "How do I book a class?",
      answer:
        "Navigate to the Schedule tab in your dashboard. You'll see a calendar view of available classes. Click on a class to see details and then click 'Book' to reserve your spot.",
    },
    {
      question: "What is the cancellation policy for classes?",
      answer:
        "Classes can be cancelled up to 4 hours before the scheduled start time without penalty. Late cancellations may result in a cancellation fee.",
    },
    {
      question: "How do I export my workout data?",
      answer:
        "In the Progress tab, click on the 'Export Data' button. You can choose to export your data in CSV or PDF format for your records.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="h-5 w-5 mr-2 text-neogym-red" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>
            Quick answers to common questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-neogym-red" />
            Contact Support
          </CardTitle>
          <CardDescription>
            Send us a message and we'll get back to you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="What can we help you with?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Please describe your issue in detail..."
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-neogym-red hover:bg-neogym-red/90"
            >
              <Send className="h-4 w-4 mr-2" /> Send Message
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 flex items-center">
              <Mail className="h-4 w-4 mr-2 text-neogym-red" />
              Or email us directly at:{" "}
              <a
                href="mailto:support@neogym.com"
                className="text-neogym-red hover:underline ml-1"
              >
                support@neogym.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpCenter;
