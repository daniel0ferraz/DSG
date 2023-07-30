import React, {useEffect, useState} from 'react';

import {View, TouchableOpacity, StyleSheet, RefreshControl} from 'react-native';
import {ITask, ITaskObject} from '../../@types/ITask';
import {getRealm} from '../../databases/realm';
import uuid from 'react-native-uuid';
import Loading from '../../components/Loading';
import {Box, Center, FlatList, Text} from 'native-base';
import Task from '../../components/Task';

export default function Notification() {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  let task: Realm.Results<ITaskObject>;

  const write = async () => {
    const realm = await getRealm();

    try {
      setIsLoading(true);
      realm.write(() => {
        realm.create('Task', {
          id: uuid.v4(),
          titleTask: 'Daniel Ferraz',
          responsible: 'task.a',
          dateDeadline: 'task.as',
          description: 'task.s',
          status: 'Concluido',
        });
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getTask = async () => {
    const realm = await getRealm();

    try {
      setIsLoading(true);

      const data = realm.objects<ITask>('Task').toJSON();
      setTasks(data);
      console.log(
        'Total de tarefas: ' + data.length,
        '\n' + JSON.stringify(data),
      );
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const updateTask = async () => {
    const realm = await getRealm();

    console.log('==> realm', realm);

    console.log('==>', tasks[0].name);

    const data = {
      id: 'bb7c4bb6-bc83-4d6b-b9bc-0c9087e969d1',
      titleTask: 'Rest React Native',
      responsible: 'Daniel',
      dateDeadline: '17/04/2023',
      description: 'task.description',
      status: 'Concluído',
    };

    realm.write(() => {
      realm.create('Task', data, Realm.UpdateMode.Modified);
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    getTask();

    setRefreshing(false);
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Olá, RealDB</Text>

        <View style={styles.rowItens}>
          <TouchableOpacity style={styles.button} onPress={getTask}>
            <Text style={styles.text}>Buscar Task</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={write}>
            <Text style={styles.text}>Atualizar Task</Text>
          </TouchableOpacity>
        </View>

        <Box flex={1} mt={15}>
          <FlatList
            data={tasks}
            keyExtractor={(item: ITask) => String(item.id)}
            renderItem={({item}) => <Task dataTask={item} />}
            ItemSeparatorComponent={() => <View style={{marginTop: 15}} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={() => (
              <>
                <Center mt={50}>
                  <Text fontSize="lg">Nenhuma tarefa registrada.</Text>
                </Center>
              </>
            )}
          />
        </Box>
        {isLoading && <Loading />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

    padding: 12,
  },

  rowItens: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  button: {
    width: 160,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#E5EAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    color: '#110e0e',
    fontSize: 14,
  },
});
