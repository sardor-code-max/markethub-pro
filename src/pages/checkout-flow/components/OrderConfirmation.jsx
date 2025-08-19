import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OrderConfirmation = ({ orderNumber }) => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const estimatedDelivery = new Date();
  estimatedDelivery?.setDate(estimatedDelivery?.getDate() + 5);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleCreateAccount = (e) => {
    e?.preventDefault();
    // Handle account creation
    console.log('Creating account with:', { email, password });
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-card rounded-lg border border-border p-8">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-text-primary mb-2">Order Confirmed!</h1>
        <p className="text-text-secondary mb-6">
          Thank you for your purchase. Your order has been successfully placed and is being processed.
        </p>

        {/* Order Details */}
        <div className="bg-surface rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="font-semibold text-text-primary mb-2">Order Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Order Number:</span>
                  <span className="font-medium text-text-primary">#{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Order Date:</span>
                  <span className="text-text-primary">{new Date()?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Total Amount:</span>
                  <span className="font-semibold text-text-primary">$679.96</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-text-primary mb-2">Delivery Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Estimated Delivery:</span>
                  <span className="text-text-primary">{estimatedDelivery?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Delivery Method:</span>
                  <span className="text-text-primary">Standard Delivery</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Tracking:</span>
                  <span className="text-primary">Available soon</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-surface rounded-lg p-6 mb-6 text-left">
          <h3 className="font-semibold text-text-primary mb-4">What happens next?</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                1
              </div>
              <div>
                <p className="font-medium text-text-primary">Order Processing</p>
                <p className="text-sm text-text-secondary">We're preparing your items for shipment</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-border text-text-secondary rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                2
              </div>
              <div>
                <p className="font-medium text-text-primary">Shipping Notification</p>
                <p className="text-sm text-text-secondary">You'll receive tracking information via email</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-border text-text-secondary rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                3
              </div>
              <div>
                <p className="font-medium text-text-primary">Delivery</p>
                <p className="text-sm text-text-secondary">Your order will be delivered to your address</p>
              </div>
            </div>
          </div>
        </div>

        {/* Create Account Section */}
        {!showCreateAccount ? (
          <div className="bg-surface rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="User" size={24} className="text-primary" />
              <h3 className="font-semibold text-text-primary">Create an Account</h3>
            </div>
            <p className="text-sm text-text-secondary mb-4">
              Create an account to track your orders, save your preferences, and enjoy faster checkout.
            </p>
            <Button
              variant="outline"
              onClick={() => setShowCreateAccount(true)}
              className="w-full"
            >
              Create Account
            </Button>
          </div>
        ) : (
          <div className="bg-surface rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-text-primary mb-4">Create Your Account</h3>
            <form onSubmit={handleCreateAccount} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e?.target?.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
              <div className="flex space-x-3">
                <Button type="submit" className="flex-1">
                  Create Account
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateAccount(false)}
                >
                  Skip
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            as={Link}
            to="/homepage"
            variant="outline"
            className="flex-1"
          >
            Continue Shopping
          </Button>
          <Button
            as={Link}
            to="/account"
            className="flex-1"
          >
            Track Your Order
          </Button>
        </div>

        {/* Support Information */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-text-secondary mb-4">
            Need help with your order? Our customer service team is here to assist you.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={16} className="text-primary" />
              <span className="text-text-secondary">support@markethubpro.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={16} className="text-primary" />
              <span className="text-text-secondary">1-800-MARKET</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;