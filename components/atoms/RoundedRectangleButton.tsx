import Colors from 'app/foundation/colors';
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
type ButtonSize = 'lg' | 'md' | 'sm';

interface IRoundedRectButton {
  customStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
  title?: string;
  icon?: React.ReactNode;
  testID?: string;
  type: ButtonType;
  size: ButtonSize;
}

const TYPE_STYLES = {
  primary: {
    backgroundColor: Colors.primary,
    borderColor: Colors.borderBlack,
    textColor: Colors.secondary
  },
  secondary: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.primary,
    textColor: Colors.primary
  },
  tertiary: {
    backgroundColor: Colors.tertiary,
    borderColor: Colors.primary,
    textColor: Colors.primary
  },
  warning: {
    backgroundColor: Colors.danger,
    borderColor: Colors.borderBlack,
    textColor: Colors.textWhite
  }
};

const SIZE_STYLES = {
  lg: {
    height: 54,
    minWidth: 220,
    paddingHorizontal: 28,
    fontSize: 20
  },
  md: {
    height: 44,
    minWidth: 140,
    paddingHorizontal: 18,
    fontSize: 16
  },
  sm: {
    height: 34,
    minWidth: 80,
    paddingHorizontal: 10,
    fontSize: 13
  }
};

const _RoundedRectButton: React.FC<IRoundedRectButton> = ({
  customStyle,
  onPress,
  title,
  icon,
  testID,
  type,
  size
}) => {
  const typeStyle = TYPE_STYLES[type];
  const sizeStyle = SIZE_STYLES[size];

  return (
    <View style={customStyle}>
      <TouchableOpacity
        onPress={onPress}
        testID={testID}
        activeOpacity={0.85}
        style={[
          styles.button,
          {
            backgroundColor: typeStyle.backgroundColor,
            borderColor: typeStyle.borderColor,
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
                  color: typeStyle.textColor,
                  fontSize: sizeStyle.fontSize,
                  marginRight: icon ? 8 : 0
                }
              ]}
              numberOfLines={1}>
              {title}
            </Text>
          )}
          {icon && <View style={styles.iconWrapper}>{icon}</View>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    letterSpacing: 1.1
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const RoundedRectButton = React.memo(_RoundedRectButton);
export default RoundedRectButton;
