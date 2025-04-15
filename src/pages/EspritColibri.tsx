import React from 'react';

const LespritColibri = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center mb-8">"L'Esprit Colibri – Chaque Goutte Compte"</h1>

      {/* L'histoire qui nous inspire */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">L'histoire qui nous inspire</h2>
        <p className="text-lg text-gray-700 mb-6">
          Un jour, une forêt était en feu. Tous les animaux fuyaient, impuissants face aux flammes. Tous… sauf un petit colibri. Lui, faisait des allers-retours incessants entre un lac voisin et l'incendie, transportant dans son minuscule bec quelques gouttes d'eau qu'il jetait sur les flammes.
        </p>
        <blockquote className="text-xl italic text-gray-600 mb-4">
          « Mais pourquoi fais-tu cela ? » lui demanda l'éléphant. « Tu ne pourras jamais éteindre ce feu avec tes quelques gouttes ! »
        </blockquote>
        <p className="text-lg text-gray-700 mb-6">
          Le colibri répondit simplement :
        </p>
        <blockquote className="text-xl italic text-gray-600 mb-4">
          « Je sais, mais je fais ma part. »
        </blockquote>
        <p className="text-lg text-gray-700">
          Chez <strong>Hydrolia</strong>, cette histoire résonne profondément. Nous croyons qu'<strong>à son échelle, chacun peut agir</strong> pour protéger les ressources essentielles, comme l'eau.
        </p>
        <p className="text-lg text-gray-700">
          Produire son eau potable directement à partir de l'air, sans puiser dans les réserves collectives, sans transporter de bouteilles plastiques à travers la planète, c'est <strong>déjà une action concrète</strong>, une goutte qui compte.
        </p>
      </section>

      {/* Rejoindre la communauté des petits colibris */}
      <section className="bg-green-50 p-6 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Rejoindre la communauté des petits colibris</h2>
        <p className="text-lg text-gray-700 mb-6">
          En choisissant Hydrolia, vous ne devenez pas seulement un utilisateur : vous rejoignez une <strong>communauté engagée</strong>, celle des <strong>petits colibris</strong>, qui chacun à leur niveau, avec leurs moyens, <strong>contribuent à un modèle plus autonome, plus solidaire et plus respectueux de l'eau et de la nature</strong>.
        </p>
        <p className="text-lg text-gray-700">
          Chaque litre produit chez vous, c'est :
        </p>
        <ul className="list-disc pl-6 text-lg text-gray-700 mb-6">
          <li>Une goutte de moins prélevée sur le réseau collectif.</li>
          <li>Une bouteille plastique en moins.</li>
          <li>Une étape de plus vers votre autonomie hydrique.</li>
          <li>Un geste pour la santé de votre famille, sans microplastiques ni polluants invisibles.</li>
        </ul>
      </section>

      {/* Programme Litres Solidaires */}
      <section className="bg-blue-50 p-6 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Programme "Litres Solidaires"</h2>
        <p className="text-lg text-gray-700 mb-6">
          Chez <strong>Hydrolia</strong>, nous croyons que l'accès à une eau potable saine et durable ne devrait être un luxe pour personne. Si nos générateurs permettent à chacun de produire son eau directement chez lui, <strong>nous n'oublions pas celles et ceux pour qui l'eau reste une urgence quotidienne</strong>.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          🧮 Pour chaque litre produit, <strong>Hydrolia reverse 1 centime</strong> à un <strong>fonds solidaire</strong> dédié aux projets humanitaires liés à l'eau.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Ce fonds servira à financer :
        </p>
        <ul className="list-disc pl-6 text-lg text-gray-700 mb-6">
          <li>Des <strong>dons de générateurs d'eau atmosphérique</strong> à destination de <strong>zones rurales isolées</strong>, de <strong>centres de soins</strong>, ou d'<strong>écoles dans des régions frappées par la sécheresse ou des pollutions de l'eau</strong>.</li>
          <li>Le <strong>déploiement d'unités mobiles Hydrolia</strong> en cas de <strong>catastrophe naturelle</strong>, pour apporter rapidement de l'eau potable aux populations touchées.</li>
          <li>Des <strong>partenariats avec des ONG locales</strong> pour co-construire des solutions durables d'accès à l'eau.</li>
          <li>Des <strong>actions de sensibilisation</strong> sur la préservation de l'eau et l'autonomie hydrique.</li>
        </ul>
      </section>

      {/* Compteur transparent */}
      <section className="bg-green-50 p-6 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Un compteur transparent et évolutif</h2>
        <p className="text-lg text-gray-700 mb-6">
          Sur cette page, vous pourrez bientôt suivre en temps réel le nombre de <strong>litres solidaires</strong> collectés par la communauté Hydrolia. Chaque goutte produite chez vous alimente <strong>ce compteur commun</strong>, symbole de notre solidarité hydrique.
        </p>
        <div className="bg-white p-4 border border-gray-300 rounded-lg text-center mb-6">
          <p className="text-lg text-gray-700 mb-4">💧 Compteur de litres solidaires</p>
          <p className="text-3xl font-bold text-green-600">0 000 000 litres solidaires</p>
          <p className="text-sm text-gray-500">(Compteur fictif à activer au lancement officiel)</p>
        </div>
      </section>

      {/* Pour les ONG et associations */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Vous êtes une ONG, une collectivité ou une association ?</h2>
        <p className="text-lg text-gray-700 mb-6">
          Hydrolia est à l'écoute des besoins de terrain. Si vous intervenez dans des zones en tension hydrique ou si vous souhaitez imaginer <strong>des projets conjoints autour de l'autonomie hydrique</strong>, <strong>contactez-nous</strong>. Ensemble, nous pouvons transformer chaque goutte en un véritable levier de solidarité.
        </p>
      </section>

      {/* Nos engagements solidaires */}
      <section className="bg-yellow-50 p-6 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl font-semibold text-yellow-600 mb-4">Nos engagements solidaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Engagement local</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Partenariats avec des écoles pour sensibiliser à la préservation de l'eau</li>
              <li>Support aux initiatives locales d'économie d'eau</li>
              <li>Formation gratuite à l'utilisation optimale des AWG</li>
              <li>Programme de recyclage des composants en fin de vie</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Engagement international</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Participation à des projets humanitaires d'accès à l'eau</li>
              <li>Soutien aux communautés touchées par les catastrophes naturelles</li>
              <li>Développement de solutions adaptées aux zones arides</li>
              <li>Collaboration avec des ONG environnementales</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Témoignages de nos partenaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <blockquote className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 italic mb-4">
              "Grâce au programme Litres Solidaires d'Hydrolia, nous avons pu installer trois générateurs d'eau dans des écoles du Sahel. C'est une révolution pour ces communautés."
            </p>
            <footer className="text-gray-600">
              - Marie Dubois, ONG Eau Pour Tous
            </footer>
          </blockquote>
          <blockquote className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 italic mb-4">
              "La réactivité d'Hydrolia lors des inondations de 2023 a été remarquable. Leur unité mobile nous a permis de fournir de l'eau potable à plus de 500 personnes pendant la crise."
            </p>
            <footer className="text-gray-600">
              - Jean Martin, Protection Civile
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Rejoignez le mouvement</h2>
        <p className="text-lg mb-6">
          Ensemble, transformons chaque goutte d'eau en source d'espoir et de changement.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200">
          Devenir partenaire
        </button>
      </section>
    </div>
  );
};

export default LespritColibri;