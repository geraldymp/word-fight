import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface IActionBottomButton {
  icon: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  counter?: number;
}

const _ActionBottomButton: React.FC<IActionBottomButton> = ({
  icon,
  onPress,
  disabled = false,
  counter = undefined
}) => {
  const counterBgCol = counter === 0 ? 'red' : 'green';
  return (
    <View style={{ paddingTop: 12, paddingRight: 12 }}>
      {counter !== undefined && (
        <View
          style={{
            backgroundColor: counterBgCol,
            position: 'absolute',
            right: 0,
            top: 0,
            borderRadius: 12,
            zIndex: 2,
            height: 24,
            width: 24,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text>{counter}</Text>
        </View>
      )}
      <TouchableOpacity
        style={{
          height: 32,
          width: 32,
          borderRadius: 12,
          backgroundColor: '#97c7a4',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={onPress}
        disabled={disabled}
      >
        {icon}
      </TouchableOpacity>
    </View>
  );
};

export const ActionBottomButton = React.memo(_ActionBottomButton);
