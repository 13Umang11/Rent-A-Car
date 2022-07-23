import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//Screens
import HomeScreen from '../../Screens/user/HomeScreen';
import ProfileScreen from '../../Screens/user/ProfileScreen';
import MyBookingScreen from '../../Screens/user/MyBookingScreen';
//Custom Bottom Screens
import Bottom from './Bottom';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const Options = {
    headerStyle: {borderColor: '#F9AA33', backgroundColor: 'black'},
    headerTintColor: '#F9AA33',
    headerTitleAlign: 'center',
    headerTitleStyle: {fontWeight: 'bold', fontStyle: 'italic'},
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    tabBarInactiveBackgroundColor: '#1F1F1F',
    tabBarActiveBackgroundColor: '#312A21',
    headerShown: false,
    headerBackgroundContainerStyle: {
      borderBottomColor: '#F9AA33',
      borderBottomWidth: 2,
    },
  };
  return (
    // <NavigationContainer>
    <Tab.Navigator tabBar={props => <Bottom {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          ...Options,
        }}
      />
      <Tab.Screen
        name="MyBookings"
        component={MyBookingScreen}
        options={{
          ...Options,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          ...Options,
        }}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}
