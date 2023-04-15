import {Box, HStack, Text, Divider, Button, View} from 'native-base';

import IconTask from '../../assets/icon-task.svg';
import IconOptions from '../../assets/icon-options.svg';

type ITaskProps = {
  title: string;
  responsible: string;
  dateDeadline: string;
  status: 'open' | 'in-progress' | 'done';
};

export default function Task({
  title,
  responsible,
  dateDeadline,
  status,
}: ITaskProps) {
  return (
    <View
      width="100%"
      flexDirection="row"
      borderWidth={1}
      borderColor="#CCCCCC"
      borderRadius={10}>
      <IconTask width={36} height={36} />

      <Box flexDirection="column">
        <Text fontWeight={800} fontSize={14} color={'#242736'}>
          {responsible}
          {'-'}
          {dateDeadline}
        </Text>
      </Box>

      <Button>
        <Text>{status}</Text>
      </Button>

      <Button>
        <IconOptions />
      </Button>
    </View>
  );
}
