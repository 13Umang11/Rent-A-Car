import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {back, search} from '../../Assets/icons/Index';
import database from '@react-native-firebase/database';
import Header from '../../components/Header';
import AnimatedCar from '../../components/AnimatedCars';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import FastImage from 'react-native-fast-image';
export default function ManageCars({navigation}) {
  const [searchtext, setsearch] = useState('');
  const [filter, setfilter] = useState([]);
  const [Data, setData] = useState([]);
  const [loader, setloader] = useState(false);
  const [flatlistData, setflatlistData] = useState([]);

  useEffect(() => {
    setloader(true);
    const Data = database()
      .ref(`Cars`)
      .on('value', snapshot => {
        var tempdata = [];
        snapshot.forEach(function (item, index) {
          tempdata.push(item);
        });
        setflatlistData(tempdata);
        setloader(false);
      });
  }, []);

  useEffect(() => {
    setfilter(flatlistData);
    setData(flatlistData);
  }, [flatlistData]);

  const Search = text => {
    if (text) {
      const newData = Data.filter(function (item) {
        var SearchCar = item.val().Manufacturer;
        var car = item.val().CarName;
        var Serach = SearchCar + car;
        console.log(Serach);
        const itemData = Serach ? Serach.trim().toUpperCase() : '';
        const textData = text.trim().toUpperCase();
        return itemData.match(textData); //both are working
        // return itemData.indexOf(textData) >= 0;
      });
      setfilter(newData);
      console.log('filter', filter);
      setsearch(text);
    } else {
      setfilter(Data);
      setsearch(text);
    }
  };

  const RenderItem = ({item, index}) => {
    var Car = item.val();

    return (
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
            fontWeight: 'bold',
          }}>
          {Car.Manufacturer + ' ' + Car.CarName}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <FastImage
            style={{
              width: 180,
              height: 105,
              borderRadius: 10,
              marginTop: 5,
            }}
            source={{uri: Car.Img1, priority: 'high'}}
          />
          <View style={{marginHorizontal: 10, flex: 1}}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate('CarView', {items: item})}>
              <Text style={styles.btntext}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate('Edit Car', {items: item})}>
              <Text style={styles.btntext}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{backgroundColor: '#121212', flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
        <StatusBar barStyle={'light-content'} />
        <Header
          title="Manage Cars"
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
                top: 23,
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
}

const styles = StyleSheet.create({
  textinput: {
    fontSize: 20,
    padding: 10,
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
  btn: {
    backgroundColor: Colors.Yellow,
    borderRadius: 15,
    // width: Dimensions.get('screen').width / 2.4,
    marginVertical: 5,
  },
  btntext: {
    padding: 5,
    textAlign: 'center',
    color: Colors.White,
    marginVertical: 5,
    fontSize: 20,
    fontFamily: Fonts.ProductReguler,
  },
});
