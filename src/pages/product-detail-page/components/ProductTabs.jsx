import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description', icon: 'FileText' },
    { id: 'specifications', label: 'Specifications', icon: 'List' },
    { id: 'reviews', label: 'Reviews', icon: 'Star', count: product?.reviewCount },
    { id: 'qa', label: 'Q&A', icon: 'MessageCircle', count: product?.qaCount || 0 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="prose max-w-none">
            <div className="text-text-secondary leading-relaxed whitespace-pre-line">
              {product?.description}
            </div>
            {product?.highlights && product?.highlights?.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-text-primary mb-3">Product Highlights:</h4>
                <ul className="space-y-2">
                  {product?.highlights?.map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 'specifications':
        return (
          <div className="space-y-6">
            {product?.specifications && Object.entries(product?.specifications)?.map(([category, specs]) => (
              <div key={category}>
                <h4 className="font-semibold text-text-primary mb-3 capitalize">
                  {category?.replace(/([A-Z])/g, ' $1')?.trim()}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(specs)?.map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-border">
                      <span className="text-text-secondary capitalize">
                        {key?.replace(/([A-Z])/g, ' $1')?.trim()}:
                      </span>
                      <span className="text-text-primary font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            {/* Review Summary */}
            <div className="bg-surface p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-text-primary">{product?.rating}</span>
                    <div className="flex">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={20}
                          className={i < Math.floor(product?.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-text-secondary">Based on {product?.reviewCount} reviews</p>
                </div>
                <div className="space-y-1">
                  {[5, 4, 3, 2, 1]?.map((stars) => (
                    <div key={stars} className="flex items-center space-x-2 text-sm">
                      <span className="w-8">{stars}★</span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${(product?.ratingDistribution?.[stars] || 0)}%` }}
                        />
                      </div>
                      <span className="text-text-secondary w-8">
                        {product?.ratingDistribution?.[stars] || 0}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Individual Reviews */}
            <div className="space-y-4">
              {product?.reviews?.map((review) => (
                <div key={review?.id} className="border-b border-border pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                        {review?.userName?.charAt(0)?.toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">{review?.userName}</div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)]?.map((_, i) => (
                              <Icon
                                key={i}
                                name="Star"
                                size={14}
                                className={i < review?.rating ? 'text-amber-400 fill-current' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-text-secondary">{review?.date}</span>
                          {review?.verified && (
                            <span className="text-xs bg-success text-success-foreground px-2 py-0.5 rounded">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-text-secondary mb-2">{review?.comment}</p>
                  {review?.helpful > 0 && (
                    <div className="flex items-center space-x-4 text-sm">
                      <button className="flex items-center space-x-1 text-text-secondary hover:text-text-primary">
                        <Icon name="ThumbsUp" size={14} />
                        <span>Helpful ({review?.helpful})</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'qa':
        return (
          <div className="space-y-6">
            <div className="bg-surface p-4 rounded-lg">
              <h4 className="font-semibold text-text-primary mb-2">Ask a Question</h4>
              <p className="text-text-secondary text-sm mb-3">
                Get answers from other customers and the MarketHub Pro community
              </p>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your question here..."
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Ask
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {product?.qa?.map((item) => (
                <div key={item?.id} className="border-b border-border pb-4">
                  <div className="mb-2">
                    <div className="flex items-start space-x-2 mb-1">
                      <Icon name="MessageCircle" size={16} className="text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-text-primary">{item?.question}</p>
                        <p className="text-sm text-text-secondary">
                          Asked by {item?.askedBy} on {item?.date}
                        </p>
                      </div>
                    </div>
                  </div>
                  {item?.answer && (
                    <div className="ml-6 pl-4 border-l-2 border-success">
                      <p className="text-text-secondary mb-1">{item?.answer}</p>
                      <p className="text-sm text-text-secondary">
                        Answered by {item?.answeredBy} on {item?.answerDate}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-0 overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
              {tab?.count !== undefined && (
                <span className="bg-muted text-text-secondary px-2 py-0.5 rounded-full text-xs">
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;