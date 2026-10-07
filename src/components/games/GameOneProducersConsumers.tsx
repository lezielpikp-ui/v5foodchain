import React, { useState } from 'react';
import { Sparkles, Sun, Droplets, Wind, RotateCcw, Volume2, ArrowRight } from 'lucide-react';
import { ORGANISMS_GAME1, OrganismCard } from '../../data/curriculumData';
import { useProgress } from '../../context/ProgressContext';
import { soundManager } from '../../utils/audio';

export const GameOneProducersConsumers: React.FC<{ onCompleteGame?: () => void }> = ({ onCompleteGame }) => {
  const { recordGameResult, progress } = useProgress();

  // Sub-stages: 1 = Solar Kitchen (Photosynthesis), 2 = Sorter (Producers vs Consumers), 3 = Consumer Diets
  const [stage, setStage] = useState<1 | 2 | 3>(1);

  // --- Stage 1 State: Photosynthesis Lab ---
  const [sunlightAdded, setSunlightAdded] = useState(false);
  const [waterAdded, setWaterAdded] = useState(false);
  const [co2Added, setCo2Added] = useState(false);
  const isPhotosynthesisComplete = sunlightAdded && waterAdded && co2Added;

  // --- Stage 2 State: Producer vs Consumer Sorter ---
  const [unplacedCards, setUnplacedCards] = useState<OrganismCard[]>(ORGANISMS_GAME1);
  const [placedProducers, setPlacedProducers] = useState<OrganismCard[]>([]);
  const [placedConsumers, setPlacedConsumers] = useState<OrganismCard[]>([]);
  const [sortFeedback, setSortFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);

  // --- Stage 3 State: Consumer Diets ---
  const consumersOnly = ORGANISMS_GAME1.filter((o) => o.category === 'consumer');
  const [dietAnswers, setDietAnswers] = useState<Record<string, string>>({});
  const [dietFinished, setDietFinished] = useState(false);
  const [dietScore, setDietScore] = useState<number | null>(null);

  // Photosynthesis handlers
  const handleAddIngredient = (type: 'sun' | 'water' | 'co2') => {
    soundManager.playClick();
    if (type === 'sun') setSunlightAdded(true);
    if (type === 'water') setWaterAdded(true);
    if (type === 'co2') setCo2Added(true);

    const willComplete =
      (type === 'sun' || sunlightAdded) &&
      (type === 'water' || waterAdded) &&
      (type === 'co2' || co2Added);

    if (willComplete) {
      soundManager.playCorrect();
    }
  };

  const handleReadText = (text: string) => {
    soundManager.speak(text);
  };

  // Sorting handlers
  const handleSortItem = (organism: OrganismCard, target: 'producer' | 'consumer') => {
    const isCorrect = organism.category === target;

    if (isCorrect) {
      soundManager.playCorrect();
      setSortFeedback({
        message: `Great job! ${organism.name} is a ${target.toUpperCase()} because ${
          target === 'producer'
            ? 'it makes its own food from sunlight!'
            : 'it cannot make food and must eat other living things!'
        }`,
        isCorrect: true,
      });

      setUnplacedCards((prev) => prev.filter((c) => c.id !== organism.id));
      if (target === 'producer') {
        setPlacedProducers((prev) => [...prev, organism]);
      } else {
        setPlacedConsumers((prev) => [...prev, organism]);
      }
    } else {
      soundManager.playIncorrect();
      setSortFeedback({
        message: `Not quite! ${organism.name} is actually a ${organism.category.toUpperCase()}. Remember: ${
          organism.category === 'producer'
            ? 'Plants & algae are PRODUCERS—they make their own food.'
            : 'Animals are CONSUMERS—they have to eat food!'
        }`,
        isCorrect: false,
      });
    }
  };

  // Diet assignment handler
  const handleSelectDiet = (organismId: string, diet: 'herbivore' | 'carnivore' | 'omnivore') => {
    soundManager.playClick();
    setDietAnswers((prev) => ({ ...prev, [organismId]: diet }));
  };

  const handleCheckDiets = () => {
    let correct = 0;
    consumersOnly.forEach((c) => {
      if (dietAnswers[c.id] === c.dietType) {
        correct++;
      }
    });

    setDietScore(correct);
    setDietFinished(true);

    if (correct >= 3) {
      soundManager.playFanfare();
      const starsEarned = correct === 4 ? 3 : 2;
      recordGameResult('game1', starsEarned, correct * 25);
    } else {
      soundManager.playIncorrect();
    }
  };

  const handleResetGame1 = () => {
    setStage(1);
    setSunlightAdded(false);
    setWaterAdded(false);
    setCo2Added(false);
    setUnplacedCards(ORGANISMS_GAME1);
    setPlacedProducers([]);
    setPlacedConsumers([]);
    setSortFeedback(null);
    setDietAnswers({});
    setDietFinished(false);
    setDietScore(null);
  };

  const isSorterDone = unplacedCards.length === 0;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Game Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
            <span>Primary Science Lab</span>
            <span>·</span>
            <span>Objectives 1, 2 & 3</span>
            <span>·</span>
            <span>Energy & Organisms</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Energy Quest: Producers vs Consumers
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Discover how living things obtain their energy! Plants make food with solar energy, while consumers eat other organisms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              handleReadText(
                "Welcome to Energy Quest! In this mission, you will learn how plants make their own food as producers, and why consumers must eat other living things."
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5 text-slate-600" />
            <span>Read Aloud</span>
          </button>
          <button
            onClick={handleResetGame1}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>
        </div>
      </div>

      {/* Stage Progress Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-xl max-w-xl mx-auto text-xs font-semibold">
        <button
          onClick={() => setStage(1)}
          className={`flex-1 py-2 px-3 rounded-lg text-center transition-all ${
            stage === 1 ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. Solar Kitchen (Producers)
        </button>
        <button
          onClick={() => setStage(2)}
          className={`flex-1 py-2 px-3 rounded-lg text-center transition-all ${
            stage === 2 ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          2. Sorting Deck (Who Eats What?)
        </button>
        <button
          onClick={() => setStage(3)}
          className={`flex-1 py-2 px-3 rounded-lg text-center transition-all ${
            stage === 3 ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3. Consumer Diets
        </button>
      </div>

      {/* ================= STAGE 1: THE SOLAR KITCHEN ================= */}
      {stage === 1 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              Lab Mission 1: How Does a Producer Make Food?
            </h2>
            <p className="text-sm text-slate-600">
              Producers are living things that can <strong className="text-emerald-700">make their own food</strong>!
              Feed the sunflower its 3 natural ingredients to activate <strong className="text-emerald-700">Photosynthesis</strong>.
            </p>
          </div>

          {/* Interactive Plant Stage */}
          <div className="relative bg-gradient-to-b from-sky-50 via-emerald-50/40 to-amber-50/50 rounded-2xl p-8 border border-emerald-100 flex flex-col items-center justify-center min-h-[340px]">
            {/* The Sun visual */}
            <div
              className={`absolute top-6 left-8 transition-transform duration-500 ${
                sunlightAdded ? 'scale-110' : 'opacity-70'
              }`}
            >
              <div className="flex items-center gap-2 bg-amber-100/80 px-3 py-1.5 rounded-xl border border-amber-200 text-amber-900 text-xs font-bold">
                <Sun className={`w-5 h-5 text-amber-500 ${sunlightAdded ? 'animate-spin' : ''}`} />
                <span>Light Energy</span>
              </div>
            </div>

            {/* Plant center showcase */}
            <div className="relative text-center my-4">
              <div className="text-8xl select-none filter drop-shadow-md">
                {isPhotosynthesisComplete ? '🌻' : '🌱'}
              </div>

              {isPhotosynthesisComplete && (
                <div className="mt-4 inline-flex items-center gap-2 bg-emerald-600 text-white font-bold text-sm px-4 py-2 rounded-xl shadow-md animate-bounce">
                  <Sparkles className="w-4 h-4" />
                  <span>Photosynthesis Active! Glucose (Sugar) Created!</span>
                </div>
              )}
            </div>

            {/* Ingredient status slots */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg mt-4">
              <button
                onClick={() => handleAddIngredient('sun')}
                disabled={sunlightAdded}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                  sunlightAdded
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50/30'
                }`}
              >
                <div className={`p-2 rounded-lg ${sunlightAdded ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold">1. Sunlight</div>
                  <div className="text-[11px] text-slate-500">
                    {sunlightAdded ? '✓ Solar energy trapped' : 'Click to shine sunlight'}
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleAddIngredient('water')}
                disabled={waterAdded}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                  waterAdded
                    ? 'bg-blue-50 border-blue-300 text-blue-900'
                    : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50/30'
                }`}
              >
                <div className={`p-2 rounded-lg ${waterAdded ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold">2. Water (H₂O)</div>
                  <div className="text-[11px] text-slate-500">
                    {waterAdded ? '✓ Absorbed from roots' : 'Click to water soil'}
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleAddIngredient('co2')}
                disabled={co2Added}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                  co2Added
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-white border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30'
                }`}
              >
                <div className={`p-2 rounded-lg ${co2Added ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold">3. Carbon Dioxide</div>
                  <div className="text-[11px] text-slate-500">
                    {co2Added ? '✓ Inhaled via stomata' : 'Click to add air CO₂'}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Key Learning Callout */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-slate-900">Key Scientific Takeaway: </span>
              Producers do not need to hunt or shop! They use solar energy, water, and air to cook their own sugar food inside their leaves.
            </div>
            {isPhotosynthesisComplete && (
              <button
                onClick={() => setStage(2)}
                className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 shrink-0"
              >
                <span>Continue to Sorter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ================= STAGE 2: SORTING DECK ================= */}
      {stage === 2 && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Lab Mission 2: Sort the Living Things!
                </h2>
                <p className="text-sm text-slate-600">
                  Is it a <strong className="text-emerald-700">Producer</strong> (makes own food) or a{' '}
                  <strong className="text-amber-700">Consumer</strong> (must eat other living things)?
                </p>
              </div>

              <div className="text-xs font-semibold text-slate-500">
                Remaining to sort: <span className="tabular-nums font-bold text-slate-800">{unplacedCards.length}</span> / 8
              </div>
            </div>

            {/* Current card to sort */}
            {unplacedCards.length > 0 ? (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 max-w-lg mx-auto text-center space-y-4">
                <div className="text-6xl">{unplacedCards[0].emoji}</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{unplacedCards[0].name}</h3>
                  <p className="text-xs text-slate-600 mt-1 italic">{unplacedCards[0].funFact}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Energy source: <span className="font-semibold">{unplacedCards[0].energySource}</span>
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => handleSortItem(unplacedCards[0], 'producer')}
                    className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-transform active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-2"
                  >
                    <span>🌱 PRODUCER</span>
                    <span className="text-[10px] opacity-80 hidden sm:inline">(Makes Food)</span>
                  </button>
                  <button
                    onClick={() => handleSortItem(unplacedCards[0], 'consumer')}
                    className="flex-1 py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-xs transition-transform active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-2"
                  >
                    <span>🐾 CONSUMER</span>
                    <span className="text-[10px] opacity-80 hidden sm:inline">(Eats Food)</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                <div className="text-4xl">🎉</div>
                <h3 className="text-lg font-bold text-emerald-900">All 8 Organisms Sorted Successfully!</h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  You proved that plants like Oak Trees, Sunflowers, and Phytoplankton are producers, while animals are consumers!
                </p>
                <button
                  onClick={() => setStage(3)}
                  className="px-5 py-2.5 bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-emerald-800 transition-colors inline-flex items-center gap-2"
                >
                  <span>Proceed to Consumer Diets</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Instant Feedback Notice */}
            {sortFeedback && (
              <div
                className={`mt-4 p-3 rounded-xl text-xs font-medium text-center ${
                  sortFeedback.isCorrect
                    ? 'bg-emerald-100/70 text-emerald-900 border border-emerald-200'
                    : 'bg-rose-100/70 text-rose-900 border border-rose-200'
                }`}
              >
                {sortFeedback.message}
              </div>
            )}

            {/* Visual Two-Column Buckets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {/* Producers Bin */}
              <div className="border border-emerald-200 bg-emerald-50/40 rounded-xl p-4">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-emerald-200">
                  <span className="font-bold text-sm text-emerald-900 flex items-center gap-1.5">
                    <span>🌱 Producers</span>
                    <span className="text-xs font-normal text-emerald-700">({placedProducers.length}/4)</span>
                  </span>
                  <span className="text-[11px] text-emerald-700">Makes own food</span>
                </div>
                <div className="grid grid-cols-2 gap-2 min-h-[90px]">
                  {placedProducers.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white border border-emerald-200 p-2.5 rounded-lg flex items-center gap-2 shadow-xs"
                    >
                      <span className="text-2xl">{p.emoji}</span>
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold text-slate-800 truncate">{p.name}</div>
                        <div className="text-[10px] text-emerald-700 truncate">Solar energy</div>
                      </div>
                    </div>
                  ))}
                  {placedProducers.length === 0 && (
                    <div className="col-span-2 flex items-center justify-center text-xs text-emerald-600/70 italic py-6">
                      Producers will appear here...
                    </div>
                  )}
                </div>
              </div>

              {/* Consumers Bin */}
              <div className="border border-amber-200 bg-amber-50/40 rounded-xl p-4">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-amber-200">
                  <span className="font-bold text-sm text-amber-900 flex items-center gap-1.5">
                    <span>🐾 Consumers</span>
                    <span className="text-xs font-normal text-amber-700">({placedConsumers.length}/4)</span>
                  </span>
                  <span className="text-[11px] text-amber-700">Must eat other living things</span>
                </div>
                <div className="grid grid-cols-2 gap-2 min-h-[90px]">
                  {placedConsumers.map((c) => (
                    <div
                      key={c.id}
                      className="bg-white border border-amber-200 p-2.5 rounded-lg flex items-center gap-2 shadow-xs"
                    >
                      <span className="text-2xl">{c.emoji}</span>
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold text-slate-800 truncate">{c.name}</div>
                        <div className="text-[10px] text-amber-700 truncate">{c.dietType}</div>
                      </div>
                    </div>
                  ))}
                  {placedConsumers.length === 0 && (
                    <div className="col-span-2 flex items-center justify-center text-xs text-amber-600/70 italic py-6">
                      Consumers will appear here...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= STAGE 3: CONSUMER DIETS ================= */}
      {stage === 3 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Lab Mission 3: What Do Consumers Eat?
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Since consumers cannot make their own food, they eat different diets. Match each consumer to their scientific diet group:
            </p>
            <div className="flex flex-wrap gap-4 mt-3 text-xs font-medium">
              <span className="text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                🌿 Herbivore: Eats only plants
              </span>
              <span className="text-rose-800 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                🥩 Carnivore: Eats only other animals
              </span>
              <span className="text-purple-800 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                🥗 Omnivore: Eats both plants and animals
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {consumersOnly.map((consumer) => {
              const selected = dietAnswers[consumer.id];
              const isCorrect = dietFinished && selected === consumer.dietType;

              return (
                <div
                  key={consumer.id}
                  className={`border rounded-xl p-4 transition-all ${
                    dietFinished
                      ? isCorrect
                        ? 'border-emerald-300 bg-emerald-50/50'
                        : 'border-rose-300 bg-rose-50/50'
                      : 'border-slate-200 bg-slate-50/40 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{consumer.emoji}</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{consumer.name}</h4>
                      <p className="text-xs text-slate-600">{consumer.energySource}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {(['herbivore', 'carnivore', 'omnivore'] as const).map((diet) => (
                      <button
                        key={diet}
                        onClick={() => handleSelectDiet(consumer.id, diet)}
                        className={`py-2 px-2 text-xs font-bold rounded-lg border transition-colors capitalize ${
                          selected === diet
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {diet}
                      </button>
                    ))}
                  </div>

                  {dietFinished && (
                    <div className="mt-3 text-xs">
                      {isCorrect ? (
                        <span className="text-emerald-700 font-semibold">
                          ✓ Correct! {consumer.name} is a {consumer.dietType}.
                        </span>
                      ) : (
                        <span className="text-rose-700 font-semibold">
                          ✗ It is actually a {consumer.dietType} because: {consumer.energySource}.
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              onClick={() => setStage(2)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              ← Back to Sorter
            </button>

            {!dietFinished ? (
              <button
                onClick={handleCheckDiets}
                disabled={Object.keys(dietAnswers).length < consumersOnly.length}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-xs"
              >
                Check My Answers!
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-800">
                  Score: {dietScore} / {consumersOnly.length} Correct
                </span>
                {onCompleteGame && (
                  <button
                    onClick={onCompleteGame}
                    className="px-5 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800 transition-colors"
                  >
                    Next Mission: Predator vs Prey →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
