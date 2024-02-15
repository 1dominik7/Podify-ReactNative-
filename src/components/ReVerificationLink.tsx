import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ProfileNavigatorStackParamList} from 'src/@types/navigation';
import {getClient} from 'api/client';
import {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {getAuthState} from 'store/auth';
import AppLink from 'ui/AppLink';
import colors from 'utils/colors';

interface Props {
  time?: number;
  activeAtFirst?: boolean;
  linkTitle: string;
  userId?: string;
}

const ReVerificationLink: FC<Props> = ({
  linkTitle,
  userId,
  time = 60,
  activeAtFirst = false,
}) => {
  const [countDown, setCountDown] = useState(time);
  const [canSendNewOtpRequest, setCanSendNewOtpRequest] =
    useState(activeAtFirst);
  const {profile} = useSelector(getAuthState);
  const {navigate} =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>();

  const requestForOTP = async () => {
    setCountDown(60);
    setCanSendNewOtpRequest(false);
    try {
      const client = await getClient();
      await client.post('/auth/re-verify-email', {
        userId: userId || profile?.id,
      });
      navigate('Verification', {
        userInfo: {
          email: profile?.email || '',
          name: profile?.name || '',
          id: userId || profile?.id || '',
        },
      });
    } catch (error) {
      console.log('Requesting for new otp:', error);
    }
  };

  useEffect(() => {
    if (canSendNewOtpRequest) return;
    const intervalId = setInterval(() => {
      setCountDown(oldCountDown => {
        if (oldCountDown <= 0) {
          setCanSendNewOtpRequest(true);
          clearInterval(intervalId);
          return 0;
        }
        return oldCountDown - 1;
      });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [canSendNewOtpRequest]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {countDown > 0 && !canSendNewOtpRequest ? (
          <Text style={styles.countDown}>{countDown} sec</Text>
        ) : null}
        <AppLink
          active={canSendNewOtpRequest}
          title={linkTitle}
          onPress={requestForOTP}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countDown: {
    color: colors.SECONDARY,
    marginRight: 7,
  },
});

export default ReVerificationLink;
