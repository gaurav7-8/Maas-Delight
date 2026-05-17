import React from 'react';
import { motion } from 'framer-motion';

export const GradientButton = ({
  children,
  className = '',
  variant = 'purple', // 'purple', 'pink', 'blue', 'green', 'gold', 'outline'
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) => {
  const gradientStyles = {
    purple: 'bg-gradient-to-r from-primary-purple to-secondary-purple text-white shadow-[0_0_15px_rgba(108,43,217,0.3)] hover:shadow-[0_0_25px_rgba(108,43,217,0.6)]',
    pink: 'bg-gradient-to-r from-neon-pink to-secondary-purple text-white shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]',
    blue: 'bg-gradient-to-r from-neon-blue to-primary-purple text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]',
    green: 'bg-gradient-to-r from-neon-green to-teal-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]',
    gold: 'bg-gradient-to-r from-amber-400 to-orange-600 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)]',
    outline: 'border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40'
  };

  const baseStyle = `px-6 py-3 rounded-xl font-semibold tracking-wide transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${gradientStyles[variant] || gradientStyles.purple} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyle}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default GradientButton;
