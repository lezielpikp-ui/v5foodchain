import React, { useState } from 'react';
import { X, Award, Sparkles, Printer, RotateCcw, CheckCircle2, User } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

interface PassportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PassportModal: React.FC<PassportModalProps> = ({ isOpen, onClose }) => {
  const { progress, updateStudentName, resetProgress, totalStars, totalBadges } = useProgress();
  const [nameInput, setNameInput] = useState(progress.studentName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  if (!isOpen) return null;

  const handleSaveName = () => {
    updateStudentName(nameInput);
    setIsEditingName(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const badges = [
    {
      id: 'b1',
      title: 'Solar Chef',
      desc: 'Mastered Producers & Photosynthesis',
      unlocked: progress.game1.completed,
      emoji: '🌱',
      stars: progress.game1.stars,
    },
    {
      id: 'b2',
      title: 'Savannah Sleuth',
      desc: 'Cracked Predator & Prey Investigations',
      unlocked: progress.game2.completed,
      emoji: '🦅',
      stars: progress.game2.stars,
    },
    {
      id: 'b3',
      title: 'Master Chain Crafter',
      desc: 'Built Accurate Multi-Biome Food Chains',
      unlocked: progress.game3.completed,
      emoji: '🔗',
      stars: progress.game3.stars,
    },
    {
      id: 'b4',
      title: 'Eco Guardian',
      desc: 'Understands Ripple Effects & Balance',
      unlocked: progress.game4.completed,
      emoji: '⚖️',
      stars: progress.game4.stars,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!showCertificate ? (
          <div className="space-y-6">
            {/* Passport Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl shadow-xs">
                🌟
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Young Ecologist Passport
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span>Student Progress Tracker</span>
                  <span>·</span>
                  <span className="text-emerald-700 font-semibold">{totalStars}/12 Stars Earned</span>
                </div>
              </div>
            </div>

            {/* Student Name Card */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    Explorer Name
                  </div>
                  {isEditingName ? (
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="px-2.5 py-1 text-sm font-bold border border-emerald-400 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                        maxLength={24}
                      />
                      <button
                        onClick={handleSaveName}
                        className="px-3 py-1 bg-emerald-700 text-white font-bold text-xs rounded-lg"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="text-base font-bold text-slate-900">
                      {progress.studentName}
                    </div>
                  )}
                </div>
              </div>

              {!isEditingName && (
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                >
                  Change Name
                </button>
              )}
            </div>

            {/* Badges Earned Grid */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Mission Badges ({totalBadges} / 4 Unlocked)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`border rounded-2xl p-4 flex items-center gap-3 transition-all ${
                      badge.unlocked
                        ? 'border-emerald-300 bg-emerald-50/50 shadow-xs'
                        : 'border-slate-200 bg-slate-50/40 opacity-70'
                    }`}
                  >
                    <span className="text-3xl filter drop-shadow-xs">{badge.emoji}</span>
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {badge.title}
                        </span>
                        {badge.unlocked && (
                          <span className="text-amber-500 text-xs font-extrabold">
                            {'★'.repeat(badge.stars)}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset your score and replay all games?')) {
                    resetProgress();
                  }
                }}
                className="text-xs text-slate-500 hover:text-rose-600 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Explorer Progress</span>
              </button>

              <button
                onClick={() => setShowCertificate(true)}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center gap-2 ml-auto"
              >
                <Sparkles className="w-4 h-4" />
                <span>View Science Certificate</span>
              </button>
            </div>
          </div>
        ) : (
          /* Official Printable Certificate View */
          <div className="space-y-6">
            <div className="p-8 border-4 border-double border-emerald-700 rounded-3xl bg-amber-50/30 text-center space-y-4">
              <div className="text-xs font-extrabold uppercase tracking-widest text-emerald-800">
                Official Primary Science Achievement Certificate
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                Master of Food Chains & Ecosystem Energy
              </h3>
              <p className="text-xs text-slate-600">This certifies that young scientist</p>
              <div className="text-2xl sm:text-3xl font-black text-emerald-800 underline decoration-amber-400 decoration-4 underline-offset-8 py-1">
                {progress.studentName}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto leading-relaxed pt-2">
                has successfully investigated how organisms obtain energy, constructed multi-biome food chains, differentiated predators and prey, and proved the delicate balance of ecosystem interdependence.
              </p>
              <div className="flex items-center justify-center gap-6 pt-4 text-xs font-bold text-slate-700">
                <div>
                  <span className="block text-emerald-700 text-base">{totalStars} / 12</span>
                  <span>Mastery Stars</span>
                </div>
                <div className="w-px h-8 bg-slate-300" />
                <div>
                  <span className="block text-emerald-700 text-base">{totalBadges} / 4</span>
                  <span>Badges Earned</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setShowCertificate(false)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                ← Back to Passport
              </button>
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
