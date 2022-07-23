import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {back, fuel, gear, person, snowflake} from '../../Assets/icons/Index';
import Header from '../../components/Header';
import FastImage from 'react-native-fast-image';
export default function ManageCars({navigation, route}) {
  console.log('route', route.params.items);
  var items = route.params.items;
  var CarDetails = items.val();
  var CarName = CarDetails.CarName;
  var Rent = CarDetails.Rent;
  var Capacity = CarDetails.Capacity;
  var GearType = CarDetails.GearType;
  var FuelType = CarDetails.FuelType;
  var Manufacturer = CarDetails.Manufacturer;
  var ModalYear = CarDetails.ModalYear;
  var Class = CarDetails.Class;
  var Img1 = CarDetails.Img1;
  var Img2 = CarDetails.Img2;
  var Img3 = CarDetails.Img3;

  const Data = [
    {
      image: Img1,
    },
    {
      image: Img2,
    },
    {
      image: Img3,
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
        <Header
          title={Manufacturer + ' ' + CarName}
          Show="true"
          source={back}
          Navigation={() => navigation.goBack()}
        />

        <FlatList
          horizontal
          pagingEnabled
          data={Data}
          renderItem={({item, index}) => (
            <View key={String(index)}>
              <FastImage
                style={{
                  height: 200,
                  width: Dimensions.get('screen').width - 15,
                  marginVertical: 20,
                  marginHorizontal: 8,
                  borderRadius: 10,
                }}
                source={{uri: item.image, priority: 'high'}}
              />
            </View>
          )}
        />
        <View
          style={{
            backgroundColor: '#1F1F1F',
            flexDirection: 'row',
            borderColor: '#F9AA33',
            borderWidth: 1,
            borderRadius: 10,
            marginHorizontal: 10,
            marginBottom: 5,
          }}>
          <Text style={[styles.text, {marginLeft: 20}]}>Rent (Per Day)</Text>
          <Text style={[styles.text, {color: '#F9AA33', marginLeft: 70}]}>
            ₹{Rent}
          </Text>
        </View>
        <View>
          <View style={styles.main}>
            <View style={styles.optionview}>
              <Image style={styles.smallimagef} source={person} />
              <Text style={styles.textf}> {Capacity} </Text>
            </View>
            <View style={styles.optionview}>
              <Image style={styles.smallimagef} source={gear} />
              <Text style={styles.textf}> {GearType} </Text>
            </View>
          </View>
          <View style={styles.main}>
            <View style={styles.optionview}>
              <Image style={styles.smallimagef} source={fuel} />
              <Text style={styles.textf}>{FuelType}</Text>
            </View>
            <View style={styles.optionview}>
              <Image style={styles.smallimagef} source={snowflake} />
              <Text style={styles.textf}> Air Condition </Text>
            </View>
          </View>
        </View>

        <Text style={styles.title}>Details</Text>

        <View style={styles.detail}>
          <View style={styles.subview}>
            <Text style={styles.subtitle}>Manufacturer</Text>
            <Text style={styles.subtext}>{Manufacturer} </Text>
          </View>
          <View style={styles.subview}>
            <Text style={styles.subtitle}>Modal Name</Text>
            <Text style={styles.subtext}>{CarName}</Text>
          </View>
          <View style={styles.subview}>
            <Text style={styles.subtitle}>Modal Year</Text>
            <Text style={styles.subtext}>{ModalYear}</Text>
          </View>
          <View style={styles.subview}>
            <Text style={styles.subtitle}>Class</Text>
            <Text style={styles.subtext}>{Class}</Text>
          </View>
          <View style={styles.subview}>
            <Text style={styles.subtitle}>Capacity</Text>
            <Text style={styles.subtext}>{Capacity} Seater</Text>
          </View>
          <View style={styles.subview}>
            <Text style={styles.subtitle}>Transmission</Text>
            <Text style={styles.subtext}>{GearType}</Text>
          </View>
          <View style={styles.subview}>
            <Text style={styles.subtitle}>Fuel Type</Text>
            <Text style={styles.subtext}>{FuelType}</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  textinput: {
    width: 340,
    padding: 13,
    margin: 8,
    color: 'white',
    marginHorizontal: 10,
    borderWidth: 1,
    backgroundColor: 'rgba(256,256,256,0.3)',
    borderRadius: 20,
    paddingLeft: 45,
  },
  smallimage: {
    height: 23,
    width: 23,
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: '#F9AA33',
    borderRadius: 15,
    width: 120,
    marginVertical: 5,
  },
  btntext: {
    padding: 5,
    textAlign: 'center',
    color: 'white',
    marginVertical: 5,
    fontSize: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
    padding: 10,
  },
  main: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  optionview: {
    flexDirection: 'row',
    backgroundColor: '#1F1F1F',
    width: Dimensions.get('screen').width / 2.2,
    height: 50,
    borderRadius: 10,
    margin: 5,
  },
  smallimagef: {
    height: 35,
    width: 35,
    tintColor: '#F9AA33',
    top: 7,
    marginHorizontal: 15,
  },
  textf: {
    marginTop: 15,
    color: 'white',
  },
  title: {
    color: '#ECECEC',
    fontSize: 22,
    margin: 10,
    marginHorizontal: 20,
  },
  detail: {
    borderColor: '#F9AA33',
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  subtitle: {
    color: '#ECECEC',
    fontSize: 18,
    fontWeight: '400',
  },
  subtext: {
    marginLeft: 10,
    fontSize: 16,
    color: '#ECECEC',
  },
  subview: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
});
