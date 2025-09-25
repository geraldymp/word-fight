// store/useSubscriptionStore.ts
import Purchases, { CustomerInfo } from 'react-native-purchases';
import { create } from 'zustand';

type SubscriptionState = {
  isPremium: boolean;
  setFromCustomerInfo: (info: CustomerInfo) => void;
  refresh: () => Promise<void>;
};

export const useSubscriptionStore = create<SubscriptionState>(set => ({
  isPremium: false,

  setFromCustomerInfo: info => {
    const premiumActive = info.entitlements.active['Monthly Pro'] !== undefined;
    set({ isPremium: premiumActive });
  },

  refresh: async () => {
    try {
      const info = await Purchases.getCustomerInfo();
      const premiumActive =
        info.entitlements.active['Monthly Pro'] !== undefined;
      set({ isPremium: premiumActive });
    } catch (e) {
      console.warn('Failed to refresh subscription', e);
    }
  }
}));
