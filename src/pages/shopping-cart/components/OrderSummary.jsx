import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderSummary = ({ cartItems, onApplyPromo }) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const navigate = useNavigate();

  // Calculate totals
  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const promoDiscount = appliedPromo ? appliedPromo?.discount : 0;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = (subtotal - promoDiscount) * 0.08; // 8% tax
  const total = subtotal - promoDiscount + shipping + tax;

  const handleApplyPromo = async () => {
    if (!promoCode?.trim()) return;
    
    setIsApplyingPromo(true);
    setPromoError('');

    // Mock promo codes
    const validPromoCodes = {
      'SAVE10': { code: 'SAVE10', discount: subtotal * 0.1, type: 'percentage', description: '10% off your order' },
      'FREESHIP': { code: 'FREESHIP', discount: shipping, type: 'shipping', description: 'Free shipping' },
      'WELCOME20': { code: 'WELCOME20', discount: 20, type: 'fixed', description: '$20 off your order' }
    };

    setTimeout(() => {
      const promo = validPromoCodes?.[promoCode?.toUpperCase()];
      if (promo) {
        setAppliedPromo(promo);
        onApplyPromo(promo);
        setPromoCode('');
      } else {
        setPromoError('Invalid promo code. Please try again.');
      }
      setIsApplyingPromo(false);
    }, 1000);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    onApplyPromo(null);
    setPromoError('');
  };

  const handleCheckout = () => {
    navigate('/checkout-flow');
  };

  const hasOutOfStockItems = cartItems?.some(item => item?.stock === 0);

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
      <h2 className="text-xl font-semibold text-text-primary mb-6">Order Summary</h2>
      {/* Order Details */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-text-secondary">
          <span>Subtotal ({cartItems?.length} items)</span>
          <span>${subtotal?.toFixed(2)}</span>
        </div>

        {appliedPromo && (
          <div className="flex justify-between items-center text-success">
            <div className="flex items-center gap-2">
              <Icon name="Tag" size={16} />
              <span>{appliedPromo?.description}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>-${promoDiscount?.toFixed(2)}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemovePromo}
                className="h-6 w-6 text-text-secondary hover:text-error"
              >
                <Icon name="X" size={14} />
              </Button>
            </div>
          </div>
        )}

        <div className="flex justify-between text-text-secondary">
          <div className="flex items-center gap-2">
            <span>Shipping</span>
            {shipping === 0 && (
              <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded">
                FREE
              </span>
            )}
          </div>
          <span>${shipping?.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-text-secondary">
          <span>Tax</span>
          <span>${tax?.toFixed(2)}</span>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex justify-between text-lg font-semibold text-text-primary">
            <span>Total</span>
            <span>${total?.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {/* Promo Code Section */}
      <div className="mb-6">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e?.target?.value)}
            error={promoError}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={handleApplyPromo}
            loading={isApplyingPromo}
            disabled={!promoCode?.trim() || isApplyingPromo}
          >
            Apply
          </Button>
        </div>
      </div>
      {/* Trust Signals */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <Icon name="Shield" size={16} className="text-success" />
          <span>Secure checkout with SSL encryption</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <Icon name="RotateCcw" size={16} className="text-success" />
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <Icon name="Truck" size={16} className="text-success" />
          <span>Free shipping on orders over $50</span>
        </div>
      </div>
      {/* Checkout Button */}
      <Button
        variant="default"
        size="lg"
        fullWidth
        onClick={handleCheckout}
        disabled={hasOutOfStockItems || cartItems?.length === 0}
        iconName="ArrowRight"
        iconPosition="right"
        className="mb-4"
      >
        Proceed to Checkout
      </Button>
      {hasOutOfStockItems && (
        <p className="text-sm text-error text-center">
          Please remove out-of-stock items to continue
        </p>
      )}
      {/* Payment Methods */}
      <div className="text-center">
        <p className="text-xs text-text-secondary mb-2">We accept</p>
        <div className="flex justify-center items-center gap-2">
          <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-400 rounded text-white text-xs flex items-center justify-center font-bold">
            V
          </div>
          <div className="w-8 h-5 bg-gradient-to-r from-red-600 to-orange-400 rounded text-white text-xs flex items-center justify-center font-bold">
            M
          </div>
          <div className="w-8 h-5 bg-gradient-to-r from-blue-800 to-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
            A
          </div>
          <div className="w-8 h-5 bg-gradient-to-r from-orange-500 to-yellow-400 rounded text-white text-xs flex items-center justify-center font-bold">
            P
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;