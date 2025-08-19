import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProductImageGallery = ({ images, productName }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    setIsZoomed(false);
  };

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images?.length - 1 : prev - 1));
    setIsZoomed(false);
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => (prev === images?.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    
    const rect = e?.currentTarget?.getBoundingClientRect();
    const x = ((e?.clientX - rect?.left) / rect?.width) * 100;
    const y = ((e?.clientY - rect?.top) / rect?.height) * 100;
    setZoomPosition({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-white rounded-lg border border-border overflow-hidden">
        <div 
          className="relative aspect-square cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setIsZoomed(false)}
          onClick={toggleZoom}
        >
          <Image
            src={images?.[selectedImageIndex]?.url}
            alt={`${productName} - Image ${selectedImageIndex + 1}`}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            style={
              isZoomed
                ? {
                    transformOrigin: `${zoomPosition?.x}% ${zoomPosition?.y}%`,
                  }
                : {}
            }
          />
          
          {/* Navigation Arrows */}
          {images?.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e?.stopPropagation();
                  handlePrevious();
                }}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <Icon name="ChevronLeft" size={20} className="text-gray-700" />
              </button>
              <button
                onClick={(e) => {
                  e?.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <Icon name="ChevronRight" size={20} className="text-gray-700" />
              </button>
            </>
          )}

          {/* Zoom Indicator */}
          {!isZoomed && (
            <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
              <Icon name="ZoomIn" size={12} />
              <span>Click to zoom</span>
            </div>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
            {selectedImageIndex + 1} / {images?.length}
          </div>
        </div>
      </div>
      {/* Thumbnail Gallery */}
      {images?.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                selectedImageIndex === index
                  ? 'border-primary shadow-lg'
                  : 'border-border hover:border-gray-400'
              }`}
            >
              <Image
                src={image?.url}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      {/* Image Tags */}
      <div className="flex flex-wrap gap-2">
        {images?.[selectedImageIndex]?.tags?.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-surface text-text-secondary text-xs rounded-full border border-border"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;