
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Eye, Share2, Sparkles } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    image: "/lovable-uploads/0054f817-2244-44d2-81b9-1611ad4bc89d.png",
    title: "Neo-Classical Portrait",
    artist: "Alex Chen",
    style: "Realistic",
    aiEnhanced: true,
    likes: 234,
    views: 1200
  },
  {
    id: 2,
    image: "/lovable-uploads/e23b9249-3729-4797-a77f-1f0eb59db256.png",
    title: "Modern Minimalist",
    artist: "Sarah Kim",
    style: "Geometric",
    aiEnhanced: false,
    likes: 189,
    views: 890
  },
  {
    id: 3,
    image: "/lovable-uploads/7ded6218-6d2c-4efe-923f-312633f0f2f3.png",
    title: "Abstract Expression",
    artist: "Mike Rodriguez",
    style: "Abstract",
    aiEnhanced: true,
    likes: 456,
    views: 2100
  },
  {
    id: 4,
    image: "/lovable-uploads/0b7ab356-de3b-4783-8746-d4938c6712f8.png",
    title: "Classic Portrait Study",
    artist: "Emma Thompson",
    style: "Traditional",
    aiEnhanced: false,
    likes: 321,
    views: 1500
  },
  {
    id: 5,
    image: "/lovable-uploads/a2f0b7bd-6ea3-4229-a9ce-94dc279b6ca4.png",
    title: "Contemporary Vision",
    artist: "David Park",
    style: "Modern",
    aiEnhanced: true,
    likes: 278,
    views: 1100
  },
  {
    id: 6,
    image: "/lovable-uploads/4a11d10b-9c79-4d6d-88f9-b1212fa82a7d.png",
    title: "Artistic Study",
    artist: "Lisa Wang",
    style: "Fine Art",
    aiEnhanced: false,
    likes: 392,
    views: 1800
  }
];

export const GalleryPreview = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <section className="py-20 bg-black" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Explore Our Gallery
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Discover thousands of unique designs created by our community of artists and AI collaboration.
            From traditional styles to cutting-edge digital art.
          </p>
          <div className="flex justify-center space-x-4">
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              All Styles
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-400">
              AI Enhanced
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-400">
              Traditional
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-400">
              Modern
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {galleryItems.map((item) => (
            <Card 
              key={item.id}
              className="bg-gray-900 border-gray-800 overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {item.aiEnhanced && (
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-green-400 text-white border-0">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Enhanced
                  </Badge>
                )}
                
                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-black/60 flex items-center justify-center space-x-4 transition-opacity duration-300 ${
                  hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-3">by {item.artist}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                    {item.style}
                  </Badge>
                  <div className="flex items-center space-x-3 text-gray-400 text-sm">
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {item.likes}
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {item.views}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500">
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
};
