
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageSquare, Mail } from "lucide-react";
import HelpCenterModal from "@/components/dashboard/settings/HelpCenterModal";

const HelpCenter = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Layout hideFooter>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Help Center</h1>
          <p className="text-muted-foreground">
            Find answers to common questions or contact our support team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-neogym-red" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>Find quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                Our comprehensive FAQ section covers membership, classes, billing, and more.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setModalOpen(true)}
              >
                View FAQs
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-neogym-red" />
                Contact Support
              </CardTitle>
              <CardDescription>Reach out to our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                Have a specific question? Our support team is ready to help.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setModalOpen(true)}
              >
                Contact Support
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-neogym-red" />
                Email Us
              </CardTitle>
              <CardDescription>Send us a direct email</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                For complex issues, you can email our dedicated support team.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.location.href = "mailto:support@neogym.com"}
              >
                Email Support
              </Button>
            </CardContent>
          </Card>
        </div>

        <HelpCenterModal open={modalOpen} onOpenChange={setModalOpen} />
      </div>
    </Layout>
  );
};

export default HelpCenter;
