import {
  Button as ButtonNativeBase,
  IButtonProps,
  Heading,
  View,
  Text,
  useTheme,
  Spinner,
} from 'native-base';

type Props = IButtonProps & {
  title: string;
  icon?: any;
  isLoading?: boolean;
};

export default function Buttom({
  title,
  icon,
  isLoading = false,
  ...rest
}: Props) {
  const {colors} = useTheme();

  return (
    <>
      <ButtonNativeBase
        bg="#3A49F9"
        width={'50%'}
        borderRadius={60}
        _pressed={{
          bg: 'blue.100',
        }}
        {...rest}>
        <View
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          {icon && icon}

          {isLoading && <Spinner color={colors.gray[200]} size="sm" />}
          <Text color="white" fontSize="sm" ml={2} fontWeight={700}>
            {title}
          </Text>
        </View>
      </ButtonNativeBase>
    </>
  );
}
