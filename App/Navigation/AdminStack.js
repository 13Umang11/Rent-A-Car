import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
//Admin Screens
import AdminPanel from '../Screens/admin/AdminPanel';
import AddCar from '../Screens/admin/AddCar';
import ManageCars from '../Screens/admin/ManageCars';
import ManageBookings from '../Screens/admin/ManageBookings';
import ManageUsers from '../Screens/admin/ManageUsers';
import EditUser from '../Screens/admin/EditUser';
import EditCar from '../Screens/admin/EditCar';
import CarView from '../Screens/admin/CarView';
import BookingOverview from '../Screens/admin/BookingOverview';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';

const Stack = createStackNavigator();

export default function AdminStack() {
  return (
    // <NavigationContainer>
    <SafeAreaProvider>
      <Stack.Navigator
        initialRouteName="Adminpanel"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Adminpanel" component={AdminPanel} />
        <Stack.Screen name="AddCar" component={AddCar} />
        <Stack.Screen name="ManageCars" component={ManageCars} />
        <Stack.Screen name="ManageBookings" component={ManageBookings} />
        <Stack.Screen name="ManageUsers" component={ManageUsers} />
        <Stack.Screen name="Edit Car" component={EditCar} />
        <Stack.Screen name="CarView" component={CarView} />
        <Stack.Screen name="EditUser" component={EditUser} />
        <Stack.Screen name="BookingOverview" component={BookingOverview} />
      </Stack.Navigator>
    </SafeAreaProvider>
    // </NavigationContainer>
  );
}
