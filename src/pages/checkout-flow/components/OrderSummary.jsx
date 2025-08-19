import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OrderSummary = ({ isVisible, onToggle }) => {
  const cartItems = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop",
      price: 199.99,
      quantity: 1
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop",
      price: 299.99,
      quantity: 1
    },
    {
      id: 3,
      name: "Portable Bluetooth Speaker",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=150&h=150&fit=crop",
      price: 89.99,
      quantity: 2
    }
  ];

  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const deliveryFee = 0; // Free delivery
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="lg:sticky lg:top-4">
      {/* Mobile Toggle Header */}
      <div className="lg:hidden bg-surface border border-border rounded-lg mb-4">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-4 text-left"
        >
          <div className="flex items-center space-x-2">
            <Icon name="ShoppingBag" size={20} className="text-primary" />
            <span className="font-medium text-text-primary">Order Summary</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-text-primary">${total?.toFixed(2)}</span>
            <Icon 
              name={isVisible ? "ChevronUp" : "ChevronDown"} 
              size={20} 
              className="text-text-secondary" 
            />
          </div>
        </button>
      </div>
      {/* Order Summary Content */}
      <div className={`bg-card rounded-lg border border-border p-6 ${
        !isVisible ? 'hidden lg:block' : ''
      }`}>
        <h3 className="text-lg font-semibold text-text-primary mb-4 hidden lg:block">
          Order Summary
        </h3>

        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {cartItems?.map((item) => (
            <div key={item?.id} className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface">
                  <Image
                    src={item?.image}
                    alt={item?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {item?.quantity > 1 && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-xs font-semibold rounded-full flex items-center justify-center">
                    {item?.quantity}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {item?.name}
                </p>
                <p className="text-sm text-text-secondary">
                  Qty: {item?.quantity}
                </p>
              </div>
              <div className="text-sm font-semibold text-text-primary">
                ${(item?.price * item?.quantity)?.toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Promo Code */}
        <div className="mb-6">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Promo code"
              className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
              Apply
            </button>
          </div>
        </div>

        {/* Order Totals */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">
              Subtotal ({cartItems?.reduce((sum, item) => sum + item?.quantity, 0)} items)
            </span>
            <span className="text-text-primary">${subtotal?.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Delivery</span>
            <span className="text-success font-medium">FREE</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Tax</span>
            <span className="text-text-primary">${tax?.toFixed(2)}</span>
          </div>
          
          <div className="border-t border-border pt-3">
            <div className="flex justify-between">
              <span className="font-semibold text-text-primary">Total</span>
              <span className="text-xl font-bold text-text-primary">${total?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="space-y-3 text-xs text-text-secondary">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={14} className="text-success" />
            <span>Secure 256-bit SSL encryption</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="RotateCcw" size={14} className="text-primary" />
            <span>30-day return policy</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Truck" size={14} className="text-primary" />
            <span>Free shipping on orders over $50</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;