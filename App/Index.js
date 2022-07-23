import React from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import MainStack from './Navigation/MainStack';

export default function Index() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <MainStack />
    </NavigationContainer>
  );
}
