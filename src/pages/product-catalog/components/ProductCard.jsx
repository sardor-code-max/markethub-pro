import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onAddToCart, onToggleWishlist, onToggleCompare, isInWishlist, isInComparison }) => {
  const [imageLoading, setImageLoading] = useState(true);

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

  const getDiscountPercentage = () => {
    if (product?.originalPrice && product?.price < product?.originalPrice) {
      return Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100);
    }
    return 0;
  };

  const handleAddToCart = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onAddToCart(product);
  };

  const handleToggleWishlist = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onToggleWishlist(product?.id);
  };

  const handleToggleCompare = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onToggleCompare(product?.id);
  };

  return (
    <div className="group relative bg-card border border-border rounded-lg overflow-hidden hover-lift transition-brand">
      {/* Product Image */}
      <Link to={`/product-detail-page?id=${product?.id}`} className="block relative">
        <div className="aspect-square overflow-hidden bg-surface">
          {imageLoading && (
            <div className="absolute inset-0 bg-surface shimmer" />
          )}
          <Image
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onLoad={() => setImageLoading(false)}
          />
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product?.isNew && (
            <span className="bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded">
              New
            </span>
          )}
          {getDiscountPercentage() > 0 && (
            <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded">
              -{getDiscountPercentage()}%
            </span>
          )}
          {product?.isBestSeller && (
            <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded">
              Best Seller
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleToggleWishlist}
            className={`p-2 rounded-full shadow-brand transition-colors ${
              isInWishlist
                ? 'bg-error text-error-foreground'
                : 'bg-background text-text-secondary hover:text-error'
            }`}
          >
            <Icon name="Heart" size={16} className={isInWishlist ? 'fill-current' : ''} />
          </button>
          <button
            onClick={handleToggleCompare}
            className={`p-2 rounded-full shadow-brand transition-colors ${
              isInComparison
                ? 'bg-primary text-primary-foreground'
                : 'bg-background text-text-secondary hover:text-primary'
            }`}
          >
            <Icon name="GitCompare" size={16} />
          </button>
        </div>

        {/* Quick View Button */}
        <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" size="sm" fullWidth>
            <Icon name="Eye" size={16} className="mr-2" />
            Quick View
          </Button>
        </div>
      </Link>
      {/* Product Info */}
      <div className="p-4 space-y-2">
        {/* Brand */}
        {product?.brand && (
          <p className="text-xs text-text-secondary uppercase tracking-wide font-medium">
            {product?.brand}
          </p>
        )}

        {/* Product Name */}
        <Link to={`/product-detail-page?id=${product?.id}`}>
          <h3 className="text-sm font-medium text-text-primary line-clamp-2 hover:text-primary transition-colors">
            {product?.name}
          </h3>
        </Link>

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-2">
          {renderStars(product?.rating)}
          <span className="text-xs text-text-secondary">
            ({product?.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold text-text-primary">
            {formatPrice(product?.price)}
          </span>
          {product?.originalPrice && product?.originalPrice > product?.price && (
            <span className="text-sm text-text-secondary line-through">
              {formatPrice(product?.originalPrice)}
            </span>
          )}
        </div>

        {/* Shipping Info */}
        <div className="flex items-center space-x-4 text-xs text-text-secondary">
          {product?.freeShipping && (
            <div className="flex items-center space-x-1">
              <Icon name="Truck" size={12} className="text-success" />
              <span>Free Shipping</span>
            </div>
          )}
          {product?.fastDelivery && (
            <div className="flex items-center space-x-1">
              <Icon name="Zap" size={12} className="text-accent" />
              <span>Fast Delivery</span>
            </div>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              product?.stock > 10 ? 'bg-success' : product?.stock > 0 ? 'bg-warning' : 'bg-error'
            }`} />
            <span className="text-xs text-text-secondary">
              {product?.stock > 10 ? 'In Stock' : product?.stock > 0 ? `Only ${product?.stock} left` : 'Out of Stock'}
            </span>
          </div>
          
          {product?.seller?.verified && (
            <div className="flex items-center space-x-1">
              <Icon name="ShieldCheck" size={12} className="text-success" />
              <span className="text-xs text-success">Verified</span>
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={handleAddToCart}
          disabled={product?.stock === 0}
          className="mt-3"
        >
          <Icon name="ShoppingCart" size={16} className="mr-2" />
          {product?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
      {/* Comparison Checkbox */}
      <div className="absolute bottom-4 left-4">
        <label className="flex items-center space-x-2 text-xs text-text-secondary cursor-pointer">
          <input
            type="checkbox"
            checked={isInComparison}
            onChange={handleToggleCompare}
            className="w-3 h-3 text-primary border-border rounded focus:ring-ring"
          />
          <span>Compare</span>
        </label>
      </div>
    </div>
  );
};

export default ProductCard;