
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Download, Wand2 } from 'lucide-react';

export const AIShowcase = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const generationSteps = [
    "Analyzing prompt...",
    "Selecting style parameters...",
    "Generating base composition...",
    "Refining details...",
    "Applying artistic filters...",
    "Final optimization..."
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= generationSteps.length - 1) {
          setIsGenerating(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            AI Design Studio
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the power of artificial intelligence in tattoo design. 
            Watch as your ideas transform into stunning artwork in real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* AI Interface Mockup */}
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Design Prompt</h3>
                <Badge className="bg-gradient-to-r from-blue-500 to-green-400">
                  <Wand2 className="w-3 h-3 mr-1" />
                  AI Powered
                </Badge>
              </div>
              <textarea
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 resize-none"
                rows={3}
                placeholder="Describe your tattoo design... e.g., 'A majestic dragon with flowing mane, surrounded by cherry blossoms, in traditional Japanese style'"
                defaultValue="A powerful portrait in dramatic lighting, emphasizing strong facial features with modern artistic interpretation"
              />
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex space-x-2">
                  <Badge variant="outline" className="border-blue-500 text-blue-400">Realistic</Badge>
                  <Badge variant="outline" className="border-green-500 text-green-400">Portrait</Badge>
                  <Badge variant="outline" className="border-purple-500 text-purple-400">Dramatic</Badge>
                </div>
                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500"
                >
                  {isGenerating ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Generate Design
                    </>
                  )}
                </Button>
              </div>

              {/* Generation Progress */}
              {isGenerating && (
                <div className="mt-4 p-4 bg-gray-900 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Generation Progress</span>
                    <span className="text-sm text-blue-400">{Math.round(((currentStep + 1) / generationSteps.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentStep + 1) / generationSteps.length) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-white">{generationSteps[currentStep]}</p>
                </div>
              )}
            </Card>

            {/* Style Options */}
            <Card className="bg-gray-800 border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Style Parameters</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Complexity</label>
                  <input type="range" className="w-full" min="0" max="100" defaultValue="70" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Realism</label>
                  <input type="range" className="w-full" min="0" max="100" defaultValue="85" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Color Intensity</label>
                  <input type="range" className="w-full" min="0" max="100" defaultValue="60" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Artistic Flair</label>
                  <input type="range" className="w-full" min="0" max="100" defaultValue="75" />
                </div>
              </div>
            </Card>
          </div>

          {/* Generated Result */}
          <div className="relative">
            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src="/lovable-uploads/c2bce71d-3dd4-479a-b44d-2d9dc54cb485.png"
                  alt="AI Generated Design Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>

                {/* Generation Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold">Generated Design</h4>
                      <Badge className="bg-gradient-to-r from-blue-500 to-green-400">
                        AI Created
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">
                      Dramatic portrait with enhanced lighting and artistic interpretation
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-gradient-to-r from-blue-500 to-green-400">
                        Refine Design
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                        Generate Variant
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
