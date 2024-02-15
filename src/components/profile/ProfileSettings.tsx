import AppHeader from 'components/AppHeader';
import {FC, useEffect, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AvatarField from 'ui/AvatarField';
import colors from 'utils/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppButton from 'ui/AppButton';
import {getClient} from 'api/client';
import catchAsyncError from 'api/catchError';
import {updateNotification} from 'store/notification';
import {useDispatch, useSelector} from 'react-redux';
import {Keys, removeFromAsyncStorage} from 'utils/asyncStorage';
import {
  getAuthState,
  updateBusyState,
  updateLoggedInState,
  updateProfile,
} from 'store/auth';
import deepEqual from 'deep-equal';
import ImagePicker from 'react-native-image-crop-picker';
import {getPermissionToReadImages} from 'utils/helper';
import ReVerificationLink from 'components/ReVerificationLink';
import {useQueryClient} from 'react-query';

interface Props {}
interface ProfileInfo {
  name: string;
  avatar?: string;
}

const ProfileSettings: FC<Props> = props => {
  const [userInfo, setUserInfo] = useState<ProfileInfo>({name: ''});
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();
  const {profile} = useSelector(getAuthState);
  const queryClient = useQueryClient();

  const isSame = deepEqual(userInfo, {
    name: profile?.name,
    avatar: profile?.avatar,
  });

  const handleLogout = async (fromAll?: boolean) => {
    dispatch(updateBusyState(true));
    try {
      const endpoint = '/auth/log-out?fromAll=' + (fromAll ? 'yes' : '');
      const client = await getClient();
      await client.post(endpoint);
      await removeFromAsyncStorage(Keys.AUTH_TOKEN);
      dispatch(updateProfile(null));
      dispatch(updateLoggedInState(false));
    } catch (error) {
      const errorMessga = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessga, type: 'error'}));
    }
    dispatch(updateBusyState(false));
  };

  const handleSubmit = async () => {
    setBusy(true);
    try {
      if (!userInfo.name.trim())
        return dispatch(
          updateNotification({
            message: 'Profile name is require!',
            type: 'error',
          }),
        );
      const formData = new FormData();
      formData.append('name', userInfo.name);

      if (userInfo.avatar) {
        formData.append('avatar', {
          name: 'avatar',
          type: 'image/jpeg',
          uri: userInfo.avatar,
        });
      }

      const client = await getClient({'Content-Type': 'multipart/form-data'});
      const {data} = await client.post('/auth/update-profile', formData);
      dispatch(updateProfile(data.profile));
      dispatch(
        updateNotification({
          message: 'Your profiles is updated',
          type: 'success',
        }),
      );
    } catch (error) {
      const errorMessga = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessga, type: 'error'}));
    }
    setBusy(false);
  };

  const handleImageSelect = async () => {
    try {
      await getPermissionToReadImages();
      const {path} = await ImagePicker.openPicker({
        cropping: true,
        width: 300,
        height: 300,
      });
      setUserInfo({...userInfo, avatar: path});
    } catch (error) {
      console.log(error);
    }
  };

  const clearHistory = async () => {
    try {
      const client = await getClient();
      await client.delete('/history?all=yes');
      dispatch(
        updateNotification({
          message: 'Your history will be removed!',
          type: 'success',
        }),
      );
      queryClient.invalidateQueries({queryKey: ['histories']});
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }
  };

  const handleOnHistoryClear = () => {
    Alert.alert(
      'Are you sure?',
      'This action will clear out all the history',
      [
        {
          text: 'Clear',
          style: 'destructive',
          onPress() {
            clearHistory();
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  useEffect(() => {
    if (profile) setUserInfo({name: profile.name, avatar: profile.avatar});
  }, [profile]);

  return (
    <View style={styles.container}>
      <AppHeader title="Settings" />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile Settings</Text>
      </View>

      <View style={styles.settingOptionsContainer}>
        <View style={styles.avatarContainer}>
          <AvatarField source={userInfo.avatar} />
          <Pressable onPress={handleImageSelect} style={styles.paddingLeft}>
            <Text style={styles.linkText}>Update Profile Image</Text>
          </Pressable>
        </View>
        <TextInput
          onChangeText={text => setUserInfo({...userInfo, name: text})}
          style={styles.nameInput}
          value={userInfo.name}
        />
        <View style={styles.emailContainer}>
          <Text style={styles.email}>{profile?.email}</Text>
          {profile?.verified ? (
            <MaterialIcon name="verified" size={15} color={colors.SECONDARY} />
          ) : (
            <ReVerificationLink linkTitle="verify" activeAtFirst />
          )}
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>History</Text>
      </View>
      <View style={styles.settingOptionsContainer}>
        <Pressable
          onPress={handleOnHistoryClear}
          style={styles.buttonContainer}>
          <MaterialComIcon name="broom" size={20} color={colors.CONTRAST} />
          <Text style={styles.buttonTtle}>Clear All </Text>
        </Pressable>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Logout</Text>
      </View>
      <View style={styles.settingOptionsContainer}>
        <Pressable
          onPress={() => handleLogout(true)}
          style={styles.buttonContainer}>
          <AntDesign name="logout" size={20} color={colors.CONTRAST} />
          <Text style={styles.buttonTtle}>Logout From All</Text>
        </Pressable>
        <Pressable
          onPress={() => handleLogout()}
          style={styles.buttonContainer}>
          <AntDesign name="logout" size={20} color={colors.CONTRAST} />
          <Text style={styles.buttonTtle}>Logout</Text>
        </Pressable>
      </View>
      {!isSame ? (
        <View style={styles.marginTop}>
          <AppButton
            title="Update"
            borderRadius={7}
            onPress={handleSubmit}
            busy={busy}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titleContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.SECONDARY,
    paddingBottom: 5,
    marginTop: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.SECONDARY,
  },
  settingOptionsContainer: {
    marginTop: 15,
    paddingLeft: 15,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    color: colors.SECONDARY,
    fontStyle: 'italic',
  },
  paddingLeft: {
    paddingLeft: 15,
  },
  nameInput: {
    color: colors.CONTRAST,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.CONTRAST,
    borderRadius: 7,
    marginTop: 15,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  email: {
    color: colors.CONTRAST,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonTtle: {
    color: colors.CONTRAST,
    fontSize: 18,
    marginLeft: 5,
  },
  marginTop: {
    marginTop: 15,
  },
});

export default ProfileSettings;
