import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';

interface IBaseButton {
  customStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const _BaseButton: React.FC<IBaseButton> = ({ customStyle, onPress }) => {
  return (
    <View style={customStyle}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonParent}>
          <LinearGradient
            colors={['#5be9aa', '#09949d']}
            style={styles.buttonGrad}></LinearGradient>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGrad: {
    height: 50,
    width: 200,
    borderRadius: 10,
    bottom: 5
  },
  buttonParent: {
    height: 50,
    width: 200,
    borderRadius: 10,
    backgroundColor: '#024e51'
  }
});

const BaseButton = React.memo(_BaseButton);
export default BaseButton;
