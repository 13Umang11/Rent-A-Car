import React, {useEffect} from 'react';
import {LogBox, Platform, StatusBar, View} from 'react-native';
import {ToastAndroid} from 'react-native';
import Toast from 'react-native-simple-toast';

import SplashScreen from 'react-native-splash-screen';
import {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default function Splash({navigation}) {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      // console.log(user);
      // if (user) {
      //   const user = firebase.auth().currentUser;
      //   console.log('user logged', user);
      if (user) {
        console.log('user.uid', user.uid);
        // const user = firebase.auth().currentUser;
        const Auth = database()
          .ref(`Users/${user.uid}`)
          .once('value')
          .then(data => {
            const value = data.val();
            var Role = value.Role;
            var Name = value.Name;
            if (Role == 'ADMIN') {
              console.log('ADMIN');
              navigation.replace('Admin');
              if (Platform.OS === 'android') {
                ToastAndroid.show(`Welcome ${Name}!`, ToastAndroid.SHORT);
              } else {
                Toast.show(`Welcome ${Name}!`, Toast.SHORT, [
                  'UIAlertController',
                ]);
              }
              SplashScreen.hide();
            } else {
              console.log('USER');
              navigation.replace('Home');
              if (Platform.OS === 'android') {
                ToastAndroid.show(`Welcome ${Name}!`, ToastAndroid.SHORT);
              } else {
                Toast.show(`Welcome ${Name}!`, Toast.SHORT, [
                  'UIAlertController',
                ]);
              }
              SplashScreen.hide();
            }
          });
      } else {
        navigation.navigate('SignIn');
        if (Platform.OS === 'android') {
          ToastAndroid.show(`Welcome!`, ToastAndroid.SHORT);
        } else {
          Toast.show(`Welcome!`, Toast.SHORT, ['UIAlertController']);
        }
        SplashScreen.hide();
      }
      // }
    });
  }, []);

  return (
    <View style={{backgroundColor: '#000', flex: 1}}>
      <StatusBar barStyle={'light-content'} />
    </View>
  );
}
