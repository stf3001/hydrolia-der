import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import PromoBanner from '../components/ambassador/PromoBanner';
import ReferralSection from '../components/ambassador/ReferralSection';
import RewardShop from '../components/ambassador/RewardShop';
import { Link } from 'react-router-dom';

interface UserStats {
  totalPoints: number;
  activeReferrals: number;
  referralCode: string;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  points_cost: number;
  image_url: string;
  category: string;
  stock: number;
}

const defaultRewards: Reward[] = [
  {
    id: '1',
    name: '1 an de filtration',
    description: 'Profitez d\'un an de filtration offert pour votre système Hydrolia',
    points_cost: 100,
    image_url: '/images/rewards/filtration.jpg',
    category: 'services',
    stock: 100
  },
  {
    id: '2',
    name: 'Bon d\'achat 50€',
    description: 'Bon d\'achat de 50€ à utiliser sur notre boutique en ligne',
    points_cost: 100,
    image_url: '/images/rewards/voucher.jpg',
    category: 'reductions',
    stock: 100
  }
];

const AmbassadorSpace = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [rewards, setRewards] = useState<Reward[]>(defaultRewards);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les récompenses disponibles pour tous les visiteurs
        const { data: rewardsData, error: rewardsError } = await supabase
          .from('rewards')
          .select('*')
          .gt('stock', 0)
          .order('points_cost', { ascending: true });

        if (rewardsError) throw rewardsError;

        // Si aucune récompense n'est trouvée dans la base de données, utiliser les récompenses par défaut
        setRewards(rewardsData?.length ? rewardsData : defaultRewards);

        // Si l'utilisateur est connecté, récupérer ses statistiques
        if (user) {
          const { data: referralData, error: referralError } = await supabase
            .from('referrals')
            .select('*')
            .eq('referrer_id', user.id);

          if (referralError) throw referralError;

          const totalPoints = referralData?.reduce((acc, ref) => 
            acc + (ref.status === 'converted' ? ref.points_awarded : 0), 0) || 0;

          setStats({
            totalPoints,
            activeReferrals: referralData?.filter(ref => ref.status === 'converted').length || 0,
            referralCode: referralData?.[0]?.referral_code || `REF-${user.id.slice(0, 6)}`
          });
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Une erreur est survenue lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleParrainageClick = () => {
    if (!user) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      window.location.href = '/login';
      return;
    }
    // Logique de parrainage pour les utilisateurs connectés
  };

  const handleClaimReward = async (rewardId: string) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    try {
      if (!stats) return;

      const reward = rewards.find(r => r.id === rewardId);
      if (!reward) return;

      if (stats.totalPoints < reward.points_cost) {
        alert('Points insuffisants');
        return;
      }

      // Créer la demande de récompense
      const { error } = await supabase
        .from('reward_claims')
        .insert([
          {
            user_id: user.id,
            reward_id: rewardId,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      // Mettre à jour les points de l'utilisateur
      await supabase
        .from('points_history')
        .insert([
          {
            user_id: user.id,
            points: -reward.points_cost,
            type: 'reward_claim',
            description: `Échange contre ${reward.name}`
          }
        ]);

      // Mettre à jour le state local
      setStats(prev => prev ? {
        ...prev,
        totalPoints: prev.totalPoints - reward.points_cost
      } : null);

      alert('Demande de récompense envoyée avec succès !');
    } catch (err) {
      console.error('Error claiming reward:', err);
      alert('Une erreur est survenue');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <p className="text-lg">Chargement de votre espace ambassadeur...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PromoBanner onParrainageClick={handleParrainageClick} />
      
      <div className="container mx-auto px-4 py-8">
        {!user && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-[#1A3E6B] mb-4">Devenez Ambassadeur Hydrolia</h2>
            <p className="text-gray-600 mb-4">
              Rejoignez notre programme d'ambassadeurs et profitez d'avantages exclusifs !
            </p>
            <div className="flex space-x-4">
              <Link
                to="/register"
                className="bg-[#1A3E6B] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all"
              >
                S'inscrire
              </Link>
              <Link
                to="/login"
                className="bg-[#6BA292] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all"
              >
                Se connecter
              </Link>
            </div>
          </div>
        )}

        {stats && (
          <ReferralSection
            totalPoints={stats.totalPoints}
            activeReferrals={stats.activeReferrals}
            referralCode={stats.referralCode}
          />
        )}

        <RewardShop
          rewards={rewards}
          userPoints={stats?.totalPoints || 0}
          onClaimReward={handleClaimReward}
        />
      </div>
    </div>
  );
};

export default AmbassadorSpace;
