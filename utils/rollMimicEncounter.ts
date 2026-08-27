import { KeyValues } from 'app/constants/keyValues';
import { mimics } from 'app/constants/mimics';
import { IEnemy } from 'app/types/IEnemy';

const { eligibleSteps, eligiblePositions, chance } = KeyValues.mimic;

function getRandomMimic(): IEnemy {
  return mimics[Math.floor(Math.random() * mimics.length)];
}

export function rollMimicEncounter(
  baseEnemies: IEnemy[],
  step: number
): IEnemy[] {
  // not an eligible step, return untouched
  if (!eligibleSteps.includes(step)) {
    return baseEnemies;
  }

  // roll the odds
  if (Math.random() > chance) {
    return baseEnemies;
  }

  // pick a random eligible position that actually exists in this list
  const validPositions = eligiblePositions.filter(
    pos => pos < baseEnemies.length
  );
  if (validPositions.length === 0) {
    return baseEnemies;
  }

  const targetIndex =
    validPositions[Math.floor(Math.random() * validPositions.length)];

  // copy the array, don't mutate the original enemies.tsx data
  const result = [...baseEnemies];
  result[targetIndex] = getRandomMimic();

  return result;
}
