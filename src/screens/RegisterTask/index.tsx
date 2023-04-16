import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  Stack,
  Input,
  HStack,
  Icon,
  Select,
} from 'native-base';

import { Alert, View } from 'react-native';

import IconGoback from '../../assets/icon-arrow.svg';
import IconCalendar from '../../assets/icon-calendar.svg';
import IconDropDown from '../../assets/icon-dropdown.svg';
import Buttom from '../../components/Buttom';
import BtnStatus from '../../components/BtnStatus';
import { ITask } from '../../@types/ITask';
import { getRealm } from '../../databases/realm';
import uuid from 'react-native-uuid';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function RegisterTask() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const routes = useRoute<any>();
  const taskData = routes?.params?.dataTask as ITask;



  const [task, setTask] = useState({
    titleTask: "" || taskData?.titleTask,
    responsible: "" || taskData?.responsible,
    dateDeadline: "" || taskData?.dateDeadline,
    description: "" || taskData?.description,
    status: "" || taskData?.status,
  } as ITask);

  const users = ['Daniel', 'Gabriel ', 'Juliano', 'Carlos', 'Tiago'];
  const [isLoading, setIsLoading] = useState(false);


  const handleNewTaskRegister = async () => {
    const realm = await getRealm();

    try {
      setIsLoading(true);

      realm.write(() => {
        realm.create('Task', {
          _id: uuid.v4(),
          titleTask: task.titleTask,
          responsible: task.responsible,
          dateDeadline: task.dateDeadline,
          description: task.description,
          status: task.status,
        });


      });

      Alert.alert('Tarefa criada com sucesso!');
      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Erro ao criar tarefa');
      console.log(error);
    } finally {
      realm.close();
      setIsLoading(false);
    }
  };

  const handleTaskUpdate = async () => {
    const realm = await getRealm();

    try {
      realm.write(() => {
        const updateTask = realm.create('Task', taskData, Realm.UpdateMode.Modified)
        console.log("updateTask", updateTask)
      })
      
      Alert.alert("Tarefa atualizada!")
      navigation.goBack();
    } catch (error) {
      Alert.alert("Não foi possivel atualizar tarefa")

    } finally {
      realm.close()

    }
  }

  return (
    <>
      <View
        style={{
          backgroundColor: '#6FEA8B',
          width: '100%',
          height: 7,
        }}
      />
      <Box flex={1} backgroundColor="#3A49F9" padding={5}>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Button>
            <IconGoback width={14} height={20} />
          </Button>
          <Text color="#ffffff" fontSize={20} fontWeight={700}>
            Criar tarefa
          </Text>

          <View />
        </Box>

        <Stack space={4} w="100%" mt={10}>
          <Box>
            <Text fontSize={18} fontWeight={400} color="#FFFFFF">
              {routes?.params ? "Editar" : " Título da tarefa"}
            </Text>
            <Input
              variant="underlined"
              color="#FFFFFF"
              fontWeight={800}
              fontSize={16}
              value={task.titleTask}
              onChangeText={text => setTask({ ...task, titleTask: text })}
            />
          </Box>

          <Box>
            <Text fontSize={18} fontWeight={400} color="#FFFFFF">
              Responsável
            </Text>
            <Select
              selectedValue={task.responsible}
              width={'100%'}
              color="#FFFFFF"
              variant="underlined"
              placeholder="Selecionar"
              placeholderTextColor="#FFFFFF"
              fontWeight={700}
              fontSize={16}
              mt={2}
              dropdownIcon={
                <Icon mr={3} as={<IconDropDown width={15} height={14} />} />
              }
              onValueChange={(itemValue: string) =>
                setTask({ ...task, responsible: itemValue })
              }>
              {users.map(user => (
                <Select.Item label={user} value={user} key={user} />
              ))}
            </Select>
          </Box>

          <Box mb={10}>
            <Text fontSize={18} fontWeight={400} color="#FFFFFF">
              Prazo
            </Text>
            <Input
              variant="underlined"
              InputRightElement={
                <Icon mr={3} as={<IconCalendar width={22} height={22} />} />
              }
              color="#FFFFFF"
              fontWeight={700}
              fontSize={16}
              value={task.dateDeadline}
              onChangeText={text => setTask({ ...task, dateDeadline: text })}
            />
          </Box>
        </Stack>

        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderRadius: 20,

            padding: 20,
          }}>
          <Box mt={5}>
            <Text fontSize={18} fontWeight={400} color="#333333">
              Descrição da tarefa
            </Text>
            <Input
              value={task.description}
              onChangeText={text => setTask({ ...task, description: text })}
              variant="outline"
              color="#2E3A59"
            />
          </Box>

          <Box mt={5}>
            <Text fontSize={18} fontWeight={400} color="#333333" mb={5}>
              Status
            </Text>
            <HStack alignItems="center" justifyContent="space-between">
              <BtnStatus
                title="Aberto"
                onPress={() => setTask({ ...task, status: 'Aberto' })}
                isActive={task.status === 'Aberto'}
              />
              <BtnStatus
                onPress={() => setTask({ ...task, status: 'Em andamento' })}
                title="Em andamento"
              />
              <BtnStatus
                onPress={() => setTask({ ...task, status: 'Concluido' })}
                title="Concluido"
              />
            </HStack>
          </Box>

          <Box mt={10}>
            <Buttom
              title={routes?.params ? 'Salvar' : 'Criar tarefa'}
              style={{
                width: '100%',
              }}
              onPress={() => {
                routes?.params ? handleTaskUpdate() : handleNewTaskRegister()
              }}
            />
          </Box>
        </View>
      </Box>
    </>
  );
}
