import React from 'react';
import { Volume2, VolumeX, Sparkles, Award, BookOpen, Mic, MicOff } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

interface NavbarProps {
  activeTab: 'home' | 'game1' | 'game2' | 'game3' | 'game4' | 'curriculum';
  setActiveTab: (tab: 'home' | 'game1' | 'game2' | 'game3' | 'game4' | 'curriculum') => void;
  onOpenPassport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenPassport }) => {
  const { progress, toggleSound, toggleVoice, totalStars } = useProgress();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg"
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-lg shadow-sm">
            🌱
          </span>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 block leading-tight">
              Food Chain Quest
            </span>
            <span className="text-[11px] font-medium text-emerald-700 hidden sm:block">
              Primary Science Lab
            </span>
          </div>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'home'
                ? 'bg-emerald-50 text-emerald-800 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('game1')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'game1'
                ? 'bg-emerald-50 text-emerald-800 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            1. Energy Quest
          </button>
          <button
            onClick={() => setActiveTab('game2')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'game2'
                ? 'bg-emerald-50 text-emerald-800 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            2. Predator vs Prey
          </button>
          <button
            onClick={() => setActiveTab('game3')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'game3'
                ? 'bg-emerald-50 text-emerald-800 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            3. Chain Crafter
          </button>
          <button
            onClick={() => setActiveTab('game4')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'game4'
                ? 'bg-emerald-50 text-emerald-800 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            4. Eco-Balance
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'curriculum'
                ? 'bg-emerald-50 text-emerald-800 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Objectives
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          {/* Audio Controls */}
          <button
            onClick={toggleVoice}
            title={progress.voiceEnabled ? 'Narration Voice: ON' : 'Narration Voice: OFF'}
            className={`p-2 rounded-lg border transition-colors ${
              progress.voiceEnabled
                ? 'border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                : 'border-slate-200 text-slate-400 bg-white hover:bg-slate-50'
            }`}
            aria-label="Toggle text to speech narration"
          >
            {progress.voiceEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleSound}
            title={progress.soundEnabled ? 'Sound Effects: ON' : 'Sound Effects: OFF'}
            className={`p-2 rounded-lg border transition-colors ${
              progress.soundEnabled
                ? 'border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                : 'border-slate-200 text-slate-400 bg-white hover:bg-slate-50'
            }`}
            aria-label="Toggle sound effects"
          >
            {progress.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Star counter & Passport Button */}
          <button
            onClick={onOpenPassport}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-amber-950 bg-amber-100 border border-amber-300/80 rounded-lg hover:bg-amber-200 transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span className="tabular-nums">{totalStars}/12</span>
            <span className="hidden sm:inline text-amber-800">Stars</span>
            <Award className="w-3.5 h-3.5 text-amber-700" />
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 bg-slate-50 px-2 py-1.5 text-xs font-medium text-slate-600 overflow-x-auto">
        <button
          onClick={() => setActiveTab('home')}
          className={`px-2 py-1 rounded whitespace-nowrap ${
            activeTab === 'home' ? 'bg-emerald-600 text-white' : 'hover:text-slate-900'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab('game1')}
          className={`px-2 py-1 rounded whitespace-nowrap ${
            activeTab === 'game1' ? 'bg-emerald-600 text-white' : 'hover:text-slate-900'
          }`}
        >
          G1: Producers
        </button>
        <button
          onClick={() => setActiveTab('game2')}
          className={`px-2 py-1 rounded whitespace-nowrap ${
            activeTab === 'game2' ? 'bg-emerald-600 text-white' : 'hover:text-slate-900'
          }`}
        >
          G2: Predator
        </button>
        <button
          onClick={() => setActiveTab('game3')}
          className={`px-2 py-1 rounded whitespace-nowrap ${
            activeTab === 'game3' ? 'bg-emerald-600 text-white' : 'hover:text-slate-900'
          }`}
        >
          G3: Chains
        </button>
        <button
          onClick={() => setActiveTab('game4')}
          className={`px-2 py-1 rounded whitespace-nowrap ${
            activeTab === 'game4' ? 'bg-emerald-600 text-white' : 'hover:text-slate-900'
          }`}
        >
          G4: Balance
        </button>
        <button
          onClick={() => setActiveTab('curriculum')}
          className={`px-2 py-1 rounded whitespace-nowrap ${
            activeTab === 'curriculum' ? 'bg-emerald-600 text-white' : 'hover:text-slate-900'
          }`}
        >
          Goals
        </button>
      </div>
    </header>
  );
};
