import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StickyCartBar = ({ product, onAddToCart, onBuyNow }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show sticky bar when user scrolls past the main product info section
      setIsVisible(scrollPosition > windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 99)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      quantity
    });
  };

  const handleBuyNow = () => {
    onBuyNow({
      ...product,
      quantity
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border shadow-brand-lg lg:hidden">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-3">
          {/* Product Image and Info */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-12 h-12 bg-surface rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={product?.images?.[0]?.url}
                alt={product?.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-text-primary truncate text-sm">
                {product?.name}
              </h3>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-primary">
                  ${product?.price?.toFixed(2)}
                </span>
                {product?.originalPrice && product?.originalPrice > product?.price && (
                  <span className="text-xs text-text-secondary line-through">
                    ${product?.originalPrice?.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Minus" size={14} />
            </button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= (product?.stock || 99)}
              className="w-8 h-8 flex items-center justify-center hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Plus" size={14} />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddToCart}
              disabled={!product?.stock}
              iconName="ShoppingCart"
              className="px-3"
            >
              <span className="sr-only">Add to Cart</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleBuyNow}
              disabled={!product?.stock}
              className="px-4"
            >
              Buy Now
            </Button>
          </div>
        </div>

        {/* Stock Status */}
        {product?.stock <= 5 && product?.stock > 0 && (
          <div className="mt-2 text-center">
            <span className="text-xs text-warning bg-warning/10 px-2 py-1 rounded">
              Only {product?.stock} left in stock
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StickyCartBar;