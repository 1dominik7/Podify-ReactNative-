import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {FC, useEffect} from 'react';
import AuthNavigator from './AuthNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthState, updateBusyState, updateLoggedInState, updateProfile } from 'store/auth';
import TabNavigator from './TabNavigator';
import { Keys, getFromAsyncStorage } from 'utils/asyncStorage';
import client from 'api/client';
import { View, StyleSheet } from 'react-native';
import Loader from 'ui/Loader';
import colors from 'utils/colors';
import BootSplash from "react-native-bootsplash";

interface Props {}

const AppTheme= {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: colors.PRIMARY,
        primary: colors.CONTRAST,
    }
}

const AppNavigator: FC<Props> = props => {
   const {loggedIn, busy} = useSelector(getAuthState)
   const dispatch = useDispatch()

   useEffect(() => {
    const fetchAudio = async () => {
        dispatch(updateBusyState(true))
        try {
           const token = await getFromAsyncStorage(Keys.AUTH_TOKEN)
           if(!token) {
            return dispatch(updateBusyState(false))
           }
           
          const {data} = await client.get('/auth/is-auth', {
            headers: {
                Authorization: "Bearer " + token
            }
           })
           dispatch(updateProfile(data.profile))
           dispatch(updateLoggedInState(true))
        } catch (error) {
            console.log("Auth error: ", error)
        }
        dispatch(updateBusyState(false))
    }
    fetchAudio()
   }, [])

  return (
    <NavigationContainer     onReady={() => {
        BootSplash.hide();
      }} theme={AppTheme}>
        {busy ? <View style={{...StyleSheet.absoluteFillObject, backgroundColor: colors.OVERLAY, justifyContent: 'center', alignItems:'center', zIndex: 1}}>
            <Loader/>
        </View>  : null}
    {loggedIn ? <TabNavigator/> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
