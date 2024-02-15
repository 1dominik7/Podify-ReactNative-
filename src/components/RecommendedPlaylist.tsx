import {Playlist} from 'src/@types/audio';
import {useFetchRecommendedPlayist} from 'hooks/query';
import {FC} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import colors from 'utils/colors';

interface Props {
  onListPress(playlist: Playlist): void;
}

const RecommendedPlaylist: FC<Props> = ({onListPress}) => {
  const {data} = useFetchRecommendedPlayist();

  if(!data?.length) return null

  return (
    <View>
      <Text style={styles.header}>Playlist for you</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <Pressable
              onPress={() => onListPress(item)}
              style={styles.container}>
              <Image
                source={require('../assets/music.png')}
                style={styles.image}
              />
              <View style={styles.overlay}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.title}>{item.itemsCount}</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const cardSize = 150;

const styles = StyleSheet.create({
  container: {
    width: cardSize,
    marginRight: 15,
  },
  image: {
    width: cardSize,
    height: cardSize,
    borderRadius: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.OVERLAY,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  title: {
    color: colors.CONTRAST,
    fontWeight: 'bold',
    fontSize: 18,
  },
  header: {
    color: colors.CONTRAST,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default RecommendedPlaylist;
