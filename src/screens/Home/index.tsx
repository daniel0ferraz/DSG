import React, {useState} from 'react';
import {Box, HStack, Icon, Text} from 'native-base';

import {Pressable, View} from 'react-native';
import Header from '../../components/Header';
import Filter from '../../components/Filter';
import Task from '../../components/Task';

export default function Home() {
  const [filterSelected, setFilterSelected] = useState<
    'my-tasks' | 'all-tasks'
  >('my-tasks');

  console.log('filterSelected', filterSelected);

  return (
    <Box flex={1} backgroundColor="#FFFFFF" padding={17}>
      <HStack w="100%" alignItems="center" justifyContent="space-between">
        <Header title="Olá Tiago!" subtitle="Tenha um ótimo dia" />
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
        <Task
          title="Tarefa 1"
          responsible="Responsável 1"
          dateDeadline="01/01/2021"
          status="open"
        />
      </Box>
    </Box>
  );
}
