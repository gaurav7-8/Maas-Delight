import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import { 
  TrendingUp, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  ChevronRight, 
  Star,
  Users,
  Award,
  Utensils
} from 'lucide-react';

export const LandingPage = () => {
  const { dishes, chefs } = useApp();
  const popularDishes = dishes.slice(0, 3);
  const topChefs = chefs.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[#030014] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 px-6 md:px-12 max-w-7xl mx-auto w-full text-center overflow-hidden flex flex-col items-center">
        {/* Ambient background lights */}
        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-primary-purple/20 blur-[120px] pointer-events-none" />
        
        {/* Floating food icons simulation */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[10%] text-5xl opacity-30 select-none hidden md:block"
        >
          🍜
        </motion.div>
        <motion.div 
          animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] left-[15%] text-5xl opacity-30 select-none hidden md:block"
        >
          🥑
        </motion.div>
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[25%] right-[10%] text-5xl opacity-30 select-none hidden md:block"
        >
          🍕
        </motion.div>
        <motion.div 
          animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-[25%] right-[15%] text-5xl opacity-30 select-none hidden md:block"
        >
          🍰
        </motion.div>

        {/* Hero Headings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/10 mb-6 shadow-lg animate-bounce">
            <span className="w-2 h-2 rounded-full bg-neon-green" />
            <span className="text-xs font-semibold text-gray-300 tracking-wider uppercase">Direct peer-to-peer cooking app</span>
          </div>

          <h1 className="font-poppins font-black text-4xl sm:text-6xl md:text-7xl leading-tight tracking-tight text-white mb-6">
            Homemade Food <br />
            <span className="text-gradient-rainbow">Delivered With Love</span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed font-light">
            Skip the mass-produced restaurant chains. Order delicious, customized, fresh meals directly from expert local home chefs and passionate cooks in your neighborhood.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center px-4 max-w-md">
            <Link to="/customer-register" className="w-full sm:w-auto">
              <GradientButton variant="pink" className="w-full py-4 px-8 text-base">
                Order Fresh Food <ChevronRight size={18} />
              </GradientButton>
            </Link>
            <Link to="/chef-register" className="w-full sm:w-auto">
              <GradientButton variant="outline" className="w-full py-4 px-8 text-base">
                Become a Chef <Utensils size={18} />
              </GradientButton>
            </Link>
          </div>
        </motion.div>

        {/* Floating cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 relative z-10 w-full max-w-5xl"
        >
          {[
            { value: '50+', label: 'Local Home Chefs', color: 'purple' },
            { value: '1.2k+', label: 'Happy Foodies', color: 'pink' },
            { value: '4.9★', label: 'Average Rating', color: 'gold' },
            { value: '<30m', label: 'Fast Pickups', color: 'blue' }
          ].map((stat, i) => (
            <GlassCard 
              key={i} 
              glowColor={stat.color} 
              className="py-6 px-4 flex flex-col items-center justify-center text-center"
              hoverEffect={false}
            >
              <h3 className={`text-3xl font-black mb-1 ${stat.color === 'purple' ? 'text-primary-purple' : stat.color === 'pink' ? 'text-neon-pink' : stat.color === 'gold' ? 'text-amber-400' : 'text-neon-blue'}`}>
                {stat.value}
              </h3>
              <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">{stat.label}</p>
            </GlassCard>
          ))}
        </motion.div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-black/20 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold font-poppins mb-4">How it Works</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Ordering high-quality homemade meals is as simple as clicking a button.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Choose Your Chef', desc: 'Browse curated menus from certified kitchen hosts in your neighborhood with real ratings.', emoji: '👨‍🍳' },
              { step: '02', title: 'Order & Customize', desc: 'Instantly request items and specify dietary labels (vegan, gluten-free, low-sodium).', emoji: '🛒' },
              { step: '03', title: 'Fresh Delivery', desc: 'Pickup or get your hot, homemade meal delivered directly to your doorstep in minutes.', emoji: '🛵' }
            ].map((item, idx) => (
              <GlassCard key={idx} glowColor="purple" className="text-left flex flex-col gap-4 relative">
                <span className="absolute top-4 right-6 text-6xl opacity-10 font-black">{item.step}</span>
                <span className="text-4xl">{item.emoji}</span>
                <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div className="text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold font-poppins mb-3">Trending Dishes</h2>
            <p className="text-gray-400 max-w-lg">Most loved delicacies crafted by our household masterchefs today.</p>
          </div>
          <Link to="/dishes">
            <GradientButton variant="outline">Explore All Dishes <ChevronRight size={16} /></GradientButton>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularDishes.map((dish) => (
            <GlassCard key={dish.id} className="overflow-hidden flex flex-col p-0 text-left rounded-2xl group">
              {/* Dish Image */}
              <div className="h-56 overflow-hidden relative bg-white/5">
                <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {dish.dietary.map((diet, i) => (
                  <span 
                    key={i} 
                    className="absolute top-4 left-4 bg-neon-green/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg"
                  >
                    {diet}
                  </span>
                ))}
                <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white font-bold text-sm px-3 py-1 rounded-xl">
                  {dish.prepTime}
                </span>
              </div>

              {/* Dish Details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-primary-purple font-semibold tracking-wider uppercase">by {dish.chefName}</span>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-bold">{dish.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-neon-pink transition-colors mb-2 truncate">{dish.name}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed mb-4">{dish.description}</p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-2xl font-black text-white">${dish.price}</span>
                  <Link to="/login">
                    <GradientButton variant="purple" className="py-2.5 px-4 text-sm font-semibold rounded-xl">
                      Order Now
                    </GradientButton>
                  </Link>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Top Chefs */}
      <section className="py-20 bg-black/20 border-t border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold font-poppins mb-4">Top Rated Kitchens</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Meet the culinary wizards making fresh culinary dreams come alive.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topChefs.map((chef) => (
              <GlassCard key={chef.id} glowColor="pink" className="text-center p-8 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary-purple shadow-xl mb-4 bg-white/10">
                  <img src={chef.avatar} alt={chef.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-white">{chef.name}</h3>
                <p className="text-xs text-primary-purple font-semibold uppercase tracking-wider mt-1">{chef.cuisine}</p>
                <div className="flex items-center gap-1.5 text-amber-400 justify-center my-3">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm font-bold">{chef.rating}</span>
                  <span className="text-xs text-gray-400">({chef.reviewsCount} reviews)</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 italic">
                  "{chef.kitchenName} is active and delivering authentic culinary masterpieces."
                </p>
                <Link to="/customer-register" className="mt-6 w-full">
                  <GradientButton variant="outline" className="w-full py-2.5 text-sm">
                    View Menu
                  </GradientButton>
                </Link>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 w-full text-center">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold font-poppins mb-4">Loved by Students & Households</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Read real experiences from people ordering fresh food daily.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { name: 'Kunal Sharma', role: 'Engineering Student', quote: 'Being miles away from home, I terribly missed my mother\'s food. ChefHub literally saved me. Order arrives fresh, steaming hot, and tastes incredibly authentic.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
            { name: 'Dr. Sarah Patel', role: 'Busy Resident Doctor', quote: 'Between night shifts, fast food was taking a toll on my health. Finding customized keto salads and grain bowls from local home chefs has completely transformed my lifestyle!', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' }
          ].map((item, idx) => (
            <GlassCard key={idx} className="text-left p-8 flex flex-col md:flex-row gap-6 items-start">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-white/10">
                <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm text-gray-300 italic mb-4 leading-relaxed">"{item.quote}"</p>
                <h4 className="text-base font-bold text-white">{item.name}</h4>
                <p className="text-xs text-primary-purple">{item.role}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
