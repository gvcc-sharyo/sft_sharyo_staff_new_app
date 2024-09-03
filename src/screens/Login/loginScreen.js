import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  ImageBackground,
  SafeAreaView,
  Keyboard,
  View,
  ScrollView,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';

import {TextInput} from 'react-native-paper';
import {components} from '@components/index';
const {CImage, Container, CButton, CText} = components;
// image
import profileImage from '@assets/Image/loginbg.png';
import profilePic from '@assets/Image/loginpic.png';
import {styles} from '@assets/Styles/styles';

import Icon, {Icons} from '@components/CIcon/CustomIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '@constants/colors';
import {useSelector, useDispatch} from 'react-redux';
import {setToken, logout} from '../../features/userSlice';
import {userlogin, staffUserloginWithPhone} from '../../Util';
import Loader from '../../components/Loader';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkBox, setCheckBox] = useState(false);

  // const [phone, setPhone] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(true);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getData();
    return;
  }, []);

  const login = async () => {
    if (email != '' && password != '') {
      if (checkBox === false) {
        await AsyncStorage.removeItem('@login_details_sharyoStaff');
      }
      let body = {
        username: email,
        password: password,
        // device_token: '12345',
        // user_type: 'teacher',
      };

      try {
        setLoader(true);

        let response = await userlogin(body);
        setLoader(false);

        console.log('login', response.data);
        // return;
        let resStatus = response.data.status;

        if (resStatus === true) {
          if (checkBox === true) {
            storeData(body);
          }
          let temptoken = response.data.user.token;
          console.log(temptoken);
          await AsyncStorage.setItem('@token_value', temptoken);

          dispatch(
            setToken({
              token: temptoken,
              user: response.data.user,
              services: '',
            }),
          );
        } else {
          // console.log(response.data.message);
          // ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
          ToastMag(response.data.message);
        }
      } catch (error) {
        setLoader(false);

        console.log(error);
      }
    } else {
      if (email == '' && password == '') {
        ToastMag('Please enter your registered email id and password');
      } else if (email == '') {
        ToastMag('Please enter your registered email id');
      } else if (password == '') {
        ToastMag('Please enter your password');
      }
    }

    //}
    // dispatch(
    //       setToken({ token: '4567890987654', user: {} })
    //     );
  };

  const ToastMag = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      // AlertIOS.alert('Please enter your registered email id and password');
      Alert.alert('Warning', msg);
    }
  };

  const storeData = async value => {
    console.log('store', value);
    try {
      await AsyncStorage.setItem(
        '@login_details_sharyoStaff',
        JSON.stringify(value),
      );
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    setLoader(false);
    try {
      const value = await AsyncStorage.getItem('@login_details_sharyoStaff');
      const loginData = JSON.parse(value);
      if (value !== null) {
        setEmail(loginData.username);
        setPassword(loginData.password);
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Loader visible={loader} />
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
              Login
            </CText>
          </Container>
          <Container width={'15%'}></Container>
        </Container>
        <View>
          {/* <View style={{marginVertical: 10, width: '100%'}}>
              <TextInput
                underlineColor="transparent"
                style={styles.inputPaper}
                // autoCompleteType="email"
                label="Phone Number"
                underlineColorAndroid="transparent"
                activeUnderlineColor={'#2144C1'}
                outlineColor={'#000'}
                value={phone}
                maxLength={10}
                keyboardType="numeric"
                keyboardDismissMode="none"
                onSubmitEditing={Keyboard.dismiss}
                onChangeText={text => setPhone(text)}
                theme={{
                  roundness: 10,
                  colors: {
                    underlineColor: 'transparent',
                  },
                }}
              />
            </View>
            <Container
              align="center"
              mv={HEIGHT * 0.01}
              direction="row"
              justify="space-between">
              <Container></Container>
              <Container>
                <CText>OR</CText>
              </Container>
              <Container></Container>
            </Container> */}
          <View style={{marginVertical: 5, marginTop: 20}}>
            <TextInput
              underlineColor="transparent"
              style={styles.inputPaper}
              // autoCompleteType="email"
              label="Enter Your Email / Register Mobile No."
              underlineColorAndroid="transparent"
              activeUnderlineColor={'#2144C1'}
              outlineColor={'#000'}
              value={email}
              keyboardDismissMode="none"
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={text => setEmail(text)}
              // onEndEditing={() => onChange(setEmail)}
              theme={{
                roundness: 10,
                colors: {
                  underlineColor: 'transparent',
                },
              }}
            />
          </View>
          <View style={{marginBottom: 5}}>
            <TextInput
              underlineColor="transparent"
              style={styles.inputPaper}
              label="Your Password"
              right={
                <TextInput.Icon
                  name={passwordVisible ? 'eye-off' : 'eye'}
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
          <Container direction="row" justify="space-between">
            <Container
              // justify="center"
              align="center"
              direction="row"
              mv={6}
              mh={10}
              touchable
              onPress={() => setCheckBox(!checkBox)}>
              <Icon
                type={Icons.MaterialCommunityIcons}
                name={
                  checkBox ? 'checkbox-intermediate' : 'checkbox-blank-outline'
                }
                color={checkBox ? '#2144C1' : '#707070'}
                size={25}
              />
              <CText
                color={'#2144C1'}
                size={HEIGHT * 0.022}
                style={{fontWeight: 'bold', paddingLeft: 5}}>
                Remember me
              </CText>
            </Container>
            <Container
              mv={6}
              mh={10}
              touchable
              onPress={() => navigation.navigate('ForgotVerifyScreen')}>
              <CText
                color={'#DA3A2F'}
                size={HEIGHT * 0.022}
                style={{fontWeight: 'bold'}}>
                Forgot Password ?
              </CText>
            </Container>
          </Container>

          <Container touchable width="100%" style={{marginTop: HEIGHT * 0.05}}>
            <CButton
              // disabled={
              //   rating === "" || feedType === "" || reason === "" || remark === ""
              // }
              align="center"
              radius={8}
              width="100%"
              label="Login"
              bg={'#2144C1'}
              color={'#fff'}
              padding={HEIGHT * 0.022}
              size={HEIGHT * 0.025}
              //   weight="bold"
              // mv={12}
              onPress={login}

              // onPress={() => navigation.navigate('OtpScreen',  {name:'Jane'})}
              // style={{borderRadius: 10}}
            />
          </Container>
        </View>
      </View>
    </SafeAreaView>
  );
};
