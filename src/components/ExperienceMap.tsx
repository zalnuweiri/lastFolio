import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import worldMap from 'figma:asset/8ce9257dc5ef6d1eb0afdf070d7fb37ae059eb31.png';

interface Location {
  name: string;
  x: number;
  y: number;
  color: string;
}

export function ExperienceMap() {
  const [dots, setDots] = useState<Array<{ x: number; y: number }>>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [theme, setTheme] = useState('dark');

  const locations: Location[] = [
    { name: '42.3601° N, 71.0589° W', x: 28, y: 25, color: '#ef4444' },
    { name: '42.3370° N, 71.2092° W', x: 27, y: 26, color: '#22c55e' },
    { name: '37.7749° N, 122.4194° W', x: 15, y: 28, color: '#22c55e' },
    { name: '31.2304° N, 121.4737° E', x: 75, y: 30, color: '#22c55e' },
  ];

  useEffect(() => {
    // Generate dot grid for world map
    const generatedDots = [];
    const rows = 40;
    const cols = 100;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Create landmass patterns (simplified continents)
        const isLand = 
          // North America
          (row >= 10 && row <= 25 && col >= 10 && col <= 30) ||
          // South America
          (row >= 25 && row <= 35 && col >= 18 && col <= 28) ||
          // Europe
          (row >= 10 && row <= 22 && col >= 32 && col <= 45) ||
          // Africa
          (row >= 18 && row <= 35 && col >= 35 && col <= 50) ||
          // Asia
          (row >= 8 && row <= 30 && col >= 50 && col <= 80) ||
          // Australia
          (row >= 28 && row <= 36 && col >= 75 && col <= 85);

        if (isLand && Math.random() > 0.5) {
          generatedDots.push({
            x: (col / cols) * 100,
            y: (row / rows) * 100,
          });
        }
      }
    }
    
    setDots(generatedDots);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <>
      <style>{`
        /* Pin positioning for all breakpoints */
        /* XL breakpoint (1280px+) - Desktop - CORRECT POSITIONS */
        @media (min-width: 1280px) {
          .pin-vancouver { left: calc(19% + 11px); top: 45%; }
          .pin-lebanon { left: 54%; top: 53%; }
          .pin-third { left: calc(58.75% - 3.5px); top: calc(56.5% + 3px); }
          .pin-fourth { left: calc(30% + 7px); top: calc(50.5% - 2px); }
          .pin-fifth { left: calc(28% + 6px); top: 43.5%; }
          .pin-sixth { left: calc(34% + 4px); top: 47.5%; }
        }
        
        /* 2XL breakpoint (1536px+) - Ultra-wide - ADJUSTED POSITIONS */
        @media (min-width: 1536px) {
          .pin-vancouver { left: calc(19% + 11px + 3%); top: 45%; }
          .pin-lebanon { left: 54%; top: calc(53% + 1%); }
          .pin-third { left: calc(58.75% - 3.5px - 2%); top: calc(56.5% + 3px); }
          .pin-fourth { left: calc(30% + 7px + 2%); top: calc(50.5% - 2px); }
          .pin-fifth { left: calc(28% + 6px + 2%); top: 43.5%; }
          .pin-sixth { left: calc(34% + 4px + 3%); top: 47.5%; }
        }
        
        /* LG breakpoint (1024px - 1279px) - Testing */
        @media (min-width: 1024px) and (max-width: 1279px) {
          .pin-vancouver { left: calc(19% + 11px - 10%); top: 45%; }
          .pin-lebanon { left: 56%; top: 55%; }
          .pin-third { left: calc(60.75% - 3.5px); top: calc(56.2% + 3px); }
          .pin-fourth { left: calc(30% + 7px - 5.5%); top: calc(50.5% - 2px); }
          .pin-fifth { left: calc(28% + 6px - 7%); top: 44%; }
          .pin-sixth { left: calc(34% + 4px - 4.5%); top: 47.5%; }
        }
        
        /* Mobile and other breakpoints - to be adjusted */
        @media (max-width: 1023px) {
          .pin-vancouver { left: calc(19% + 11px - 11%); top: 45%; }
          .pin-lebanon { left: 54.5%; top: 53.5%; }
          .pin-third { left: calc(60.75% - 3.5px); top: calc(56.5% + 3px); }
          .pin-fourth { left: calc(30% + 7px - 5%); top: calc(50.5% - 2px); }
          .pin-fifth { left: calc(28% + 6px - 8%); top: 43.5%; }
          .pin-sixth { left: calc(34% + 4px - 2%); top: 47.5%; }
        }
      `}</style>
      <motion.div
        ref={cardRef}
        className={`rounded-3xl p-4 border bg-[#111111] border-gray-800/50 h-full relative group cursor-pointer overflow-hidden`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
        }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-48 bg-gradient-to-r from-green-500/10 via-cyan-500/10 to-purple-500/10 rounded-full filter blur-3xl" />
        </div>

        {/* Header */}
        <div className="text-[10px] text-gray-600 mb-2 relative z-10">06 MY EXPERIENCE</div>

        {/* Map container */}
        <div className="relative h-[calc(100%-2rem)]">
          {/* World map image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={worldMap} 
              alt="World Map" 
              className="w-full h-full object-contain opacity-60"
            />
          </div>

          {/* Vancouver location marker */}
          <motion.div
            className="absolute pin-vancouver"
            style={{
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
          >
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-cyan-500/30"
              style={{ width: '16px', height: '16px' }}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Main dot */}
            <div className="relative rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/50" style={{ width: '8px', height: '8px' }} />
          </motion.div>

          {/* Lebanon location marker */}
          <motion.div
            className="absolute pin-lebanon"
            style={{
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5, type: 'spring' }}
          >
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-red-500/30"
              style={{ width: '16px', height: '16px' }}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Main dot */}
            <div className="relative rounded-full bg-red-400 shadow-lg shadow-red-500/50" style={{ width: '8px', height: '8px' }} />
          </motion.div>

          {/* Third location marker */}
          <motion.div
            className="absolute pin-third"
            style={{
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5, type: 'spring' }}
          >
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-green-500/30"
              style={{ width: '16px', height: '16px' }}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Main dot */}
            <div className="relative rounded-full bg-green-400 shadow-lg shadow-green-500/50" style={{ width: '8px', height: '8px' }} />
          </motion.div>

          {/* Fourth location marker */}
          <motion.div
            className="absolute pin-fourth"
            style={{
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5, type: 'spring' }}
          >
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-purple-500/30"
              style={{ width: '16px', height: '16px' }}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Main dot */}
            <div className="relative rounded-full bg-purple-400 shadow-lg shadow-purple-500/50" style={{ width: '8px', height: '8px' }} />
          </motion.div>

          {/* Fifth location marker */}
          <motion.div
            className="absolute pin-fifth"
            style={{
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5, type: 'spring' }}
          >
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-500/30"
              style={{ width: '16px', height: '16px' }}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Main dot */}
            <div className="relative rounded-full bg-blue-400 shadow-lg shadow-blue-500/50" style={{ width: '8px', height: '8px' }} />
          </motion.div>

          {/* Sixth location marker */}
          <motion.div
            className="absolute pin-sixth"
            style={{
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5, type: 'spring' }}
          >
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-orange-500/30"
              style={{ width: '16px', height: '16px' }}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Main dot */}
            <div className="relative rounded-full bg-orange-400 shadow-lg shadow-orange-500/50" style={{ width: '8px', height: '8px' }} />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}