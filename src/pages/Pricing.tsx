
import React from 'react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "29",
    period: "monthly",
    description: "Essential access for casual fitness enthusiasts",
    features: [
      "Access during off-peak hours (9am-4pm)",
      "Basic cardio & strength equipment",
      "Locker room access",
      "1 fitness assessment per month",
      "Online workout tracking",
    ],
    limitations: [
      "No group classes included",
      "No personal training sessions",
      "Limited to one location",
      "No guest passes"
    ],
    popular: false,
    color: "bg-gray-600"
  },
  {
    id: "premium",
    name: "Premium",
    price: "59",
    period: "monthly",
    description: "Our most popular option for dedicated fitness members",
    features: [
      "24/7 access to all facilities",
      "Full access to all equipment",
      "Unlimited group classes",
      "3 personal training sessions/month",
      "Fitness assessment & progress tracking",
      "Nutritional consulting session",
      "Towel service",
      "2 guest passes per month",
      "Access to all NeoGym locations"
    ],
    limitations: [],
    popular: true,
    color: "bg-neogym-red"
  },
  {
    id: "elite",
    name: "Elite",
    price: "99",
    period: "monthly",
    description: "The ultimate fitness experience with premium benefits",
    features: [
      "All Premium features included",
      "Unlimited personal training",
      "Priority class booking",
      "Advanced performance testing",
      "Customized nutrition plan",
      "Recovery zone access (sauna, steam room)",
      "4 guest passes per month",
      "Exclusive member events",
      "Discounts on supplements & apparel"
    ],
    limitations: [],
    popular: false,
    color: "bg-black"
  }
];

const annualPlans = plans.map(plan => ({
  ...plan,
  price: (parseInt(plan.price) * 10).toString(), // 2 months free with annual
  period: "annual"
}));

const frequentlyAskedQuestions = [
  {
    question: "Is there a joining fee?",
    answer: "There is a one-time joining fee of $49 for new members. We occasionally run promotions that waive this fee."
  },
  {
    question: "Can I freeze my membership?",
    answer: "Yes, members can freeze their membership for up to 3 months per year for a small administrative fee of $10 per month."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Members can cancel their membership with 30 days' notice. There is no cancellation fee if you've been a member for at least 3 months."
  },
  {
    question: "Are there family or couple membership options?",
    answer: "Yes, we offer a 15% discount on the second membership when two people from the same household join together."
  },
  {
    question: "Do you offer student or senior discounts?",
    answer: "We offer a 10% discount for students with a valid ID and seniors aged 65+."
  },
  {
    question: "Can I try before I join?",
    answer: "Absolutely! We offer a free day pass for first-time visitors. You can book a tour through our website or at the reception desk."
  }
];

