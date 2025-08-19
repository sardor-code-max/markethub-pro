import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ShippingForm = ({ formData, setFormData, onNext, onBack }) => {
  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' }
  ];

  const stateOptions = [
    { value: 'ca', label: 'California' },
    { value: 'ny', label: 'New York' },
    { value: 'tx', label: 'Texas' },
    { value: 'fl', label: 'Florida' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!formData?.address?.trim()) newErrors.address = 'Address is required';
    if (!formData?.city?.trim()) newErrors.city = 'City is required';
    if (!formData?.state) newErrors.state = 'State is required';
    if (!formData?.zipCode?.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData?.country) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateForm()) return;

    setIsValidating(true);
    // Simulate address validation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsValidating(false);
    onNext();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="MapPin" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-text-primary">Shipping Information</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                placeholder="John"
                value={formData?.firstName || ''}
                onChange={(e) => handleInputChange('firstName', e?.target?.value)}
                error={errors?.firstName}
                required
              />
              <Input
                label="Last Name"
                type="text"
                placeholder="Doe"
                value={formData?.lastName || ''}
                onChange={(e) => handleInputChange('lastName', e?.target?.value)}
                error={errors?.lastName}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="john.doe@example.com"
                value={formData?.email || ''}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                error={errors?.email}
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData?.phone || ''}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
                error={errors?.phone}
                required
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Shipping Address</h3>
            <div className="space-y-4">
              <Input
                label="Street Address"
                type="text"
                placeholder="123 Main Street"
                value={formData?.address || ''}
                onChange={(e) => handleInputChange('address', e?.target?.value)}
                error={errors?.address}
                required
              />
              <Input
                label="Apartment, suite, etc. (optional)"
                type="text"
                placeholder="Apt 4B"
                value={formData?.apartment || ''}
                onChange={(e) => handleInputChange('apartment', e?.target?.value)}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="City"
                  type="text"
                  placeholder="New York"
                  value={formData?.city || ''}
                  onChange={(e) => handleInputChange('city', e?.target?.value)}
                  error={errors?.city}
                  required
                />
                <Select
                  label="State"
                  options={stateOptions}
                  value={formData?.state || ''}
                  onChange={(value) => handleInputChange('state', value)}
                  error={errors?.state}
                  placeholder="Select state"
                  required
                />
                <Input
                  label="ZIP Code"
                  type="text"
                  placeholder="10001"
                  value={formData?.zipCode || ''}
                  onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
                  error={errors?.zipCode}
                  required
                />
              </div>
              <Select
                label="Country"
                options={countryOptions}
                value={formData?.country || ''}
                onChange={(value) => handleInputChange('country', value)}
                error={errors?.country}
                placeholder="Select country"
                required
              />
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <Checkbox
              label="Save this address for future orders"
              checked={formData?.saveAddress || false}
              onChange={(e) => handleInputChange('saveAddress', e?.target?.checked)}
            />
            <Checkbox
              label="Billing address is the same as shipping address"
              checked={formData?.sameBilling || true}
              onChange={(e) => handleInputChange('sameBilling', e?.target?.checked)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="sm:w-auto"
            >
              Back to Cart
            </Button>
            <Button
              type="submit"
              loading={isValidating}
              className="sm:flex-1"
            >
              {isValidating ? 'Validating Address...' : 'Continue to Delivery'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingForm;