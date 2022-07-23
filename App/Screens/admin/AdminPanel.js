import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  addcar,
  calendar,
  logout,
  managecar,
  manageuser,
} from '../../Assets/icons/Index';
import Header from '../../components/Header';
import auth from '@react-native-firebase/auth';
import Fonts from '../../constants/Fonts';

export default function AdminPanel({navigation}) {
  const SignOut = () => {
    auth().signOut();
    console.log('Sign Out......');
    navigation.replace('SignIn');
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
        <StatusBar barStyle={'light-content'} />
        <Header title="Admin Panel" />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('AddCar')}>
            <View
              style={{
                height: 165,
                width: Dimensions.get('screen').width / 2.2,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#F9AA33',
                margin: 10,
              }}>
              <Image
                source={addcar}
                style={{height: 90, width: 110, tintColor: '#F9AA33'}}
              />
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  margin: 10,
                  fontFamily: Fonts.ProductBold,
                }}>
                Add New Car
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ManageCars')}>
            <View
              style={{
                height: 165,
                width: Dimensions.get('screen').width / 2.2,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                borderWidth: 1,
                marginVertical: 10,
                borderColor: '#F9AA33',
              }}>
              <Image
                source={managecar}
                style={{height: 90, width: 110, tintColor: '#F9AA33'}}
              />
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  margin: 10,
                  fontFamily: Fonts.ProductBold,
                }}>
                Manage Car
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ManageBookings')}>
            <View
              style={{
                height: 165,
                width: Dimensions.get('screen').width / 2.2,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#F9AA33',
                marginHorizontal: 10,
              }}>
              <Image
                source={calendar}
                style={{height: 90, width: 90, tintColor: '#F9AA33'}}
              />
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  margin: 5,
                  fontFamily: Fonts.ProductBold,
                }}>
                Manage Bookings
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ManageUsers')}>
            <View
              style={{
                height: 165,
                width: Dimensions.get('screen').width / 2.2,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#F9AA33',
              }}>
              <Image
                source={manageuser}
                style={{height: 90, width: 90, tintColor: '#F9AA33'}}
              />
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  margin: 10,
                  fontFamily: Fonts.ProductBold,
                }}>
                Manage Users
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            height: 165,
            width: Dimensions.get('screen').width / 2.2,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#F9AA33',
            margin: 10,
          }}
          onPress={SignOut}>
          <Image
            source={logout}
            style={{
              height: 90,
              width: 90,
              tintColor: '#F9AA33',
              left: 10,
            }}
          />
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              margin: 10,
              fontFamily: Fonts.ProductBold,
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
