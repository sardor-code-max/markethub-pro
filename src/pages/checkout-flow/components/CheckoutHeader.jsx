import React from 'react';
import Icon from '../../../components/AppIcon';

const CheckoutHeader = ({ currentStep, steps }) => {
  return (
    <div className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-text-primary">Secure Checkout</h1>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Shield" size={16} className="text-success" />
            <span>SSL Secured</span>
          </div>
        </div>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {steps?.map((step, index) => (
            <div key={step?.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                  index < currentStep 
                    ? 'bg-success border-success text-white' 
                    : index === currentStep 
                    ? 'bg-primary border-primary text-white' :'bg-background border-border text-text-secondary'
                }`}>
                  {index < currentStep ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span className={`mt-2 text-xs font-medium ${
                  index <= currentStep ? 'text-text-primary' : 'text-text-secondary'
                }`}>
                  {step?.title}
                </span>
              </div>
              {index < steps?.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  index < currentStep ? 'bg-success' : 'bg-border'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutHeader;