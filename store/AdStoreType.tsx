export interface AdStoreType {
  magicHutPotion: {
    potionLimit: number;
    currentPotionUsed: number;
    setPotionUsed: (potionUsed: number) => void;
    increasePotionUsed: () => void;
    resetPotionUsed: () => void;
  };
}
