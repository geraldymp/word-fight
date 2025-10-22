import { verticalScale } from 'app/utils/sizeScaling';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';

interface IRoundedButton {
  customStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  icon?: React.ReactNode;
  gradient?: {
    top: ColorValue;
    bottom: ColorValue;
  };
}

const _RoundedButton: React.FC<IRoundedButton> = ({
  customStyle,
  onPress,
  icon,
  gradient = {
    top: '#f1b676ff',
    bottom: '#b68627ff'
  }
}) => {
  return (
    <View style={customStyle}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonParent}>
          <LinearGradient
            colors={[gradient.top, gradient.bottom]}
            style={styles.buttonGrad}>
            {icon}
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGrad: {
    height: verticalScale(40),
    width: verticalScale(40),
    borderRadius: verticalScale(20),
    bottom: verticalScale(3),
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonParent: {
    height: verticalScale(40),
    width: verticalScale(40),
    borderRadius: verticalScale(20),
    backgroundColor: '#024e51'
  }
});

const RoundedButton = React.memo(_RoundedButton);
export default RoundedButton;
