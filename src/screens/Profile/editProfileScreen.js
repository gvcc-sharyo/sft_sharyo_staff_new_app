import {
  View,
  FlatList,
  Dimensions,
  ImageBackground,
  ScrollView,
  Keyboard,
  ToastAndroid,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {components} from '@components/index';
const {CText, CTextInput, Container, CButton, CScrollable, CImage} = components;

import Icon, {Icons} from '@components/CIcon/CustomIcon';
import {TextInput} from 'react-native-paper';
import {styles} from '@assets/Styles/styles';

import {useSelector, useDispatch} from 'react-redux';
import {COLORS} from '@constants/colors';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

import {setToken, logout, setUser} from '../../features/userSlice';
import {staffProfileEdit, staffDetailsByToken} from '../../Util';
import {SafeAreaView} from 'react-native';
import Loader from '../../components/Loader';

export const EditProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {user, token, services} = useSelector(state => state.userauth);
  const [profile, setProfile] = useState(1);

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [companyName, setCompanyName] = useState(user.company);
  const [companyAddress, setCompanyAddress] = useState(user.address);

  useEffect(() => {
    setLoader(false);
    return;
  }, []);

  const ProfileDetailsSubmit = async () => {
    setLoader(true);
    if (firstName == '') {
      setLoader(false);
      toastMessageFunction('Please enter first name');
      return;
    }
    if (lastName == '') {
      setLoader(false);
      toastMessageFunction('Please enter last name');
      return;
    }
    if (firstName != '' && lastName != '') {
      let body = {
        first_name: firstName,
        last_name: lastName,
      };

      try {
        let response = await staffProfileEdit(body);
        console.log(response.data);
        let resStatus = response.data.status;

        if (resStatus === true) {
          toastMessageFunction(response.data.message);

          let body = {};
          try {
            let response = await staffDetailsByToken(body);
            console.log(response.data);
            let resStatus = response.data.status;
            if (resStatus === true) {
              console.log('PROFILE DETAILDS', response.data);
              setLoader(false);
              dispatch(setUser(response.data.user));
              navigation.navigate('Profile');
            } else {
              setLoader(false);
              // console.log(response.data.message);
              toastMessageFunction(response.data.message);
            }
          } catch (error) {
            setLoader(false);
            console.log(error);
          }
        } else {
          setLoader(false);
          // console.log(response.data.message);
          toastMessageFunction(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toastMessageFunction('All * mark field are required.');
    }
  };

  const toastMessageFunction = message => {
    if (Platform.OS === 'ios') {
      Alert.alert(message);
    } else {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  };

  const [loader, setLoader] = useState(true);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Loader visible={loader} />

      <Container
        width={'100%'}
        //   height={'31%'}

        // align="center"
        ph={WIDTH * 0.04}
        pv={HEIGHT * 0.025}
        // bg={COLORS.MajorColor}
      >
        <Container direction="row" justify="space-between">
          <Container
            width={'15%'}
            touchable
            onPress={() => navigation.goBack()}>
            <Icon
              type={Icons.AntDesign}
              name={'arrowleft'}
              // color={'#DFE2E7'}
              size={25}
            />
          </Container>
          <Container>
            <CText color={'#000000'} ph={8} size={HEIGHT * 0.03} weight="bold">
              Profile
            </CText>
          </Container>
          <Container width={'15%'}></Container>
        </Container>
      </Container>
      <ScrollView>
        <View style={{marginHorizontal: WIDTH * 0.03}}>
          <TextInput
            underlineColor="transparent"
            style={styles.inputPaper}
            // autoCompleteType="email"
            label="First Name*"
            underlineColorAndroid="transparent"
            activeUnderlineColor={'#2144C1'}
            outlineColor={'#000'}
            value={firstName}
            keyboardDismissMode="none"
            onSubmitEditing={Keyboard.dismiss}
            onChangeText={text => setFirstName(text)}
            // onEndEditing={() => onChange(setEmail)}
            theme={{
              roundness: 10,
              colors: {
                underlineColor: 'transparent',
              },
            }}
          />
          <TextInput
            underlineColor="transparent"
            style={styles.inputPaper}
            // autoCompleteType="email"
            label="Last Name*"
            underlineColorAndroid="transparent"
            activeUnderlineColor={'#2144C1'}
            outlineColor={'#000'}
            value={lastName}
            keyboardDismissMode="none"
            onSubmitEditing={Keyboard.dismiss}
            onChangeText={text => setLastName(text)}
            // onEndEditing={() => onChange(setEmail)}
            theme={{
              roundness: 10,
              colors: {
                underlineColor: 'transparent',
              },
            }}
          />
        </View>
      </ScrollView>
      <Container
        touchable
        width="90%"
        justify="center"
        align="center"
        style={{
          right: 15,
          left: 15,
          marginTop: HEIGHT * 0.05,
          position: 'absolute',
          bottom: 10,
        }}
        // mh={WIDTH * 0.04}
        // mv={WIDTH * 0.04}
      >
        <CButton
          align="center"
          radius={8}
          width="100%"
          label="Update"
          bg={'#2144C1'}
          color={'#fff'}
          padding={HEIGHT * 0.022}
          size={HEIGHT * 0.025}
          //   weight="bold"
          // mv={12}
          onPress={ProfileDetailsSubmit}
        />
      </Container>
    </SafeAreaView>
  );
};
