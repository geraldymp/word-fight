import { Entypo, MaterialIcons } from '@expo/vector-icons';
import RoundedRectButton from 'app/components/atoms/RoundedRectangleButton';
import ChangeHeroIconModal from 'app/components/ChangeHeroIconModal';
import { ChangeNameModal } from 'app/components/ChangeNameModal';
import { DialogModal } from 'app/components/DialogModal';
import ExpBar from 'app/components/ExpBar';
import SettingHeader from 'app/components/SettingHeader';
import { HeroIcons } from 'app/constants/heroIcons';
import Colors from 'app/foundation/colors';
import { Fonts } from 'app/foundation/fonts';
import { onClearResume, onLoadGame } from 'app/store/savedGame/useSavedGame';
import { useHeroStore } from 'app/store/useHeroStore';
import { usePlayerStore } from 'app/store/usePlayerStore';
import { scale, verticalScale } from 'app/utils/sizeScaling';
import {
  canChangeUsername,
  getNextChangeDate,
  getUsername,
  setUsername as setUsernameStorage
} from 'app/utils/usernameManager';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function PlayerScreen() {
  const { selectedHeroId, setHero } = useHeroStore();
  const {
    level,
    exp,
    expNeeded,
    resetUpgrades,
    upgrades,
    upgradePoints,
    usedUpgradePoints,
    upgradeStat,
    resetProfile,
    loadProfile
  } = usePlayerStore();

  const selectedHero = HeroIcons.find(h => h.id === selectedHeroId);

  const [visibleChangeIconModal, setVisibleChangeIconModal] = useState(false);
  const [username, setUsername] = useState('');
  const [visibleChangeNameModal, setVisibleChangeNameModal] = useState(false);
  const [visibleResetCurrentRunModal, setVisibleResetCurrentRunModal] =
    useState(false);

  function onPressChangeIcon() {
    setVisibleChangeIconModal(true);
  }

  function onPressSelectIcon(heroId: string) {
    setHero(heroId);
    setVisibleChangeIconModal(false);
  }

  function onPressCancelIcon() {
    setVisibleChangeIconModal(false);
  }

  async function onPressChangeUsername() {
    const allowedToChangeName = await canChangeUsername();
    if (allowedToChangeName) {
      setVisibleChangeNameModal(true);
    } else {
      const nextDate = await getNextChangeDate();
      Alert.alert(
        `Name changeable every 7 days`,
        `You can change your name again on ${nextDate?.toLocaleDateString(
          'en-GB',
          {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }
        )}`
      );
    }
  }

  async function onConfirmChange(updatedName: string) {
    setUsername(updatedName);
    setVisibleChangeNameModal(false);
    await setUsernameStorage(updatedName);
  }

  function onCloseModal() {
    setVisibleChangeNameModal(false);
  }

  async function init() {
    const currentName = await getUsername();
    setUsername(currentName);
    loadProfile();
  }

  async function onPressUpgradeStat(id: string) {
    const savedGame = await onLoadGame();
    if (savedGame) {
      setVisibleResetCurrentRunModal(true);
    } else {
      upgradeStat(id);
    }
  }

  async function onPressResetStat() {
    const savedGame = await onLoadGame();
    if (savedGame) {
      setVisibleResetCurrentRunModal(true);
    } else {
      resetUpgrades();
    }
  }

  async function onAcceptResetCurrentRun() {
    await onClearResume();
    setVisibleResetCurrentRunModal(false);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={styles.container}>
      <SettingHeader title="Player Profile" />
      <ScrollView
        style={{ paddingHorizontal: scale(16) }}
        contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Profile</Text>
          <View style={styles.profileContainer}>
            <TouchableOpacity onPress={onPressChangeIcon}>
              <Image
                source={selectedHero?.icon}
                style={styles.imageStyle}
                resizeMode="contain"></Image>
            </TouchableOpacity>
            <View style={styles.userNameWrapper}>
              <Text style={{ color: Colors.textWhite }}>{username}</Text>
              <TouchableOpacity onPress={onPressChangeUsername}>
                <MaterialIcons
                  name="drive-file-rename-outline"
                  size={verticalScale(24)}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Progress</Text>
          <ExpBar level={level} exp={exp} expNeeded={expNeeded} />
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Upgrade Points</Text>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.pointsAvailabilityText}>
              <Text style={{ fontSize: scale(16) }}>{usedUpgradePoints}</Text>
              <Text> Points Used</Text>
            </Text>

            <Text style={styles.pointsAvailabilityText}>
              <Text
                style={{
                  fontSize: scale(16),
                  color: upgradePoints > 0 ? Colors.primary : Colors.disabled
                }}>
                {upgradePoints}
              </Text>
              <Text> Points Availables</Text>
            </Text>
          </View>
          <View style={styles.lineStyle} />

          <View style={{ gap: verticalScale(8) }}>
            {upgrades.map(upgrade => {
              const disabledUpgradeButton =
                upgrade.level >= upgrade.maxLevel ||
                upgradePoints < (upgrade.costs[upgrade.level] ?? 0);
              const upgradeable = upgrade.costs[upgrade.level] <= upgradePoints;
              return (
                <View key={upgrade.id} style={styles.upgradeWrapper}>
                  <View style={{ flex: 3 }}>
                    <Text style={styles.upgradeTitleText}>{upgrade.name}</Text>
                  </View>
                  <View style={styles.centerWrapper}>
                    <Text style={styles.upgradeTitleText}>
                      Lv {upgrade.level}
                    </Text>
                  </View>
                  <View style={styles.centerWrapper}>
                    <Text style={styles.upgradeTitleText}>
                      {upgrade.level * upgrade.bonusPerLevel}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.centerWrapper}
                    disabled={disabledUpgradeButton}
                    onPress={() => onPressUpgradeStat(upgrade.id)}>
                    {upgrade.costs[upgrade.level] ? (
                      <View
                        style={[
                          styles.upgradeButtonWrapper,
                          {
                            backgroundColor: upgradeable
                              ? Colors.blueMana
                              : Colors.disabled
                          }
                        ]}>
                        <Entypo
                          name="arrow-bold-up"
                          size={scale(16)}
                          color={upgradeable ? Colors.primary : Colors.disabled}
                        />
                        <Text style={styles.addPointsText}>
                          {upgrade.costs[upgrade.level]}
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.upgradeMaxedWrapper}>
                        <Text style={styles.addPointsText}>MAX</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <RoundedRectButton
            onPress={onPressResetStat}
            title="Reset Upgrades"
            type="primary"
            size="sm"
            disabled={usedUpgradePoints === 0}
          />
        </View>
      </ScrollView>
      <ChangeHeroIconModal
        visible={visibleChangeIconModal}
        initialHeroId={selectedHeroId}
        onSelect={heroId => onPressSelectIcon(heroId)}
        onCancel={onPressCancelIcon}
      />
      <ChangeNameModal
        visible={visibleChangeNameModal}
        onConfirm={onConfirmChange}
        title="Input user name"
        confirmationText="OK"
        onClose={onCloseModal}
      />
      <DialogModal
        visible={visibleResetCurrentRunModal}
        title={'Changing the upgrades will reset your current run'}
        confirmationText={'Yes, reset current run'}
        cancelationText={'No, keep my current run'}
        onConfirm={onAcceptResetCurrentRun}
        onCancel={() => setVisibleResetCurrentRunModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.deeperDark
  },
  scrollContentContainer: {
    gap: verticalScale(12),
    paddingBottom: verticalScale(24)
  },
  cardContainer: {
    gap: verticalScale(8),
    backgroundColor: Colors.shallowBlue,
    padding: scale(12),
    borderRadius: scale(12)
  },
  cardTitle: {
    fontSize: verticalScale(18),
    color: Colors.primary,
    fontWeight: 'bold',
    marginBottom: verticalScale(8)
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12)
  },
  userNameWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pointsAvailabilityText: {
    color: Colors.textWhite,
    fontFamily: Fonts.Candal400,
    fontSize: scale(10)
  },
  lineStyle: {
    height: 0.4,
    backgroundColor: Colors.neutralLight,
    marginVertical: verticalScale(8),
    width: '75%',
    alignSelf: 'center'
  },
  addPointsText: {
    color: Colors.textBlack,
    fontFamily: Fonts.SourGummy800,
    fontSize: scale(16)
  },
  imageStyle: {
    height: verticalScale(75),
    width: verticalScale(75),
    borderRadius: verticalScale(37.5),
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: Colors.blackBg50
  },
  upgradeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8
  },
  upgradeTitleText: {
    fontFamily: Fonts.SourGummy400,
    fontSize: scale(12),
    color: Colors.neutralLight
  },
  centerWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  upgradeButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4
  },
  upgradeMaxedWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: Colors.disabled
  }
});
