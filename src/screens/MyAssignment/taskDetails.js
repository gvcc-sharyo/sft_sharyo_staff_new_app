import {
  View,
  Text,
  Dimensions,
  PermissionsAndroid,
  ActivityIndicator,
  Platform,
  Alert,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {components} from '@components/index';
const {CText, CTextInput, Container, CButton, CScrollable, CImage} = components;
import {COLORS} from '@constants/colors';
import Icon, {Icons} from '@components/CIcon/CustomIcon';
import {styles} from '@assets/Styles/styles';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import no_image from '@assets/Image/no_image.jpg';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {useFocusEffect} from '@react-navigation/native';

import {
  assignedDookingDetails,
  staffWorkStart,
  staffWorkComplete,
} from '../../Util';
import moment from 'moment';
import Loader from '../../components/Loader';
import {SafeAreaView} from 'react-native';

export const TaskDetails = ({navigation, route}) => {
  const booking_id = route.params.booking_id;
  const bookType = route.params.bookType;
  const item = route.params.item;
  console.log('booking_id', booking_id);
  const origin = {latitude: 22.580141, longitude: 88.428497};
  const [destination, setDestination] = useState({
    latitude: 22.58553,
    longitude: 88.422318,
  });
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBrRtkwvBcSh3_uISG8CVAX2IqykHdQEP4';
  const [latValue, setLatValue] = useState(22.59271);
  const [lngValue, setLngValue] = useState(88.413084);

  const [bookingDetailsVal, setBookingDetailsVal] = useState([]);
  const [allServiceVal, setAllServiceVal] = useState([]);
  const [allScheduleVal, setAllScheduleVal] = useState([]);
  const [staffWorkStartState, setStaffWorkStartState] = useState(0);
  const [serviceComplete, setserviceComplete] = useState();
  const [loader, setLoader] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      requestLocationPermission();
      //setLoader(false);
      bookingDetailsFetch(route.params.booking_schedule_id);
    }, []),
  );

  useEffect(() => {
    //   console.log('hasLocationPermission', hasLocationPermission);
    //     if (hasLocationPermission === true) {
    //  }
    // LocationPermission();
    return;
  }, []);

  const bookingDetailsFetch = async booking_id => {
    setLoader(true);
    let body = {
      booking_schedule_id: booking_id,
    };

    try {
      let response = await assignedDookingDetails(body);
      console.log('bookingDetailsRes', response);

      const bookingDetailsRes = response.data.booking;

      setLoader(false);

      console.log('bookingDetailsRes', response.data.booking);
      // return;
      setLatValue(response?.data?.booking?.address_lat);
      setLngValue(response?.data?.booking?.address_long);
      setBookingDetailsVal(bookingDetailsRes);
      console.log(
        'Destination: ',
        response?.data?.booking?.address_lat,
        response?.data?.booking?.address_long,
      );
      console.log(
        'response.data.booking.subservices_details',
        response.data.booking.subservices_details,
      );

      setAllServiceVal(response.data.booking.subservices_details);

      setLoader(false);

      setAllScheduleVal(bookingDetailsRes.schedule);

      console.log('complete_service', bookingDetailsRes.completed_services);
      setserviceComplete(bookingDetailsRes.completed_services);
      // addSelected(other_information);
      // setProfileData(other_information);
    } catch (error) {
      setLoader(false);

      console.log(error);
    }
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.setRNConfiguration({
        authorizationLevel: 'whenInUse',
      });

      Geolocation.requestAuthorization();
      // IOS permission request does not offer a callback :/
      return null;
    } else if (Platform.OS === 'android') {
      // console.log('hbgf');
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              console.log(position.coords.latitude);
              // setLatValue(position.coords.latitude);
              console.log(position.coords.longitude);
              // setLngValue(position.coords.longitude);
              setDestination({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
              //getting the Longitude from the location json
            },
            error => alert(error.message),
            {
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 1000,
            },
          );
          console.log(true);
          return true;
        } else {
          console.log(false);
          return false;
        }
      } catch (err) {
        console.log(false);
        console.warn(err.message);
        return false;
      }
    }
  };

  const [regionn, setRegionn] = useState({
    latitude: 22.5762042,
    longitude: 88.4333822,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  //   const LocationPermission = async() => {
  //     // if (hasLocationPermission) {
  //       Geolocation.getCurrentPosition(
  //           (position) => {
  //             console.log(position);
  //           },
  //           (error) => {
  //             // See error code charts below.
  //             console.log(error.code, error.message);
  //           },
  //           { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //       );
  //   // }
  // }

  const [onlyId, setOnlyId] = useState([]);
  const userServiceSelectId = () => {
    let onlyIdVal = [];
    const newItem = services.map(val => {
      var temp = val.id;
      onlyIdVal.push(temp);
    });
    setOnlyId(onlyIdVal);
    setLoader(false);
  };

  const handLeOnChange = item => {
    let array = [...onlyId];
    if (onlyId.includes(item)) {
      var filtered = array.filter(function (value, index, arr) {
        return value != item;
      });
      setOnlyId(filtered);
    } else {
      array.push(item);
      setOnlyId(array);
    }
    console.log(onlyId);
  };

  // console.log('bookingDetailsVal', bookingDetailsVal);

  const WorkStartFunction = async () => {
    // console.log('fghjkl');
    setLoader(true);

    let body = {
      booking_schedule_id: route?.params?.booking_schedule_id,
    };

    try {
      let response = await staffWorkStart(body);
      const bookingStartRes = response.data;
      console.log('bookingStartRes', bookingStartRes);

      if (bookingStartRes.status) {
        setStaffWorkStartState(1);
        setLoader(false);

        toastMessageFunction(bookingStartRes.message);
      }
      bookingDetailsFetch(route.params.booking_schedule_id);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const WorkCompleteFunction = async () => {
    console.log('work complete');

    if (onlyId != '') {
      Alert.alert('Warning', 'Are you sure want to complete this job?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel'),
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => {
            WorkComnpleteApi();
            // const datas = onlyId.toString();
            // navigation?.navigate('AssignmentOTP', {
            //   booking_schedule_id: route.params.booking_schedule_id,
            //   service_ids: datas,
            //   for: 'end',
            // });
          },
          style: 'default',
        },
      ]);
    } else {
      Alert.alert('Warning', 'Please complete at least one service!', [
        {
          text: 'Ok',
          onPress: () => console.log('OK'),
          style: 'cancel',
        },
      ]);
    }
  };

  // console.log('timing', bookingDetailsVal.schedule);

  const WorkComnpleteApi = async () => {
    setLoader(true);
    const datas = onlyId.toString();
    let body = {
      booking_schedule_id: route.params.booking_schedule_id,
      service_ids: datas,
    };

    console.log(body);

    try {
      let response = await staffWorkComplete(body);
      const completeDetailsRes = response.data;
      console.log('completeDetailsRes', completeDetailsRes);

      bookingDetailsFetch(route.params.booking_schedule_id);
      setLoader(false);

      // navigation.navigate('AssignmentList');

      // setBookingDetailsVal(bookingDetailsRes);
      // setAllServiceVal(response.data.booking.subservices_details);
    } catch (error) {
      setLoader(false);

      console.log(error);
    }
  };

  const startButtonClick = async () => {
    toastMessageFunction('Please at first start your work');
  };

  const toastMessageFunction = message => {
    if (Platform.OS === 'ios') {
      Alert.alert(message);
    } else {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <Loader visible={loader} />
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
          onPress={() => {
            setModalVisible(!modalVisible);
            WorkStartFunction();
          }}>
          <View style={styles.centeredView}>
            <View style={styles.cameraGalleryView}>
              <CText>
                Are you sure to start the work? {'\n'}Put your OTP here
              </CText>
              <Container direction="row"></Container>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <Container
        direction="row"
        justify="space-between"
        align="center"
        ph={WIDTH * 0.04}
        pv={HEIGHT * 0.025}
        shadow>
        <Container
          width="15%"
          align="center"
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
            Task Details
          </CText>
        </Container>
        <Container width={'15%'}></Container>
      </Container>
      <CScrollable>
        <>
          <Container
            mv={HEIGHT * 0.02}
            mh={HEIGHT * 0.015}
            style={{borderBottomLeftRadius: 8, borderBottomRightRadius: 8}}>
            <Container>
              <Container
                ph={HEIGHT * 0.02}
                pv={HEIGHT * 0.007}
                bg={'#2144C1'}
                style={{borderTopLeftRadius: 8, borderTopRightRadius: 8}}>
                <CText size={HEIGHT * 0.025} color={'#fff'}>
                  Customer Details
                </CText>
              </Container>
            </Container>
            <Container
              shadow
              direction="row"
              pv={HEIGHT * 0.02}
              style={{borderBottomLeftRadius: 8, borderBottomRightRadius: 8}}>
              {/* <Container width={'18%'} align="center">
                <Container
                  radius={50}
                  bg={'#f2f2f2'}
                  style={{overflow: 'hidden'}}>
                  <CImage
                    source={no_image}
                    width={HEIGHT * 0.07}
                    height={HEIGHT * 0.07}
                  />
                </Container>
              </Container> */}
              <Container width={'90%'}>
                <Container direction="row" align="flex-start" mh={WIDTH * 0.04}>
                  <CText weight="bold" color="#333333">
                    Name -
                  </CText>
                  <CText color="#333333">
                    {item?.customer_name ? item?.customer_name : 'N/A'}
                  </CText>
                </Container>
                <Container direction="row" align="flex-start" mh={WIDTH * 0.04}>
                  <CText weight="bold" color="#333333">
                    Email ID -
                  </CText>
                  <CText color="#333333">
                    {' '}
                    {item?.customer_email ? item?.customer_email : 'N/A'}
                  </CText>
                </Container>
                <Container direction="row" align="flex-start" mh={WIDTH * 0.04}>
                  <CText weight="bold" color="#333333">
                    Phone Number -{' '}
                  </CText>
                  <CText color="#333333">
                    {' '}
                    {item?.customer_phone ? item?.customer_phone : 'N/A'}
                  </CText>
                </Container>
              </Container>
            </Container>
          </Container>

          {allScheduleVal.timing != undefined &&
            allScheduleVal.timing.map(function (timeItem, key) {
              return (
                <Container
                  bg="#F2F2F2"
                  mv={WIDTH * 0.02}
                  pv={HEIGHT * 0.014}
                  radius={8}>
                  <Container align="center">
                    <CText size={HEIGHT * 0.024} color="#2144C1">
                      Booking On
                    </CText>
                  </Container>
                  <Container mh={WIDTH * 0.02} key={key}>
                    <Container align="center" mv={5}>
                      <CText size={HEIGHT * 0.02}>
                        Scheduled On - {timeItem.day}
                      </CText>
                    </Container>
                    <Container direction="row" justify="space-between">
                      <Container
                        width="50%"
                        align="center"
                        size={HEIGHT * 0.02}>
                        <CText color="#2144C1">From</CText>
                        <CText>{timeItem.from}</CText>
                      </Container>
                      <Container
                        width="50%"
                        align="center"
                        size={HEIGHT * 0.02}>
                        <CText color="#2144C1">To</CText>
                        <CText>{timeItem.to}</CText>
                      </Container>
                    </Container>
                  </Container>
                </Container>
              );
            })}

          {bookingDetailsVal.assigned_to == null ? (
            <Container direction="row" mh={WIDTH * 0.04}>
              <CText>
                Booking Status :-{' '}
                {bookingDetailsVal?.schedule?.[0]?.status == 0 && 'Booked'}
                {bookingDetailsVal?.schedule?.[0]?.status == 1 && 'Assigned'}
                {bookingDetailsVal?.schedule?.[0]?.status == 2 &&
                  'Work Started'}
                {bookingDetailsVal?.schedule?.[0]?.status == 3 &&
                  'Work Completed'}
                {bookingDetailsVal?.schedule?.[0]?.status == 4 && 'Canceled'}
              </CText>
              <CText size={HEIGHT * 0.028}>Job Status - </CText>
            </Container>
          ) : null}
          {bookingDetailsVal.payment_type == 'onetime' ? (
            <Container mv={30} mh={20}>
              <Container direction={'row'}>
                <Container
                  height={50}
                  width={40}
                  style={{
                    borderColor:
                      bookingDetailsVal?.schedule?.[0]?.status >= 0
                        ? '#12871D'
                        : '#BEED7E',
                    borderLeftWidth: 4,
                    borderTopWidth: 4,
                  }}></Container>
                <Container
                  direction="row"
                  style={{marginTop: -10, marginLeft: -5}}>
                  <Icon
                    type={Icons.MaterialCommunityIcons}
                    size={HEIGHT * 0.03}
                    name={
                      bookingDetailsVal?.schedule?.[0]?.status >= 0
                        ? 'check-circle'
                        : 'checkbox-blank-circle'
                    }
                    color={
                      bookingDetailsVal?.schedule?.[0]?.status >= 0
                        ? '#12871D'
                        : '#BEED7E'
                    }
                  />
                  <CText style={{marginLeft: 6}}>Booked</CText>
                </Container>
              </Container>
              <Container direction={'row'}>
                <Container
                  height={50}
                  width={40}
                  style={{
                    borderColor:
                      bookingDetailsVal?.schedule?.[0]?.status >= 1
                        ? '#12871D'
                        : '#BEED7E',
                    borderLeftWidth: 4,
                    borderTopWidth: 4,
                  }}></Container>
                <Container
                  direction={'row'}
                  style={{marginTop: -10, marginLeft: -5}}>
                  <Icon
                    type={Icons.MaterialCommunityIcons}
                    size={HEIGHT * 0.03}
                    name={
                      bookingDetailsVal?.schedule?.[0]?.status >= 1
                        ? 'check-circle'
                        : 'checkbox-blank-circle'
                    }
                    color={
                      bookingDetailsVal?.schedule?.[0]?.status >= 1
                        ? '#12871D'
                        : '#BEED7E'
                    }
                  />
                  <CText style={{marginLeft: 6}}>Assigned</CText>
                </Container>
              </Container>
              <Container direction={'row'}>
                <Container
                  height={50}
                  width={40}
                  style={{
                    borderColor:
                      bookingDetailsVal?.schedule?.[0]?.status >= 2
                        ? '#12871D'
                        : '#BEED7E',
                    borderLeftWidth: 4,
                    borderTopWidth: 4,
                  }}></Container>
                <Container
                  direction={'row'}
                  style={{marginTop: -10, marginLeft: -5}}>
                  <Icon
                    type={Icons.MaterialCommunityIcons}
                    size={HEIGHT * 0.03}
                    name={
                      bookingDetailsVal?.schedule?.[0]?.status >= 2
                        ? 'check-circle'
                        : 'checkbox-blank-circle'
                    }
                    color={
                      bookingDetailsVal?.schedule?.[0]?.status >= 2
                        ? '#12871D'
                        : '#BEED7E'
                    }
                  />
                  <CText style={{marginLeft: 6}}>Work Started</CText>
                </Container>
              </Container>
              <Container direction={'row'}>
                <Container
                  height={40}
                  width={40}
                  style={{
                    borderColor:
                      bookingDetailsVal?.schedule?.[0]?.status >= 3
                        ? '#12871D'
                        : '#BEED7E',
                    borderTopWidth: 4,
                  }}></Container>
                <Container
                  direction={'row'}
                  style={{marginTop: -10, marginLeft: -5}}>
                  <Icon
                    type={Icons.MaterialCommunityIcons}
                    size={HEIGHT * 0.03}
                    name={
                      bookingDetailsVal?.schedule?.[0]?.status >= 3
                        ? 'check-circle'
                        : 'checkbox-blank-circle'
                    }
                    color={
                      bookingDetailsVal?.schedule?.[0]?.status >= 3
                        ? '#12871D'
                        : '#BEED7E'
                    }
                  />
                  <CText style={{marginLeft: 6}}>Completed</CText>
                </Container>
              </Container>
            </Container>
          ) : (
            <></>
          )}
          {bookingDetailsVal.payment_type == 'daily' ||
          bookingDetailsVal.payment_type == 'monthly' ||
          bookingDetailsVal.payment_type == 'onetime' ||
          bookingDetailsVal.payment_type == 'yearly' ||
          bookingDetailsVal.payment_type == 'weekly' ? (
            bookingDetailsVal?.status_tree.map(function (statusItem, key) {
              console.log(statusItem.completed_services);
              return (
                <Container
                  bg={'#F2F2F2'}
                  radius={8}
                  mv={15}
                  align="center"
                  mh={10}
                  kay={key}>
                  <Container
                    width="100%"
                    bg={'#2144C1'}
                    pv={HEIGHT * 0.012}
                    ph={HEIGHT * 0.012}
                    style={{
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}>
                    <CText color={'#fff'} size={HEIGHT * 0.022}>
                      Booking On -{' '}
                      {moment(statusItem.created_at).format(
                        'YYYY-MM-DD   hh:mm A',
                      )}
                    </CText>
                  </Container>
                  <Container align="center" direction={'row'} mv={5}>
                    <Container width={70} height={70}>
                      <Container height={'28%'} style={{marginLeft: -10}}>
                        <CText>Booking</CText>
                      </Container>
                      <Container height={'30%'} style={{marginLeft: -10}}>
                        <Icon
                          type={Icons.MaterialCommunityIcons}
                          size={HEIGHT * 0.03}
                          name={'check-circle'}
                          color={'#12871D'}
                        />
                      </Container>
                      <Container
                        height={'42%'}
                        style={{
                          borderColor: '#12871D',
                          borderLeftWidth: 4,
                          borderBottomWidth: 4,
                        }}></Container>
                    </Container>
                    <Container width={70} height={70}>
                      <Container height={'28%'} style={{marginLeft: -10}}>
                        <CText>Assigned</CText>
                      </Container>
                      <Container height={'30%'} style={{marginLeft: -10}}>
                        <Icon
                          type={Icons.MaterialCommunityIcons}
                          size={HEIGHT * 0.03}
                          name={
                            statusItem.assigned_on != null
                              ? 'check-circle'
                              : 'checkbox-blank-circle'
                          }
                          color={
                            statusItem.assigned_on != null
                              ? '#12871D'
                              : '#BEED7E'
                          }
                        />
                      </Container>
                      <Container
                        height={'42%'}
                        style={{
                          borderColor:
                            statusItem.assigned_on != null
                              ? '#12871D'
                              : '#BEED7E',
                          borderLeftWidth: 4,
                          borderBottomWidth: 4,
                        }}></Container>
                    </Container>
                    <Container width={70} height={70}>
                      <Container height={'28%'} style={{marginLeft: -10}}>
                        <CText>Started</CText>
                      </Container>
                      <Container height={'30%'} style={{marginLeft: -10}}>
                        <Icon
                          type={Icons.MaterialCommunityIcons}
                          size={HEIGHT * 0.03}
                          name={
                            statusItem.started_on != null
                              ? 'check-circle'
                              : 'checkbox-blank-circle'
                          }
                          color={
                            statusItem.started_on != null
                              ? '#12871D'
                              : '#BEED7E'
                          }
                        />
                      </Container>
                      <Container
                        height={'42%'}
                        style={{
                          borderColor:
                            statusItem.started_on != null
                              ? '#12871D'
                              : '#BEED7E',
                          borderLeftWidth: 4,
                          borderBottomWidth: 4,
                        }}></Container>
                    </Container>
                    <Container width={70} height={70}>
                      <Container height={'28%'} style={{marginLeft: -10}}>
                        <CText>Completed</CText>
                      </Container>
                      <Container height={'30%'} style={{marginLeft: -10}}>
                        <Icon
                          type={Icons.MaterialCommunityIcons}
                          size={HEIGHT * 0.03}
                          name={
                            statusItem.completed_on != null
                              ? 'check-circle'
                              : 'checkbox-blank-circle'
                          }
                          color={
                            statusItem.completed_on != null
                              ? '#12871D'
                              : '#BEED7E'
                          }
                        />
                      </Container>
                      <Container
                        height={'42%'}
                        style={{
                          borderColor:
                            statusItem.completed_on != null
                              ? '#12871D'
                              : '#BEED7E',
                          borderLeftWidth: 4,
                        }}></Container>
                    </Container>
                  </Container>
                  <Container mv={5}></Container>
                  {statusItem.completed_services != null ? (
                    statusItem.completed_services.map(name => (
                      <Container
                        align="flex-start"
                        direction="row"
                        width="95%"
                        pv={5}
                        key={name}>
                        <Icon
                          type={Icons.MaterialCommunityIcons}
                          size={HEIGHT * 0.03}
                          name={'check-circle'}
                          color={'#12871D'}
                        />
                        <CText>{name}</CText>
                      </Container>
                    ))
                  ) : (
                    <CText></CText>
                  )}
                </Container>
              );
            })
          ) : (
            <></>
          )}
          <Container mv={HEIGHT * 0.04}></Container>

          <Container mv={HEIGHT * 0.002} mh={HEIGHT * 0.015}>
            <Container>
              <Container
                ph={HEIGHT * 0.02}
                pv={HEIGHT * 0.007}
                bg={'#2144C1'}
                style={{borderTopLeftRadius: 8, borderTopRightRadius: 8}}>
                <CText size={HEIGHT * 0.025} color={'#fff'}>
                  Package Details
                </CText>
              </Container>
            </Container>
            <Container
              ph={HEIGHT * 0.015}
              shadow
              pv={HEIGHT * 0.02}
              style={{borderBottomLeftRadius: 8, borderBottomRightRadius: 8}}>
              <Container direction="row" align="center">
                <CText weight="bold" size={HEIGHT * 0.022}>
                  Package Name -
                </CText>
                <CText weight="bold" color={'#2144C1'} size={HEIGHT * 0.022}>
                  {' '}
                  {item?.package_name ? item?.package_name : ''}
                </CText>
              </Container>
              <Container direction="row">
                <CText weight="bold" size={HEIGHT * 0.022}>
                  Service List -
                </CText>
              </Container>
              {bookType != 'history'
                ? item?.subservices_details.map(function (serviceOnly, key) {
                    //console.log('array data chnage', serviceOnly);
                    return (
                      <Container
                        width={'95%'}
                        onPress={() =>
                          bookingDetailsVal?.schedule?.[0]?.status == '2'
                            ? handLeOnChange(serviceOnly.title)
                            : startButtonClick()
                        }
                        touchable
                        align="center"
                        direction="row"
                        mv={WIDTH * 0.01}
                        key={key}>
                        <Icon
                          type={Icons.MaterialIcons}
                          size={HEIGHT * 0.035}
                          // check-box
                          name={
                            onlyId.includes(serviceOnly.title)
                              ? 'check-box'
                              : 'check-box-outline-blank'
                          }
                          color={
                            bookingDetailsVal?.schedule?.[0]?.status < 2 ||
                            bookingDetailsVal?.schedule?.[0]?.status == 2
                              ? 'gray'
                              : '#12871D'
                          }
                        />
                        <CText style={{marginLeft: WIDTH * 0.02}}>
                          {serviceOnly.title}
                        </CText>
                      </Container>
                    );
                  })
                : item?.subservices_details?.map(function (serviceOnly, key) {
                    console.log('array data chnage', serviceOnly);
                    return (
                      <Container
                        width={'95%'}
                        onPress={() =>
                          staffWorkStartState != 0
                            ? handLeOnChange(serviceOnly.title)
                            : startButtonClick()
                        }
                        touchable
                        align="center"
                        direction="row"
                        mv={WIDTH * 0.01}
                        key={key}>
                        <CText size={HEIGHT * 0.02}>
                          {key + 1}
                          {' )'}
                        </CText>
                        <CText style={{marginLeft: WIDTH * 0.02}}>
                          {serviceOnly.title}
                        </CText>
                      </Container>
                    );
                  })}
            </Container>

            <Container ph={HEIGHT * 0.015} mv={HEIGHT * 0.02}>
              <Container direction="row" width={'85%'} mv={10}>
                <CText style={{fontWeight: '700', fontSize: HEIGHT * 0.018}}>
                  Address -{' '}
                </CText>
                {bookingDetailsVal.doorstep != 0 ? (
                  <CText style={{flexWrap: 'wrap'}}>
                    {bookingDetailsVal.booking_address
                      ? bookingDetailsVal.booking_address
                      : 'N/A'}
                  </CText>
                ) : (
                  <CText>On shop</CText>
                )}
              </Container>
              {latValue != '' && bookingDetailsVal.doorstep != 0 && (
                <Container mv={3}>
                  <MapView
                    showsUserLocation={true}
                    followUserLocation={true}
                    showsMyLocationButton={true}
                    zoomEnabled={true}
                    style={{width: '100%', height: HEIGHT * 0.45}}
                    initialRegion={{
                      latitude: latValue ? Number(latValue) : 22.59271,
                      longitude: lngValue ? Number(lngValue) : 88.413084,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}>
                    <Marker
                      coordinate={{
                        latitude: latValue ? Number(latValue) : 22.59271,
                        longitude: lngValue ? Number(lngValue) : 88.413084,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                      pinColor={'#2144C1'} // any color
                      // title={'title'}
                      // description={'description'}
                    />
                    <Marker
                      coordinate={destination}
                      pinColor={'red'} // any color
                      // title={'title'}
                      // description={'description'}
                    />
                    <MapViewDirections
                      origin={{
                        latitude: latValue ? Number(latValue) : 22.59271,
                        longitude: lngValue ? Number(lngValue) : 88.413084,
                      }}
                      destination={destination}
                      apikey={GOOGLE_MAPS_APIKEY}
                      strokeWidth={3}
                      strokeColor="hotpink"
                    />
                  </MapView>
                </Container>
              )}
            </Container>

            {bookType != 'history' ? (
              bookingDetailsVal?.schedule?.[0]?.status == '1' &&
              moment
                .utc(bookingDetailsVal?.schedule?.[0]?.day)
                .format('YYYY-MM-DD') ==
                moment(new Date()).format('YYYY-MM-DD') ? (
                <Container
                  mv={20}
                  width="100%"
                  touchable
                  style={{marginTop: 20}}>
                  <CButton
                    align="center"
                    radius={8}
                    width="100%"
                    label="Start"
                    bg={'#2144C1'}
                    color={'#fff'}
                    padding={HEIGHT * 0.022}
                    size={HEIGHT * 0.025}
                    onPress={() => {
                      WorkStartFunction();
                      // navigation?.navigate('AssignmentOTP', {
                      //   booking_schedule_id: route.params.booking_schedule_id,
                      //   for: 'start',
                      // });
                      // setModalVisible(true);
                    }}
                    // style={{borderRadius: 10}}
                  />
                </Container>
              ) : bookingDetailsVal?.schedule?.[0]?.status === '2' ? (
                <Container
                  mv={20}
                  width="100%"
                  touchable
                  style={{marginTop: 20}}>
                  <CButton
                    align="center"
                    radius={8}
                    width="100%"
                    label="Complete"
                    bg={'#2144C1'}
                    color={'#fff'}
                    padding={HEIGHT * 0.022}
                    size={HEIGHT * 0.025}
                    onPress={WorkCompleteFunction}
                    // style={{borderRadius: 10}}
                  />
                </Container>
              ) : (
                bookingDetailsVal?.schedule?.[0]?.status == '3' && (
                  <Container mv={20} width="100%" style={{marginTop: 20}}>
                    <CButton
                      align="center"
                      radius={8}
                      width="100%"
                      label="completed"
                      bg={'#Gray'}
                      color={'#fff'}
                      padding={HEIGHT * 0.022}
                      size={HEIGHT * 0.025}
                      // onPress={staffWorkStartState == 0 ? WorkStartFunction : WorkCompleteFunction}
                      // style={{borderRadius: 10}}
                    />
                  </Container>
                )
              )
            ) : (
              <Container></Container>
            )}
          </Container>
        </>
      </CScrollable>
    </SafeAreaView>
  );
};

//   <Container mv={20} width="100%" touchable style={{marginTop:20}}>
//   <CButton
//     // disabled={
//     //   rating === "" || feedType === "" || reason === "" || remark === ""
//     // }
//     align="center"
//     radius={8}
//     width="100%"
//     label={staffWorkStartState != 0 ? "Complete" : "Start"}
//     bg={'#2144C1'}
//     color={'#fff'}
//     padding={HEIGHT * 0.022}
//     size={HEIGHT * 0.025}
//     //   weight="bold"
//     // mv={12}
//     // onPress={() => navigation.navigate('SignupScreen')}
//     onPress={staffWorkStartState == 0 ? WorkStartFunction : WorkCompleteFunction}
//     // style={{borderRadius: 10}}
//   />
// </Container>
