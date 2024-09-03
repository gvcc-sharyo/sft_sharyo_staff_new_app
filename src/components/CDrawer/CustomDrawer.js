import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {COLORS} from '@constants/colors';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {components} from '@components/index';
const {CText, CTextInput, Container, CButton, CScrollable, CImage} = components;

import Icon, {Icons} from '../CIcon/CustomIcon';
import user_avatar1 from '@assets/Image/user6.png';

import {useSelector, useDispatch} from 'react-redux';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const CustomDrawer = props => {
  const {user, token} = useSelector(state => state.userauth);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.MajorColor, color: '#fff'}}>
      <DrawerContentScrollView
        {...props}
        // {...propsp}
        contentContainerStyle={{color: '#fff'}}>
        <Container>
          <Container
            touchable
            align="flex-end"
            pv={5}
            ph={10}
            onPress={() => props.navigation.closeDrawer()}>
            <Icon type={Icons.Entypo} name={'cross'} color={COLORS.text} />
          </Container>
          <Container
            ph={WIDTH * 0.04}
            mv={HEIGHT * 0.03}
            direction="row"
            align="center">
            <Container
              radius={HEIGHT * 0.5}
              bg={'#fff'}
              height={HEIGHT * 0.09}
              width={HEIGHT * 0.09}
              align="center"
              justify="center">
              <CImage
                source={{uri: user.profile_image}}
                width={HEIGHT * 0.08}
                height={HEIGHT * 0.08}
                radius={50}
                padding={10}
              />
            </Container>
            <Container mh={10}>
              <CText color={COLORS.text} size={18} weight="bold">
                {user.first_name + ' ' + user.last_name}
              </CText>
            </Container>
          </Container>
        </Container>
        <Container
          mh={10}
          style={{borderWidth: 0.5, borderColor: '#fff'}}></Container>
        <DrawerItemList {...props} />
        <Container
          mh={10}
          style={{borderWidth: 0.5, borderColor: '#fff'}}></Container>

        {/* <DrawerItemList {...props.propsp} /> */}
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
