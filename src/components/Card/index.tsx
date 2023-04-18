import {Box, Image, Text} from 'native-base';
import React from 'react';

import {View} from 'react-native';

import IconLighBuild from '../../assets/icon-lightBuild.svg';

type IDataCard = {
  title: string;
  total: number;
};

type ICardProps = {
  dataCard: IDataCard;
};
export default function Card({dataCard}: ICardProps) {
  return (
    <>
      <Box backgroundColor="#3A49F9" p={15} width={190} borderRadius={20}>
        <Box flexDirection="row" alignItems="center" mb={5}>
          <IconLighBuild />
          <Text pl={3} fontWeight={800} color="#FFFFFF" fontSize={14}>
            {dataCard.title || 'Null'}
          </Text>
        </Box>

        <Text fontWeight={700} color="#FFFFFF" fontSize={42}>
          {dataCard.total || 0}
        </Text>
      </Box>
    </>
  );
}
