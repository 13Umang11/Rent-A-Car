import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  ToastAndroid,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {
  camera,
  edit,
  female,
  gallery,
  male,
  back,
  User,
} from '../../Assets/icons/Index';
import Header from '../../components/Header';
import storage from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/database';
import ImagePicker from 'react-native-image-crop-picker';
import AnimatedCar from '../../components/AnimatedCars';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Toast from 'react-native-simple-toast';

const {height} = Dimensions.get('screen');

export default function EditScreen({navigation, route}) {
  const RadioProps = ['Male', 'Female'];
  // const [check, setcheck] = useState(false);

  const [name, setname] = useState(route.params.user.name);
  const [email, setemail] = useState(route.params.email);
  const [Contact, setContact] = useState(route.params.user.contact);
  const [color, setcolor] = useState();
  const [Age, setAge] = useState(route.params.user.age);
  const [gender, setgender] = useState(route.params.user.gender);
  const [Profile, setProfile] = useState(false);
  const [url, seturl] = useState(route.params.user.image);
  const [loader, setloader] = useState(false);
  const [image, setimage] = useState(route.params.user.image);

  useEffect(() => {
    if (image == 'N/A') {
      console.log(image);
      setcolor(Colors.Yellow);
    } else {
      setProfile(true);
      setcolor();
    }
  }, [image]);

  const Show = () => {
    SheetManager.show('profile');
  };
  const Hide = () => {
    SheetManager.hideAll();
  };

  const Radio = item => {
    setgender(item);
  };

  const Imagec = () => {
    console.log('jdbvjzbsdjkzbjkvzkjdfv');
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    })
      .then(image => {
        if (Platform.OS === 'android') {
          ToastAndroid.show(
            'Profile Pic Updated In Edit Screen!',
            ToastAndroid.SHORT,
          );
        } else {
          Toast.show('Profile Pic Updated In Edit Screen!', Toast.SHORT, [
            'UIAlertController',
          ]);
        }

        setimage(image.path);
        setProfile(true);

        SheetManager.hideAll();
      })
      .catch(e => console.log(e));
  };

  const Camera = () => {
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true,
      // includeBase64:true, //for enncode in base 64
    }).then(image => {
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'Profile Pic Updated In Edit Screen!',
          ToastAndroid.SHORT,
        );
      } else {
        Toast.show('Profile Pic Updated In Edit Screen!', Toast.SHORT, [
          'UIAlertController',
        ]);
      }
      setimage(image.path);
      setProfile(true);
      SheetManager.hideAll();
    });
  };

  const Navigation = () => {
    if (url != image) {
      if (Contact.length == 10) {
        setloader(true);

        const user = firebase.auth().currentUser;

        const reference = storage().ref(`Profiles/${user.uid}`);
        const store1 = reference.putFile(image);
        store1.then(async data => {
          console.log('Images uploaded to the bucket!', data);

          const url = await reference.getDownloadURL();
          seturl(url);

          const Reference = firebase
            .app()
            .database('https://rentacar-6cd3f-default-rtdb.firebaseio.com/')
            .ref(`Users/${user.uid}`);
          Reference.update({
            ProfilePic: url,
            Mobile: Contact,
            Age: Age,
            Gender: gender,
          }).then(
            val => console.log('Data User Info Set.....', val),
            console.log('url', url),
            setloader(false),
          );
          if (Platform.OS === 'android') {
            ToastAndroid.show('Profile  Updated!', ToastAndroid.SHORT);
          } else {
            Toast.show('Profile  Updated!', Toast.SHORT, ['UIAlertController']);
          }

          navigation.navigate('Profile');
        });
      } else {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Enter Valid Mobile No', ToastAndroid.SHORT);
        } else {
          Toast.show('Profile  Updated!', Toast.SHORT, ['UIAlertController']);
        }
      }
    } else {
      setloader(true);

      const user = firebase.auth().currentUser;
      const Reference = firebase
        .app()
        .database('https://rentacar-6cd3f-default-rtdb.firebaseio.com/')
        .ref(`Users/${user.uid}`);
      Reference.update({
        ProfilePic: url,
        Mobile: Contact,
        Age: Age,
        Gender: gender,
      }).then(
        val => console.log('Data User Info Set.....', val),
        setloader(false),
      );
      if (Platform.OS === 'android') {
        ToastAndroid.show('Profile  Updated!', ToastAndroid.SHORT);
      } else {
        Toast.show('Profile  Updated!', Toast.SHORT, ['UIAlertController']);
      }
      navigation.navigate('Profile');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={{flex: 1, backgroundColor: '#121212'}}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
          <Header
            title="Edit"
            Show="true"
            source={back}
            Navigation={() => navigation.goBack()}
          />
          <AnimatedCar visible={loader} />
          <StatusBar backgroundColor="#121212" />
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="always">
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: Colors.Gray,
                height: height / 2.7,
              }}>
              <View>
                {console.log(image)}
                <View style={{...styles.imageview, marginTop: 30}}>
                  {console.log(image)}
                  <Image
                    source={image ? {uri: image} : User}
                    style={{
                      ...styles.image,
                      tintColor: color,
                    }}
                  />
                  {/* <Image
                  source={Profile ? {uri: image} : User}
                  style={[styles.image, {tintColor: color}]}
                /> */}
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      alignSelf: 'flex-end',
                      top: 90,
                    }}
                    activeOpacity={0.5}
                    onPress={Show}>
                    <Image
                      style={{
                        height: 30,
                        width: 30,
                        // bottom: 25,
                        // left: Dimensions.get('screen').width / 1.7,
                        borderRadius: 100, //this hide the background color
                        backgroundColor: Colors.White,
                        tintColor: Colors.Yellow,
                        overflow: 'hidden',
                      }}
                      source={edit}
                    />
                  </TouchableOpacity>
                </View>

                <ActionSheet
                  id="profile"
                  extraScroll={1}
                  containerStyle={{
                    height: 200,
                    borderRadius: 25,
                    backgroundColor: 'rgba(15, 15, 15,1)',
                  }}
                  delayActionSheetDraw={true}
                  delayActionSheetDrawTime={100}
                  animated={true}
                  bounceOnOpen={true}
                  defaultOverlayOpacity={0.7}
                  bounciness={10}
                  overlayColor="rgba(15, 15, 15,1)"
                  keyboardShouldPersistTaps="always"
                  keyboardDismissMode="on-drag">
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      }}>
                      <TouchableOpacity onPress={Camera}>
                        <View>
                          <Image style={styles.actionimage} source={camera} />
                          <Text style={styles.actiontext}>
                            Pick From Camera
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={Imagec}>
                        <View>
                          <Image style={styles.actionimage} source={gallery} />
                          <Text style={styles.actiontext}>
                            Pick From Gallery
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={Hide} style={styles.btn}>
                      <Text style={styles.btntext}>Cancal</Text>
                    </TouchableOpacity>
                  </View>
                </ActionSheet>
              </View>

              <Text
                style={[
                  styles.text,
                  {
                    color: Colors.Gray,
                    marginTop: 30,
                    fontWeight: '300',
                    fontFamily: Fonts.ProductBold,
                    fontSize: 17,
                  },
                ]}>
                Hello
              </Text>
              <Text
                style={[
                  styles.text,
                  {
                    fontFamily: Fonts.ProductBold,
                    color: Colors.White,
                    fontSize: 26,
                    margin: 5,
                    height: 30,
                  },
                ]}>
                {name}
              </Text>
            </View>
            <View style={{marginTop: 15}}>
              <TextInput
                style={[
                  styles.textinput,
                  {
                    color: Colors.White,
                    fontSize: 20,
                    fontFamily: Fonts.ProductItalic,
                  },
                ]}
                editable={false}>
                {email}
              </TextInput>
              <TextInput
                style={[
                  styles.textinput,
                  {
                    color: Colors.White,
                    fontSize: 20,
                  },
                ]}
                maxLength={10}
                placeholder="Contact No."
                placeholderTextColor="white"
                keyboardType="phone-pad"
                defaultValue="N/A"
                onChangeText={setContact}
                value={Contact}></TextInput>

              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 20,
                  marginVertical: 5,
                }}>
                {RadioProps.map((item, index) => {
                  return (
                    <View key={String(index)} style={{flexDirection: 'row'}}>
                      <View>
                        {item == 'Male' ? (
                          <TouchableOpacity
                            style={[
                              styles.radio,
                              {
                                backgroundColor:
                                  gender == item ? Colors.Yellow : '#373737',
                                flexDirection: 'row',
                              },
                            ]}
                            onPress={() => {
                              Radio(item);
                            }}>
                            <View>
                              <View style={{flexDirection: 'row'}}>
                                <Image
                                  style={[
                                    styles.gender,
                                    {
                                      tintColor:
                                        gender == item ? 'black' : Colors.White,
                                    },
                                  ]}
                                  source={male}
                                />
                                <Text
                                  style={[
                                    styles.radiotext,
                                    {
                                      marginLeft: 25,
                                      color:
                                        gender == item ? 'black' : Colors.White,
                                    },
                                  ]}>
                                  {item}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={[
                              styles.radio,
                              {
                                backgroundColor:
                                  gender == item ? Colors.Yellow : '#373737',
                                flexDirection: 'row',
                              },
                            ]}
                            onPress={() => {
                              Radio(item);
                            }}>
                            <View>
                              <View style={{flexDirection: 'row'}}>
                                <Image
                                  style={[
                                    styles.gender,
                                    {
                                      tintColor:
                                        gender == item ? 'black' : Colors.White,
                                    },
                                  ]}
                                  source={female}
                                />
                                <Text
                                  style={[
                                    styles.radiotext,
                                    {
                                      marginLeft: 20,
                                      color:
                                        gender == item ? 'black' : Colors.White,
                                    },
                                  ]}>
                                  {item}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>

              <TextInput
                style={[
                  styles.textinput,
                  {
                    color: Colors.White,
                    fontSize: 20,
                  },
                ]}
                maxLength={3}
                placeholder="Age"
                placeholderTextColor="white"
                keyboardType="number-pad"
                defaultValue="N/A"
                onChangeText={setAge}
                value={Age}></TextInput>
            </View>
            <TouchableOpacity
              onPress={() => {
                Navigation();
              }}
              style={styles.btn}>
              <Text style={styles.btntext}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 130,
    width: 130,
    borderRadius: 100,
    backgroundColor: '#1F1F1F',
  },
  smallimage: {
    height: 30,
    width: 30,
    tintColor: Colors.White,
    position: 'absolute',
    top: 110,
    left: 225,
  },
  text: {
    alignSelf: 'center',
  },
  textinput: {
    borderWidth: 1,
    backgroundColor: '#373737',
    borderRadius: 20,
    padding: 14,
    paddingHorizontal: 15,
    color: Colors.White,
    width: '90%',
    marginHorizontal: 20,
    margin: 5,
  },
  btntext: {
    textAlign: 'center',
    padding: 16,
    color: Colors.White,
    fontSize: 20,
  },
  btn: {
    margin: 10,
    backgroundColor: Colors.Yellow,
    width: '88%',
    alignSelf: 'center',
    borderRadius: 20,
  },
  imageview: {
    marginVertical: 10,
    borderRadius: 100,
    borderColor: Colors.Yellow,
    borderWidth: 1,
    padding: 5,
    alignSelf: 'center',
  },
  gender: {
    width: 30,
    height: 30,
    top: 10,
    left: 25,
    tintColor: Colors.White,
  },
  radio: {
    backgroundColor: '#373737',
    marginHorizontal: 5,
    borderRadius: 20,
    width: Dimensions.get('screen').width / 2.35,
  },
  radiotext: {
    padding: 18,
    color: Colors.White,
    fontSize: 17,
  },
  actionimage: {
    height: 80,
    width: 80,
    tintColor: Colors.White,
    marginTop: 15,
    alignSelf: 'center',
  },
  actiontext: {
    color: Colors.White,
    marginTop: 8,
    alignSelf: 'center',
  },
});
