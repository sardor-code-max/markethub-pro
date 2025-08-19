import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount] = useState(3);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/homepage', icon: 'Home' },
    { name: 'Products', path: '/product-catalog', icon: 'Package' },
    { name: 'Cart', path: '/shopping-cart', icon: 'ShoppingCart', badge: cartCount },
    { name: 'Checkout', path: '/checkout-flow', icon: 'CreditCard' }
  ];

  const moreMenuItems = [
    { name: 'My Account', path: '/account', icon: 'User' },
    { name: 'Orders', path: '/orders', icon: 'Package2' },
    { name: 'Wishlist', path: '/wishlist', icon: 'Heart' },
    { name: 'Help', path: '/help', icon: 'HelpCircle' },
    { name: 'Settings', path: '/settings', icon: 'Settings' }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Search for:', searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border shadow-brand">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/homepage" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
              <Icon name="Store" size={20} color="white" />
            </div>
            <span className="text-xl font-bold text-text-primary">MarketHub Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-brand'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
                {item?.badge && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                    {item?.badge}
                  </span>
                )}
              </Link>
            ))}

            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-muted transition-all duration-200">
                <Icon name="MoreHorizontal" size={18} />
                <span>More</span>
              </button>
              
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-brand-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {moreMenuItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className={`relative transition-all duration-200 ${isSearchFocused ? 'transform scale-105' : ''}`}>
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                  >
                    <Icon name="X" size={16} />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-muted transition-colors"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            {/* Mobile Search */}
            <div className="p-4 border-b border-border">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </form>
            </div>

            {/* Mobile Navigation */}
            <nav className="py-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.name}</span>
                  </div>
                  {item?.badge && (
                    <span className="bg-accent text-accent-foreground text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                      {item?.badge}
                    </span>
                  )}
                </Link>
              ))}

              <div className="border-t border-border mt-2 pt-2">
                {moreMenuItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-muted transition-colors"
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.name}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
      {/* Trust Signal Bar */}
      <div className="hidden md:block bg-surface border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 py-2 text-xs text-text-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={14} className="text-trust" />
              <span>Secure Shopping</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Truck" size={14} className="text-trust" />
              <span>Free Shipping Over $50</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="RotateCcw" size={14} className="text-trust" />
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={14} className="text-accent" />
              <span>4.8/5 Customer Rating</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;