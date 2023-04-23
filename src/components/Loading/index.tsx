import React from 'react';
import IconLoading from '../../assets/icon-logoDSG.svg';
import {Spinner, View} from 'native-base';
import {ActivityIndicator} from 'react-native';
import * as Progress from 'react-native-progress';

type LoadingProps = {
  isLoading: boolean;
};

export default function Loading() {
  return (
    <>
      <View
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
        opacity={0.5}
        backgroundColor={'#FFFFFF'}>
        <View position={'absolute'}>
          <IconLoading width={110} height={110} />
        </View>
        <Progress.Circle
          size={110}
          color="#6FEA8B"
          borderWidth={5}
          animated
          indeterminate={true}
          endAngle={0.3}
          strokeCap="round"
        />
      </View>
    </>
  );
}
