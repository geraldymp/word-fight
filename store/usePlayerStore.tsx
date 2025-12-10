import { STORAGE_KEYS } from '@constants/storageKeys';
import {
  DEFAULT_UPGRADE_LIST,
  UpgradeDefinition
} from 'app/constants/pointUpgrades';
import { createMMKV } from 'react-native-mmkv';
import { create } from 'zustand';

const storage = createMMKV();

const { PLAYER_STATUS } = STORAGE_KEYS;

interface PlayerState {
  level: number;
  exp: number;
  expNeeded: number;
  tempBattleExp: number;
  addTempExp: (amount: number) => void;
  applyTempExp: () => void;
  resetTempExp: () => void;

  upgradePoints: number;
  usedUpgradePoints: number;
  upgrades: UpgradeDefinition[];
  upgradeStat: (id: string) => void;
  resetUpgrades: () => void;
  loadProfile: () => void;

  // for DEV
  resetProfile: () => void;
}

const BASE_EXP_NEEDED = 100;
const EXP_PER_LEVEL = 20;

export const usePlayerStore = create<PlayerState>((set, get) => ({
  level: 1,
  exp: 0,
  expNeeded: BASE_EXP_NEEDED,
  upgradePoints: 0,
  usedUpgradePoints: 0,
  upgrades: DEFAULT_UPGRADE_LIST.map(u => ({ ...u })),
  tempBattleExp: 0,

  addTempExp: amount => {
    set(state => ({ tempBattleExp: state.tempBattleExp + amount }));
  },

  applyTempExp: () => {
    let { level, exp, expNeeded, upgradePoints, tempBattleExp } = get();
    exp += tempBattleExp;

    while (exp >= expNeeded) {
      exp -= expNeeded;
      level += 1;
      upgradePoints += 2;
      expNeeded = BASE_EXP_NEEDED + level * EXP_PER_LEVEL;
    }

    const newProfile = {
      ...get(),
      level,
      exp,
      expNeeded,
      upgradePoints,
      tempBattleExp: 0
    };
    storage.set(PLAYER_STATUS, JSON.stringify(newProfile));
    set(newProfile);
  },

  resetTempExp: () => set({ tempBattleExp: 0 }),

  loadProfile: () => {
    const saved = storage.getString(PLAYER_STATUS);
    if (saved) {
      const parsed: PlayerState = JSON.parse(saved);
      set(state => ({
        ...state,
        ...parsed,
        upgrades: parsed.upgrades || state.upgrades
      }));
    }
  },

  resetProfile: () => {
    storage.remove(PLAYER_STATUS);
    set({
      level: 1,
      exp: 0,
      expNeeded: BASE_EXP_NEEDED,
      upgradePoints: 0,
      tempBattleExp: 0,
      upgrades: DEFAULT_UPGRADE_LIST.map(u => ({ ...u })),
      usedUpgradePoints: 0
    });
  },

  upgradeStat: id => {
    const { upgrades, upgradePoints, usedUpgradePoints } = get();
    // Find the upgrade item and validate
    const index = upgrades.findIndex(u => u.id === id);
    if (index === -1) return;

    // Check if can upgrade
    const item = upgrades[index];
    if (item.level >= item.maxLevel) return;

    // Check if enough available points
    const cost = item.costs[item.level];
    if (upgradePoints < cost) return;

    // Apply upgrade
    const updated = [...upgrades];
    updated[index] = { ...item, level: item.level + 1 };

    const newState = {
      ...get(),
      upgrades: updated,
      upgradePoints: upgradePoints - cost,
      usedUpgradePoints: usedUpgradePoints + cost
    };
    storage.set(PLAYER_STATUS, JSON.stringify(newState));

    set({
      upgrades: updated,
      upgradePoints: upgradePoints - cost,
      usedUpgradePoints: usedUpgradePoints + cost
    });
  },

  resetUpgrades: () => {
    const { upgrades, upgradePoints, usedUpgradePoints } = get();
    let refunded = 0;

    for (const u of upgrades) {
      for (let i = 0; i < u.level; i++) {
        refunded += u.costs[i];
      }
    }

    const newState = {
      ...get(),
      upgrades: DEFAULT_UPGRADE_LIST.map(u => ({ ...u })),
      usedUpgradePoints: usedUpgradePoints - refunded,
      upgradePoints: upgradePoints + refunded
    };
    storage.set(PLAYER_STATUS, JSON.stringify(newState));

    set({
      upgrades: DEFAULT_UPGRADE_LIST.map(u => ({ ...u })),
      usedUpgradePoints: usedUpgradePoints - refunded,
      upgradePoints: upgradePoints + refunded
    });
  }
}));
