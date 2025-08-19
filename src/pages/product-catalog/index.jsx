import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FilterSidebar from './components/FilterSidebar';
import SortingToolbar from './components/SortingToolbar';
import ProductGrid from './components/ProductGrid';
import ComparisonDrawer from './components/ComparisonDrawer';
import Pagination from './components/Pagination';
import Icon from '../../components/AppIcon';

const ProductCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [isComparisonDrawerOpen, setIsComparisonDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [wishlistItems, setWishlistItems] = useState([]);
  const [comparisonItems, setComparisonItems] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRanges: [],
    ratings: [],
    features: [],
    priceRange: { min: '', max: '' }
  });

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB Natural Titanium",
      brand: "Apple",
      price: 1199,
      originalPrice: 1299,
      rating: 4.8,
      reviewCount: 2847,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      stock: 15,
      isNew: true,
      isBestSeller: true,
      freeShipping: true,
      fastDelivery: true,
      seller: { verified: true },
      keyFeatures: ["A17 Pro chip", "Titanium design", "Action Button", "USB-C"]
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra 512GB Titanium Black",
      brand: "Samsung",
      price: 1299,
      originalPrice: 1399,
      rating: 4.7,
      reviewCount: 1923,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
      stock: 8,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      fastDelivery: true,
      seller: { verified: true },
      keyFeatures: ["S Pen included", "200MP camera", "AI features", "5000mAh battery"]
    },
    {
      id: 3,
      name: "MacBook Pro 14-inch M3 Pro 18GB RAM 512GB SSD",
      brand: "Apple",
      price: 2399,
      originalPrice: 2599,
      rating: 4.9,
      reviewCount: 1456,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
      stock: 5,
      isNew: true,
      isBestSeller: true,
      freeShipping: true,
      fastDelivery: false,
      seller: { verified: true },
      keyFeatures: ["M3 Pro chip", "Liquid Retina XDR", "22-hour battery", "MagSafe 3"]
    },
    {
      id: 4,
      name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
      brand: "Sony",
      price: 349,
      originalPrice: 399,
      rating: 4.6,
      reviewCount: 3421,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      stock: 23,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      fastDelivery: true,
      seller: { verified: true },
      keyFeatures: ["30-hour battery", "Industry-leading ANC", "Multipoint connection", "Quick Attention"]
    },
    {
      id: 5,
      name: "Nike Air Jordan 1 Retro High OG Chicago Lost and Found",
      brand: "Nike",
      price: 180,
      originalPrice: 200,
      rating: 4.5,
      reviewCount: 892,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      stock: 12,
      isNew: false,
      isBestSeller: false,
      freeShipping: false,
      fastDelivery: true,
      seller: { verified: true },
      keyFeatures: ["Premium leather", "Classic colorway", "Air cushioning", "Rubber outsole"]
    },
    {
      id: 6,
      name: "Dyson V15 Detect Absolute Cordless Vacuum",
      brand: "Dyson",
      price: 649,
      originalPrice: 749,
      rating: 4.4,
      reviewCount: 1567,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      stock: 7,
      isNew: false,
      isBestSeller: false,
      freeShipping: true,
      fastDelivery: false,
      seller: { verified: true },
      keyFeatures: ["Laser dust detection", "60-minute runtime", "5-stage filtration", "LCD screen"]
    },
    {
      id: 7,
      name: "LG OLED55C3PUA 55-Inch Class C3 Series OLED 4K Smart TV",
      brand: "LG",
      price: 1299,
      originalPrice: 1499,
      rating: 4.7,
      reviewCount: 2134,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
      stock: 3,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      fastDelivery: false,
      seller: { verified: true },
      keyFeatures: ["OLED display", "webOS 23", "α9 Gen6 AI Processor", "Dolby Vision IQ"]
    },
    {
      id: 8,
      name: "KitchenAid Artisan Series 5-Qt Stand Mixer Empire Red",
      brand: "KitchenAid",
      price: 379,
      originalPrice: 429,
      rating: 4.8,
      reviewCount: 4521,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      stock: 18,
      isNew: false,
      isBestSeller: true,
      freeShipping: true,
      fastDelivery: true,
      seller: { verified: true },
      keyFeatures: ["5-quart bowl", "10 speeds", "Tilt-head design", "Dishwasher-safe bowl"]
    }
  ];

  const totalProducts = 2847;
  const productsPerPage = 24;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [filters, sortBy, currentPage]);

  // Handle search params
  useEffect(() => {
    const category = searchParams?.get('category');
    const search = searchParams?.get('search');
    
    if (category) {
      setFilters(prev => ({
        ...prev,
        categories: [category]
      }));
    }
  }, [searchParams]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRanges: [],
      ratings: [],
      features: [],
      priceRange: { min: '', max: '' }
    });
    setCurrentPage(1);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
    // Show success notification
  };

  const handleToggleWishlist = (productId) => {
    setWishlistItems(prev => 
      prev?.includes(productId)
        ? prev?.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleToggleCompare = (productId) => {
    setComparisonItems(prev => {
      const newItems = prev?.includes(productId)
        ? prev?.filter(id => id !== productId)
        : [...prev, productId]?.slice(0, 4); // Max 4 items
      
      setIsComparisonDrawerOpen(newItems?.length > 0);
      return newItems;
    });
  };

  const handleRemoveFromComparison = (productId) => {
    setComparisonItems(prev => {
      const newItems = prev?.filter(id => id !== productId);
      setIsComparisonDrawerOpen(newItems?.length > 0);
      return newItems;
    });
  };

  const handleCompareAll = () => {
    console.log('Compare products:', comparisonItems);
    // Navigate to comparison page
  };

  const getComparisonProducts = () => {
    return mockProducts?.filter(product => comparisonItems?.includes(product?.id));
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters)?.reduce((count, filter) => {
      if (Array.isArray(filter)) {
        return count + filter?.length;
      }
      if (typeof filter === 'object' && filter?.min && filter?.max) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            isOpen={isFilterSidebarOpen}
            onClose={() => setIsFilterSidebarOpen(false)}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
              <a href="/homepage" className="hover:text-text-primary">Home</a>
              <Icon name="ChevronRight" size={14} />
              <span className="text-text-primary">Products</span>
              {searchParams?.get('category') && (
                <>
                  <Icon name="ChevronRight" size={14} />
                  <span className="text-text-primary capitalize">
                    {searchParams?.get('category')}
                  </span>
                </>
              )}
            </nav>

            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                {searchParams?.get('search') 
                  ? `Search results for "${searchParams?.get('search')}"` 
                  : searchParams?.get('category')
                    ? `${searchParams?.get('category')} Products`
                    : 'All Products'
                }
              </h1>
              
              {getActiveFiltersCount() > 0 && (
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-text-secondary">Active filters:</span>
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                    {getActiveFiltersCount()} applied
                  </span>
                  <button
                    onClick={handleClearFilters}
                    className="text-primary hover:underline text-xs"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Sorting Toolbar */}
            <SortingToolbar
              sortBy={sortBy}
              onSortChange={handleSortChange}
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange}
              resultsCount={totalProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              onToggleFilters={() => setIsFilterSidebarOpen(true)}
            />

            {/* Product Grid */}
            <div className="py-6">
              <ProductGrid
                products={mockProducts}
                viewMode={viewMode}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                onToggleCompare={handleToggleCompare}
                wishlistItems={wishlistItems}
                comparisonItems={comparisonItems}
                loading={loading}
              />
            </div>

            {/* Pagination */}
            <div className="mt-8 mb-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>

            {/* Related Categories */}
            <div className="mt-12 p-6 bg-surface rounded-lg">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Related Categories
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Smartphones', count: 1247, icon: 'Smartphone' },
                  { name: 'Laptops', count: 892, icon: 'Laptop' },
                  { name: 'Headphones', count: 634, icon: 'Headphones' },
                  { name: 'Smart Home', count: 456, icon: 'Home' }
                ]?.map((category) => (
                  <a
                    key={category?.name}
                    href={`/product-catalog?category=${category?.name?.toLowerCase()}`}
                    className="flex items-center space-x-3 p-3 bg-background border border-border rounded-lg hover:border-primary transition-colors"
                  >
                    <Icon name={category?.icon} size={20} className="text-primary" />
                    <div>
                      <div className="text-sm font-medium text-text-primary">
                        {category?.name}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {category?.count} products
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Comparison Drawer */}
      <ComparisonDrawer
        products={getComparisonProducts()}
        isOpen={isComparisonDrawerOpen}
        onClose={() => setIsComparisonDrawerOpen(false)}
        onRemoveProduct={handleRemoveFromComparison}
        onCompareAll={handleCompareAll}
      />
    </div>
  );
};

export default ProductCatalog;