/**
 * Primary Science Curriculum Data: Food Chains & Ecosystem Energy
 * Targets all 7 pedagogical objectives with child-accessible language,
 * scientifically rigorous taxonomy, and engaging interactive metadata.
 */

export interface LearningObjective {
  id: number;
  title: string;
  childSummary: string;
  curriculumStatement: string;
  gameId: 'game1' | 'game2' | 'game3' | 'game4';
  icon: string;
}

export const LEARNING_OBJECTIVES: LearningObjective[] = [
  {
    id: 1,
    title: "Obtaining Energy",
    childSummary: "Plants make food using sunlight; animals get energy by eating other living things.",
    curriculumStatement: "State how organisms obtain their energy.",
    gameId: 'game1',
    icon: '☀️',
  },
  {
    id: 2,
    title: "The Solar Chefs: Producers",
    childSummary: "Producers (like green plants and algae) can make their own food through photosynthesis.",
    curriculumStatement: "Show an understanding that a producer can make its own food.",
    gameId: 'game1',
    icon: '🌱',
  },
  {
    id: 3,
    title: "Hungry Consumers",
    childSummary: "Consumers cannot make their own food; they must eat plants or other animals.",
    curriculumStatement: "Show an understanding that consumers cannot make their own food, so they eat other living things for food.",
    gameId: 'game1',
    icon: '🐰',
  },
  {
    id: 4,
    title: "Predator vs. Prey",
    childSummary: "A predator hunts other animals for food; prey is hunted and eaten. Many creatures are both!",
    curriculumStatement: "Differentiate between predator and prey.",
    gameId: 'game2',
    icon: '🦅',
  },
  {
    id: 5,
    title: "What is a Food Chain?",
    childSummary: "A food chain shows feeding relationships! Arrows show the direction energy flows (is eaten by).",
    curriculumStatement: "Show an understanding that a food chain shows the food relationship between different organisms.",
    gameId: 'game3',
    icon: '➡️',
  },
  {
    id: 6,
    title: "Constructing Food Chains",
    childSummary: "Build complete chains starting with the Sun and Producers, leading to Primary and Apex Consumers.",
    curriculumStatement: "Construct a food chain.",
    gameId: 'game3',
    icon: '🔗',
  },
  {
    id: 7,
    title: "The Ripple Effect (Interdependence)",
    childSummary: "If one population changes, it affects everyone else in the food chain!",
    curriculumStatement: "Recognise that the producers and consumers in a food chain affect one another.",
    gameId: 'game4',
    icon: '⚖️',
  },
];

/* ============================================================
   GAME 1 DATA: PRODUCERS & CONSUMERS
============================================================ */
export interface OrganismCard {
  id: string;
  name: string;
  category: 'producer' | 'consumer';
  dietType?: 'herbivore' | 'carnivore' | 'omnivore';
  emoji: string;
  energySource: string;
  funFact: string;
  scientificDetail: string;
}

export const ORGANISMS_GAME1: OrganismCard[] = [
  {
    id: 'sunflower',
    name: 'Sunflower',
    category: 'producer',
    emoji: '🌻',
    energySource: 'Sunlight (Photosynthesis)',
    funFact: 'Young sunflowers track the sun across the sky every single day!',
    scientificDetail: 'Green leaves take in water from roots and carbon dioxide from air to create plant food.'
  },
  {
    id: 'caterpillar',
    name: 'Caterpillar',
    category: 'consumer',
    dietType: 'herbivore',
    emoji: '🐛',
    energySource: 'Eats fresh green plant leaves',
    funFact: 'A caterpillar can eat several times its body weight in leaves every single day!',
    scientificDetail: 'Primary consumer (herbivore) that directly digests producer biomass for energy.'
  },
  {
    id: 'oak-tree',
    name: 'Oak Tree',
    category: 'producer',
    emoji: '🌳',
    energySource: 'Sunlight (Photosynthesis)',
    funFact: 'An oak tree can produce thousands of acorns every autumn using solar energy!',
    scientificDetail: 'Uses chlorophyll in its leaves to trap solar energy and synthesize glucose from CO2 and water.'
  },
  {
    id: 'red-tailed-hawk',
    name: 'Red-Tailed Hawk',
    category: 'consumer',
    dietType: 'carnivore',
    emoji: '🦅',
    energySource: 'Eats mice, snakes, and small birds',
    funFact: 'Hawks have eyesight roughly 8 times sharper than human eyesight!',
    scientificDetail: 'Carnivorous secondary/tertiary consumer that hunts other living animals for proteins and fats.'
  },
  {
    id: 'clover-grass',
    name: 'Meadow Grass',
    category: 'producer',
    emoji: '🌾',
    energySource: 'Sunlight (Photosynthesis)',
    funFact: 'Grass grows from the base, which allows it to survive being nibbled by herbivores!',
    scientificDetail: 'Captures photons from sunlight to power the chemical reaction of food making.'
  },
  {
    id: 'brown-bear',
    name: 'Grizzly Bear',
    category: 'consumer',
    dietType: 'omnivore',
    emoji: '🐻',
    energySource: 'Eats berries, roots, salmon, and insects',
    funFact: 'Bears love sweet berries in summer and fatty fish in autumn to get ready for winter hibernation!',
    scientificDetail: 'Omnivorous consumer capable of deriving nutritional energy from both plant and animal tissues.'
  },
  {
    id: 'phytoplankton',
    name: 'Phytoplankton',
    category: 'producer',
    emoji: '🔬',
    energySource: 'Sunlight in Ocean Waters',
    funFact: 'These tiny floating ocean plants make over half of the oxygen on Earth!',
    scientificDetail: 'Microscopic marine producers that form the foundation of almost all ocean food webs.'
  },
  {
    id: 'cottontail-rabbit',
    name: 'Cottontail Rabbit',
    category: 'consumer',
    dietType: 'herbivore',
    emoji: '🐇',
    energySource: 'Eats grasses, clovers, and bark',
    funFact: 'Rabbits have big ears that rotate 270 degrees to listen for approaching predators!',
    scientificDetail: 'Herbivorous consumer that relies exclusively on plant material for sugars and fiber.'
  },
];

