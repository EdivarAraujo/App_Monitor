import React from 'react';
import {LogBox, StatusBar} from 'react-native';
import {Home} from './screens';

LogBox.ignoreAllLogs([
  "Warning: EventEmitter.removeListener('appStateDidChange', ...)",
]);

export default function index() {
  return (
    <>
      <StatusBar translucent={true} backgroundColor="#154F91" />
      <Home />
    </>
  );
}
