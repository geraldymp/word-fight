export interface AdStoreType {
  magicHutPotion: {
    potionLimit: number;
    currentPotionUsed: number;
    increasePotionUsed: () => void;
    resetPotionUsed: () => void;
  };
}
