import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Animated,
  useWindowDimensions,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {
  person,
  gear,
  fuel,
  snowflake,
  GPS,
  babySeat,
  driver,
  information,
  tick,
  back,
} from '../../Assets/icons/Index';

import Colors from '../../constants/Colors';
import Header from '../../components/Header';
import Modals from '../../components/Modals';
import Fonts from '../../constants/Fonts';
import FastImage from 'react-native-fast-image';

export default function Cars({navigation, route, act}) {
  const [checkD, setcheckD] = useState(false);
  const [checkG, setcheckG] = useState(false);
  const [checkC, setcheckC] = useState(false);
  const [pay, setpay] = useState(false);
  const [depo, setdepo] = useState(false);
  const [total, settotal] = useState(route.params.total);
  const [PickUp, setPickUp] = useState(route.params.PickUp);
  const [DropOff, setDropOff] = useState(route.params.DropOff);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [extra, setextra] = useState(0);
  const [driveC, setdriveC] = useState(0);
  const [gpsC, setgpsC] = useState(0);
  const [childset, setchildset] = useState(0);
  const [currentIndex, setcurrentIndex] = useState(0);
  const [index, setindex] = useState(0);
  const {width} = useWindowDimensions();

  const scrollX = useRef(new Animated.Value(0)).current;

  var item = route.params.item;
  var Cars = item.val();
  var Carname = Cars.CarName;
  var Capacity = Cars.Capacity;
  var Manufacturer = Cars.Manufacturer;
  var ModalYear = Cars.ModalYear;
  var GearType = Cars.GearType;
  var FuelType = Cars.FuelType;
  var Rent = Cars.Rent;
  var Img1 = Cars.Img1;
  var Img2 = Cars.Img2;
  var Img3 = Cars.Img3;
  var Class = Cars.Class;
  var CarId = Cars.CarID;

  const Data = [
    {
      image: Img1,
      index: 0,
    },
    {
      image: Img2,
      index: 1,
    },
    {
      image: Img3,
      index: 2,
    },
  ];

  const ShowPay = () => {
    setpay(!pay);
  };
  const ShowD = () => {
    setdepo(!depo);
  };
  const CheckD = () => {
    setcheckD(!checkD);
    var ChargeD = !checkD ? 499 * total : 0;
    setdriveC(ChargeD);
  };
  const CheckG = () => {
    setcheckG(!checkG);
    var ChargeG = !checkG ? 299 * total : 0;
    setgpsC(ChargeG);
  };
  const CheckC = () => {
    setcheckC(!checkC);
    var ChargeC = !checkC ? 99 * total : 0;
    setchildset(ChargeC);
  };

  useEffect(() => {
    var Extra = driveC + gpsC + childset;
    setextra(Extra);
    var Total = Rent * total + (driveC + gpsC + childset);
    setTotalPrice(Total);
  }, [driveC, gpsC, childset]);

  const RenderItems = ({item, index}) => {
    return (
      <View key={String(index)}>
        <FastImage
          style={{
            height: 200,
            width: Dimensions.get('screen').width - 20,
            marginTop: 30,
            marginHorizontal: 10,
            borderRadius: 10,
          }}
          source={{uri: item.image, priority: 'high'}}
        />
      </View>
    );
  };

  const Book_Now = () => {
    navigation.navigate('CheckOut', {
      CarName: Carname,
      extra: extra,
      totalprice: TotalPrice,
      PickUp: PickUp,
      DropOff: DropOff,
      Daily: Rent,
      Driver: checkD,
      childset: checkC,
      GPS: checkG,
      total: total,
      Manufacturer: Manufacturer,
      ModalYear: ModalYear,
      Class: Class,
      Capacity: Capacity,
      GearType: GearType,
      FuelType: FuelType,
      Img1: Img1,
      Img2: Img2,
      Img3: Img3,
      CarId: CarId,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#121212'}}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
        <Header
          title={`${Manufacturer} ${Carname}`}
          Show="true"
          source={back}
          Navigation={() => navigation.goBack()}
        />

        <ScrollView keyboardShouldPersistTaps="always">
          <View>
            <FlatList
              horizontal
              pagingEnabled
              data={Data}
              renderItem={RenderItems}
              bounces={false}
              showsHorizontalScrollIndicator={false}
              initialScrollIndex={0}
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
                const inputRange = [
                  (i - 1) * width,
                  i * width,
                  (i + 1) * width,
                ];

                const dotWidth = scrollX.interpolate({
                  inputRange,
                  outputRange: [10, 20, 10],
                  extrapolate: 'clamp',
                });

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

            <View style={styles.main}>
              <View style={styles.optionview}>
                <Image style={styles.smallimage} source={person} />
                <Text style={styles.text}> {Capacity} </Text>
              </View>
              <View style={styles.optionview}>
                <Image style={styles.smallimage} source={gear} />
                <Text style={styles.text}> {GearType} </Text>
              </View>
            </View>
            <View style={styles.main}>
              <View style={styles.optionview}>
                <Image style={styles.smallimage} source={fuel} />
                <Text style={styles.text}>{FuelType}</Text>
              </View>
              <View style={styles.optionview}>
                <Image style={styles.smallimage} source={snowflake} />
                <Text style={styles.text}> Air Condition </Text>
              </View>
            </View>
          </View>

          <Text style={styles.title}>Details</Text>

          <View style={styles.detail}>
            <View style={styles.subview}>
              <Text style={[styles.subtitle]}>Manufacturer</Text>
              <Text style={[styles.subtext, {marginRight: -5}]}>
                {Manufacturer}
              </Text>
            </View>
            <View style={styles.subview}>
              <Text style={styles.subtitle}>Modal Name</Text>
              <Text style={[styles.subtext, {marginRight: -10}]}>
                {Carname}
              </Text>
            </View>
            <View style={styles.subview}>
              <Text style={styles.subtitle}>Modal Year</Text>
              <Text style={[styles.subtext, {marginRight: -5}]}>
                {ModalYear}
              </Text>
            </View>
            <View style={styles.subview}>
              <Text style={styles.subtitle}>Class</Text>
              <Text style={[styles.subtext, {marginRight: -5}]}>{Class}</Text>
            </View>
          </View>

          <Text style={styles.title}>Booking's Extras</Text>

          <View style={[styles.detail, {padding: 0}]}>
            <TouchableOpacity onPress={CheckD} activeOpacity={0.5}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    borderRadius: 5,
                    height: 18,
                    width: 18,
                    borderWidth: 1,
                    top: 7,
                    left: 13,
                    marginRight: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: Colors.Yellow,
                    backgroundColor: checkD ? '#F9AA33' : 'black',
                  }}>
                  {checkD ? (
                    <Image
                      source={tick}
                      style={{
                        height: 12,
                        width: 12,
                        tintColor: Colors.White,
                        borderRadius: 4,
                        position: 'absolute',
                      }}
                    />
                  ) : (
                    <View />
                  )}
                </View>

                <Image
                  source={driver}
                  style={{
                    height: 20,
                    width: 20,
                    marginVertical: 5,
                    marginHorizontal: 10,
                    tintColor: Colors.White,
                  }}
                />
                <Text
                  style={[styles.subtext, {marginVertical: 5, fontSize: 14}]}>
                  Addional Driver (+ ₹499 Per Day)
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={CheckG} activeOpacity={0.5}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    borderRadius: 5,
                    height: 18,
                    width: 18,
                    borderWidth: 1,
                    top: 7,
                    left: 13,
                    marginRight: 10,
                    borderColor: Colors.Yellow,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: checkG ? Colors.Yellow : 'black',
                  }}>
                  {checkG ? (
                    <Image
                      source={tick}
                      style={{
                        height: 12,
                        width: 12,
                        tintColor: Colors.White,
                        borderRadius: 4,
                        position: 'absolute',
                      }}
                    />
                  ) : (
                    <View />
                  )}
                </View>

                <Image
                  source={GPS}
                  style={{
                    height: 20,
                    width: 20,
                    marginVertical: 5,
                    marginHorizontal: 10,
                    tintColor: Colors.White,
                  }}
                />
                <Text
                  style={[
                    styles.subtext,
                    {
                      marginVertical: 5,
                      fontSize: 14,
                    },
                  ]}>
                  GPS (+ ₹299 Per Day)
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={CheckC} activeOpacity={0.5}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    borderRadius: 5,
                    height: 18,
                    width: 18,
                    borderWidth: 1,
                    top: 7,
                    left: 13,
                    marginRight: 10,
                    borderColor: Colors.Yellow,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: checkC ? Colors.Yellow : 'black',
                  }}>
                  {checkC ? (
                    <Image
                      source={tick}
                      style={{
                        height: 12,
                        width: 12,
                        tintColor: Colors.White,
                        borderRadius: 4,
                        position: 'absolute',
                      }}
                    />
                  ) : (
                    <View />
                  )}
                </View>

                <Image
                  source={babySeat}
                  style={{
                    height: 20,
                    width: 20,
                    marginVertical: 5,
                    marginHorizontal: 10,
                    tintColor: Colors.White,
                  }}
                />
                <Text
                  style={[styles.subtext, {marginVertical: 5, fontSize: 14}]}>
                  Child Car Sheet (+ ₹99 Per Day)
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Payment Details</Text>

          <View style={styles.detail}>
            <View style={styles.container}>
              <Text style={styles.subtitle}>Total Day</Text>
              <Text style={styles.subtext}>{total}</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.subtitle}>Daily Rate</Text>
              <Text style={styles.subtext}>₹{Rent}</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.subtitle}>Vehical</Text>
              <Text style={styles.subtext}>₹{Rent * total}</Text>
            </View>
            <View style={styles.container}>
              <Text style={[styles.subtitle]}>Booking's Extras</Text>
              <Text style={styles.subtext}>₹{driveC + gpsC + childset}</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.subtitle}>Total Amount</Text>
              <Text
                style={{marginRight: 10, fontSize: 16, color: Colors.Yellow}}>
                ₹{TotalPrice}
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
              </TouchableOpacity>
              <Text style={[styles.subtitle, {fontSize: 14, marginTop: 5}]}>
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
              <Text style={[styles.subtitle, {fontSize: 14, marginTop: 5}]}>
                Security Deposit{'\n'}
                <Text style={{color: '#ECECEC', fontSize: 12}}>
                  Estabised by rental company in the rental agreement
                </Text>
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: Colors.Black,
              // width: 340,
              marginHorizontal: 15,
              borderRadius: 10,
              margin: 5,
              padding: 0,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.Yellow,
                fontSize: 22,
                marginRight: 70,
                left: 15,
              }}>
              ₹{TotalPrice}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Book_Now();
              }}
              style={styles.btn}>
              <Text
                style={{
                  color: Colors.White,
                  fontSize: 22,
                  padding: 15,
                  textAlign: 'center',
                }}>
                Book Now
              </Text>
            </TouchableOpacity>
          </View>

          <Modals
            isVisible={pay}
            Title="Pay at the Counter"
            SubText="the total amount of your booking will be paid directly at the
              counter of rental company when you pickup the vehicle."
            btnTitle="OK"
            onPress={ShowPay}
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
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  optionview: {
    flexDirection: 'row',
    backgroundColor: Colors.Black,
    width: Dimensions.get('screen').width / 2.2,
    height: 50,
    borderRadius: 10,
    margin: 5,
  },
  smallimage: {
    height: 35,
    width: 35,
    tintColor: Colors.Yellow,
    top: 7,
    marginHorizontal: 15,
  },

  title: {
    color: '#c2bbba',
    fontSize: 22,
    margin: 10,
    marginHorizontal: 20,
  },
  detail: {
    borderColor: Colors.Yellow,
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  subtitle: {
    color: Colors.lightGray,
    fontSize: 18,
    fontWeight: '400',
  },
  subtext: {
    marginRight: 10,
    fontSize: 16,
    color: Colors.lightGray,
  },
  subview: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  btn: {
    margin: 10,
    // marginLeft: 35,
    backgroundColor: Colors.Yellow,
    width: 160,
    alignSelf: 'flex-end',
    borderRadius: 10,
  },
  dots: {
    margin: 8,
    alignSelf: 'center',
    height: 10,
    width: 10,
    marginVertical: 10,
    borderRadius: 100,
    // backgroundColor: 'white',
  },
  text: {
    alignSelf: 'center',
    color: Colors.White,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 8,
  },
});
