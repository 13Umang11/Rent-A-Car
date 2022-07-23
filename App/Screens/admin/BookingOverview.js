import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import database from '@react-native-firebase/database';
import AnimatedCar from '../../components/AnimatedCars';
import {back, users} from '../../Assets/icons/Index';
import Header from '../../components/Header';
import moment from 'moment';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import FastImage from 'react-native-fast-image';

export default function BookingOverview({navigation, route}) {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [uid, setuid] = useState('');
  const [mobile, setmobile] = useState('');
  const [profile, setprofile] = useState('');
  const [loader, setloader] = useState(false);
  var Route = route.params.item;
  var UserInfo = Route.val();
  const [status, setstatus] = useState(UserInfo.Status);

  useEffect(() => {
    // console.log('route.params.item', status);
    setloader(true);

    const userInfo = database()
      .ref(`Users/${UserInfo.UserID}`)
      .once('value')
      .then(data => {
        // console.log(data);
        var User = data.val();
        var Name = User.Name;
        setname(Name);
        var Email = User.Email;
        setemail(Email);
        var UID = User.UserID;
        setuid(UID);
        var MobileNo = User.Mobile;
        setmobile(MobileNo);
        var profile = User.ProfilePic;
        setprofile(profile);
        setloader(false);
      });
  }, []);

  useEffect(() => {
    const Update = database()
      .ref(`Bookings/${UserInfo.UserID}/${UserInfo.BookingID}`)
      .update({Status: status})
      .then(() => {
        console.log('Status uploded');
      });
    console.log(status);
  }, [status]);

  return (
    <View style={{flex: 1, backgroundColor: '#121212'}}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
        <Header
          title="Booking Overview"
          Show="true"
          source={back}
          Navigation={() => navigation.goBack()}
        />

        <AnimatedCar visible={loader} />
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{flexGrow: 1}}>
          <Text
            style={{
              color: Colors.White,
              fontSize: 28,
              textAlign: 'center',
              marginVertical: 10,
              fontFamily: Fonts.ProductBold,
            }}>
            {UserInfo.Manufacturer + UserInfo.CarName}
          </Text>
          <FastImage
            style={{
              width: Dimensions.get('screen').width - 15,
              height: 200,
              borderRadius: 20,
              marginBottom: 10,
              marginHorizontal: 7,
            }}
            source={{uri: UserInfo.CarImage, priority: 'high'}}
          />
          <View style={styles.main}>
            <Text
              style={{color: Colors.Yellow, textAlign: 'center', fontSize: 18}}>
              {moment(UserInfo.PickUp).format('D MMM YYYY')} --{' '}
              {moment(UserInfo.DropOff).format('D MMM YYYY')}
            </Text>
          </View>
          <View style={styles.main}>
            <Text
              style={{
                color: Colors.White,
                fontSize: 22,
                fontFamily: Fonts.ProductReguler,
              }}>
              Booking ID{'\n'}
            </Text>
            <Text
              style={{color: Colors.White, textAlign: 'right', fontSize: 18}}>
              {UserInfo.BookingID}
            </Text>
          </View>
          <View style={[styles.main, {flexDirection: 'row'}]}>
            <FastImage
              style={{
                marginTop: 5,
                height: 110,
                width: 100,
                marginRight: 10,
                tintColor: profile ? null : Colors.Yellow,
                backgroundColor: '#1F1F1F',
              }}
              source={profile ? {uri: profile, priority: 'high'} : users}
            />
            <View>
              <Text style={{color: Colors.Yellow, fontSize: 18}}>
                Name: <Text style={{color: Colors.White}}>{name}</Text>
              </Text>
              <Text style={{color: Colors.Yellow, fontSize: 14, width: 205}}>
                UID: <Text style={{color: Colors.White}}>{uid}</Text>
              </Text>
              <Text style={{color: Colors.Yellow, fontSize: 14, width: 205}}>
                Email: <Text style={{color: Colors.White}}>{email}</Text>
              </Text>
              <Text style={{color: Colors.Yellow, fontSize: 14}}>
                Mobile No: <Text style={{color: Colors.White}}>{mobile}</Text>
              </Text>
            </View>
          </View>
          {status != 'PENDING' ? (
            <View
              style={[
                styles.mainbtn,
                {
                  backgroundColor:
                    status == 'APPROVED'
                      ? Colors.Green
                      : status == 'CANCEL' || 'REJECTED'
                      ? Colors.Red
                      : null,
                },
              ]}>
              <Text style={styles.maintext}>{status}</Text>
            </View>
          ) : (
            <View>
              <View style={[styles.mainbtn, {backgroundColor: '#007ACC'}]}>
                <Text style={styles.maintext}>{status}</Text>
              </View>
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <TouchableOpacity
                  style={[styles.btn, {backgroundColor: 'red'}]}
                  onPress={() => setstatus('REJECTED')}>
                  <Text style={styles.maintext}>REJECT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btn, {backgroundColor: 'green'}]}
                  onPress={() => setstatus('APPROVED')}>
                  <Text style={styles.maintext}>APPROVE</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    borderColor: Colors.Yellow,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 15,
    padding: 10,
  },
  mainbtn: {
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  maintext: {
    padding: 10,
    textAlign: 'center',
    color: Colors.White,
    marginVertical: 5,
    fontSize: 20,
    fontFamily: Fonts.ProductReguler,
  },
  btn: {
    borderRadius: 15,
    margin: 5,
    marginVertical: 5,
    width: Dimensions.get('screen').width / 2.2,
  },
});
