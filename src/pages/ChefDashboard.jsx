import React from 'react';
import { useApp } from '../context/AppContext';
import DashboardLayout from '../layouts/DashboardLayout';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import { 
  DollarSign, 
  ShoppingBag, 
  Star, 
  Flame, 
  Clock, 
  User, 
  MapPin, 
  ChevronRight, 
  Calendar,
  AlertCircle,
  TrendingUp,
  Activity
} from 'lucide-react';

export const ChefDashboard = () => {
  const { currentUser, orders, toggleKitchenStatus, updateOrderStatus, dishes } = useApp();

  // Filter orders for this specific chef
  const chefOrders = orders.filter(o => o.chefId === currentUser?.id);
  const activeOrders = chefOrders.filter(o => ['Pending', 'In Prep', 'Ready'].includes(o.status));
  const completedOrders = chefOrders.filter(o => o.status === 'Completed');

  // Stats
  const totalEarnings = chefOrders
    .filter(o => o.status === 'Completed')
    .reduce((acc, o) => acc + o.price, 0) + (currentUser?.earnings || 0);

  const avgRating = currentUser?.rating || 4.9;
  const dishesListed = dishes.filter(d => d.chefId === currentUser?.id).length;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 text-left">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-poppins text-white tracking-tight">
              Welcome Back, <span className="text-gradient-purple">{currentUser?.name}!</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">Manage your professional home kitchen, menu items, and active orders.</p>
          </div>

          {/* Open/Close Toggle */}
          <div className="flex items-center gap-4 bg-black/30 p-2.5 rounded-xl border border-white/5 self-start md:self-auto">
            <span className="text-sm font-semibold text-gray-300">
              Kitchen Status: <span className={currentUser?.kitchenOpen ? "text-neon-green font-bold" : "text-red-400 font-bold"}>
                {currentUser?.kitchenOpen ? "OPEN" : "CLOSED"}
              </span>
            </span>
            <button 
              onClick={toggleKitchenStatus}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${currentUser?.kitchenOpen ? 'bg-neon-green' : 'bg-white/10'}`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${currentUser?.kitchenOpen ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Earnings', value: `$${totalEarnings.toFixed(2)}`, icon: DollarSign, color: 'green', desc: 'Earnings processed' },
            { label: 'Active Orders', value: activeOrders.length, icon: ShoppingBag, color: 'blue', desc: 'Awaiting fulfillment' },
            { label: 'Average Rating', value: `${avgRating} ★`, icon: Star, color: 'gold', desc: 'Based on customer reviews' },
            { label: 'Menu Dishes', value: dishesListed, icon: Flame, color: 'purple', desc: 'Dishes currently active' }
          ].map((stat, i) => {
            const Icon = stat.icon;
            let iconColorClass = '';
            if (stat.color === 'green') iconColorClass = 'text-neon-green bg-neon-green/10';
            else if (stat.color === 'blue') iconColorClass = 'text-neon-blue bg-neon-blue/10';
            else if (stat.color === 'gold') iconColorClass = 'text-amber-400 bg-amber-400/10';
            else iconColorClass = 'text-primary-purple bg-primary-purple/10';

            return (
              <GlassCard key={i} glowColor={stat.color} className="p-6 flex flex-col justify-between" hoverEffect={true}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-bold text-gray-400 tracking-wider uppercase">{stat.label}</p>
                    <h3 className="text-3xl font-black text-white mt-1">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-xl border border-white/5 ${iconColorClass}`}>
                    <Icon size={20} />
                  </div>
                </div>
                <p className="text-xs text-gray-500">{stat.desc}</p>
              </GlassCard>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Orders Queue */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShoppingBag size={20} className="text-primary-purple" />
              Active Orders Queue
            </h2>

            {activeOrders.length === 0 ? (
              <GlassCard className="py-12 px-6 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500 mb-3">
                  <ShoppingBag size={22} />
                </div>
                <p className="text-gray-400 font-medium">No active orders</p>
                <p className="text-xs text-gray-500 mt-1">Orders will pop up here instantly when customers buy.</p>
              </GlassCard>
            ) : (
              <div className="flex flex-col gap-4">
                {activeOrders.map((order) => (
                  <GlassCard key={order.id} className="p-6 flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 gap-2">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="text-sm font-bold text-white uppercase">{order.id}</span>
                          <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${order.status === 'Pending' ? 'bg-amber-500/20 border border-amber-500/30 text-amber-400' : order.status === 'In Prep' ? 'bg-primary-purple/20 border border-primary-purple/30 text-primary-purple' : 'bg-neon-green/20 border border-neon-green/30 text-neon-green'}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Prepared for <span className="text-white font-semibold">{order.customerName}</span></p>
                      </div>

                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1 text-gray-400">
                          <Clock size={14} />
                          <span>Pickup: {order.pickupTime}</span>
                        </div>
                        <span className="text-base font-black text-neon-pink">${order.totalPrice}</span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="text-left py-2">
                      <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Dishes Requested</h4>
                      <ul className="flex flex-col gap-1.5">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="text-sm text-white flex justify-between items-center bg-black/20 p-2 rounded-lg border border-white/5">
                            <span>{item.name} <span className="text-primary-purple font-bold">x{item.quantity}</span></span>
                            <span className="text-xs text-gray-400">${(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Quick actions */}
                    <div className="flex flex-wrap gap-3 items-center justify-between border-t border-white/5 pt-4">
                      {order.status === 'Pending' && (
                        <>
                          <GradientButton 
                            variant="purple" 
                            onClick={() => updateOrderStatus(order.id, 'In Prep')}
                            className="py-2 px-5 text-sm font-semibold rounded-xl"
                          >
                            Accept Order
                          </GradientButton>
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'Cancelled')}
                            className="py-2 px-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-sm font-semibold cursor-pointer"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {order.status === 'In Prep' && (
                        <>
                          <div className="flex items-center gap-2 text-xs text-amber-400">
                            <Activity className="animate-spin text-amber-500" size={14} />
                            <span>Prep Countdown: {order.prepCountdown} mins remaining</span>
                          </div>
                          <GradientButton 
                            variant="green" 
                            onClick={() => updateOrderStatus(order.id, 'Ready')}
                            className="py-2 px-5 text-sm font-semibold rounded-xl"
                          >
                            Mark as Ready
                          </GradientButton>
                        </>
                      )}

                      {order.status === 'Ready' && (
                        <>
                          <div className="flex items-center gap-1.5 text-xs text-neon-green">
                            <AlertCircle size={14} />
                            <span>Awaiting customer/delivery pickup</span>
                          </div>
                          <GradientButton 
                            variant="purple" 
                            onClick={() => updateOrderStatus(order.id, 'Completed')}
                            className="py-2 px-5 text-sm font-semibold rounded-xl"
                          >
                            Complete Order
                          </GradientButton>
                        </>
                      )}

                      {['Completed', 'Cancelled'].includes(order.status) && (
                        <span className="text-xs text-gray-500">No pending actions available</span>
                      )}
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}
          </div>

          {/* Schedule / Sidebar Widgets */}
          <div className="flex flex-col gap-6 text-left">
            {/* Kitchen Schedule panel */}
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar size={20} className="text-neon-pink" />
              Kitchen Schedule
            </h2>

            <GlassCard glowColor="pink" className="p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-sm font-semibold text-white">Daily Kitchen Hours</span>
                <span className="text-xs text-primary-purple font-semibold">Active</span>
              </div>
              <div className="flex flex-col gap-2.5 text-sm">
                {[
                  { day: 'Mon - Fri', hours: '05:00 PM - 10:00 PM', active: true },
                  { day: 'Sat - Sun', hours: '12:00 PM - 11:30 PM', active: true }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
                    <span className="text-gray-400 font-medium">{item.day}</span>
                    <span className="text-white font-semibold">{item.hours}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Quick Actions */}
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp size={20} className="text-neon-blue" />
              Quick Actions
            </h2>

            <GlassCard glowColor="blue" className="p-6 flex flex-col gap-3">
              <GradientButton variant="outline" className="w-full py-2.5 text-sm justify-start">
                👉 List New Recipe Item
              </GradientButton>
              <GradientButton variant="outline" className="w-full py-2.5 text-sm justify-start">
                👉 Update Capacity Tracker
              </GradientButton>
              <GradientButton variant="outline" className="w-full py-2.5 text-sm justify-start">
                👉 Review Customer Feedback
              </GradientButton>
            </GlassCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChefDashboard;
