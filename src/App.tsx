/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { Navbar } from './components/Navbar';
import { HomeOverview } from './components/HomeOverview';
import { GameOneProducersConsumers } from './components/games/GameOneProducersConsumers';
import { GameTwoPredatorPrey } from './components/games/GameTwoPredatorPrey';
import { GameThreeChainCrafter } from './components/games/GameThreeChainCrafter';
import { GameFourEcoBalance } from './components/games/GameFourEcoBalance';
import { CurriculumObjectivesView } from './components/CurriculumObjectivesView';
import { PassportModal } from './components/PassportModal';

function MainApp() {
  const [activeTab, setActiveTab] = useState<
    'home' | 'game1' | 'game2' | 'game3' | 'game4' | 'curriculum'
  >('home');
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const { totalStars } = useProgress();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* 3-Zone Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPassport={() => setIsPassportOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'home' && (
          <HomeOverview
            onSelectGame={(gameId) => setActiveTab(gameId)}
            onOpenPassport={() => setIsPassportOpen(true)}
          />
        )}

        {activeTab === 'game1' && (
          <GameOneProducersConsumers onCompleteGame={() => setActiveTab('game2')} />
        )}

        {activeTab === 'game2' && (
          <GameTwoPredatorPrey onCompleteGame={() => setActiveTab('game3')} />
        )}

        {activeTab === 'game3' && (
          <GameThreeChainCrafter onCompleteGame={() => setActiveTab('game4')} />
        )}

        {activeTab === 'game4' && (
          <GameFourEcoBalance onCompleteGame={() => setIsPassportOpen(true)} />
        )}

        {activeTab === 'curriculum' && (
          <CurriculumObjectivesView onNavigateToGame={(gameId) => setActiveTab(gameId)} />
        )}
      </main>

      {/* Explorer Passport & Certificate Modal */}
      <PassportModal isOpen={isPassportOpen} onClose={() => setIsPassportOpen(false)} />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Food Chain Quest</span>
            <span aria-hidden="true">·</span>
            <span>Primary Science Curriculum Mastery Suite</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('curriculum')}
              className="hover:text-slate-800 transition-colors"
            >
              Curriculum Objectives (1–7)
            </button>
            <button
              onClick={() => setIsPassportOpen(true)}
              className="hover:text-slate-800 transition-colors font-medium text-emerald-800"
            >
              Student Passport ({totalStars}/12 Stars)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <MainApp />
    </ProgressProvider>
  );
}
