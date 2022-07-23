import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AdminStack from './AdminStack';
import AuthStack from './AuthStack';
import UserStack from './UserStack';
import Splash from './Spalsh';
import {View} from 'react-native';

const MainStack = createStackNavigator();

export default function Main() {
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
          cardOverlay: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: '#YOUR_COLOR',
              }}
            />
          ),
        }}>
        <MainStack.Screen name="Splash" component={Splash} />
        <MainStack.Screen name="SignIn" component={AuthStack} />
        <MainStack.Screen name="Home" component={UserStack} />
        <MainStack.Screen name="Admin" component={AdminStack} />
      </MainStack.Navigator>
    </View>
  );
}
