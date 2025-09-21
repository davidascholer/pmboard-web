import React from 'react';
import { CheckCircle, Users, Target, TrendingUp, ArrowRight, Star, Play } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TestimonialProps {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar?: string;
}

interface PricingPlanProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const TestimonialCard: React.FC<TestimonialProps> = ({ name, role, company, quote, rating, avatar }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ))}
    </div>
    <blockquote className="text-gray-700 mb-4 italic">"{quote}"</blockquote>
    <div className="flex items-center">
      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
        {avatar || name.charAt(0)}
      </div>
      <div>
        <div className="font-semibold text-gray-900">{name}</div>
        <div className="text-sm text-gray-600">{role} at {company}</div>
      </div>
    </div>
  </div>
);

const PricingCard: React.FC<PricingPlanProps> = ({ 
  name, 
  price, 
  period, 
  description, 
  features, 
  isPopular, 
  buttonText 
}) => (
  <div className={`relative bg-white rounded-lg shadow-lg p-8 ${isPopular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
    {isPopular && (
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Most Popular
        </span>
      </div>
    )}
    <div className="text-center mb-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
      <div className="text-4xl font-bold text-blue-600 mb-1">
        {price}
        <span className="text-lg text-gray-600 font-normal">/{period}</span>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
          <span className="text-gray-700">{feature}</span>
        </li>
      ))}
    </ul>
    <button
      className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
        isPopular
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
      }`}
    >
      {buttonText}
    </button>
  </div>
);

const PromoPage: React.FC = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Team Collaboration",
      description: "Seamlessly coordinate with your team members, assign tasks, and track progress in real-time with our intuitive collaboration tools."
    },
    {
      icon: <Target className="w-6 h-6 text-blue-600" />,
      title: "Sprint Planning",
      description: "Plan and manage your sprints effectively with drag-and-drop functionality, story point estimation, and velocity tracking."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      title: "Analytics & Reporting",
      description: "Get detailed insights into your team's performance with burndown charts, velocity reports, and customizable dashboards."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechStart Inc",
      quote: "PMBoard transformed how our team manages sprints. The intuitive interface and powerful features have increased our productivity by 40%.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Scrum Master",
      company: "Digital Solutions",
      quote: "The best SCRUM tool I've used. The reporting features are outstanding and help us make data-driven decisions every sprint.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Development Lead",
      company: "InnovateCorp",
      quote: "PMBoard's seamless integration and user-friendly design made our transition to agile development smooth and efficient.",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$9",
      period: "user/month",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 5 team members",
        "Basic sprint planning",
        "Task management",
        "Email support",
        "Basic reporting"
      ],
      buttonText: "Start Free Trial"
    },
    {
      name: "Professional",
      price: "$19",
      period: "user/month",
      description: "Ideal for growing teams",
      features: [
        "Up to 25 team members",
        "Advanced sprint planning",
        "Custom workflows",
        "Priority support",
        "Advanced analytics",
        "Integration with popular tools"
      ],
      isPopular: true,
      buttonText: "Start Free Trial"
    },
    {
      name: "Enterprise",
      price: "$39",
      period: "user/month",
      description: "For large organizations",
      features: [
        "Unlimited team members",
        "Enterprise-grade security",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced reporting & insights",
        "SSO and advanced permissions"
      ],
      buttonText: "Contact Sales"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">PMBoard</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                Sign In
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Master SCRUM with 
                <span className="text-blue-200"> PMBoard</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                The most intuitive SCRUM management platform that helps agile teams plan, 
                track, and deliver exceptional software faster than ever before.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                  Start 14-Day Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>
              <div className="mt-8 text-blue-200">
                <p className="text-sm">
                  ✨ No credit card required • 🚀 Setup in under 5 minutes • 💯 14-day free trial
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-lg shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Sprint Dashboard</h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      On Track
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-blue-100 p-3 rounded border-l-4 border-blue-500">
                      <p className="text-sm font-medium text-gray-900">User Authentication</p>
                      <p className="text-xs text-gray-600">In Progress • 3 days remaining</p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded border-l-4 border-yellow-500">
                      <p className="text-sm font-medium text-gray-900">API Integration</p>
                      <p className="text-xs text-gray-600">Testing • 1 day remaining</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded border-l-4 border-green-500">
                      <p className="text-sm font-medium text-gray-900">UI Components</p>
                      <p className="text-xs text-gray-600">Completed</p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm">Sprint velocity: <span className="font-semibold">42 points</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need for successful SCRUM
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to streamline your agile workflow and maximize team productivity
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by 10,000+ agile teams
            </h2>
            <p className="text-xl text-gray-600">
              See what teams are saying about PMBoard
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose the perfect plan for your team
            </h2>
            <p className="text-xl text-gray-600">
              Start free and scale as you grow
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">
            Ready to transform your team's productivity?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of teams already using PMBoard to deliver better software faster.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Your Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Schedule a Demo
            </button>
          </div>
          <p className="text-blue-200 text-sm mt-6">
            No credit card required • Cancel anytime • 24/7 support
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">PMBoard</span>
              </div>
              <p className="text-gray-400">
                The ultimate SCRUM management platform for agile teams.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PMBoard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PromoPage;
