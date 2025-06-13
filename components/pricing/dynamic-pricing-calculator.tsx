
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { usePricingStore } from '@/stores/pricing-store'
import { Calculator, ChevronDown, ChevronUp, Tag, X } from 'lucide-react'

export const DynamicPricingCalculator: React.FC = () => {
  const {
    pricingFactors,
    priceBreakdown,
    activeDiscountCode,
    isCalculating,
    showBreakdown,
    updatePricingFactors,
    applyDiscountCode,
    removeDiscountCode,
    toggleBreakdown
  } = usePricingStore()

  const [discountInput, setDiscountInput] = React.useState('')

  const handleApplyDiscount = () => {
    if (discountInput.trim()) {
      applyDiscountCode(discountInput.trim())
      setDiscountInput('')
    }
  }

  const bodyParts = [
    { value: 'arm', label: 'Arm' },
    { value: 'leg', label: 'Leg' },
    { value: 'back', label: 'Back' },
    { value: 'chest', label: 'Chest' },
    { value: 'face', label: 'Face' },
    { value: 'hand', label: 'Hand' },
    { value: 'neck', label: 'Neck' }
  ]

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Pricing Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Size Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-gray-300 font-medium">Size</label>
            <Badge variant="outline">{pricingFactors.size}/10</Badge>
          </div>
          <Slider
            value={[pricingFactors.size]}
            onValueChange={([value]) => updatePricingFactors({ size: value })}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Small</span>
            <span>Large</span>
          </div>
        </div>

        {/* Complexity Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-gray-300 font-medium">Complexity</label>
            <Badge variant="outline">{pricingFactors.complexity}/10</Badge>
          </div>
          <Slider
            value={[pricingFactors.complexity]}
            onValueChange={([value]) => updatePricingFactors({ complexity: value })}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Simple</span>
            <span>Complex</span>
          </div>
        </div>

        {/* Number of Colors */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-gray-300 font-medium">Number of Colors</label>
            <Badge variant="outline">{pricingFactors.colors}</Badge>
          </div>
          <Slider
            value={[pricingFactors.colors]}
            onValueChange={([value]) => updatePricingFactors({ colors: value })}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1 color</span>
            <span>10+ colors</span>
          </div>
        </div>

        {/* Body Placement */}
        <div className="space-y-3">
          <label className="text-gray-300 font-medium">Body Placement</label>
          <Select
            value={pricingFactors.placement}
            onValueChange={(value) => updatePricingFactors({ placement: value })}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {bodyParts.map((part) => (
                <SelectItem key={part.value} value={part.value}>
                  {part.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Discount Code */}
        <div className="space-y-3">
          <label className="text-gray-300 font-medium">Discount Code</label>
          {activeDiscountCode ? (
            <div className="flex items-center justify-between p-3 bg-green-900/20 border border-green-700 rounded-lg">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-medium">{activeDiscountCode.code}</span>
                <Badge variant="secondary">{activeDiscountCode.percentage}% off</Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeDiscountCode}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Enter discount code"
                value={discountInput}
                onChange={(e) => setDiscountInput(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                onKeyDown={(e) => e.key === 'Enter' && handleApplyDiscount()}
              />
              <Button onClick={handleApplyDiscount} variant="outline">
                Apply
              </Button>
            </div>
          )}
        </div>

        {/* Price Display */}
        <motion.div
          className="p-6 bg-gradient-to-r from-electric-blue/10 to-neon-green/10 border border-electric-blue/20 rounded-lg"
          animate={{ scale: isCalculating ? 0.98 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Estimated Price</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleBreakdown}
              className="text-gray-400 hover:text-white"
            >
              {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
          
          <motion.div
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-green"
            animate={{ opacity: isCalculating ? 0.5 : 1 }}
          >
            ${priceBreakdown.total.toFixed(2)}
          </motion.div>

          {showBreakdown && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-700 space-y-2 text-sm"
            >
              <div className="flex justify-between text-gray-300">
                <span>Base Price:</span>
                <span>${priceBreakdown.basePrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Size Multiplier:</span>
                <span>{priceBreakdown.sizeMultiplier.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Complexity Multiplier:</span>
                <span>{priceBreakdown.complexityMultiplier.toFixed(2)}x</span>
              </div>
              {priceBreakdown.colorCost > 0 && (
                <div className="flex justify-between text-gray-300">
                  <span>Additional Colors:</span>
                  <span>+${priceBreakdown.colorCost.toFixed(2)}</span>
                </div>
              )}
              {priceBreakdown.placementCost > 0 && (
                <div className="flex justify-between text-gray-300">
                  <span>Placement Premium:</span>
                  <span>+${priceBreakdown.placementCost.toFixed(2)}</span>
                </div>
              )}
              {priceBreakdown.discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Discount:</span>
                  <span>-${priceBreakdown.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-white font-semibold pt-2 border-t border-gray-700">
                <span>Total:</span>
                <span>${priceBreakdown.total.toFixed(2)}</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        <Button className="w-full bg-gradient-to-r from-electric-blue to-neon-green hover:from-electric-blue/90 hover:to-neon-green/90">
          Get Quote
        </Button>
      </CardContent>
    </Card>
  )
}
