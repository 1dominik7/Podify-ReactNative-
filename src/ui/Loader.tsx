import {FC, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from 'utils/colors';

interface Props {
  color?: string;
}

const Loader: FC<Props> = ({color = colors.CONTRAST}) => {
  const initialRotation = useSharedValue(0);

  const tranform = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${initialRotation.value}deg`}],
    };
  });

  useEffect(() => {
    initialRotation.value = withRepeat(withTiming(360), -1);
  });

  return (
    <Animated.View style={tranform}>
      <AntDesign name="loading1" size={24} color={color} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Loader;
