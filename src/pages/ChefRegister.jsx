import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import AnimatedInput from '../components/AnimatedInput';
import BackgroundGlow from '../components/BackgroundGlow';
import { Mail, Lock, User, Phone, MapPin, ChefHat, Award, Sparkles } from 'lucide-react';

export const ChefRegister = () => {
  const { registerChef } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    cuisine: '',
    experience: '',
    dishImage: '',
    kitchenAddress: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = registerChef(formData);
    if (success) {
      navigate('/chef-dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#030014] text-white p-6 overflow-hidden">
      <BackgroundGlow />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(3,0,20,0.8),rgba(3,0,20,0.95))]" />

      <div className="w-full max-w-xl relative z-10 my-10">
        <Link to="/" className="flex items-center justify-center gap-2 group mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-purple to-neon-pink flex items-center justify-center shadow-lg">
            <ChefHat className="text-white" size={20} />
          </div>
          <span className="font-poppins font-black text-2xl tracking-wider text-white">
            CHEF<span className="text-primary-purple">HUB</span>
          </span>
        </Link>

        <GlassCard glowColor="purple" hoverEffect={false} className="p-8 md:p-10">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-primary-purple/10 flex items-center justify-center text-primary-purple border border-primary-purple/20 mb-3 shadow-[0_0_15px_rgba(108,43,217,0.2)]">
              <ChefHat size={24} />
            </div>
            <h2 className="text-3xl font-black font-poppins text-center mb-1">Join as culinary Partner</h2>
            <p className="text-gray-400 text-sm text-center">Unleash your culinary art. Reach hungry foodies around your home.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <AnimatedInput
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Chef Marcus Kenji"
              icon={User}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatedInput
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="marcus@chefhub.com"
                icon={Mail}
                required
              />
              <AnimatedInput
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 876-5432"
                icon={Phone}
                required
              />
            </div>

            <AnimatedInput
              label="Secure Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              icon={Lock}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatedInput
                label="Cuisine Speciality"
                name="cuisine"
                value={formData.cuisine}
                onChange={handleChange}
                placeholder="Japanese / Fusion"
                icon={Sparkles}
                required
              />
              <AnimatedInput
                label="Professional Experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="10+ Years"
                icon={Award}
                required
              />
            </div>

            <AnimatedInput
              label="Featured Dish Image URL (Optional)"
              name="dishImage"
              value={formData.dishImage}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/photo-..."
              icon={Sparkles}
            />

            <AnimatedInput
              label="Kitchen / Home Address"
              name="kitchenAddress"
              value={formData.kitchenAddress}
              onChange={handleChange}
              placeholder="88 Cyberpunk Blvd, Sector 7"
              icon={MapPin}
              required
            />

            <GradientButton
              type="submit"
              variant="purple"
              className="w-full py-3.5 mt-4 text-base font-bold shadow-[0_0_20px_rgba(108,43,217,0.3)]"
            >
              Initialize My Kitchen Portal
            </GradientButton>
          </form>

          {/* Footnotes */}
          <div className="flex flex-col gap-3 mt-6 text-center border-t border-white/5 pt-6">
            <p className="text-sm text-gray-400">
              Already a registered Chef?{' '}
              <Link to="/login" className="text-primary-purple hover:underline font-semibold">
                Sign In
              </Link>
            </p>
            <p className="text-sm text-gray-400">
              Just want to order food?{' '}
              <Link to="/customer-register" className="text-neon-pink hover:underline font-semibold">
                Join as Customer
              </Link>
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default ChefRegister;
