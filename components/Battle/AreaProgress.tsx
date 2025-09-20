import Colors from 'app/foundation/colors';
import { moderateScale, scale, verticalScale } from 'app/utils/sizeScaling';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

type AreaProgressProps = {
  customStyle?: StyleProp<ViewStyle>;
  area?: string;
  stage: number;
};

const _AreaProgress: React.FC<AreaProgressProps> = ({
  area = '',
  stage,
  customStyle
}) => {
  const circles = [1, 2, 3].map(i => (
    <View
      key={i}
      style={[
        styles.circle,
        i < stage
          ? styles.completed
          : i === stage
            ? styles.current
            : styles.upcoming
      ]}
    />
  ));

  return (
    <View style={[styles.container, customStyle]}>
      <Text style={styles.areaText}>{area}:</Text>
      <View style={styles.progressRow}>{circles}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondaryBg70,
    borderWidth: 1,
    borderColor: Colors.borderBlack,
    borderRadius: 8,
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(12),
    justifyContent: 'center'
  },
  areaText: {
    color: Colors.textWhite,
    fontWeight: 'bold',
    fontSize: moderateScale(12),
    marginRight: scale(8)
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4)
  },
  circle: {
    width: scale(10),
    height: scale(10),
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.borderGold,
    backgroundColor: 'transparent'
  },
  completed: {
    backgroundColor: Colors.accent,
    opacity: 0.7
  },
  current: {
    backgroundColor: Colors.primary,
    opacity: 1,
    borderColor: Colors.borderGold,
    borderWidth: 2.5,
    elevation: 2
  },
  upcoming: {
    backgroundColor: 'transparent',
    opacity: 0.3
  }
});

const AreaProgress = React.memo(_AreaProgress);
export default AreaProgress;
