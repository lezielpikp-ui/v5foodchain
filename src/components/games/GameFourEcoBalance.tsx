import React, { useState } from 'react';
import { Play, RotateCcw, Volume2, ArrowRight, TrendingUp, TrendingDown, AlertTriangle, ShieldCheck } from 'lucide-react';
import { CRISIS_SCENARIOS_GAME4, EcoCrisisScenario } from '../../data/curriculumData';
import { useProgress } from '../../context/ProgressContext';
import { soundManager } from '../../utils/audio';

export const GameFourEcoBalance: React.FC<{ onCompleteGame?: () => void }> = ({ onCompleteGame }) => {
  const { recordGameResult } = useProgress();

  const [activeTab, setActiveTab] = useState<'scenarios' | 'sandbox'>('scenarios');

  // Scenario Mode State
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const currentScenario: EcoCrisisScenario = CRISIS_SCENARIOS_GAME4[scenarioIdx];
  const [selectedPrediction, setSelectedPrediction] = useState<number | null>(null);
  const [hasSimulatedShock, setHasSimulatedShock] = useState(false);
  const [scenarioScore, setScenarioScore] = useState<number[]>([]);
  const [scenariosDone, setScenariosDone] = useState(false);

  // Sandbox Mode State
  const [sandboxGrass, setSandboxGrass] = useState(70);
  const [sandboxRabbits, setSandboxRabbits] = useState(40);
  const [sandboxFoxes, setSandboxFoxes] = useState(12);
  const [sandboxHistory, setSandboxHistory] = useState<{ g: number; r: number; f: number }[]>([]);
  const [sandboxStatus, setSandboxStatus] = useState<string>('Balanced Meadow Ecosystem');

  // Handle Scenario Prediction
  const handleSelectPrediction = (optIdx: number) => {
    soundManager.playClick();
    setSelectedPrediction(optIdx);
  };

  const handleRunShockSimulation = () => {
    if (selectedPrediction === null) return;
    soundManager.playEnergyPulse();
    setHasSimulatedShock(true);

    const isCorrect = currentScenario.options[selectedPrediction].isCorrect;
    if (isCorrect) {
      soundManager.playCorrect();
      setScenarioScore((prev) => [...prev, 1]);
    } else {
      soundManager.playIncorrect();
      setScenarioScore((prev) => [...prev, 0]);
    }
  };

  const handleNextScenario = () => {
    soundManager.playClick();
    if (scenarioIdx < CRISIS_SCENARIOS_GAME4.length - 1) {
      setScenarioIdx((prev) => prev + 1);
      setSelectedPrediction(null);
      setHasSimulatedShock(false);
    } else {
      setScenariosDone(true);
      const correctTotal = scenarioScore.reduce((a, b) => a + b, 0);
      const stars = correctTotal >= 2 ? 3 : 2;
      recordGameResult('game4', stars, correctTotal * 35);
      soundManager.playFanfare();
    }
  };

  const handleRestartScenarios = () => {
    setScenarioIdx(0);
    setSelectedPrediction(null);
    setHasSimulatedShock(false);
    setScenarioScore([]);
    setScenariosDone(false);
  };

  // Sandbox simulation step
  const handleSimulateSandboxStep = () => {
    soundManager.playClick();
    // Ecosystem mathematical model:
    // Rabbits eat grass (grass decreases if too many rabbits, grass regenerates)
    // Foxes eat rabbits (foxes grow if many rabbits, foxes starve if few rabbits)
    let newGrass = sandboxGrass;
    let newRabbits = sandboxRabbits;
    let newFoxes = sandboxFoxes;

    // Grass naturally grows unless overgrazed
    const grassGrowth = 15;
    const rabbitConsumption = Math.round(sandboxRabbits * 0.4);
    newGrass = Math.max(5, Math.min(100, sandboxGrass + grassGrowth - rabbitConsumption));

    // Rabbits depend on grass and fox predation
    if (sandboxGrass < 20) {
      // Starvation
      newRabbits = Math.max(5, Math.round(sandboxRabbits * 0.6));
    } else {
      // Reproduction minus fox predation
      const foxHunt = Math.round(sandboxFoxes * 1.5);
      newRabbits = Math.max(5, Math.min(120, sandboxRabbits + Math.round(newGrass * 0.25) - foxHunt));
    }

    // Foxes depend on rabbits
    if (sandboxRabbits < 20) {
      newFoxes = Math.max(2, Math.round(sandboxFoxes * 0.6));
    } else {
      newFoxes = Math.max(2, Math.min(30, Math.round(sandboxFoxes + (sandboxRabbits > 50 ? 4 : -2))));
    }

    setSandboxGrass(newGrass);
    setSandboxRabbits(newRabbits);
    setSandboxFoxes(newFoxes);

    // Assess status
    if (newGrass <= 15) {
      setSandboxStatus('⚠️ Overgrazed! Producers critically depleted.');
    } else if (newRabbits <= 10) {
      setSandboxStatus('⚠️ Herbivore collapse! Predators in danger of starving.');
    } else if (newFoxes <= 3) {
      setSandboxStatus('⚠️ Low predators! Rabbits may multiply too fast.');
    } else {
      setSandboxStatus('🌿 Balanced meadow! Producers and consumers in equilibrium.');
    }

    setSandboxHistory((prev) => [...prev.slice(-6), { g: newGrass, r: newRabbits, f: newFoxes }]);
  };

  const handleResetSandbox = () => {
    setSandboxGrass(70);
    setSandboxRabbits(40);
    setSandboxFoxes(12);
    setSandboxHistory([]);
    setSandboxStatus('Balanced Meadow Ecosystem');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
            <span>Primary Science Lab</span>
            <span>·</span>
            <span>Objective 7</span>
            <span>·</span>
            <span>The Ripple Effect</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Eco-Balance: The Food Chain Ripple Effect
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Discover how every living thing is connected! Changing one population causes ripples that affect the entire ecosystem.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              soundManager.speak(
                activeTab === 'scenarios'
                  ? `Scenario: ${currentScenario.title}. ${currentScenario.story}. What will happen to the food chain?`
                  : 'Welcome to the Eco Sandbox. Adjust populations and press simulate to watch how organisms balance each other!'
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5 text-slate-600" />
            <span>Read Aloud</span>
          </button>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl max-w-md mx-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('scenarios')}
          className={`flex-1 py-2 px-3 rounded-lg text-center transition-all ${
            activeTab === 'scenarios'
              ? 'bg-white text-emerald-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. Guided Ripple Missions ({scenarioIdx + 1}/{CRISIS_SCENARIOS_GAME4.length})
        </button>
        <button
          onClick={() => setActiveTab('sandbox')}
          className={`flex-1 py-2 px-3 rounded-lg text-center transition-all ${
            activeTab === 'sandbox'
              ? 'bg-white text-emerald-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          2. Interactive Eco-Sandbox
        </button>
      </div>

      {/* ================= SCENARIOS MODE ================= */}
      {activeTab === 'scenarios' && !scenariosDone && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Scenario Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                Mission {scenarioIdx + 1} of {CRISIS_SCENARIOS_GAME4.length}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                {currentScenario.title}
              </h2>
            </div>
            <span className="px-3 py-1 bg-rose-50 text-rose-800 border border-rose-200 text-xs font-semibold rounded-lg self-start sm:self-center">
              Event: {currentScenario.shockEvent}
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
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-4">
              Population Gauge: Before vs. After the Environmental Shock
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Grass */}
              <div className="bg-white border border-emerald-200 rounded-xl p-3.5 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
                  <span className="flex items-center gap-1.5">
                    <span className="text-xl">🌾</span> Meadow Grass (Producer)
                  </span>
                  <span className="tabular-nums">
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

              {/* Rabbits */}
              <div className="bg-white border border-amber-200 rounded-xl p-3.5 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
                  <span className="flex items-center gap-1.5">
                    <span className="text-xl">🐇</span> Rabbits (Herbivore)
                  </span>
                  <span className="tabular-nums">
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

              {/* Foxes */}
              <div className="bg-white border border-rose-200 rounded-xl p-3.5 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
                  <span className="flex items-center gap-1.5">
                    <span className="text-xl">🦊</span> Foxes (Apex Predator)
                  </span>
                  <span className="tabular-nums">
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
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
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
                    ? 'Next Scenario'
                    : 'View Ecologist Report'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Completion of Scenarios */}
      {activeTab === 'scenarios' && scenariosDone && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-6 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
            ⚖️
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Eco-Guardian Badge Unlocked!</h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto mt-1">
              You mastered Objective 7! You proved that living things in an ecosystem are deeply interconnected.
              Producers, herbivores, and predators all rely on one another to stay in balance.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleRestartScenarios}
              className="px-5 py-2.5 border border-slate-300 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50"
            >
              Replay Missions
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className="px-6 py-2.5 bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-emerald-800 transition-colors flex items-center gap-2"
            >
              <span>Explore Interactive Sandbox</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= INTERACTIVE ECO-SANDBOX ================= */}
      {activeTab === 'sandbox' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                The Living Meadow Simulator
              </h2>
              <p className="text-sm text-slate-600">
                Adjust any population and press <strong>"Simulate 1 Season"</strong> to see how producers, herbivores, and predators react!
              </p>
            </div>
            <button
              onClick={handleResetSandbox}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Meadow</span>
            </button>
          </div>

          {/* Living Meadow Visual Canvas */}
          <div className="bg-gradient-to-b from-sky-100/70 via-emerald-50/50 to-emerald-100/60 rounded-2xl p-6 border border-emerald-200 relative overflow-hidden min-h-[220px]">
            {/* Ecosystem Status Callout */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-bold text-slate-800 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                {sandboxStatus}
              </div>
              <div className="text-[11px] font-semibold text-slate-600 bg-white/80 px-2.5 py-1 rounded-md">
                Trophic Levels Active
              </div>
            </div>

            {/* Organism avatars representing current population density */}
            <div className="space-y-4">
              {/* Predators */}
              <div>
                <div className="text-[11px] font-bold text-rose-900 mb-1 flex items-center gap-1">
                  <span>🦊 Predators (Foxes): {sandboxFoxes}</span>
                </div>
                <div className="flex flex-wrap gap-2 text-2xl min-h-[32px]">
                  {Array.from({ length: Math.min(15, Math.ceil(sandboxFoxes / 2)) }).map((_, i) => (
                    <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>
                      🦊
                    </span>
                  ))}
                </div>
              </div>

              {/* Herbivores */}
              <div>
                <div className="text-[11px] font-bold text-amber-900 mb-1 flex items-center gap-1">
                  <span>🐇 Herbivore Consumers (Rabbits): {sandboxRabbits}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 text-2xl min-h-[32px]">
                  {Array.from({ length: Math.min(25, Math.ceil(sandboxRabbits / 4)) }).map((_, i) => (
                    <span key={i}>🐇</span>
                  ))}
                </div>
              </div>

              {/* Producers */}
              <div>
                <div className="text-[11px] font-bold text-emerald-900 mb-1 flex items-center gap-1">
                  <span>🌾 Producers (Grass & Clover): {sandboxGrass}%</span>
                </div>
                <div className="flex flex-wrap gap-1 text-2xl min-h-[32px]">
                  {Array.from({ length: Math.min(30, Math.ceil(sandboxGrass / 3.5)) }).map((_, i) => (
                    <span key={i}>🌱</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            {/* Grass Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-emerald-900 mb-1.5">
                <span>🌾 Grass (Producers)</span>
                <span className="tabular-nums">{sandboxGrass}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={sandboxGrass}
                onChange={(e) => setSandboxGrass(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Food energy for rabbits
              </span>
            </div>

            {/* Rabbit Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-amber-900 mb-1.5">
                <span>🐇 Rabbits (Consumers)</span>
                <span className="tabular-nums">{sandboxRabbits}</span>
              </div>
              <input
                type="range"
                min="5"
                max="120"
                value={sandboxRabbits}
                onChange={(e) => setSandboxRabbits(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Eats grass; prey for foxes
              </span>
            </div>

            {/* Fox Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-rose-900 mb-1.5">
                <span>🦊 Foxes (Predators)</span>
                <span className="tabular-nums">{sandboxFoxes}</span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                value={sandboxFoxes}
                onChange={(e) => setSandboxFoxes(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Keeps rabbit population in balance
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-600">
              Try setting Grass to 10% or Foxes to 2, then step through seasons!
            </span>
            <button
              onClick={handleSimulateSandboxStep}
              className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Simulate 1 Season</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
