import {AudioData, CompletePlaylist, History, Playlist} from 'src/@types/audio';
import catchAsyncError from 'api/catchError';
import {getClient} from 'api/client';
import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import {updateNotification} from 'store/notification';

const fetchLatest = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/audio/latest');
  return data.audios;
};

export const useFetchLatestAudios = () => {
  const dispatch = useDispatch();
  return useQuery(['latest-uploads'], {
    queryFn: fetchLatest, // () => fetchLatest()
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchRecommended = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/profile/recommended');
  return data.audios;
};

export const useFetchRecommendedAudios = () => {
  const dispatch = useDispatch();
  return useQuery(['recommended'], {
    queryFn: fetchRecommended, // () => fetchLatest()
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchPlaylist = async (): Promise<Playlist[]> => {
  const client = await getClient();
  const {data} = await client('/playlist/by-profile');
  return data.playlist;
};

export const useFetchPlaylist = () => {
  const dispatch = useDispatch();
  return useQuery(['playlist'], {
    queryFn: fetchPlaylist, // () => fetchLatest()
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchUploadsByProfile = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/profile/uploads');
  return data.audios;
};

export const useFetchUploadsByProfile = () => {
  const dispatch = useDispatch();
  return useQuery(['uploads-by-profile'], {
    queryFn: fetchUploadsByProfile, // () => fetchLatest()
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchFavorites = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/favorite');
  return data.audios;
};

export const userFetchFavorite = () => {
  const dispatch = useDispatch();
  return useQuery(['favorite'], {
    queryFn: fetchFavorites, // () => fetchLatest()
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchHistories = async (): Promise<History[]> => {
  const client = await getClient();
  const {data} = await client('/history');
  return data.histories;
};

export const userFetchHistories = () => {
  const dispatch = useDispatch();
  return useQuery(['histories'], {
    queryFn: fetchHistories, // () => fetchLatest()
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchRecentlyPlayed = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/history/recently-played');
  return data.audios;
};

export const useFetchRecenlyPlayed = () => {
  const dispatch = useDispatch();
  return useQuery(['recently-played'], {
    queryFn: fetchRecentlyPlayed, // () => fetchLatest()
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchRecommendedPlaylist = async (): Promise<Playlist[]> => {
  const client = await getClient();
  const {data} = await client('/profile/auto-generated-playlist');
  return data.playlist;
};

export const useFetchRecommendedPlayist = () => {
  const dispatch = useDispatch();
  return useQuery(['recommended-playlist'], {
    queryFn: fetchRecommendedPlaylist, // () => fetchLatest()
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchIsFavorite = async (id: string): Promise<boolean> => {
  const client = await getClient();
  const {data} = await client('/favorite/is-fav?audioId=' + id);
  return data.result;
};

export const useFetchIsFavorite = (id: string) => {
  const dispatch = useDispatch();
  return useQuery(['favorite', id], {
    queryFn: () => fetchIsFavorite(id), // () => fetchLatest()
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
    enabled: id ? true : false,
  });
};

const fetchPublicProfile = async (id: string): Promise<PublicProfile> => {
  const client = await getClient();
  const {data} = await client('/profile/info/' + id);
  return data.profile;
};

export const useFetchPublicProfile = (id: string) => {
  const dispatch = useDispatch();
  return useQuery(['profile', id], {
    queryFn: () => fetchPublicProfile(id), // () => fetchLatest()
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
    enabled: id ? true : false,
  });
};

const fetchPublicUploads = async (id: string): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/profile/uploads/' + id);
  return data.audios;
};

export const useFetchPublicUploads = (id: string) => {
  const dispatch = useDispatch();
  return useQuery(['uploads', id], {
    queryFn: () => fetchPublicUploads(id), // () => fetchLatest()
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
    enabled: id ? true : false,
  });
};

const fetchPublicPlaylist = async (id: string): Promise<Playlist[]> => {
  const client = await getClient();
  const {data} = await client('/profile/playlist/' + id);
  return data.playlist;
};

export const useFetchPublicPlaylist = (id: string) => {
  const dispatch = useDispatch();
  return useQuery(['playlist', id], {
    queryFn: () => fetchPublicPlaylist(id), // () => fetchLatest()
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
    enabled: id ? true : false,
  });
};

const fetchPlaylistAudios = async (id: string, isPrivate: boolean): Promise<CompletePlaylist> => {
  const endpoint = isPrivate ? '/profile/private-playlist-audios/' + id : '/profile/playlist-audios/' + id
  const client = await getClient();
  const {data} = await client(endpoint);
  return data.list;
};

export const useFetchPlaylistAudios = (id: string, isPrivate: boolean) => {
  const dispatch = useDispatch();
  return useQuery(['playlist-audios', id], {
    queryFn: () => fetchPlaylistAudios(id, isPrivate), // () => fetchLatest()
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
    enabled: id ? true : false,
  });
};

const fetchIsFollowing = async (id: string): Promise<boolean> => {
  const client = await getClient();
  const {data} = await client('/profile/is-following/' + id);
  return data.status;
};

export const useFetchIsFollowing = (id: string) => {
  const dispatch = useDispatch();
  return useQuery(['is-following', id], {
    queryFn: () => fetchIsFollowing(id), // () => fetchLatest()
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
    enabled: id ? true : false,
  });
};