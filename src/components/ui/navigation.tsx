
import React, { useState } from 'react';
import { Menu, X, Search, User, Palette, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-400 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">InkAI Studio</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#gallery" className="text-gray-300 hover:text-blue-400 transition-colors">Gallery</a>
            <a href="#create" className="text-gray-300 hover:text-blue-400 transition-colors">Create</a>
            <a href="#artists" className="text-gray-300 hover:text-blue-400 transition-colors">Artists</a>
            <a href="#pricing" className="text-gray-300 hover:text-blue-400 transition-colors">Pricing</a>
          </div>

          {/* Search and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white">
              Sign In
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900 rounded-lg mt-2">
              <a href="#gallery" className="block px-3 py-2 text-gray-300 hover:text-blue-400">Gallery</a>
              <a href="#create" className="block px-3 py-2 text-gray-300 hover:text-blue-400">Create</a>
              <a href="#artists" className="block px-3 py-2 text-gray-300 hover:text-blue-400">Artists</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-300 hover:text-blue-400">Pricing</a>
              <div className="flex space-x-2 px-3 pt-2">
                <Button variant="outline" size="sm" className="flex-1 border-blue-500 text-blue-400">
                  Sign In
                </Button>
                <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-green-400">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
