import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const CategoryGrid = () => {
  const categories = [
    {
      name: 'Electronics',
      description: 'Phones, Laptops & More',
      icon: 'Smartphone',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
      productCount: 15847,
      color: 'from-blue-500 to-blue-600',
      deals: 'Up to 40% OFF'
    },
    {
      name: 'Fashion',
      description: 'Clothing & Accessories',
      icon: 'ShirtIcon',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400',
      productCount: 23156,
      color: 'from-pink-500 to-pink-600',
      deals: 'New Arrivals'
    },
    {
      name: 'Home & Garden',
      description: 'Furniture & Decor',
      icon: 'Home',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      productCount: 9823,
      color: 'from-green-500 to-green-600',
      deals: 'Free Shipping'
    },
    {
      name: 'Sports & Fitness',
      description: 'Equipment & Apparel',
      icon: 'Dumbbell',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      productCount: 7432,
      color: 'from-orange-500 to-orange-600',
      deals: 'Up to 30% OFF'
    },
    {
      name: 'Beauty & Health',
      description: 'Skincare & Wellness',
      icon: 'Heart',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
      productCount: 12456,
      color: 'from-purple-500 to-purple-600',
      deals: 'Bundle Deals'
    },
    {
      name: 'Automotive',
      description: 'Parts & Accessories',
      icon: 'Car',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400',
      productCount: 5678,
      color: 'from-gray-500 to-gray-600',
      deals: 'Best Sellers'
    },
    {
      name: 'Books & Media',
      description: 'Books, Music & Movies',
      icon: 'Book',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
      productCount: 34567,
      color: 'from-indigo-500 to-indigo-600',
      deals: 'Digital & Print'
    },
    {
      name: 'Toys & Games',
      description: 'Kids & Family Fun',
      icon: 'Gamepad2',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      productCount: 8901,
      color: 'from-yellow-500 to-yellow-600',
      deals: 'Age Appropriate'
    }
  ];

  const fallbackIcon = 'Package';

  const getIconName = (iconName) => {
    // Map custom icon names to lucide icons
    const iconMap = {
      'ShirtIcon': 'Shirt',
      'Dumbbell': 'Activity',
    };
    return iconMap?.[iconName] || iconName;
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Discover everything you need across our carefully curated categories, 
            each with thousands of products and exclusive deals.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories?.map((category, index) => (
            <Link
              key={index}
              to={`/product-catalog?category=${category?.name?.toLowerCase()?.replace(' & ', '-')?.replace(' ', '-')}`}
              className="group relative bg-background border border-border rounded-2xl overflow-hidden hover-lift shadow-brand"
            >
              {/* Background Image */}
              <div className="relative h-48 bg-surface overflow-hidden">
                <img
                  src={category?.image}
                  alt={category?.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 image-brand"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category?.color} opacity-80`} />
                
                {/* Category Icon */}
                <div className="absolute top-4 left-4 p-3 bg-white/20 backdrop-blur-brand rounded-xl">
                  <Icon 
                    name={getIconName(category?.icon)} 
                    size={24} 
                    className="text-white" 
                    fallback={fallbackIcon}
                  />
                </div>

                {/* Deal Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-brand text-text-primary px-3 py-1 rounded-full text-xs font-medium">
                  {category?.deals}
                </div>
              </div>

              {/* Category Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                  {category?.name}
                </h3>
                <p className="text-text-secondary mb-3">
                  {category?.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">
                    {category?.productCount?.toLocaleString()} products
                  </span>
                  <Icon 
                    name="ArrowRight" 
                    size={16} 
                    className="text-primary group-hover:translate-x-1 transition-transform" 
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Categories Banner */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Browse our complete catalog with advanced filters, or use our AI-powered search 
              to find exactly what you need in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/product-catalog"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <Icon name="Search" size={20} className="mr-2" />
                Browse All Products
              </Link>
              <Link
                to="/advanced-search"
                className="inline-flex items-center px-6 py-3 bg-background border border-border text-text-primary rounded-lg font-medium hover:bg-muted transition-colors"
              >
                <Icon name="Filter" size={20} className="mr-2" />
                Advanced Search
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;