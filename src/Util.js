import React from 'react';
import {store} from './store';
import {Alert, Platform, ToastAndroid} from 'react-native';
import {logout} from './features/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from './components/RootNaivgation';

const axios = require('axios');

// const BASE_URL = "https://classsetu.shyamfuture.in/";
//const BASE_URL = 'http://166.62.54.122:8080/sharyo/api/site/';
const BASE_URL = 'https://backoffice.sharyo.in/sharyo/api/site/';

// const BASE_URL = 'https://backofficestg.sharyo.in/sharyo/api/site/';

// const BASE_URL = "https://sharyoadmin.shyamfuture.in/sharyo/api/site/";

// http://166.62.54.122:8080/sharyo/api/site/login-with-email

// const BASE_URL = "http://192.168.1.170/smallteagrowers/api/";
// const IMG_BASE_URL = "https://traceteastg.in/public/"

const state = store.getState();
const instance = axios.create({
  baseURL: BASE_URL,
});

const api = async (url, method, header = null, body = null, formdata) => {
  try {
    let state = store.getState();
    let data = body;

    console.log(BASE_URL + url);
    const response = await axios({
      method: method,
      url: BASE_URL + url + '/',
      data: data,
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type' :  'multipart/form-data',
        source: 'sharyo',
        apiKey: 'coN21di1202VII01Ed0OnNiMDa2P3p0M',
        Token: state.userauth.token,
      },
    });
    return response;
  } catch (error) {
    console.log(error.response);
    console.log(error.response.data);
    if (error.response.status == 403) {
      navigate('My Profile', {screen: 'AutoLogout'});

      // dispatch(logout());
      if (Platform.OS === 'android') {
        ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
      } else {
        // AlertIOS.alert('Please enter your registered email id and password');
        Alert.alert('Warning', error.response.data.message);
      }
    } else if (error.response.status == 400) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
      } else {
        // AlertIOS.alert('Please enter your registered email id and password');
        Alert.alert('Warning', error.response.data.message);
      }
    } else {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      } else {
        // AlertIOS.alert('Please enter your registered email id and password');
        Alert.alert('Warning', 'Something went wrong');
      }
    }
  }
};

const apiFormdata = async (
  url,
  method,
  header = null,
  body = null,
  formdata,
) => {
  try {
    let state = store.getState();
    let data = body;

    console.log(BASE_URL + url);
    const response = await axios({
      method: method,
      url: BASE_URL + url + '/',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        // 'Content-Type' :  'multipart/form-data',

        source: 'sharyo',
        apiKey: 'coN21di1202VII01Ed0OnNiMDa2P3p0M',
        Token: state.userauth.token,
      },
    });
    return response;
  } catch (error) {
    console.log(error.response);

    console.log(error.response.data);
    if (error.response.status == 403) {
      // dispatch(logout());
      navigate('My Profile', {screen: 'AutoLogout'});

      if (Platform.OS === 'android') {
        ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
      } else {
        // AlertIOS.alert('Please enter your registered email id and password');
        Alert.alert('Warning', error.response.data.message);
      }

      return;
    }
  }
};

const getapi = async (url, method, header = null, body = null, formdata) => {
  try {
    let state = store.getState();
    let data = body;
    console.log(state.userauth.token);
    console.log(BASE_URL + url);
    const response = await axios({
      method: method,
      url: BASE_URL + url + '/',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type' :  'multipart/form-data',
        source: 'sharyo',
        apiKey: 'coN21di1202VII01Ed0OnNiMDa2P3p0M',
        Token: state.userauth.token,
      },
    });
    return response;
  } catch (error) {
    console.log(error.response);
    console.log(error.response.status);
    if (error.response.status == 403) {
      navigate('My Profile', {screen: 'AutoLogout'});

      if (Platform.OS === 'android') {
        ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
      } else {
        // AlertIOS.alert('Please enter your registered email id and password');
        Alert.alert('Warning', error.response.data.message);
      }
      return;
    }
    if (Platform.OS === 'android') {
      ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
    } else {
      // AlertIOS.alert('Please enter your registered email id and password');
      Alert.alert('Warning', error.response.data.message);
    }
  }
};

