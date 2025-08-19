import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CheckoutHeader from './components/CheckoutHeader';
import ShippingForm from './components/ShippingForm';
import DeliveryOptions from './components/DeliveryOptions';
import PaymentForm from './components/PaymentForm';
import OrderReview from './components/OrderReview';
import OrderConfirmation from './components/OrderConfirmation';
import OrderSummary from './components/OrderSummary';

const CheckoutFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    saveAddress: false,
    sameBilling: true
  });

  const [deliveryOption, setDeliveryOption] = useState('standard');
  
  const [paymentData, setPaymentData] = useState({
    method: 'card',
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    savePayment: false
  });

  const steps = [
    { id: 'shipping', title: 'Shipping', component: 'shipping' },
    { id: 'delivery', title: 'Delivery', component: 'delivery' },
    { id: 'payment', title: 'Payment', component: 'payment' },
    { id: 'review', title: 'Review', component: 'review' },
    { id: 'confirmation', title: 'Complete', component: 'confirmation' }
  ];

  const deliveryOptions = {
    standard: {
      name: 'Standard Delivery',
      price: 0,
      duration: '5-7 business days'
    },
    express: {
      name: 'Express Delivery',
      price: 12.99,
      duration: '2-3 business days'
    },
    overnight: {
      name: 'Overnight Delivery',
      price: 24.99,
      duration: '1 business day'
    },
    pickup: {
      name: 'Store Pickup',
      price: 0,
      duration: 'Ready in 2-4 hours'
    }
  };

  useEffect(() => {
    // Generate order number when reaching confirmation step
    if (currentStep === 4 && !orderNumber) {
      const newOrderNumber = `MHP${Date.now()?.toString()?.slice(-8)}`;
      setOrderNumber(newOrderNumber);
    }
  }, [currentStep, orderNumber]);

  const handleNext = () => {
    if (currentStep < steps?.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/shopping-cart');
    }
  };

  const handlePlaceOrder = () => {
    // Order placement logic would go here
    console.log('Order placed successfully!');
  };

  const orderData = {
    shipping: formData,
    delivery: deliveryOptions?.[deliveryOption],
    payment: paymentData
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ShippingForm
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 1:
        return (
          <DeliveryOptions
            selectedOption={deliveryOption}
            setSelectedOption={setDeliveryOption}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <PaymentForm
            paymentData={paymentData}
            setPaymentData={setPaymentData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <OrderReview
            orderData={orderData}
            onPlaceOrder={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <OrderConfirmation
            orderNumber={orderNumber}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {currentStep < 4 && (
        <CheckoutHeader currentStep={currentStep} steps={steps} />
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {renderCurrentStep()}
          </div>

          {/* Order Summary Sidebar */}
          {currentStep < 4 && (
            <div className="lg:col-span-1">
              <OrderSummary
                isVisible={summaryVisible}
                onToggle={() => setSummaryVisible(!summaryVisible)}
              />
            </div>
          )}

          {/* Full Width Confirmation */}
          {currentStep === 4 && (
            <div className="lg:col-span-3">
              {renderCurrentStep()}
            </div>
          )}
        </div>
      </div>

      {/* Trust Signal Footer */}
      {currentStep < 4 && (
        <div className="bg-surface border-t border-border py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-8 text-xs text-text-secondary">
              <div className="flex items-center space-x-2">
                <span>🔒</span>
                <span>SSL Secured Checkout</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span>24/7 Customer Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>↩️</span>
                <span>30-Day Money Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutFlow;