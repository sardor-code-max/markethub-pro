import React from 'react';
import Icon from '../../../components/AppIcon';

const CheckoutProgress = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, name: 'Shopping Cart', icon: 'ShoppingCart' },
    { id: 2, name: 'Checkout', icon: 'CreditCard' },
    { id: 3, name: 'Order Complete', icon: 'CheckCircle' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                step?.id === currentStep 
                  ? 'bg-primary text-primary-foreground' 
                  : step?.id < currentStep 
                    ? 'bg-success text-success-foreground' 
                    : 'bg-surface text-text-secondary border-2 border-border'
              }`}>
                {step?.id < currentStep ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <Icon name={step?.icon} size={20} />
                )}
              </div>
              <div className="ml-3 hidden sm:block">
                <div className={`text-sm font-medium ${
                  step?.id === currentStep 
                    ? 'text-primary' 
                    : step?.id < currentStep 
                      ? 'text-success' :'text-text-secondary'
                }`}>
                  {step?.name}
                </div>
              </div>
            </div>
            
            {index < steps?.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 transition-all duration-200 ${
                step?.id < currentStep ? 'bg-success' : 'bg-border'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CheckoutProgress;