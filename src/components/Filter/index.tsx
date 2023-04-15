import {Text, Button, IButtonProps, useTheme, Divider} from 'native-base';

import React from 'react';

type IFilter = IButtonProps & {
  title: string;
  isActive?: boolean;
  type: 'my-tasks' | 'all-tasks';
};

export default function Filter({title, isActive, type, ...rest}: IFilter) {
  return (
    <>
      <Button
        flex={1}
        {...rest}
        borderBottomWidth={2}
        borderBottomRadius={0}
        borderColor={isActive ? '#6FEA8B' : '#CCCCCC'}>
        <Text
          color={isActive ? '#121212' : '#666666'}
          fontSize={16}
          fontWeight={600}>
          {title}
        </Text>
      </Button>
    </>
  );
}
