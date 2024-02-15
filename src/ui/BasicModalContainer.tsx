import {FC, ReactNode} from 'react';
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import colors from 'utils/colors';

interface Props {
  visible?: boolean;
  onRequestClose?(): void;
  children?: ReactNode;
}

const BasicModalContainer: FC<Props> = ({
  visible,
  children,
  onRequestClose,
}) => {
  return (
    <Modal onRequestClose={onRequestClose} visible={visible} transparent>
      <View style={styles.modalContainer}>
        <Pressable onPress={onRequestClose} style={styles.backdrop} />
        <View style={styles.modal}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.INACTIVE_CONTRAST,
    zIndex: -1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparet',
    zIndex: 1,
  },
  modal: {
    width: '90%',
    maxHeight: '50%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.CONTRAST,
  },
});

export default BasicModalContainer;
