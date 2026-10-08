import React from 'react';
import { ArrowRight, Sparkles, BookOpen, CheckCircle2, Award, Play } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { LEARNING_OBJECTIVES } from '../data/curriculumData';

import ecoProducersImg from '../assets/images/eco_producers_consumers_1791353923473.jpg';
import ecoPredatorPreyImg from '../assets/images/eco_predator_prey_1791353936456.jpg';
import ecoFoodChainImg from '../assets/images/eco_food_chain_builder_1791353947454.jpg';
import ecoBalanceImg from '../assets/images/eco_balance_ripple_1791353961096.jpg';

interface HomeOverviewProps {
  onSelectGame: (gameId: 'game1' | 'game2' | 'game3' | 'game4' | 'curriculum') => void;
  onOpenPassport: () => void;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({ onSelectGame, onOpenPassport }) => {
  const { progress, totalStars } = useProgress();

  const gameCards = [
    {
      id: 'game1' as const,
      title: 'Game 1: Energy Quest',
      subtitle: 'Producers vs Consumers',
      objectivesCovered: 'Objectives 1, 2 & 3',
      description: 'Explore the Solar Kitchen of photosynthesis! Learn how producers make their own food and why consumers must eat other organisms.',
      image: ecoProducersImg,
      fallbackImage: '/images/eco_producers_consumers_1791353923473.jpg',
      badge: 'Solar Chef',
      stars: progress.game1.stars,
      color: 'emerald',
    },
    {
      id: 'game2' as const,
      title: 'Game 2: Wildlife Detective',
      subtitle: 'Predator vs Prey',
      objectivesCovered: 'Objective 4 (and 1)',
      description: 'Investigate savannah, pond, ocean, and forest cases! Spot hunters, prey, and discover creatures that play both vital roles.',
      image: ecoPredatorPreyImg,
      fallbackImage: '/images/eco_predator_prey_1791353936456.jpg',
      badge: 'Savannah Sleuth',
      stars: progress.game2.stars,
      color: 'rose',
    },
    {
      id: 'game3' as const,
      title: 'Game 3: Chain Crafter',
      subtitle: 'Build the Food Chain',
      objectivesCovered: 'Objectives 5 & 6',
      description: 'Master the Arrow of Energy! Construct real food chains across 4 biomes and solve the broken link mystery.',
      image: ecoFoodChainImg,
      fallbackImage: '/images/eco_food_chain_builder_1791353947454.jpg',
      badge: 'Master Crafter',
      stars: progress.game3.stars,
      color: 'sky',
    },
    {
      id: 'game4' as const,
      title: 'Game 4: Eco-Balance',
      subtitle: 'The Ripple Effect',
      objectivesCovered: 'Objective 7',
      description: 'Simulate environmental shocks! See how droughts and predator shifts cause chain reactions through the whole ecosystem.',
      image: ecoBalanceImg,
      fallbackImage: '/images/eco_balance_ripple_1791353961096.jpg',
      badge: 'Eco Guardian',
      stars: progress.game4.stars,
      color: 'amber',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Hero Mission Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-950 text-white p-8 sm:p-12 shadow-md">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-emerald-300 text-xs font-bold border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Primary Science Lab</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Food Chain Quest: <br />
            <span className="text-emerald-400">Mastery Games for Young Ecologists</span>
          </h1>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl">
            Welcome, <strong className="text-white">{progress.studentName}</strong>! Embark on 4 interactive scientific adventures.
            Discover how living things obtain energy, construct vibrant food chains, and uncover how producers and consumers depend on one another.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onSelectGame('game1')}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md flex items-center gap-2 active:scale-95"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Start Quest (Game 1)</span>
            </button>

            <button
              onClick={onOpenPassport}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl transition-all border border-white/20 flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Science Passport ({totalStars}/12 Stars)</span>
            </button>

            <button
              onClick={() => onSelectGame('curriculum')}
              className="px-5 py-3 text-slate-300 hover:text-white font-bold text-sm transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>View 7 Curriculum Objectives</span>
            </button>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 4 Mastery Games Grid */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              4 Science Mastery Missions
            </h2>
            <p className="text-sm text-slate-600">
              Complete each game to earn stars, collect badges, and unlock your official Science Certificate!
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Total Mastery: <strong className="text-emerald-700">{totalStars}</strong> of 12 Stars
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gameCards.map((game) => (
            <div
              key={game.id}
              className="group bg-white border border-slate-200 hover:border-emerald-300 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              {/* Game Banner Image with fallback */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={game.image}
                  alt={game.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== game.fallbackImage && !target.src.endsWith(game.fallbackImage)) {
                      target.src = game.fallbackImage;
                    } else {
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.classList.add('bg-emerald-800');
                      }
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex flex-col justify-end p-4 text-white">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md">
                      {game.objectivesCovered}
                    </span>
                    <div className="flex items-center gap-1 bg-amber-500/90 text-amber-950 px-2 py-0.5 rounded-md font-extrabold text-xs">
                      <span>★</span>
                      <span>{game.stars} / 3 Stars</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mt-1 text-white leading-snug">
                    {game.title}
                  </h3>
                </div>
              </div>

              {/* Game Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                    {game.subtitle}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {game.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>Badge: {game.badge}</span>
                  </div>

                  <button
                    onClick={() => onSelectGame(game.id)}
                    className="px-4 py-2 bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Play Mission</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curriculum Objectives Quick Reference */}
      <div className="bg-slate-100/70 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Primary Science Learning Objectives
            </h3>
            <p className="text-xs text-slate-600">
              This interactive suite addresses all 7 core primary objectives on living organisms and ecosystems:
            </p>
          </div>
          <button
            onClick={() => onSelectGame('curriculum')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
          >
            <span>Read Complete Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {LEARNING_OBJECTIVES.map((obj) => (
            <div
              key={obj.id}
              onClick={() => onSelectGame(obj.gameId)}
              className="bg-white border border-slate-200/90 hover:border-emerald-400 p-3.5 rounded-xl cursor-pointer transition-all shadow-xs flex items-start gap-3"
            >
              <span className="text-2xl shrink-0">{obj.icon}</span>
              <div>
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {obj.id}. {obj.title}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                  {obj.childSummary}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
