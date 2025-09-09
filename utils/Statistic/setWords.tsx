import { updateStats } from './getAllStatistics';

export async function setWordsStatistic(word: string, damage: number) {
  updateStats(currentStat => {
    currentStat.totalDamage += damage;
    currentStat.totalWords += 1;
    currentStat.totalLength += word.length;
  });
}
