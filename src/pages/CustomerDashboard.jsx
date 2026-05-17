import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import DashboardLayout from '../layouts/DashboardLayout';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Filter, 
  Sparkles, 
  User, 
  ChevronRight,
  Plus
} from 'lucide-react';

const CATEGORIES = ['All', 'Pasta', 'Ramen', 'Salad', 'Desserts', 'Tacos', 'Ribs'];

export const CustomerDashboard = () => {
  const { currentUser, dishes, chefs, addToCart } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [filterDiet, setFilterDiet] = useState([]); // 'Vegetarian', 'Vegan', etc.

  // Filter Dishes
  const filteredDishes = dishes.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(search.toLowerCase()) || 
                          dish.description.toLowerCase().includes(search.toLowerCase()) ||
                          dish.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || dish.category === category;
    
    const matchesDiet = filterDiet.length === 0 || 
                        filterDiet.every(diet => dish.dietary.includes(diet));

    return matchesSearch && matchesCategory && matchesDiet;
  });

  const handleDietToggle = (diet) => {
    setFilterDiet(prev => 
      prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]
    );
  };

  const trendingDishes = dishes.filter(d => d.isPopular);
  const openChefs = chefs.filter(c => c.kitchenOpen);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 text-left">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-poppins text-white tracking-tight">
              What are we eating today, <span className="text-gradient-pink">{currentUser?.name || 'Foodie'}?</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">Browse menus, custom orders, and fresh dishes from local kitchens.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-xl border border-white/5 self-start md:self-auto">
            <MapPin size={16} className="text-neon-pink" />
            <span>Delivering to: <span className="text-white font-semibold">{currentUser?.address?.split(',')[0]}</span></span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative flex items-center">
            <Search className="absolute left-4 text-gray-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recipes, ingredients, categories, chefs..."
              className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-11 text-white placeholder-gray-500 focus:outline-none focus:border-neon-pink focus:ring-2 focus:ring-neon-pink/20 transition-all duration-300"
            />
          </div>
          
          <div className="flex gap-2">
            {['Vegetarian', 'Vegan', 'Gluten-Free'].map((diet) => {
              const active = filterDiet.includes(diet);
              return (
                <button
                  key={diet}
                  onClick={() => handleDietToggle(diet)}
                  className={`flex-1 py-3 px-2 rounded-xl text-xs font-bold cursor-pointer border transition-all ${active ? 'bg-neon-pink/20 border-neon-pink text-white' : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'}`}
                >
                  {diet}
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider pl-1">Categories</h3>
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer border flex-shrink-0 transition-all ${active ? 'bg-gradient-to-r from-neon-pink to-secondary-purple border-transparent text-white shadow-lg' : 'bg-black/30 border-white/10 text-gray-400 hover:text-white hover:border-white/20'}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Recipes Grid */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles size={20} className="text-neon-pink animate-pulse" />
              Available Chef Menu Items
            </h2>

            {filteredDishes.length === 0 ? (
              <GlassCard className="py-16 px-6 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500 mb-3">
                  <Search size={22} />
                </div>
                <p className="text-gray-400 font-medium">No recipes match your criteria</p>
                <p className="text-xs text-gray-500 mt-1">Try resetting search fields or selected categories.</p>
              </GlassCard>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredDishes.map((dish) => (
                  <GlassCard key={dish.id} className="p-0 overflow-hidden flex flex-col justify-between group rounded-2xl">
                    <div className="relative h-48 bg-white/5">
                      <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                        {dish.dietary.map((diet) => (
                          <span key={diet} className="bg-neon-green/90 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            {diet}
                          </span>
                        ))}
                      </div>
                      <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white font-bold text-xs px-2.5 py-0.5 rounded-lg">
                        {dish.prepTime}
                      </span>
                    </div>

                    <div className="p-5 flex-grow flex flex-col justify-between text-left">
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-xs text-primary-purple font-semibold">by {dish.chefName}</span>
                          <div className="flex items-center gap-0.5 text-amber-400">
                            <Star size={12} fill="currentColor" />
                            <span className="text-xs font-bold">{dish.rating}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-neon-pink transition-all truncate">{dish.name}</h3>
                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mt-1 mb-4">{dish.description}</p>
                      </div>

                      <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto">
                        <span className="text-xl font-black text-white">${dish.price}</span>
                        <GradientButton 
                          variant="pink" 
                          onClick={() => addToCart(dish)}
                          className="py-1.5 px-3 rounded-lg text-xs font-bold"
                        >
                          <Plus size={14} /> Add to Cart
                        </GradientButton>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}
          </div>

          {/* Right Columns: Active Kitchens & Promo Widgets */}
          <div className="flex flex-col gap-8 text-left">
            {/* Active Kitchens */}
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                <MapPin size={20} className="text-primary-purple" />
                Active Local Kitchens
              </h2>

              {openChefs.length === 0 ? (
                <GlassCard className="py-8 text-center text-gray-500 text-sm">
                  All chef kitchens are currently closed.
                </GlassCard>
              ) : (
                <div className="flex flex-col gap-4">
                  {openChefs.map((chef) => (
                    <GlassCard key={chef.id} glowColor="purple" className="p-4 flex gap-3 items-center" hoverEffect={true}>
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                        <img src={chef.avatar} alt={chef.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow text-left overflow-hidden">
                        <h4 className="text-sm font-semibold text-white truncate">{chef.name}</h4>
                        <p className="text-xs text-primary-purple truncate">{chef.cuisine}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star size={10} fill="#fbbf24" className="text-amber-400" />
                          <span className="text-[10px] font-semibold text-amber-400">{chef.rating}</span>
                          <span className="text-[10px] text-gray-500">({chef.reviewsCount} reviews)</span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-gray-500" />
                    </GlassCard>
                  ))}
                </div>
              )}
            </div>

            {/* Trending Banner widget */}
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                <Sparkles size={20} className="text-neon-blue" />
                Trending Highlights
              </h2>
              <GlassCard glowColor="blue" className="p-6 relative overflow-hidden bg-gradient-to-tr from-neon-blue/10 to-primary-purple/10">
                <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-neon-blue/20 blur-[30px]" />
                <h4 className="text-lg font-bold text-white leading-tight">Weekend <br />Specialties!</h4>
                <p className="text-xs text-gray-400 leading-relaxed mt-2">
                  Order from Evelyn's Fine Dining Italian menu to earn 2x Loyalty Points!
                </p>
                <GradientButton variant="outline" className="py-1.5 px-3 text-[10px] font-bold mt-4">
                  View Menu Spotlight
                </GradientButton>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
