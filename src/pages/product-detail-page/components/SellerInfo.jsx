import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SellerInfo = ({ seller }) => {
  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Seller Information</h3>
      <div className="space-y-4">
        {/* Seller Profile */}
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-semibold">
            {seller?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-semibold text-text-primary">{seller?.name}</h4>
              {seller?.verified && (
                <Icon name="BadgeCheck" size={16} className="text-success" />
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-amber-400" />
                <span>{seller?.rating} ({seller?.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span>Joined {seller?.joinedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Seller Stats */}
        <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-border">
          <div className="text-center">
            <div className="text-lg font-bold text-text-primary">{seller?.totalProducts}</div>
            <div className="text-xs text-text-secondary">Products</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-text-primary">{seller?.responseRate}%</div>
            <div className="text-xs text-text-secondary">Response Rate</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-text-primary">{seller?.responseTime}</div>
            <div className="text-xs text-text-secondary">Response Time</div>
          </div>
        </div>

        {/* Seller Policies */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="RotateCcw" size={16} className="text-success" />
              <span className="text-text-secondary">Returns</span>
            </div>
            <span className="text-text-primary font-medium">{seller?.returnPolicy}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Truck" size={16} className="text-success" />
              <span className="text-text-secondary">Shipping</span>
            </div>
            <span className="text-text-primary font-medium">{seller?.shippingTime}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} className="text-success" />
              <span className="text-text-secondary">Ships from</span>
            </div>
            <span className="text-text-primary font-medium">{seller?.location}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Store"
            iconPosition="left"
          >
            Visit Store
          </Button>
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            iconName="MessageCircle"
            iconPosition="left"
          >
            Contact Seller
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
          {seller?.badges?.map((badge, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 bg-surface px-2 py-1 rounded text-xs"
            >
              <Icon name={badge?.icon} size={12} className="text-success" />
              <span className="text-text-secondary">{badge?.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;