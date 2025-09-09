import { updateStats } from './getAllStatistics';

export async function setBossBeatenStatistic() {
  updateStats(currentStat => {
    currentStat.totalBossBeaten += 1;
  });
}
