import React from 'react';
import {Box, HStack, Text} from 'native-base';

import IconLogo from '../../assets/icon-logoDSG.svg';
import IconAdd from '../../assets/icon-plus.svg';
import Buttom from '../Buttom';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type HeaderProps = {
  title: string;
  subtitle: string;
};

export default function Header({title, subtitle}: HeaderProps) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <>
      <Box flex={1}>
        <Box mb={21} mt={21}>
          <IconLogo width={47} height={47} />
        </Box>

        <HStack w="100%" alignItems="center" justifyContent="space-between">
          <Box>
            <Text fontSize="26" fontWeight={700} color="#2E3A59">
              {title}
            </Text>
            <Text fontSize="13" fontWeight={400} color="#2E3A59">
              {subtitle}
            </Text>
          </Box>

          <Buttom
            title="Add tarefa"
            icon={<IconAdd width={8} height={8} />}
            onPress={() => navigation.navigate('AddTask')}
          />
        </HStack>
      </Box>
    </>
  );
}
