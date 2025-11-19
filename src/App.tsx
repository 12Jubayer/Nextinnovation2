import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Payment from './pages/Payment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import CustomerPortal from './pages/CustomerPortal';
import AffiliateDashboard from './pages/AffiliateDashboard';
import AffiliateLogin from './pages/AffiliateLogin';
import AffiliateRegister from './pages/AffiliateRegister';
import AffiliateWithdraw from './pages/AffiliateWithdraw';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/course/:courseId" element={<CoursePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/payment" 
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                } 
              />
              <Route path="/customer" element={<ProtectedRoute requiredRoles={['customer']}><CustomerPortal /></ProtectedRoute>} />
              <Route path="/affiliate" element={<AffiliateDashboard />} />
              <Route path="/affiliate/login" element={<AffiliateLogin />} />
              <Route path="/affiliate/register" element={<AffiliateRegister />} />
              <Route path="/affiliate/withdraw" element={<ProtectedRoute requiredRoles={['affiliate']}><AffiliateWithdraw /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;