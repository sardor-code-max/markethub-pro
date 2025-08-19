import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ShoppingCart from './pages/shopping-cart';
import ProductCatalog from './pages/product-catalog';
import ProductDetailPage from './pages/product-detail-page';
import CheckoutFlow from './pages/checkout-flow';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/product-catalog" element={<ProductCatalog />} />
        <Route path="/product-detail-page" element={<ProductDetailPage />} />
        <Route path="/checkout-flow" element={<CheckoutFlow />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;