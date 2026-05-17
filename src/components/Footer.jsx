import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Heart } from 'lucide-react';
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="w-full bg-black/40 border-t border-white/5 py-12 px-6 md:px-12 mt-auto z-10 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand */}
        <div className="flex flex-col gap-4 text-left">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-primary-purple to-neon-pink flex items-center justify-center">
              <ChefHat className="text-white" size={18} />
            </div>
            <span className="font-poppins font-black text-xl tracking-wider text-white">
              CHEF<span className="text-primary-purple">HUB</span>
            </span>
          </Link>
          <p className="text-sm text-gray-400">
            A futuristic peer-to-peer kitchen dashboard connecting talented home cooks with foodies, students, and professionals nearby.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
              <FaTwitter size={16} />
            </a>
            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
              <FaInstagram size={16} />
            </a>
            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
              <FaGithub size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3 text-left">
          <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-1">Explore</h4>
          <Link to="/dishes" className="text-sm text-gray-400 hover:text-white transition-all">Trending Dishes</Link>
          <Link to="/customer-register" className="text-sm text-gray-400 hover:text-white transition-all">Become a Foodie</Link>
          <Link to="/chef-register" className="text-sm text-gray-400 hover:text-white transition-all">Start Your Kitchen</Link>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-3 text-left">
          <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-1">Categories</h4>
          <span className="text-sm text-gray-400 hover:text-white transition-all cursor-pointer">Japanese Fusion</span>
          <span className="text-sm text-gray-400 hover:text-white transition-all cursor-pointer">Fine Italian</span>
          <span className="text-sm text-gray-400 hover:text-white transition-all cursor-pointer">Vegan Alchemy</span>
          <span className="text-sm text-gray-400 hover:text-white transition-all cursor-pointer">Spicy Streetfood</span>
        </div>

        {/* Trust & Safety */}
        <div className="flex flex-col gap-3 text-left">
          <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-1">Trust & Support</h4>
          <span className="text-sm text-gray-400 hover:text-white transition-all cursor-pointer">Kitchen Regulations</span>
          <span className="text-sm text-gray-400 hover:text-white transition-all cursor-pointer">Safe Delivery</span>
          <span className="text-sm text-gray-400 hover:text-white transition-all cursor-pointer">Contact Support</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} ChefHub. All rights reserved.
        </p>
        <p className="text-xs text-gray-500 flex items-center gap-1">
          Made with <Heart size={12} className="text-neon-pink" /> for premium home cooking experiences.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
