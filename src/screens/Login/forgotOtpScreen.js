import React, {useEffect, useState, useRef} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Keyboard,
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  Platform,
  Alert,
  ToastAndroid,
} from 'react-native';

import Icon, {Icons} from '@components/CIcon/CustomIcon';
import {components} from '@components/index';
const {CImage, Container, CButton, CText} = components;
// image
import profileImage from '@assets/Image/loginbg.png';
import otpImage from '@assets/Image/otpImage.png';
import {styles} from '@assets/Styles/styles';
import {COLORS} from '@constants/colors';

import {forgotPassword, forgotPasswordOtpCheck} from '../../Util';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const ForgotOtpScreen = ({route, navigation}) => {
  const sentPrams = route.params.registerValue;
  const otpVal = route.params.otp;
  // console.log(paramss);
  const [otp1, setotp1] = useState('');
  const [otp2, setotp2] = useState('');
  const [otp3, setotp3] = useState('');
  const [otp4, setotp4] = useState('');

  const textInput1 = useRef(null);
  const textInput2 = useRef(null);
  const textInput3 = useRef(null);
  const textInput4 = useRef(null);

  const [resend, setResend] = useState(false);
  const [otpValSave, setOtpValSave] = useState(otpVal);

  const resendOtp = async () => {
    if (counter === 0) {
      setResend(false);
      setCounter(59);

      let body = {
        username: sentPrams,
      };

      try {
        let response = await forgotPassword(body);
        console.log(response.data);
        let resStatus = response.data.status;

        if (resStatus === true) {
          setOtpValSave(response.data.OTP);
        } else {
          // console.log(response.data.message);
          toastMessageFunction(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const SendOTP = async () => {
    // navigation.navigate('ForgotChangePasswordScreen');
    if (otp1 != '' && otp2 != '' && otp3 != '' && otp4 != '') {
      let body = {
        username: sentPrams,
        otp: otp1 + otp2 + otp3 + otp4,
      };
      console.log(body);
      try {
        let response = await forgotPasswordOtpCheck(body);
        console.log(response.data);
        let resStatus = response.data.status;

        if (resStatus === true) {
          navigation.navigate('ForgotChangePasswordScreen', {
            registerValue: sentPrams,
          });

          // dispatch(setEmailVerify({emailMatch: 1,emailId:sentPrams}));
          return;
          // ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        } else {
          // console.log(response.data.message);
          toastMessageFunction(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toastMessageFunction('Please enter your OTP');
    }
  };

  const toastMessageFunction = message => {
    if (Platform.OS === 'ios') {
      Alert.alert(message);
    } else {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  };

  const [counter, setCounter] = React.useState(59);
  React.useEffect(() => {
    if (counter === 0) {
      setResend(true);
    }
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <View style={{flex: 1}}>
      <Container
        align="center"
        mv={HEIGHT * 0.022}
        direction="row"
        justify="space-between">
        <Container
          width="15%"
          align="center"
          touchable
          onPress={() => navigation.goBack()}>
          <Icon
            type={Icons.MaterialIcons}
            size={HEIGHT * 0.03}
            name={'arrow-back-ios'}
            color={'#000000'}
          />
        </Container>
        <Container>
          <CText size={HEIGHT * 0.028}>Enter OTP</CText>
        </Container>

        <Container width="15%"></Container>
      </Container>
      <Container align="center" style={{marginTop: HEIGHT * 0.06}}>
        <CImage source={otpImage} width={HEIGHT * 0.3} height={HEIGHT * 0.3} />
      </Container>
      <Container align="center" mv={5}>
        <CText size={HEIGHT * 0.025} color={'#DA3A2F'}>
          00:{counter}
        </CText>
      </Container>
      <Container align="center" mv={5}>
        <CText size={HEIGHT * 0.022} color={'#9097A5'}>
          OTP is sent to {sentPrams}
        </CText>
        {/* <CText size={HEIGHT * 0.025} color={'#9097A5'}>
          Your OTP is {otpValSave}
        </CText> */}
      </Container>
      <View
        style={{
          //   flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 25,
        }}>
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 25,
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            width: '100%',
          }}>
          <TextInput
            style={styless.OtpInput}
            keyboardType="numeric"
            maxLength={1}
            ref={textInput1}
            value={otp1}
            onChangeText={otp1 => {
              setotp1(otp1);
              if (otp1 != '') {
                textInput2.current.focus();
              }
            }}
          />
          <TextInput
            style={styless.OtpInput}
            keyboardType="numeric"
            maxLength={1}
            ref={textInput2}
            value={otp2}
            onChangeText={otp2 => {
              setotp2(otp2);
              if (otp2 != '') {
                textInput3.current.focus();
              }
            }}
          />
          <TextInput
            style={styless.OtpInput}
            keyboardType="numeric"
            maxLength={1}
            ref={textInput3}
            value={otp3}
            onChangeText={otp3 => {
              setotp3(otp3);
              if (otp3 != '') {
                textInput4.current.focus();
              }
            }}
          />
          <TextInput
            style={styless.OtpInput}
            keyboardType="numeric"
            maxLength={1}
            ref={textInput4}
            value={otp4}
            onChangeText={otp4 => {
              setotp4(otp4);
              if (otp4 != '') {
                textInput4.current.focus();
              }
            }}
          />
        </View>
        <Container touchable width="62%" style={{marginTop: HEIGHT * 0.02}}>
          <CButton
            // disabled={
            //   rating === "" || feedType === "" || reason === "" || remark === ""
            // }
            align="center"
            radius={8}
            width="100%"
            label="Verify"
            bg={'#2144C1'}
            color={'#fff'}
            padding={HEIGHT * 0.022}
            size={HEIGHT * 0.025}
            //   weight="bold"
            // mv={12}
            // onPress={() => navigation.navigate('OtpScreen')}

            onPress={SendOTP}
          />
        </Container>
        <Container mv={20} touchable={resend} onPress={resendOtp}>
          <CText size={HEIGHT * 0.025} color={resend ? '#2144C1' : '#9097A5'}>
            Resend OTP
          </CText>
        </Container>
      </View>
    </View>
  );
};

const styless = StyleSheet.create({
  OtpInput: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    padding: 10,
    fontSize: 20,
    height: 55,
    width: '16%',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    textAlign: 'center',
  },
});
