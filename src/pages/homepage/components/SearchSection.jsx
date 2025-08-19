import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Mock search suggestions
  const mockSuggestions = [
    { query: 'iPhone 15 Pro', category: 'Electronics', results: 127 },
    { query: 'MacBook Pro M3', category: 'Computers', results: 45 },
    { query: 'Nike Air Jordan', category: 'Shoes', results: 89 },
    { query: 'Samsung Galaxy S24', category: 'Electronics', results: 156 },
    { query: 'Sony Headphones', category: 'Audio', results: 234 },
    { query: 'Apple Watch Series 9', category: 'Wearables', results: 78 },
    { query: 'Gaming Laptop', category: 'Computers', results: 312 },
    { query: 'Wireless Earbuds', category: 'Audio', results: 445 }
  ];

  const trendingSearches = [
    'iPhone 15 Pro Max', 'MacBook Pro', 'Samsung Galaxy S24', 'Apple Watch', 
    'Nike Air Jordan', 'Sony WH-1000XM5', 'Gaming Setup', 'Smart Home'
  ];

  // Handle search suggestions
  useEffect(() => {
    if (searchQuery?.trim()?.length >= 2) {
      const filteredSuggestions = mockSuggestions?.filter(suggestion =>
        suggestion?.query?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      )?.slice(0, 6);
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedSuggestion(-1);
  }, [searchQuery]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setSelectedSuggestion(prev => 
          prev < suggestions?.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setSelectedSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e?.preventDefault();
        if (selectedSuggestion >= 0) {
          handleSuggestionClick(suggestions?.[selectedSuggestion]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
        searchRef?.current?.blur();
        break;
    }
  };

  const handleSearch = () => {
    if (searchQuery?.trim()) {
      navigate(`/product-catalog?search=${encodeURIComponent(searchQuery?.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion?.query);
    setShowSuggestions(false);
    navigate(`/product-catalog?search=${encodeURIComponent(suggestion?.query)}`);
  };

  const handleTrendingClick = (trend) => {
    setSearchQuery(trend);
    navigate(`/product-catalog?search=${encodeURIComponent(trend)}`);
  };

  const handleCameraSearch = () => {
    // Placeholder for camera search functionality
    console.log('Camera search clicked');
    alert('Camera search feature coming soon!');
  };

  const handleVoiceSearch = () => {
    // Placeholder for voice search functionality
    console.log('Voice search clicked');
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.onresult = (event) => {
        const transcript = event?.results?.[0]?.[0]?.transcript;
        setSearchQuery(transcript);
        navigate(`/product-catalog?search=${encodeURIComponent(transcript)}`);
      };
      recognition?.start();
    } else {
      alert('Voice search not supported in this browser');
    }
  };

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
      }
    };

    document?.addEventListener('mousedown', handleClickOutside);
    return () => document?.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="py-8 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div ref={searchRef} className="relative mb-8">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'transform scale-105' : ''}`}>
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                <Icon name="Search" size={20} className="text-text-secondary" />
              </div>
              
              <input
                type="text"
                placeholder="Search for products, brands, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onKeyDown={handleKeyDown}
                className="w-full pl-12 pr-32 py-4 bg-surface border-2 border-border rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all duration-200 shadow-brand"
              />
              
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <button
                  onClick={handleCameraSearch}
                  className="p-2 text-text-secondary hover:text-primary transition-colors rounded-lg hover:bg-muted"
                  title="Search by image"
                >
                  <Icon name="Camera" size={20} />
                </button>
                
                <button
                  onClick={handleVoiceSearch}
                  className="p-2 text-text-secondary hover:text-primary transition-colors rounded-lg hover:bg-muted"
                  title="Voice search"
                >
                  <Icon name="Mic" size={20} />
                </button>
                
                <button
                  onClick={handleSearch}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions?.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-brand-lg z-50 max-h-80 overflow-y-auto">
                <div className="py-2">
                  {suggestions?.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted transition-colors ${
                        selectedSuggestion === index ? 'bg-muted' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name="Search" size={16} className="text-text-secondary" />
                        <div>
                          <span className="text-sm font-medium text-text-primary">
                            {suggestion?.query}
                          </span>
                          <span className="text-xs text-text-secondary ml-2">
                            in {suggestion?.category}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-text-secondary">
                        {suggestion?.results} results
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Trending Searches */}
          <div className="text-center">
            <p className="text-sm text-text-secondary mb-4">Trending Searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {trendingSearches?.map((trend, index) => (
                <button
                  key={index}
                  onClick={() => handleTrendingClick(trend)}
                  className="inline-flex items-center px-4 py-2 bg-surface border border-border rounded-full text-sm font-medium text-text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon name="TrendingUp" size={14} className="mr-2" />
                  {trend}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;