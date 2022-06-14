import React from 'react';
import {LogBox} from 'react-native';
import {Home} from './screens';

LogBox.ignoreAllLogs([
  "Warning: EventEmitter.removeListener('appStateDidChange', ...)",
]);

export default function index() {
  return <Home />;
}
