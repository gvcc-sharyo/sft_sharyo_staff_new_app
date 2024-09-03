/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import 'react-native-gesture-handler';
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {store} from './src/store';
import {Provider} from 'react-redux';
LogBox.ignoreAllLogs();
const SharyoStaff = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => SharyoStaff);
