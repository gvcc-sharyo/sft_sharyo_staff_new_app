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
  SafeAreaView,
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
import {logout} from '../../features/userSlice';
import {useSelector, useDispatch} from 'react-redux';
// import {setToken, logout} from '../../features/userSlice';

// import AsyncStorage from '@react-native-async-storage/async-storage';
import {profileChangePassword} from '../../Util';
import Loader from '../../components/Loader';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const ChangePasswordScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');

  const [currentpasswordVisible, setCurrentpasswordVisible] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [cpasswordVisible, setCpasswordVisible] = useState(true);
  // const [registerValue, setRegisterValue] = useState('');
  const [loader, setLoader] = useState(false);

  const changePassword = async () => {
    // console.log('hi');

    if (currentPassword != '' && password != '' && cpassword != '') {
      if (password === cpassword) {
        let body = {
          current_password: currentPassword,
          new_password: password,
        };

        try {
          setLoader(true);

          let response = await profileChangePassword(body);
          console.log(response.data);
          let resStatus = response.data.status;
          setLoader(false);

          if (resStatus === true) {
            toastMessageFunction(response.data.message);
            dispatch(logout());
          } else {
            // console.log(response.data.message);
            toastMessageFunction(response.data.message);
          }
        } catch (error) {
          setLoader(false);

          console.log(error);
        }
      } else {
        toastMessageFunction(
          'New Password and Re Enter New Password does not match.',
        );
      }
    } else {
      toastMessageFunction('All input field are required.');
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Loader visible={loader} />

      <Container
        width={'100%'}
        //   height={'31%'}
        direction="row"
        justify="space-between"
        // align="center"
        ph={WIDTH * 0.032}
        pv={HEIGHT * 0.03}
        // bg={COLORS.MajorColor}
      >
        <Container
          width={'15%'}
          touchable
          onPress={() => navigation.openDrawer()}>
          <Icon
            type={Icons.Feather}
            size={HEIGHT * 0.03}
            name={'menu'}
            // color={'#fff'}
          />
        </Container>
        <Container>
          <CText color={'#000000'} ph={8} size={HEIGHT * 0.03} weight="bold">
            Change Password
          </CText>
        </Container>
        <Container width={'15%'}></Container>
      </Container>
      <View style={{marginHorizontal: WIDTH * 0.032}}>
        <View style={{marginBottom: 5}}>
          <TextInput
            underlineColor="transparent"
            style={styles.inputPaper}
            label="Enter Your Current Password"
            right={
              <TextInput.Icon
                name={currentpasswordVisible ? 'eye-off' : 'eye'}
                onPress={() =>
                  setCurrentpasswordVisible(!currentpasswordVisible)
                }
              />
            }
            // right={<TextInput.Icon name="eye" />}

            secureTextEntry={currentpasswordVisible}
            value={currentPassword}
            onSubmitEditing={Keyboard.dismiss}
            onChangeText={props => setCurrentPassword(props)}
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
            label="Enter Your New Password"
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
        <View style={{marginBottom: 5}}>
          <TextInput
            underlineColor="transparent"
            style={styles.inputPaper}
            label="Re-Enter Your New Password"
            right={
              <TextInput.Icon
                name={cpasswordVisible ? 'eye-off' : 'eye'}
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
    </SafeAreaView>
  );
};
