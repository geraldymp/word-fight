import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

type AreaProgressProps = {
  customStyle?: StyleProp<ViewStyle>;
  area: number;
  stage: number;
};

const _AreaProgress: React.FC<AreaProgressProps> = ({
  area,
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
      <Text style={styles.areaText}>Area {area}:</Text>
      <View style={styles.progressRow}>{circles}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    width: 125
  },
  areaText: {
    color: '#ffe08a',
    fontWeight: 'bold',
    fontSize: 12,
    marginRight: 8
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ffe08a',
    backgroundColor: 'transparent'
  },
  completed: {
    backgroundColor: '#ffe08a',
    opacity: 0.7
  },
  current: {
    backgroundColor: '#ffe08a',
    opacity: 1,
    borderColor: '#ffd700',
    borderWidth: 2.5,
    shadowColor: '#ffd700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 2
  },
  upcoming: {
    backgroundColor: 'transparent',
    opacity: 0.3
  }
});

const AreaProgress = React.memo(_AreaProgress);
export default AreaProgress;
