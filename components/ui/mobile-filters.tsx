"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Filter, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Check,
  SlidersHorizontal,
  Tag,
  DollarSign,
  Star,
  Palette
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AnimatedButton } from "@/components/ui/animated-button"

interface FilterOption {
  id: string
  label: string
  count?: number
}

interface FilterSection {
  id: string
  title: string
  icon: React.ComponentType<any>
  type: 'checkbox' | 'radio' | 'range' | 'color'
  options?: FilterOption[]
  min?: number
  max?: number
  value?: any
  defaultValue?: any
}

interface MobileFiltersProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: any) => void
  onClearFilters: () => void
  activeFiltersCount?: number
}

const filterSections: FilterSection[] = [
  {
    id: 'category',
    title: 'Category',
    icon: Tag,
    type: 'checkbox',
    options: [
      { id: 'running', label: 'Running', count: 45 },
      { id: 'casual', label: 'Casual', count: 32 },
      { id: 'formal', label: 'Formal', count: 18 },
      { id: 'athletic', label: 'Athletic', count: 28 },
      { id: 'boots', label: 'Boots', count: 15 }
    ]
  },
  {
    id: 'brand',
    title: 'Brand',
    icon: Tag,
    type: 'checkbox',
    options: [
      { id: 'nike', label: 'Nike', count: 42 },
      { id: 'adidas', label: 'Adidas', count: 38 },
      { id: 'puma', label: 'Puma', count: 25 },
      { id: 'reebok', label: 'Reebok', count: 19 },
      { id: 'converse', label: 'Converse', count: 16 }
    ]
  },
  {
    id: 'price',
    title: 'Price Range',
    icon: DollarSign,
    type: 'range',
    min: 0,
    max: 500,
    defaultValue: [0, 500]
  },
  {
    id: 'rating',
    title: 'Rating',
    icon: Star,
    type: 'radio',
    options: [
      { id: '4+', label: '4+ Stars' },
      { id: '3+', label: '3+ Stars' },
      { id: '2+', label: '2+ Stars' },
      { id: '1+', label: '1+ Stars' }
    ]
  },
  {
    id: 'color',
    title: 'Color',
    icon: Palette,
    type: 'color',
    options: [
      { id: 'black', label: 'Black' },
      { id: 'white', label: 'White' },
      { id: 'red', label: 'Red' },
      { id: 'blue', label: 'Blue' },
      { id: 'green', label: 'Green' },
      { id: 'brown', label: 'Brown' }
    ]
  }
]

