import React from 'react';
import { TouchableOpacity } from 'react-native';

interface IActionBottomButton {
  icon: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
}

const _ActionBottomButton: React.FC<IActionBottomButton> = ({
  icon,
  onPress,
  disabled = false
}) => {
  return (
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
  );
};

export const ActionBottomButton = React.memo(_ActionBottomButton);
