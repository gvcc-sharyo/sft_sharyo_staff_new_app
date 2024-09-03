import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {components} from '@components/index';
const {CText, CTextInput, Container, CButton, CScrollable, CImage} = components;

import Icon, {Icons} from '@components/CIcon/CustomIcon';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import {
  staffAssignedUpcomingBooking,
  staffAssignedPastBooking,
} from '../../Util';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import Loader from '../../components/Loader';

export const AssignmentList = ({navigation}) => {
  const [dayTask, setDayTask] = useState(1);
  const [upcomingValue, setUpcomingValue] = useState([]);
  const [historyValue, setHistoryValue] = useState([]);
  const isFocused = useIsFocused();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    StaffAssignedUpcomingBookingList();
    StaffAssignedPastBookingList();
  }, [isFocused]);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    StaffAssignedUpcomingBookingList();
    StaffAssignedPastBookingList();
    // setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  console.log('historyValue', historyValue);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const StaffAssignedUpcomingBookingList = async () => {
    let body = {};
    setLoader(true);
    try {
      let response = await staffAssignedUpcomingBooking(body);
      const responceList = response.data;
      console.log('response', response);
      setUpcomingValue(responceList.bookings);

      // setStaffListVal(responceList);
      setLoader(false);

      // addSelected(other_information);
      // setProfileData(other_information);
    } catch (error) {
      setLoader(false);

      console.log(error);
    }
  };

  const StaffAssignedPastBookingList = async () => {
    let body = {};
    setLoader(true);

    try {
      let response = await staffAssignedPastBooking(body);
      const responceList = response.data;
      console.log(responceList);
      setHistoryValue(responceList.bookings);
      setLoader(false);
      // setStaffListVal(responceList);
      // setLoader(false);

      // addSelected(other_information);
      // setProfileData(other_information);
    } catch (error) {
      setLoader(false);

      console.log(error);
    }
  };

  return (
    <>
      <Loader visible={loader} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
        <Container
          width={'100%'}
          //   height={'31%'}

          // align="center"
          ph={WIDTH * 0.04}
          pv={HEIGHT * 0.025}
          // bg={COLORS.MajorColor}
        >
          <Container direction="row" justify="space-between" align="center">
            <Container
              width={'15%'}
              touchable
              onPress={() => navigation.openDrawer()}
              //   height={25}
            >
              <Icon
                type={Icons.Feather}
                size={HEIGHT * 0.03}
                name={'menu'}
                color={'#000000'}
              />
            </Container>
            <Container>
              <CText
                color={'#000000'}
                ph={8}
                size={HEIGHT * 0.03}
                weight="bold">
                {dayTask == 1 ? 'Upcoming Task' : 'Task History'}
              </CText>
            </Container>
            <Container width={'15%'}></Container>
          </Container>
          <Container
            shadow
            radius={10}
            direction="row"
            justify="space-between"
            style={{marginTop: HEIGHT * 0.02}}>
            <Container
              touchable
              onPress={() => {
                StaffAssignedUpcomingBookingList();
                setDayTask(1);
              }}
              // onPress={() => navigation.navigate('AssignWorkers')}
              // AssignWorkers
              direction="row"
              justify="center"
              align="center"
              width="50%"
              pv={HEIGHT * 0.015}
              ph={WIDTH * 0.05}
              bg={dayTask === 1 ? '#2144C1' : '#fff'}
              style={{
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderWidth: 1,
                borderColor: '#2144C1',
              }}>
              <CText
                color={dayTask === 1 ? '#fff' : '#2144C1'}
                style={{paddingLeft: 5}}>
                Upcoming
              </CText>
            </Container>
            <Container
              touchable
              onPress={() => {
                StaffAssignedPastBookingList();
                setDayTask(2);
              }}
              width="50%"
              pv={HEIGHT * 0.015}
              ph={WIDTH * 0.05}
              align="center"
              direction="row"
              justify="center"
              bg={dayTask === 1 ? '#fff' : '#2144C1'}
              style={{
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                borderWidth: 1,
                borderColor: '#2144C1',
              }}>
              <CText
                color={dayTask === 1 ? '#2144C1' : '#fff'}
                style={{paddingLeft: 5}}>
                History
              </CText>
            </Container>
          </Container>
          <Container mv={3}></Container>

          <CScrollable
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {dayTask == 1 ? (
              <>
                {upcomingValue != '' ? (
                  upcomingValue.map(function (item, key) {
                    // console.log('item', item);
                    return (
                      <Container
                        key={key}
                        mv={HEIGHT * 0.007}
                        border={1}
                        radius={10}
                        shadow
                        style={{borderColor: '#f2f2f2', borderWidth: 1}}>
                        <Container align="flex-end">
                          <Container
                            touchable
                            onPress={() =>
                              navigation.navigate('TaskDetails', {
                                booking_id: item.id,
                                bookType: 'upcoming',
                                booking_schedule_id: item.booking_schedule_id,
                                item: item,
                              })
                            }
                            bg={'#DA3A2F'}
                            pv={HEIGHT * 0.01}
                            ph={WIDTH * 0.05}
                            style={{
                              borderBottomLeftRadius: 10,
                              borderTopRightRadius: 10,
                            }}>
                            <CText color="#fff">Details</CText>
                          </Container>
                        </Container>
                        <Container
                          direction="row"
                          align="flex-start"
                          mh={WIDTH * 0.04}>
                          <CText weight="bold" color="#333333">
                            Name -{' '}
                          </CText>
                          <CText color="#333333">{item.customer_name}</CText>
                        </Container>
                        {/* <Container
                          direction="row"
                          align="flex-start"
                          mh={WIDTH * 0.04}>
                          <CText weight="bold" color="#333333">
                            Address -{' '}
                          </CText>
                          <CText color="#333333" style={{width: '85%'}}>
                            {item.booking_address
                              ? item.booking_address
                              : 'N/A'}
                          </CText>
                        </Container> */}
                        <Container
                          direction="row"
                          align="flex-start"
                          mh={WIDTH * 0.04}>
                          <CText weight="bold" color="#333333">
                            Phone No. -{' '}
                          </CText>
                          <CText color="#333333">
                            {item.customer_phone ? item.customer_phone : 'N/A'}
                          </CText>
                        </Container>
                        <Container
                          direction="row"
                          align="flex-start"
                          mh={WIDTH * 0.04}>
                          <CText weight="bold" color="#333333">
                            Package Name -{' '}
                          </CText>
                          <CText color="#333333">
                            {item.package_name ? item.package_name : 'N/A'}
                          </CText>
                        </Container>
                        <Container
                          direction="row"
                          align="flex-start"
                          mh={WIDTH * 0.04}>
                          <CText weight="bold" color="#333333">
                            Vehicle Model -
                          </CText>
                          <CText color="#333333">
                            {' '}
                            {item.car_model ? item.car_model : 'N/A'}
                          </CText>
                        </Container>
                        <Container
                          direction="row"
                          align="flex-start"
                          mh={WIDTH * 0.04}>
                          <CText weight="bold" color="#333333">
                            Assign Name -
                          </CText>
                          <CText color="#333333">
                            {' '}
                            {item.assigned_person
                              ? item.assigned_person
                              : 'N/A'}
                          </CText>
                        </Container>
                        <Container
                          direction="row"
                          justify="space-between"
                          align="center"
                          mh={WIDTH * 0.04}
                          mv={WIDTH * 0.02}>
                          <Container direction="row">
                            <Icon
                              type={Icons.AntDesign}
                              name={'clockcircleo'}
                              color="#2144C1"
                              size={20}
                            />
                            <CText style={{marginLeft: 14}}>
                              {moment.utc(item.from).format('hh:mm A') +
                                '-' +
                                moment.utc(item.to).format('hh:mm A')}
                            </CText>
                          </Container>
                          <Container direction="row">
                            <Icon
                              type={Icons.AntDesign}
                              name={'calendar'}
                              color="#2144C1"
                              size={20}
                            />
                            <CText style={{marginLeft: 14, marginRight: 24}}>
                              {moment.utc(item.day).format('DD/MM/YYYY')}
                            </CText>
                          </Container>
                        </Container>
                      </Container>
                    );
                  })
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                {historyValue != '' ? (
                  historyValue.map(function (item, key) {
                    return (
                      <Container
                        key={key}
                        mv={HEIGHT * 0.007}
                        border={1}
                        radius={10}
                        shadow
                        style={{borderColor: '#f2f2f2', borderWidth: 1}}>
                        <Container align="flex-end">
                          <Container
                            touchable
                            onPress={() =>
                              navigation.navigate('TaskDetails', {
                                booking_id: item.id,
                                bookType: 'history',
                                booking_schedule_id: item.booking_schedule_id,
                                item: item,
                              })
                            }
                            bg={'#DA3A2F'}
                            pv={HEIGHT * 0.01}
                            ph={WIDTH * 0.05}
                            style={{
                              borderBottomLeftRadius: 10,
                              borderTopRightRadius: 10,
                            }}>
                            <CText color="#fff">Details</CText>
                          </Container>
                        </Container>
                        <Container
                          direction="row"
                          align="flex-start"
                          mh={WIDTH * 0.04}>
                          <CText weight="bold" color="#333333">
                            Name -{' '}
                          </CText>
                          <CText color="#333333">{item.customer_name}</CText>
                        </Container>
                        {/* <Container
                          direction="row"
                          align="flex-start"
                          mh={WIDTH * 0.04}>
                          <CText weight="bold" color="#333333">
                            Address -{' '}
                          </CText>
                          <CText color="#333333" style={{width: '85%'}}>
                            {item.booking_address
                              ? item.booking_address
                              : 'N/A'}
                          </CText>
                        </Container> */}
                        <Container
                          direction="row"
                          align="flex-start"
                          mh={WIDTH * 0.04}>
                          <CText weight="bold" color="#333333">
                            Phone No. -{' '}
                          </CText>
                          <CText color="#333333">
                            {item.customer_phone ? item.customer_phone : 'N/A'}
                          </CText>
                        </Container>
                        <Container
                          direction="row"
                          align="flex-start"
                          mh={WIDTH * 0.04}>
                          <CText weight="bold" color="#333333">
                            Package Name -{' '}
                          </CText>
                          <CText color="#333333">
                            {item.package_name ? item.package_name : 'N/A'}
                          </CText>
                        </Container>
                        <Container
                          direction="row"
                          align="flex-start"
                          mh={WIDTH * 0.04}>
                          <CText weight="bold" color="#333333">
                            Vehicle Model -
                          </CText>
                          <CText color="#333333">
                            {' '}
                            {item.car_model ? item.car_model : 'N/A'}
                          </CText>
                        </Container>
                        <Container
                          direction="row"
                          align="flex-start"
                          mh={WIDTH * 0.04}>
                          <CText weight="bold" color="#333333">
                            Assign Name -
                          </CText>
                          <CText color="#333333">
                            {' '}
                            {item.assigned_person
                              ? item.assigned_person
                              : 'N/A'}
                          </CText>
                        </Container>
                        <Container
                          direction="row"
                          justify="space-between"
                          align="center"
                          mh={WIDTH * 0.04}
                          mv={WIDTH * 0.02}>
                          <Container direction="row">
                            <Icon
                              type={Icons.AntDesign}
                              name={'clockcircleo'}
                              color="#2144C1"
                              size={20}
                            />
                            <CText style={{marginLeft: 14}}>
                              {moment.utc(item.day).format('h:mm A')}
                            </CText>
                          </Container>
                          <Container direction="row">
                            <Icon
                              type={Icons.AntDesign}
                              name={'calendar'}
                              color="#2144C1"
                              size={20}
                            />
                            <CText style={{marginLeft: 14, marginRight: 24}}>
                              {moment.utc(item.day).format('DD/MM/YYYY')}
                            </CText>
                          </Container>
                        </Container>
                      </Container>
                    );
                  })
                ) : (
                  <></>
                )}
              </>
            )}
            <Container mv={HEIGHT * 0.1}></Container>
          </CScrollable>
        </Container>
      </SafeAreaView>
    </>
  );
};
