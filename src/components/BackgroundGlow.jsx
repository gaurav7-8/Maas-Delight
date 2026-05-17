import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundGlow = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated glowing orbs */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -60, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[10%] left-[20%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-primary-purple/10 blur-[80px] md:blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-[20%] right-[10%] w-[250px] md:w-[450px] h-[250px] md:h-[450px] rounded-full bg-neon-blue/10 blur-[80px] md:blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          y: [0, 30, 30, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
        className="absolute top-[60%] left-[5%] w-[200px] md:w-[350px] h-[200px] md:h-[350px] rounded-full bg-neon-pink/8 blur-[80px] md:blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, -30, 20, 0],
          y: [0, -20, -40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-[-10%] right-[25%] w-[180px] md:w-[300px] h-[180px] md:h-[300px] rounded-full bg-neon-green/8 blur-[70px] md:blur-[95px]"
      />
    </div>
  );
};
export default BackgroundGlow;
