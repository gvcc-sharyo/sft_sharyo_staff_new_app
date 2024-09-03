import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Platform,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {LoginSignin} from '../../screens/Login/loginSignin';
import {SignupScreen} from '../../screens/Signup/signupScreen';
import {OtpScreen} from '../../screens/Signup/otpScreen';

import {LoginScreen} from '../../screens/Login/loginScreen';
import {LoginOtpScreen} from '../../screens/Login/loginOtpScreen';

import {ForgotVerifyScreen} from '../../screens/Login/forgotVerifyScreen';
import {ForgotOtpScreen} from '../../screens/Login/forgotOtpScreen';
import {ForgotChangePasswordScreen} from '../../screens/Login/forgotChangePasswordScreen';

import {AssignmentList} from '../../screens/MyAssignment/assignmentList';
import {TaskDetails} from '../../screens/MyAssignment/taskDetails';

// import {ServiceAndPackages} from '../../screens/ServiceAndPackages/serviceAndPackages';
// import {ServicePackagesAdd} from '../../screens/ServiceAndPackages/servicePackagesAdd';
// import {ServicePackagesEdit} from '../../screens/ServiceAndPackages/servicePackagesEdit';
// import {ServicePackagesDetails} from '../../screens/ServiceAndPackages/servicePackagesDetails';
// import {CreatePackages} from '../../screens/ServiceAndPackages/createPackages';
// import {SelectService} from '../../screens/ServiceAndPackages/selectService';
// import {SelectServicePackagesDetails} from '../../screens/ServiceAndPackages/selectServicePackagesDetails';
// import {EditPackages} from '../../screens/ServiceAndPackages/editPackages';

// import {BookingList} from '../../screens/ManageBookings/bookingList';
// import {BookingDetails} from '../../screens/ManageBookings/bookingDetails';
// import {AssignWorkers} from '../../screens/ManageBookings/assignWorkers';

// import {StaffsList} from '../../screens/ManageStaffs/staffsList';

import {ProfileScreen} from '../../screens/Profile/profileScreen';
import {EditProfileScreen} from '../../screens/Profile/editProfileScreen';
import {ChangePasswordScreen} from '../../screens/Profile/changePasswordScreen';

import {Logout} from '../../screens/Profile/logout';

import {useSelector} from 'react-redux';

import Icon, {Icons} from '@components/CIcon/CustomIcon';
import CustomDrawer from '../CDrawer/CustomDrawer';
// import {COLORS} from '../../constants/colors';
// import ForgotPassword from '../../screens/Login/ForgotPassword';
// import Otp from '../../screens/Login/Otp';
// import ChangePassword from '../../screens/Login/ChangePassword';

import {components} from '@components/index';
import {AutoLogout} from '../../screens/Profile/AutoLogout';
import {navigationRef} from '../RootNaivgation';
import {AssignmentOTP} from '../../screens/MyAssignment/AssignmentOTP';
import {DeleteAccount} from '../../screens/Profile/DeleteAccount';

const {CText, Container} = components;
export const Navigation = () => {
  const [proEdit, setProEdit] = useState(1);
  const {token, user} = useSelector(state => state.userauth);
  const Stack = createNativeStackNavigator();
  // const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();

  const WIDTH = Dimensions.get('window').width;
  const HEIGHT = Dimensions.get('window').height;

  function deleteAlert() {
    Alert.alert('Warning', 'Are you sure deactivate your account?', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('Cancel Pressed');
        },
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          onPressYes();
        },
      },
    ]);
  }
  async function onPressYes() {
    setLoading(true);
    // await AsyncStorage.setItem('@token', temptoken);
    // console.log(temptoken);
    // toastMessageFunction('Account deleted successfully');
    try {
      let response = await accountDeletion();
      console.log(response.data);
      let resStatus = response.data.status;
      setLoading(false);

      if (resStatus === true) {
        // let temptoken = 'gdbrgbrgbrtbgtr';
        // console.log(temptoken);
        await AsyncStorage.clear();
        Logout();

        // await AsyncStorage.setItem('@token', temptoken);
        // console.log(temptoken);
        toastMessageFunction(response.data.message);
      } else {
        toastMessageFunction(response.data.message);
      }
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  }
  const DrawerScreen = () => (
    <Drawer.Navigator
      initialRouteName="My Profile"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#000',
        drawerActiveBackgroundColor: '#345ae3',

        drawerLabelStyle: {marginLeft: -10, color: '#fff', fontSize: 17},
      }}>
      {/* <Drawer.Screen
        name="Service & Packages"
        component={ServiceAndPackagesStack}
        options={{
          drawerIcon: () => (
            <Icon
              type={Icons.FontAwesome5}
              size={HEIGHT * 0.03}
              name={'toolbox'}
              color={'#fff'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Manage Booking"
        component={BookingStack}
        options={{
          drawerIcon: () => (
            <Icon
              type={Icons.Feather}
              size={HEIGHT * 0.03}
              name={'check-circle'}
              color={'#fff'}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Manage Staff"
        component={StaffsList}
        options={{
          drawerIcon: () => (
            <Icon
              type={Icons.FontAwesome5}
              size={HEIGHT * 0.03}
              name={'users-cog'}
              color={'#fff'}
            />
          ),
        }}
      /> */}

      <Drawer.Screen
        name="My Assignment"
        component={AssignmentListStack}
        options={{
          drawerIcon: () => (
            <Icon
              type={Icons.Ionicons}
              size={HEIGHT * 0.03}
              name={'checkmark-done-outline'}
              color={'#fff'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="My Profile"
        component={ProfileStack}
        options={{
          drawerIcon: () => (
            <Icon
              type={Icons.AntDesign}
              size={HEIGHT * 0.03}
              name={'user'}
              color={'#fff'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Change Password"
        component={ChangePasswordScreen}
        options={{
          drawerIcon: () => (
            <Icon
              type={Icons.Ionicons}
              size={HEIGHT * 0.03}
              name={'lock-closed-outline'}
              color={'#fff'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Deactivate Account"
        component={DeleteAccount}
        options={{
          drawerIcon: () => (
            <Icon
              type={Icons.AntDesign}
              size={HEIGHT * 0.03}
              name={'logout'}
              color={'#fff'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Log Out"
        component={Logout}
        options={{
          drawerIcon: () => (
            <Icon
              type={Icons.AntDesign}
              size={HEIGHT * 0.03}
              name={'logout'}
              color={'#fff'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );

  const ProfileStack = () => (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: 'white'},
        headerShown: false,
      }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="AutoLogout" component={AutoLogout} />
    </Stack.Navigator>
  );

  const AssignmentListStack = () => (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: 'white'},
        headerShown: false,
      }}>
      <Stack.Screen name="AssignmentList" component={AssignmentList} />
      <Stack.Screen name="TaskDetails" component={TaskDetails} />
      <Stack.Screen name="AssignmentOTP" component={AssignmentOTP} />
    </Stack.Navigator>
  );

  const ServiceAndPackagesStack = () => (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: 'white'},
        headerShown: false,
      }}>
      <Stack.Screen name="ServiceAndPackages" component={ServiceAndPackages} />
      <Stack.Screen name="ServicePackagesAdd" component={ServicePackagesAdd} />
      <Stack.Screen
        name="ServicePackagesEdit"
        component={ServicePackagesEdit}
      />
      <Stack.Screen
        name="ServicePackagesDetails"
        component={ServicePackagesDetails}
      />
      <Stack.Screen name="CreatePackages" component={CreatePackages} />
      <Stack.Screen name="SelectService" component={SelectService} />
      <Stack.Screen
        name="SelectServicePackagesDetails"
        component={SelectServicePackagesDetails}
      />
      <Stack.Screen name="EditPackages" component={EditPackages} />
    </Stack.Navigator>
  );

  const AuthScreenStack = () => (
    // <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: 'white'},
        headerShown: false,
      }}>
      <Stack.Screen name="LoginSignin" component={LoginSignin} />
      {/* <Stack.Screen name="SignupScreen" component={SignupScreen} /> */}
      {/* <Stack.Screen name="OtpScreen" component={OtpScreen} /> */}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="LoginOtpScreen" component={LoginOtpScreen} />

      <Stack.Screen name="ForgotVerifyScreen" component={ForgotVerifyScreen} />
      <Stack.Screen name="ForgotOtpScreen" component={ForgotOtpScreen} />
      <Stack.Screen
        name="ForgotChangePasswordScreen"
        component={ForgotChangePasswordScreen}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );

  return (
    <NavigationContainer ref={navigationRef}>
      {/* <SafeAreaView style={styles.container}> */}

      {token ? (
        <Drawer.Navigator
          initialRouteName="My Profile"
          drawerContent={props => <CustomDrawer {...props} />}
          screenOptions={{
            headerShown: false,
            drawerActiveTintColor: '#000',
            drawerActiveBackgroundColor: '#345ae3',
            drawerLabelStyle: {marginLeft: -10, color: '#fff', fontSize: 17},
          }}>
          {/* <Drawer.Screen
        name="Service & Packages"
        component={ServiceAndPackagesStack}
        options={{
          drawerIcon: () => (
            <Icon
              type={Icons.FontAwesome5}
              size={HEIGHT * 0.03}
              name={'toolbox'}
              color={'#fff'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Manage Booking"
        component={BookingStack}
        options={{
          drawerIcon: () => (
            <Icon
              type={Icons.Feather}
              size={HEIGHT * 0.03}
              name={'check-circle'}
              color={'#fff'}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Manage Staff"
        component={StaffsList}
        options={{
          drawerIcon: () => (
            <Icon
              type={Icons.FontAwesome5}
              size={HEIGHT * 0.03}
              name={'users-cog'}
              color={'#fff'}
            />
          ),
        }}
      /> */}

          <Drawer.Screen
            name="My Assignment"
            component={AssignmentListStack}
            options={{
              drawerIcon: () => (
                <Icon
                  type={Icons.Ionicons}
                  size={HEIGHT * 0.03}
                  name={'checkmark-done-outline'}
                  color={'#fff'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="My Profile"
            component={ProfileStack}
            options={{
              drawerIcon: () => (
                <Icon
                  type={Icons.AntDesign}
                  size={HEIGHT * 0.03}
                  name={'user'}
                  color={'#fff'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Change Password"
            component={ChangePasswordScreen}
            options={{
              drawerIcon: () => (
                <Icon
                  type={Icons.Ionicons}
                  size={HEIGHT * 0.03}
                  name={'lock-closed-outline'}
                  color={'#fff'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Deactivate Account"
            component={DeleteAccount}
            options={{
              drawerIcon: () => (
                <Icon
                  type={Icons.AntDesign}
                  size={HEIGHT * 0.03}
                  name={'logout'}
                  color={'#fff'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Log Out"
            component={Logout}
            options={{
              drawerIcon: () => (
                <Icon
                  type={Icons.AntDesign}
                  size={HEIGHT * 0.03}
                  name={'logout'}
                  color={'#fff'}
                />
              ),
            }}
          />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            contentStyle: {backgroundColor: 'white'},
            headerShown: false,
          }}>
          <Stack.Screen name="LoginSignin" component={LoginSignin} />
          {/* <Stack.Screen name="SignupScreen" component={SignupScreen} /> */}
          {/* <Stack.Screen name="OtpScreen" component={OtpScreen} /> */}
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="LoginOtpScreen" component={LoginOtpScreen} />

          <Stack.Screen
            name="ForgotVerifyScreen"
            component={ForgotVerifyScreen}
          />
          <Stack.Screen name="ForgotOtpScreen" component={ForgotOtpScreen} />
          <Stack.Screen
            name="ForgotChangePasswordScreen"
            component={ForgotChangePasswordScreen}
          />
        </Stack.Navigator>
      )}
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
