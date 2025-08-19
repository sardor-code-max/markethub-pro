import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DeliveryOptions = ({ selectedOption, setSelectedOption, onNext, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);

  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      description: 'Free shipping on orders over $50',
      price: 0,
      originalPrice: 5.99,
      duration: '5-7 business days',
      icon: 'Truck',
      popular: false
    },
    {
      id: 'express',
      name: 'Express Delivery',
      description: 'Faster delivery for urgent orders',
      price: 12.99,
      duration: '2-3 business days',
      icon: 'Zap',
      popular: true
    },
    {
      id: 'overnight',
      name: 'Overnight Delivery',
      description: 'Next business day delivery',
      price: 24.99,
      duration: '1 business day',
      icon: 'Clock',
      popular: false
    },
    {
      id: 'pickup',
      name: 'Store Pickup',
      description: 'Pick up from our nearest store',
      price: 0,
      duration: 'Ready in 2-4 hours',
      icon: 'MapPin',
      popular: false
    }
  ];

  const handleContinue = async () => {
    if (!selectedOption) return;
    
    setIsLoading(true);
    // Simulate delivery calculation
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Truck" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-text-primary">Delivery Options</h2>
        </div>

        <div className="space-y-4 mb-6">
          {deliveryOptions?.map((option) => (
            <div
              key={option?.id}
              className={`relative border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedOption === option?.id
                  ? 'border-primary bg-primary/5 shadow-brand'
                  : 'border-border hover:border-primary/50 hover:shadow-brand'
              }`}
              onClick={() => setSelectedOption(option?.id)}
            >
              {option?.popular && (
                <div className="absolute -top-2 left-4 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded">
                  Most Popular
                </div>
              )}
              
              <div className="flex items-start space-x-4">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
                  selectedOption === option?.id
                    ? 'border-primary bg-primary' :'border-border'
                }`}>
                  {selectedOption === option?.id && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon name={option?.icon} size={20} className="text-primary" />
                      <div>
                        <h3 className="font-semibold text-text-primary">{option?.name}</h3>
                        <p className="text-sm text-text-secondary">{option?.description}</p>
                        <p className="text-sm font-medium text-primary mt-1">{option?.duration}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {option?.price === 0 ? (
                        <div>
                          <span className="text-lg font-semibold text-success">FREE</span>
                          {option?.originalPrice && (
                            <p className="text-sm text-text-secondary line-through">
                              ${option?.originalPrice}
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="text-lg font-semibold text-text-primary">
                          ${option?.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Information */}
        <div className="bg-surface rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div className="text-sm text-text-secondary">
              <p className="font-medium text-text-primary mb-2">Delivery Information</p>
              <ul className="space-y-1">
                <li>• All delivery times are estimated and may vary based on location</li>
                <li>• Free standard shipping on orders over $50</li>
                <li>• Signature may be required for high-value items</li>
                <li>• We'll send tracking information once your order ships</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Store Pickup Information */}
        {selectedOption === 'pickup' && (
          <div className="bg-surface rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Icon name="MapPin" size={20} className="text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-text-primary mb-2">Pickup Location</h4>
                <p className="text-sm text-text-secondary mb-2">
                  MarketHub Pro Store - Downtown
                  <br />
                  123 Commerce Street, New York, NY 10001
                </p>
                <p className="text-sm text-text-secondary">
                  Store Hours: Mon-Sat 9AM-8PM, Sun 11AM-6PM
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="sm:w-auto"
          >
            Back to Shipping
          </Button>
          <Button
            onClick={handleContinue}
            loading={isLoading}
            disabled={!selectedOption}
            className="sm:flex-1"
          >
            {isLoading ? 'Calculating...' : 'Continue to Payment'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOptions;