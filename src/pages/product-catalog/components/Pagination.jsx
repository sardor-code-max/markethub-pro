import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  showQuickJump = true,
  className = "" 
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range?.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots?.push(1, '...');
    } else {
      rangeWithDots?.push(1);
    }

    rangeWithDots?.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots?.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots?.push(totalPages);
    }

    return rangeWithDots;
  };

  const handleQuickJump = (e) => {
    e?.preventDefault();
    const formData = new FormData(e.target);
    const page = parseInt(formData?.get('page'));
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 ${className}`}>
      {/* Page Info */}
      <div className="text-sm text-text-secondary">
        Page {currentPage} of {totalPages}
      </div>
      {/* Pagination Controls */}
      <div className="flex items-center space-x-1">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Icon name="ChevronLeft" size={16} className="mr-1" />
          Previous
        </Button>

        {/* Page Numbers */}
        <div className="hidden sm:flex items-center space-x-1">
          {getVisiblePages()?.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-3 py-2 text-text-secondary">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-2 text-sm rounded transition-colors ${
                    page === currentPage
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <Icon name="ChevronRight" size={16} className="ml-1" />
        </Button>
      </div>
      {/* Quick Jump */}
      {showQuickJump && (
        <form onSubmit={handleQuickJump} className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Go to:</span>
          <input
            type="number"
            name="page"
            min="1"
            max={totalPages}
            className="w-16 px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder={currentPage}
          />
          <Button type="submit" variant="outline" size="sm">
            <Icon name="ArrowRight" size={14} />
          </Button>
        </form>
      )}
    </div>
  );
};

export default Pagination;