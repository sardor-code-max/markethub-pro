import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SortingToolbar = ({ 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange, 
  resultsCount, 
  currentPage, 
  totalPages,
  onToggleFilters,
  showFiltersButton = true 
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Best Match' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'discount', label: 'Highest Discount' }
  ];

  const viewModes = [
    { mode: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { mode: 'list', icon: 'List', label: 'List View' }
  ];

  const formatResultsText = () => {
    const start = (currentPage - 1) * 24 + 1;
    const end = Math.min(currentPage * 24, resultsCount);
    return `${start}-${end} of ${resultsCount?.toLocaleString()} results`;
  };

  return (
    <div className="sticky top-0 z-30 bg-background border-b border-border shadow-sm">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Left Section - Results Count & Filter Toggle */}
          <div className="flex items-center space-x-4">
            {showFiltersButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={onToggleFilters}
                className="lg:hidden"
              >
                <Icon name="Filter" size={16} className="mr-2" />
                Filters
              </Button>
            )}
            
            <div className="text-sm text-text-secondary">
              {formatResultsText()}
            </div>
          </div>

          {/* Right Section - Sort & View Controls */}
          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary whitespace-nowrap">Sort by:</span>
              <Select
                options={sortOptions}
                value={sortBy}
                onChange={onSortChange}
                className="min-w-[160px]"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center space-x-1 bg-surface rounded-lg p-1">
              {viewModes?.map(({ mode, icon, label }) => (
                <button
                  key={mode}
                  onClick={() => onViewModeChange(mode)}
                  className={`p-2 rounded transition-colors ${
                    viewMode === mode
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-background'
                  }`}
                  title={label}
                >
                  <Icon name={icon} size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Sort & View Controls */}
        <div className="sm:hidden mt-3 flex items-center justify-between">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            className="flex-1 mr-3"
          />
          
          <div className="flex items-center space-x-1 bg-surface rounded-lg p-1">
            {viewModes?.map(({ mode, icon, label }) => (
              <button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                className={`p-2 rounded transition-colors ${
                  viewMode === mode
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-background'
                }`}
                title={label}
              >
                <Icon name={icon} size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Quick Filters Bar */}
      <div className="px-4 py-2 bg-surface border-t border-border">
        <div className="flex items-center space-x-2 overflow-x-auto">
          <span className="text-xs text-text-secondary whitespace-nowrap">Quick filters:</span>
          
          {[
            { label: 'Free Shipping', icon: 'Truck' },
            { label: 'On Sale', icon: 'Tag' },
            { label: 'Prime Eligible', icon: 'Zap' },
            { label: '4+ Stars', icon: 'Star' },
            { label: 'New Arrivals', icon: 'Sparkles' }
          ]?.map((filter) => (
            <button
              key={filter?.label}
              className="flex items-center space-x-1 px-3 py-1 bg-background border border-border rounded-full text-xs text-text-secondary hover:text-text-primary hover:border-primary transition-colors whitespace-nowrap"
            >
              <Icon name={filter?.icon} size={12} />
              <span>{filter?.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortingToolbar;