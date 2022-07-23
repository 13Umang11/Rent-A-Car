import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {
  down,
  information,
  right,
  back,
  driver,
  babySeat,
  GPS,
} from '../../Assets/icons/Index';
import database from '@react-native-firebase/database';
import {firebase} from '@react-native-firebase/auth';
import AnimatedCar from '../../components/AnimatedCars';
import Header from '../../components/Header';
import moment from 'moment';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Modals from '../../components/Modals';

export default function Checkout({navigation, route}) {
  const [checkD, setcheckD] = useState(false);
  const [checkG, setcheckG] = useState(false);
  const [checkC, setcheckC] = useState(false);
  const [pay, setpay] = useState(false);
  const [extra, setextra] = useState(0);
  const [depo, setdepo] = useState(false);
  const [showV, setshowV] = useState(false);
  const [showB, setshowB] = useState(false);
  const [showP, setshowP] = useState(false);
  const [loader, setloader] = useState(false);
  var Details = route.params.item;
  const [status, setstatus] = useState(Details.Status);
  const [car, setcar] = useState({});

  useEffect(() => {
    setloader(true);
    const user = firebase.auth().currentUser;
    const BookId = database()
      .ref(`Bookings/${Details.UserID}/${Details.BookingID}/BookingExtras`)
      .once('value')
      .then(data => {
        var Details = data.val();
        setcheckD(Details.Driver);
        setcheckC(Details.BabySeat);
        setcheckG(Details.GPS);
        setextra(Details.Amount);
        setloader(false);
      });

    const Cars = database()
      .ref(`Cars/${Details.CarID}`)
      .once('value')
      .then(data => {
        var cars = data.val();
        setcar(cars);
      });
  }, []);

  useEffect(() => {
    const cancel = database()
      .ref(`Bookings/${Details.UserID}/${Details.BookingID}`)
      .update({Status: status})
      // .once('value')
      .then(() => {
        console.log('data', status);
      });
  }, [status]);

  const ShowPay = () => {
    setpay(!pay);
  };
  const ShowD = () => {
    setdepo(!depo);
  };

  const ShowV = () => {
    setshowV(!showV);
  };
  const ShowB = () => {
    setshowB(!showB);
  };
  const ShowP = () => {
    setshowP(!showP);
  };

  const Cancel = () => {
    setstatus('CANCELED');
    console.log(status);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#121212'}}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
        <Header
          title="Booking Details"
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
              fontSize: 24,
              textAlign: 'center',
              marginVertical: 10,
              fontWeight: '700',
              fontFamily: Fonts.ProductBold,
            }}>
            {Details.Manufacturer + ' ' + Details.CarName}
          </Text>

          <Image
            style={{
              height: 200,
              width: Dimensions.get('screen').width / 1.1,
              alignSelf: 'center',
              borderRadius: 5,
            }}
            source={{uri: Details.CarImage}}
          />

          <View style={{marginTop: 10}}>
            <View style={styles.main}>
              <Text
                style={{
                  color: Colors.Yellow,
                  textAlign: 'center',
                  fontSize: 18,
                }}>
                {moment(Details.PickupDate).format('D MMM YYYY')} --
                {moment(Details.DropoffDate).format(' D MMM YYYY')}
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
                {Details.BookingID}
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
                          fontSize: 18,
                          fontSize: 22,
                          fontFamily: Fonts.ProductReguler,
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
                      <View style={[styles.container, {marginTop: 10}]}>
                        <Text style={styles.droptitle}>Manufacturer</Text>
                        <Text style={styles.droptext}>
                          {Details.Manufacturer}
                        </Text>
                      </View>
                      <View style={styles.container}>
                        <Text style={styles.droptitle}>ModalName</Text>
                        <Text style={styles.droptext}>{Details.CarName}</Text>
                      </View>
                      <View style={styles.container}>
                        <Text style={[styles.droptitle, {marginRight: 183}]}>
                          Modal Year
                        </Text>
                        <Text style={styles.droptext}>{car.ModalYear}</Text>
                      </View>
                      <View style={styles.container}>
                        <Text style={styles.droptitle}>Class</Text>
                        <Text style={styles.droptext}>{car.Class}</Text>
                      </View>
                      <View style={styles.container}>
                        <Text style={styles.droptitle}>Capacity</Text>
                        <Text style={styles.droptext}>
                          {car.Capacity} Seater
                        </Text>
                      </View>
                      <View style={styles.container}>
                        <Text style={styles.droptitle}>Transmission</Text>
                        <Text style={styles.droptext}>{car.GearType}</Text>
                      </View>
                      <View style={styles.container}>
                        <Text style={styles.droptitle}>Fuel Type</Text>
                        <Text style={styles.droptext}>{car.FuelType}</Text>
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
                        fontFamily: Fonts.ProductReguler,
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

            <TouchableOpacity onPress={ShowB} activeOpacity={0.7}>
              <View>
                {showB ? (
                  <View style={styles.main}>
                    <View style={styles.container}>
                      <Text
                        style={{
                          color: Colors.White,
                          fontSize: 22,
                          fontFamily: Fonts.ProductReguler,
                        }}>
                        Booking's Extra
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
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 10,
                          justifyContent: 'space-between',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <Image
                            source={driver}
                            style={{
                              height: 20,
                              width: 20,
                              marginVertical: 5,
                              marginHorizontal: 10,
                              tintColor: Colors.Yellow,
                            }}
                          />
                          <Text style={{...styles.droptitle}}>
                            Addional Driver
                          </Text>
                        </View>
                        <Text style={{...styles.droptext}}>
                          {checkD == true ? 'Yes' : 'No'}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <Image
                            source={GPS}
                            style={{
                              height: 20,
                              width: 20,
                              marginVertical: 5,
                              marginHorizontal: 10,
                              tintColor: Colors.Yellow,
                            }}
                          />
                          <Text
                            style={[
                              styles.droptitle,
                              {marginRight: 205, marginTop: 3},
                            ]}>
                            GPS
                          </Text>
                        </View>
                        <Text style={styles.droptext}>
                          {checkG == true ? 'Yes' : 'No'}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <Image
                            source={babySeat}
                            style={{
                              height: 20,
                              width: 20,
                              marginVertical: 5,
                              marginHorizontal: 10,
                              tintColor: Colors.Yellow,
                            }}
                          />
                          <Text style={[styles.droptitle, {marginTop: 3}]}>
                            Baby Seat
                          </Text>
                        </View>
                        <Text style={styles.droptext}>
                          {checkC == true ? 'Yes' : 'No'}
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
                        fontFamily: Fonts.ProductReguler,
                      }}>
                      Booking's Extra
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
              SubText="the total amount of your booking will be paid directly at the
              counter of rental company when you pickup the vehicle."
              btnTitle="OK"
              onPress={ShowPay}
            />

            <TouchableOpacity onPress={ShowP} activeOpacity={0.7}>
              <View>
                {showP ? (
                  <View style={styles.main}>
                    <View style={styles.container}>
                      <Text
                        style={{
                          color: Colors.White,
                          fontSize: 18,
                          fontSize: 22,
                          fontFamily: Fonts.ProductReguler,
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
                      <Text style={styles.subtext}>{Details.TotalDays}</Text>
                    </View>
                    <View style={styles.container}>
                      <Text style={styles.subtitle}>Daily Rate</Text>
                      <Text style={styles.subtext}>₹{Details.RentPerDay}</Text>
                    </View>
                    <View style={styles.container}>
                      <Text style={styles.subtitle}>Vehical</Text>
                      <Text style={styles.subtext}>
                        ₹{Details.RentPerDay * Details.TotalDays}
                      </Text>
                    </View>
                    <View style={styles.container}>
                      <Text style={styles.subtitle}>Booking's Extras</Text>
                      <Text style={styles.subtext}>₹{extra}</Text>
                    </View>
                    <View style={styles.container}>
                      <Text style={styles.subtitle}>Total Amount</Text>
                      <Text
                        style={{
                          marginRight: 10,
                          fontSize: 16,
                          color: Colors.Yellow,
                        }}>
                        ₹{Details.TotalRent}
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
                          Title=" Secure Deposit"
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
                        <Text style={{color: 'gray', fontSize: 12}}>
                          Estabised by rental company in the rental{'\n'}
                          agreement
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
                        fontSize: 18,
                        fontSize: 22,
                        fontFamily: Fonts.ProductReguler,
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
          <View
            style={[
              styles.btn,
              {
                backgroundColor:
                  status == 'PENDING'
                    ? Colors.Blue
                    : status == 'APPROVED'
                    ? Colors.Green
                    : status == 'CANCELED' || 'REJECTED'
                    ? Colors.Red
                    : null,
              },
            ]}>
            <Text style={styles.btntext}>{status}</Text>
          </View>
          {status == 'PENDING' ? (
            <TouchableOpacity
              style={[styles.btn, {backgroundColor: Colors.Red}]}
              onPress={() => setstatus('CANCELED')}>
              <Text style={styles.btntext}>CANCEL</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
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
    color: Colors.White,
    fontSize: 18,
    fontFamily: Fonts.ProductReguler,
  },
  btn: {
    margin: 10,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
