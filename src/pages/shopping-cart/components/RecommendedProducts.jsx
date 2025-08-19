import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendedProducts = ({ title, products, onAddToCart }) => {
  const handleAddToCart = (product) => {
    onAddToCart({
      id: product?.id,
      name: product?.name,
      price: product?.price,
      image: product?.image,
      seller: product?.seller,
      quantity: 1,
      stock: product?.stock
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
        <Link 
          to="/product-catalog" 
          className="text-primary hover:underline text-sm font-medium"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products?.map((product) => (
          <div key={product?.id} className="bg-surface border border-border rounded-lg p-4 hover:shadow-brand transition-all duration-200 group">
            <Link to={`/product-detail-page?id=${product?.id}`} className="block mb-3">
              <div className="aspect-square bg-background rounded-lg overflow-hidden mb-3">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
            </Link>

            <div className="space-y-2">
              <Link 
                to={`/product-detail-page?id=${product?.id}`}
                className="text-sm font-medium text-text-primary hover:text-primary transition-colors line-clamp-2"
              >
                {product?.name}
              </Link>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={i < Math.floor(product?.rating) ? 'text-accent fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-xs text-text-secondary">({product?.reviews})</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-text-primary">
                    ${product?.price?.toFixed(2)}
                  </span>
                  {product?.originalPrice && product?.originalPrice > product?.price && (
                    <span className="text-sm text-text-secondary line-through ml-2">
                      ${product?.originalPrice?.toFixed(2)}
                    </span>
                  )}
                </div>
                
                {product?.discount && (
                  <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                    -{product?.discount}%
                  </span>
                )}
              </div>

              <div className="text-xs text-text-secondary">
                by {product?.seller}
              </div>

              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => handleAddToCart(product)}
                disabled={product?.stock === 0}
                iconName="Plus"
                iconSize={14}
                iconPosition="left"
              >
                {product?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;