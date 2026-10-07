import React from 'react';
import { Volume2, Play, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { LEARNING_OBJECTIVES } from '../data/curriculumData';
import { soundManager } from '../utils/audio';

interface CurriculumObjectivesViewProps {
  onNavigateToGame: (gameId: 'game1' | 'game2' | 'game3' | 'game4') => void;
}

export const CurriculumObjectivesView: React.FC<CurriculumObjectivesViewProps> = ({
  onNavigateToGame,
}) => {
  const handleReadObjective = (title: string, statement: string, childSummary: string) => {
    soundManager.speak(`${title}. Curriculum statement: ${statement}. Explanation: ${childSummary}`);
  };

  const vocabularyList = [
    {
      term: 'Producer (Make Food)',
      def: 'Green plants and algae that make their own food through photosynthesis using sunlight, water, and carbon dioxide.',
      emoji: '🌱',
    },
    {
      term: 'Consumer (Eat Food)',
      def: 'Animals that cannot make their own food, so they must eat other plants or animals to get energy.',
      emoji: '🐾',
    },
    {
      term: 'Photosynthesis',
      def: 'The chemical process where green plants turn solar light energy into glucose sugars (chemical food energy).',
      emoji: '☀️',
    },
    {
      term: 'Predator (Hunter)',
      def: 'An animal that hunts and eats other animals for food (e.g., Lion, Hawk, Shark).',
      emoji: '🦅',
    },
    {
      term: 'Prey (Hunted)',
      def: 'An animal that is hunted and eaten by a predator (e.g., Zebra, Mouse, Herring).',
      emoji: '🐁',
    },
    {
      term: 'Food Chain & Arrow (→)',
      def: 'A diagram showing feeding relationships. The arrow points in the direction that ENERGY FLOWS ("is eaten by")!',
      emoji: '➡️',
    },
    {
      term: 'Interdependence (Ripple Effect)',
      def: 'All organisms in an ecosystem depend on each other. If producers drop, consumers drop too!',
      emoji: '⚖️',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Curriculum Mastery Guide</span>
          <span>·</span>
          <span>Primary Science Standards</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          7 Primary Science Learning Objectives
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl">
          Everything primary students need to understand how organisms obtain energy, how food chains work, and why living things depend on each other.
        </p>
      </div>

      {/* The 7 Objectives Deep Dive */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Curriculum Standards & Practice Games
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {LEARNING_OBJECTIVES.map((obj) => (
            <div
              key={obj.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4 flex-1">
                <span className="text-4xl p-2 bg-slate-50 border border-slate-100 rounded-xl shrink-0">
                  {obj.icon}
                </span>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Objective {obj.id}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {obj.title}
                    </h3>
                  </div>

                  <p className="text-xs font-semibold text-slate-700 italic">
                    "{obj.curriculumStatement}"
                  </p>

                  <p className="text-sm text-slate-600 pt-1">
                    {obj.childSummary}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <button
                  onClick={() => handleReadObjective(obj.title, obj.curriculumStatement, obj.childSummary)}
                  className="p-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-medium transition-colors"
                  title="Read aloud"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigateToGame(obj.gameId)}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Practice in Game</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scientific Vocabulary Glossary */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Young Scientist's Glossary
        </h2>
        <p className="text-xs text-slate-600">
          Important scientific terms primary students should know for classroom quizzes:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {vocabularyList.map((item) => (
            <div
              key={item.term}
              className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-start gap-3"
            >
              <span className="text-2xl shrink-0">{item.emoji}</span>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  {item.term}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {item.def}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
