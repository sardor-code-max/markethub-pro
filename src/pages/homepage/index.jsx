import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import SearchSection from './components/SearchSection';
import TrendingCarousel from './components/TrendingCarousel';
import PersonalizedSections from './components/PersonalizedSections';
import TrustSignalsBar from './components/TrustSignalsBar';
import CategoryGrid from './components/CategoryGrid';
import Icon from '../../components/AppIcon';

const Homepage = () => {
  const [loading, setLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState({
    categories: ['Electronics', 'Fashion'],
    viewedProducts: [],
    recommendations: []
  });

  // Mock user data and product recommendations
  const mockRecommendedProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB",
      price: 1199,
      originalPrice: 1299,
      rating: 4.8,
      reviewCount: 2847,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      isNew: true,
      isBestSeller: true,
      aiScore: 95
    },
    {
      id: 2,
      name: "MacBook Pro 14-inch M3 Pro",
      price: 2399,
      originalPrice: 2599,
      rating: 4.9,
      reviewCount: 1456,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
      isNew: true,
      aiScore: 92
    },
    {
      id: 3,
      name: "Sony WH-1000XM5 Headphones",
      price: 349,
      originalPrice: 399,
      rating: 4.6,
      reviewCount: 3421,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      isBestSeller: true,
      aiScore: 89
    }
  ];

  const mockTrendingProducts = [
    {
      id: 4,
      name: "Samsung Galaxy S24 Ultra",
      price: 1299,
      originalPrice: 1399,
      rating: 4.7,
      reviewCount: 1923,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
      trendingRank: 1
    },
    {
      id: 5,
      name: "Nike Air Jordan 1 Retro",
      price: 180,
      originalPrice: 200,
      rating: 4.5,
      reviewCount: 892,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      trendingRank: 2
    },
    {
      id: 6,
      name: "Dyson V15 Detect Vacuum",
      price: 649,
      originalPrice: 749,
      rating: 4.4,
      reviewCount: 1567,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      trendingRank: 3
    }
  ];

  const mockRecentlyViewed = [
    {
      id: 7,
      name: "LG OLED55C3PUA 55-Inch TV",
      price: 1299,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
      viewedAt: '2025-01-15'
    },
    {
      id: 8,
      name: "KitchenAid Stand Mixer",
      price: 379,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      viewedAt: '2025-01-14'
    }
  ];

  const mockDealsEndingSoon = [
    {
      id: 9,
      name: "Apple Watch Series 9",
      price: 329,
      originalPrice: 399,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400",
      dealEndsAt: '2025-01-20T23:59:59',
      discount: 18
    },
    {
      id: 10,
      name: "Bose QuietComfort Earbuds",
      price: 199,
      originalPrice: 279,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400",
      dealEndsAt: '2025-01-19T12:00:00',
      discount: 29
    }
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-text-secondary">Loading your personalized experience...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with AI Recommendations */}
      <HeroSection 
        recommendedProducts={mockRecommendedProducts}
        userPreferences={userPreferences}
      />

      {/* Search Section */}
      <SearchSection />

      {/* Trust Signals Bar */}
      <TrustSignalsBar />

      {/* Trending Products Carousel */}
      <section className="py-8 bg-surface">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Trending Now</h2>
              <p className="text-text-secondary mt-1">Popular products everyone's talking about</p>
            </div>
            <Link
              to="/product-catalog"
              className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
            >
              <span className="text-sm font-medium">View All</span>
              <Icon name="ArrowRight" size={16} />
            </Link>
          </div>
          <TrendingCarousel products={mockTrendingProducts} />
        </div>
      </section>

      {/* Category Grid */}
      <CategoryGrid />

      {/* Personalized Sections */}
      <PersonalizedSections
        recommendedProducts={mockRecommendedProducts}
        recentlyViewed={mockRecentlyViewed}
        dealsEndingSoon={mockDealsEndingSoon}
      />

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Stay Updated with the Latest Deals
            </h3>
            <p className="text-text-secondary mb-8">
              Get personalized product recommendations and exclusive offers delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-text-secondary mt-4">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Store" size={20} color="white" />
                </div>
                <span className="text-xl font-bold">MarketHub Pro</span>
              </div>
              <p className="text-sm text-background/70 max-w-md">
                Your intelligent e-commerce companion, powered by AI to deliver personalized shopping experiences and unbeatable deals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm text-background/70">
                <Link to="/product-catalog" className="block hover:text-background transition-colors">All Products</Link>
                <Link to="/categories" className="block hover:text-background transition-colors">Categories</Link>
                <Link to="/deals" className="block hover:text-background transition-colors">Deals</Link>
                <Link to="/new-arrivals" className="block hover:text-background transition-colors">New Arrivals</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-background/70">
                <Link to="/help" className="block hover:text-background transition-colors">Help Center</Link>
                <Link to="/contact" className="block hover:text-background transition-colors">Contact Us</Link>
                <Link to="/returns" className="block hover:text-background transition-colors">Returns</Link>
                <Link to="/shipping" className="block hover:text-background transition-colors">Shipping Info</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/70">
            <p>&copy; 2025 MarketHub Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;