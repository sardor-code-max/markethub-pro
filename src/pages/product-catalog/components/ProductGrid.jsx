import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ 
  products, 
  viewMode, 
  onAddToCart, 
  onToggleWishlist, 
  onToggleCompare,
  wishlistItems = [],
  comparisonItems = [],
  loading = false 
}) => {
  if (loading) {
    return (
      <div className={`grid gap-6 ${
        viewMode === 'list' ?'grid-cols-1' :'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}>
        {Array.from({ length: 12 })?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="aspect-square bg-surface shimmer" />
            <div className="p-4 space-y-3">
              <div className="h-3 bg-surface shimmer rounded" />
              <div className="h-4 bg-surface shimmer rounded w-3/4" />
              <div className="h-3 bg-surface shimmer rounded w-1/2" />
              <div className="h-6 bg-surface shimmer rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-surface rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-text-primary mb-2">No products found</h3>
        <p className="text-text-secondary mb-6">Try adjusting your filters or search terms</p>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="text-sm text-text-secondary">Popular searches:</span>
          {['Electronics', 'Clothing', 'Home & Garden', 'Sports']?.map((term) => (
            <button
              key={term}
              className="text-sm text-primary hover:underline"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${
      viewMode === 'list' ?'grid-cols-1' :'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    }`}>
      {products?.map((product) => (
        <ProductCard
          key={product?.id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          onToggleCompare={onToggleCompare}
          isInWishlist={wishlistItems?.includes(product?.id)}
          isInComparison={comparisonItems?.includes(product?.id)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;