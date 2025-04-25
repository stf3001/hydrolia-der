import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';

interface ReferralSectionProps {
  totalPoints?: number;
  activeReferrals?: number;
  referralCode?: string;
}

const ReferralSection = ({ totalPoints, activeReferrals, referralCode }: ReferralSectionProps) => {
  const { user } = useAuth();

  const copyReferralCode = () => {
    if (!user) return;
    navigator.clipboard.writeText(referralCode || '');
    alert('Code copié dans le presse-papier !');
  };

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-[#1A3E6B] mb-6">Programme Ambassadeur</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gray-50 rounded-lg p-6 text-center"
        >
          <Users className="w-8 h-8 text-[#6BA292] mx-auto mb-2" />
          <h3 className="font-semibold text-gray-700 mb-2">Parrainage</h3>
          <p className="text-gray-600">
            {user ? `${activeReferrals || 0} parrainages actifs` : 'Parrainez vos contacts'}
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gray-50 rounded-lg p-6 text-center"
        >
          <Award className="w-8 h-8 text-[#6BA292] mx-auto mb-2" />
          <h3 className="font-semibold text-gray-700 mb-2">Points</h3>
          <p className="text-gray-600">
            {user ? `${totalPoints || 0} points accumulés` : 'Gagnez des points'}
          </p>
        </motion.div>

        {user && referralCode && (
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gray-50 rounded-lg p-6 text-center"
          >
            <LinkIcon className="w-8 h-8 text-[#6BA292] mx-auto mb-2" />
            <h3 className="font-semibold text-gray-700 mb-2">Code Parrain</h3>
            <div className="flex items-center justify-center space-x-2">
              <code className="bg-white px-3 py-1 rounded-md text-[#1A3E6B] font-mono">
                {referralCode}
              </code>
              <button 
                onClick={copyReferralCode}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <LinkIcon className="w-4 h-4 text-[#6BA292]" />
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-[#1A3E6B] mb-2">Comment ça marche ?</h4>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Partagez votre code unique avec vos contacts</li>
          <li>Gagnez 100 points pour chaque parrainage réussi</li>
          <li>Débloquez le statut Ambassadeur à partir de 500 points</li>
          <li>Échangez vos points contre des récompenses exclusives</li>
        </ul>
      </div>
    </section>
  );
};

export default ReferralSection;