import React from 'react';

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ITask} from '../../@types/ITask';
import {getRealm} from '../../databases/realm';
import uuid from 'react-native-uuid';

export default function Notification() {
  let task: Realm.Results<ITask>;

  const write = async () => {
    const realm = await getRealm();

    try {
      realm.write(() => {
        realm.create('Task', {
          _id: uuid.v4(),
          titleTask: 'task.titleTask',
          responsible: 'task.responsible',
          dateDeadline: 'task.dateDeadline',
          description: 'task.description',
          status: 'task.status',
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async () => {
    const realm = await getRealm();
    try {
      task = realm.objects<ITask>('Task').toJSON();
      console.log(
        'Total de tarefas: ' + task.length,
        '\n' + JSON.stringify(task),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async () => {
    const realm = await getRealm();

    const data = {
      _id: '362ee3ad-3812-45fe-94f1-011d933c2a01',
      titleTask: 'Estudo React Native',
      responsible: 'Daniel',
      dateDeadline: '17/04/2023',
      description: 'task.description',
      status: 'Concluído',
    };

    realm.write(() => {
      realm.create('Task', data, Realm.UpdateMode.Modified);
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Hello from Home</Text>
        <TouchableOpacity onPress={getTask}>
          <Text style={styles.text}>Get Task</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={updateTask}>
          <Text style={styles.text}>Update Task</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3A49F9',
  },
  text: {
    marginBottom: 20,
  },
});
