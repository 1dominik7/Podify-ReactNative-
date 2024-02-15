import {AudioData} from 'src/@types/audio';
import {useFetchLatestAudios} from 'hooks/query';
import {FC} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import AudioCard from 'ui/AudioCard';
import PulseAnimationContainer from 'ui/PulseAnimationContainer';
import colors from 'utils/colors';
import {useSelector} from 'react-redux';
import {getPlayerState} from 'store/player';

interface Props {
  onAudioPress(item: AudioData, data: AudioData[]): void;
  onAudioLongPress(item: AudioData, data: AudioData[]): void;
}

const dummyData = new Array(4).fill('');

const LatestUploads: FC<Props> = ({onAudioLongPress, onAudioPress}) => {
  const {data, isLoading} = useFetchLatestAudios();
  const {onGoingAudio} = useSelector(getPlayerState);

  if (isLoading)
    return (
      <PulseAnimationContainer>
        <View style={styles.container}>
          <View style={styles.dummyTitleView} />
          <View style={styles.dummyAudioContainer}>
            {dummyData.map((_, index) => {
              return <View key={index} style={styles.dummyAudioView} />;
            })}
          </View>
        </View>
      </PulseAnimationContainer>
    );

            if(!data?.length) return null

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Uploads</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.map(item => {
          return (
            <AudioCard
              key={item.id}
              title={item.title}
              poster={item.poster}
              onPress={() => onAudioPress(item, data)}
              onLongPress={() => onAudioLongPress(item, data)}
              playing={item.id === onGoingAudio?.id}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    color: colors.CONTRAST,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  dummyTitleView: {
    height: 20,
    width: 150,
    backgroundColor: colors.INACTIVE_CONTRAST,
    marginBottom: 15,
    borderRadius: 5,
  },
  dummyAudioView: {
    height: 100,
    width: 100,
    backgroundColor: colors.INACTIVE_CONTRAST,
    marginRight: 15,
    borderRadius: 5,
  },
  dummyAudioContainer: {
    flexDirection: 'row',
  },
});

export default LatestUploads;
