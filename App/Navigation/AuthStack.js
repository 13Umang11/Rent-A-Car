import React, {useEffect} from 'react';
// import {View} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
// import {NavigationContainer} from '@react-navigation/native';
import SignInScreen from '../Screens/authentication/SignInScreen';
import SignUpScreen from '../Screens/authentication/SignUpScreen';

const Stack = createStackNavigator();

export default function AuthStack({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="SignInScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
