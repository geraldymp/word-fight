import React from 'react';
import { Image, ImageSourcePropType, TouchableOpacity } from 'react-native';

interface ICircleIcon {
  icon: ImageSourcePropType;
  onPress: () => void;
}

const _CircleIcon: React.FC<ICircleIcon> = ({ icon, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onPress={onPress}
    >
      <Image
        source={icon}
        style={{ height: 50, width: 50 }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export const CircleIcon = React.memo(_CircleIcon);
