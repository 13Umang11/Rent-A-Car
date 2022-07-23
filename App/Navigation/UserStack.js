import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
//Screens
import EditScreen from '../Screens/user/EditScreen';
import BookingDetails from '../Screens/user/BookingDetails';
import Choose from '../Screens/user/Choose';
import Cars from '../Screens/user/Cars';
import Checkout from '../Screens/user/Checkout';
import BottomTab from './bottomtab/BottomTab';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    // <NavigationContainer>
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={BottomTab} />
      <Stack.Screen name="Edit" component={EditScreen} />
      <Stack.Screen name="Choose Your Car" component={Choose} />
      <Stack.Screen name="Cars" component={Cars} />
      <Stack.Screen name="BookingDetails" component={BookingDetails} />
      <Stack.Screen name="CheckOut" component={Checkout} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
