import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({ 
  children, 
  className = '', 
  glowColor = '', // 'purple', 'blue', 'pink', 'green'
  hoverEffect = true,
  delay = 0,
  ...props 
}) => {
  let glowClass = '';
  if (glowColor === 'purple') glowClass = 'glass-glow-purple';
  else if (glowColor === 'blue') glowClass = 'glass-glow-blue';
  else if (glowColor === 'pink') glowClass = 'glass-glow-pink';
  else if (glowColor === 'green') glowClass = 'glass-glow-green';

  const baseClasses = `glass rounded-2xl p-6 ${glowClass} ${hoverEffect ? 'glass-hover' : ''} ${className}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={baseClasses}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