/* ============================================================
   GAME 2 DATA: PREDATOR VS PREY DETECTIVE
============================================================ */
export interface PredatorPreyCase {
  id: string;
  ecosystem: string;
  context: string;
  creatures: {
    name: string;
    emoji: string;
    role: 'predator' | 'prey' | 'both';
    defenseOrHuntTrait: string;
    explanation: string;
  }[];
  criticalThinkingQuestion: string;
  keyLearning: string;
}

export const CASES_GAME2: PredatorPreyCase[] = [
  {
    id: 'case-savannah',
    ecosystem: 'African Savanna',
    context: 'At the edge of the watering hole, a lion pride watches a herd of zebras grazing in tall golden grass.',
    creatures: [
      {
        name: 'African Lion',
        emoji: '🦁',
        role: 'predator',
        defenseOrHuntTrait: 'Powerful jaws, sharp retractable claws, stealth teamwork.',
        explanation: 'The Lion is the hunter! It tracks and captures other animals for food energy.'
      },
      {
        name: 'Plains Zebra',
        emoji: '🦓',
        role: 'prey',
        defenseOrHuntTrait: 'Dazzling black-and-white camouflage stripes, alert hearing, high galloping speed.',
        explanation: 'The Zebra is the prey! It grazes on grass and must stay alert to avoid being hunted.'
      }
    ],
    criticalThinkingQuestion: 'Why does the zebra need keen eyesight and herd alert signals?',
    keyLearning: 'Prey animals have special adaptations (like camouflage and fast running) to escape predators!'
  },
  {
    id: 'case-freshwater-pond',
    ecosystem: 'Freshwater Pond',
    context: 'Around the lily pads, mosquitoes swarm. A quick dragonfly swoops to catch them, while a green frog waits silently on a log!',
    creatures: [
      {
        name: 'Mosquito',
        emoji: '🦟',
        role: 'prey',
        defenseOrHuntTrait: 'Tiny size and erratic flight patterns.',
        explanation: 'Mosquitoes are hunted by dragonflies and frogs.'
      },
      {
        name: 'Dragonfly',
        emoji: '🪰',
        role: 'both',
        defenseOrHuntTrait: 'Incredible 360-degree compound eyes and agile aerial hunting agility.',
        explanation: 'The Dragonfly is a PREDATOR to mosquitoes, but PREY to the hungry bullfrog! It is BOTH!'
      },
      {
        name: 'Bullfrog',
        emoji: '🐸',
        role: 'predator',
        defenseOrHuntTrait: 'Lightning-fast sticky tongue and patience sitting motionless.',
        explanation: 'The frog hunts flying dragonflies and insects for food.'
      }
    ],
    criticalThinkingQuestion: 'Can an animal be both a predator AND a prey in the same ecosystem?',
    keyLearning: 'YES! Many middle-chain consumers are predators to smaller creatures, but prey to larger ones!'
  },
  {
    id: 'case-ocean-depths',
    ecosystem: 'Coral Reef & Ocean',
    context: 'Schools of silver herring dart among seaweed. A sleek harbor seal chases them, but keeps an eye open for the great white shark!',
    creatures: [
      {
        name: 'Silver Herring Fish',
        emoji: '🐟',
        role: 'prey',
        defenseOrHuntTrait: 'Swims in huge silver bait balls to confuse hunters.',
        explanation: 'The small fish is prey for hungry seals.'
      },
      {
        name: 'Harbor Seal',
        emoji: '🦭',
        role: 'both',
        defenseOrHuntTrait: 'Streamlined body for underwater speed and sensitive whiskers.',
        explanation: 'The seal is a PREDATOR to fish, but PREY to large sharks!'
      },
      {
        name: 'Great White Shark',
        emoji: '🦈',
        role: 'predator',
        defenseOrHuntTrait: 'Serrated razor teeth and electromagnetic snout sensors.',
        explanation: 'Top apex predator hunting seals and larger marine creatures.'
      }
    ],
    criticalThinkingQuestion: 'What would happen to the fish if all seals disappeared?',
    keyLearning: 'Predators keep prey populations in healthy balance so food does not run out!'
  },
  {
    id: 'case-pine-forest',
    ecosystem: 'Pine Forest at Dusk',
    context: 'A brown beetle crawls on a fallen log. A field mouse snatches it, while high above in a pine tree, a barn owl listens for rustling.',
    creatures: [
      {
        name: 'Wood Beetle',
        emoji: '🪲',
        role: 'prey',
        defenseOrHuntTrait: 'Hard chitin shell and nocturnal crawling.',
        explanation: 'Beetles are hunted by mice and birds.'
      },
      {
        name: 'Field Mouse',
        emoji: '🐁',
        role: 'both',
        defenseOrHuntTrait: 'Quick scurrying reflexes and sensitive twitching whiskers.',
        explanation: 'The mouse is a PREDATOR to bugs, but PREY to the swooping owl!'
      },
      {
        name: 'Barn Owl',
        emoji: '🦉',
        role: 'predator',
        defenseOrHuntTrait: 'Silent fringed wing feathers and exceptional night hearing.',
        explanation: 'The owl is an apex night predator with silent flight.'
      }
    ],
    criticalThinkingQuestion: 'Why does the owl fly completely silently in the dark?',
    keyLearning: 'Predators have special physical traits (adaptations) that make them effective hunters!'
  }
];

