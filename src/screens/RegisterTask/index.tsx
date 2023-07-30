import React, {useState} from 'react';
import {
  Box,
  Button,
  Text,
  Stack,
  Input,
  HStack,
  Icon,
  Select,
  Center,
  ScrollView,
  KeyboardAvoidingView,
} from 'native-base';

import {Alert, Platform, View} from 'react-native';

import IconGoback from '../../assets/icon-arrow.svg';
import IconCalendar from '../../assets/icon-calendar.svg';
import IconDropDown from '../../assets/icon-dropdown.svg';
import Buttom from '../../components/Buttom';
import BtnStatus from '../../components/BtnStatus';
import {ITask} from '../../@types/ITask';
import {useRealm} from '../../databases/realm';
import uuid from 'react-native-uuid';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {maskDate} from '../../utils/mask';
import Loading from '../../components/Loading';
import BtnGroup from '../../components/BtnGroup';
import {TaskSchema} from '../../databases/schemas/TaskSchema';

export default function RegisterTask() {
  const navigation = useNavigation<BottomTabNavigationProp<any>>();

  const routes = useRoute<any>();
  const taskData = routes?.params?.dataTask as ITask;
  const [statusFilter, setStatusFilter] = useState<string | ''>(
    taskData?.status,
  );

  const [task, setTask] = useState({
    titleTask: '' || taskData?.titleTask,
    responsible: '' || taskData?.responsible,
    dateDeadline: '' || taskData?.dateDeadline,
    description: '' || taskData?.description,
    status: statusFilter || taskData?.status,
  } as ITask);

  const users = ['Daniel', 'Gabriel ', 'Juliano', 'Carlos', 'Tiago'];
  const [isLoading, setIsLoading] = useState(false);
  const realm = useRealm();

  const clearForm = () => {
    setTask({
      titleTask: '',
      responsible: '',
      dateDeadline: '',
      description: '',
      status: '',
    } as ITask);

    setStatusFilter('');

    navigation.goBack();
  };

  const handleNewTaskRegister = async () => {
    console.log(task);
    try {
      if (
        !task.titleTask ||
        !task.responsible ||
        !task.dateDeadline ||
        !task.description ||
        !statusFilter
      ) {
        Alert.alert('Preencha todos os campos!');
        return;
      }

      setIsLoading(true);

      realm.write(() => {
        realm.create(
          'task',
          TaskSchema.generate({
            titleTask: task.titleTask,
            responsible: task.responsible,
            dateDeadline: maskDate(task.dateDeadline),
            description: task.description,
            status: statusFilter,
          }),
        );
      });

      clearForm();
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Erro ao criar tarefa');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1800);
    }
  };

  /* 
  const updateTask = async () => {
    const realm = await getRealm();

    const data = {
      id: taskData.id,
      titleTask: task.titleTask,
      responsible: task.responsible,
      dateDeadline: task.dateDeadline,
      description: task.description,
      status: statusFilter,
    };
    try {
      setIsLoading(true);
      realm.write(() => {
        realm.create('Task', data, Realm.UpdateMode.Modified);
      });
      //Alert.alert('Tarefa atualizada com sucesso!');

      // clearForm();
    } catch (error) {
      Alert.alert('Erro ao atualizar tarefa');
      setIsLoading(false);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1800);
    }
  }; */

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView background={'#3A49F9'}>
          <View
            style={{
              backgroundColor: '#6FEA8B',
              width: '100%',
              height: 7,
            }}
          />

          <Box backgroundColor="#3A49F9" padding={5} height={420} safeArea>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Button
                onPress={() => {
                  clearForm();
                }}>
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
                  Título da tarefa
                </Text>
                <Input
                  variant="underlined"
                  color="#FFFFFF"
                  fontWeight={800}
                  fontSize={16}
                  value={task.titleTask || taskData?.titleTask}
                  onChangeText={text => setTask({...task, titleTask: text})}
                />
              </Box>

              <Box>
                <Text fontSize={18} fontWeight={400} color="#FFFFFF">
                  Responsável
                </Text>
                <Select
                  selectedValue={task.responsible || taskData?.responsible}
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
                  onClose={() => setTask({...task, responsible: ''})}
                  onValueChange={(itemValue: string) =>
                    setTask({...task, responsible: itemValue})
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
                  value={task.dateDeadline || taskData?.dateDeadline}
                  onChangeText={text => {
                    const value = maskDate(text);
                    setTask({...task, dateDeadline: value});
                  }}
                  keyboardType="numeric"
                  maxLength={10}
                  cursorColor={'#FFFFFF'}
                />
              </Box>
            </Stack>
          </Box>

          <Box
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              backgroundColor: '#FFFFFF',
            }}>
            <Box mt={5}>
              <Text fontSize={18} fontWeight={400} color="#333333" mb={5}>
                Descrição
              </Text>
              <Input
                value={task.description || taskData?.description}
                onChangeText={text => setTask({...task, description: text})}
                variant="outline"
                color="#2E3A59"
                fontWeight={500}
                fontSize={16}
                multiline={true}
              />
            </Box>

            <Box mt={5}>
              <Text fontSize={18} fontWeight={400} color="#333333" mb={5}>
                Status
              </Text>
              <HStack alignItems="center" justifyContent="space-between">
                <BtnGroup
                  selectedStatus={statusFilter}
                  setStatus={setStatusFilter}
                />
              </HStack>
            </Box>

            <Box mt={10}>
              <Buttom
                isLoading={isLoading}
                title={routes?.params ? 'Salvar' : 'Criar tarefa'}
                style={{
                  width: '100%',
                  height: 53,
                }}
                onPress={() => {
                  routes?.params ? updateTask() : handleNewTaskRegister();
                }}
              />
            </Box>
          </Box>

          {isLoading && (
            <>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                }}>
                <Loading />
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
