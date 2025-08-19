import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = ({ recommendedProducts = [], userPreferences = {} }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || recommendedProducts?.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % recommendedProducts?.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, recommendedProducts?.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentProduct = recommendedProducts?.[currentSlide];

  if (!recommendedProducts?.length) {
    return (
      <section className="hero-height bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 relative overflow-hidden">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="text-center w-full">
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
              Welcome to <span className="text-primary">MarketHub Pro</span>
            </h1>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Your intelligent shopping companion powered by AI
            </p>
            <Button size="lg" asChild>
              <Link to="/product-catalog">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-height bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 h-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full items-center">
          {/* Hero Content */}
          <div className="space-y-6">
            {/* AI Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <Icon name="Sparkles" size={16} />
              <span>AI-Powered Recommendations</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
              Discover Products{' '}
              <span className="text-primary">Perfect</span>{' '}
              for You
            </h1>

            <p className="text-xl text-text-secondary leading-relaxed">
              Our AI analyzes your preferences to curate personalized product recommendations, 
              saving you time and helping you find exactly what you need.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="cta-primary" asChild>
                <Link to="/product-catalog">
                  <Icon name="Search" size={20} className="mr-2" />
                  Explore Products
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/categories">
                  <Icon name="Grid3x3" size={20} className="mr-2" />
                  Browse Categories
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Shield" size={16} className="text-trust" />
                <span>Secure Shopping</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Star" size={16} className="text-accent" />
                <span>4.8/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Users" size={16} className="text-primary" />
                <span>2M+ Happy Customers</span>
              </div>
            </div>
          </div>

          {/* Product Showcase */}
          <div className="relative">
            <div className="bg-background/80 backdrop-blur-brand rounded-2xl p-8 shadow-brand-lg">
              <div className="text-center mb-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  <Icon name="TrendingUp" size={14} />
                  <span>Recommended for You</span>
                  {currentProduct?.aiScore && (
                    <span className="bg-primary/20 px-2 py-0.5 rounded text-xs">
                      {currentProduct?.aiScore}% Match
                    </span>
                  )}
                </div>
              </div>

              {/* Product Card */}
              <Link 
                to={`/product-detail-page?id=${currentProduct?.id}`}
                className="block group"
              >
                <div className="aspect-product rounded-lg overflow-hidden mb-4 bg-surface">
                  <img
                    src={currentProduct?.image}
                    alt={currentProduct?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 image-brand"
                  />
                </div>
                
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-2">
                    {currentProduct?.name}
                  </h3>
                  
                  <div className="flex items-center justify-center space-x-2">
                    <div className="flex items-center text-accent">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={i < Math?.floor(currentProduct?.rating) ? 'fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-text-secondary">
                      ({currentProduct?.reviewCount?.toLocaleString()})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl font-bold text-text-primary">
                      ${currentProduct?.price?.toLocaleString()}
                    </span>
                    {currentProduct?.originalPrice && currentProduct?.originalPrice > currentProduct?.price && (
                      <>
                        <span className="text-lg text-text-secondary line-through">
                          ${currentProduct?.originalPrice?.toLocaleString()}
                        </span>
                        <span className="text-sm bg-success text-success-foreground px-2 py-1 rounded">
                          Save ${(currentProduct?.originalPrice - currentProduct?.price)?.toLocaleString()}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Product Badges */}
                  <div className="flex justify-center space-x-2">
                    {currentProduct?.isNew && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-primary text-primary-foreground">
                        New
                      </span>
                    )}
                    {currentProduct?.isBestSeller && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-accent text-accent-foreground">
                        Best Seller
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              {/* Slide Indicators */}
              {recommendedProducts?.length > 1 && (
                <div className="flex justify-center space-x-2 mt-6">
                  {recommendedProducts?.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlideChange(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSlide ? 'bg-primary' : 'bg-border'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Floating AI Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-primary to-secondary text-white p-3 rounded-full shadow-brand-lg">
              <Icon name="Brain" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={24} className="text-text-secondary" />
      </div>
    </section>
  );
};

export default HeroSection;