const userlogin = async body => {
  const response = await api('staff-login', 'post', null, body, false);
  return response;
};

const staffUserloginWithPhone = async body => {
  const response = await api(
    'staff-login-with-phone',
    'post',
    null,
    body,
    false,
  );
  return response;
};

const loginWitPhoneOtp = async body => {
  const response = await api(
    'staff-login-with-phone-otp',
    'post',
    null,
    body,
    false,
  );
  return response;
};

const serviceListApi = async body => {
  const response = await getapi('service-list', 'get', null, body, false);
  return response;
};

const signupWithEmail = async body => {
  const response = await api('signup-with-email', 'post', null, body, false);
  return response;
};

const signupWithEmailOtp = async body => {
  const response = await api(
    'signup-with-email-otp',
    'post',
    null,
    body,
    false,
  );
  return response;
};

const signupWithPhone = async body => {
  const response = await api('signup-with-phone', 'post', null, body, false);
  return response;
};

const signupWithPhoneOtp = async body => {
  const response = await api(
    'signup-with-phone-otp',
    'post',
    null,
    body,
    false,
  );
  return response;
};

const profileChangePassword = async body => {
  const response = await api('change-password', 'post', null, body, false);
  return response;
};

const forgotPassword = async body => {
  const response = await api(
    'staff-forgot-password',
    'post',
    null,
    body,
    false,
  );
  return response;
};

const forgotPasswordOtpCheck = async body => {
  const response = await api(
    'forgot-password-otp-check',
    'post',
    null,
    body,
    false,
  );
  return response;
};

const forgotPasswordUpdate = async body => {
  const response = await api('password-update', 'post', null, body, false);
  return response;
};

const staffAssignedUpcomingBooking = async body => {
  const response = await getapi(
    'staff-assigned-upcoming-booking',
    'get',
    null,
    body,
    false,
  );
  return response;
};
//const response = await api('booking-details', 'post', null, body, false);
const assignedDookingDetails = async body => {
  const response = await api(
    'booking-details-staff',
    'post',
    null,
    body,
    false,
  );
  return response;
};

const staffAssignedPastBooking = async body => {
  const response = await getapi(
    'staff-assigned-past-booking',
    'get',
    null,
    body,
    false,
  );
  return response;
};

const staffProfileEdit = async body => {
  const response = await api('staff-profile-edit', 'post', null, body, false);
  return response;
};

const staffWorkStart = async body => {
  const response = await api('staff-work-start', 'post', null, body, false);
  return response;
};

const staffWorkComplete = async body => {
  const response = await api('staff-work-complete', 'post', null, body, false);
  return response;
};

const staffDetailsByToken = async body => {
  const response = await getapi(
    'staff-details-by-token',
    'get',
    null,
    body,
    false,
  );
  return response;
};

const staffWorkActionOTPGeneration = async body => {
  const response = await api('staff-work-otp', 'post', null, body, false);
  return response;
};

const accountDeletion = async () => {
  const response = await getapi('user-profile-delete');
  return response;
};

const staffImageUpload = async body => {
  const response = await apiFormdata(
    'staff-image-upload',
    'post',
    null,
    body,
    false,
  );
  return response;
};

export {
  accountDeletion,
  userlogin,
  staffUserloginWithPhone,
  staffWorkActionOTPGeneration,
  loginWitPhoneOtp,
  serviceListApi,
  signupWithEmail,
  signupWithEmailOtp,
  signupWithPhone,
  signupWithPhoneOtp,
  profileChangePassword,
  forgotPassword,
  forgotPasswordOtpCheck,
  forgotPasswordUpdate,
  staffAssignedUpcomingBooking,
  staffAssignedPastBooking,
  staffProfileEdit,
  assignedDookingDetails,
  staffWorkStart,
  staffWorkComplete,
  staffDetailsByToken,
  staffImageUpload,
};
