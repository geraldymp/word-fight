import Colors from 'app/foundation/colors';
import { scale } from 'app/utils/sizeScaling';
import React, { memo } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

interface ISettingCardSwitch {
  title: string;
  contents: {
    title: string;
    description: string;
    value: boolean;
    onPress: (value: boolean) => void;
  }[];
}

const SettingCardSwitch: React.FC<ISettingCardSwitch> = ({
  title,
  contents
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {contents.map((content, index) => {
        return (
          <View style={styles.settingRow} key={index.toString()}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingText}>{content.title}</Text>
              <Text style={styles.settingDesc}>{content.description}</Text>
            </View>
            <Switch
              value={content.value}
              onValueChange={value => content.onPress(value)}
              thumbColor={content.value ? Colors.primary : Colors.neutralMedium}
              trackColor={{ false: Colors.neutralMedium, true: Colors.primary }}
            />
          </View>
        );
      })}
    </View>
  );
};

export default memo(SettingCardSwitch);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.shallowBlue,
    borderRadius: scale(18),
    padding: scale(18),
    width: '90%',
    marginBottom: scale(16)
  },
  sectionTitle: {
    fontSize: scale(24),
    color: Colors.primary,
    fontWeight: 'bold',
    marginBottom: scale(18)
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(12)
  },
  settingText: {
    color: Colors.textWhite,
    fontSize: scale(18),
    fontWeight: '600'
  },
  settingDesc: {
    color: Colors.borderBlue,
    fontSize: scale(10),
    marginTop: scale(4),
    marginBottom: scale(0)
  }
});
