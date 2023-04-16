import React from 'react';
import {Text} from 'native-base';

import {View, TouchableOpacityProps} from 'react-native';

import {Buttom} from './styles';

export type IBtnStatusProps = TouchableOpacityProps & {
  title: string;
  isActive?: boolean;
};

export default function BtnStatus({title, isActive, ...rest}: IBtnStatusProps) {
  return (
    <Buttom {...rest} isActive={isActive}>
      <Text fontSize={8} fontWeight={800}>
        {title}
      </Text>
    </Buttom>
  );
}
