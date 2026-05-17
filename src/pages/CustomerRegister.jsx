import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import AnimatedInput from '../components/AnimatedInput';
import BackgroundGlow from '../components/BackgroundGlow';
import { Mail, Lock, User, Phone, MapPin, ChefHat } from 'lucide-react';

const DIETARY_OPTIONS = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Nut-Free'];

export const CustomerRegister = () => {
  const { registerCustomer } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    dietary: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDietaryToggle = (item) => {
    setFormData(prev => {
      const dietary = prev.dietary.includes(item)
        ? prev.dietary.filter(d => d !== item)
        : [...prev.dietary, item];
      return { ...prev, dietary };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = registerCustomer(formData);
    if (success) {
      navigate('/customer-dashboard');
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

        <GlassCard glowColor="pink" hoverEffect={false} className="p-8 md:p-10">
          <h2 className="text-3xl font-black font-poppins text-center mb-2">Create Customer Account</h2>
          <p className="text-gray-400 text-sm text-center mb-8">Join ChefHub as a foodie to order incredible homemade meals.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatedInput
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Aria"
                icon={User}
                required
              />
              <AnimatedInput
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Sterling"
                icon={User}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatedInput
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="aria@cyber.com"
                icon={Mail}
                required
              />
              <AnimatedInput
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
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

            <AnimatedInput
              label="Delivery Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Apartment 4B, 505 Glass Towers, Skyview"
              icon={MapPin}
              required
            />

            {/* Dietary Preference Pills */}
            <div className="flex flex-col gap-2.5 text-left">
              <label className="text-sm font-medium text-gray-300 tracking-wide pl-1">
                Dietary Preferences <span className="text-gray-500 text-xs font-normal">(Optional)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {DIETARY_OPTIONS.map((item) => {
                  const isSelected = formData.dietary.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleDietaryToggle(item)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all ${isSelected ? 'bg-neon-pink/20 border-neon-pink text-white shadow-[0_0_10px_rgba(236,72,153,0.3)]' : 'bg-black/20 border-white/10 text-gray-400 hover:text-white hover:border-white/20'}`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            <GradientButton
              type="submit"
              variant="pink"
              className="w-full py-3.5 mt-4 text-base font-bold"
            >
              Create My Account
            </GradientButton>
          </form>

          {/* Footnotes */}
          <div className="flex flex-col gap-3 mt-6 text-center border-t border-white/5 pt-6">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-neon-pink hover:underline font-semibold">
                Sign In
              </Link>
            </p>
            <p className="text-sm text-gray-400">
              Want to sell your own food?{' '}
              <Link to="/chef-register" className="text-primary-purple hover:underline font-semibold">
                Join as Chef
              </Link>
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default CustomerRegister;
