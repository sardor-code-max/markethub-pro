import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ComparisonDrawer = ({ products, isOpen, onClose, onRemoveProduct, onCompareAll }) => {
  if (!isOpen || products?.length === 0) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={12}
            className={star <= rating ? 'text-accent fill-current' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-brand-lg transform transition-transform duration-300">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="GitCompare" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-text-primary">
              Compare Products ({products?.length})
            </h3>
          </div>
          
          <div className="flex items-center space-x-2">
            {products?.length >= 2 && (
              <Button variant="default" size="sm" onClick={onCompareAll}>
                Compare All
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Products */}
        <div className="py-4">
          <div className="flex space-x-4 overflow-x-auto">
            {products?.map((product) => (
              <div key={product?.id} className="flex-shrink-0 w-48 bg-card border border-border rounded-lg p-3">
                {/* Remove Button */}
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => onRemoveProduct(product?.id)}
                    className="p-1 text-text-secondary hover:text-error transition-colors"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>

                {/* Product Image */}
                <div className="aspect-square mb-3 overflow-hidden rounded bg-surface">
                  <Image
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-text-primary line-clamp-2">
                    {product?.name}
                  </h4>
                  
                  <div className="flex items-center space-x-1">
                    {renderStars(product?.rating)}
                    <span className="text-xs text-text-secondary">
                      ({product?.reviewCount})
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-text-primary">
                      {formatPrice(product?.price)}
                    </span>
                    {product?.originalPrice && product?.originalPrice > product?.price && (
                      <span className="text-xs text-text-secondary line-through">
                        {formatPrice(product?.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Key Features */}
                  <div className="space-y-1">
                    {product?.keyFeatures?.slice(0, 2)?.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-1">
                        <Icon name="Check" size={10} className="text-success" />
                        <span className="text-xs text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Add More Placeholder */}
            {products?.length < 4 && (
              <div className="flex-shrink-0 w-48 h-64 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-text-secondary">
                <Icon name="Plus" size={24} className="mb-2" />
                <span className="text-sm">Add more products</span>
                <span className="text-xs">to compare</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="py-3 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-secondary">
              Select up to 4 products to compare features, prices, and reviews
            </p>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={onClose}>
                Continue Shopping
              </Button>
              {products?.length >= 2 && (
                <Button variant="default" size="sm" onClick={onCompareAll}>
                  <Icon name="GitCompare" size={16} className="mr-2" />
                  Compare {products?.length} Products
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonDrawer;