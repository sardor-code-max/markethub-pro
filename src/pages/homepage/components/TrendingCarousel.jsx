import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendingCarousel = ({ products = [] }) => {
  const [showQuickView, setShowQuickView] = useState(null);
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    const container = carouselRef?.current;
    if (container) {
      const scrollAmount = 320;
      const newScrollLeft = direction === 'left' 
        ? container?.scrollLeft - scrollAmount 
        : container?.scrollLeft + scrollAmount;
      
      container?.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleQuickView = (productId) => {
    setShowQuickView(productId);
  };

  const handleCloseQuickView = () => {
    setShowQuickView(null);
  };

  const handleAddToCart = (product, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    console.log('Added to cart:', product);
    // Add to cart logic here
  };

  const handleAddToWishlist = (product, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    console.log('Added to wishlist:', product);
    // Add to wishlist logic here
  };

  if (!products?.length) {
    return (
      <div className="text-center py-12">
        <Icon name="Package" size={48} className="text-text-secondary mx-auto mb-4" />
        <p className="text-text-secondary">No trending products available</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Carousel Navigation */}
      <div className="flex justify-end space-x-2 mb-4">
        <button
          onClick={() => scrollCarousel('left')}
          className="p-2 bg-background border border-border rounded-lg hover:bg-muted transition-colors"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
        <button
          onClick={() => scrollCarousel('right')}
          className="p-2 bg-background border border-border rounded-lg hover:bg-muted transition-colors"
        >
          <Icon name="ChevronRight" size={20} />
        </button>
      </div>

      {/* Product Carousel */}
      <div
        ref={carouselRef}
        className="flex space-x-6 overflow-x-auto scroll-smooth scroll-snap-x pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products?.map((product, index) => (
          <div
            key={product?.id}
            className="flex-shrink-0 w-80 scroll-snap-item group"
            onMouseEnter={() => handleQuickView(product?.id)}
            onMouseLeave={handleCloseQuickView}
          >
            <div className="bg-background border border-border rounded-xl overflow-hidden hover-lift">
              {/* Product Image */}
              <div className="relative aspect-product bg-surface">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 image-brand"
                />
                
                {/* Trending Rank Badge */}
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  #{product?.trendingRank}
                </div>

                {/* Quick Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={(e) => handleAddToWishlist(product, e)}
                    className="p-2 bg-background/90 backdrop-blur-brand rounded-full shadow-brand hover:bg-background transition-colors"
                    title="Add to Wishlist"
                  >
                    <Icon name="Heart" size={16} />
                  </button>
                  <button
                    onClick={(e) => handleQuickView(product?.id)}
                    className="p-2 bg-background/90 backdrop-blur-brand rounded-full shadow-brand hover:bg-background transition-colors"
                    title="Quick View"
                  >
                    <Icon name="Eye" size={16} />
                  </button>
                </div>

                {/* Hover Overlay with Quick View */}
                {showQuickView === product?.id && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-200">
                    <div className="bg-background rounded-lg p-4 max-w-xs text-center shadow-brand-lg">
                      <h4 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
                        {product?.name}
                      </h4>
                      
                      <div className="flex items-center justify-center mb-3">
                        <div className="flex items-center text-accent mr-2">
                          {[...Array(5)]?.map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={14}
                              className={i < Math?.floor(product?.rating) ? 'fill-current' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-text-secondary">
                          ({product?.reviewCount?.toLocaleString()})
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        <span className="text-xl font-bold text-text-primary">
                          ${product?.price?.toLocaleString()}
                        </span>
                        {product?.originalPrice && (
                          <span className="text-sm text-text-secondary line-through">
                            ${product?.originalPrice?.toLocaleString()}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={(e) => handleAddToCart(product, e)}
                          className="flex-1"
                        >
                          <Icon name="ShoppingCart" size={14} className="mr-1" />
                          Add to Cart
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                        >
                          <Link to={`/product-detail-page?id=${product?.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <Link 
                  to={`/product-detail-page?id=${product?.id}`}
                  className="block hover:text-primary transition-colors"
                >
                  <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
                    {product?.name}
                  </h3>
                </Link>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center text-accent">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={i < Math?.floor(product?.rating) ? 'fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-text-secondary">
                    {product?.rating} ({product?.reviewCount?.toLocaleString()})
                  </span>
                </div>
                
                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-text-primary">
                      ${product?.price?.toLocaleString()}
                    </span>
                    {product?.originalPrice && product?.originalPrice > product?.price && (
                      <span className="text-sm text-text-secondary line-through">
                        ${product?.originalPrice?.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {product?.originalPrice && product?.originalPrice > product?.price && (
                    <span className="text-sm bg-success text-success-foreground px-2 py-1 rounded">
                      {Math?.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={(e) => handleAddToCart(product, e)}
                    className="flex-1"
                  >
                    <Icon name="ShoppingCart" size={14} className="mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => handleAddToWishlist(product, e)}
                  >
                    <Icon name="Heart" size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {Array?.from({ length: Math?.ceil(products?.length / 3) })?.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-border"
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingCarousel;