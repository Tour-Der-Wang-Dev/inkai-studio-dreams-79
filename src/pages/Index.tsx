
import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { HeroSection } from '@/components/studio/hero-section';
import { FeaturesGrid } from '@/components/studio/features-grid';
import { GalleryPreview } from '@/components/studio/gallery-preview';
import { AIShowcase } from '@/components/studio/ai-showcase';
import { Footer } from '@/components/studio/footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesGrid />
        <AIShowcase />
        <GalleryPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
