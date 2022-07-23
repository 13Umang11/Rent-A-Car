import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {search, back} from '../../Assets/icons/Index';
import Header from '../../components/Header';
import moment from 'moment';
import AnimatedCar from '../../components/AnimatedCars';
import database from '@react-native-firebase/database';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import FastImage from 'react-native-fast-image';
const Choose = ({navigation, route}) => {
  const [searchtext, setsearch] = useState('');
  const [filter, setfilter] = useState([]);
  const [Data, setData] = useState([]);
  const [PickUp, setPickUp] = useState(route.params.Pick);
  const [DropOff, setDropOff] = useState(route.params.Drop);
  const [total, settotal] = useState(route.params.total);
  const [FlatListData, setFlatlistData] = useState([]);
  const [loader, setloader] = useState(false);
  var tempdata = [];

  useEffect(() => {
    console.log(route.params.total);
    setfilter(FlatListData);
    setData(FlatListData);
  }, [FlatListData]);

  useEffect(() => {
    setloader(true);
    const CarData = database()
      .ref(`Cars`)
      .once('value')
      .then(data => {
        data.forEach(function (item, index) {
          tempdata.push(item);
          setFlatlistData(tempdata);
          console.log(tempdata);
          setloader(false);
        });
      });
  }, []);

  const Search = text => {
    if (text) {
      const newData = Data.filter(function (item) {
        var SearchCar = item.val().Manufacturer;
        var car = item.val().CarName;
        var Serach = SearchCar + car;
        console.log(Serach.trim());
        const itemData = Serach.trim() ? Serach.toUpperCase() : '';
        const textData = text.trim().toUpperCase();
        return itemData.match(textData); //both are working
        // return itemData.indexOf(textData) >= 0;
      });
      setfilter(newData);
      console.log(filter);
      setsearch(text);
    } else {
      setfilter(Data);
      setsearch(text);
    }
  };

  const RenderItem = ({item, index}) => {
    var carDetails = item.val();

    var Img1 = carDetails.Img1;

    return (
      <View>
        <View>
          <TouchableOpacity onPress={() => Navi({item})} activeOpacity={0.8}>
            <View
              key={String(index)}
              style={{
                marginHorizontal: 15,
                marginVertical: 5,
                borderColor: Colors.Yellow,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
              }}>
              <Text
                style={{
                  color: Colors.White,
                  textAlign: 'left',
                  fontSize: 22,
                  marginHorizontal: 2,
                  fontFamily: Fonts.ProductBold,
                }}>
                {carDetails.Manufacturer + ' ' + carDetails.CarName}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <FastImage
                  style={{
                    width: 190,
                    height: 100,
                    borderRadius: 10,
                    marginTop: 5,
                  }}
                  source={{uri: Img1, priority: 'high'}}
                />
                <View>
                  <Text
                    style={{
                      marginHorizontal: 10,
                      color: Colors.White,
                      textAlign: 'left',
                      fontSize: 14,
                    }}>
                    PICK-UP: {moment(PickUp).format('D MMM')}
                  </Text>
                  <Text
                    style={{
                      marginHorizontal: 10,
                      color: Colors.White,
                      textAlign: 'left',
                      fontSize: 14,
                    }}>
                    DROP-OFF: {moment(DropOff).format('D MMM')}
                  </Text>
                  <Text
                    style={{
                      marginHorizontal: 10,
                      color: 'grey',
                      textAlign: 'left',
                      fontSize: 14,
                    }}>
                    {carDetails.Capacity} Seater
                  </Text>
                  <Text
                    style={{
                      marginHorizontal: 10,
                      color: 'grey',
                      textAlign: 'left',
                      fontSize: 14,
                    }}>
                    ₹{carDetails.Rent} Per Day
                  </Text>
                  {/* ₹ for this press ALt + Ctrl + 4  */}
                  <Text
                    style={{
                      margin: 5,
                      marginHorizontal: 10,
                      color: Colors.White,
                      textAlign: 'left',
                      fontSize: 16,
                    }}>
                    ₹{carDetails.Rent * `${total}`}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const Navi = ({item}) => {
    navigation.navigate('Cars', {
      PickUp: PickUp,
      DropOff: DropOff,
      total: total,
      item: item,
    });
  };
  return (
    <View style={{backgroundColor: '#121212', flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
        <Header
          title="Choose Your Car"
          Show="true"
          source={back}
          Navigation={() => navigation.goBack()}
        />
        <AnimatedCar visible={loader} />
        <View>
          <Image
            style={[
              styles.smallimage,
              {
                position: 'absolute',
                top: 28,
                left: 30,
                tintColor: Colors.White,
              },
            ]}
            source={search}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Serach Here"
            placeholderTextColor="#c2bcbc"
            onChangeText={text => {
              Search(text);
            }}
            value={searchtext}
          />
        </View>

        <Text style={styles.text}>Available Cars</Text>

        <FlatList
          data={filter}
          renderItem={RenderItem}
          scrollEnabled={filter.length == 0 ? false : true}
          keyboardShouldPersistTaps="always"
          ListEmptyComponent={
            <View
              style={{
                height: Dimensions.get('screen').height / 1.5,
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
        />
      </SafeAreaView>
    </View>
  );
};
export default Choose;

const styles = StyleSheet.create({
  textinput: {
    fontSize: 20,
    padding: 15,
    marginTop: 10,
    color: Colors.White,
    marginHorizontal: 15,
    borderWidth: 1,
    backgroundColor: 'rgba(256,256,256,0.3)',
    borderRadius: 20,
    paddingLeft: 45,
  },
  smallimage: {
    height: 23,
    width: 23,
  },
  text: {
    color: Colors.White,
    fontSize: 22,
    textAlign: 'left',
    margin: 10,
    marginTop: 15,
  },
});
