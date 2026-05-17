import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';

// Page Imports
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import CustomerRegister from './pages/CustomerRegister';
import ChefRegister from './pages/ChefRegister';
import ChefDashboard from './pages/ChefDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import FoodListingPage from './pages/FoodListingPage';
import OrdersPage from './pages/OrdersPage';
import EarningsAnalytics from './pages/EarningsAnalytics';
import ProfileSettings from './pages/ProfileSettings';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public Landing View */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/customer-register" element={<CustomerRegister />} />
          <Route path="/chef-register" element={<ChefRegister />} />

          {/* Customer Specific Views */}
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />

          {/* Chef Specific Views */}
          <Route path="/chef-dashboard" element={<ChefDashboard />} />
          <Route path="/chef-dishes" element={<FoodListingPage />} />
          <Route path="/chef-analytics" element={<EarningsAnalytics />} />

          {/* General Shared Views */}
          <Route path="/dishes" element={<FoodListingPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/settings" element={<ProfileSettings />} />
        </Routes>

        {/* Global Toast Notifications config */}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#0d0a25',
              color: '#f3f4f6',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }
          }}
        />
      </Router>
    </AppProvider>
  );
}

export default App;
