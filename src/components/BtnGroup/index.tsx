import React from 'react';

import {View} from 'react-native';
import BtnStatus from '../BtnStatus';
import {HStack} from 'native-base';

type IBtnProps = {
  selectedStatus: string | '';
  setStatus: React.Dispatch<React.SetStateAction<string | ''>>;
};

const dataStatus = [
  {
    id: 1,
    name: 'Aberto',
  },
  {
    id: 2,
    name: 'Em andamento',
  },
  {
    id: 3,
    name: 'Concluído',
  },
];

type IStatus = (typeof dataStatus)[0];

export default function BtnGroup({selectedStatus, setStatus}: IBtnProps) {
  function selectStatus(status: IStatus) {
    if (selectedStatus === status.name) {
      return setStatus('');
    }
    return setStatus(status.name);
  }

  return (
    <HStack>
      {dataStatus.map(item => (
        <>
          <View
            key={item.id}
            style={{
              marginRight: 22,
            }}>
            <BtnStatus
              onPress={() => selectStatus(item)}
              title={item.name}
              isActive={selectedStatus === item.name}
            />
          </View>
        </>
      ))}
    </HStack>
  );
}
