import React, { useState } from 'react';
import { Box, HStack, Text, Divider, Button, View, Popover, Center } from 'native-base';



import IconTask from '../../assets/icon-task.svg';
import IconOptions from '../../assets/icon-options.svg';
import IconEye from '../../assets/icon-eye.svg';
import IconTrash from '../../assets/icon-trash.svg';
import IconPencil from '../../assets/icon-pencil.svg';

import BtnStatus from '../BtnStatus';
import { ITask } from '../../@types/ITask';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getRealm } from '../../databases/realm';

import { Alert } from 'react-native'

type ITaskProps = {
  dataTask: ITask;
};

/* 
title: string;
responsible: string;
dateDeadline: string;
status: 'open' | 'in-progress' | 'done'; */



function Example() {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return;
}


export default function Task({ dataTask }: ITaskProps) {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();


  const deleteTask = async () => {
    const realm = await getRealm();
    try {
      realm.write(() => {
        realm.delete(realm.objects<ITask>("Task").filtered(`_id = '${dataTask._id}'`))
      })
      Alert.alert("Tarefa Deletada!")
    } catch (error) {
      Alert.alert("Não foi possivel deletar tarefa")
      console.log("erro", error)
    } finally {
      realm.close()

    }
  }




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
          <Text fontWeight={800} fontSize={14} color="#242736" numberOfLines={2}
          >
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


        <Center >
          <Box >
            <Popover trigger={triggerProps => {
              return (
                <>
                  <Button {...triggerProps} bgColor="transparent" >
                    <IconOptions />
                  </Button>
                </>
              );
            }}>
              <Popover.Content accessibilityLabel="Delete Customerd" w="56">
                <Popover.Arrow />
                <Popover.CloseButton />

                <Popover.Body>
                  <View>
                    <Button
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="center"
                      onPress={() => navigation.navigate('AddTask', { dataTask })}>
                      <IconEye />
                      <Text color="#000000" fontSize={14} fontWeight={800}>Ver</Text>
                    </Button>

                    <Button
                      onPress={() => navigation.navigate('AddTask', { dataTask })}
                    >
                      <IconPencil />
                      <Text color="#000000" fontSize={14} fontWeight={800}>Editar</Text>
                    </Button>

                    <Button onPress={() => deleteTask()}>
                      <IconTrash />
                      <Text color="#000000" fontSize={14} fontWeight={800}>Excluir</Text>
                    </Button>
                  </View>
                </Popover.Body>

              </Popover.Content>
            </Popover>
          </Box >
        </Center>
      </Box>

    </View>



  );
}


