import React from 'react';
import IconLoading from '../../assets/icon-logoDSG.svg';
import {View} from 'native-base';

type LoadingProps = {
  isLoading: boolean;
};

export default function Loading() {
  return (
    <>
      <View flex={1} alignItems="center" justifyContent="center">
        <IconLoading />
      </View>
    </>
  );
}
