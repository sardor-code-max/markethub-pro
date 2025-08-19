import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OrderReview = ({ orderData, onPlaceOrder, onBack }) => {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const cartItems = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      price: 199.99,
      quantity: 1,
      color: "Black",
      size: "One Size"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      price: 299.99,
      quantity: 1,
      color: "Silver",
      size: "42mm"
    },
    {
      id: 3,
      name: "Portable Bluetooth Speaker",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
      price: 89.99,
      quantity: 2,
      color: "Blue",
      size: "Medium"
    }
  ];

  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const deliveryFee = orderData?.delivery?.price || 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;

  const handlePlaceOrder = async () => {
    if (!agreedToTerms) return;
    
    setIsPlacingOrder(true);
    // Simulate order placement
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsPlacingOrder(false);
    onPlaceOrder();
  };

  const getPaymentMethodDisplay = () => {
    const method = orderData?.payment?.method;
    switch (method) {
      case 'card':
        return `•••• •••• •••• ${orderData?.payment?.cardNumber?.slice(-4) || '1234'}`;
      case 'paypal':
        return 'PayPal';
      case 'apple':
        return 'Apple Pay';
      case 'google':
        return 'Google Pay';
      case 'klarna':
        return 'Buy Now, Pay Later';
      default:
        return 'Not selected';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items Review */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Order Items</h3>
            <div className="space-y-4">
              {cartItems?.map((item) => (
                <div key={item?.id} className="flex items-center space-x-4 py-3 border-b border-border last:border-b-0">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface">
                    <Image
                      src={item?.image}
                      alt={item?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary">{item?.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-text-secondary mt-1">
                      <span>Color: {item?.color}</span>
                      <span>Size: {item?.size}</span>
                      <span>Qty: {item?.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-text-primary">${(item?.price * item?.quantity)?.toFixed(2)}</p>
                    {item?.quantity > 1 && (
                      <p className="text-sm text-text-secondary">${item?.price?.toFixed(2)} each</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Shipping Information</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={20} className="text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-text-primary">Delivery Address</p>
                  <p className="text-text-secondary">
                    {orderData?.shipping?.firstName} {orderData?.shipping?.lastName}
                    <br />
                    {orderData?.shipping?.address}
                    {orderData?.shipping?.apartment && `, ${orderData?.shipping?.apartment}`}
                    <br />
                    {orderData?.shipping?.city}, {orderData?.shipping?.state} {orderData?.shipping?.zipCode}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Icon name="Truck" size={20} className="text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-text-primary">Delivery Method</p>
                  <p className="text-text-secondary">
                    {orderData?.delivery?.name} - {orderData?.delivery?.duration}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Payment Information</h3>
            <div className="flex items-center space-x-3">
              <Icon name="CreditCard" size={20} className="text-primary" />
              <div>
                <p className="font-medium text-text-primary">Payment Method</p>
                <p className="text-text-secondary">{getPaymentMethodDisplay()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg border border-border p-6 sticky top-4">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-text-secondary">
                <span>Subtotal ({cartItems?.reduce((sum, item) => sum + item?.quantity, 0)} items)</span>
                <span>${subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee?.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Tax</span>
                <span>${tax?.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between text-lg font-semibold text-text-primary">
                  <span>Total</span>
                  <span>${total?.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-6">
              <Checkbox
                label={`I agree to the Terms of Service and Privacy Policy`}
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e?.target?.checked)}
                required
              />
            </div>

            {/* Place Order Button */}
            <Button
              onClick={handlePlaceOrder}
              loading={isPlacingOrder}
              disabled={!agreedToTerms}
              className="w-full mb-4"
              size="lg"
            >
              {isPlacingOrder ? 'Placing Order...' : `Place Order - $${total?.toFixed(2)}`}
            </Button>

            <Button
              variant="outline"
              onClick={onBack}
              className="w-full"
            >
              Back to Payment
            </Button>

            {/* Security Badges */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Shield" size={14} className="text-success" />
                  <span>SSL Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Lock" size={14} className="text-success" />
                  <span>256-bit Encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;