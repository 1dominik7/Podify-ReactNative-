import {FC, ReactNode} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import colors from 'utils/colors';

interface Props {
  size?: number;
  children: ReactNode;
  ignoreContiner?: boolean;
  onPress?(): void;
}

const PlayerController: FC<Props> = ({
  size = 45,
  ignoreContiner,
  children,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: size,
        height: size,
        borderRadius: 45 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ignoreContiner ? 'transparent' : colors.CONTRAST,
      }}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PlayerController;
