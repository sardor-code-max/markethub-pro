import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = () => {
  const popularCategories = [
    { name: 'Electronics', icon: 'Smartphone', path: '/product-catalog?category=electronics' },
    { name: 'Fashion', icon: 'Shirt', path: '/product-catalog?category=fashion' },
    { name: 'Home & Garden', icon: 'Home', path: '/product-catalog?category=home' },
    { name: 'Sports', icon: 'Dumbbell', path: '/product-catalog?category=sports' }
  ];

  const recentlyViewed = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Portable Phone Charger',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1609592806596-4d8b6b6e7b6e?w=300&h=300&fit=crop',
      rating: 4.3
    }
  ];

  return (
    <div className="max-w-4xl mx-auto text-center py-16">
      {/* Empty Cart Icon */}
      <div className="w-32 h-32 mx-auto mb-8 bg-surface rounded-full flex items-center justify-center">
        <Icon name="ShoppingCart" size={64} className="text-text-secondary" />
      </div>
      {/* Main Message */}
      <h1 className="text-3xl font-bold text-text-primary mb-4">
        Your cart is empty
      </h1>
      <p className="text-lg text-text-secondary mb-8 max-w-md mx-auto">
        Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
      </p>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <Button
          variant="default"
          size="lg"
          iconName="ArrowLeft"
          iconPosition="left"
        >
          <Link to="/homepage">Continue Shopping</Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          iconName="Package"
          iconPosition="left"
        >
          <Link to="/product-catalog">Browse Products</Link>
        </Button>
      </div>
      {/* Popular Categories */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-text-primary mb-6">
          Popular Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularCategories?.map((category) => (
            <Link
              key={category?.name}
              to={category?.path}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-brand transition-all duration-200 hover:border-primary group"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon name={category?.icon} size={24} className="text-primary" />
              </div>
              <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors">
                {category?.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
      {/* Recently Viewed */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-6">
          Recently Viewed
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentlyViewed?.map((product) => (
            <div key={product?.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-brand transition-all duration-200">
              <Link to={`/product-detail-page?id=${product?.id}`} className="block">
                <div className="aspect-square bg-surface rounded-lg overflow-hidden mb-4">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
                <h3 className="font-medium text-text-primary mb-2 line-clamp-2">
                  {product?.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-text-primary">
                    ${product?.price}
                  </span>
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={14} className="text-accent fill-current" />
                    <span className="text-sm text-text-secondary">{product?.rating}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Signals */}
      <div className="mt-12 pt-8 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Icon name="Shield" size={32} className="text-success mb-2" />
            <h3 className="font-medium text-text-primary mb-1">Secure Shopping</h3>
            <p className="text-sm text-text-secondary">Your data is protected with SSL encryption</p>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="Truck" size={32} className="text-success mb-2" />
            <h3 className="font-medium text-text-primary mb-1">Fast Delivery</h3>
            <p className="text-sm text-text-secondary">Free shipping on orders over $50</p>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="RotateCcw" size={32} className="text-success mb-2" />
            <h3 className="font-medium text-text-primary mb-1">Easy Returns</h3>
            <p className="text-sm text-text-secondary">30-day hassle-free return policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;