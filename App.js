import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes'

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])

export default function App() {
  return (
    <>
      <StatusBar hidden={true} backgroundColor="#7D40E7" barStyle="light-content"/>
      <Routes />
    </>
  );
}