/* ============================================================
   GAME 3 DATA: CHAIN CRAFTER (FOOD CHAIN BUILDER)
============================================================ */
export interface FoodChainLevel {
  id: string;
  name: string;
  biome: string;
  description: string;
  nodes: {
    id: string;
    name: string;
    emoji: string;
    roleLabel: 'Energy Origin' | 'Producer' | 'Primary Consumer' | 'Secondary Consumer' | 'Apex Predator';
    dietNote: string;
    energyExplanation: string;
  }[];
  brokenLinkQuestion?: {
    missingIndex: number;
    options: { name: string; emoji: string; isCorrect: boolean; reason: string }[];
  };
}

export const FOOD_CHAINS_GAME3: FoodChainLevel[] = [
  {
    id: 'chain-garden',
    name: 'Garden Meadow Chain',
    biome: 'Backyard Meadow',
    description: 'Assemble how solar energy travels from sunlight through flowers to the garden hawk!',
    nodes: [
      {
        id: 'sun',
        name: 'Sun',
        emoji: '☀️',
        roleLabel: 'Energy Origin',
        dietNote: 'Ultimate energy source for all life on Earth',
        energyExplanation: 'Provides light energy needed for plants to make food.'
      },
      {
        id: 'clover',
        name: 'Clover Plant',
        emoji: '🍀',
        roleLabel: 'Producer',
        dietNote: 'Makes food via Photosynthesis',
        energyExplanation: 'Traps sunlight and produces sugars (food).'
      },
      {
        id: 'snail',
        name: 'Garden Snail',
        emoji: '🐌',
        roleLabel: 'Primary Consumer',
        dietNote: 'Herbivore: Eats fresh clover leaves',
        energyExplanation: 'Gets energy by eating clover leaves.'
      },
      {
        id: 'thrush',
        name: 'Songbird (Thrush)',
        emoji: '🐦',
        roleLabel: 'Secondary Consumer',
        dietNote: 'Carnivore: Eats snails and worms',
        energyExplanation: 'Gets energy by eating the garden snail.'
      },
      {
        id: 'hawk',
        name: 'Sparrowhawk',
        emoji: '🦅',
        roleLabel: 'Apex Predator',
        dietNote: 'Apex Carnivore: Hunts smaller birds',
        energyExplanation: 'Gets energy by hunting the songbird.'
      }
    ],
    brokenLinkQuestion: {
      missingIndex: 2,
      options: [
        { name: 'Garden Snail', emoji: '🐌', isCorrect: true, reason: 'Snails are primary consumers that eat plants!' },
        { name: 'Great White Shark', emoji: '🦈', isCorrect: false, reason: 'Sharks live in the ocean, not garden clover!' },
        { name: 'Sunlight', emoji: '☀️', isCorrect: false, reason: 'The sun is already at the start of the chain!' }
      ]
    }
  },
  {
    id: 'chain-ocean',
    name: 'Marine Ocean Chain',
    biome: 'Open Ocean',
    description: 'Build the marine food chain from microscopic ocean drifters to the mighty killer whale!',
    nodes: [
      {
        id: 'ocean-sun',
        name: 'Sun',
        emoji: '☀️',
        roleLabel: 'Energy Origin',
        dietNote: 'Shines through top sunlit ocean zone',
        energyExplanation: 'Powers marine photosynthesis in ocean surface layers.'
      },
      {
        id: 'phytoplankton',
        name: 'Phytoplankton',
        emoji: '🧫',
        roleLabel: 'Producer',
        dietNote: 'Microscopic plants making food',
        energyExplanation: 'Produces organic food molecules using sunlight in seawater.'
      },
      {
        id: 'zooplankton',
        name: 'Zooplankton (Krill)',
        emoji: '🦐',
        roleLabel: 'Primary Consumer',
        dietNote: 'Herbivorous grazer of phytoplankton',
        energyExplanation: 'Swims and grazes on phytoplankton cells.'
      },
      {
        id: 'trout',
        name: 'Mackerel Fish',
        emoji: '🐟',
        roleLabel: 'Secondary Consumer',
        dietNote: 'Carnivore: Eats schools of krill',
        energyExplanation: 'Gains energy by consuming small shrimp and krill.'
      },
      {
        id: 'orca',
        name: 'Killer Whale (Orca)',
        emoji: '🐋',
        roleLabel: 'Apex Predator',
        dietNote: 'Apex Marine Hunter',
        energyExplanation: 'At the top of the marine chain, hunting larger fish and seals.'
      }
    ],
    brokenLinkQuestion: {
      missingIndex: 2,
      options: [
        { name: 'Zooplankton (Krill)', emoji: '🦐', isCorrect: true, reason: 'Krill are primary consumers that graze on phytoplankton!' },
        { name: 'Caterpillar', emoji: '🐛', isCorrect: false, reason: 'Caterpillars live on land leaves, not open sea water!' },
        { name: 'Polar Bear', emoji: '🐻‍❄️', isCorrect: false, reason: 'Polar bears are top carnivores, not middle grazers here!' }
      ]
    }
  },
  {
    id: 'chain-savanna',
    name: 'African Savanna Chain',
    biome: 'Tropical Grassland',
    description: 'Connect the energy flow from acacia trees under the equatorial sun to the savanna lion!',
    nodes: [
      {
        id: 'savanna-sun',
        name: 'Sun',
        emoji: '☀️',
        roleLabel: 'Energy Origin',
        dietNote: 'Abundant warm tropical sunlight',
        energyExplanation: 'Beams solar rays across the vast grasslands.'
      },
      {
        id: 'acacia',
        name: 'Acacia Tree',
        emoji: '🌳',
        roleLabel: 'Producer',
        dietNote: 'Photosynthesizing thorny savanna tree',
        energyExplanation: 'Roots draw deep groundwater while leaves capture sunlight.'
      },
      {
        id: 'giraffe',
        name: 'Giraffe',
        emoji: '🦒',
        roleLabel: 'Primary Consumer',
        dietNote: 'Herbivore: Feeds on high acacia canopy',
        energyExplanation: 'Uses long neck and tough tongue to browse acacia leaves.'
      },
      {
        id: 'lion',
        name: 'Lion',
        emoji: '🦁',
        roleLabel: 'Apex Predator',
        dietNote: 'Carnivore: Hunts large grazing herbivores',
        energyExplanation: 'Obtains energy by stalking and hunting herbivores.'
      }
    ],
    brokenLinkQuestion: {
      missingIndex: 2,
      options: [
        { name: 'Giraffe', emoji: '🦒', isCorrect: true, reason: 'Giraffes eat acacia leaves as primary consumers!' },
        { name: 'Woodpecker', emoji: '🪵', isCorrect: false, reason: 'Woodpeckers don\'t live on open African acacia plains!' },
        { name: 'Pond Algae', emoji: '🌿', isCorrect: false, reason: 'Algae is an aquatic plant, not an African herbivore!' }
      ]
    }
  },
  {
    id: 'chain-pond',
    name: 'Freshwater Pond Chain',
    biome: 'Still Water Wetland',
    description: 'Discover how sunlight in a freshwater pond supports insects, frogs, and majestic herons!',
    nodes: [
      {
        id: 'pond-sun',
        name: 'Sun',
        emoji: '☀️',
        roleLabel: 'Energy Origin',
        dietNote: 'Warms shallow pond water',
        energyExplanation: 'Provides light rays for submerged and floating plants.'
      },
      {
        id: 'pond-algae',
        name: 'Green Pond Algae',
        emoji: '🌿',
        roleLabel: 'Producer',
        dietNote: 'Produces food via Photosynthesis',
        energyExplanation: 'Forms green carpets that make sugar using pond water and sunlight.'
      },
      {
        id: 'water-beetle',
        name: 'Water Beetle Larva',
        emoji: '🪲',
        roleLabel: 'Primary Consumer',
        dietNote: 'Herbivore: Grazes on soft pond algae',
        energyExplanation: 'Nibbles on algae fibers for energy.'
      },
      {
        id: 'bullfrog',
        name: 'Green Bullfrog',
        emoji: '🐸',
        roleLabel: 'Secondary Consumer',
        dietNote: 'Carnivore: Eats aquatic insects',
        energyExplanation: 'Catches swimming water beetles with quick strikes.'
      },
      {
        id: 'heron',
        name: 'Great Blue Heron',
        emoji: '🦩',
        roleLabel: 'Apex Predator',
        dietNote: 'Wading Carnivore: Hunts frogs and fish',
        energyExplanation: 'Stalks the shallows with sharp beak to catch frogs.'
      }
    ],
    brokenLinkQuestion: {
      missingIndex: 3,
      options: [
        { name: 'Green Bullfrog', emoji: '🐸', isCorrect: true, reason: 'Frogs eat aquatic water beetles and are hunted by herons!' },
        { name: 'Desert Camel', emoji: '🐫', isCorrect: false, reason: 'Camels inhabit dry deserts, not pond wetlands!' },
        { name: 'Tiger Shark', emoji: '🦈', isCorrect: false, reason: 'Tiger sharks are saltwater marine predators!' }
      ]
    }
  }
];

