import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ products, title = "Related Products" }) => {
  const handleAddToCart = (product, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    console.log('Adding to cart:', product);
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-text-primary">{title}</h2>
        <Link
          to="/product-catalog"
          className="text-primary hover:text-primary/80 text-sm font-medium flex items-center space-x-1"
        >
          <span>View All</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products?.map((product) => (
          <Link
            key={product?.id}
            to={`/product-detail-page?id=${product?.id}`}
            className="group block bg-surface rounded-lg border border-border hover:shadow-brand-lg transition-all duration-200 hover:-translate-y-1"
          >
            <div className="relative overflow-hidden rounded-t-lg">
              <div className="aspect-square">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Badges */}
              <div className="absolute top-2 left-2 space-y-1">
                {product?.isNew && (
                  <span className="bg-success text-success-foreground px-2 py-1 rounded text-xs font-semibold">
                    New
                  </span>
                )}
                {product?.discount > 0 && (
                  <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-semibold">
                    -{product?.discount}%
                  </span>
                )}
              </div>

              {/* Quick Actions */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-y-1">
                <button
                  onClick={(e) => {
                    e?.preventDefault();
                    e?.stopPropagation();
                    console.log('Added to wishlist:', product);
                  }}
                  className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                >
                  <Icon name="Heart" size={16} className="text-gray-600" />
                </button>
                <button
                  onClick={(e) => {
                    e?.preventDefault();
                    e?.stopPropagation();
                    console.log('Quick view:', product);
                  }}
                  className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                >
                  <Icon name="Eye" size={16} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {/* Product Info */}
              <div>
                <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors line-clamp-2">
                  {product?.name}
                </h3>
                <p className="text-sm text-text-secondary mt-1 line-clamp-1">
                  {product?.brand}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={i < Math.floor(product?.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-xs text-text-secondary">
                  ({product?.reviewCount})
                </span>
              </div>

              {/* Pricing */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-text-primary">
                      ${product?.price?.toFixed(2)}
                    </span>
                    {product?.originalPrice && product?.originalPrice > product?.price && (
                      <span className="text-sm text-text-secondary line-through">
                        ${product?.originalPrice?.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {product?.freeShipping && (
                    <div className="flex items-center space-x-1 text-success">
                      <Icon name="Truck" size={12} />
                      <span className="text-xs">Free Shipping</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={(e) => handleAddToCart(product, e)}
                iconName="ShoppingCart"
                iconPosition="left"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                Add to Cart
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;