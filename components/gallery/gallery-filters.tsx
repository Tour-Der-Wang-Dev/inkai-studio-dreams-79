
'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useGalleryStore } from '@/stores/gallery-store'
import { Search, ChevronDown, Filter, X, Save, BookmarkPlus, Trash2 } from 'lucide-react'
import { useDebounce } from '@/hooks/use-debounce'

const STYLE_OPTIONS = ['Realistic', 'Traditional', 'Geometric', 'Watercolor', 'Minimalist', 'Neo-Traditional', 'Biomechanical', 'Abstract'];
const BODY_PART_OPTIONS = ['Arm', 'Leg', 'Back', 'Chest', 'Shoulder', 'Wrist', 'Neck', 'Face', 'Hand', 'Foot'];
const COLOR_OPTIONS = ['Black', 'Red', 'Blue', 'Green', 'Purple', 'Orange', 'Yellow', 'Pink', 'Brown', 'Gray'];
const ARTIST_OPTIONS = ['Alex Chen', 'Sarah Kim', 'Mike Rodriguez', 'Emma Thompson', 'David Park', 'Lisa Wang'];
const SORT_OPTIONS = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
];

export const GalleryFilters: React.FC = () => {
  const {
    filters,
    setFilters,
    resetFilters,
    filterPresets,
    saveFilterPreset,
    loadFilterPreset,
    deleteFilterPreset,
  } = useGalleryStore()

  const [searchInput, setSearchInput] = useState(filters.searchQuery)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    search: true,
    styles: true,
    bodyParts: false,
    colors: false,
    artists: false,
    advanced: false,
  })
  const [presetName, setPresetName] = useState('')
  const [showPresetInput, setShowPresetInput] = useState(false)

  // Debounce search query
  const debouncedSearch = useDebounce(searchInput, 300)
  
  React.useEffect(() => {
    setFilters({ searchQuery: debouncedSearch })
  }, [debouncedSearch, setFilters])

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const toggleFilter = (type: keyof typeof filters, value: string) => {
    const currentValues = filters[type] as string[]
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]
    setFilters({ [type]: newValues })
  }

  const removeFilter = (type: keyof typeof filters, value: string) => {
    const currentValues = filters[type] as string[]
    setFilters({ [type]: currentValues.filter(v => v !== value) })
  }

  const handleSavePreset = () => {
    if (presetName.trim()) {
      saveFilterPreset(presetName.trim())
      setPresetName('')
      setShowPresetInput(false)
    }
  }

  const activeFiltersCount = useMemo(() => {
    return (
      filters.styles.length +
      filters.bodyParts.length +
      filters.colors.length +
      filters.artists.length +
      (filters.searchQuery ? 1 : 0) +
      (filters.isAiOnly ? 1 : 0)
    )
  }, [filters])

  const FilterSection = ({ title, isOpen, onToggle, children }: {
    title: string
    isOpen: boolean
    onToggle: () => void
    children: React.ReactNode
  }) => (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between text-left text-white hover:bg-gray-800"
          onClick={onToggle}
        >
          {title}
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 pt-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )

  return (
    <Card className="bg-gray-900 border-gray-800 p-6 sticky top-24">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-electric-blue" />
            <h2 className="text-lg font-semibold text-white">Filters</h2>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-electric-blue text-black">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-gray-400 hover:text-white"
          >
            Clear All
          </Button>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.styles.map(style => (
              <Badge key={style} variant="secondary" className="bg-gray-700 text-white">
                {style}
                <X
                  className="w-3 h-3 ml-1 cursor-pointer"
                  onClick={() => removeFilter('styles', style)}
                />
              </Badge>
            ))}
            {filters.bodyParts.map(part => (
              <Badge key={part} variant="secondary" className="bg-gray-700 text-white">
                {part}
                <X
                  className="w-3 h-3 ml-1 cursor-pointer"
                  onClick={() => removeFilter('bodyParts', part)}
                />
              </Badge>
            ))}
            {filters.colors.map(color => (
              <Badge key={color} variant="secondary" className="bg-gray-700 text-white">
                {color}
                <X
                  className="w-3 h-3 ml-1 cursor-pointer"
                  onClick={() => removeFilter('colors', color)}
                />
              </Badge>
            ))}
            {filters.artists.map(artist => (
              <Badge key={artist} variant="secondary" className="bg-gray-700 text-white">
                {artist}
                <X
                  className="w-3 h-3 ml-1 cursor-pointer"
                  onClick={() => removeFilter('artists', artist)}
                />
              </Badge>
            ))}
          </div>
        )}

        {/* Search */}
        <FilterSection
          title="Search"
          isOpen={open




.search}
          onToggle={() => toggleSection('search')}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search designs, artists, styles..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </FilterSection>

        {/* Sort */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-300">Sort By</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between bg-gray-800 border-gray-700 text-white">
                {SORT_OPTIONS.find(opt => opt.value === filters.sortBy)?.label}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full bg-gray-800 border-gray-700">
              {SORT_OPTIONS.map(option => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setFilters({ sortBy: option.value as any })}
                  className="text-white hover:bg-gray-700"
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* AI Only Toggle */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-300">AI Enhanced Only</label>
          <Switch
            checked={filters.isAiOnly}
            onCheckedChange={(checked) => setFilters({ isAiOnly: checked })}
          />
        </div>

        {/* Styles */}
        <FilterSection
          title="Styles"
          isOpen={openSections.styles}
          onToggle={() => toggleSection('styles')}
        >
          <div className="grid grid-cols-2 gap-2">
            {STYLE_OPTIONS.map(style => (
              <Button
                key={style}
                variant={filters.styles.includes(style) ? "default" : "outline"}
                size="sm"
                className={`text-xs ${
                  filters.styles.includes(style)
                    ? 'bg-electric-blue text-black'
                    : 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
                }`}
                onClick={() => toggleFilter('styles', style)}
              >
                {style}
              </Button>
            ))}
          </div>
        </FilterSection>

        {/* Body Parts */}
        <FilterSection
          title="Body Parts"
          isOpen={openSections.bodyParts}
          onToggle={() => toggleSection('bodyParts')}
        >
          <div className="grid grid-cols-2 gap-2">
            {BODY_PART_OPTIONS.map(part => (
              <Button
                key={part}
                variant={filters.bodyParts.includes(part) ? "default" : "outline"}
                size="sm"
                className={`text-xs ${
                  filters.bodyParts.includes(part)
                    ? 'bg-electric-blue text-black'
                    : 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
                }`}
                onClick={() => toggleFilter('bodyParts', part)}
              >
                {part}
              </Button>
            ))}
          </div>
        </FilterSection>

        {/* Colors */}
        <FilterSection
          title="Colors"
          isOpen={openSections.colors}
          onToggle={() => toggleSection('colors')}
        >
          <div className="grid grid-cols-3 gap-2">
            {COLOR_OPTIONS.map(color => (
              <Button
                key={color}
                variant={filters.colors.includes(color) ? "default" : "outline"}
                size="sm"
                className={`text-xs ${
                  filters.colors.includes(color)
                    ? 'bg-electric-blue text-black'
                    : 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
                }`}
                onClick={() => toggleFilter('colors', color)}
              >
                {color}
              </Button>
            ))}
          </div>
        </FilterSection>

        {/* Artists */}
        <FilterSection
          title="Artists"
          isOpen={openSections.artists}
          onToggle={() => toggleSection('artists')}
        >
          <div className="space-y-2">
            {ARTIST_OPTIONS.map(artist => (
              <Button
                key={artist}
                variant={filters.artists.includes(artist) ? "default" : "outline"}
                size="sm"
                className={`w-full text-xs ${
                  filters.artists.includes(artist)
                    ? 'bg-electric-blue text-black'
                    : 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
                }`}
                onClick={() => toggleFilter('artists', artist)}
              >
                {artist}
              </Button>
            ))}
          </div>
        </FilterSection>

        {/* Filter Presets */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-300">Filter Presets</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPresetInput(!showPresetInput)}
              className="text-electric-blue hover:text-electric-blue/80"
            >
              <BookmarkPlus className="w-4 h-4" />
            </Button>
          </div>

          <AnimatePresence>
            {showPresetInput && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <Input
                  placeholder="Preset name..."
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={handleSavePreset}
                    className="bg-electric-blue text-black hover:bg-electric-blue/80"
                  >
                    <Save className="w-3 h-3 mr-1" />
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPresetInput(false)}
                    className="text-gray-400"
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {filterPresets.length > 0 && (
            <div className="space-y-2">
              {filterPresets.map(preset => (
                <div
                  key={preset.id}
                  className="flex items-center justify-between p-2 bg-gray-800 rounded-md"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => loadFilterPreset(preset.id)}
                    className="text-left text-white hover:bg-gray-700 flex-1"
                  >
                    {preset.name}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteFilterPreset(preset.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
