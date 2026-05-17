import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import DashboardLayout from '../layouts/DashboardLayout';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import AnimatedInput from '../components/AnimatedInput';
import { User, Phone, MapPin, Sparkles, ChefHat, Award } from 'lucide-react';

export const ProfileSettings = () => {
  const { currentUser, updateProfile } = useApp();

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    cuisine: currentUser?.cuisine || '',
    experience: currentUser?.experience || '',
    kitchenName: currentUser?.kitchenName || ''
  });

  const isChef = currentUser?.role === 'chef';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 text-left w-full">
        {/* Header */}
        <div className="border-b border-white/5 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Profile Settings</h1>
          <p className="text-gray-400 text-sm mt-1">Manage credentials, public culinary profiles, and delivery variables.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main settings form */}
          <div className="lg:col-span-2">
            <GlassCard glowColor={isChef ? 'purple' : 'pink'} hoverEffect={false} className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-6">Security & Profile Ledger</h3>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <AnimatedInput
                  label="Display Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  icon={User}
                  required
                />

                <AnimatedInput
                  label="Contact Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  icon={Phone}
                  required
                />

                <AnimatedInput
                  label={isChef ? "Kitchen HQ / Dispatch Address" : "Primary Delivery Address"}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  icon={MapPin}
                  required
                />

                {isChef && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <AnimatedInput
                        label="Cuisine expertise"
                        name="cuisine"
                        value={formData.cuisine}
                        onChange={handleChange}
                        icon={Sparkles}
                        required
                      />
                      <AnimatedInput
                        label="Professional Experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        icon={Award}
                        required
                      />
                    </div>

                    <AnimatedInput
                      label="Kitchen Brand Name"
                      name="kitchenName"
                      value={formData.kitchenName}
                      onChange={handleChange}
                      icon={ChefHat}
                      required
                    />
                  </>
                )}

                <GradientButton
                  type="submit"
                  variant={isChef ? 'purple' : 'pink'}
                  className="py-3 px-8 self-start font-bold text-sm mt-4 shadow-lg"
                >
                  Save Changes
                </GradientButton>
              </form>
            </GlassCard>
          </div>

          {/* Sidebar panel */}
          <div className="flex flex-col gap-6">
            <GlassCard glowColor="purple" className="p-6 text-center flex flex-col items-center" hoverEffect={false}>
              <div className="w-24 h-24 rounded-full overflow-hidden bg-primary-purple flex items-center justify-center font-bold text-white text-3xl mb-4 shadow-lg">
                {currentUser?.avatar ? (
                  <img src={currentUser.avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  currentUser?.name.charAt(0)
                )}
              </div>
              <h4 className="text-lg font-bold text-white">{currentUser?.name}</h4>
              <span className="text-xs text-primary-purple font-semibold uppercase tracking-wider capitalize mt-1">
                {currentUser?.role} Member
              </span>

              <div className="w-full border-t border-white/5 pt-4 mt-6 text-left flex flex-col gap-3 text-xs text-gray-400">
                <div>
                  <span className="font-semibold text-white block">Email Sign in</span>
                  <span>{currentUser?.email}</span>
                </div>
                <div>
                  <span className="font-semibold text-white block">Role parameters</span>
                  <span className="capitalize">{currentUser?.role} Account Node</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfileSettings;
