import React from 'react';
import {Text} from 'native-base';

import {
  TouchableOpacityProps,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export type IBtnStatusProps = TouchableOpacityProps & {
  title: string;
  isActive?: boolean;
};

export default function BtnStatus({title, isActive, ...rest}: IBtnStatusProps) {
  return (
    <TouchableOpacity
      {...rest}
      style={{
        width: 82,
        backgroundColor: '#E5EAFC',
        borderWidth: isActive ? 1 : 0,
        gap: 10,
        borderRadius: 75,
        borderColor: '#6FEA8B',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
      }}>
      <Text fontSize={8} fontWeight="800">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
