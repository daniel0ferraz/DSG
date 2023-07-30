import React, {useState} from 'react';
import {
  Box,
  HStack,
  Text,
  Divider,
  Button,
  View,
  Popover,
  Center,
} from 'native-base';

import IconTask from '../../assets/icon-task.svg';
import IconOptions from '../../assets/icon-options.svg';
import IconEye from '../../assets/icon-eye.svg';
import IconTrash from '../../assets/icon-trash.svg';
import IconPencil from '../../assets/icon-pencil.svg';

import BtnStatus from '../BtnStatus';
import {ITask} from '../../@types/ITask';
import {useNavigation} from '@react-navigation/native';

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import {useRealm} from '../../databases/realm';
s;
import {Alert} from 'react-native';

type ITaskProps = {
  dataTask: ITask;
};

export default function Task({dataTask}: ITaskProps) {
  const navigation = useNavigation<BottomTabNavigationProp<any>>();

  const realm = useRealm();

  const deleteTask = async () => {
    try {
      realm.write(() => {
        realm.delete(
          realm.objects<ITask>('task').filtered(`id = '${dataTask.id}'`),
        );
      });
      Alert.alert('Tarefa Deletada!');
      /* navigation.reset({
        routes: [{name: 'Home'}],
        index: 0,
      }); */
    } catch (error) {
      Alert.alert('Não foi possivel deletar tarefa');
      console.log('erro', error);
    }
  };

  return (
    <View
      w={'100%'}
      h={82}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      borderWidth={1}
      borderColor="#CCCCCC"
      padding={3}
      borderRadius={10}>
      <Box flexDirection="row" alignItems="center">
        <IconTask width={36} height={36} />

        <Box flexDirection="column" ml={4}>
          <Text
            fontWeight={800}
            fontSize={14}
            color="#242736"
            numberOfLines={2}
            width={150}
            ellipsizeMode="tail">
            {dataTask?.titleTask}
          </Text>
          <Text fontWeight={400} fontSize={10} color={'#666666'}>
            {dataTask?.responsible}
            {' - '}
            {dataTask?.dateDeadline}
          </Text>
        </Box>
      </Box>

      <Box flexDirection="row" alignItems="center">
        <BtnStatus title={dataTask.status} isActive={true} />

        <Center>
          <Box>
            <Popover
              trigger={triggerProps => {
                return (
                  <>
                    <Button {...triggerProps} bgColor="#ffffff">
                      <IconOptions />
                    </Button>
                  </>
                );
              }}>
              <Popover.Content
                accessibilityLabel="Options Task"
                w="110"
                borderWidth={0}
                backgroundColor="#ffffff">
                <Popover.Body width={110} backgroundColor="#ffffff">
                  <View
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center">
                    <Button
                      onPress={() =>
                        navigation.navigate('AddTask', {dataTask})
                      }>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center">
                        <IconEye />
                        <Text
                          ml={3}
                          color="#000000"
                          fontSize={14}
                          fontWeight={800}>
                          Ver
                        </Text>
                      </Box>
                    </Button>

                    <Button
                      onPress={() =>
                        navigation.navigate('AddTask', {dataTask})
                      }>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center">
                        <IconPencil />
                        <Text
                          ml={3}
                          color="#000000"
                          fontSize={14}
                          fontWeight={800}>
                          Editar
                        </Text>
                      </Box>
                    </Button>

                    <Button
                      onPress={() => {
                        Alert.alert(
                          'Excluir Tarefa',
                          'Tem certeza que deseja excluir essa tarefa?',
                          [
                            {
                              text: 'Cancelar',
                              onPress: () => {},
                              style: 'cancel',
                            },
                            {
                              text: 'Sim',
                              onPress: async () => {
                                deleteTask();
                              },
                            },
                          ],
                        );
                      }}>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center">
                        <IconTrash />
                        <Text
                          ml={3}
                          color="#000000"
                          fontSize={14}
                          fontWeight={800}>
                          Excluir
                        </Text>
                      </Box>
                    </Button>
                  </View>
                </Popover.Body>
              </Popover.Content>
            </Popover>
          </Box>
        </Center>
      </Box>
    </View>
  );
}