export function MobileFilters({ 
  isOpen, 
  onClose, 
  onApplyFilters, 
  onClearFilters,
  activeFiltersCount = 0 
}: MobileFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['category', 'brand'])
  const [filters, setFilters] = useState<Record<string, any>>({
    category: [],
    brand: [],
    price: [0, 500],
    rating: '',
    color: []
  })

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const updateFilter = (sectionId: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [sectionId]: value
    }))
  }

  const handleCheckboxChange = (sectionId: string, optionId: string, checked: boolean) => {
    const currentValues = filters[sectionId] || []
    const newValues = checked 
      ? [...currentValues, optionId]
      : currentValues.filter((id: string) => id !== optionId)
    
    updateFilter(sectionId, newValues)
  }

  const handleApplyFilters = () => {
    onApplyFilters(filters)
    onClose()
  }

  const handleClearFilters = () => {
    setFilters({
      category: [],
      brand: [],
      price: [0, 500],
      rating: '',
      color: []
    })
    onClearFilters()
  }

  const getActiveFiltersCount = () => {
    let count = 0
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) count += value.length
      else if (typeof value === 'string' && value) count += 1
      else if (key === 'price' && Array.isArray(value) && (value[0] > 0 || value[1] < 500)) count += 1
    })
    return count
  }

  const colorMap: Record<string, string> = {
    black: 'bg-black',
    white: 'bg-white border-2 border-gray-300',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    brown: 'bg-amber-700'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center space-x-3">
                <SlidersHorizontal className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Filters</h2>
                {getActiveFiltersCount() > 0 && (
                  <Badge variant="secondary" className="bg-primary text-white">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-muted-foreground"
                >
                  Clear All
                </Button>
                <AnimatedButton
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  animation="scale"
                >
                  <X className="h-5 w-5" />
                </AnimatedButton>
              </div>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-1">
                {filterSections.map((section) => {
                  const Icon = section.icon
                  const isExpanded = expandedSections.includes(section.id)
                  
                  return (
                    <div key={section.id} className="border-b border-border/30">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{section.title}</span>
                          {filters[section.id] && (
                            Array.isArray(filters[section.id]) 
                              ? filters[section.id].length > 0 && (
                                  <Badge variant="secondary" className="ml-2 bg-primary text-white text-xs">
                                    {filters[section.id].length}
                                  </Badge>
                                )
                              : filters[section.id] && (
                                  <Badge variant="secondary" className="ml-2 bg-primary text-white text-xs">
                                    1
                                  </Badge>
                                )
                          )}
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4">
                              {section.type === 'checkbox' && section.options && (
                                <div className="space-y-3">
                                  {section.options.map((option) => (
                                    <div key={option.id} className="flex items-center space-x-3">
                                      <Checkbox
                                        id={`${section.id}-${option.id}`}
                                        checked={filters[section.id]?.includes(option.id) || false}
                                        onCheckedChange={(checked) => 
                                          handleCheckboxChange(section.id, option.id, checked as boolean)
                                        }
                                      />
                                      <Label 
                                        htmlFor={`${section.id}-${option.id}`}
                                        className="flex-1 flex items-center justify-between cursor-pointer"
                                      >
                                        <span>{option.label}</span>
                                        {option.count && (
                                          <span className="text-sm text-muted-foreground">
                                            ({option.count})
                                          </span>
                                        )}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {section.type === 'radio' && section.options && (
                                <RadioGroup
                                  value={filters[section.id] || ''}
                                  onValueChange={(value) => updateFilter(section.id, value)}
                                >
                                  <div className="space-y-3">
                                    {section.options.map((option) => (
                                      <div key={option.id} className="flex items-center space-x-3">
                                        <RadioGroupItem value={option.id} id={`${section.id}-${option.id}`} />
                                        <Label htmlFor={`${section.id}-${option.id}`} className="cursor-pointer">
                                          {option.label}
                                        </Label>
                                      </div>
                                    ))}
                                  </div>
                                </RadioGroup>
                              )}

                              {section.type === 'range' && (
                                <div className="space-y-4">
                                  <Slider
                                    value={filters[section.id] || [section.min!, section.max!]}
                                    onValueChange={(value) => updateFilter(section.id, value)}
                                    min={section.min}
                                    max={section.max}
                                    step={10}
                                    className="w-full"
                                  />
                                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>${filters[section.id]?.[0] || section.min}</span>
                                    <span>${filters[section.id]?.[1] || section.max}</span>
                                  </div>
                                </div>
                              )}

                              {section.type === 'color' && section.options && (
                                <div className="grid grid-cols-6 gap-3">
                                  {section.options.map((option) => (
                                    <button
                                      key={option.id}
                                      onClick={() => {
                                        const currentColors = filters[section.id] || []
                                        const isSelected = currentColors.includes(option.id)
                                        const newColors = isSelected
                                          ? currentColors.filter((id: string) => id !== option.id)
                                          : [...currentColors, option.id]
                                        updateFilter(section.id, newColors)
                                      }}
                                      className={`relative w-8 h-8 rounded-full ${colorMap[option.id]} ${
                                        filters[section.id]?.includes(option.id) 
                                          ? 'ring-2 ring-primary ring-offset-2' 
                                          : ''
                                      }`}
                                      title={option.label}
                                    >
                                      {filters[section.id]?.includes(option.id) && (
                                        <Check className="absolute inset-0 m-auto h-4 w-4 text-white" />
                                      )}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border/50 space-y-3">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{getActiveFiltersCount()} filters applied</span>
                <span>Showing 142 products</span>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="flex-1"
                >
                  Clear All
                </Button>
                <AnimatedButton
                  onClick={handleApplyFilters}
                  className="flex-1 bg-gradient-primary"
                  animation="glow"
                >
                  Apply Filters
                </AnimatedButton>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
