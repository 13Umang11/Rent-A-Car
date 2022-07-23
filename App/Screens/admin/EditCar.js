import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import AnimatedCar from '../../components/AnimatedCars';
import ImagePicker from 'react-native-image-crop-picker';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import {back} from '../../Assets/icons/Index';
import Header from '../../components/Header';
import Alerts from '../../components/Alerts';
import Colors from '../../constants/Colors';

export default function AddCar({navigation, route}) {
  var item = route.params.items;
  var Details = item.val();
  var CarName = Details.CarName;
  const carId = Details.CarID;
  const [Manu, setManu] = useState(Details.Manufacturer);
  const [car, setcar] = useState(Details.CarName);
  const [modal, setmodal] = useState(Details.ModalYear);
  const [Class, setClass] = useState(Details.Class);
  const [Capacity, setCapacity] = useState(Details.Capacity);
  const [rent, setrent] = useState(Details.Rent);
  const [image1, setimage1] = useState('');
  const [image2, setimage2] = useState('');
  const [image3, setimage3] = useState('');
  const [Url1, setUrl1] = useState(Details.Img1);
  const [Url2, setUrl2] = useState(Details.Img2);
  const [Url3, setUrl3] = useState(Details.Img3);
  const [loader, setloader] = useState(false);
  const [show, setshow] = useState(false);
  const [detail, setdetail] = useState('');
  //Fuel
  const fuels = ['Petrol', 'Diesal', 'CNG'];
  const [fuel, setfuel] = useState(Details.FuelType);
  const Fuel = item => {
    setfuel(item);
  };
  //type gear
  const Type = ['Manual', 'Auto'];
  const [type, settype] = useState(Details.GearType);

  const Show = () => {
    setshow(!show);
  };

  //for Image Crop
  const Image1 = () => {
    ImagePicker.openPicker({
      width: 500,
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
      width: 500,
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
      width: 500,
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

  const EditCar = () => {
    console.log('Car editable', carId);

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
      setloader(true);
      const Car = database().ref(`Cars`).push();
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
              .ref(`/Cars/${carId}`)
              .update({
                Capacity: Capacity,
                CarID: carId,
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
                () => console.log(' Uploded...'),
                navigation.navigate('Adminpanel'),
                setloader(false),
              );
          });
        });
      });
    } else if (image1 || image2 || image3 == '') {
      setdetail('Select Car Images');
      setshow(!show);
    } else if (
      Manu ||
      car ||
      modal ||
      rent ||
      Class ||
      Capacity ||
      fuel ||
      type != ''
    ) {
      setdetail('Select Car Details');
      setshow(!show);
    } else {
      setdetail('Fill All Details');
      setshow(!show);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
          <Header
            title={CarName}
            Show="true"
            source={back}
            Navigation={() => navigation.goBack()}
          />
          <AnimatedCar visible={loader} />

          <Alerts
            Title="Fill"
            isVisible={show}
            SubText={detail}
            onPress={Show}
            btnTitle="OK"
          />
          {/* <Modal
        isVisible={show}
        animationIn="fadeIn"
        useNativeDriver
        animationOut="fadeOut"
        animationInTiming={300}
        animationOutTiming={300}
        backdropColor="black"
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        onBackdropPress={Show}
        onBackButtonPress={Show}
        backdropOpacity={0.7}
        swipeDirection={['up', 'down', 'left', 'right']}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 10,
            borderColor: '#F9AA33',
            borderWidth: 1,
            backgroundColor: '#1F1F1F',
            borderRadius: 20,
            elevation: 3,
          }}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 20,
              fontWeight: 'bold',
              color: '#F9AA33',
              marginLeft: 10,
            }}>
            {detail}
          </Text>
          <Text style={{color: 'white', margin: 10, textAlign: 'justify'}}>
            {detail}
          </Text>

          <TouchableOpacity onPress={Show}>
            <Text
              style={{
                color: '#F9AA33',
                left: 220,
                fontSize: 16,
                fontWeight: 'bold',
                padding: 10,
              }}>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
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
              <Text style={styles.text}>modal Year</Text>
              <TextInput
                style={styles.textinput}
                placeholder="modal Year"
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
                                fuel == item ? '#F9AA33' : '#373737',
                            },
                          ]}>
                          <View>
                            <Text
                              style={[
                                styles.radiotext,
                                {
                                  color: fuel == item ? 'black' : 'white',
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
                                fuel == item ? '#F9AA33' : '#373737',
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
                                  color: fuel == item ? 'black' : 'white',
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
                                fuel == item ? '#F9AA33' : '#373737',
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
                                  color: fuel == item ? 'black' : 'white',
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
                              item == type ? '#F9AA33' : '#373737',
                          },
                        ]}
                        onPress={() => settype(item)}>
                        <Text
                          style={[
                            styles.radiotext,
                            {color: type == item ? 'black' : 'white'},
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
                              item == type ? '#F9AA33' : '#373737',
                            width: Dimensions.get('screen').width / 2.28,
                          },
                        ]}
                        onPress={() => settype(item)}>
                        <View>
                          <Text
                            style={[
                              styles.radiotext,
                              {
                                color: type == item ? 'black' : 'white',
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
                  {image1 ? 'Image_2' : 'No Image Selected'}
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
                  {image1 ? 'Image_3' : 'No Image Selected'}
                </Text>
                <TouchableOpacity onPress={Image3} style={styles.btn}>
                  <Text style={styles.btntext}>
                    {image3 ? 'Selected' : 'Select'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.mainbtn} onPress={EditCar}>
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
    color: 'white',
    marginHorizontal: 18,
    fontSize: 18,
  },
  textinput: {
    padding: 13,
    margin: 8,
    color: 'white',
    marginHorizontal: 15,
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
    color: 'white',
  },
  btn: {
    backgroundColor: '#F9AA33',
    borderRadius: 20,
    width: 100,
    marginRight: 30,
    marginVertical: 3,
  },
  btntext: {
    textAlign: 'center',
    color: 'white',
    marginVertical: 5,
  },
  subtext: {
    marginHorizontal: 45,
    marginVertical: 5,
    color: 'white',
  },
  mainbtn: {
    backgroundColor: Colors.Yellow,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  maintext: {
    padding: 5,
    textAlign: 'center',
    color: 'white',
    marginVertical: 5,
    fontSize: 20,
  },
});
