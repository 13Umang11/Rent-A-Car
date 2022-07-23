import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Header from '../../components/Header';
import AnimatedCar from '../../components/AnimatedCars';
import moment from 'moment';
import {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import FastImage from 'react-native-fast-image';

const MyBookingScreen = ({navigation, route}) => {
  const [Data, setData] = useState([]);
  const [loader, setloader] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloader(true);
    const user = firebase.auth().currentUser;
    const Refrence = database()
      .ref(`Bookings/${user.uid}`)
      .on('value', data => {
        var tempdata = [];
        data.forEach(function (item, index) {
          tempdata.push(item);
        });
        setData(tempdata);
        setloader(false);
      });
  }, []);

  const BookingDetails = Books => {
    navigation.navigate('BookingDetails', {item: Books});
  };

  const Renderdata = ({item, index}) => {
    var Books = item.val();
    console.log(Books);

    return (
      <TouchableOpacity
        onPress={() => BookingDetails(Books)}
        activeOpacity={0.7}>
        <View key={String(index)} style={styles.container}>
          <Text style={styles.title}>
            {Books.Manufacturer + ' ' + Books.CarName}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <FastImage
              style={styles.image}
              source={{uri: Books.CarImage, priority: 'high'}}
            />
            <View style={{flex: 1}}>
              <Text style={styles.date}>
                PICK-UP: {moment(Books.PickupDate).format('D MMM')}
              </Text>
              <Text style={styles.date}>
                DROP-OFF: {moment(Books.DropoffDate).format('D MMM')}
              </Text>
              <Text style={styles.daily}>₹{Books.RentPerDay} Per Day</Text>

              <Text style={styles.total}>₹{Books.TotalRent}</Text>
              <View
                style={[
                  styles.btn,
                  {
                    backgroundColor:
                      Books.Status == 'PENDING'
                        ? Colors.Blue
                        : Books.Status == 'APPROVED'
                        ? Colors.Green
                        : Books.Status == 'CANCEL' || 'REJECTED'
                        ? Colors.Red
                        : null,
                  },
                ]}>
                <Text style={styles.btntext}>{Books.Status}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#121212'}}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
        <AnimatedCar visible={loader} />

        <Header title="My Bookings" />

        <StatusBar backgroundColor="#121212" />

        <FlatList
          data={Data.reverse()}
          renderItem={Renderdata}
          ListEmptyComponent={
            <View
              style={{
                height: Dimensions.get('screen').height / 1.2,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: Colors.lightGray,
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
};
export default MyBookingScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 5,
    borderColor: Colors.Yellow,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  title: {
    color: Colors.White,
    textAlign: 'left',
    fontSize: 22,
    marginHorizontal: 2,
    fontFamily: Fonts.ProductBold,
  },
  image: {
    width: 190,
    height: 110,
    borderRadius: 10,
    marginTop: 5,
  },
  daily: {
    marginHorizontal: 10,
    color: 'grey',
    textAlign: 'left',
    fontSize: 14,
  },
  date: {
    marginHorizontal: 10,
    color: Colors.White,
    textAlign: 'left',
    fontSize: 14,
  },
  total: {
    margin: 5,
    marginHorizontal: 10,
    color: Colors.White,
    textAlign: 'left',
    fontSize: 18,
  },
  btn: {
    borderRadius: 20,
    marginLeft: 10,

    // width: Dimensions.get('window').width / 2.5,
  },
  btntext: {
    textAlign: 'center',
    padding: 5,
    color: Colors.White,
    fontWeight: 'bold',
  },
});
