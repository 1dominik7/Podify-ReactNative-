import {Playlist} from 'src/@types/audio';
import {useFetchPlaylist} from 'hooks/query';
import {FC} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  updateIsPlaylistPrivate,
  updatePlaylistVisibility,
  updateSelectedListId,
} from 'store/playlistModal';
import EmptyRecords from 'ui/EmptyRecords';
import PlaylistItem from 'ui/PlaylistItem';

interface Props {}

const PlaylistTab: FC<Props> = props => {
  const {data, isLoading} = useFetchPlaylist();
  const dispatch = useDispatch();

  const handleOnListPress = (playlist: Playlist) => {
    dispatch(updateIsPlaylistPrivate(playlist.visibility === 'private'));
    dispatch(updateSelectedListId(playlist.id));
    dispatch(updatePlaylistVisibility(true));
  };

  return (
    <ScrollView style={styles.container}>
      {!data?.length ? <EmptyRecords title="There is no playlist!" /> : null}
      {data?.map(playlist => {
        return (
          <PlaylistItem
            onPress={() => handleOnListPress(playlist)}
            key={playlist.id}
            playlist={playlist}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PlaylistTab;
