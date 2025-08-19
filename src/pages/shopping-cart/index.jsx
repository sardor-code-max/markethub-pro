import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import RecommendedProducts from './components/RecommendedProducts';
import EmptyCart from './components/EmptyCart';
import CheckoutProgress from './components/CheckoutProgress';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Mock cart data
  useEffect(() => {
    const mockCartItems = [
      {
        id: 1,
        name: "Apple iPhone 15 Pro Max 256GB - Natural Titanium",
        price: 1199.99,
        originalPrice: 1299.99,
        quantity: 1,
        stock: 15,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
        seller: "Apple Store Official",
        sellerRating: 4.9,
        variant: "256GB, Natural Titanium",
        deliveryDate: "Dec 22, 2024"
      },
      {
        id: 2,
        name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
        price: 349.99,
        originalPrice: 399.99,
        quantity: 1,
        stock: 8,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        seller: "Sony Electronics",
        sellerRating: 4.8,
        variant: "Black",
        deliveryDate: "Dec 20, 2024"
      },
      {
        id: 3,
        name: "Samsung 65\" QLED 4K Smart TV (QN65Q80C)",
        price: 1299.99,
        originalPrice: 1499.99,
        quantity: 1,
        stock: 3,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
        seller: "Samsung Official Store",
        sellerRating: 4.7,
        variant: "65 inch, QLED",
        deliveryDate: "Dec 25, 2024"
      },
      {
        id: 4,
        name: "MacBook Air M2 13-inch Laptop",
        price: 999.99,
        quantity: 1,
        stock: 0,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
        seller: "Apple Store Official",
        sellerRating: 4.9,
        variant: "13-inch, Space Gray, 256GB",
        deliveryDate: null
      }
    ];
    setCartItems(mockCartItems);
  }, []);

  // Mock recommended products
  const frequentlyBoughtTogether = [
    {
      id: 101,
      name: "Apple MagSafe Charger",
      price: 39.99,
      originalPrice: 49.99,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop",
      seller: "Apple Store Official",
      rating: 4.6,
      reviews: 1250,
      stock: 25,
      discount: 20
    },
    {
      id: 102,
      name: "iPhone 15 Pro Clear Case",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop",
      seller: "Apple Store Official",
      rating: 4.4,
      reviews: 890,
      stock: 50
    },
    {
      id: 103,
      name: "AirPods Pro (2nd Generation)",
      price: 249.99,
      originalPrice: 279.99,
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop",
      seller: "Apple Store Official",
      rating: 4.8,
      reviews: 2100,
      stock: 12,
      discount: 11
    },
    {
      id: 104,
      name: "Belkin 3-in-1 Wireless Charger",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1609592806596-4d8b6b6e7b6e?w=300&h=300&fit=crop",
      seller: "Belkin Official",
      rating: 4.5,
      reviews: 670,
      stock: 18
    }
  ];

  const youMightAlsoLike = [
    {
      id: 201,
      name: "iPad Air 5th Generation",
      price: 599.99,
      originalPrice: 649.99,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop",
      seller: "Apple Store Official",
      rating: 4.7,
      reviews: 1580,
      stock: 22,
      discount: 8
    },
    {
      id: 202,
      name: "Apple Watch Series 9",
      price: 399.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      seller: "Apple Store Official",
      rating: 4.8,
      reviews: 2340,
      stock: 15
    },
    {
      id: 203,
      name: "Magic Keyboard for iPad",
      price: 299.99,
      originalPrice: 329.99,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop",
      seller: "Apple Store Official",
      rating: 4.5,
      reviews: 890,
      stock: 8,
      discount: 9
    },
    {
      id: 204,
      name: "Apple Pencil (2nd Generation)",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop",
      seller: "Apple Store Official",
      rating: 4.6,
      reviews: 1120,
      stock: 30
    }
  ];

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems?.map(item =>
        item?.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = async (itemId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setCartItems(prevItems => prevItems?.filter(item => item?.id !== itemId));
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleMoveToWishlist = (itemId) => {
    // Simulate moving to wishlist
    setCartItems(prevItems => prevItems?.filter(item => item?.id !== itemId));
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleApplyPromo = (promo) => {
    setAppliedPromo(promo);
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems?.find(item => item?.id === product?.id);
    if (existingItem) {
      handleQuantityChange(product?.id, existingItem?.quantity + 1);
    } else {
      setCartItems(prevItems => [...prevItems, product]);
    }
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  if (cartItems?.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Shopping Cart - MarketHub Pro</title>
          <meta name="description" content="Review and manage items in your shopping cart. Secure checkout with multiple payment options and fast delivery." />
        </Helmet>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <EmptyCart />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
       <title>{`Shopping Cart (${cartItems?.length || 0} items) - MarketHub Pro`}</title>
        <meta name="description" content="Review and manage items in your shopping cart. Secure checkout with multiple payment options and fast delivery." />
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-20 right-4 bg-success text-success-foreground px-6 py-3 rounded-lg shadow-brand-lg z-50 flex items-center gap-2">
            <Icon name="CheckCircle" size={20} />
            <span>Cart updated successfully!</span>
          </div>
        )}

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Shopping Cart</h1>
          <p className="text-text-secondary">
            {cartItems?.length} {cartItems?.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {/* Checkout Progress */}
        <CheckoutProgress currentStep={1} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems?.map((item) => (
              <CartItem
                key={item?.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
                onMoveToWishlist={handleMoveToWishlist}
              />
            ))}

            {/* Continue Shopping */}
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name="ArrowLeft" size={20} className="text-primary" />
                  <span className="text-text-secondary">Need more items?</span>
                </div>
                <Button variant="outline" size="sm">
                  <a href="/product-catalog">Continue Shopping</a>
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary 
              cartItems={cartItems}
              onApplyPromo={handleApplyPromo}
            />
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-12 space-y-8">
          <RecommendedProducts
            title="Frequently bought together"
            products={frequentlyBoughtTogether}
            onAddToCart={handleAddToCart}
          />
          
          <RecommendedProducts
            title="You might also like"
            products={youMightAlsoLike}
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* Trust Signals Footer */}
        <div className="mt-12 bg-surface border border-border rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Icon name="Shield" size={32} className="text-success mb-2" />
              <h3 className="font-medium text-text-primary mb-1">Secure Payment</h3>
              <p className="text-sm text-text-secondary">SSL encrypted checkout</p>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="Truck" size={32} className="text-success mb-2" />
              <h3 className="font-medium text-text-primary mb-1">Fast Delivery</h3>
              <p className="text-sm text-text-secondary">Free shipping over $50</p>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="RotateCcw" size={32} className="text-success mb-2" />
              <h3 className="font-medium text-text-primary mb-1">Easy Returns</h3>
              <p className="text-sm text-text-secondary">30-day return policy</p>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="Headphones" size={32} className="text-success mb-2" />
              <h3 className="font-medium text-text-primary mb-1">24/7 Support</h3>
              <p className="text-sm text-text-secondary">Customer service help</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShoppingCart;