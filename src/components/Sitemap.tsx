
import React from "react";
import { Link } from "react-router-dom";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { 
  Home, 
  Users, 
  Info, 
  Phone, 
  FileText, 
  LogIn, 
  UserPlus, 
  Key, 
  UserCog, 
  Shield,
  Star,
  DollarSign,
  Building2,
  LayoutDashboard,
  MessagesSquare
} from "lucide-react";

const sitemapData = [
  {
    title: "Main Pages",
    items: [
      { name: "Home", path: "/", icon: Home },
      { name: "About", path: "/about", icon: Info },
      { name: "Contact", path: "/contact", icon: Phone },
      { name: "Blog", path: "/blog", icon: FileText },
      { name: "Reviews", path: "/reviews", icon: Star },
      { name: "Pricing", path: "/pricing", icon: DollarSign },
      { name: "Facilities", path: "/facilities", icon: Building2 },
    ],
  },
  {
    title: "User Access",
    items: [
      { name: "Login", path: "/login", icon: LogIn },
      { name: "Sign Up", path: "/signup", icon: UserPlus },
      { name: "Forgot Password", path: "/forgot-password", icon: Key },
    ],
  },
  {
    title: "User Dashboard",
    items: [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Fitness", path: "/fit", icon: Users },
      { name: "Payments", path: "/pay", icon: DollarSign },
      { name: "Help Center", path: "/help", icon: MessagesSquare },
    ],
  },
  {
    title: "Admin",
    items: [
      { name: "Admin Dashboard", path: "/admin", icon: Shield },
      { name: "Review Management", path: "/admin/reviews", icon: Star },
      { name: "Tour Management", path: "/admin/tours", icon: Building2 },
    ],
  },
  {
    title: "Legal",
    items: [
      { name: "Privacy Policy", path: "/privacy-policy", icon: FileText },
      { name: "Terms of Service", path: "/terms", icon: FileText },
    ],
  },
];

const Sitemap = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">NeoGym Website Sitemap</h1>
      <p className="text-center mb-12 text-muted-foreground">
        Use this sitemap to navigate through all pages of the NeoGym website
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sitemapData.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>
                {section.items.length} pages in this section
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    <Link 
                      to={item.path}
                      className="flex items-center gap-2 p-2 hover:bg-muted rounded-md transition-colors"
                    >
                      <item.icon className="h-4 w-4 text-neogym-red" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Sitemap;
