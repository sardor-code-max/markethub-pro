import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product, onAddToCart, onBuyNow }) => {
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (selectedVariant?.stock || product?.stock || 99)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selectedVariant,
      quantity
    });
  };

  const handleBuyNow = () => {
    onBuyNow({
      ...product,
      selectedVariant,
      quantity
    });
  };

  const currentPrice = selectedVariant?.price || product?.price;
  const originalPrice = selectedVariant?.originalPrice || product?.originalPrice;
  const discount = originalPrice && currentPrice < originalPrice 
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Product Title and Rating */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
          {product?.name}
        </h1>
        <div className="flex items-center space-x-4 mb-2">
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={16}
                  className={i < Math.floor(product?.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-text-primary">{product?.rating}</span>
            <span className="text-sm text-text-secondary">({product?.reviewCount} reviews)</span>
          </div>
          <div className="text-sm text-text-secondary">
            SKU: {product?.sku}
          </div>
        </div>
        <p className="text-text-secondary">{product?.shortDescription}</p>
      </div>
      {/* Pricing */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold text-text-primary">
            ${currentPrice?.toFixed(2)}
          </span>
          {originalPrice && originalPrice > currentPrice && (
            <>
              <span className="text-lg text-text-secondary line-through">
                ${originalPrice?.toFixed(2)}
              </span>
              <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-sm font-semibold">
                {discount}% OFF
              </span>
            </>
          )}
        </div>
        {product?.freeShipping && (
          <div className="flex items-center space-x-1 text-success">
            <Icon name="Truck" size={16} />
            <span className="text-sm font-medium">Free Shipping</span>
          </div>
        )}
      </div>
      {/* Variants Selection */}
      {product?.variants && product?.variants?.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-text-primary">Options:</h3>
          <div className="grid grid-cols-2 gap-2">
            {product?.variants?.map((variant) => (
              <button
                key={variant?.id}
                onClick={() => setSelectedVariant(variant)}
                className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                  selectedVariant?.id === variant?.id
                    ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-gray-400'
                }`}
              >
                <div className="font-medium">{variant?.name}</div>
                <div className="text-sm text-text-secondary">${variant?.price?.toFixed(2)}</div>
                {variant?.stock < 5 && (
                  <div className="text-xs text-warning">Only {variant?.stock} left</div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Key Features */}
      {product?.keyFeatures && product?.keyFeatures?.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-text-primary">Key Features:</h3>
          <ul className="space-y-2">
            {product?.keyFeatures?.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-text-secondary">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Quantity and Actions */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-primary">Quantity:</span>
            <div className="flex items-center border border-border rounded-lg">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="w-10 h-10 flex items-center justify-center hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="Minus" size={16} />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= (selectedVariant?.stock || product?.stock || 99)}
                className="w-10 h-10 flex items-center justify-center hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="Plus" size={16} />
              </button>
            </div>
          </div>
          <div className="text-sm text-text-secondary">
            {(selectedVariant?.stock || product?.stock || 0) > 0 ? (
              <span className="text-success">In Stock ({selectedVariant?.stock || product?.stock} available)</span>
            ) : (
              <span className="text-error">Out of Stock</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={handleAddToCart}
            disabled={!selectedVariant?.stock && !product?.stock}
            iconName="ShoppingCart"
            iconPosition="left"
          >
            Add to Cart
          </Button>
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={handleBuyNow}
            disabled={!selectedVariant?.stock && !product?.stock}
            iconName="Zap"
            iconPosition="left"
          >
            Buy Now
          </Button>
        </div>
      </div>
      {/* Trust Signals */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-sm text-text-secondary">Secure Payment</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="RotateCcw" size={16} className="text-success" />
          <span className="text-sm text-text-secondary">30-Day Returns</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Truck" size={16} className="text-success" />
          <span className="text-sm text-text-secondary">Fast Delivery</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={16} className="text-success" />
          <span className="text-sm text-text-secondary">Warranty</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;