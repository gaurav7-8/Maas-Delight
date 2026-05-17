import React from 'react';
import { useApp } from '../context/AppContext';
import DashboardLayout from '../layouts/DashboardLayout';
import GlassCard from '../components/GlassCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { DollarSign, ShoppingBag, ArrowUpRight, Award, ChevronRight, TrendingUp } from 'lucide-react';

const CHART_DATA = [
  { name: 'Mon', sales: 120, orders: 5 },
  { name: 'Tue', sales: 230, orders: 8 },
  { name: 'Wed', sales: 180, orders: 6 },
  { name: 'Thu', sales: 410, orders: 12 },
  { name: 'Fri', sales: 300, orders: 9 },
  { name: 'Sat', sales: 650, orders: 18 },
  { name: 'Sun', sales: 520, orders: 14 }
];

export const EarningsAnalytics = () => {
  const { currentUser, orders } = useApp();

  const chefOrders = orders.filter(o => o.chefId === currentUser?.id);
  const completedOrders = chefOrders.filter(o => o.status === 'Completed');

  const totalEarnings = completedOrders.reduce((acc, o) => acc + o.price, 0) + (currentUser?.earnings || 0);
  const totalVolume = completedOrders.length;
  const avgTicket = totalVolume > 0 ? (totalEarnings / totalVolume) : 0;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 text-left w-full">
        {/* Header */}
        <div className="border-b border-white/5 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Earnings & Analytics</h1>
          <p className="text-gray-400 text-sm mt-1">Track payouts, customer volume metrics, and visual sales growth.</p>
        </div>

        {/* Analytics Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: 'Cumulative Revenue', value: `$${totalEarnings.toFixed(2)}`, icon: DollarSign, color: 'green' },
            { label: 'Dispatched Volume', value: `${totalVolume} orders`, icon: ShoppingBag, color: 'blue' },
            { label: 'Average Ticket Price', value: `$${avgTicket.toFixed(2)}`, icon: ArrowUpRight, color: 'pink' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <GlassCard key={idx} glowColor={stat.color} className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                  <div className={`p-2.5 rounded-lg border border-white/5 ${stat.color === 'green' ? 'bg-neon-green/10 text-neon-green' : stat.color === 'blue' ? 'bg-neon-blue/10 text-neon-blue' : 'bg-neon-pink/10 text-neon-pink'}`}>
                    <Icon size={18} />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-white">{stat.value}</h3>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <TrendingUp size={12} className="text-neon-green" />
                  <span className="text-neon-green font-semibold">+18% growth</span> compared to last month
                </p>
              </GlassCard>
            );
          })}
        </div>

        {/* Graph Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Area Chart */}
          <GlassCard glowColor="purple" className="lg:col-span-2 p-6 flex flex-col gap-6" hoverEffect={false}>
            <div>
              <h3 className="text-lg font-bold text-white">Revenue Performance Ledger</h3>
              <p className="text-xs text-gray-400 mt-0.5">Real-time daily transaction velocity.</p>
            </div>
            
            <div className="h-72 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9333EA" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#9333EA" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ background: '#0d0a25', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                  <Area type="monotone" dataKey="sales" stroke="#9333EA" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Bar Chart Orders */}
          <GlassCard glowColor="pink" className="p-6 flex flex-col gap-6" hoverEffect={false}>
            <div>
              <h3 className="text-lg font-bold text-white">Order Frequency Breakdown</h3>
              <p className="text-xs text-gray-400 mt-0.5">Dispatched counts per day.</p>
            </div>

            <div className="h-72 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA}>
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ background: '#0d0a25', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                  <Bar dataKey="orders" fill="#EC4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Transactions list */}
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <Award size={20} className="text-amber-400" />
            Recent Settled Transactions
          </h2>
          {completedOrders.length === 0 ? (
            <GlassCard className="py-8 text-center text-gray-500 text-sm">
              No transactions have settled yet today.
            </GlassCard>
          ) : (
            <div className="flex flex-col gap-3">
              {completedOrders.map((order) => (
                <GlassCard key={order.id} className="p-4 flex justify-between items-center bg-black/20" hoverEffect={true}>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">Payout for {order.id}</p>
                    <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className="text-base font-black text-neon-green">+${order.price.toFixed(2)}</span>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EarningsAnalytics;
