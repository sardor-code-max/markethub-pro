import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onQuantityChange, onRemove, onMoveToWishlist }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > item?.stock) return;
    onQuantityChange(item?.id, newQuantity);
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    await onRemove(item?.id);
    setIsRemoving(false);
    setShowRemoveConfirm(false);
  };

  const handleMoveToWishlist = () => {
    onMoveToWishlist(item?.id);
  };

  const isOutOfStock = item?.stock === 0;
  const isLowStock = item?.stock > 0 && item?.stock <= 5;

  return (
    <div className={`bg-card border border-border rounded-lg p-4 transition-all duration-200 ${isOutOfStock ? 'opacity-60' : ''}`}>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Link to={`/product-detail-page?id=${item?.id}`} className="block">
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-surface rounded-lg overflow-hidden hover:shadow-brand transition-shadow">
              <Image
                src={item?.image}
                alt={item?.name}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
            <div className="flex-1">
              <Link 
                to={`/product-detail-page?id=${item?.id}`}
                className="text-lg font-semibold text-text-primary hover:text-primary transition-colors line-clamp-2"
              >
                {item?.name}
              </Link>
              
              <div className="flex items-center gap-2 mt-1 text-sm text-text-secondary">
                <span>Sold by</span>
                <Link to="#" className="text-primary hover:underline font-medium">
                  {item?.seller}
                </Link>
                {item?.sellerRating && (
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={14} className="text-accent fill-current" />
                    <span>{item?.sellerRating}</span>
                  </div>
                )}
              </div>

              {item?.variant && (
                <div className="mt-2 text-sm text-text-secondary">
                  <span className="font-medium">Variant:</span> {item?.variant}
                </div>
              )}

              {/* Stock Status */}
              <div className="mt-2">
                {isOutOfStock ? (
                  <span className="inline-flex items-center gap-1 text-sm text-error font-medium">
                    <Icon name="AlertCircle" size={16} />
                    Out of Stock
                  </span>
                ) : isLowStock ? (
                  <span className="inline-flex items-center gap-1 text-sm text-warning font-medium">
                    <Icon name="AlertTriangle" size={16} />
                    Only {item?.stock} left
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-sm text-success font-medium">
                    <Icon name="CheckCircle" size={16} />
                    In Stock
                  </span>
                )}
              </div>

              {/* Delivery Info */}
              {item?.deliveryDate && !isOutOfStock && (
                <div className="mt-2 text-sm text-text-secondary">
                  <Icon name="Truck" size={16} className="inline mr-1" />
                  Delivery by {item?.deliveryDate}
                </div>
              )}
            </div>

            {/* Price and Actions */}
            <div className="flex flex-col items-end gap-3">
              <div className="text-right">
                <div className="text-xl font-bold text-text-primary">
                  ${(item?.price * item?.quantity)?.toFixed(2)}
                </div>
                <div className="text-sm text-text-secondary">
                  ${item?.price?.toFixed(2)} each
                </div>
                {item?.originalPrice && item?.originalPrice > item?.price && (
                  <div className="text-sm text-text-secondary line-through">
                    ${item?.originalPrice?.toFixed(2)} each
                  </div>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(item?.quantity - 1)}
                  disabled={item?.quantity <= 1 || isOutOfStock}
                  className="h-8 w-8"
                >
                  <Icon name="Minus" size={16} />
                </Button>
                
                <span className="w-12 text-center font-medium">
                  {item?.quantity}
                </span>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(item?.quantity + 1)}
                  disabled={item?.quantity >= item?.stock || isOutOfStock}
                  className="h-8 w-8"
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMoveToWishlist}
                  disabled={isRemoving}
                  iconName="Heart"
                  iconSize={16}
                >
                  Save for Later
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRemoveConfirm(true)}
                  disabled={isRemoving}
                  iconName="Trash2"
                  iconSize={16}
                  className="text-error hover:text-error"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Remove Confirmation Modal */}
      {showRemoveConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-warning" />
              <h3 className="text-lg font-semibold">Remove Item</h3>
            </div>
            <p className="text-text-secondary mb-6">
              Are you sure you want to remove "{item?.name}" from your cart?
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowRemoveConfirm(false)}
                disabled={isRemoving}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleRemove}
                loading={isRemoving}
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;