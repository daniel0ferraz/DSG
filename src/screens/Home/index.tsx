import React, { useEffect, useCallback, useState } from 'react';
import { Box, HStack, Icon, Text } from 'native-base';


import { Alert, FlatList, View } from 'react-native';
import Header from '../../components/Header';
import Filter from '../../components/Filter';
import Task from '../../components/Task';
import { getRealm } from '../../databases/realm';
import { ITask } from '../../@types/ITask';
import { useFocusEffect } from '@react-navigation/native';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filterSelected, setFilterSelected] = useState<
    'my-tasks' | 'all-tasks'
  >('my-tasks');

  const userName = 'Daniel'

  const fetchTasks = async () => {
    setIsLoading(true);
    const realm = await getRealm();

    try {
      const response = realm.objects<ITask[]>('Task').toJSON()


      const filter = response.filter((data: ITask) => data.responsible === 'Daniel')

      if (filterSelected === 'all-tasks') {
        setTasks(response)
      } else {
        setTasks(filter)
      }

    } catch (error) {
      setIsLoading(false);
      Alert.alert('Não foi possivel buscar tarefas');
      console.log(error);
    } finally {
      realm.close();
      setIsLoading(false);
    }
  };

  useFocusEffect(useCallback(() => {
    fetchTasks();
  }, [filterSelected]));



  return (
    <>
      <View
        style={{
          backgroundColor: '#6FEA8B',
          width: '100%',
          height: 7,
        }}
      />
      <Box flex={1} backgroundColor="#FFFFFF" padding={17}>
        <HStack w="100%" alignItems="center" justifyContent="space-between">
          <Header title={`Olá ${userName}`} subtitle="Tenha um ótimo dia" />
        </HStack>

        <HStack mt={8}>
          <Filter
            type="my-tasks"
            title="Minhas Tarefas"
            isActive={filterSelected === 'my-tasks'}
            onPress={() => setFilterSelected('my-tasks')}
          />

          <Filter
            type="all-tasks"
            title="Todas as tarefas"
            isActive={filterSelected === 'all-tasks'}
            onPress={() => setFilterSelected('all-tasks')}
          />
        </HStack>

        <Box mt={30}>
          <Text>Slider</Text>
        </Box>

        <Box mt={30}>
          <FlatList
            data={tasks}
            keyExtractor={item => item._id}
            renderItem={({ item }) => <Task dataTask={item} />}

          />
        </Box>
      </Box>
    </>
  );
}
