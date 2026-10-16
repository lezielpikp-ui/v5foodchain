import React, { useState } from 'react';
import { Play, RotateCcw, Volume2, ArrowRight, ArrowLeft, TrendingUp, TrendingDown, Award, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { CRISIS_SCENARIOS_GAME4, EcoCrisisScenario } from '../../data/curriculumData';
import { useProgress } from '../../context/ProgressContext';
import { soundManager } from '../../utils/audio';

export const GameFourEcoBalance: React.FC<{ onCompleteGame?: () => void }> = ({ onCompleteGame }) => {
  const { recordGameResult } = useProgress();

  // 10 Guided Ripple Missions State
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const currentScenario: EcoCrisisScenario = CRISIS_SCENARIOS_GAME4[scenarioIdx];
  const [selectedPrediction, setSelectedPrediction] = useState<number | null>(null);
  const [hasSimulatedShock, setHasSimulatedShock] = useState(false);
  const [scenarioScore, setScenarioScore] = useState<Record<number, number>>({});
  const [scenariosDone, setScenariosDone] = useState(false);

  // Short labels for each of the 10 Mission Tabs
  const missionShortTitles = [
    '1. Drought',
    '2. Predators',
    '3. Spring Rain',
    '4. Locusts',
    '5. Coral Reef',
    '6. Wildfire',
    '7. Orchard',
    '8. Wolves',
    '9. Kelp Forest',
    '10. Corridor',
  ];

  // Handle Scenario Prediction
  const handleSelectPrediction = (optIdx: number) => {
    if (hasSimulatedShock) return;
    soundManager.playClick();
    setSelectedPrediction(optIdx);
  };

  const handleRunShockSimulation = () => {
    if (selectedPrediction === null) return;
    soundManager.playEnergyPulse();
    setHasSimulatedShock(true);

    const isCorrect = currentScenario.options[selectedPrediction].isCorrect;
    const newScoreMap = { ...scenarioScore, [scenarioIdx]: isCorrect ? 1 : 0 };
    setScenarioScore(newScoreMap);

    if (isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }

    // Check if all 10 missions have been answered
    const totalAnswered = Object.keys(newScoreMap).length;
    if (totalAnswered >= CRISIS_SCENARIOS_GAME4.length) {
      const correctTotal = Object.values(newScoreMap).reduce((a, b) => a + b, 0);
      let stars = 1;
      if (correctTotal >= 8) stars = 3;
      else if (correctTotal >= 5) stars = 2;
      recordGameResult('game4', stars, correctTotal * 10);
    }
  };

  const handleJumpToMission = (targetIdx: number) => {
    soundManager.playClick();
    setScenarioIdx(targetIdx);
    setSelectedPrediction(null);
    setHasSimulatedShock(false);
  };

  const handleNextScenario = () => {
    soundManager.playClick();
    if (scenarioIdx < CRISIS_SCENARIOS_GAME4.length - 1) {
      setScenarioIdx((prev) => prev + 1);
      setSelectedPrediction(null);
      setHasSimulatedShock(false);
    } else {
      // Reached mission 10 completion
      setScenariosDone(true);
      const correctTotal = Object.values(scenarioScore).reduce((a, b) => a + b, 0);
      let stars = 1;
      if (correctTotal >= 8) stars = 3;
      else if (correctTotal >= 5) stars = 2;
      recordGameResult('game4', stars, correctTotal * 10);
      soundManager.playFanfare();
    }
  };

  const handlePreviousScenario = () => {
    if (scenarioIdx > 0) {
      soundManager.playClick();
      setScenarioIdx((prev) => prev - 1);
      setSelectedPrediction(null);
      setHasSimulatedShock(false);
    }
  };

  const handleRestartScenarios = () => {
    setScenarioIdx(0);
    setSelectedPrediction(null);
    setHasSimulatedShock(false);
    setScenarioScore({});
    setScenariosDone(false);
  };

  const answeredCount = Object.keys(scenarioScore).length;
  const correctCount = Object.values(scenarioScore).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-50/90 via-sky-50/40 to-white border border-emerald-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1.5">
            <span>Primary Science Lab</span>
            <span>·</span>
            <span>Objective 7</span>
            <span>·</span>
            <span>The Food Chain Ripple Effect</span>
          </div>
          <div className="inline-block bg-white/95 border border-emerald-200/90 rounded-xl px-3.5 py-1.5 shadow-xs mb-1.5">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>⚖️</span>
              <span>Eco-Balance: 10 Guided Ripple Missions</span>
            </h1>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Discover how every living thing is connected! Changing one population causes ripple effects that alter the entire food chain.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() =>
              soundManager.speak(
                `Mission ${scenarioIdx + 1} of 10: ${currentScenario.title}. ${currentScenario.story}. ${currentScenario.inquiryQuestion}`
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5 text-slate-600" />
            <span>Read Mission</span>
          </button>
        </div>
      </div>

      {/* 10 Guided Mission Tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3 px-1 text-xs">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <span>10 Guided Missions:</span>
            <span className="text-emerald-800 font-semibold">
              {answeredCount}/10 completed ({correctCount} correct)
            </span>
          </span>
          <span className="text-slate-500 font-medium hidden sm:inline">
            Click any tab (1 to 10) to jump to that mission
          </span>
        </div>

        {/* 10 Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-1.5">
          {CRISIS_SCENARIOS_GAME4.map((scenario, idx) => {
            const isCurrent = idx === scenarioIdx && !scenariosDone;
            const hasScore = scenarioScore[idx] !== undefined;
            const isCorrect = scenarioScore[idx] === 1;

            return (
              <button
                key={scenario.id}
                onClick={() => {
                  setScenariosDone(false);
                  handleJumpToMission(idx);
                }}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border text-center flex flex-col items-center justify-center gap-0.5 ${
                  isCurrent
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs ring-2 ring-emerald-400'
                    : hasScore
                    ? isCorrect
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100'
                      : 'bg-rose-50 text-rose-900 border-rose-300 hover:bg-rose-100'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
                title={`Mission ${idx + 1}: ${scenario.title}`}
              >
                <div className="flex items-center gap-1">
                  <span>Tab {idx + 1}</span>
                  {hasScore && (
                    <span className="text-[10px] font-black">
                      {isCorrect ? '✓' : '✗'}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-normal truncate max-w-full opacity-90">
                  {missionShortTitles[idx]?.split('. ')[1] || `M${idx + 1}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= ACTIVE MISSION CARD ================= */}
      {!scenariosDone && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Scenario Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wide bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                  Mission {scenarioIdx + 1} of 10
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  · {currentScenario.badge}
                </span>
              </div>
              <div className="inline-block bg-emerald-50 border border-emerald-200/80 px-3.5 py-1.5 rounded-xl shadow-xs mt-1.5">
                <h2 className="text-lg sm:text-xl font-bold text-emerald-950">
                  {currentScenario.title}
                </h2>
              </div>
            </div>
            <span className="px-3 py-1 bg-rose-50 text-rose-800 border border-rose-200 text-xs font-semibold rounded-lg self-start sm:self-center">
              Shock Event: {currentScenario.shockEvent}
            </span>
          </div>

          {/* Story Prompt */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
            <p className="text-sm sm:text-base text-slate-800 font-medium">
              "{currentScenario.story}"
            </p>
          </div>

          {/* Interactive Population Comparison Visually */}
          <div className="border border-slate-200 rounded-xl p-5 bg-gradient-to-r from-emerald-50/30 via-sky-50/20 to-amber-50/30">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="inline-block bg-white/90 border border-slate-200 px-3 py-1 rounded-lg shadow-2xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <span>📊</span>
                  <span>Ecosystem Population Gauge: Before vs. After Shock</span>
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">
                {hasSimulatedShock ? '⚡ Shock Applied' : 'Normal Equilibrium'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Producers */}
              <div className="bg-white border border-emerald-200 rounded-xl p-3.5 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="text-xl">{currentScenario.labels?.producerEmoji || '🌾'}</span>{' '}
                    <span className="truncate">{currentScenario.labels?.producer || 'Producers'}</span>
                  </span>
                  <span className="tabular-nums shrink-0 ml-1">
                    {hasSimulatedShock ? currentScenario.afterCounts.grass : currentScenario.initialCounts.grass}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${
                        hasSimulatedShock
                          ? currentScenario.afterCounts.grass
                          : currentScenario.initialCounts.grass
                      }%`,
                    }}
                  />
                </div>
                {hasSimulatedShock && (
                  <div className="text-[11px] font-semibold mt-2 flex items-center gap-1">
                    {currentScenario.afterCounts.grass < currentScenario.initialCounts.grass ? (
                      <span className="text-rose-600 flex items-center gap-0.5">
                        <TrendingDown className="w-3.5 h-3.5" /> Decreased
                      </span>
                    ) : (
                      <span className="text-emerald-600 flex items-center gap-0.5">
                        <TrendingUp className="w-3.5 h-3.5" /> Increased
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Herbivores */}
              <div className="bg-white border border-amber-200 rounded-xl p-3.5 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="text-xl">{currentScenario.labels?.herbivoreEmoji || '🐇'}</span>{' '}
                    <span className="truncate">{currentScenario.labels?.herbivore || 'Herbivores'}</span>
                  </span>
                  <span className="tabular-nums shrink-0 ml-1">
                    {hasSimulatedShock ? currentScenario.afterCounts.rabbits : currentScenario.initialCounts.rabbits}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(
                        100,
                        hasSimulatedShock
                          ? currentScenario.afterCounts.rabbits
                          : currentScenario.initialCounts.rabbits
                      )}%`,
                    }}
                  />
                </div>
                {hasSimulatedShock && (
                  <div className="text-[11px] font-semibold mt-2 flex items-center gap-1">
                    {currentScenario.afterCounts.rabbits < currentScenario.initialCounts.rabbits ? (
                      <span className="text-rose-600 flex items-center gap-0.5">
                        <TrendingDown className="w-3.5 h-3.5" /> Decreased
                      </span>
                    ) : (
                      <span className="text-emerald-600 flex items-center gap-0.5">
                        <TrendingUp className="w-3.5 h-3.5" /> Multiplied
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Predators */}
              <div className="bg-white border border-rose-200 rounded-xl p-3.5 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="text-xl">{currentScenario.labels?.predatorEmoji || '🦊'}</span>{' '}
                    <span className="truncate">{currentScenario.labels?.predator || 'Predators'}</span>
                  </span>
                  <span className="tabular-nums shrink-0 ml-1">
                    {hasSimulatedShock ? currentScenario.afterCounts.foxes : currentScenario.initialCounts.foxes}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-rose-500 h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${
                        (hasSimulatedShock
                          ? currentScenario.afterCounts.foxes
                          : currentScenario.initialCounts.foxes) * 5
                      }%`,
                    }}
                  />
                </div>
                {hasSimulatedShock && (
                  <div className="text-[11px] font-semibold mt-2 flex items-center gap-1">
                    {currentScenario.afterCounts.foxes < currentScenario.initialCounts.foxes ? (
                      <span className="text-rose-600 flex items-center gap-0.5">
                        <TrendingDown className="w-3.5 h-3.5" /> Decreased
                      </span>
                    ) : (
                      <span className="text-emerald-600 flex items-center gap-0.5">
                        <TrendingUp className="w-3.5 h-3.5" /> Multiplied
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Student Prediction Challenge */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              Ecologist Inquiry: {currentScenario.inquiryQuestion}
            </h3>

            <div className="space-y-2">
              {currentScenario.options.map((opt, optIdx) => {
                const isSelected = selectedPrediction === optIdx;

                return (
                  <button
                    key={optIdx}
                    disabled={hasSimulatedShock}
                    onClick={() => handleSelectPrediction(optIdx)}
                    className={`w-full p-4 rounded-xl border text-left transition-all text-xs sm:text-sm font-medium ${
                      isSelected
                        ? hasSimulatedShock
                          ? opt.isCorrect
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold'
                            : 'bg-rose-100 border-rose-400 text-rose-950 font-bold'
                          : 'bg-slate-900 text-white border-slate-900'
                        : hasSimulatedShock && opt.isCorrect
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div>{opt.text}</div>
                    {hasSimulatedShock && isSelected && (
                      <div className="mt-2 text-xs font-normal border-t border-slate-200/50 pt-1.5">
                        {opt.explanation}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <div className="text-xs text-slate-600">
              {hasSimulatedShock ? (
                <span className="font-semibold text-emerald-800">
                  Takeaway: {currentScenario.ecoTakeaway}
                </span>
              ) : (
                'Choose your prediction, then click "Simulate the Ripple Effect"!'
              )}
            </div>

            <div className="flex items-center gap-2">
              {scenarioIdx > 0 && (
                <button
                  onClick={handlePreviousScenario}
                  className="px-4 py-2.5 border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              )}

              {!hasSimulatedShock ? (
                <button
                  onClick={handleRunShockSimulation}
                  disabled={selectedPrediction === null}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Simulate the Ripple Effect</span>
                </button>
              ) : (
                <button
                  onClick={handleNextScenario}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>
                    {scenarioIdx < CRISIS_SCENARIOS_GAME4.length - 1
                      ? 'Next Mission'
                      : 'View 10-Mission Report'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= 10-MISSION COMPLETION REPORT ================= */}
      {scenariosDone && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-6 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-xs">
            ⚖️
          </div>
          <div>
            <div className="inline-block bg-emerald-50 border border-emerald-200/80 px-4 py-1.5 rounded-xl shadow-xs mb-1.5">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Eco-Guardian Badge Unlocked! (10 Missions Completed)
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-lg mx-auto mt-1">
              You completed all 10 Guided Ripple Missions and proved your mastery of Objective 7!
              Producers, herbivores, and predators all rely on one another to stay in balance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto py-2">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="text-xs text-slate-500 font-medium">Missions Mastered</div>
              <div className="text-2xl font-black text-slate-900">
                {correctCount} / 10
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="text-xs text-amber-700 font-medium">Stars Awarded</div>
              <div className="text-2xl font-black text-amber-900">
                {correctCount >= 8 ? '★★★ (3)' : correctCount >= 5 ? '★★☆ (2)' : '★☆☆ (1)'}
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="text-xs text-emerald-700 font-medium">Mastery Badge</div>
              <div className="text-lg font-black text-emerald-900">Eco Guardian</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
            <button
              onClick={handleRestartScenarios}
              className="px-5 py-2.5 border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-50 transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay 10 Missions</span>
            </button>
            <button
              onClick={() => {
                setScenariosDone(false);
                setScenarioIdx(0);
              }}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-colors inline-flex items-center gap-2"
            >
              <span>Review Mission Tabs</span>
            </button>
            {onCompleteGame && (
              <button
                onClick={onCompleteGame}
                className="px-6 py-2.5 bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-emerald-800 transition-colors inline-flex items-center gap-2 shadow-xs"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>Open Science Passport</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
