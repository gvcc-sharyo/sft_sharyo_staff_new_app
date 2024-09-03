import {View, Text, Alert} from 'react-native';
import React, {useCallback} from 'react';
import {logout} from '../../features/userSlice';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

export const AutoLogout = props => {
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      logoutUser();
    }, []),
  );

  const logoutUser = async () => {
    await AsyncStorage.removeItem('@token_value');
    dispatch(logout());
    // Alert.alert('Logout', 'Are you sure Logout?', [
    //   {
    //     text: 'Cancel',
    //     onPress: () => {
    //       props.navigation.goBack();
    //     },
    //     style: 'cancel',
    //   },
    //   {
    //     text: 'Yes, log out me',
    //     onPress: async () => {
    //       await AsyncStorage.removeItem('@token_value');
    //       dispatch(logout());
    //     },
    //   },
    // ]);
  };
  console.log('LOGUT========>');
  return (
    <View>
      <Text>hello</Text>
    </View>
  );
};
