import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  Alert,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  ToastAndroid,
  Platform,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {Navigation} from './src/components/Navigation/navigation';

import {Provider, useDispatch} from 'react-redux';

import {components} from '@components/index';
const {CImage, Container, CButton, CText} = components;

import {COLORS} from '@constants/colors';
import {
  setOnlyToken,
  setUser,
  logout,
  setToken,
} from './src/features/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {staffDetailsByToken} from './src/Util';
import flashbg from './src/assets/Image/loginbg.png';
import sharyoSplash from './src/assets/Image/sharyoSplash.jpg';
import {navigate} from './src/components/RootNaivgation';
import VersionCheck from 'react-native-version-check';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function Entry() {
  const [loading, setLoading] = useState(true);
  const [splashScreen, setSplashScreen] = useState(1);
  const dispatch = useDispatch();
  const [versionNo, setVersionNo] = useState('');

  useEffect(() => {
    // if (loading) {
    // console.log("here")
    getVersionNumber();
    TokenFetch();
    //   this.setTimeout( () => {
    //     // console.log('hello');
    //     setSplashScreen(2);
    //  },2000)
    const timer = setTimeout(() => {
      setSplashScreen(2);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  async function getVersionNumber() {
    try {
      let version = VersionCheck.getCurrentVersion();
      setVersionNo(version);
    } catch (error) {}
  }

  const TokenFetch = async () => {
    const result = await AsyncStorage.getItem('@token_value');
    // const result = await AsyncStorage.getAllKeys('');

    console.log('token value', result);
    // return;
    if (result) {
      dispatch(setOnlyToken(result));
      console.log('no');
      let body = {};
      try {
        let response = await staffDetailsByToken(body);
        console.log('Entry', response.data);
        if (response.data.return) {
          toastMessageFunction('login failed for user token is expired!');

          await AsyncStorage.removeItem('@token_value');
          dispatch(logout());
        }
        console.log(response.data.user);
        // return;
        let resStatus = response.data.status;
        if (resStatus === true) {
          // let temptoken = response.data.user.token;
          // setLoader(false);
          // dispatch(setUser(response.data.user));
          dispatch(
            setToken({
              token: result,
              user: response.data.user,
              services: '',
            }),
          );
          // dispatch(setToken({token: token, user: response.data.data}));
          //   ToastAndroid.show("Profile Update Successfully", ToastAndroid.SHORT);
          //   navigation.navigate('ProfileScreen');
        } else {
          // setLoader(false);
          //   ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        }
      } catch (error) {
        // setLoader(false);
        console.log(error);
      }
    }
  };

  const toastMessageFunction = message => {
    if (Platform.OS === 'ios') {
      Alert.alert(message);
    } else {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  };

  //   if (loading)
  //     return (
  //       <ActivityIndicator
  //         style={{
  //           flex: 1,
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //         size="large"
  //         color="#00ff00"
  //       />
  //     );
  //   else
  return (
    <>
      {splashScreen == 1 ? (
        <ImageBackground
          source={sharyoSplash}
          resizeMode="cover"
          style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
          <Text
            style={{color: '#fff', fontSize: HEIGHT * 0.022, marginBottom: 10}}>
            Version {versionNo}
          </Text>
        </ImageBackground>
      ) : (
        <>
          {/* <StatusBar animated={true} barStyle={'dark-content'} backgroundColor={COLORS.primary} /> */}
          <Navigation />
        </>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
