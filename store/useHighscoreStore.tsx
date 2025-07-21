import { create } from 'zustand';

interface HighscoreState {
    lowestHighscore: number | null
    setLowestHighscore: (score: number) => void;
}

export const useHighscoreStore = create<HighscoreState>(set => ({
    lowestHighscore: null,
    setLowestHighscore: score => set({ lowestHighscore: score })
}))