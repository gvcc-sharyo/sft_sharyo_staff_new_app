import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  ImageBackground,
  Alert,
  Keyboard,
  View,
  ScrollView,
  Dimensions,
  ToastAndroid,
  Platform,
} from 'react-native';

import {TextInput} from 'react-native-paper';
import {components} from '@components/index';
const {CImage, Container, CButton, CText} = components;
// image
import profileImage from '@assets/Image/loginbg.png';
import profilePic from '@assets/Image/loginpic.png';
import {styles} from '@assets/Styles/styles';

import Icon, {Icons} from '@components/CIcon/CustomIcon';
import {COLORS} from '@constants/colors';
import {useSelector, useDispatch} from 'react-redux';
// import {setToken, logout} from '../../features/userSlice';

// import AsyncStorage from '@react-native-async-storage/async-storage';
import {forgotPassword} from '../../Util';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const ForgotVerifyScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkBox, setCheckBox] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');

  const [registerValue, setRegisterValue] = useState('');

  const otpSend = async () => {
    if (registerValue != '') {
      // navigation.navigate('ForgotOtpScreen', {registerValue : registerValue})

      let body = {
        username: registerValue,
      };

      try {
        let response = await forgotPassword(body);
        console.log(response.data);
        let resStatus = response.data.status;

        if (resStatus === true) {
          toastMessageFunction(response.data.message);
          navigation.navigate('ForgotOtpScreen', {
            registerValue: registerValue,
            otp: response.data.OTP,
          });
          // dispatch(logout());
        } else {
          // console.log(response.data.message);
          toastMessageFunction(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toastMessageFunction('Please Enter Your Email / Register Mobile No.');
      // Alert.alert('Warning', 'Please Enter Your Email / Register Mobile No.', [
      //   {
      //     text: 'Ok',
      //     onPress: () => console.log('OK'),
      //     style: 'cancel',
      //   },
      // ]);
    }
  };
  const toastMessageFunction = message => {
    if (Platform.OS === 'ios') {
      Alert.alert(message);
    } else {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  };
  return (
    <ScrollView>
      <View style={{flex: 1, marginHorizontal: WIDTH * 0.05}}>
        <Container
          direction="row"
          justify="space-between"
          align="center"
          pv={HEIGHT * 0.025}>
          <Container
            width={'15%'}
            touchable
            onPress={() => navigation.goBack()}
            //   height={25}
          >
            <Icon
              type={Icons.MaterialIcons}
              size={HEIGHT * 0.03}
              name={'arrow-back-ios'}
              color={'#000000'}
            />
          </Container>
          <Container>
            <CText color={'#000000'} ph={8} size={HEIGHT * 0.03} weight="bold">
              Verification
            </CText>
          </Container>
          <Container width={'15%'}></Container>
        </Container>
        <View>
          <View style={{marginVertical: 10, width: '100%'}}>
            <TextInput
              underlineColor="transparent"
              style={styles.inputPaper}
              // autoCompleteType="email"
              label="Enter Your Email / Register Mobile No."
              underlineColorAndroid="transparent"
              activeUnderlineColor={'#2144C1'}
              outlineColor={'#000'}
              value={registerValue}
              // maxLength={10}
              // keyboardType="numeric"
              keyboardDismissMode="none"
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={text => setRegisterValue(text)}
              theme={{
                roundness: 10,
                colors: {
                  underlineColor: 'transparent',
                },
              }}
            />
          </View>
          <Container touchable width="100%" style={{marginTop: HEIGHT * 0.1}}>
            <CButton
              // disabled={
              //   rating === "" || feedType === "" || reason === "" || remark === ""
              // }
              align="center"
              radius={8}
              width="100%"
              label="Next"
              bg={'#2144C1'}
              color={'#fff'}
              padding={HEIGHT * 0.022}
              size={HEIGHT * 0.025}
              //   weight="bold"
              // mv={12}
              onPress={otpSend}

              // onPress={() => navigation.navigate('OtpScreen',  {name:'Jane'})}
              // style={{borderRadius: 10}}
            />
          </Container>
        </View>
      </View>
    </ScrollView>
  );
};
