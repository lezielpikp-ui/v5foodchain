import React, { useState } from 'react';
import { Shield, Target, HelpCircle, CheckCircle2, RotateCcw, Volume2, ArrowRight } from 'lucide-react';
import { CASES_GAME2, PredatorPreyCase } from '../../data/curriculumData';
import { useProgress } from '../../context/ProgressContext';
import { soundManager } from '../../utils/audio';

export const GameTwoPredatorPrey: React.FC<{ onCompleteGame?: () => void }> = ({ onCompleteGame }) => {
  const { recordGameResult } = useProgress();
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const activeCase: PredatorPreyCase = CASES_GAME2[currentCaseIndex];

  // User selections for current case: organismName -> 'predator' | 'prey' | 'both'
  const [userRoles, setUserRoles] = useState<Record<string, 'predator' | 'prey' | 'both'>>({});
  const [isCaseSubmitted, setIsCaseSubmitted] = useState(false);
  const [caseScores, setCaseScores] = useState<number[]>([]);
  const [gameFinished, setGameFinished] = useState(false);

  const handleSelectRole = (creatureName: string, role: 'predator' | 'prey' | 'both') => {
    soundManager.playClick();
    setUserRoles((prev) => ({
      ...prev,
      [creatureName]: role,
    }));
  };

  const handleReadText = (text: string) => {
    soundManager.speak(text);
  };

  const handleSubmitCase = () => {
    // Check answers for this case
    let correctInCase = 0;
    activeCase.creatures.forEach((c) => {
      if (userRoles[c.name] === c.role) {
        correctInCase++;
      }
    });

    const isAllCorrect = correctInCase === activeCase.creatures.length;

    if (isAllCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }

    setIsCaseSubmitted(true);
    setCaseScores((prev) => [...prev, correctInCase]);
  };

  const handleNextCase = () => {
    soundManager.playClick();
    if (currentCaseIndex < CASES_GAME2.length - 1) {
      setCurrentCaseIndex((prev) => prev + 1);
      setUserRoles({});
      setIsCaseSubmitted(false);
    } else {
      // Finished all cases! Calculate overall score
      const totalCorrect = [...caseScores].reduce((a, b) => a + b, 0);
      const totalPossible = CASES_GAME2.reduce((acc, c) => acc + c.creatures.length, 0);
      const ratio = totalCorrect / totalPossible;

      let stars = 1;
      if (ratio >= 0.85) stars = 3;
      else if (ratio >= 0.6) stars = 2;

      recordGameResult('game2', stars, Math.round(ratio * 100));
      setGameFinished(true);
      soundManager.playFanfare();
    }
  };

  const handleRestart = () => {
    setCurrentCaseIndex(0);
    setUserRoles({});
    setIsCaseSubmitted(false);
    setCaseScores([]);
    setGameFinished(false);
  };

  const allAssigned = activeCase.creatures.every((c) => userRoles[c.name]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-800 mb-1">
            <span>Primary Science Lab</span>
            <span>·</span>
            <span>Objective 4</span>
            <span>·</span>
            <span>Predator vs Prey</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Wildlife Detective: Predator or Prey?
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Investigate nature's hunters and hunted! Discover how predators get food energy, how prey defend themselves, and creatures with both roles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              handleReadText(
                `${activeCase.ecosystem}. ${activeCase.context}. What roles do these creatures play?`
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5 text-slate-600" />
            <span>Read Case</span>
          </button>
          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>
        </div>
      </div>

      {/* Case Navigator */}
      <div className="flex items-center justify-between bg-slate-100 p-2 rounded-xl text-xs font-semibold">
        <span className="text-slate-600 px-2">
          Case File {currentCaseIndex + 1} of {CASES_GAME2.length}: <span className="text-slate-900">{activeCase.ecosystem}</span>
        </span>
        <div className="flex items-center gap-1">
          {CASES_GAME2.map((c, idx) => (
            <span
              key={c.id}
              className={`w-2.5 h-2.5 rounded-full ${
                idx === currentCaseIndex
                  ? 'bg-rose-600 ring-2 ring-rose-200'
                  : idx < currentCaseIndex
                  ? 'bg-emerald-500'
                  : 'bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Detective Case Board */}
      {!gameFinished ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Case Narrative */}
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-4 sm:p-5">
            <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
              Field Observation Notes:
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
              "{activeCase.context}"
            </p>
          </div>

          {/* Quick Concept Hint */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-900">
              <span className="font-bold flex items-center gap-1 mb-0.5">
                <Target className="w-3.5 h-3.5" /> 🎯 Predator
              </span>
              <span>Hunts, catches, and eats other animals for food energy.</span>
            </div>
            <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-sky-900">
              <span className="font-bold flex items-center gap-1 mb-0.5">
                <Shield className="w-3.5 h-3.5" /> 🛡️ Prey
              </span>
              <span>Hunted and eaten by predators. Often has camouflage or speed.</span>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-purple-900">
              <span className="font-bold flex items-center gap-1 mb-0.5">
                <HelpCircle className="w-3.5 h-3.5" /> 🔄 Both Roles
              </span>
              <span>Hunts smaller creatures, but is also hunted by bigger predators!</span>
            </div>
          </div>

          {/* Creatures Role Assignment Cards */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Assign Each Animal's Role in this Ecosystem:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeCase.creatures.map((creature) => {
                const selectedRole = userRoles[creature.name];
                const isCorrect = isCaseSubmitted && selectedRole === creature.role;

                return (
                  <div
                    key={creature.name}
                    className={`border rounded-xl p-4 transition-all flex flex-col justify-between ${
                      isCaseSubmitted
                        ? isCorrect
                          ? 'border-emerald-300 bg-emerald-50/60'
                          : 'border-rose-300 bg-rose-50/60'
                        : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-4xl">{creature.emoji}</span>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{creature.name}</h4>
                          <span className="text-[11px] text-slate-500 block">
                            Trait: {creature.defenseOrHuntTrait}
                          </span>
                        </div>
                      </div>

                      {/* Role Buttons */}
                      <div className="grid grid-cols-3 gap-1.5 my-3">
                        <button
                          disabled={isCaseSubmitted}
                          onClick={() => handleSelectRole(creature.name, 'predator')}
                          className={`py-2 px-1 text-xs font-bold rounded-lg border transition-all ${
                            selectedRole === 'predator'
                              ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          Predator
                        </button>
                        <button
                          disabled={isCaseSubmitted}
                          onClick={() => handleSelectRole(creature.name, 'prey')}
                          className={`py-2 px-1 text-xs font-bold rounded-lg border transition-all ${
                            selectedRole === 'prey'
                              ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          Prey
                        </button>
                        <button
                          disabled={isCaseSubmitted}
                          onClick={() => handleSelectRole(creature.name, 'both')}
                          className={`py-2 px-1 text-xs font-bold rounded-lg border transition-all ${
                            selectedRole === 'both'
                              ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          Both!
                        </button>
                      </div>
                    </div>

                    {isCaseSubmitted && (
                      <div className="mt-2 text-xs pt-2 border-t border-slate-200/60">
                        {isCorrect ? (
                          <div className="text-emerald-800 font-medium">
                            <span className="font-bold">✓ Correct! </span>
                            {creature.explanation}
                          </div>
                        ) : (
                          <div className="text-rose-800 font-medium">
                            <span className="font-bold">✗ It is {creature.role.toUpperCase()}! </span>
                            {creature.explanation}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="text-xs text-slate-600">
              {!isCaseSubmitted
                ? 'Select a role for every creature to submit the investigation!'
                : activeCase.keyLearning}
            </div>

            {!isCaseSubmitted ? (
              <button
                onClick={handleSubmitCase}
                disabled={!allAssigned}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs"
              >
                Submit Investigation
              </button>
            ) : (
              <button
                onClick={handleNextCase}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2"
              >
                <span>
                  {currentCaseIndex < CASES_GAME2.length - 1 ? 'Next Case File' : 'See Case Report'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Final Score Board */
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-6 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-3xl">
            🏆
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Detective Mastery Achieved!</h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto mt-1">
              You cracked all four wildlife cases! You understand the survival balance between predators, prey, and creatures that play both vital roles.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 py-2">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 min-w-[140px]">
              <div className="text-xs text-slate-500 font-medium">Cases Solved</div>
              <div className="text-xl font-bold text-slate-900">4 / 4</div>
            </div>
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 min-w-[140px]">
              <div className="text-xs text-rose-700 font-medium">Mastery Badge</div>
              <div className="text-xl font-bold text-rose-900">Savannah Sleuth</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 border border-slate-300 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50"
            >
              Replay Cases
            </button>
            {onCompleteGame && (
              <button
                onClick={onCompleteGame}
                className="px-6 py-2.5 bg-rose-600 text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-rose-700 transition-colors flex items-center gap-2"
              >
                <span>Proceed to Game 3: Chain Crafter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
