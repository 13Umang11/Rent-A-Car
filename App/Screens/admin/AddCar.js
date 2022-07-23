import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  StatusBar,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {back} from '../../Assets/icons/Index';
import Header from '../../components/Header';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import AnimatedCar from '../../components/AnimatedCars';
import Alerts from '../../components/Alerts';
import database from '@react-native-firebase/database';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Toast from 'react-native-simple-toast';

export default function AddCar({navigation, route}) {
  const [Manu, setManu] = useState('');
  const [car, setcar] = useState('');
  const [modal, setmodal] = useState('');
  const [Class, setClass] = useState('');
  const [Capacity, setCapacity] = useState('');
  const [key, setkey] = useState('');
  const [rent, setrent] = useState('');
  const [image1, setimage1] = useState('');
  const [image2, setimage2] = useState('');
  const [image3, setimage3] = useState('');
  const [lodaer, setlodaer] = useState(false);
  const [show, setshow] = useState(false);
  const [detail, setdetail] = useState('');

  //Fuel
  const fuels = ['Petrol', 'Diesal', 'CNG'];
  const [fuel, setfuel] = useState('');
  const Fuel = item => {
    setfuel(item);
  };
  //type gear
  const Type = ['Manual', 'Auto'];
  const [type, settype] = useState('');

  //for modal
  const Show = () => {
    setshow(!show);
  };

  //for Image Crop
  const Image1 = () => {
    ImagePicker.openPicker({
      width: 440,
      height: 250,
      cropping: true,
      cropperActiveWidgetColor: 'grey',
      cropperStatusBarColor: 'black',
    }).then(image => {
      if (Platform.OS === 'android') {
        ToastAndroid.show('First car image Selected...', ToastAndroid.SHORT);
      } else {
        Toast.show('First car image Selected...', Toast.SHORT, [
          'UIAlertController',
        ]);
      }
      setimage1(image.path);
      console.log(image.path);
    });
  };
  const Image2 = () => {
    ImagePicker.openPicker({
      width: 440,
      height: 250,
      cropping: true,
      cropperActiveWidgetColor: 'grey',
      cropperStatusBarColor: 'black',
    }).then(image => {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Second Car image Selected...', ToastAndroid.SHORT);
      } else {
        Toast.show('Second Car image Selected...', Toast.SHORT, [
          'UIAlertController',
        ]);
      }
      setimage2(image.path);
    });
  };
  const Image3 = () => {
    ImagePicker.openPicker({
      width: 440,
      height: 250,
      cropping: true,
      cropperActiveWidgetColor: 'yellow',
      cropperStatusBarColor: 'black',
    }).then(image => {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Third car image Selected...', ToastAndroid.SHORT);
      } else {
        Toast.show('Third car image Selected...', Toast.SHORT, [
          'UIAlertController',
        ]);
      }

      setimage3(image.path);
    });
  };

  const ADDCar = () => {
    if (
      Manu &&
      car &&
      modal &&
      rent &&
      Class &&
      Capacity &&
      fuel &&
      image1 &&
      image2 &&
      image3 &&
      type != ''
    ) {
      setlodaer(true);
      const Car = database().ref(`Cars`).push();
      setkey(Car.key);
      const Image1 = storage().ref(`Cars/${Car.key}/${Car.key}_1`);
      const Image2 = storage().ref(`Cars/${Car.key}/${Car.key}_2`);
      const Image3 = storage().ref(`Cars/${Car.key}/${Car.key}_3`);

      const Store1 = Image1.putFile(`${image1}`);
      const Store2 = Image2.putFile(`${image2}`);
      const Store3 = Image3.putFile(`${image3}`);

      Store1.then(async () => {
        const url1 = await Image1.getDownloadURL();
        Store2.then(async () => {
          const url2 = await Image2.getDownloadURL();
          Store3.then(async () => {
            const url3 = await Image3.getDownloadURL();
            const Booking = database()
              .ref(`Cars/${Car.key}`)
              .update({
                Capacity: Capacity,
                CarID: Car.key,
                CarName: car,
                Class: Class,
                FuelType: fuel,
                Img1: url1,
                Img2: url2,
                Img3: url3,
                GearType: type,
                Manufacturer: Manu,
                ModalYear: modal,
                Rent: rent,
              })
              .then(
                () => console.log('Image_3 Uploaded...'),
                setlodaer(false),
                navigation.navigate('Adminpanel'),
              );
          });
        });
      });
    } else if (Manu == '') {
      setdetail('Manufacturer');
      setshow(!show);
    } else if (modal == '') {
      setdetail('ModalYear');
      setshow(!show);
    } else if (rent == '') {
      setdetail('Rent');
      setshow(!show);
    } else if (car == '') {
      setdetail('Car Name');
      setshow(!show);
    } else if (Class == '') {
      setdetail('Class');
      setshow(!show);
    } else if (Capacity == '') {
      setdetail('Capacity');
      setshow(!show);
    } else if (fuel == '') {
      setdetail('Fuel Type');
      setshow(!show);
    } else if (image1 == '') {
      setdetail('Front Image');
      setshow(!show);
    } else if (image2 == '') {
      setdetail('Side Image');
      setshow(!show);
    } else if (image3 == '') {
      setdetail('Backside Image');
      setshow(!show);
    } else if (type == '') {
      setdetail('Gear Type');
      setshow(!show);
    } else {
      setdetail('All Detail');
      setshow(!show);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={{flex: 1, backgroundColor: '#121212'}}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
          <StatusBar
            animated={true}
            backgroundColor="black"
            barStyle={'light-content'}
          />

          <Header
            title="Add New Car"
            Show="true"
            source={back}
            Navigation={() => navigation.goBack()}
          />
          {/* this for custom loader & Alert Box */}
          <AnimatedCar visible={lodaer} />

          <Alerts
            isVisible={show}
            Title="Warning"
            SubText={'Enter ' + detail}
            btnTitle="Ok"
            onPress={Show}
          />

          {/* this of custom loader and alert box */}
          <ScrollView
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{flexGrow: 1}}>
            <View>
              <Text style={[styles.text, {marginTop: 20}]}>Manufacturer</Text>
              <TextInput
                style={styles.textinput}
                placeholder="Manufacturer"
                placeholderTextColor="#CBCAD2"
                editable={true}
                onChangeText={setManu}
                value={Manu}
              />
              <Text style={styles.text}>Car Name</Text>
              <TextInput
                style={styles.textinput}
                placeholder="Car Name"
                placeholderTextColor="#CBCAD2"
                onChangeText={setcar}
                value={car}
              />
              <Text style={styles.text}>Modal Year</Text>
              <TextInput
                style={styles.textinput}
                placeholder="Modal Year"
                placeholderTextColor="#CBCAD2"
                keyboardType="number-pad"
                maxLength={4}
                onChangeText={setmodal}
                value={modal}
              />
              <Text style={styles.text}>Class</Text>
              <TextInput
                style={styles.textinput}
                placeholder="Class"
                placeholderTextColor="#CBCAD2"
                onChangeText={setClass}
                value={Class}
              />
              <Text style={styles.text}>Capacity</Text>
              <TextInput
                style={styles.textinput}
                placeholder="Capacity"
                placeholderTextColor="#CBCAD2"
                keyboardType="number-pad"
                maxLength={1}
                onChangeText={setCapacity}
                value={Capacity}
              />
              <Text style={styles.text}>Rent (Per Day)</Text>
              <TextInput
                style={styles.textinput}
                placeholder="Rent"
                keyboardType="number-pad"
                placeholderTextColor="#CBCAD2"
                maxLength={4}
                onChangeText={setrent}
                value={rent}
              />
            </View>
            <Text style={styles.text}>Fuel Type</Text>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 15,
                marginVertical: 10,
              }}>
              {fuels.map((item, index) => {
                return (
                  <View key={String(index)} style={{flexDirection: 'row'}}>
                    <View>
                      {item == 'Petrol' && (
                        <TouchableOpacity
                          onPress={() => {
                            Fuel(item);
                          }}
                          style={[
                            styles.radio,
                            {
                              width: Dimensions.get('screen').width / 3.5,
                              backgroundColor:
                                fuel == item ? Colors.Yellow : '#373737',
                            },
                          ]}>
                          <View>
                            <Text
                              style={[
                                styles.radiotext,
                                {
                                  color: fuel == item ? 'black' : Colors.White,
                                },
                              ]}>
                              {item}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                      {item == 'Diesal' && (
                        <TouchableOpacity
                          style={[
                            styles.radio,
                            {
                              width: Dimensions.get('screen').width / 3.5,
                              backgroundColor:
                                fuel == item ? Colors.Yellow : '#373737',
                            },
                          ]}
                          onPress={() => {
                            Fuel(item);
                          }}>
                          <View>
                            <Text
                              style={[
                                styles.radiotext,
                                {
                                  color: fuel == item ? 'black' : Colors.White,
                                },
                              ]}>
                              {item}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                      {item == 'CNG' && (
                        <TouchableOpacity
                          style={[
                            styles.radio,
                            {
                              width: Dimensions.get('screen').width / 3.5,

                              backgroundColor:
                                fuel == item ? Colors.Yellow : '#373737',
                            },
                          ]}
                          onPress={() => {
                            Fuel(item);
                          }}>
                          <View>
                            <Text
                              style={[
                                styles.radiotext,
                                {
                                  color: fuel == item ? 'black' : Colors.White,
                                },
                              ]}>
                              {item}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
            <Text style={styles.text}>Gear Type</Text>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 15,
                marginVertical: 10,
              }}>
              {Type.map((item, index) => {
                return (
                  <View key={String(index)} style={{flexDirection: 'row'}}>
                    {item == 'Manual' && (
                      <TouchableOpacity
                        style={[
                          styles.radio,
                          {
                            width: Dimensions.get('screen').width / 2.28,
                            backgroundColor:
                              item == type ? Colors.Yellow : '#373737',
                          },
                        ]}
                        onPress={() => settype(item)}>
                        <Text
                          style={[
                            styles.radiotext,
                            {color: type == item ? 'black' : Colors.White},
                          ]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    )}
                    {item == 'Auto' && (
                      <TouchableOpacity
                        style={[
                          styles.radio,
                          {
                            backgroundColor:
                              item == type ? Colors.Yellow : '#373737',
                            width: Dimensions.get('screen').width / 2.28,
                          },
                        ]}
                        onPress={() => settype(item)}>
                        <View>
                          <Text
                            style={[
                              styles.radiotext,
                              {
                                color: type == item ? 'black' : Colors.White,
                              },
                            ]}>
                            {item}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </View>
            <Text style={styles.text}>Upload Images</Text>
            <View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.subtext}>
                  {image1 ? 'Image_1' : 'No Image Selected'}
                </Text>
                <TouchableOpacity onPress={Image1} style={styles.btn}>
                  <Text style={styles.btntext}>
                    {image1 ? 'Selected' : 'Select'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.subtext}>
                  {image2 ? 'Image_2' : 'No Image Selected'}
                </Text>
                <TouchableOpacity onPress={Image2} style={styles.btn}>
                  <Text style={styles.btntext}>
                    {image2 ? 'Selected' : 'Select'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.subtext}>
                  {image3 ? 'Image_3' : 'No Image Selected'}
                </Text>
                <TouchableOpacity onPress={Image3} style={styles.btn}>
                  <Text style={styles.btntext}>
                    {image3 ? 'Selected' : 'Select'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.mainbtn} onPress={ADDCar}>
              <Text style={styles.maintext}>Add Car</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.White,
    marginHorizontal: 18,
    fontSize: 18,
  },
  textinput: {
    // width: 330,
    padding: 13,
    margin: 8,
    color: Colors.White,
    marginHorizontal: 10,
    borderWidth: 1,
    backgroundColor: 'rgba(256,256,256,0.3)',
    borderRadius: 15,
    marginHorizontal: 15,
    fontSize: 18,
  },
  radio: {
    backgroundColor: '#373737',
    marginHorizontal: 5,
    borderRadius: 15,
  },
  radiotext: {
    textAlign: 'center',
    padding: 17,
    color: Colors.White,
  },
  btn: {
    backgroundColor: Colors.Yellow,
    borderRadius: 20,
    width: 100,
    marginRight: 30,
    marginVertical: 3,
  },
  btntext: {
    textAlign: 'center',
    color: Colors.White,
    marginVertical: 5,
  },
  subtext: {
    marginHorizontal: 45,
    marginVertical: 5,
    color: Colors.White,
  },
  mainbtn: {
    backgroundColor: Colors.Yellow,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  maintext: {
    padding: 7,
    textAlign: 'center',
    color: Colors.White,
    marginVertical: 5,
    fontSize: 20,
  },
});
