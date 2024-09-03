import React from 'react';
import {ScrollView} from 'react-native';
import {styles} from './styles';
export const CScrollable = ({
  style,
  horizontal,
  hide,
  margin,
  padding,
  mv,
  mh,
  pv,
  ph,
  height,
  width,
  refreshControl,
  children,
}) => {
  return (
    <ScrollView
      horizontal={horizontal}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshControl={refreshControl}
      contentContainerStyle={styles.scroller(
        style,
        margin,
        mv,
        mh,
        padding,
        pv,
        ph,
        height,
        width,
      )}>
      {children}
    </ScrollView>
  );
};
