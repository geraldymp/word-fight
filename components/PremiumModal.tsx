import Colors from 'app/foundation/colors';
import { moderateScale, scale, verticalScale } from 'app/utils/sizeScaling';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Purchases, { PurchasesPackage } from 'react-native-purchases';
import { useSubscriptionStore } from '../store/useSubscriptionStore';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function PremiumModal({ visible, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [offer, setOffer] = useState<PurchasesPackage | null>(null);

  const isPremium = useSubscriptionStore(s => s.isPremium);
  const setFromCustomerInfo = useSubscriptionStore(s => s.setFromCustomerInfo);

  useEffect(() => {
    if (visible) {
      loadOffer();
    }
  }, [visible]);

  async function loadOffer() {
    setLoading(true);
    try {
      const offerings = await Purchases.getOfferings();
      if (offerings.current && offerings.current.availablePackages.length > 0) {
        setOffer(offerings.current.availablePackages[0]);
      }
    } catch (e) {
      console.warn('Error fetching offerings', e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubscribe() {
    if (!offer) return;
    setLoading(true);
    try {
      const purchaseResult = await Purchases.purchasePackage(offer);
      setFromCustomerInfo(purchaseResult.customerInfo);
      onClose();
    } catch (e: any) {
      if (!e.userCancelled) {
        console.warn('Purchase error', e);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {loading && <ActivityIndicator />}
          {!loading && offer && (
            <>
              <Text style={styles.title}>Premium Access</Text>
              <Text style={styles.cost}>
                {`${offer.product.currencyCode} ${offer.product.priceString}`}
                <Text style={styles.per}>/monthly</Text>
              </Text>
              <View style={styles.benefits}>
                <Text style={styles.benefit}>✔ Toggle Damage Breakdown</Text>
                <Text style={styles.benefit}>✔ Access to valued Tile</Text>
                <Text style={styles.benefit}>✔ Free refresh at Magic Hut</Text>
              </View>

              {isPremium ? (
                <Text style={styles.subscribedText}>
                  You already subscribed
                </Text>
              ) : (
                <TouchableOpacity
                  style={[styles.buttonWrapper, { marginBottom: 8 }]}
                  onPress={handleSubscribe}>
                  <Text style={styles.buttonText}>Subscribe</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.buttonWrapper} onPress={onClose}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </>
          )}
          {!loading && !offer && (
            <>
              <Text
                style={[
                  styles.benefit,
                  { alignSelf: 'center', marginBottom: 24 }
                ]}>
                Try again later!
              </Text>
              <TouchableOpacity style={styles.buttonWrapper} onPress={onClose}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.modalBg,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: '#1a2340',
    padding: scale(20),
    borderRadius: moderateScale(16),
    width: '80%'
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(8),
    color: '#fff'
  },
  cost: {
    fontSize: moderateScale(28),
    fontWeight: '700',
    color: '#fff',
    marginBottom: verticalScale(16)
  },
  per: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: '#ccc'
  },
  benefits: {
    width: '100%',
    marginBottom: verticalScale(24)
  },
  benefit: {
    fontSize: moderateScale(16),
    color: '#fff',
    marginVertical: 4
  },
  buttonWrapper: {
    backgroundColor: '#333',
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '600'
  },
  subscribedText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: 'lightgreen',
    textAlign: 'center',
    marginBottom: verticalScale(8)
  }
});
