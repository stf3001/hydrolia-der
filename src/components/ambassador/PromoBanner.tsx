import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PromoBannerProps {
  onParrainageClick: () => void;
}

const PromoBanner = ({ onParrainageClick }: PromoBannerProps) => {
  const [timeLeft, setTimeLeft] = useState('');
  const promoEndDate = new Date('2024-09-30T23:59:59');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const difference = promoEndDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        setTimeLeft('Offre expirée');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft(`${days}j ${hours}h ${minutes}m`);
    };

    const timer = setInterval(updateTimer, 60000); // Update every minute
    updateTimer(); // Initial update

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-[#1A3E6B] text-white p-4 shadow-lg"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="font-bold text-lg">Offre Spéciale Septembre !</h3>
          <p className="text-sm md:text-base">
            -200€ sur AWG 20L Nouvelle Gamme + 1 an de filtration offert
          </p>
          <p className="text-sm font-bold mt-1">
            Temps restant : {timeLeft}
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onParrainageClick}
          className="bg-[#6BA292] px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all font-semibold tracking-wide"
        >
          Parrainer maintenant
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PromoBanner;