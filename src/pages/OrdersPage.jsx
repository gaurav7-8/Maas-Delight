import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import DashboardLayout from '../layouts/DashboardLayout';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import { Clock, MapPin, Phone, CheckCircle, Flame, ShieldAlert, Award, ClipboardList } from 'lucide-react';

export const OrdersPage = () => {
  const { currentUser, orders, updateOrderStatus } = useApp();
  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'history'

  const isChef = currentUser?.role === 'chef';

  // Filter orders
  const relatedOrders = orders.filter(order => 
    isChef ? order.chefId === currentUser?.id : order.customerId === currentUser?.id
  );

  const displayOrders = relatedOrders.filter(order => {
    const isActive = ['Pending', 'In Prep', 'Ready'].includes(order.status);
    return activeTab === 'active' ? isActive : !isActive;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 text-left w-full">
        {/* Header */}
        <div className="border-b border-white/5 pb-6">
          <h1 className="text-3xl font-extrabold text-white">
            {isChef ? 'Kitchen Orders Center' : 'My Orders & Deliveries'}
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {isChef ? 'Fulfill orders, adjust preparation timers, and manage pickups.' : 'Track your live homemade food orders and review previous receipts.'}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 self-start mb-2">
          <button
            onClick={() => setActiveTab('active')}
            className={`py-2 px-6 rounded-lg text-sm font-semibold tracking-wide cursor-pointer transition-all ${activeTab === 'active' ? 'bg-primary-purple text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            Active Orders
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-2 px-6 rounded-lg text-sm font-semibold tracking-wide cursor-pointer transition-all ${activeTab === 'history' ? 'bg-primary-purple text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            Past History
          </button>
        </div>

        {/* Orders Queue */}
        {displayOrders.length === 0 ? (
          <GlassCard className="py-16 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500 mb-3">
              <ClipboardList size={22} />
            </div>
            <p className="text-gray-400 font-medium">No orders found</p>
            <p className="text-xs text-gray-500 mt-1">
              {activeTab === 'active' 
                ? 'Any active food requests will appear here instantly.' 
                : 'Your order history ledger is clean.'}
            </p>
          </GlassCard>
        ) : (
          <div className="flex flex-col gap-6">
            {displayOrders.map((order) => (
              <GlassCard key={order.id} className="p-6 md:p-8 flex flex-col gap-6">
                {/* Upper Metadata */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-4 gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-black text-white">{order.id}</span>
                      <span className={`text-xs font-bold tracking-wider uppercase px-3 py-0.5 rounded-full ${
                        order.status === 'Pending' ? 'bg-amber-500/20 border border-amber-500/30 text-amber-400' :
                        order.status === 'In Prep' ? 'bg-primary-purple/20 border border-primary-purple/30 text-primary-purple' :
                        order.status === 'Ready' ? 'bg-neon-blue/20 border border-neon-blue/30 text-neon-blue' :
                        order.status === 'Completed' ? 'bg-neon-green/20 border border-neon-green/30 text-neon-green' :
                        'bg-red-500/20 border border-red-500/30 text-red-400'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {isChef 
                        ? `Ordered by customer: ${order.customerName}` 
                        : `Cooked with love by chef: ${order.chefName}`}
                    </p>
                  </div>

                  <div className="flex flex-col md:items-end gap-1.5 text-xs text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-primary-purple" />
                      <span>{order.pickupTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-neon-pink" />
                      <span className="truncate max-w-[200px]" title={order.customerAddress}>
                        {order.customerAddress}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items & Price Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left list */}
                  <div className="md:col-span-2 text-left">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Order Details</h3>
                    <div className="flex flex-col gap-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-black/20 border border-white/5">
                          <div>
                            <p className="text-sm font-semibold text-white">{item.name}</p>
                            <p className="text-xs text-gray-400">Quantity: <span className="text-white font-bold">x{item.quantity}</span></p>
                          </div>
                          <span className="text-sm font-bold text-gray-300">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right summary card */}
                  <div className="glass rounded-2xl p-5 border border-white/5 flex flex-col justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Receipt Summary</h4>
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex justify-between text-gray-400">
                          <span>Subtotal</span>
                          <span>${order.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>Delivery Fee</span>
                          <span>${order.deliveryFee.toFixed(2)}</span>
                        </div>
                        <hr className="border-white/5 my-1" />
                        <div className="flex justify-between text-white font-extrabold text-base">
                          <span>Total Paid</span>
                          <span className="text-neon-pink font-black">${order.totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Operational controls for Chef / Info messages for Customer */}
                    <div className="pt-2 border-t border-white/5">
                      {isChef ? (
                        <div className="flex flex-col gap-2">
                          {order.status === 'Pending' && (
                            <GradientButton variant="purple" onClick={() => updateOrderStatus(order.id, 'In Prep')} className="w-full py-2.5 text-xs font-semibold">
                              Accept Order
                            </GradientButton>
                          )}
                          {order.status === 'In Prep' && (
                            <GradientButton variant="green" onClick={() => updateOrderStatus(order.id, 'Ready')} className="w-full py-2.5 text-xs font-semibold">
                              Mark as Ready
                            </GradientButton>
                          )}
                          {order.status === 'Ready' && (
                            <GradientButton variant="purple" onClick={() => updateOrderStatus(order.id, 'Completed')} className="w-full py-2.5 text-xs font-semibold">
                              Fulfill Pickup
                            </GradientButton>
                          )}
                          {['Completed', 'Cancelled'].includes(order.status) && (
                            <span className="text-xs text-gray-500 italic block text-center">Fulfillment process done.</span>
                          )}
                        </div>
                      ) : (
                        <div className="text-xs text-gray-400 leading-relaxed text-left">
                          {order.status === 'Pending' && (
                            <p className="flex items-center gap-1.5 text-amber-400 font-semibold">
                              ⏳ Awaiting Chef kitchen confirmation.
                            </p>
                          )}
                          {order.status === 'In Prep' && (
                            <p className="flex items-center gap-1.5 text-primary-purple font-semibold">
                              🔥 Chef is preparing your dish right now!
                            </p>
                          )}
                          {order.status === 'Ready' && (
                            <p className="flex items-center gap-1.5 text-neon-blue font-semibold animate-pulse">
                              🛵 Order is ready for pickup or delivery!
                            </p>
                          )}
                          {order.status === 'Completed' && (
                            <p className="flex items-center gap-1.5 text-neon-green font-semibold">
                              ✅ Order successfully fulfilled and eaten!
                            </p>
                          )}
                          {order.status === 'Cancelled' && (
                            <p className="flex items-center gap-1.5 text-red-400 font-semibold">
                              ❌ This order was cancelled.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default OrdersPage;