const Pricing = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string, period: string) => {
    navigate(`/signup?plan=${planId}&period=${period}`);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-neogym-dark py-24">
        <div className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1571388208497-71bedc66e932?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl text-white font-bold mb-6">Membership <span className="text-neogym-red">Plans</span></h1>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">Find the perfect membership plan to achieve your fitness goals. All plans include access to our state-of-the-art facilities and community support.</p>
        </div>
      </div>
      
      {/* Pricing Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="monthly" className="w-full">
            <div className="text-center mb-12">
              <TabsList className="inline-flex bg-gray-200 p-1 rounded-lg">
                <TabsTrigger 
                  value="monthly" 
                  className="data-[state=active]:bg-neogym-red data-[state=active]:text-white px-8 py-3 rounded-md transition-all"
                >
                  Monthly Plans
                </TabsTrigger>
                <TabsTrigger 
                  value="annual" 
                  className="data-[state=active]:bg-neogym-red data-[state=active]:text-white px-8 py-3 rounded-md transition-all"
                >
                  Annual Plans (Save 16%)
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Monthly Plans */}
            <TabsContent value="monthly" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                  <Card key={plan.id} className={`overflow-hidden ${plan.popular ? 'ring-2 ring-neogym-red relative' : ''}`}>
                    {plan.popular && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-neogym-red text-white text-xs font-bold py-1 px-3 rounded-bl-lg">Most Popular</div>
                      </div>
                    )}
                    <div className={`${plan.color} text-white p-6`}>
                      <h3 className="text-2xl font-bold">{plan.name}</h3>
                      <div className="mt-4 flex items-end">
                        <span className="text-4xl font-bold">${plan.price}</span>
                        <span className="text-sm ml-1 mb-1">/{plan.period}</span>
                      </div>
                      <p className="mt-2 text-gray-200 text-sm">{plan.description}</p>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-3">What's included:</h4>
                          <ul className="space-y-2">
                            {plan.features.map((feature, idx) => (
                              <li key={idx} className="flex">
                                <Check className="text-green-500 mr-2 h-5 w-5 flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {plan.limitations.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-3 text-gray-500">Limitations:</h4>
                            <ul className="space-y-2 text-gray-500">
                              {plan.limitations.map((limitation, idx) => (
                                <li key={idx} className="flex items-start text-sm">
                                  <span className="mr-2">•</span>
                                  <span>{limitation}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <Button 
                          className={`w-full mt-6 ${plan.popular ? 'bg-neogym-red hover:bg-neogym-red/90' : ''}`}
                          onClick={() => handleSelectPlan(plan.id, "monthly")}
                        >
                          Choose {plan.name} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Annual Plans */}
            <TabsContent value="annual" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {annualPlans.map((plan) => (
                  <Card key={plan.id} className={`overflow-hidden ${plan.popular ? 'ring-2 ring-neogym-red relative' : ''}`}>
                    {plan.popular && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-neogym-red text-white text-xs font-bold py-1 px-3 rounded-bl-lg">Most Popular</div>
                      </div>
                    )}
                    <div className={`${plan.color} text-white p-6`}>
                      <h3 className="text-2xl font-bold">{plan.name}</h3>
                      <div className="mt-4 flex items-end">
                        <span className="text-4xl font-bold">${plan.price}</span>
                        <span className="text-sm ml-1 mb-1">/{plan.period}</span>
                      </div>
                      <p className="mt-2 text-gray-200 text-sm">{plan.description}</p>
                      <p className="mt-1 text-white text-xs font-semibold">Save with annual billing</p>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-3">What's included:</h4>
                          <ul className="space-y-2">
                            {plan.features.map((feature, idx) => (
                              <li key={idx} className="flex">
                                <Check className="text-green-500 mr-2 h-5 w-5 flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {plan.limitations.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-3 text-gray-500">Limitations:</h4>
                            <ul className="space-y-2 text-gray-500">
                              {plan.limitations.map((limitation, idx) => (
                                <li key={idx} className="flex items-start text-sm">
                                  <span className="mr-2">•</span>
                                  <span>{limitation}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <Button 
                          className={`w-full mt-6 ${plan.popular ? 'bg-neogym-red hover:bg-neogym-red/90' : ''}`}
                          onClick={() => handleSelectPlan(plan.id, "annual")}
                        >
                          Choose {plan.name} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked <span className="text-neogym-red">Questions</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to know about our membership plans and policies.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {frequentlyAskedQuestions.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Have more questions about our membership options?</p>
            <Button 
              variant="outline" 
              className="border-neogym-dark text-neogym-dark hover:bg-neogym-dark/10"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
      
      {/* Corporate Memberships */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-neogym-dark text-white rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Corporate <span className="text-neogym-red">Memberships</span></h2>
              <p className="text-gray-300 mb-4">Boost employee wellness and productivity with our corporate membership packages. Enjoy special group rates, custom wellness programs, and exclusive benefits for your team.</p>
              <p className="text-gray-300">Contact our corporate team to discuss a tailored solution for your organization.</p>
            </div>
            <div>
              <Button 
                className="bg-neogym-red hover:bg-neogym-red/90 text-white"
                onClick={() => navigate('/contact?corporate=true')}
              >
                Inquire Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
