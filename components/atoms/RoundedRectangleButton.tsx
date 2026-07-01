import Colors from 'app/foundation/colors';
import { moderateScale, scale, verticalScale } from 'app/utils/sizeScaling';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'warning';
type ButtonSize = 'lg' | 'md' | 'sm' | 'mini';

// Gradient colors for each type
const PRIMARY_GRADIENT = ['#ffe08a', '#f4c542'] as const;
const SECONDARY_GRADIENT = ['#3a4a7a', '#2C3E73'] as const;
const TERTIARY_GRADIENT = ['#353545', '#23232a'] as const;
const WARNING_GRADIENT = ['#ff7b7b', '#E63946'] as const;

const TYPE_STYLES = {
  primary: {
    backgroundColor: Colors.primary,
    borderColor: Colors.borderBlack,
    textColor: Colors.secondary,
    gradient: PRIMARY_GRADIENT
  },
  secondary: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.primary,
    textColor: Colors.primary,
    gradient: SECONDARY_GRADIENT
  },
  tertiary: {
    backgroundColor: Colors.tertiary,
    borderColor: Colors.primary,
    textColor: Colors.primary,
    gradient: TERTIARY_GRADIENT
  },
  warning: {
    backgroundColor: Colors.danger,
    borderColor: Colors.borderBlack,
    textColor: Colors.textWhite,
    gradient: WARNING_GRADIENT
  }
};

const SIZE_STYLES = {
  lg: {
    height: verticalScale(50),
    minWidth: scale(150),
    paddingHorizontal: scale(16),
    fontSize: verticalScale(16)
  },
  md: {
    height: verticalScale(45),
    minWidth: scale(120),
    paddingHorizontal: scale(12),
    fontSize: verticalScale(14)
  },
  sm: {
    height: verticalScale(40),
    minWidth: scale(90),
    paddingHorizontal: scale(10),
    fontSize: verticalScale(12)
  },
  mini: {
    height: verticalScale(20),
    minWidth: scale(50),
    paddingHorizontal: scale(6),
    fontSize: verticalScale(6)
  }
};

interface IRoundedRectButton {
  customStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
  title?: string;
  icon?: React.ReactNode;
  testID?: string;
  type: ButtonType;
  size: ButtonSize;
  disabled?: boolean;
}

const _RoundedRectButton: React.FC<IRoundedRectButton> = ({
  customStyle,
  onPress,
  title,
  icon,
  testID,
  type,
  size,
  disabled = false
}) => {
  const typeStyle = TYPE_STYLES[type];
  const sizeStyle = SIZE_STYLES[size];

  return (
    <View style={customStyle}>
      <TouchableOpacity
        onPress={onPress}
        testID={testID}
        activeOpacity={0.85}
        disabled={disabled}>
        {/* Shadow/3D effect layer */}
        <View
          style={[
            styles.buttonParent,
            {
              height: sizeStyle.height,
              minWidth: sizeStyle.minWidth,
              borderRadius: 12,
              backgroundColor: disabled ? '#999' : typeStyle.borderColor
            }
          ]}>
          {/* Gradient button layer */}
          <LinearGradient
            colors={disabled ? ['#aaa', '#777'] : typeStyle.gradient}
            start={[0, 0]}
            end={[1, 1]}
            style={[
              styles.buttonGrad,
              {
                height: sizeStyle.height,
                minWidth: sizeStyle.minWidth,
                borderRadius: moderateScale(12),
                bottom: verticalScale(4) // creates the 3D "lifted" effect
              }
            ]}>
            <View
              style={[
                styles.button,
                {
                  backgroundColor: 'transparent',
                  borderColor: disabled ? '#666' : typeStyle.borderColor,
                  height: sizeStyle.height,
                  minWidth: sizeStyle.minWidth,
                  paddingHorizontal: sizeStyle.paddingHorizontal
                }
              ]}>
              <View style={styles.contentRow}>
                {title && (
                  <Text
                    style={[
                      styles.title,
                      {
                        color: disabled ? '#ddd' : typeStyle.textColor,
                        fontSize: sizeStyle.fontSize,
                        marginRight: icon ? scale(8) : 0
                      }
                    ]}
                    numberOfLines={1}>
                    {title}
                  </Text>
                )}
                {icon && <View style={styles.iconWrapper}>{icon}</View>}
              </View>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonParent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonGrad: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0
  },
  button: {
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(2),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '100%'
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: verticalScale(14),
    fontWeight: 'bold'
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const RoundedRectButton = React.memo(_RoundedRectButton);
export default RoundedRectButton;
