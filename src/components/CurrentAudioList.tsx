import useAudioController from 'hooks/useAudioController';
import {FC} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {getPlayerState} from 'store/player';
import AudioListModal from 'ui/AudioListModal';

interface Props {
  visible: boolean;
  onRequestClose(): void;
}

const CurrentAudioList: FC<Props> = ({visible, onRequestClose}) => {
  const {onGoingList} = useSelector(getPlayerState);
  const {onAudioPress} = useAudioController();

  return (
    <AudioListModal
      visible={visible}
      onRequestClose={onRequestClose}
      header="Audios on the way"
      data={onGoingList}
      onItemPress={onAudioPress}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CurrentAudioList;
