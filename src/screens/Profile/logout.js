import {View, Text, Alert} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {logout} from '../../features/userSlice';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

export const Logout = props => {
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      logoutUser();
    }, []),
  );

  const logoutUser = async () => {
    Alert.alert('Logout', 'Are you sure Logout?', [
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
