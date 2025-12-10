import { UpgradeDefinition } from 'app/constants/pointUpgrades';

export function getDamageFromUpgrades(
  word: string,
  upgrades: UpgradeDefinition[]
) {
  if (!word || !upgrades) return 0;

  const letters = word.toUpperCase().split('');
  let totalBonus = 0;

  for (const upgrade of upgrades) {
    // Only damage-type upgrades affect damage
    if (upgrade.type !== 'damage') continue;
    if (upgrade.level <= 0) continue; // no bonus

    const perLetterBonus = upgrade.bonusPerLevel * upgrade.level;

    // Count matched letters
    for (const letter of letters) {
      if (upgrade.letters?.includes(letter)) {
        totalBonus += perLetterBonus;
      }
    }
  }

  return totalBonus;
}
