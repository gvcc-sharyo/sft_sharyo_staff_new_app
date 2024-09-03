import React from 'react';
import {SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

export default function Loader(props) {
  return props.visible ? (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator color={'white'} size={'large'} />
    </SafeAreaView>
  ) : null;
}

Loader.propTypes = {
  visible: PropTypes.bool,
};

Loader.defaultProps = {
  visible: true,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
