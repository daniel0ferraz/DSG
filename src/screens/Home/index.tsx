import React, {useEffect, useCallback, useState} from 'react';
import {Box, Center, HStack, Text, View} from 'native-base';

import {Alert, Dimensions, FlatList} from 'react-native';
import Header from '../../components/Header';
import Filter from '../../components/Filter';
import Card from '../../components/Card';
import Task from '../../components/Task';
import {getRealm} from '../../databases/realm';
import {ITask} from '../../@types/ITask';
import {useFocusEffect} from '@react-navigation/native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Loading from '../../components/Loading';

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
  const greetingMessage = () => {
    let h: number = new Date().toLocaleTimeString('pt-BR', {
      hour: 'numeric',
      hour12: false,
    }); // formato 24 horas (0-23)
    if (h >= 0 && h <= 5) {
      // entre meia noite (0h) e 5 da madrugada
      return 'uma Boa madrugada';
    } else if (h >= 6 && h < 12) {
      // entre 6 e 11 da manhã
      return 'um ótimo dia';
    } else if (h >= 12 && h < 18) {
      // entre meio dia (12h) e 17 (5h) da tarde
      return 'uma ótima tarde';
    } else if (h >= 18 && h <= 23) {
      // entre 18 (6h) e 23 (11h) da noite
      return 'uma ótima noite';
    }
  };

  const fetchTasks = async () => {
    setIsLoading(true);
    const realm = await getRealm();

    try {
      const response = realm.objects<ITask[]>('Task').toJSON();

      const filterByUser = response.filter(
        data => data.responsible === userName,
      );
      console.log('response', filterByUser.length);

      /*   if (filterSelected === 'all-tasks') {
        setTasks(response);
      } else {
        setTasks(filterByUser);
      }
 */

      if (filterSelected === 'all-tasks') {
        setTasks(response);

        if (cardFilter === 'Total de tarefas') {
          setTasks(response);
        } else {
          setTasks(response.filter(data => data.status.includes(cardFilter)));
        }
      } else {
        setTasks(filterByUser);
        if (cardFilter === 'Total de tarefas') {
          setTasks(filterByUser);
        } else {
          setTasks(
            filterByUser.filter(data => data.status.includes(cardFilter)),
          );
        }
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
      title: 'Concluidas',
      total: tasks.filter(data => data.status === 'Concluido').length,
    },
  ];

  const indexToName = (index: number) => {
    switch (index) {
      case 0:
        return 'Total de tarefas';

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
    }, [filterSelected, cardFilter]),
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
            <Header
              title={`Olá ${userName}!`}
              subtitle={`Tenha ${greetingMessage()}`}
            />
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
            ListEmptyComponent={() => (
              <>
                <Center mt={50}>
                  <Text fontSize="lg">Nenhuma tarefa registrada.</Text>
                </Center>
              </>
            )}
          />
        </Box>
      </View>
    </>
  );
}
