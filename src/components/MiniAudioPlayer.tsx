import {FC, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {getPlayerState} from 'store/player';
import colors from 'utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PlayPauseBtn from 'ui/PlayPauseBtn';
import {useProgress} from 'react-native-track-player';
import useAudioController from 'hooks/useAudioController';
import Loader from 'ui/Loader';
import {mapRange} from 'utils/math';
import AudioPlayer from 'components/AudioPlayer';
import CurrentAudioList from '../components/CurrentAudioList';
import {useFetchIsFavorite} from 'hooks/query';
import {useMutation, useQueryClient} from 'react-query';
import {getClient} from 'api/client';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeNavigatorStackParamList} from 'src/@types/navigation';
import {getAuthState} from 'store/auth';

interface Props {}

export const MiniPlayerHight = 60;

const MiniAudioPlayer: FC<Props> = props => {
  const {onGoingAudio} = useSelector(getPlayerState);
  const {profile} = useSelector(getAuthState);
  const {isPlaying, isBusy, togglePlayPause} = useAudioController();
  const progress = useProgress();
  const [playerVisibility, setPlayerVisibility] = useState(false);
  const [showCurrentList, setShowCurrentList] = useState(false);

  const {navigate} =
    useNavigation<NavigationProp<HomeNavigatorStackParamList>>();

  const {data: isFav} = useFetchIsFavorite(onGoingAudio?.id || '');

  const poster = onGoingAudio?.poster;
  const source = poster ? {uri: poster} : require('../assets/music.png');

  const queryClient = useQueryClient();

  const toggleIsFav = async (id: string) => {
    if (!id) return;
    const client = await getClient();
    await client.post('/favorite?audioId=' + id);
  };

  const favoriteMutate = useMutation({
    mutationFn: async id => toggleIsFav(id),
    onMutate: (id: string) => {
      queryClient.setQueriesData<boolean>(
        ['favorite', onGoingAudio?.id],
        oldData => !oldData,
      );
    },
  });

  const showPlayerModal = () => {
    setPlayerVisibility(true);
  };

  const closePlayerModal = () => {
    setPlayerVisibility(false);
  };

  const handleOnCurrentListClose = () => {
    setShowCurrentList(false);
  };

  const handleOnListOptionPress = () => {
    closePlayerModal();
    setShowCurrentList(true);
  };

  const handleOnProfileLinkPress = () => {
    closePlayerModal();
    if (profile?.id === onGoingAudio?.owner.id) {
      navigate('Profile');
    } else {
      navigate('PublicProfile', {
        profileId: onGoingAudio?.owner.id || '',
      });
    }
  };

  return (
    <>
      <View
        style={{
          height: 2,
          backgroundColor: colors.SECONDARY,
          width: `${mapRange({
            outputMin: 0,
            outputMax: 100,
            inputMin: 0,
            inputMax: progress.duration,
            inputValue: progress.position,
          })}%`,
        }}
      />
      <View style={styles.container}>
        <Image source={source} style={styles.poster} />
        <Pressable onPress={showPlayerModal} style={styles.contentContainer}>
          <Text style={styles.title}>{onGoingAudio?.title}</Text>
          <Text style={styles.name}>{onGoingAudio?.owner?.name}</Text>
        </Pressable>
        <Pressable
          onPress={() => favoriteMutate.mutate(onGoingAudio?.id || '')}
          style={{paddingHorizontal: 10}}>
          <AntDesign
            name={isFav ? 'heart' : 'hearto'}
            size={24}
            color={colors.CONTRAST}
          />
        </Pressable>
        {isBusy ? (
          <Loader />
        ) : (
          <PlayPauseBtn playing={isPlaying} onPress={togglePlayPause} />
        )}
      </View>
      <AudioPlayer
        visible={playerVisibility}
        onRequestClose={closePlayerModal}
        onListOptionPress={handleOnListOptionPress}
        onProfileLinkPress={handleOnProfileLinkPress}
      />
      <CurrentAudioList
        visible={showCurrentList}
        onRequestClose={handleOnCurrentListClose}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: MiniPlayerHight,
    backgroundColor: colors.PRIMARY,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    padding: 5,
  },
  poster: {
    height: MiniPlayerHight - 10,
    width: MiniPlayerHight - 10,
    aspectRatio: 1,
    borderRadius: 5,
  },
  title: {
    color: colors.CONTRAST,
    fontWeight: '700',
    paddingHorizontal: 5,
  },
  name: {
    color: colors.SECONDARY,
    fontWeight: '700',
    paddingHorizontal: 5,
  },
});

export default MiniAudioPlayer;
