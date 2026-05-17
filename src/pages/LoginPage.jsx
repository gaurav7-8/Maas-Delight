import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import AnimatedInput from '../components/AnimatedInput';
import BackgroundGlow from '../components/BackgroundGlow';
import { Mail, Lock, User, ChefHat } from 'lucide-react';

export const LoginPage = () => {
  const { loginUser, currentUser } = useApp();
  const [role, setRole] = useState('customer'); // 'customer' or 'chef'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  React.useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'chef') navigate('/chef-dashboard');
      else navigate('/customer-dashboard');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Tiny delay for futuristic feel
    setTimeout(() => {
      const success = loginUser(email, password, role);
      setLoading(false);
      if (success) {
        if (role === 'chef') {
          navigate('/chef-dashboard');
        } else {
          navigate('/customer-dashboard');
        }
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#030014] text-white p-6 overflow-hidden">
      <BackgroundGlow />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(3,0,20,0.8),rgba(3,0,20,0.95))]" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 group mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-purple to-neon-pink flex items-center justify-center shadow-lg">
            <ChefHat className="text-white" size={20} />
          </div>
          <span className="font-poppins font-black text-2xl tracking-wider text-white">
            CHEF<span className="text-primary-purple">HUB</span>
          </span>
        </Link>

        <GlassCard glowColor={role === 'chef' ? 'purple' : 'pink'} hoverEffect={false} className="p-8">
          <h2 className="text-3xl font-black font-poppins text-center mb-2">Welcome Back</h2>
          <p className="text-gray-400 text-sm text-center mb-6">Enter your details to log into your kitchen space.</p>

          {/* Role Tabs */}
          <div className="flex bg-black/40 p-1.5 rounded-xl border border-white/5 mb-8">
            <button
              onClick={() => setRole('customer')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold tracking-wide cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 ${role === 'customer' ? 'bg-gradient-to-r from-neon-pink to-secondary-purple text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <User size={16} /> Customer Portal
            </button>
            <button
              onClick={() => setRole('chef')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold tracking-wide cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 ${role === 'chef' ? 'bg-gradient-to-r from-primary-purple to-secondary-purple text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <ChefHat size={16} /> Chef Portal
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <AnimatedInput
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="aria@cyber.com"
              icon={Mail}
              required
            />

            <AnimatedInput
              label="Secure Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={Lock}
              required
            />

            {role === 'chef' && (
              <div className="text-left bg-primary-purple/10 border border-primary-purple/20 p-3.5 rounded-xl text-xs text-gray-400 leading-relaxed">
                💡 <span className="text-white font-semibold">Demo Chef Accounts:</span> You can sign in using <code className="text-neon-pink">marcus@chefhub.com</code> or <code className="text-neon-pink">evelyn@chefhub.com</code> with any password.
              </div>
            )}

            <GradientButton
              type="submit"
              variant={role === 'chef' ? 'purple' : 'pink'}
              className="w-full py-3.5 mt-2 text-base font-bold"
              disabled={loading}
            >
              {loading ? 'Decrypting Credentials...' : 'Sign In Now'}
            </GradientButton>
          </form>

          {/* Links */}
          <div className="flex flex-col gap-3 mt-6 text-center border-t border-white/5 pt-6">
            <p className="text-sm text-gray-400">
              New to ChefHub?{' '}
              <Link 
                to={role === 'chef' ? '/chef-register' : '/customer-register'} 
                className="text-primary-purple hover:underline font-semibold"
              >
                Register as {role === 'chef' ? 'Chef' : 'Customer'}
              </Link>
            </p>
            <p className="text-xs text-gray-500">
              By logging in, you agree to our Terms of Culinary Service.
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default LoginPage;
