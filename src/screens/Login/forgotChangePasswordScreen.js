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
import {userlogin, forgotPasswordUpdate} from '../../Util';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const ForgotChangePasswordScreen = ({navigation, route}) => {
  const sentPrams = route.params.registerValue;
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(false);
  const [cpassword, setCpassword] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(true);
  const [cpasswordVisible, setCpasswordVisible] = useState(true);
  // const [registerValue, setRegisterValue] = useState('');

  const changePassword = async () => {
    // if (registerValue != '') {
    // navigation.navigate('LoginSignin');
    if (password != '' && cpassword != '') {
      if (password === cpassword) {
        let body = {
          username: sentPrams,
          password: password,
        };

        try {
          let response = await forgotPasswordUpdate(body);
          console.log(response.data);
          let resStatus = response.data.status;

          if (resStatus === true) {
            ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
            // dispatch(logout());
            navigation.navigate('LoginSignin');
          } else {
            // console.log(response.data.message);
            ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        ToastAndroid.show(
          'New Password and Re Enter New Password does not match.',
          ToastAndroid.SHORT,
        );
      }
    } else {
      ToastAndroid.show('All input field are required.', ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView>
      <View style={{flex: 1, marginHorizontal: WIDTH * 0.05}}>
        <Container
          align="center"
          mv={HEIGHT * 0.022}
          direction="row"
          justify="space-between">
          <Container width="20%">
            <Container touchable onPress={() => navigation.goBack()}>
              <Icon
                type={Icons.AntDesign}
                name={'arrowleft'}
                // color={'#DFE2E7'}
                size={25}
              />
            </Container>
          </Container>
          <CText size={HEIGHT * 0.028}>Change Password</CText>
          <Container width="20%">
            <CText></CText>
          </Container>
        </Container>
        <View>
          <View style={{marginBottom: 5}}>
            <TextInput
              underlineColor="transparent"
              style={styles.inputPaper}
              label="Enter Your New Password"
              right={
                <TextInput.Icon
                  name={passwordVisible ? 'eye' : 'eye-off'}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
              // right={<TextInput.Icon name="eye" />}

              secureTextEntry={passwordVisible}
              value={password}
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={props => setPassword(props)}
              underlineColorAndroid="transparent"
              activeUnderlineColor={'#2144C1'}
              theme={{
                roundness: 10,
              }}
            />
          </View>
          <View style={{marginBottom: 5}}>
            <TextInput
              underlineColor="transparent"
              style={styles.inputPaper}
              label="Re-Enter Your New Password"
              right={
                <TextInput.Icon
                  name={cpasswordVisible ? 'eye' : 'eye-off'}
                  onPress={() => setCpasswordVisible(!cpasswordVisible)}
                />
              }
              // right={<TextInput.Icon name="eye" />}

              secureTextEntry={cpasswordVisible}
              value={cpassword}
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={props => setCpassword(props)}
              underlineColorAndroid="transparent"
              activeUnderlineColor={'#2144C1'}
              theme={{
                roundness: 10,
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
              label="Submit"
              bg={'#2144C1'}
              color={'#fff'}
              padding={HEIGHT * 0.022}
              size={HEIGHT * 0.025}
              //   weight="bold"
              // mv={12}
              onPress={changePassword}

              // onPress={() => navigation.navigate('OtpScreen',  {name:'Jane'})}
              // style={{borderRadius: 10}}
            />
          </Container>
        </View>
      </View>
    </ScrollView>
  );
};
