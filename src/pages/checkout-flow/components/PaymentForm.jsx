import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PaymentForm = ({ paymentData, setPaymentData, onNext, onBack }) => {
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'CreditCard' },
    { id: 'paypal', name: 'PayPal', icon: 'Wallet' },
    { id: 'apple', name: 'Apple Pay', icon: 'Smartphone' },
    { id: 'google', name: 'Google Pay', icon: 'Smartphone' },
    { id: 'klarna', name: 'Buy Now, Pay Later', icon: 'Calendar' }
  ];

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1)?.padStart(2, '0'),
    label: String(i + 1)?.padStart(2, '0')
  }));

  const yearOptions = Array.from({ length: 10 }, (_, i) => ({
    value: String(new Date()?.getFullYear() + i),
    label: String(new Date()?.getFullYear() + i)
  }));

  const validateCardForm = () => {
    const newErrors = {};
    
    if (!paymentData?.cardNumber?.replace(/\s/g, '')) {
      newErrors.cardNumber = 'Card number is required';
    } else if (paymentData?.cardNumber?.replace(/\s/g, '')?.length < 16) {
      newErrors.cardNumber = 'Invalid card number';
    }
    
    if (!paymentData?.cardName?.trim()) newErrors.cardName = 'Cardholder name is required';
    if (!paymentData?.expiryMonth) newErrors.expiryMonth = 'Expiry month is required';
    if (!paymentData?.expiryYear) newErrors.expiryYear = 'Expiry year is required';
    if (!paymentData?.cvv?.trim()) newErrors.cvv = 'CVV is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (paymentData?.method === 'card' && !validateCardForm()) return;
    
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onNext();
  };

  const handleInputChange = (field, value) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="CreditCard" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-text-primary">Payment Information</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Method Selection */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Payment Method</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {paymentMethods?.map((method) => (
                <div
                  key={method?.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    paymentData?.method === method?.id
                      ? 'border-primary bg-primary/5 shadow-brand'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleInputChange('method', method?.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      paymentData?.method === method?.id
                        ? 'border-primary bg-primary' :'border-border'
                    }`}>
                      {paymentData?.method === method?.id && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </div>
                    <Icon name={method?.icon} size={20} className="text-primary" />
                    <span className="text-sm font-medium text-text-primary">{method?.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card Details Form */}
          {paymentData?.method === 'card' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">Card Details</h3>
              
              <Input
                label="Card Number"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={paymentData?.cardNumber || ''}
                onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e?.target?.value))}
                error={errors?.cardNumber}
                maxLength={19}
                required
              />
              
              <Input
                label="Cardholder Name"
                type="text"
                placeholder="John Doe"
                value={paymentData?.cardName || ''}
                onChange={(e) => handleInputChange('cardName', e?.target?.value)}
                error={errors?.cardName}
                required
              />
              
              <div className="grid grid-cols-3 gap-4">
                <Select
                  label="Month"
                  options={monthOptions}
                  value={paymentData?.expiryMonth || ''}
                  onChange={(value) => handleInputChange('expiryMonth', value)}
                  error={errors?.expiryMonth}
                  placeholder="MM"
                  required
                />
                <Select
                  label="Year"
                  options={yearOptions}
                  value={paymentData?.expiryYear || ''}
                  onChange={(value) => handleInputChange('expiryYear', value)}
                  error={errors?.expiryYear}
                  placeholder="YYYY"
                  required
                />
                <Input
                  label="CVV"
                  type="text"
                  placeholder="123"
                  value={paymentData?.cvv || ''}
                  onChange={(e) => handleInputChange('cvv', e?.target?.value?.replace(/\D/g, '')?.slice(0, 4))}
                  error={errors?.cvv}
                  maxLength={4}
                  required
                />
              </div>
            </div>
          )}

          {/* Alternative Payment Methods */}
          {paymentData?.method === 'paypal' && (
            <div className="bg-surface rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Icon name="Wallet" size={24} className="text-primary" />
                <div>
                  <p className="font-medium text-text-primary">PayPal</p>
                  <p className="text-sm text-text-secondary">You'll be redirected to PayPal to complete your payment</p>
                </div>
              </div>
            </div>
          )}

          {(paymentData?.method === 'apple' || paymentData?.method === 'google') && (
            <div className="bg-surface rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Icon name="Smartphone" size={24} className="text-primary" />
                <div>
                  <p className="font-medium text-text-primary">
                    {paymentData?.method === 'apple' ? 'Apple Pay' : 'Google Pay'}
                  </p>
                  <p className="text-sm text-text-secondary">
                    Use your {paymentData?.method === 'apple' ? 'Touch ID or Face ID' : 'fingerprint or PIN'} to pay
                  </p>
                </div>
              </div>
            </div>
          )}

          {paymentData?.method === 'klarna' && (
            <div className="bg-surface rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Icon name="Calendar" size={24} className="text-primary" />
                <div>
                  <p className="font-medium text-text-primary">Buy Now, Pay Later</p>
                  <p className="text-sm text-text-secondary">Split your payment into 4 interest-free installments</p>
                  <p className="text-xs text-text-secondary mt-1">No fees when you pay on time</p>
                </div>
              </div>
            </div>
          )}

          {/* Security Information */}
          <div className="bg-surface rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-success mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-text-primary mb-1">Your payment is secure</p>
                <p className="text-text-secondary">
                  We use industry-standard encryption to protect your payment information. 
                  Your card details are never stored on our servers.
                </p>
              </div>
            </div>
          </div>

          {/* Save Payment Method */}
          {paymentData?.method === 'card' && (
            <Checkbox
              label="Save this payment method for future purchases"
              checked={paymentData?.savePayment || false}
              onChange={(e) => handleInputChange('savePayment', e?.target?.checked)}
            />
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="sm:w-auto"
            >
              Back to Delivery
            </Button>
            <Button
              type="submit"
              loading={isProcessing}
              disabled={!paymentData?.method}
              className="sm:flex-1"
            >
              {isProcessing ? 'Processing Payment...' : 'Review Order'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;