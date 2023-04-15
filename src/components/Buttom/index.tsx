import {
  Button as ButtonNativeBase,
  IButtonProps,
  Heading,
  View,
  Text,
  useTheme,
} from 'native-base';

type Props = IButtonProps & {
  title: string;
  icon?: any;
};

export default function Buttom({title, icon, ...rest}: Props) {
  const {colors} = useTheme();

  return (
    <>
      <ButtonNativeBase
        bg="#3A49F9"
        width={'50%'}
        borderRadius={60}
        padding={5}
        _pressed={{
          bg: 'blue.100',
        }}
        {...rest}>
        <View
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          {icon && icon}

          <Text color="white" fontSize="sm" ml={2} fontWeight={700}>
            {title}
          </Text>
        </View>
      </ButtonNativeBase>
    </>
  );
}
