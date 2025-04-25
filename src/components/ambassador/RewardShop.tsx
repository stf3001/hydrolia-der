import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Filter, X } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';

interface Reward {
  id: string;
  name: string;
  description: string;
  points_cost: number;
  image_url: string;
  category: string;
  stock: number;
}

interface RewardsShopProps {
  rewards: Reward[];
  userPoints?: number;
  onClaimReward: (rewardId: string) => void;
}

const RewardsShop = ({ rewards, userPoints, onClaimReward }: RewardsShopProps) => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPoints, setSelectedPoints] = useState('all');

  // Catégories de points
  const pointsRanges = [
    { label: 'Tous', value: 'all' },
    { label: '100-300 points', value: '100-300' },
    { label: '300-600 points', value: '300-600' },
    { label: '600-1000 points', value: '600-1000' }
  ];

  // Filtrer les récompenses par catégorie et points
  const filteredRewards = rewards.filter(reward => {
    const matchesCategory = selectedCategory === 'all' || reward.category === selectedCategory;
    const matchesPoints = selectedPoints === 'all' || (
      selectedPoints === '100-300' && reward.points_cost >= 100 && reward.points_cost <= 300 ||
      selectedPoints === '300-600' && reward.points_cost > 300 && reward.points_cost <= 600 ||
      selectedPoints === '600-1000' && reward.points_cost > 600 && reward.points_cost <= 1000
    );
    return matchesCategory && matchesPoints;
  });

  return (
    <section className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-[#1A3E6B]">Boutique Cadeaux</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-lg px-3 py-1 text-sm"
            >
              <option value="all">Toutes les catégories</option>
              <option value="gadgets">Gadgets</option>
              <option value="experiences">Expériences</option>
              <option value="reductions">Réductions</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={selectedPoints}
              onChange={(e) => setSelectedPoints(e.target.value)}
              className="border rounded-lg px-3 py-1 text-sm"
            >
              {pointsRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map((reward) => (
          <motion.div
            key={reward.id}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-50 rounded-lg p-6 relative"
          >
            <div className="absolute top-2 right-2 bg-[#6BA292] text-white px-2 py-1 rounded text-sm">
              {reward.points_cost} points
            </div>
            <div className="text-center mb-4">
              <Gift className="w-12 h-12 text-[#1A3E6B] mx-auto mb-2" />
              <h3 className="font-semibold text-lg text-gray-800">{reward.name}</h3>
              <p className="text-gray-600 mt-2">{reward.description}</p>
            </div>
            {user && (
              <button
                onClick={() => onClaimReward(reward.id)}
                disabled={!user || (userPoints !== undefined && userPoints < reward.points_cost)}
                className={`w-full py-2 rounded-lg ${
                  userPoints !== undefined && userPoints >= reward.points_cost
                    ? 'bg-[#1A3E6B] text-white hover:bg-opacity-90'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {userPoints !== undefined && userPoints >= reward.points_cost
                  ? 'Échanger'
                  : 'Points insuffisants'}
              </button>
            )}
            {!user && (
              <button
                onClick={() => window.location.href = '/login'}
                className="w-full py-2 rounded-lg bg-[#1A3E6B] text-white hover:bg-opacity-90"
              >
                Se connecter pour échanger
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RewardsShop;