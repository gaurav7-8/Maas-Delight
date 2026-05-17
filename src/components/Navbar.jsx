import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Trash2, 
  Plus, 
  Minus,
  ChefHat
} from 'lucide-react';
import GradientButton from './GradientButton';
import GlassCard from './GlassCard';

export const Navbar = () => {
  const { currentUser, logout, cart, updateCartQty, removeFromCart, placeOrder } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    setCartOpen(false);
    const success = placeOrder();
    if (success) {
      navigate('/orders');
    }
  };

  const navLinks = [
    { name: 'Dishes', path: '/dishes' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-black/20 border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-purple to-neon-pink flex items-center justify-center shadow-[0_0_15px_rgba(108,43,217,0.4)] group-hover:scale-110 transition-all duration-300">
            <ChefHat className="text-white" size={20} />
          </div>
          <span className="font-poppins font-black text-2xl tracking-wider text-white group-hover:text-neon-pink transition-all duration-300">
            CHEF<span className="text-primary-purple">HUB</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium transition-all duration-300 ${location.pathname === link.path ? 'text-neon-pink' : 'text-gray-300 hover:text-white'}`}
            >
              {link.name}
            </Link>
          ))}
          
          {currentUser && currentUser.role === 'customer' && (
            <Link to="/customer-dashboard" className="text-gray-300 hover:text-white font-medium transition-all">
              Dashboard
            </Link>
          )}

          {currentUser && currentUser.role === 'chef' && (
            <Link to="/chef-dashboard" className="text-gray-300 hover:text-white font-medium transition-all">
              Chef Center
            </Link>
          )}
        </div>

        {/* Actions / Auth buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Cart Icon for Customers */}
          {(!currentUser || currentUser.role === 'customer') && (
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              <ShoppingBag size={20} />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-neon-pink text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(236,72,153,0.6)] animate-pulse">
                  {totalCartItems}
                </span>
              )}
            </button>
          )}

          {currentUser ? (
            <div className="flex items-center gap-4">
              <Link 
                to={currentUser.role === 'chef' ? '/chef-dashboard' : '/customer-dashboard'}
                className="flex items-center gap-2 group px-3 py-1.5 rounded-xl border border-white/5 bg-white/5"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-primary-purple flex items-center justify-center text-white font-bold text-sm">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                  ) : (
                    currentUser.name.charAt(0)
                  )}
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="text-sm font-semibold text-white group-hover:text-primary-purple transition-all duration-300">{currentUser.name}</p>
                </div>
              </Link>
              <button 
                onClick={handleLogout}
                className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 cursor-pointer"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <GradientButton variant="outline">Sign In</GradientButton>
              </Link>
              <Link to="/customer-register">
                <GradientButton variant="pink">Order Food</GradientButton>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          {(!currentUser || currentUser.role === 'customer') && (
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              <ShoppingBag size={18} />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-neon-pink text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg">
                  {totalCartItems}
                </span>
              )}
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[73px] z-30 w-full bg-black/95 backdrop-blur-lg border-b border-white/5 px-6 py-8 flex flex-col gap-6 md:hidden">
          <Link 
            to="/dishes" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium text-gray-300 hover:text-white"
          >
            Explore Dishes
          </Link>
          {currentUser && (
            <Link 
              to={currentUser.role === 'chef' ? '/chef-dashboard' : '/customer-dashboard'} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-gray-300 hover:text-white"
            >
              My Dashboard
            </Link>
          )}

          <hr className="border-white/10" />

          {currentUser ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-purple flex items-center justify-center font-bold">
                  {currentUser.avatar ? <img src={currentUser.avatar} alt="" /> : currentUser.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold">{currentUser.name}</p>
                  <p className="text-xs text-gray-400 capitalize">{currentUser.role}</p>
                </div>
              </div>
              <GradientButton 
                variant="outline" 
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-red-400"
              >
                <LogOut size={18} /> Sign Out
              </GradientButton>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <GradientButton variant="outline" className="w-full">Sign In</GradientButton>
              </Link>
              <Link to="/customer-register" onClick={() => setMobileMenuOpen(false)}>
                <GradientButton variant="pink" className="w-full">Register Customer</GradientButton>
              </Link>
              <Link to="/chef-register" onClick={() => setMobileMenuOpen(false)}>
                <GradientButton variant="purple" className="w-full">Register Chef</GradientButton>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Cart Sidebar Slider */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setCartOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md glass border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <h2 className="text-xl font-bold font-poppins text-white flex items-center gap-2">
                    <ShoppingBag className="text-neon-pink" size={22} />
                    Your Cyber Cart
                  </h2>
                  <button 
                    onClick={() => setCartOpen(false)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-gray-500">
                      <ShoppingBag size={28} />
                    </div>
                    <p className="text-gray-400 font-medium">Your cart is empty</p>
                    <Link to="/dishes" onClick={() => setCartOpen(false)} className="text-primary-purple hover:underline text-sm mt-2">
                      Explore our delicious dishes
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] pr-1">
                    {cart.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex gap-4 p-3 rounded-xl bg-black/20 border border-white/5"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow text-left">
                          <h4 className="text-sm font-semibold text-white truncate max-w-[200px]">{item.name}</h4>
                          <p className="text-xs text-gray-400">by {item.chefName}</p>
                          <p className="text-sm font-bold text-neon-pink mt-1">${item.price}</p>
                          
                          {/* Qty controls */}
                          <div className="flex items-center gap-2.5 mt-2">
                            <button 
                              onClick={() => updateCartQty(item.id, item.quantity - 1)}
                              className="p-1 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-white cursor-pointer"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-semibold text-white w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateCartQty(item.id, item.quantity + 1)}
                              className="p-1 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-white cursor-pointer"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="self-center p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-white/5 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Delivery Fee</span>
                    <span className="text-white font-semibold">$3.99</span>
                  </div>
                  <div className="flex justify-between mb-6">
                    <span className="text-gray-300 font-medium">Total</span>
                    <span className="text-neon-pink font-black text-xl">${(cartSubtotal + 3.99).toFixed(2)}</span>
                  </div>

                  <GradientButton 
                    variant="pink" 
                    onClick={handleCheckout}
                    className="w-full py-4 text-center font-bold text-lg"
                  >
                    Instantly Order Food
                  </GradientButton>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