/* ============================================================
   GAME 4 DATA: ECO-BALANCE RIPPLE EFFECT SIMULATION
============================================================ */
export interface EcoCrisisScenario {
  id: string;
  title: string;
  badge: string;
  story: string;
  shockEvent: string;
  labels?: {
    producer: string;
    producerEmoji: string;
    herbivore: string;
    herbivoreEmoji: string;
    predator: string;
    predatorEmoji: string;
  };
  initialCounts: {
    grass: number;
    rabbits: number;
    foxes: number;
  };
  afterCounts: {
    grass: number;
    rabbits: number;
    foxes: number;
  };
  inquiryQuestion: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  ecoTakeaway: string;
}

export const CRISIS_SCENARIOS_GAME4: EcoCrisisScenario[] = [
  {
    id: 'drought',
    title: 'The Great Summer Drought',
    badge: 'Producers Affected',
    story: 'No rain has fallen for three months! The scorching sun bakes the soil, causing 75% of the green meadow grass to wither and turn brown.',
    shockEvent: 'Grass Producer Drop (-75%)',
    labels: {
      producer: 'Meadow Grass',
      producerEmoji: '🌾',
      herbivore: 'Meadow Rabbits',
      herbivoreEmoji: '🐇',
      predator: 'Red Foxes',
      predatorEmoji: '🦊'
    },
    initialCounts: { grass: 100, rabbits: 50, foxes: 10 },
    afterCounts: { grass: 25, rabbits: 15, foxes: 3 },
    inquiryQuestion: 'What will happen to the Rabbits and Foxes when the Grass withers away?',
    options: [
      {
        text: 'Both Rabbits and Foxes will decrease because there is less food energy at the bottom of the chain.',
        isCorrect: true,
        explanation: 'Correct! When producers shrink, herbivores starve. Without enough rabbits, foxes also starve!'
      },
      {
        text: 'Foxes will increase because they can just eat grass instead.',
        isCorrect: false,
        explanation: 'Incorrect! Foxes are carnivores; their digestive systems cannot survive on grass!'
      },
      {
        text: 'Nothing changes because animals can survive without plant energy.',
        isCorrect: false,
        explanation: 'Incorrect! All energy in the food chain begins with the producers!'
      }
    ],
    ecoTakeaway: 'Producers support the entire food chain! If producers decrease, all consumers above them suffer.'
  },
  {
    id: 'fox-loss',
    title: 'Disappearance of Apex Predators',
    badge: 'Top Consumer Disruption',
    story: 'Due to illegal hunting, all the foxes in the meadow are removed. Suddenly, there are no predators hunting the rabbits!',
    shockEvent: 'Foxes Removed (0%)',
    labels: {
      producer: 'Meadow Clover',
      producerEmoji: '🍀',
      herbivore: 'Cottontail Rabbits',
      herbivoreEmoji: '🐇',
      predator: 'Red Foxes',
      predatorEmoji: '🦊'
    },
    initialCounts: { grass: 100, rabbits: 40, foxes: 10 },
    afterCounts: { grass: 10, rabbits: 120, foxes: 0 },
    inquiryQuestion: 'What happens immediately to the Rabbit population and the Meadow Grass?',
    options: [
      {
        text: 'Rabbits multiply rapidly and eat almost all the grass, leading to overgrazing!',
        isCorrect: true,
        explanation: 'Spot on! Without predators, herbivores overpopulate and strip all plant life bare.'
      },
      {
        text: 'Rabbits also disappear because they miss their predator friends.',
        isCorrect: false,
        explanation: 'Incorrect! Rabbits don\'t rely on predators to survive; they multiply when hunting stops.'
      },
      {
        text: 'The grass grows twice as tall because no animals are left.',
        isCorrect: false,
        explanation: 'Incorrect! A massive rabbit swarm will eat the grass down to the roots!'
      }
    ],
    ecoTakeaway: 'Predators are essential protectors of ecosystems! They keep herbivore numbers in check so plants are not wiped out.'
  },
  {
    id: 'fertilizer-boost',
    title: 'Spring Rain & Plentiful Grass',
    badge: 'Producer Abundance',
    story: 'Gentle warm rains and plenty of sunshine cause grass and clovers to grow super lush and tall across the whole prairie!',
    shockEvent: 'Grass Producer Surge (+100%)',
    labels: {
      producer: 'Prairie Grass',
      producerEmoji: '🌾',
      herbivore: 'Prairie Rabbits',
      herbivoreEmoji: '🐇',
      predator: 'Prairie Foxes',
      predatorEmoji: '🦊'
    },
    initialCounts: { grass: 50, rabbits: 30, foxes: 8 },
    afterCounts: { grass: 100, rabbits: 65, foxes: 16 },
    inquiryQuestion: 'How does an increase in Grass producers affect the Consumers in the food chain?',
    options: [
      {
        text: 'More food for rabbits allows rabbit numbers to grow, which in turn feeds more healthy foxes!',
        isCorrect: true,
        explanation: 'Brilliant! More energy entering the base of the chain supports larger consumer populations.'
      },
      {
        text: 'The rabbits and foxes decrease because tall grass is too hard to walk through.',
        isCorrect: false,
        explanation: 'Incorrect! More grass simply means more nutritious food available for consumers.'
      },
      {
        text: 'Only rabbits increase, but foxes cannot change at all.',
        isCorrect: false,
        explanation: 'Incorrect! More rabbits provide abundant food for mother foxes to raise more healthy kits!'
      }
    ],
    ecoTakeaway: 'Energy flows upward! More plant energy at the foundation means more animals can be sustained throughout the chain.'
  },
  {
    id: 'locust-swarm',
    title: 'Invasive Locust Swarm',
    badge: 'Resource Competition',
    story: 'A massive swarm of invasive desert locusts sweeps through the savanna, devouring 80% of grasses and young acacia leaves before native gazelles can graze!',
    shockEvent: 'Invasive Competitor Consumes Plants (-80%)',
    labels: {
      producer: 'Savanna Grass & Acacia',
      producerEmoji: '🌾',
      herbivore: 'Native Gazelles',
      herbivoreEmoji: '🦌',
      predator: 'Cheetahs',
      predatorEmoji: '🐆'
    },
    initialCounts: { grass: 95, rabbits: 60, foxes: 12 },
    afterCounts: { grass: 20, rabbits: 18, foxes: 4 },
    inquiryQuestion: 'What happens to the native gazelles and cheetahs when locusts eat all the plants?',
    options: [
      {
        text: 'Gazelles starve or flee because their food is consumed, causing hungry cheetahs to decline too!',
        isCorrect: true,
        explanation: 'Exactly! When an invasive competitor eats the producers, native herbivores starve, which ripples upward to top predators.'
      },
      {
        text: 'Cheetahs will start eating locusts instead of meat and double in population.',
        isCorrect: false,
        explanation: 'Incorrect! Large carnivores like cheetahs require large prey and cannot survive on tiny insects.'
      },
      {
        text: 'Gazelles can survive without eating any plants.',
        isCorrect: false,
        explanation: 'Incorrect! Gazelles are herbivores and must have plant food energy to survive.'
      }
    ],
    ecoTakeaway: 'Invasive competitors disrupt food chains! If invasive species strip the producers, native herbivores and predators both decline.'
  },
  {
    id: 'coral-bleaching',
    title: 'Coral Reef Ocean Heatwave',
    badge: 'Marine Ecosystem Collapse',
    story: 'Record high sea temperatures cause coral bleaching, destroying 75% of the microscopic algae and living coral polyps that form the foundation of the reef!',
    shockEvent: 'Reef Producer Bleaching (-75%)',
    labels: {
      producer: 'Reef Algae & Corals',
      producerEmoji: '🪸',
      herbivore: 'Parrotfish Grazers',
      herbivoreEmoji: '🐠',
      predator: 'Reef Sharks',
      predatorEmoji: '🦈'
    },
    initialCounts: { grass: 100, rabbits: 55, foxes: 14 },
    afterCounts: { grass: 25, rabbits: 16, foxes: 3 },
    inquiryQuestion: 'How does the loss of reef producers affect herbivorous parrotfish and reef sharks?',
    options: [
      {
        text: 'Parrotfish lose both their algae food and shelter, so they drop sharply, leaving sharks with few prey!',
        isCorrect: true,
        explanation: 'Spot on! Marine food chains depend on photosynthetic algae. When coral bleaches, the entire marine pyramid suffers.'
      },
      {
        text: 'Sharks will become herbivores and eat underwater rocks.',
        isCorrect: false,
        explanation: 'Incorrect! Sharks are apex carnivores; they cannot digest rocks or seaweed.'
      },
      {
        text: 'Parrotfish will multiply because warm water gives them extra swimming energy.',
        isCorrect: false,
        explanation: 'Incorrect! Without their food source, parrotfish face starvation regardless of water temperature.'
      }
    ],
    ecoTakeaway: 'Marine balance! Algae and corals are the producers of the ocean; losing them collapses fish and shark populations alike.'
  },
  {
    id: 'forest-wildfire',
    title: 'Pine Forest Wildfire & Recovery',
    badge: 'Natural Disturbance',
    story: 'A summer lightning strike ignites a wildfire that sweeps through the pine woodland, burning 85% of understory seedlings, shrubs, and pinecones.',
    shockEvent: 'Fire Consumes Producers (-85%)',
    labels: {
      producer: 'Pine Seedlings & Berries',
      producerEmoji: '🌲',
      herbivore: 'Tree Squirrels',
      herbivoreEmoji: '🐿️',
      predator: 'Woodland Owls',
      predatorEmoji: '🦉'
    },
    initialCounts: { grass: 90, rabbits: 48, foxes: 11 },
    afterCounts: { grass: 15, rabbits: 12, foxes: 2 },
    inquiryQuestion: 'What happens to seed-eating squirrels and hunting owls immediately after the fire?',
    options: [
      {
        text: 'Squirrels lose their seed food and tree homes; without squirrels, owls have very few prey to hunt!',
        isCorrect: true,
        explanation: 'Correct! Destruction of producer biomass starves primary consumers and forces predators to hunt elsewhere.'
      },
      {
        text: 'Owls will start eating ash and pine needles directly.',
        isCorrect: false,
        explanation: 'Incorrect! Owls are birds of prey; they can only digest meat from animals.'
      },
      {
        text: 'Squirrels double in number because smoke hides them from enemies.',
        isCorrect: false,
        explanation: 'Incorrect! Without seeds and nuts, squirrels cannot nourish their families.'
      }
    ],
    ecoTakeaway: 'Habitats require producer recovery! When wildfires consume vegetation, animal populations crash until new seedlings sprout.'
  },
  {
    id: 'pesticide-crisis',
    title: 'Orchard Chemical Spraying Disaster',
    badge: 'Consumer Food Vanishes',
    story: 'A fruit grower sprays a synthetic insecticide that wipes out 90% of caterpillars and small insect herbivores living in the orchard trees.',
    shockEvent: 'Insecticides Eliminate Herbivores (-90%)',
    labels: {
      producer: 'Fruit Tree Foliage',
      producerEmoji: '🍎',
      herbivore: 'Caterpillar Herbivores',
      herbivoreEmoji: '🐛',
      predator: 'Orchard Bluebirds',
      predatorEmoji: '🐦'
    },
    initialCounts: { grass: 80, rabbits: 50, foxes: 10 },
    afterCounts: { grass: 80, rabbits: 5, foxes: 2 },
    inquiryQuestion: 'What happens to the insect-eating bluebirds when caterpillars are eliminated?',
    options: [
      {
        text: 'Bluebird parents cannot find food for their chicks, leading to a severe collapse in bird numbers!',
        isCorrect: true,
        explanation: 'Brilliant! Secondary consumers depend directly on primary consumers for energy. Removing insects starves the birds!'
      },
      {
        text: 'Bluebirds will grow three times bigger without insects bothering them.',
        isCorrect: false,
        explanation: 'Incorrect! Without their food source, animals starve; they do not grow bigger.'
      },
      {
        text: 'Trees will stop making food from the sun.',
        isCorrect: false,
        explanation: 'Incorrect! Trees still have sunlight, but the food chain connection to birds is broken.'
      }
    ],
    ecoTakeaway: 'Middle consumers matter! Removing herbivores like insects breaks the energy pathway between plants and predatory birds.'
  },
  {
    id: 'wolf-restoration',
    title: 'Return of the Wolves (Trophic Cascade)',
    badge: 'Ecosystem Restoration',
    story: 'Wildlife biologists reintroduce grey wolves into a valley where elk had been overgrazing willow trees along the riverbank for over 50 years!',
    shockEvent: 'Apex Predator Reintroduced (+100%)',
    labels: {
      producer: 'River Willows & Aspens',
      producerEmoji: '🌿',
      herbivore: 'Elk & Deer Herds',
      herbivoreEmoji: '🦌',
      predator: 'Grey Wolves',
      predatorEmoji: '🐺'
    },
    initialCounts: { grass: 15, rabbits: 110, foxes: 2 },
    afterCounts: { grass: 85, rabbits: 45, foxes: 12 },
    inquiryQuestion: 'How does bringing back apex wolves help riverbank willows and aspen trees flourish?',
    options: [
      {
        text: 'Wolves hunt and keep elk moving, so elk stop overeating riverside willows, allowing forests to regrow!',
        isCorrect: true,
        explanation: 'Trophic Cascade! By keeping herbivore numbers and grazing habits in check, apex predators allow plants to recover.'
      },
      {
        text: 'Wolves eat the willow branches directly to trim them neatly.',
        isCorrect: false,
        explanation: 'Incorrect! Wolves are carnivores; they hunt deer and elk, not plants.'
      },
      {
        text: 'Wolves wipe out all elk until zero remain on the planet.',
        isCorrect: false,
        explanation: 'Incorrect! Natural predators reduce and balance prey herds, but do not drive them extinct.'
      }
    ],
    ecoTakeaway: 'Trophic Cascade! Top predators maintain healthy vegetation by preventing herbivores from over-grazing riverbanks.'
  },
  {
    id: 'kelp-otter-loss',
    title: 'Kelp Forest & Urchin Barrens',
    badge: 'Keystone Species Loss',
    story: 'Along the Pacific coastline, sea otters disappear due to historic fur hunting. Suddenly, nothing is eating the spiny purple sea urchins!',
    shockEvent: 'Sea Otters Disappear (0%)',
    labels: {
      producer: 'Giant Kelp Seaweed',
      producerEmoji: '🌿',
      herbivore: 'Purple Sea Urchins',
      herbivoreEmoji: '🦔',
      predator: 'Sea Otters',
      predatorEmoji: '🦦'
    },
    initialCounts: { grass: 100, rabbits: 35, foxes: 10 },
    afterCounts: { grass: 5, rabbits: 130, foxes: 0 },
    inquiryQuestion: 'What happens to the Giant Kelp underwater forest when sea urchin numbers explode?',
    options: [
      {
        text: 'Urchins multiply unchecked and chew through the kelp holdfasts, turning lush forests into underwater barrens!',
        isCorrect: true,
        explanation: 'Spot on! Known as "Urchin Barrens": Without otter predation, urchins consume the entire kelp forest, destroying homes for fish.'
      },
      {
        text: 'Sea urchins plant new kelp gardens to make soft beds.',
        isCorrect: false,
        explanation: 'Incorrect! Sea urchins are voracious grazers that consume plant tissue, not plant growers.'
      },
      {
        text: 'Giant kelp grows legs and walks away to deeper water.',
        isCorrect: false,
        explanation: 'Incorrect! Kelp is anchored to seafloor rocks and cannot escape herbivores.'
      }
    ],
    ecoTakeaway: 'Keystone species! Sea otters protect marine plant forests by regulating the herbivores that graze upon them.'
  },
  {
    id: 'conservation-corridor',
    title: 'Protected Wildlife Corridor',
    badge: 'Connected Equilibrium',
    story: 'Park rangers plant a lush canopy corridor connecting two isolated rainforest reserves, allowing wild grazers and big cats to roam freely!',
    shockEvent: 'Habitat Reconnected (+50% Healthy Balance)',
    labels: {
      producer: 'Canopy Trees & Fruit',
      producerEmoji: '🌳',
      herbivore: 'Tapirs & Monkeys',
      herbivoreEmoji: '🐒',
      predator: 'Jaguars',
      predatorEmoji: '🐆'
    },
    initialCounts: { grass: 50, rabbits: 30, foxes: 6 },
    afterCounts: { grass: 90, rabbits: 60, foxes: 14 },
    inquiryQuestion: 'Why does reconnecting habitats help producers, herbivores, and predators all thrive together?',
    options: [
      {
        text: 'Animals can roam for food and mates without overgrazing any single zone, maintaining natural balance!',
        isCorrect: true,
        explanation: 'Magnificent! Connected landscapes prevent overgrazing, spread plant seeds, and allow predators to maintain healthy prey numbers.'
      },
      {
        text: 'Jaguars stop hunting and live on tree leaves instead.',
        isCorrect: false,
        explanation: 'Incorrect! Jaguars remain carnivorous apex predators.'
      },
      {
        text: 'Plants stop needing sunshine because animals visit more often.',
        isCorrect: false,
        explanation: 'Incorrect! Plants always require sunlight for photosynthesis.'
      }
    ],
    ecoTakeaway: 'Interdependence & Balance! Protecting the relationships between soil, plants, herbivores, and predators preserves life on Earth.'
  }
];
