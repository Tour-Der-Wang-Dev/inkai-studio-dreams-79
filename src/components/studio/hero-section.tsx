
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Play } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-green-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.1),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-6">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-medium">AI-Powered Design Studio</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Where Art Meets
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent block">
                Artificial Intelligence
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Create stunning tattoo designs with cutting-edge AI technology. 
              Collaborate with master artists and bring your vision to life with precision and creativity.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 px-8 py-4 text-lg">
                Start Creating
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-800">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white mb-1">5000+</div>
                <div className="text-gray-400">Designs Created</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-gray-400">Happy Clients</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white mb-1">10+</div>
                <div className="text-gray-400">Master Artists</div>
              </div>
            </div>
          </div>

          {/* Right Content - Featured Portrait */}
          <div className="relative">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-green-400 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative bg-gray-900 rounded-2xl p-1 overflow-hidden">
                <img
                  src="/lovable-uploads/d2081cda-a703-42a6-9c6b-40198f4101fa.png"
                  alt="Professional Tattoo Artist Portrait"
                  className="w-full h-[600px] object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-xl" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-1">AI-Enhanced Portrait</h3>
                    <p className="text-gray-300 text-sm">Professional lighting + AI optimization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
