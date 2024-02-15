import {userFetchFavorite} from 'hooks/query';
import useAudioController from 'hooks/useAudioController';
import {FC} from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {useQueryClient} from 'react-query';
import {useSelector} from 'react-redux';
import {getPlayerState} from 'store/player';
import AudioListItem from 'ui/AudioListItem';
import AudioListLoadingUI from 'ui/AudioListLoadingUI';
import EmptyRecords from 'ui/EmptyRecords';
import colors from 'utils/colors';

interface Props {}

const FavoriteTab: FC<Props> = props => {
  const {onGoingAudio} = useSelector(getPlayerState);
  const {onAudioPress} = useAudioController();
  const {data, isLoading, isFetching} = userFetchFavorite();
  const queryClient = useQueryClient();

  const handleOnRefresh = () => {
    queryClient.invalidateQueries({queryKey: ['favorite']});
  };

  if (isLoading) return <AudioListLoadingUI />;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={handleOnRefresh}
          tintColor={colors.CONTRAST}
        />
      }
      style={styles.container}>
      {!data?.length ? (
        <EmptyRecords title="There is no favorite audio!" />
      ) : null}
      {data?.map(item => {
        return (
          <AudioListItem
            onPress={() => onAudioPress(item, data)}
            audio={item}
            key={item.id}
            isPlaying={onGoingAudio?.id === item.id}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default FavoriteTab;
