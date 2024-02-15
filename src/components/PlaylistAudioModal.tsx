import AppModal from '@ui/AppModal';
import AudioListItem from '@ui/AudioListItem';
import AudioListLoadingUI from '@ui/AudioListLoadingUI';
import colors from '@utils/colors';
import useAudioController from 'hooks/useAudioController';
import {FC} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFetchPlaylistAudios} from 'src/hooks/query';
import {
  getPlaylistModalState,
  updatePlaylistVisibility,
} from 'src/store/playlistModal';
import {getPlayerState} from 'store/player';

interface Props {}

const PlaylistAudioModal: FC<Props> = props => {
  const {visible, selectedListId, isPrivate} = useSelector(getPlaylistModalState);
  const {onGoingAudio} = useSelector(getPlayerState);
  const {onAudioPress} = useAudioController();
  const dispatch = useDispatch();
  const {data, isLoading} = useFetchPlaylistAudios(selectedListId || '', isPrivate || false);

  const handleClose = () => {
    dispatch(updatePlaylistVisibility(false));
  };

  if (isLoading)
    return (
      <View style={styles.container}>
        <AudioListLoadingUI />
      </View>
    );

  return (
    <AppModal visible={visible} onRequestClose={handleClose}>
      <Text style={styles.title}>{data?.title}</Text>
      <FlatList
        contentContainerStyle={styles.container}
        data={data?.audios}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <AudioListItem
              onPress={() => onAudioPress(item, data?.audios || [])}
              isPlaying={onGoingAudio?.id === item.id}
              audio={item}
            />
          );
        }}
      />
    </AppModal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    color: colors.CONTRAST,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
  },
});

export default PlaylistAudioModal;
