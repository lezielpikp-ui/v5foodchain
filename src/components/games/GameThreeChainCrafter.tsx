import React, { useState } from 'react';
import { ArrowRight, RotateCcw, Check, Sparkles, Volume2, HelpCircle } from 'lucide-react';
import { FOOD_CHAINS_GAME3, FoodChainLevel } from '../../data/curriculumData';
import { useProgress } from '../../context/ProgressContext';
import { soundManager } from '../../utils/audio';

export const GameThreeChainCrafter: React.FC<{ onCompleteGame?: () => void }> = ({ onCompleteGame }) => {
  const { recordGameResult } = useProgress();

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const activeChain: FoodChainLevel = FOOD_CHAINS_GAME3[currentLevelIndex];

  // Scrambled state for ordering
  // We exclude the 'Sun' from scrambling or keep Sun as anchor 0, and scramble the living organisms
  // For primary students, having Sun fixed at slot 0 and scrambling the organisms makes it super engaging and pedagogically clear!
  const getInitialSlots = (chain: FoodChainLevel) => {
    const sunNode = chain.nodes[0];
    const livingNodes = [...chain.nodes.slice(1)].sort(() => Math.random() - 0.5);
    return {
      pool: livingNodes,
      placed: [sunNode], // Sun is fixed anchor
    };
  };

  const [state, setState] = useState(() => getInitialSlots(activeChain));
  const [isChainVerified, setIsChainVerified] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Broken link sub-challenge state
  const [showBrokenLink, setShowBrokenLink] = useState(false);
  const [brokenLinkSelected, setBrokenLinkSelected] = useState<number | null>(null);
  const [brokenLinkFinished, setBrokenLinkFinished] = useState(false);

  // Overall game completion tracking
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [allChainsDone, setAllChainsDone] = useState(false);

  const handleSelectPoolItem = (node: typeof activeChain.nodes[0]) => {
    if (!node || isChainVerified) return;
    if (state.placed.length >= activeChain.nodes.length) return;
    soundManager.playClick();
    setState((prev) => ({
      pool: prev.pool.filter((n) => n && n.id !== node.id),
      placed: [...prev.placed.filter(Boolean), node],
    }));
    setFeedback(null);
  };

  const handleRemovePlacedItem = (nodeIndex: number) => {
    if (isChainVerified || nodeIndex === 0) return; // Cannot remove Sun
    const removedNode = state.placed[nodeIndex];
    if (!removedNode) return; // Safeguard against removing empty slots
    soundManager.playClick();
    setState((prev) => ({
      pool: [...prev.pool.filter(Boolean), removedNode],
      placed: prev.placed.filter((_, idx) => idx !== nodeIndex && Boolean(prev.placed[idx])),
    }));
    setFeedback(null);
  };

  const handleVerifyChain = () => {
    // Check if placed array matches the exact activeChain.nodes order
    const isCorrect =
      state.placed.length === activeChain.nodes.length &&
      state.placed.every(
        (node, idx) => node && activeChain.nodes[idx] && node.id === activeChain.nodes[idx].id
      );

    if (isCorrect) {
      soundManager.playCorrect();
      setIsChainVerified(true);
      setPulseAnimation(true);
      soundManager.playEnergyPulse();
      setFeedback('Energy flows smoothly from Sun through Producer to Consumers!');

      if (!completedLevels.includes(currentLevelIndex)) {
        setCompletedLevels((prev) => [...prev, currentLevelIndex]);
      }
    } else {
      soundManager.playIncorrect();
      setFeedback('Oops! The energy arrow order is not quite right yet. Remember: Sun → Producer (Plants) → Herbivore → Carnivore!');
    }
  };

  const handleResetCurrentLevel = () => {
    setState(getInitialSlots(activeChain));
    setIsChainVerified(false);
    setPulseAnimation(false);
    setFeedback(null);
    setShowBrokenLink(false);
    setBrokenLinkSelected(null);
    setBrokenLinkFinished(false);
  };

  const handleNextBiome = () => {
    if (currentLevelIndex < FOOD_CHAINS_GAME3.length - 1) {
      const nextIdx = currentLevelIndex + 1;
      setCurrentLevelIndex(nextIdx);
      setState(getInitialSlots(FOOD_CHAINS_GAME3[nextIdx]));
      setIsChainVerified(false);
      setPulseAnimation(false);
      setFeedback(null);
      setShowBrokenLink(false);
      setBrokenLinkSelected(null);
      setBrokenLinkFinished(false);
    } else {
      setAllChainsDone(true);
      soundManager.playFanfare();
      recordGameResult('game3', 3, 100);
    }
  };

  const handleAnswerBrokenLink = (index: number) => {
    soundManager.playClick();
    setBrokenLinkSelected(index);
    setBrokenLinkFinished(true);

    const question = activeChain.brokenLinkQuestion;
    if (question && question.options[index].isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
            <span>Primary Science Lab</span>
            <span>·</span>
            <span>Objectives 5 & 6</span>
            <span>·</span>
            <span>Constructing Food Chains</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Chain Crafter: Build the Food Chain
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Connect the path of energy! Remember: the arrow <span className="font-bold text-emerald-700">→</span> means{' '}
            <em>"is eaten by"</em> and shows where energy flows!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              soundManager.speak(
                `Build the food chain for ${activeChain.biome}. Click organisms in the pool to place them in order from Sun to Apex Predator.`
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5 text-slate-600" />
            <span>Read Mission</span>
          </button>
          <button
            onClick={handleResetCurrentLevel}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Chain</span>
          </button>
        </div>
      </div>

      {/* Biome Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {FOOD_CHAINS_GAME3.map((chain, idx) => (
          <button
            key={chain.id}
            onClick={() => {
              setCurrentLevelIndex(idx);
              setState(getInitialSlots(chain));
              setIsChainVerified(false);
              setPulseAnimation(false);
              setFeedback(null);
              setShowBrokenLink(false);
              setBrokenLinkSelected(null);
              setBrokenLinkFinished(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 border ${
              idx === currentLevelIndex
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                : completedLevels.includes(idx)
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{chain.biome}</span>
            {completedLevels.includes(idx) && <Check className="w-3.5 h-3.5 text-emerald-300" />}
          </button>
        ))}
      </div>

      {!allChainsDone ? (
        <div className="space-y-6">
          {/* Main Construction Board */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            {/* The Arrow Rule Callout */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 sm:p-4 flex items-center gap-3">
              <span className="text-2xl">💡</span>
              <div className="text-xs sm:text-sm text-emerald-900">
                <span className="font-bold">Crucial Food Chain Rule: </span>
                In science, the arrow <span className="font-extrabold text-emerald-800">→</span> points to who gets the energy!
                For example: <em>Grass → Zebra</em> means "Grass gives energy to Zebra" (Grass is eaten by Zebra).
              </div>
            </div>

            {/* The Chain Assembly Line */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Your Assembled Food Chain:
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  Slots Filled: <span className="tabular-nums font-bold text-slate-800">{state.placed.length}</span> / {activeChain.nodes.length}
                </span>
              </div>

              {/* Responsive Chain Grid */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 overflow-x-auto">
                <div className="flex items-center justify-start sm:justify-center gap-2 min-w-[580px] py-2">
                  {activeChain.nodes.map((_, slotIdx) => {
                    const node = state.placed[slotIdx];

                    return (
                      <React.Fragment key={slotIdx}>
                        {/* Organism Card in Chain */}
                        <div
                          onClick={() => {
                            if (node && slotIdx > 0 && !isChainVerified) {
                              handleRemovePlacedItem(slotIdx);
                            }
                          }}
                          className={`relative w-28 h-36 rounded-xl border flex flex-col items-center justify-between p-2.5 text-center transition-all ${
                            node
                              ? isChainVerified
                                ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400'
                                : 'bg-white border-slate-300 shadow-xs hover:border-rose-400 cursor-pointer'
                              : 'bg-white/60 border-dashed border-slate-300 cursor-default'
                          }`}
                        >
                          {node ? (
                            <>
                              <div className="text-xs font-semibold text-slate-500 leading-none">
                                {node.roleLabel}
                              </div>
                              <div className="text-4xl my-1">{node.emoji || '🌱'}</div>
                              <div className="text-xs font-bold text-slate-900 leading-tight truncate w-full">
                                {node.name}
                              </div>
                              {slotIdx > 0 && !isChainVerified && (
                                <span className="text-[10px] text-slate-400 hover:text-rose-600">
                                  Tap to remove
                                </span>
                              )}
                              {isChainVerified && (
                                <span className="text-[10px] text-emerald-700 font-bold">
                                  ✓ Placed
                                </span>
                              )}
                            </>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full text-slate-400">
                              <span className="text-lg font-bold">#{slotIdx + 1}</span>
                              <span className="text-[10px]">Empty Slot</span>
                            </div>
                          )}
                        </div>

                        {/* Arrow with pulsing energy */}
                        {slotIdx < activeChain.nodes.length - 1 && (
                          <div className="flex flex-col items-center justify-center px-1">
                            <div
                              className={`transition-all duration-300 ${
                                pulseAnimation
                                  ? 'text-emerald-600 scale-125 font-bold animate-pulse'
                                  : 'text-slate-400'
                              }`}
                            >
                              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <span className="text-[9px] text-slate-500 font-medium whitespace-nowrap hidden sm:block">
                              energy
                            </span>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Unplaced Organism Pool */}
            {!isChainVerified && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Organism Pool (Tap to place into next slot):
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {state.pool
                    .filter((node): node is NonNullable<typeof node> => Boolean(node))
                    .map((node) => (
                      <button
                        key={node.id}
                        onClick={() => handleSelectPoolItem(node)}
                        className="bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 p-3 rounded-xl flex items-center gap-3 text-left transition-all shadow-xs active:scale-95"
                      >
                        <span className="text-3xl">{node.emoji || '🐾'}</span>
                        <div className="overflow-hidden">
                          <div className="text-xs font-bold text-slate-900 truncate">{node.name}</div>
                          <div className="text-[11px] text-slate-500 truncate">{node.dietNote}</div>
                        </div>
                      </button>
                    ))}
                  {state.pool.length === 0 && (
                    <div className="col-span-full py-3 text-center text-xs text-slate-500 italic bg-slate-50 rounded-xl">
                      All organisms placed! Click "Verify Chain" below to test the energy flow!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Feedback notice */}
            {feedback && (
              <div
                className={`p-3 rounded-xl text-xs sm:text-sm font-medium text-center ${
                  isChainVerified
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-rose-100 text-rose-900 border border-rose-300'
                }`}
              >
                {feedback}
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <span className="text-xs text-slate-500">
                {activeChain.description}
              </span>

              {!isChainVerified ? (
                <button
                  onClick={handleVerifyChain}
                  disabled={state.placed.length < activeChain.nodes.length}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs"
                >
                  Verify Chain Order
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  {activeChain.brokenLinkQuestion && !showBrokenLink && (
                    <button
                      onClick={() => setShowBrokenLink(true)}
                      className="px-4 py-2 bg-amber-600 text-white font-bold text-xs rounded-xl hover:bg-amber-700 transition-colors flex items-center gap-1.5"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Bonus: Broken Link Puzzle!</span>
                    </button>
                  )}
                  <button
                    onClick={handleNextBiome}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2"
                  >
                    <span>
                      {currentLevelIndex < FOOD_CHAINS_GAME3.length - 1
                        ? 'Next Biome Chain'
                        : 'Complete Game 3'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Broken Link Bonus Modal/Card */}
          {showBrokenLink && activeChain.brokenLinkQuestion && (
            <div className="bg-amber-50/70 border border-amber-300 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 uppercase">
                  ⭐ Detective Challenge: What's Missing?
                </span>
                <button
                  onClick={() => setShowBrokenLink(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-bold"
                >
                  Close
                </button>
              </div>

              <h4 className="text-sm font-bold text-slate-900">
                Imagine this food chain had a gap in the middle:
              </h4>

              <div className="flex items-center justify-center flex-wrap gap-2 p-3 bg-white rounded-xl border border-amber-200">
                {activeChain.nodes.map((n, i) => (
                  <React.Fragment key={n.id}>
                    {i === activeChain.brokenLinkQuestion?.missingIndex ? (
                      <span className="px-3 py-1 bg-amber-100 border border-dashed border-amber-400 rounded-lg text-amber-900 font-bold text-xs animate-pulse">
                        ❓ [Missing Link]
                      </span>
                    ) : (
                      <span className="text-sm font-bold text-slate-800 flex items-center gap-1">
                        <span>{n.emoji}</span>
                        <span>{n.name}</span>
                      </span>
                    )}
                    {i < activeChain.nodes.length - 1 && <span className="text-slate-400 font-bold">→</span>}
                  </React.Fragment>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeChain.brokenLinkQuestion.options?.filter(Boolean).map((option, optIdx) => (
                  <button
                    key={option.name}
                    disabled={brokenLinkFinished}
                    onClick={() => handleAnswerBrokenLink(optIdx)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      brokenLinkSelected === optIdx
                        ? option.isCorrect
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                          : 'bg-rose-100 border-rose-400 text-rose-900'
                        : 'bg-white border-slate-200 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <span className="text-2xl">{option.emoji || '❓'}</span>
                      <span>{option.name}</span>
                    </div>
                    {brokenLinkFinished && (
                      <div className="text-[11px] mt-1.5 font-medium">
                        {option.reason}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Final Game 3 Completion Screen */
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-6 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
            🔗
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Master Chain Crafter!</h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto mt-1">
              You constructed accurate food chains across garden, marine, savanna, and pond biomes!
              You understand that arrows indicate how solar energy flows through ecosystems.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setAllChainsDone(false);
                setCurrentLevelIndex(0);
                setState(getInitialSlots(FOOD_CHAINS_GAME3[0]));
                setIsChainVerified(false);
              }}
              className="px-5 py-2.5 border border-slate-300 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50"
            >
              Practice Chains Again
            </button>
            {onCompleteGame && (
              <button
                onClick={onCompleteGame}
                className="px-6 py-2.5 bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-emerald-800 transition-colors flex items-center gap-2"
              >
                <span>Proceed to Game 4: Eco-Balance</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
