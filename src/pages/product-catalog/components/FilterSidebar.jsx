import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters, isOpen, onClose }) => {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    category: true,
    brand: true,
    rating: true,
    features: false
  });

  const categories = [
    { id: 'electronics', name: 'Electronics', count: 1247 },
    { id: 'clothing', name: 'Clothing & Fashion', count: 892 },
    { id: 'home', name: 'Home & Garden', count: 634 },
    { id: 'sports', name: 'Sports & Outdoors', count: 456 },
    { id: 'books', name: 'Books & Media', count: 321 },
    { id: 'toys', name: 'Toys & Games', count: 289 }
  ];

  const brands = [
    { id: 'apple', name: 'Apple', count: 156 },
    { id: 'samsung', name: 'Samsung', count: 134 },
    { id: 'nike', name: 'Nike', count: 98 },
    { id: 'adidas', name: 'Adidas', count: 87 },
    { id: 'sony', name: 'Sony', count: 76 },
    { id: 'lg', name: 'LG', count: 65 }
  ];

  const features = [
    { id: 'free-shipping', name: 'Free Shipping', count: 2341 },
    { id: 'prime-eligible', name: 'Prime Eligible', count: 1876 },
    { id: 'on-sale', name: 'On Sale', count: 567 },
    { id: 'new-arrivals', name: 'New Arrivals', count: 234 },
    { id: 'eco-friendly', name: 'Eco-Friendly', count: 189 }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handlePriceChange = (field, value) => {
    const newRange = { ...priceRange, [field]: value };
    setPriceRange(newRange);
    onFilterChange('priceRange', newRange);
  };

  const handleRatingChange = (rating) => {
    const currentRatings = filters?.ratings || [];
    const newRatings = currentRatings?.includes(rating)
      ? currentRatings?.filter(r => r !== rating)
      : [...currentRatings, rating];
    onFilterChange('ratings', newRatings);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={14}
            className={star <= rating ? 'text-accent fill-current' : 'text-gray-300'}
          />
        ))}
        <span className="text-sm text-text-secondary ml-1">& up</span>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}
      {/* Sidebar */}
      <div className={`fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-background border-r border-border transform transition-transform duration-300 ease-in-out lg:transform-none ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
            <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Clear Filters */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-text-primary">Filters</h3>
              <Button variant="ghost" size="sm" onClick={onClearFilters}>
                <Icon name="RotateCcw" size={16} className="mr-1" />
                Clear All
              </Button>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <button
                onClick={() => toggleSection('price')}
                className="flex items-center justify-between w-full text-left"
              >
                <h4 className="text-sm font-medium text-text-primary">Price Range</h4>
                <Icon
                  name={expandedSections?.price ? "ChevronUp" : "ChevronDown"}
                  size={16}
                  className="text-text-secondary"
                />
              </button>
              
              {expandedSections?.price && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange?.min}
                      onChange={(e) => handlePriceChange('min', e?.target?.value)}
                      className="flex-1"
                    />
                    <span className="text-text-secondary">-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange?.max}
                      onChange={(e) => handlePriceChange('max', e?.target?.value)}
                      className="flex-1"
                    />
                  </div>
                  <div className="space-y-2">
                    {['Under $25', '$25 - $50', '$50 - $100', '$100 - $200', 'Over $200']?.map((range) => (
                      <Checkbox
                        key={range}
                        label={range}
                        checked={filters?.priceRanges?.includes(range) || false}
                        onChange={(e) => {
                          const current = filters?.priceRanges || [];
                          const updated = e?.target?.checked
                            ? [...current, range]
                            : current?.filter(r => r !== range);
                          onFilterChange('priceRanges', updated);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <button
                onClick={() => toggleSection('category')}
                className="flex items-center justify-between w-full text-left"
              >
                <h4 className="text-sm font-medium text-text-primary">Categories</h4>
                <Icon
                  name={expandedSections?.category ? "ChevronUp" : "ChevronDown"}
                  size={16}
                  className="text-text-secondary"
                />
              </button>
              
              {expandedSections?.category && (
                <div className="space-y-2">
                  {categories?.map((category) => (
                    <div key={category?.id} className="flex items-center justify-between">
                      <Checkbox
                        label={category?.name}
                        checked={filters?.categories?.includes(category?.id) || false}
                        onChange={(e) => {
                          const current = filters?.categories || [];
                          const updated = e?.target?.checked
                            ? [...current, category?.id]
                            : current?.filter(c => c !== category?.id);
                          onFilterChange('categories', updated);
                        }}
                      />
                      <span className="text-xs text-text-secondary">({category?.count})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Brands */}
            <div className="space-y-3">
              <button
                onClick={() => toggleSection('brand')}
                className="flex items-center justify-between w-full text-left"
              >
                <h4 className="text-sm font-medium text-text-primary">Brands</h4>
                <Icon
                  name={expandedSections?.brand ? "ChevronUp" : "ChevronDown"}
                  size={16}
                  className="text-text-secondary"
                />
              </button>
              
              {expandedSections?.brand && (
                <div className="space-y-2">
                  {brands?.map((brand) => (
                    <div key={brand?.id} className="flex items-center justify-between">
                      <Checkbox
                        label={brand?.name}
                        checked={filters?.brands?.includes(brand?.id) || false}
                        onChange={(e) => {
                          const current = filters?.brands || [];
                          const updated = e?.target?.checked
                            ? [...current, brand?.id]
                            : current?.filter(b => b !== brand?.id);
                          onFilterChange('brands', updated);
                        }}
                      />
                      <span className="text-xs text-text-secondary">({brand?.count})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Customer Ratings */}
            <div className="space-y-3">
              <button
                onClick={() => toggleSection('rating')}
                className="flex items-center justify-between w-full text-left"
              >
                <h4 className="text-sm font-medium text-text-primary">Customer Ratings</h4>
                <Icon
                  name={expandedSections?.rating ? "ChevronUp" : "ChevronDown"}
                  size={16}
                  className="text-text-secondary"
                />
              </button>
              
              {expandedSections?.rating && (
                <div className="space-y-2">
                  {[4, 3, 2, 1]?.map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox
                        checked={filters?.ratings?.includes(rating) || false}
                        onChange={() => handleRatingChange(rating)}
                      />
                      {renderStars(rating)}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Features */}
            <div className="space-y-3">
              <button
                onClick={() => toggleSection('features')}
                className="flex items-center justify-between w-full text-left"
              >
                <h4 className="text-sm font-medium text-text-primary">Features</h4>
                <Icon
                  name={expandedSections?.features ? "ChevronUp" : "ChevronDown"}
                  size={16}
                  className="text-text-secondary"
                />
              </button>
              
              {expandedSections?.features && (
                <div className="space-y-2">
                  {features?.map((feature) => (
                    <div key={feature?.id} className="flex items-center justify-between">
                      <Checkbox
                        label={feature?.name}
                        checked={filters?.features?.includes(feature?.id) || false}
                        onChange={(e) => {
                          const current = filters?.features || [];
                          const updated = e?.target?.checked
                            ? [...current, feature?.id]
                            : current?.filter(f => f !== feature?.id);
                          onFilterChange('features', updated);
                        }}
                      />
                      <span className="text-xs text-text-secondary">({feature?.count})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Apply Filters Button (Mobile) */}
          <div className="p-4 border-t border-border lg:hidden">
            <Button fullWidth onClick={onClose}>
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;