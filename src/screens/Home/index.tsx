import React, {useEffect, useCallback, useState} from 'react';
import {Box, HStack, Icon, Text} from 'native-base';

import {Alert, Dimensions, FlatList, View} from 'react-native';
import Header from '../../components/Header';
import Filter from '../../components/Filter';
import Card from '../../components/Card';
import Task from '../../components/Task';
import {getRealm} from '../../databases/realm';
import {ITask} from '../../@types/ITask';
import {useFocusEffect} from '@react-navigation/native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const {width: screenWidth} = Dimensions.get('window');

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filterSelected, setFilterSelected] = useState<
    'my-tasks' | 'all-tasks'
  >('my-tasks');

  const [activeSlide, setActiveSlide] = useState(0);
  const [cardFilter, setCardFilter] = useState('');

  const userName = 'Daniel';

  const fetchTasks = async () => {
    setIsLoading(true);
    const realm = await getRealm();

    try {
      const response = realm.objects<ITask[]>('Task').toJSON();

      const filterByUser = response.filter(
        data => data.responsible === 'Daniel',
      );
      console.log('response', filterByUser.length);

      if (filterSelected === 'all-tasks') {
        setTasks(response);
      } else {
        setTasks(filterByUser);
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Não foi possivel buscar tarefas');
      console.log(error);
    } finally {
      setIsLoading(false);
      realm.close();
    }
  };

  const dataCard = [
    {
      title: 'Total de tarefas',
      total: tasks.length,
    },
    {
      title: 'Abertos',
      total: tasks.filter(data => data.status === 'Aberto').length,
    },
    {
      title: 'Em andamento',
      total: tasks.filter(data => data.status === 'Em andamento').length,
    },
    {
      title: 'concluidas',
      total: tasks.filter(data => data.status === 'Concluido').length,
    },
  ];

  const indexToName = (index: number) => {
    switch (index) {
      case 0:
        return 'Total de tarefas';
        return 'Todas';
      case 1:
        return 'Aberto';
      case 2:
        return 'Em andamento';
      case 3:
        return 'Concluido';

      default:
        'Todas';
    }
  };

  const renderItem = ({item}: any) => {
    return <Card dataCard={item} />;
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [filterSelected]),
  );

  return (
    <>
      <View
        style={{
          backgroundColor: '#6FEA8B',
          width: '100%',
          height: 7,
        }}
      />

      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
        }}>
        <Box padding={15} safeArea>
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
        </Box>

        <Box padding={15} mb={5} backgroundColor="red">
          <Carousel
            data={dataCard}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            ItemSeparatorComponent={() => <View style={{width: 15}} />}
            inactiveSlideScale={1}
            activeSlideAlignment="start"
            snapToAlignment="center"
            itemWidth={screenWidth - 200}
            layout={'default'}
            onSnapToItem={index => {
              setActiveSlide(index);
              const number = indexToName(index);
              setCardFilter(String(number));
            }}
          />

          <Pagination
            dotsLength={dataCard.length}
            activeDotIndex={activeSlide}
            dotContainerStyle={{
              marginHorizontal: 1,
            }}
            containerStyle={{
              marginTop: -20,
            }}
            dotStyle={{
              width: 25,
              height: 6,
              borderRadius: 5,
              backgroundColor: '#6FEA8B',
              marginHorizontal: 0,
            }}
            inactiveDotStyle={{
              width: 14,
              height: 14,
              borderRadius: 50,
              backgroundColor: '#D8DEF3',
            }}
            inactiveDotScale={0.7}
          />
        </Box>

        <Box flex={1} mt={-16} padding={15}>
          <FlatList
            data={tasks}
            keyExtractor={item => String(item._id)}
            renderItem={({item}) => <Task dataTask={item} />}
            ItemSeparatorComponent={() => <View style={{marginTop: 15}} />}
          />
        </Box>
      </View>
    </>
  );
}
