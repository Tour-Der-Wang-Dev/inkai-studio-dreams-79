
import React from 'react';
import { Brain, Users, Shield, Palette, Zap, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: Brain,
    title: "AI Design Generation",
    description: "Create unique tattoo designs using advanced AI models trained on thousands of professional artworks.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Users,
    title: "Master Artists",
    description: "Collaborate with verified professional tattoo artists who bring decades of experience to your project.",
    color: "from-green-500 to-green-600"
  },
  {
    icon: Shield,
    title: "Safe Environment",
    description: "All artists are verified, studios are certified, and safety protocols are strictly maintained.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Palette,
    title: "Custom Styles",
    description: "From traditional to modern, watercolor to geometric - explore unlimited artistic possibilities.",
    color: "from-pink-500 to-pink-600"
  },
  {
    icon: Zap,
    title: "Instant Preview",
    description: "See how your design looks on different body parts with our AR visualization technology.",
    color: "from-yellow-500 to-yellow-600"
  },
  {
    icon: Target,
    title: "Perfect Placement",
    description: "Get expert advice on optimal tattoo placement based on your body type and design aesthetics.",
    color: "from-red-500 to-red-600"
  }
];

export const FeaturesGrid = () => {
  return (
    <section className="py-20 bg-gray-900" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Revolutionizing Tattoo Design
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the perfect blend of artificial intelligence and artistic mastery. 
            Our platform empowers both artists and clients to create extraordinary tattoo designs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300 group hover:scale-105"
            >
              <div className="p-6">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
