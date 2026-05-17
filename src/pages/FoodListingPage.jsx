import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import DashboardLayout from '../layouts/DashboardLayout';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import AnimatedInput from '../components/AnimatedInput';
import { Plus, Trash2, Star, Clock, Filter, AlertCircle, ShoppingBag } from 'lucide-react';

export const FoodListingPage = () => {
  const { currentUser, dishes, addDish, removeDish, addToCart } = useApp();
  
  // States
  const [modalOpen, setModalOpen] = useState(false);
  const [newDish, setNewDish] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    prepTime: '20',
    availableCount: '10',
    image: '',
    dietary: []
  });

  const isChef = currentUser?.role === 'chef';

  // Filter Dishes
  const displayDishes = isChef 
    ? dishes.filter(d => d.chefId === currentUser?.id)
    : dishes;

  const handleDietaryToggle = (item) => {
    setNewDish(prev => {
      const dietary = prev.dietary.includes(item)
        ? prev.dietary.filter(d => d !== item)
        : [...prev.dietary, item];
      return { ...prev, dietary };
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    addDish(newDish);
    setModalOpen(false);
    setNewDish({
      name: '',
      description: '',
      price: '',
      category: '',
      prepTime: '20',
      availableCount: '10',
      image: '',
      dietary: []
    });
  };

  const PageContent = () => (
    <div className="flex flex-col gap-8 text-left w-full">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">
            {isChef ? 'My Culinary Menu' : 'Explore Recipes'}
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {isChef ? 'Add, edit, or delete items offered in your digital kitchen.' : 'Browse our high-fidelity, peer-to-peer healthy dishes.'}
          </p>
        </div>
        {isChef && (
          <GradientButton 
            variant="purple" 
            onClick={() => setModalOpen(true)}
            className="py-2.5 px-5 text-sm font-semibold rounded-xl"
          >
            <Plus size={16} /> List New Dish
          </GradientButton>
        )}
      </div>

      {/* Grid */}
      {displayDishes.length === 0 ? (
        <GlassCard className="py-16 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500 mb-3">
            <AlertCircle size={22} />
          </div>
          <p className="text-gray-400">No dishes listed yet</p>
          <p className="text-xs text-gray-500 mt-1">
            {isChef ? 'Click the button in the top right to register your first recipe!' : 'Check back later for active menu items.'}
          </p>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayDishes.map((dish) => (
            <GlassCard key={dish.id} className="p-0 overflow-hidden flex flex-col justify-between group rounded-2xl">
              <div className="relative h-52 bg-white/5">
                <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {dish.dietary.map(diet => (
                    <span key={diet} className="bg-neon-green/90 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-lg">
                      {diet}
                    </span>
                  ))}
                </div>
                <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white font-bold text-xs px-2.5 py-0.5 rounded-lg">
                  {dish.prepTime}
                </span>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-primary-purple font-semibold">
                      {isChef ? `Category: ${dish.category}` : `by ${dish.chefName}`}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-bold">{dish.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-neon-pink transition-all truncate">{dish.name}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mt-1 mb-4">{dish.description}</p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                  <span className="text-2xl font-black text-white">${dish.price}</span>
                  {isChef ? (
                    <button 
                      onClick={() => removeDish(dish.id)}
                      className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
                      title="Delete dish"
                    >
                      <Trash2 size={16} />
                    </button>
                  ) : (
                    <GradientButton 
                      variant="pink" 
                      onClick={() => addToCart(dish)}
                      className="py-2 px-4 rounded-xl text-xs font-semibold"
                    >
                      Add to Cart
                    </GradientButton>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Pop-up modal for listing a new recipe */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg glass border border-white/10 rounded-2xl p-6 md:p-8 relative">
            <h3 className="text-2xl font-black font-poppins text-white mb-2">List New Menu Item</h3>
            <p className="text-sm text-gray-400 mb-6">List a new dish and customize pricing, dietary parameters, and tags.</p>

            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <AnimatedInput
                label="Recipe Name"
                value={newDish.name}
                onChange={e => setNewDish(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Spicy Neon Tacos"
                required
              />

              <div className="flex flex-col gap-1 text-left">
                <label className="text-sm font-medium text-gray-300 pl-1">Description</label>
                <textarea
                  value={newDish.description}
                  onChange={e => setNewDish(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Tell customers about key ingredients, flavor profiles, and allergen notes..."
                  rows="3"
                  className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary-purple focus:ring-2 focus:ring-primary-purple/20 transition-all duration-300"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <AnimatedInput
                  label="Price ($)"
                  type="number"
                  step="0.01"
                  value={newDish.price}
                  onChange={e => setNewDish(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="14.99"
                  required
                />
                <AnimatedInput
                  label="Category"
                  value={newDish.category}
                  onChange={e => setNewDish(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Pasta, Desserts..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <AnimatedInput
                  label="Prep Time (mins)"
                  type="number"
                  value={newDish.prepTime}
                  onChange={e => setNewDish(prev => ({ ...prev, prepTime: e.target.value }))}
                  placeholder="20"
                />
                <AnimatedInput
                  label="Daily Stock Capacity"
                  type="number"
                  value={newDish.availableCount}
                  onChange={e => setNewDish(prev => ({ ...prev, availableCount: e.target.value }))}
                  placeholder="15"
                />
              </div>

              <AnimatedInput
                label="Featured Image URL"
                value={newDish.image}
                onChange={e => setNewDish(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://images.unsplash.com/photo-..."
              />

              {/* Dietary Tags select */}
              <div className="flex flex-col gap-2 text-left">
                <label className="text-sm font-medium text-gray-300 pl-1">Dietary Filters</label>
                <div className="flex flex-wrap gap-2">
                  {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'].map(diet => {
                    const active = newDish.dietary.includes(diet);
                    return (
                      <button
                        key={diet}
                        type="button"
                        onClick={() => handleDietaryToggle(diet)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer border transition-all ${active ? 'bg-primary-purple/20 border-primary-purple text-white shadow-lg' : 'bg-black/20 border-white/10 text-gray-400 hover:text-white'}`}
                      >
                        {diet}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <GradientButton type="submit" variant="purple" className="flex-1 py-3 font-semibold text-sm">
                  Add Item
                </GradientButton>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all font-semibold text-sm cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {currentUser ? (
        <DashboardLayout>
          <PageContent />
        </DashboardLayout>
      ) : (
        <div className="min-h-screen flex flex-col bg-[#030014] text-white">
          <Navbar />
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-16 flex-grow flex">
            <PageContent />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default FoodListingPage;
