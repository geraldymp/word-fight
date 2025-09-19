import { create } from 'zustand';

interface MagicHutStoreType {
  purchasedItemIds: string[];
  addPurchasedItemId: (id: string) => void;
  resetPurchasedItems: () => void;
}

export const useMagicHutStore = create<MagicHutStoreType>((set, get) => ({
  purchasedItemIds: [],
  addPurchasedItemId: id =>
    set(state => ({ purchasedItemIds: [...state.purchasedItemIds, id] })),
  resetPurchasedItems: () => set({ purchasedItemIds: [] })
}));
