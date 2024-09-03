import React, {useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
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
import {COLORS} from '@constants/colors';
import {useSelector, useDispatch} from 'react-redux';
// import {setToken, logout} from '../../features/userSlice';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {userlogin, phoneLogin} from '../../Util';
import {
  setEmailVerify,
  setPhoneVerify,
  setFirstNameRedux,
  setLastNameRedux,
} from '../../features/userSlice';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const LoginSignin = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);

  const login = async ({navigation}) => {
    console.log('login');
    
    
    // console.log(token);

    // let body = {
    //   unique_id: 'EM-1-1',
    //   password: '123456',
    //   device_token: '12345',
    //   user_type: 'teacher',
    // };
    // let body = {
    //   unique_id: email,
    //   password: password,
    //   device_token: '12345',
    //   // user_type: 'teacher',
    // };

    // let frm = new FormData();
    // frm.append('unique_id', 'EM-1-1');
    // frm.append('password', '123456');
    // frm.append('device_token', '123456');
    // try {
    //   let response = await userlogin(body);
    //   console.log(response.data);
    //   let resStatus = response.data.status;
    //   if(resStatus === true){
    //   let temptoken = response.data.result.Token;
    //   // console.log(temptoken);

    //   // await SecureStore.setItemAsync('token', temptoken);
    //   // await AsyncStorage.setItem('@token', temptoken);
    //   // console.log(temptoken);

    //   dispatch(setToken({token: temptoken, user: response.data.result}));
    //   }
    //   else {
    //     // console.log(response.data.message);
    //     ToastAndroid.show(response.data.message , ToastAndroid.SHORT);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    // dispatch(
    //       setToken({ token: '4567890987654', user: {} })
    //     );
  };

  const signupPage = () => {
   
    dispatch(setFirstNameRedux({firstNameRedux: ''}));
    dispatch(setLastNameRedux({lastNameRedux: ''}));
    dispatch(setEmailVerify({emailMatch: 0, emailId: ''}));
    dispatch(setPhoneVerify({phoneMatch: 0, phoneNo: ''}));
    navigation.navigate('SignupScreen');
  }

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={profileImage}
        resizeMode="cover"
        style={styles.background}
        >
        <Container align="center" justify="center" style={{flex:1.4}}>
          <CImage
            source={profilePic}
            width={HEIGHT * 0.3}
            height={HEIGHT * 0.16}
          />
        </Container>
        <Container
        //   height="40%"
          width="100%"
          align="center"
          bg={'#2144C1'}
        //   mh={HEIGHT * 0.1}
          
          style={{flex:1,
            borderTopLeftRadius:90
        }}
          >
            <Container mv={HEIGHT * 0.02} style={{marginTop: HEIGHT * 0.08}}>
                <CText size={HEIGHT * 0.032} color={'#fff'}  weight="bold">
                Welcome To Sharyo
                </CText>
            </Container>
            <Container mv={HEIGHT * 0.005} align="center">
                <CText size={HEIGHT * 0.02} color={'#fff'}>
                Please use your login details
                </CText>
                <CText size={HEIGHT * 0.02} color={'#fff'}>
                to manage your work.
                </CText>
            </Container>
          <Container width="90%" mv={20} touchable >
            <CButton
              // disabled={
              //   rating === "" || feedType === "" || reason === "" || remark === ""
              // }
              align="center"
              radius={8}
              width="100%"
              label="Login"
              // bg={'#6180f2'}
              color={'#fff'}
              padding={HEIGHT * 0.022}
              size={HEIGHT * 0.025}
              //   weight="bold"
              // mv={12}
              onPress={() => navigation.navigate('LoginScreen')}
              style={{borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 1,
            }}
            />
          </Container>
        </Container>
      </ImageBackground>
    </View>
  );
};
