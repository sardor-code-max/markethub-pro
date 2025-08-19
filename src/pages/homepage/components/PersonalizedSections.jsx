import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PersonalizedSections = ({ 
  recommendedProducts = [], 
  recentlyViewed = [], 
  dealsEndingSoon = [] 
}) => {
  const [dealCountdowns, setDealCountdowns] = useState({});

  // Update countdowns for deals ending soon
  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns = {};
      dealsEndingSoon?.forEach(deal => {
        const endTime = new Date(deal?.dealEndsAt);
        const now = new Date();
        const timeDiff = endTime - now;
        
        if (timeDiff > 0) {
          const hours = Math?.floor(timeDiff / (1000 * 60 * 60));
          const minutes = Math?.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math?.floor((timeDiff % (1000 * 60)) / 1000);
          
          newCountdowns[deal?.id] = { hours, minutes, seconds };
        } else {
          newCountdowns[deal?.id] = { expired: true };
        }
      });
      setDealCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [dealsEndingSoon]);

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
    // Add to cart logic here
  };

  const handleAddToWishlist = (product) => {
    console.log('Added to wishlist:', product);
    // Add to wishlist logic here
  };

  const ProductCard = ({ product, showAiScore = false, showDiscount = false, showCountdown = false }) => {
    const countdown = dealCountdowns?.[product?.id];
    
    return (
      <div className="bg-background border border-border rounded-xl overflow-hidden group hover-lift">
        <div className="relative aspect-product bg-surface">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 image-brand"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {product?.isNew && (
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                New
              </span>
            )}
            {product?.isBestSeller && (
              <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium">
                Best Seller
              </span>
            )}
            {showDiscount && product?.discount && (
              <span className="bg-success text-success-foreground px-2 py-1 rounded text-xs font-medium">
                {product?.discount}% OFF
              </span>
            )}
            {showAiScore && product?.aiScore && (
              <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-medium">
                {product?.aiScore}% Match
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => handleAddToWishlist(product)}
              className="p-2 bg-background/90 backdrop-blur-brand rounded-full shadow-brand hover:bg-background transition-colors thumb-friendly"
              title="Add to Wishlist"
            >
              <Icon name="Heart" size={16} />
            </button>
          </div>

          {/* Countdown Timer for Deals */}
          {showCountdown && countdown && !countdown?.expired && (
            <div className="absolute bottom-3 left-3 right-3 bg-error text-error-foreground px-3 py-2 rounded text-xs font-medium text-center">
              <div className="flex justify-center space-x-2">
                <span>{countdown?.hours}h</span>
                <span>{countdown?.minutes}m</span>
                <span>{countdown?.seconds}s</span>
              </div>
              <div>left</div>
            </div>
          )}
        </div>

        <div className="p-4">
          <Link 
            to={`/product-detail-page?id=${product?.id}`}
            className="block hover:text-primary transition-colors"
          >
            <h3 className="text-base font-semibold text-text-primary mb-2 line-clamp-2">
              {product?.name}
            </h3>
          </Link>
          
          {/* Rating */}
          {product?.rating && (
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center text-accent">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={12}
                    className={i < Math?.floor(product?.rating) ? 'fill-current' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-xs text-text-secondary">
                ({product?.reviewCount?.toLocaleString()})
              </span>
            </div>
          )}
          
          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-bold text-text-primary">
              ${product?.price?.toLocaleString()}
            </span>
            {product?.originalPrice && product?.originalPrice > product?.price && (
              <span className="text-sm text-text-secondary line-through">
                ${product?.originalPrice?.toLocaleString()}
              </span>
            )}
          </div>

          {/* Action Button */}
          <Button
            size="sm"
            onClick={() => handleAddToCart(product)}
            className="w-full"
          >
            <Icon name="ShoppingCart" size={14} className="mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-16 py-16 bg-background">
      {/* Recommended for You */}
      {recommendedProducts?.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-text-primary flex items-center">
                <Icon name="Sparkles" size={24} className="mr-3 text-primary" />
                Recommended for You
              </h2>
              <p className="text-text-secondary mt-1">Curated by AI based on your preferences</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/product-catalog">
                View All
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendedProducts?.slice(0, 8)?.map((product) => (
              <ProductCard 
                key={product?.id} 
                product={product} 
                showAiScore={true} 
              />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      {recentlyViewed?.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-text-primary flex items-center">
                <Icon name="Clock" size={24} className="mr-3 text-secondary" />
                Recently Viewed
              </h2>
              <p className="text-text-secondary mt-1">Continue where you left off</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/history">
                View History
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recentlyViewed?.map((product) => (
              <ProductCard key={product?.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Deals Ending Soon */}
      {dealsEndingSoon?.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-text-primary flex items-center">
                <Icon name="Clock" size={24} className="mr-3 text-error" />
                Deals Ending Soon
              </h2>
              <p className="text-text-secondary mt-1">Limited time offers - don't miss out!</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/deals">
                All Deals
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dealsEndingSoon?.map((product) => (
              <ProductCard 
                key={product?.id} 
                product={product} 
                showDiscount={true} 
                showCountdown={true} 
              />
            ))}
          </div>
        </section>
      )}

      {/* Call to Action Banner */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-center text-white">
          <Icon name="Gift" size={48} className="mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Join MarketHub Pro Premium
          </h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Get exclusive access to early deals, free shipping on all orders, and personalized shopping assistance from our AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button size="lg" variant="outline" className="bg-white text-primary border-white hover:bg-white/90">
              Learn More
            </Button>
            <Button size="lg" className="bg-white/20 text-white border-white/20 hover:bg-white/30">
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PersonalizedSections;