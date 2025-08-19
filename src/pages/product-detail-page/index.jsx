import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import RelatedProducts from './components/RelatedProducts';
import SellerInfo from './components/SellerInfo';
import StickyCartBar from './components/StickyCartBar';

const ProductDetailPage = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams?.get('id') || '1';
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Mock product data
  const mockProduct = {
    id: productId,
    name: "Premium Wireless Bluetooth Headphones with Active Noise Cancellation",
    shortDescription: "Experience superior sound quality with advanced noise cancellation technology",
    description: `Immerse yourself in exceptional audio quality with these premium wireless headphones. Featuring advanced active noise cancellation technology, these headphones deliver crystal-clear sound while blocking out unwanted ambient noise.

The ergonomic design ensures comfortable all-day wear, while the premium materials provide durability and style. With up to 30 hours of battery life and quick charge capability, you'll never miss a beat.

Perfect for music lovers, professionals, and anyone who values high-quality audio experiences. The intuitive touch controls and voice assistant compatibility make these headphones the perfect companion for your daily activities.`,
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.6,
    reviewCount: 1247,
    stock: 15,
    sku: "WBH-2024-001",
    brand: "AudioTech Pro",
    freeShipping: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
        tags: ["Main View", "Black Color"]
      },
      {
        url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
        tags: ["Side View", "Controls"]
      },
      {
        url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop",
        tags: ["Lifestyle", "In Use"]
      },
      {
        url: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&h=800&fit=crop",
        tags: ["Detail View", "Premium Build"]
      }
    ],
    variants: [
      {
        id: "black",
        name: "Midnight Black",
        price: 199.99,
        originalPrice: 299.99,
        stock: 15
      },
      {
        id: "white",
        name: "Pearl White",
        price: 209.99,
        originalPrice: 309.99,
        stock: 8
      },
      {
        id: "silver",
        name: "Space Silver",
        price: 219.99,
        originalPrice: 319.99,
        stock: 3
      }
    ],
    keyFeatures: [
      "Active Noise Cancellation with 3 modes",
      "30-hour battery life with quick charge",
      "Premium leather ear cushions",
      "Bluetooth 5.2 with multipoint connection",
      "Voice assistant compatible",
      "Foldable design with carrying case"
    ],
    highlights: [
      "Industry-leading noise cancellation technology",
      "High-resolution audio with custom drivers",
      "Comfortable for extended listening sessions",
      "Durable construction with premium materials",
      "Easy touch controls and voice commands"
    ],
    specifications: {
      audio: {
        driverSize: "40mm Dynamic",
        frequencyResponse: "20Hz - 40kHz",
        impedance: "32 Ohms",
        sensitivity: "100 dB/mW"
      },
      connectivity: {
        bluetooth: "5.2",
        range: "30 feet",
        codecs: "SBC, AAC, LDAC",
        multipoint: "Yes"
      },
      battery: {
        playbackTime: "30 hours (ANC on)",
        chargingTime: "3 hours",
        quickCharge: "15 min = 3 hours",
        batteryType: "Lithium-ion"
      },
      physical: {
        weight: "250g",
        dimensions: "7.1 x 6.7 x 3.2 inches",
        foldable: "Yes",
        cableLength: "1.2m"
      }
    },
    ratingDistribution: {
      5: 65,
      4: 20,
      3: 10,
      2: 3,
      1: 2
    },
    reviews: [
      {
        id: 1,
        userName: "Sarah Johnson",
        rating: 5,
        date: "December 15, 2024",
        verified: true,
        comment: "Absolutely amazing headphones! The noise cancellation is incredible and the sound quality is top-notch. Worth every penny.",
        helpful: 23
      },
      {
        id: 2,
        userName: "Mike Chen",
        rating: 4,
        date: "December 10, 2024",
        verified: true,
        comment: "Great headphones overall. The battery life is excellent and they're very comfortable. Only minor complaint is they can feel a bit heavy after long sessions.",
        helpful: 15
      },
      {
        id: 3,
        userName: "Emily Rodriguez",rating: 5,date: "December 8, 2024",
        verified: true,
        comment: "Perfect for my daily commute. The noise cancellation blocks out all the subway noise and the sound quality is phenomenal.",
        helpful: 18
      }
    ],
    qaCount: 47,
    qa: [
      {
        id: 1,
        question: "Are these headphones compatible with iPhone and Android?",askedBy: "John D.",date: "December 12, 2024",answer: "Yes, these headphones are compatible with both iPhone and Android devices via Bluetooth. They also support voice assistants on both platforms.",answeredBy: "AudioTech Pro",answerDate: "December 13, 2024"
      },
      {
        id: 2,
        question: "How long does the battery last with noise cancellation turned on?",askedBy: "Lisa M.",date: "December 10, 2024",answer: "With active noise cancellation enabled, you can expect up to 30 hours of continuous playback. Without ANC, the battery can last up to 40 hours.",answeredBy: "AudioTech Pro",answerDate: "December 11, 2024"
      }
    ]
  };

  const mockSeller = {
    name: "AudioTech Pro Official Store",
    verified: true,
    rating: 4.8,
    reviewCount: 15420,
    joinedDate: "March 2019",
    totalProducts: 156,
    responseRate: 98,
    responseTime: "< 2 hours",
    returnPolicy: "30 days",
    shippingTime: "1-3 days",
    location: "California, USA",
    badges: [
      { icon: "Shield", label: "Verified Seller" },
      { icon: "Award", label: "Top Rated" },
      { icon: "Truck", label: "Fast Shipping" }
    ]
  };

  const mockRelatedProducts = [
    {
      id: "2",
      name: "Wireless Earbuds Pro Max",
      brand: "AudioTech Pro",
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.5,
      reviewCount: 892,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
      discount: 25,
      isNew: false,
      freeShipping: true
    },
    {
      id: "3",
      name: "Studio Monitor Headphones",
      brand: "AudioTech Pro",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.7,
      reviewCount: 654,
      image: "https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=400&h=400&fit=crop",
      discount: 25,
      isNew: true,
      freeShipping: true
    },
    {
      id: "4",
      name: "Gaming Headset RGB",
      brand: "GameTech",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.3,
      reviewCount: 1205,
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop",
      discount: 31,
      isNew: false,
      freeShipping: false
    },
    {
      id: "5",
      name: "Portable Bluetooth Speaker",
      brand: "SoundWave",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.4,
      reviewCount: 743,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      discount: 20,
      isNew: false,
      freeShipping: true
    }
  ];

  const mockRecentlyViewed = [
    {
      id: "6",
      name: "Smart Watch Series 8",
      brand: "TechWear",
      price: 399.99,
      rating: 4.6,
      reviewCount: 2341,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
    },
    {
      id: "7",
      name: "Wireless Charging Pad",
      brand: "PowerTech",
      price: 29.99,
      rating: 4.2,
      reviewCount: 567,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProduct(mockProduct);
      setRecentlyViewed(mockRecentlyViewed);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [productId]);

  const handleAddToCart = (productData) => {
    console.log('Adding to cart:', productData);
    // Add success notification logic here
  };

  const handleBuyNow = (productData) => {
    console.log('Buy now:', productData);
    // Navigate to checkout with product data
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="aspect-square bg-muted rounded-lg"></div>
                <div className="flex space-x-2">
                  {[...Array(4)]?.map((_, i) => (
                    <div key={i} className="w-16 h-16 bg-muted rounded-lg"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-6 bg-muted rounded w-1/4"></div>
                <div className="space-y-2">
                  {[...Array(5)]?.map((_, i) => (
                    <div key={i} className="h-4 bg-muted rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Icon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-text-primary mb-2">Product Not Found</h1>
            <p className="text-text-secondary mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/product-catalog"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary/80"
            >
              <Icon name="ArrowLeft" size={16} />
              <span>Back to Products</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/homepage" className="text-text-secondary hover:text-text-primary">
              Home
            </Link>
            <Icon name="ChevronRight" size={16} className="text-text-secondary" />
            <Link to="/product-catalog" className="text-text-secondary hover:text-text-primary">
              Electronics
            </Link>
            <Icon name="ChevronRight" size={16} className="text-text-secondary" />
            <Link to="/product-catalog" className="text-text-secondary hover:text-text-primary">
              Headphones
            </Link>
            <Icon name="ChevronRight" size={16} className="text-text-secondary" />
            <span className="text-text-primary font-medium truncate">{product?.name}</span>
          </nav>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <ProductImageGallery images={product?.images} productName={product?.name} />
          </div>

          {/* Product Information */}
          <div>
            <ProductInfo
              product={product}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <ProductTabs product={product} />
        </div>

        {/* Seller Information */}
        <div className="mb-12">
          <SellerInfo seller={mockSeller} />
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <RelatedProducts products={mockRelatedProducts} title="Related Products" />
        </div>

        {/* Recently Viewed */}
        {recentlyViewed?.length > 0 && (
          <div className="mb-12">
            <RelatedProducts products={recentlyViewed} title="Recently Viewed" />
          </div>
        )}

        {/* Social Sharing */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Share this product</h3>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Icon name="Facebook" size={16} />
              <span>Facebook</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
              <Icon name="Twitter" size={16} />
              <span>Twitter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Icon name="MessageCircle" size={16} />
              <span>WhatsApp</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Icon name="Copy" size={16} />
              <span>Copy Link</span>
            </button>
          </div>
        </div>
      </div>
      {/* Sticky Cart Bar for Mobile */}
      <StickyCartBar
        product={product}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </div>
  );
};

export default ProductDetailPage;