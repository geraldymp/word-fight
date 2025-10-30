import Colors from 'app/foundation/colors';
import { IOption } from 'app/types/IOption';
import { verticalScale } from 'app/utils/sizeScaling';
import React, { FC, memo } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native';

interface Props {
  options: IOption<string>[];
  current: IOption<string>;
  setCurrent: (value: IOption<string>) => void;
  customStyle?: StyleProp<ViewStyle>;
}

const Toggle: FC<Props> = ({ options, current, setCurrent, customStyle }) => {
  return (
    <View style={[styles.container, customStyle]}>
      {options.map((opt, idx) => {
        const isSelected = current.value === opt.value;
        const isFirst = idx === 0;
        const isLast = idx === options.length - 1;

        return (
          <Pressable
            key={opt.value}
            style={[
              styles.button,
              isFirst && styles.leftButton,
              isLast && styles.rightButton,
              isSelected && styles.selected
            ]}
            onPress={() => setCurrent(opt)}>
            <Text style={[styles.text, isSelected && styles.textSelected]}>
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default memo(Toggle);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.neutralLight
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blackBg50
  },
  leftButton: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  rightButton: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  selected: {
    backgroundColor: Colors.blueMana
  },
  text: {
    fontSize: verticalScale(12),
    fontWeight: '600',
    color: Colors.textWhite
  },
  textSelected: {
    color: Colors.textWhite
  }
});
