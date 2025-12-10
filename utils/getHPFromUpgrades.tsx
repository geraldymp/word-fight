import { UpgradeDefinition } from 'app/constants/pointUpgrades';

export function getBonusHPFromUpgrades(upgrades: UpgradeDefinition[]) {
  if (!upgrades) return 0;

  const hpUpgrade = upgrades.find(u => u.type === 'hp');
  if (!hpUpgrade || hpUpgrade.level <= 0) return 0;

  return hpUpgrade.bonusPerLevel * hpUpgrade.level;
}
