import { create } from 'zustand';

interface MagicHutStoreType {
  purchasedItemIds: string[];
  setPurchasedItemIds: (ids: string[]) => void;
  addPurchasedItemId: (id: string) => void;
  resetPurchasedItems: () => void;
}

export const useMagicHutStore = create<MagicHutStoreType>((set, get) => ({
  purchasedItemIds: [],
  setPurchasedItemIds: ids => set({ purchasedItemIds: ids }),

  addPurchasedItemId: id =>
    set(state => ({ purchasedItemIds: [...state.purchasedItemIds, id] })),
  resetPurchasedItems: () => set({ purchasedItemIds: [] })
}));
