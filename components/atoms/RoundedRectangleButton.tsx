import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';

interface IRoundedRectButton {
  customStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  icon?: React.ReactNode;
  title?: string;
  gradient?: {
    top: ColorValue;
    bottom: ColorValue;
  };
  testID?: string;
}

const _RoundedRectButton: React.FC<IRoundedRectButton> = ({
  customStyle,
  onPress,
  icon,
  title,
  gradient = {
    top: '#EF476F',
    bottom: '#b8163cff'
  },
  testID
}) => {
  return (
    <View style={customStyle}>
      <TouchableOpacity onPress={onPress} testID={testID}>
        <View style={styles.buttonParent}>
          <LinearGradient
            colors={[gradient.top, gradient.bottom]}
            style={styles.buttonGrad}>
            <View style={{ flexDirection: 'row' }}>
              {icon}
              <Text style={{ color: 'white' }}>{title}</Text>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGrad: {
    height: 50,
    width: 200,
    borderRadius: 12,
    bottom: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonParent: {
    height: 50,
    width: 200,
    borderRadius: 12,
    backgroundColor: '#024e51'
  }
});

const RoundedRectButton = React.memo(_RoundedRectButton);
export default RoundedRectButton;
