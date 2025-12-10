import { UpgradeDefinition } from 'app/constants/pointUpgrades';

export function getManaFromUpgrades(upgrades: UpgradeDefinition[]) {
  if (!upgrades) return 0;

  const manaUpgrade = upgrades.find(u => u.type === 'mana');
  if (!manaUpgrade || manaUpgrade.level <= 0) return 0;

  return manaUpgrade.bonusPerLevel * manaUpgrade.level;
}
