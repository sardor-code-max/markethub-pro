import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignalsBar = () => {
  const trustSignals = [
    {
      icon: 'Shield',
      title: 'Secure Shopping',
      description: 'SSL encrypted checkout',
      color: 'text-trust'
    },
    {
      icon: 'Truck',
      title: 'Free Shipping',
      description: 'On orders over $50',
      color: 'text-primary'
    },
    {
      icon: 'RotateCcw',
      title: 'Easy Returns',
      description: '30-day return policy',
      color: 'text-secondary'
    },
    {
      icon: 'Star',
      title: '4.8/5 Rating',
      description: 'From 50K+ customers',
      color: 'text-accent'
    },
    {
      icon: 'Users',
      title: '2M+ Customers',
      description: 'Trust our platform',
      color: 'text-success'
    },
    {
      icon: 'Clock',
      title: '24/7 Support',
      description: 'Always here to help',
      color: 'text-primary'
    }
  ];

  return (
    <section className="py-6 bg-surface border-y border-border">
      <div className="container mx-auto px-4">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          {trustSignals?.map((signal, index) => (
            <div key={index} className="flex items-center space-x-3 group">
              <div className={`p-2 rounded-lg bg-background border border-border group-hover:border-primary/30 transition-colors`}>
                <Icon 
                  name={signal?.icon} 
                  size={20} 
                  className={`${signal?.color} group-hover:scale-110 transition-transform`} 
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-text-primary">
                  {signal?.title}
                </div>
                <div className="text-xs text-text-secondary">
                  {signal?.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:grid lg:hidden grid-cols-3 gap-6">
          {trustSignals?.slice(0, 6)?.map((signal, index) => (
            <div key={index} className="flex items-center space-x-3 group">
              <div className={`p-2 rounded-lg bg-background border border-border group-hover:border-primary/30 transition-colors`}>
                <Icon 
                  name={signal?.icon} 
                  size={20} 
                  className={`${signal?.color} group-hover:scale-110 transition-transform`} 
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-text-primary">
                  {signal?.title}
                </div>
                <div className="text-xs text-text-secondary">
                  {signal?.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Layout - Horizontal Scroll */}
        <div className="md:hidden">
          <div className="flex space-x-6 overflow-x-auto pb-4 scroll-snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {trustSignals?.map((signal, index) => (
              <div key={index} className="flex-shrink-0 flex items-center space-x-3 scroll-snap-item group min-w-max">
                <div className={`p-2 rounded-lg bg-background border border-border group-hover:border-primary/30 transition-colors`}>
                  <Icon 
                    name={signal?.icon} 
                    size={20} 
                    className={`${signal?.color} group-hover:scale-110 transition-transform`} 
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-text-primary whitespace-nowrap">
                    {signal?.title}
                  </div>
                  <div className="text-xs text-text-secondary whitespace-nowrap">
                    {signal?.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Trust Elements */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Payment Methods */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">Accepted payments:</span>
              <div className="flex items-center space-x-2">
                {['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay']?.map((method, index) => (
                  <div 
                    key={index}
                    className="w-8 h-6 bg-background border border-border rounded flex items-center justify-center text-xs font-medium text-text-secondary"
                  >
                    {method?.slice(0, 2)?.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Award" size={16} className="text-trust" />
                <span>BBB A+ Rating</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Lock" size={16} className="text-trust" />
                <span>McAfee Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="CheckCircle" size={16} className="text-trust" />
                <span>Verified Seller</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsBar;