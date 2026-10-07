import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

export interface GameScore {
  stars: number; // 0 to 3
  completed: boolean;
  highScore: number;
}

export interface StudentProgress {
  studentName: string;
  game1: GameScore;
  game2: GameScore;
  game3: GameScore;
  game4: GameScore;
  soundEnabled: boolean;
  voiceEnabled: boolean;
}

const DEFAULT_PROGRESS: StudentProgress = {
  studentName: 'Science Explorer',
  game1: { stars: 0, completed: false, highScore: 0 },
  game2: { stars: 0, completed: false, highScore: 0 },
  game3: { stars: 0, completed: false, highScore: 0 },
  game4: { stars: 0, completed: false, highScore: 0 },
  soundEnabled: true,
  voiceEnabled: true,
};

interface ProgressContextType {
  progress: StudentProgress;
  updateStudentName: (name: string) => void;
  recordGameResult: (gameKey: 'game1' | 'game2' | 'game3' | 'game4', stars: number, score: number) => void;
  toggleSound: () => void;
  toggleVoice: () => void;
  triggerCelebration: () => void;
  resetProgress: () => void;
  totalStars: number;
  totalBadges: number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<StudentProgress>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('food_chain_quest_progress');
        if (saved) {
          return { ...DEFAULT_PROGRESS, ...JSON.parse(saved) };
        }
      } catch {
        // Fallback to default
      }
    }
    return DEFAULT_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('food_chain_quest_progress', JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  const updateStudentName = (name: string) => {
    setProgress((prev) => ({
      ...prev,
      studentName: name.trim() || 'Science Explorer',
    }));
  };

  const triggerCelebration = () => {
    soundManager.playFanfare();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#06B6D4', '#F59E0B', '#EC4899', '#8B5CF6'],
    });
  };

  const recordGameResult = (gameKey: 'game1' | 'game2' | 'game3' | 'game4', stars: number, score: number) => {
    setProgress((prev) => {
      const current = prev[gameKey];
      const newStars = Math.max(current.stars, stars);
      const newHighScore = Math.max(current.highScore, score);
      const isNewCompletion = !current.completed && newStars > 0;

      if (isNewCompletion || newStars > current.stars) {
        setTimeout(triggerCelebration, 200);
      }

      return {
        ...prev,
        [gameKey]: {
          stars: newStars,
          completed: newStars >= 1,
          highScore: newHighScore,
        },
      };
    });
  };

  const toggleSound = () => {
    const nextState = !progress.soundEnabled;
    soundManager.setSoundEnabled(nextState);
    setProgress((prev) => ({ ...prev, soundEnabled: nextState }));
  };

  const toggleVoice = () => {
    const nextState = !progress.voiceEnabled;
    soundManager.setVoiceEnabled(nextState);
    setProgress((prev) => ({ ...prev, voiceEnabled: nextState }));
  };

  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    try {
      localStorage.removeItem('food_chain_quest_progress');
    } catch {
      // ignore
    }
  };

  const totalStars =
    progress.game1.stars + progress.game2.stars + progress.game3.stars + progress.game4.stars;

  const totalBadges = [
    progress.game1.completed,
    progress.game2.completed,
    progress.game3.completed,
    progress.game4.completed,
  ].filter(Boolean).length;

  return (
    <ProgressContext.Provider
      value={{
        progress,
        updateStudentName,
        recordGameResult,
        toggleSound,
        toggleVoice,
        triggerCelebration,
        resetProgress,
        totalStars,
        totalBadges,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return ctx;
};
