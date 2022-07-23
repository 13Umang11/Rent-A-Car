import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Animated,
  useWindowDimensions,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {down, information, right, home} from '../../Assets/icons/Index';
import database, {firebase} from '@react-native-firebase/database';
import AnimatedCar from '../../components/AnimatedCars';
import Header from '../../components/Header';
import moment from 'moment';
import Modals from '../../components/Modals';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import FastImage from 'react-native-fast-image';

export default function Checkout({navigation, route}) {
  const [key, setkey] = useState('');
  const [showV, setshowV] = useState(false);
  const [showP, setshowP] = useState(false);
  const [pay, setpay] = useState(false);
  const [depo, setdepo] = useState(false);
  const [loader, setloader] = useState(false);
  const [index, setindex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const {width} = useWindowDimensions();
  const Data = [
    {
      image: route.params.Img1,
    },
    {
      image: route.params.Img2,
    },
    {
      image: route.params.Img3,
    },
  ];

  const ShowPay = () => {
    setpay(!pay);
  };
  const ShowD = () => {
    setdepo(!depo);
  };
  const ShowV = () => {
    setshowV(!showV);
  };
  const ShowP = () => {
    setshowP(!showP);
  };

  useEffect(() => {
    console.log('route', route);
    const user = firebase.auth().currentUser;
    const BookId = database().ref(`Bookings/${user.uid}`).push();
    setkey(BookId.key);
    console.log(BookId.key);
  }, []);

  const ViewBookings = () => {
    setloader(true);
    const user = firebase.auth().currentUser;
    const Extra = database()
      .ref(`Bookings/${user.uid}/${key}/BookingExtras`)
      .update({
        Amount: route.params.extra,
        BabySeat: route.params.childset,
        Driver: route.params.Driver,
        GPS: route.params.GPS,
      });
    const Ref = database().ref(`Bookings/${user.uid}`).push();
    const Booking = database()
      .ref(`Bookings/${user.uid}/${key}`)
      .update({
        BookingID: key,
        BookingTime: moment().toISOString(),
        CarID: route.params.CarId,
        CarImage: route.params.Img1,
        CarName: route.params.CarName,
        DropoffDate: route.params.DropOff.toISOString(),
        Manufacturer: route.params.Manufacturer,
        PickupDate: route.params.PickUp.toISOString(),
        RentPerDay: route.params.Daily,
        Status: 'PENDING',
        TotalDays: route.params.total,
        TotalRent: route.params.totalprice,
        UserID: user.uid,
      })
      .then(() => navigation.navigate('MyBookings'), setloader(false));
  };

  return (
    <View style={{flex: 1, backgroundColor: '#121212'}}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
        <Header
          title="Checkout"
          Show="true"
          source={home}
          Navigation={() => navigation.popToTop()}
        />

        <AnimatedCar visible={loader} />
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{flexGrow: 1}}>
          <Text
            style={{
              color: Colors.White,
              fontSize: 24,
              textAlign: 'center',
              marginVertical: 10,
              fontFamily: Fonts.ProductBold,
            }}>
            {`${route.params.Manufacturer} ${route.params.CarName}`}
          </Text>

          <FlatList
            horizontal
            pagingEnabled
            data={Data}
            renderItem={({item, index}) => (
              <View key={String(index)}>
                <FastImage
                  style={{
                    height: 200,
                    width: Dimensions.get('screen').width - 20,
                    marginHorizontal: 10,
                    borderRadius: 10,
                  }}
                  source={{uri: item.image, priority: 'high'}}
                />
              </View>
            )}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: scrollX,
                    },
                  },
                },
              ],
              {
                useNativeDriver: false,
              },
            )}
            onMomentumScrollEnd={i => {
              const index = Math.floor(
                i.nativeEvent.contentOffset.x /
                  i.nativeEvent.layoutMeasurement.width,
              );
              setindex(index);
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            {Data.map((_, i) => {
              const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

              const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange: [10, 20, 10],
                extrapolate: 'clamp',
              });
              console.log('input', dotWidth);
              return (
                <Animated.View
                  key={i}
                  style={[
                    styles.dot,
                    {
                      width: dotWidth,
                      opacity: i == index ? 1 : 0.6,
                      backgroundColor: Colors.Yellow,
                    },
                  ]}></Animated.View>
              );
            })}
          </View>

          <View>
            <View style={styles.main}>
              <Text
                style={{
                  color: Colors.Yellow,
                  textAlign: 'center',
                  fontSize: 18,
                }}>
                {moment(route.params.PickUp).format('D MMM YYYY')} --
                {moment(route.params.DropOff).format(' D MMM YYYY')}
              </Text>
            </View>
            <View style={styles.main}>
              <Text
                style={{
                  color: Colors.White,
                  fontSize: 22,
                }}>
                Booking ID{'\n'}
              </Text>
              <Text
                style={{color: Colors.White, textAlign: 'right', fontSize: 18}}>
                {key}
              </Text>
            </View>
            <TouchableOpacity onPress={ShowV} activeOpacity={0.7}>
              <View>
                {showV ? (
                  <View style={styles.main}>
                    <View style={styles.container}>
                      <Text
                        style={{
                          color: Colors.White,
                          fontSize: 22,
                        }}>
                        Vehicle Information
                      </Text>
                      <Image
                        source={down}
                        style={{
                          height: 20,
                          width: 20,
                          tintColor: Colors.White,
                          alignSelf: 'center',
                        }}
                      />
                    </View>
                    <View>
                      <View style={styles.subview}>
                        <Text style={styles.droptitle}>Manufacturer</Text>
                        <Text style={styles.droptext}>
                          {route.params.Manufacturer}
                        </Text>
                      </View>
                      <View style={styles.subview}>
                        <Text style={styles.droptitle}>ModalName </Text>
                        <Text style={styles.droptext}>
                          {route.params.CarName}
                        </Text>
                      </View>
                      <View style={styles.subview}>
                        <Text style={styles.droptitle}>Modal Year</Text>
                        <Text style={styles.droptext}>
                          {route.params.ModalYear}
                        </Text>
                      </View>
                      <View style={styles.subview}>
                        <Text style={styles.droptitle}>Class</Text>
                        <Text style={styles.droptext}>
                          {route.params.Class}
                        </Text>
                      </View>
                      <View style={styles.subview}>
                        <Text style={styles.droptitle}>Capacity</Text>
                        <Text style={styles.droptext}>
                          {route.params.Capacity} Seater
                        </Text>
                      </View>
                      <View style={styles.subview}>
                        <Text style={styles.droptitle}>Transmission</Text>
                        <Text style={styles.droptext}>
                          {route.params.GearType}
                        </Text>
                      </View>
                      <View style={styles.subview}>
                        <Text style={styles.droptitle}>Fuel Type</Text>
                        <Text style={styles.droptext}>
                          {route.params.FuelType}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View
                    style={[
                      styles.main,
                      {flexDirection: 'row', justifyContent: 'space-between'},
                    ]}>
                    <Text
                      style={{
                        color: Colors.White,
                        fontSize: 22,
                      }}>
                      Vehicle Information
                    </Text>
                    <Image
                      source={right}
                      style={{
                        height: 20,
                        width: 20,
                        tintColor: Colors.White,
                        alignSelf: 'center',
                      }}
                    />
                  </View>
                )}
              </View>
            </TouchableOpacity>

            <Modals
              isVisible={pay}
              Title="Pay at the Counter"
              SubText="The total amount of your booking will be paid directly at the
                      ounter of rental company when you pickup the vehicle."
              btnTitle="OK"
              onPress={ShowPay}
            />

            <TouchableOpacity onPress={ShowP} activeOpacity={0.7}>
              <View>
                {showP ? (
                  <View style={styles.main}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: Colors.White,
                          fontSize: 22,
                        }}>
                        Payment Details
                      </Text>
                      <Image
                        source={down}
                        style={{
                          height: 20,
                          width: 20,
                          tintColor: Colors.White,
                          alignSelf: 'center',
                        }}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.subtitle}>Total Day</Text>
                      <Text style={styles.subtext}>{route.params.total}</Text>
                    </View>
                    <View style={styles.subview}>
                      <Text style={styles.subtitle}>Daily Rate</Text>
                      <Text style={styles.subtext}>₹{route.params.Daily}</Text>
                    </View>
                    <View style={styles.subview}>
                      <Text style={styles.subtitle}>Vehical</Text>
                      <Text style={styles.subtext}>₹{route.params.Daily}</Text>
                    </View>
                    <View style={styles.subview}>
                      <Text style={styles.subtitle}>Booking's Extras</Text>
                      <Text style={styles.subtext}>₹{route.params.extra}</Text>
                    </View>
                    <View style={styles.subview}>
                      <Text style={styles.subtitle}>Total Amount</Text>
                      <Text
                        style={{
                          marginRight: 10,
                          fontSize: 16,
                          color: Colors.Yellow,
                        }}>
                        ₹{route.params.totalprice}
                      </Text>
                    </View>

                    <View
                      style={{
                        marginTop: 5,
                        flexDirection: 'row',
                        borderTopColor: 'gray',
                        borderTopWidth: 1,
                        borderBottomColor: 'gray',
                        borderBottomWidth: 1,
                        padding: 5,
                      }}>
                      <TouchableOpacity onPress={ShowPay}>
                        <Image
                          style={{
                            height: 20,
                            width: 20,
                            marginVertical: 5,
                            marginHorizontal: 10,
                            tintColor: Colors.Yellow,
                          }}
                          source={information}
                        />

                        <Modals
                          isVisible={depo}
                          Title="Secure Deposit"
                          SubText="When you pick up your vehicle,the rental company will place a hold
                                  on your credit of equivalent document for an estimated amount
                                  based on the type of vehicle abd rental period you selected. This
                                  amount will only be a hold. In other words, it will not be charged
                                  to your card. The hold serves simply as guarantee for the rental
                                  company,should the vehicle be damaged of extra costs be
                                  incurredduring the rental period. The hold will be released as
                                  soon as you return your vehicle."
                          btnTitle="OK"
                          onPress={ShowD}
                        />
                      </TouchableOpacity>
                      <Text
                        style={[styles.subtitle, {fontSize: 14, marginTop: 5}]}>
                        Pay at Counter
                      </Text>
                    </View>

                    <View
                      style={{
                        marginTop: 5,
                        flexDirection: 'row',
                        padding: 5,
                      }}>
                      <TouchableOpacity onPress={ShowD}>
                        <Image
                          style={{
                            height: 20,
                            width: 20,
                            marginVertical: 5,
                            marginHorizontal: 10,
                            tintColor: Colors.Yellow,
                          }}
                          source={information}
                        />
                      </TouchableOpacity>
                      <Text
                        style={[styles.subtitle, {fontSize: 14, marginTop: 5}]}>
                        Security Deposit{'\n'}
                        <Text
                          style={{
                            color: 'gray',
                            fontSize: 12,
                            textAlign: 'justify',
                          }}>
                          {'   '}
                          Estabised by rental company in the rental{'\n'}
                          {'   '}agreement
                        </Text>
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View
                    style={[
                      styles.main,
                      {flexDirection: 'row', justifyContent: 'space-between'},
                    ]}>
                    <Text
                      style={{
                        color: Colors.White,
                        fontSize: 22,
                      }}>
                      Payment Details
                    </Text>
                    <Image
                      source={right}
                      style={{
                        height: 20,
                        width: 20,
                        tintColor: Colors.White,
                        alignSelf: 'center',
                      }}
                    />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btn} onPress={ViewBookings}>
            <Text style={styles.btntext}>View My Bookings</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    // marginVertical: 20,
    alignSelf: 'center',
    borderRadius: 20,
    height: 200,
    width: 340,
  },
  main: {
    borderColor: Colors.Yellow,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 15,
    padding: 10,
  },
  droptitle: {
    color: 'gray',
    fontSize: 16,
  },
  droptext: {
    color: 'gray',
    fontSize: 16,
  },
  subtitle: {
    color: 'gray',
    fontSize: 18,
    fontWeight: '400',
  },
  subtext: {
    marginRight: 10,
    fontSize: 16,
    color: 'gray',
  },
  btntext: {
    textAlign: 'center',
    padding: 15,
    color: 'white',
    fontSize: 22,
  },
  btn: {
    margin: 10,
    marginBottom: 40,
    marginHorizontal: 15,
    backgroundColor: Colors.Yellow,
    borderRadius: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  subview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
