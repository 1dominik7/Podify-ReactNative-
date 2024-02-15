import {FC, ReactNode} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import CircleUI from 'ui/CircleUI';
import colors from 'utils/colors';

interface Props {
  children: ReactNode;
  heading?: string;
  subHeading?: string;
}

const AuthFormContainer: FC<Props> = ({children, heading, subHeading}) => {
  return (
    <View style={styles.container}>
      <CircleUI position="top-left" size={200} />
      <CircleUI position="top-right" size={100} />
      <CircleUI position="bottom-left" size={100} />
      <CircleUI position="bottom-right" size={200} />
      <View style={styles.headerContainer}>
        <Image source={require('../assets/logo.png')} />
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  heading: {
    color: colors.SECONDARY,
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  subHeading: {color: colors.CONTRAST, fontSize: 16},
  headerContainer: {width: '100%', marginBottom: 20},
});

export default AuthFormContainer;
