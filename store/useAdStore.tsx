import { create } from 'zustand';
import { AdStoreType } from './AdStoreType';

export const useAdStore = create<AdStoreType>((set, get) => ({
  magicHutPotion: {
    potionLimit: 2,
    currentPotionUsed: 0,
    increasePotionUsed: () =>
      set(state => ({
        magicHutPotion: {
          ...state.magicHutPotion,
          currentPotionUsed: state.magicHutPotion.currentPotionUsed + 1
        }
      })),
    resetPotionUsed: () =>
      set(state => ({
        magicHutPotion: {
          ...state.magicHutPotion,
          currentPotionUsed: 0
        }
      }))
  }
}));
