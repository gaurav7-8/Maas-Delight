import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  ChefHat,
  ShoppingBag,
  TrendingUp,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  PlusSquare,
  ClipboardList
} from 'lucide-react';

export const DashboardLayout = ({ children }) => {
  const { currentUser, logout } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030014] text-white p-6">
        <div className="glass rounded-2xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Unauthorized Access</h2>
          <p className="text-gray-400 mb-6">Please log in to view this page.</p>
          <Link to="/login" className="px-6 py-3 bg-primary-purple rounded-xl font-semibold hover:bg-secondary-purple transition-all inline-block">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // Sidebar Links based on role
  const chefLinks = [
    { name: 'Overview', path: '/chef-dashboard', icon: LayoutDashboard },
    { name: 'My Dishes', path: '/chef-dishes', icon: PlusSquare },
    { name: 'Orders Center', path: '/orders', icon: ClipboardList },
    { name: 'Earnings & Stats', path: '/chef-analytics', icon: TrendingUp },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const customerLinks = [
    { name: 'Find Food', path: '/customer-dashboard', icon: ShoppingBag },
    { name: 'Explore All', path: '/dishes', icon: ChefHat },
    { name: 'My Orders', path: '/orders', icon: ClipboardList },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const links = currentUser.role === 'chef' ? chefLinks : customerLinks;

  return (
    <div className="min-h-screen flex text-white relative z-10">
      {/* Sidebar */}
      <aside 
        className={`glass border-r border-white/5 transition-all duration-300 flex flex-col justify-between fixed md:sticky top-0 h-screen z-30 ${collapsed ? 'w-20' : 'w-64'}`}
      >
        <div>
          {/* Header */}
          <div className={`p-6 flex items-center border-b border-white/5 ${collapsed ? 'justify-center' : 'justify-between'}`}>
            {!collapsed && (
              <span className="font-poppins font-black text-lg tracking-wider text-white">
                {currentUser.role === 'chef' ? 'CHEF' : 'CUSTOMER'}<span className="text-primary-purple">HUB</span>
              </span>
            )}
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          {/* User Profile Summary */}
          <div className={`p-4 flex items-center gap-3 border-b border-white/5 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-primary-purple flex items-center justify-center font-bold text-white flex-shrink-0">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                currentUser.name.charAt(0)
              )}
            </div>
            {!collapsed && (
              <div className="text-left overflow-hidden">
                <h4 className="text-sm font-semibold truncate text-white">{currentUser.name}</h4>
                <span className="text-xs text-gray-400 capitalize">{currentUser.role} Account</span>
              </div>
            )}
          </div>

          {/* Links */}
          <nav className="p-3 flex flex-col gap-1.5">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              const LinkIcon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-primary-purple/20 border border-primary-purple/40 text-white font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  <LinkIcon size={18} className={isActive ? 'text-primary-purple' : 'text-gray-400 group-hover:text-white'} />
                  {!collapsed && <span className="text-sm">{link.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-3 border-t border-white/5">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 p-3 w-full rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all cursor-pointer ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={18} />
            {!collapsed && <span className="text-sm">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-10 overflow-x-hidden min-h-screen flex flex-col ml-0">
        <div className="max-w-7xl w-full mx-auto flex-grow flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
