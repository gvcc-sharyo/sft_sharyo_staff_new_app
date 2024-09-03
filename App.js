/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';

import {
  Alert,
  BackHandler,
  Linking,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import Entry from './Entry';
import VersionCheck from 'react-native-version-check';

export default function App() {
  useEffect(() => {
    checkUpdateNeeded();
  }, []);

  const checkUpdateNeeded = async () => {
    let updateNeeded = await VersionCheck.needUpdate();
    console.log(updateNeeded);
    if (updateNeeded && updateNeeded?.isNeeded) {
      Alert.alert(
        'Please update',
        'You will have to update your app to latest version',
        [
          {
            text: 'Update',
            onPress: () => {
              BackHandler.exitApp();
              Linking.openURL(updateNeeded.storeUrl);
            },
          },
        ],
      );
      //Alert the user and direct to the app url
    }
  };
  return <Entry />;
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

// export default App;
