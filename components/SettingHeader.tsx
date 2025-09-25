import Entypo from '@expo/vector-icons/Entypo';
import Colors from 'app/foundation/colors';
import { useRouter } from 'expo-router';
import React, { memo } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

interface ISettingHeader {
  title: string;
}

const SettingHeader: React.FC<ISettingHeader> = ({ title }) => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  return (
    <View style={[styles.container, { width: width }]}>
      <Entypo
        name="arrow-bold-left"
        size={24}
        color="white"
        style={{ marginRight: 24 }}
        onPress={() => router.back()}
      />
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

export default memo(SettingHeader);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.deeperDark,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16
  },
  titleText: {
    fontSize: 32,
    color: Colors.accent,
    fontWeight: 'bold',
    fontFamily: 'KnightWarrior',
    letterSpacing: 1.5
  }
});
