import {
  View,
  ToastAndroid,
  PermissionsAndroid,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Keyboard,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {components} from '@components/index';
const {CText, CTextInput, Container, CButton, CScrollable, CImage} = components;
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import {setToken, logout} from '../../features/userSlice';
import {
  serviceProviderDetails,
  serviceProviderBusinessLogoEdit,
  staffImageUpload,
  staffDetailsByToken,
} from '../../Util';
import Icon, {Icons} from '@components/CIcon/CustomIcon';
import {TextInput} from 'react-native-paper';
import {styles} from '@assets/Styles/styles';
import profile_background from '@assets/Image/profile_background.png';
import user6 from '@assets/Image/user6.png';
import {COLORS} from '@constants/colors';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import gallery from '@assets/Image/gallery.png';
import camera_icon from '@assets/Image/camera_icon.png';

export const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [profileImage, setprofileImage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  // const [useOne, setUseOne] = useState(true);
  const {user, token, services} = useSelector(state => state.userauth);

  console.log('user', user);

  useEffect(() => {
    // requestCameraPermission();
  }, []);

  const CameraHandle = async () => {
    try {
      let response = await launchCamera({
        mediaType: 'photo',
        quality: 1,
        maxHeight: 500,
        maxWidth: 500,
      });
      setprofileImage(response.assets[0].uri);
      // console.log(profileImage);
      imageUploadFunction(response.assets[0]);
      // sheetRef.current.snapTo(1);
    } catch (error) {}
  };

  const LibaryHandle = async () => {
    try {
      let response = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        maxHeight: 500,
        maxWidth: 500,
      });
      setprofileImage(response.assets[0].uri);
      console.log(response);

      imageUploadFunction(response.assets[0]);
    } catch (error) {}
  };

  const imageUploadFunction = async imageValue => {
    console.log('imageValue', imageValue);
    setModalVisible(!modalVisible);

    let frmdata = new FormData();
    // for (const [key, value] of Object.entries(body)) {
    //   frmdata.append(key, value);
    // }

    if (imageValue != null) {
      // let localUri = imageValue;
      // let filename = localUri.split('/').pop();

      // let match = /\.(\w+)$/.exec(filename);
      // let type = match ? `image/${match[1]}` : `image`;

      var businessLogo = {
        uri: imageValue.uri,
        type: imageValue.type,
        name: imageValue.uri.replace(/^.*[\\\/]/, ''),
      };
      console.log(businessLogo);
      frmdata.append('profile_image', businessLogo);
    }

    console.log('frmdata', frmdata);

    try {
      let response = await staffImageUpload(frmdata);

      toastMessageFunction(response.data.message);
      getProfile();

      // setStaffListVal(serviceList);

      // addSelected(other_information);
      // setProfileData(other_information);
    } catch (error) {
      console.log(error);
    }
  };

  async function getProfile() {
    try {
      let response = await staffDetailsByToken({});

      // return;
      let resStatus = response.data.status;
      if (resStatus === true) {
        dispatch(
          setToken({
            token: token,
            user: response.data.user,
            services: '',
          }),
        );
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  const toastMessageFunction = message => {
    if (Platform.OS === 'ios') {
      Alert.alert(message);
    } else {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  };

  const ModalOpen = () => (
    <Modal
      // animationType="slide"
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <TouchableOpacity
        // style={styles.container}
        style={{height: 600}}
        activeOpacity={1}
        // onPressOut={() => {this.setModalVisible(false)}}
        onPress={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.cameraGalleryView}>
            <CText>Business Logo Upload</CText>
            <Container direction="row">
              <Container
                justify="center"
                align="center"
                mh={20}
                mv={20}
                touchable
                onPress={CameraHandle}>
                <CImage source={camera_icon} width={50} height={50} />
                <CText>Camera</CText>
              </Container>
              <Container
                justify="center"
                align="center"
                mh={20}
                mv={20}
                touchable
                // onPress={() => pickImage()}
                onPress={LibaryHandle}>
                <CImage source={gallery} width={50} height={50} />
                <CText>Gallery</CText>
              </Container>
            </Container>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const ModalOpenCover = () => (
    <Modal
      // animationType="slide"
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <TouchableOpacity
        // style={styles.container}
        style={{height: 600}}
        activeOpacity={1}
        // onPressOut={() => {this.setModalVisible(false)}}
        onPress={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.cameraGalleryView}>
            <CText>Business Logo Upload</CText>
            <Container direction="row">
              <Container
                justify="center"
                align="center"
                mh={20}
                mv={20}
                touchable
                onPress={CameraHandle}>
                <CImage source={camera_icon} width={50} height={50} />
                <CText>Camera</CText>
              </Container>
              <Container
                justify="center"
                align="center"
                mh={20}
                mv={20}
                touchable
                // onPress={() => pickImage()}
                onPress={LibaryHandle}>
                <CImage source={gallery} width={50} height={50} />
                <CText>Gallery</CText>
              </Container>
            </Container>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const [loader, setLoader] = useState(false);

  if (loader)
    return (
      <ActivityIndicator
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        animating={true}
        hidesWhenStopped={true}
        size="large"
        color="#2144C1"
      />
    );
  else
    return (
      <CScrollable>
        <ModalOpen />
        <Container width={'100%'} ph={WIDTH * 0.04} pv={HEIGHT * 0.03}>
          <Container
            direction="row"
            // bg="#fff"
            justify="space-between"
            width="100%">
            <Container
              touchable
              width="10%"
              onPress={() => navigation.openDrawer()}
              height={28}>
              <Icon
                type={Icons.Feather}
                size={HEIGHT * 0.035}
                name={'menu'}
                color={'#707070'}
              />
            </Container>
            <Container>
              <CText color={'#000'} ph={8} size={HEIGHT * 0.03} weight="bold">
                Profile
              </CText>
            </Container>
            <Container
              align="center"
              width="10%"
              touchable
              height={30}
              onPress={() => navigation.navigate('EditProfileScreen')}>
              <Icon type={Icons.AntDesign} name={'edit'} color={'#707070'} />
            </Container>
          </Container>
        </Container>
        <Container align="center">
          <Container
            mh={WIDTH * 0.05}
            direction="row"
            // align="center"
            style={
              {
                // marginTop: -HEIGHT * 0.065,
              }
            }>
            <CImage
              resize="contain"
              source={{
                uri: profileImage
                  ? profileImage
                  : user.profile_image
                  ? user.profile_image
                  : 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
              }}
              width={HEIGHT * 0.15}
              height={HEIGHT * 0.15}
              radius={100}
            />

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setModalVisible(true)}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                zIndex: 100,
                backgroundColor: '#ffffff',
                height: 35,
                width: 35,
                borderRadius: 17.5,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 10,
                shadowOpacity: 0.2,
                shadowColor: '#000000',
                shadowRadius: 4,
                shadowOffset: {height: 0, width: 3},
              }}>
              <Icon
                type={Icons.AntDesign}
                size={20}
                name={'edit'}
                color={'#707070'}
              />
            </TouchableOpacity>
          </Container>
        </Container>
        <Container align="center" pv={HEIGHT * 0.014}>
          <CText size={HEIGHT * 0.024}>ID - {user.userId}</CText>
        </Container>
        <ScrollView style={{marginTop: 10}}>
          <View style={{marginHorizontal: WIDTH * 0.03}}>
            <TextInput
              editable={false}
              underlineColor="transparent"
              style={styles.inputPaper}
              // autoCompleteType="email"
              label="First Name"
              underlineColorAndroid="transparent"
              activeUnderlineColor={'#2144C1'}
              outlineColor={'#000'}
              value={user.first_name}
              keyboardDismissMode="none"
              onSubmitEditing={Keyboard.dismiss}
              // onChangeText={text => setEmail(text)}
              // onEndEditing={() => onChange(setEmail)}
              theme={{
                roundness: 10,
                colors: {
                  underlineColor: 'transparent',
                },
              }}
            />
            <TextInput
              editable={false}
              underlineColor="transparent"
              style={styles.inputPaper}
              // autoCompleteType="email"
              label="Last Name"
              underlineColorAndroid="transparent"
              activeUnderlineColor={'#2144C1'}
              outlineColor={'#000'}
              value={user.last_name}
              keyboardDismissMode="none"
              onSubmitEditing={Keyboard.dismiss}
              // onChangeText={text => setEmail(text)}
              // onEndEditing={() => onChange(setEmail)}
              theme={{
                roundness: 10,
                colors: {
                  underlineColor: 'transparent',
                },
              }}
            />
            <TextInput
              editable={false}
              underlineColor="transparent"
              style={styles.inputPaper}
              // autoCompleteType="email"
              label="Email"
              underlineColorAndroid="transparent"
              activeUnderlineColor={'#2144C1'}
              outlineColor={'#000'}
              value={user.email}
              keyboardDismissMode="none"
              onSubmitEditing={Keyboard.dismiss}
              // onChangeText={text => setEmail(text)}
              // onEndEditing={() => onChange(setEmail)}
              theme={{
                roundness: 10,
                colors: {
                  underlineColor: 'transparent',
                },
              }}
            />

            <TextInput
              editable={false}
              underlineColor="transparent"
              style={styles.inputPaper}
              // autoCompleteType="email"
              label="Phone"
              underlineColorAndroid="transparent"
              activeUnderlineColor={'#2144C1'}
              outlineColor={'#000'}
              value={user.phone}
              keyboardDismissMode="none"
              onSubmitEditing={Keyboard.dismiss}
              // onChangeText={text => setEmail(text)}
              // onEndEditing={() => onChange(setEmail)}
              theme={{
                roundness: 10,
                colors: {
                  underlineColor: 'transparent',
                },
              }}
            />
          </View>
          {user.note || user.supervisor ? (
            <Container
              mh={10}
              bg={'#F2F2F2'}
              pv={HEIGHT * 0.01}
              radius={8}
              style={{marginTop: HEIGHT * 0.06}}>
              <Container mh={WIDTH * 0.05} pv={HEIGHT * 0.02}>
                {user.supervisor ? (
                  <CText size={HEIGHT * 0.023}>
                    Supervisor -{' '}
                    {user.supervisor ? user.supervisor.name : 'N/A'}
                  </CText>
                ) : null}
                {user.note ? (
                  <CText size={HEIGHT * 0.023}>
                    note - {user.note ? user.note : 'N/A'}
                  </CText>
                ) : null}
              </Container>
            </Container>
          ) : null}
        </ScrollView>
      </CScrollable>
    );
};
