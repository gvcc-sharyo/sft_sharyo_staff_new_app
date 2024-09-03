import {View, Text, Alert} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {logout} from '../../features/userSlice';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {Logout} from './logout';

export const DeleteAccount = props => {
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      logoutUser();
    }, []),
  );
  async function onPressYes() {
    setLoading(true);
    // await AsyncStorage.setItem('@token', temptoken);
    // console.log(temptoken);
    // toastMessageFunction('Account deleted successfully');
    try {
      let response = await accountDeletion();
      console.log(response.data);
      let resStatus = response.data.status;
      setLoading(false);

      if (resStatus === true) {
        // let temptoken = 'gdbrgbrgbrtbgtr';
        // console.log(temptoken);
        await AsyncStorage.removeItem('@token_value');
        dispatch(logout());

        // await AsyncStorage.setItem('@token', temptoken);
        // console.log(temptoken);
        toastMessageFunction(response.data.message);
      } else {
        toastMessageFunction(response.data.message);
      }
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  }
  const logoutUser = async () => {
    Alert.alert('Logout', 'Are you sure De activate your account?', [
      {
        text: 'Cancel',
        onPress: () => {
          props.navigation.goBack();
        },
        style: 'cancel',
      },
      {
        text: 'Yes, log out me',
        onPress: async () => {
          await AsyncStorage.removeItem('@token_value');
          dispatch(logout());
        },
      },
    ]);

    // let body = {
    //   token: email,
    //   password: password,
    // };

    // try {
    //   let response = await userLogout(body);

    // } catch (error) {

    // }
  };

  return <View>{/* <Text>logout</Text> */}</View>;
};
