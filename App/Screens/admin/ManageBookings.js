import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import database from '@react-native-firebase/database';
import AnimatedCar from '../../components/AnimatedCars';
import Header from '../../components/Header';
import {back} from '../../Assets/icons/Index';
import moment from 'moment';
import Colors from '../../constants/Colors';
import FastImage from 'react-native-fast-image';

export default function ManageBookings({navigation}) {
  const [flatlistData, setflatlistData] = useState();
  const [loader, setloader] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloader(true);
    const Data = database()
      .ref(`Bookings`)
      .on('value', snapshot => {
        var tempdata = [];
        snapshot.forEach(function (item, index) {
          item.forEach(function (item1, index) {
            tempdata.push(item1);
          });
          setflatlistData(tempdata);
          setloader(false);
        });
      });
  }, []);

  const Book = ({item}) => {
    console.log('itemlog', item);
    navigation.navigate('BookingOverview', {item: item});
  };

  const RenderItem = ({item, index}) => {
    var render = item.val();
    var Status = render.Status;
    return (
      <TouchableOpacity
        onPress={() => {
          Book({item});
        }}>
        <View
          key={String(index)}
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            borderColor: Colors.Yellow,
            borderRadius: 10,
            borderWidth: 1,
            marginHorizontal: 10,
            marginVertical: 5,
            padding: 10,
          }}>
          <FastImage
            style={{height: 85, width: 145, borderRadius: 8}}
            source={{uri: render.CarImage, priority: 'high'}}
          />
          <View style={{flex: 1}}>
            <Text style={{color: Colors.White, textAlign: 'right'}}>
              {render.Manufacturer + ' ' + render.CarName}
            </Text>
            <Text style={{color: Colors.White, textAlign: 'right'}}>
              {render.BookingID}
            </Text>
            <Text style={{color: Colors.White, textAlign: 'right'}}>
              {moment(render.PickupDate).format('D MMM YYYY')} --{' '}
              {moment(render.DropoffDate).format('D MMM YYYY')}
            </Text>

            <View
              style={[
                styles.btn,
                {
                  backgroundColor:
                    Status == 'PENDING'
                      ? Colors.Blue
                      : Status == 'APPROVED'
                      ? Colors.Green
                      : Status == 'CANCEL' || 'REJECTED'
                      ? Colors.Red
                      : null,
                },
              ]}>
              <Text style={styles.btntext}>{Status}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
        <Header
          title="Manage Bookings"
          Show="true"
          source={back}
          Navigation={() => navigation.goBack()}
        />
        <AnimatedCar visible={loader} />
        <FlatList
          data={flatlistData}
          renderItem={RenderItem}
          ListEmptyComponent={
            <View
              style={{
                height: Dimensions.get('screen').height / 1.2,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 24,
                  textAlign: 'center',
                }}>
                No Cars Available
              </Text>
            </View>
          }
          refreshing={false}
          onRefresh={() => setloading(!loading)}
        />
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  btn: {
    marginTop: 5,
    alignSelf: 'flex-end',
    borderRadius: 50,
    width: 100,
  },
  btntext: {
    textAlign: 'center',
    padding: 5,
    color: Colors.White,
    fontWeight: 'bold',
  },
});
