import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Animated,
  BackHandler,
  ToastAndroid,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import Alerts from '../../components/Alerts';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import AnimatedCar from '../../components/AnimatedCars';
import {car, closedeye, eye, lock, mail, users} from '../../Assets/icons/Index';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const SignUpScreen = ({navigation, route}) => {
  const [name, setname] = useState('');
  const [Email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [placeN, setplaceN] = useState('Name');
  const [placeE, setplaceE] = useState('Email');
  const [placeP, setplaceP] = useState('Password');
  const [placeC, setplaceC] = useState('Confirm Password');
  const [color, setcolor] = useState(Colors.lightGray);
  const [secureP, setsecureP] = useState(true);
  const [secureC, setsecureC] = useState(true);
  const [show, setshow] = useState(false);
  const [lodaer, setlodaer] = useState(false);
  const [ModalText, setModalText] = useState('');

  const Spring = useRef(new Animated.Value(300)).current;

  const SecureP = () => {
    setsecureP(!secureP);
  };

  const SecureC = () => {
    setsecureC(!secureC);
  };

  const Show = () => {
    setshow(!show);
  };

  const Navi = () => {
    navigation.replace('SignInScreen');
  };

  useEffect(() => {
    Animated.spring(Spring, {
      toValue: 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    //Terminate back Navigation
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  const Auth = () => {
    if (name != '' && Email != '' && password != '' && confirmpassword != '') {
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (Email.match(validRegex)) {
        if (password.length >= 6 && confirmpassword.length >= 6) {
          if (password === confirmpassword) {
            setlodaer(true);
            auth()
              .createUserWithEmailAndPassword(Email.trim(), password) //dynamic password

              .then(() => {
                if (Platform.OS === 'android') {
                  ToastAndroid.show('Sign Up Success!', ToastAndroid.SHORT);
                } else {
                  Toast.show('Sign Up Success!', Toast.SHORT, [
                    'UIAlertController',
                  ]);
                }
                console.log('Email account created & signed in!');

                const user = firebase.auth().currentUser;

                const Reference = firebase
                  .app()
                  .database(
                    'https://rentacar-6cd3f-default-rtdb.firebaseio.com/',
                  )
                  .ref(`Users/${user.uid}`);

                Reference.set({
                  Name: name,
                  Email: Email,
                  UserID: user.uid,
                  Role: 'USER',
                  ProfilePic: 'N/A',
                  Mobile: 'N/A',
                  Age: 'N/A',
                  Gender: 'N/A',
                }).then(navigation.replace('Home'), setlodaer(false));
              })
              .catch(error => {
                setModalText(error);
                setshow(!show);
                // if (error.code === 'auth/email-already-in-use') {
                //   console.log('That email address is already in use!');

                //   setModalText('This Email is already in use');
                //   setshow(!show);
                // }

                // if (error.code === 'auth/invalid-email') {
                //   console.log('That email address is invalid!');
                //   setModalText('This Email is invalid');
                //   setshow(!show);
                // }

                console.error(error);
              });
          } else {
            setModalText('Password and Confirm Password Not Match');
            setshow(!show);
          }
        } else {
          setModalText('Enter Password More then 6 Character');
          setshow(!show);
        }
      } else {
        setModalText('Enter Valid Email Address');
        setshow(!show);
      }
    }
    if (name == '') {
      setplaceN('Enter Name ');
      setcolor(Colors.Red);
    } else if (Email == '') {
      setplaceE('Enter Email ');
      setcolor(Colors.Red);
    } else if (password == '') {
      setplaceP('Enter password ');
      setcolor(Colors.Red);
    } else if (confirmpassword == '') {
      setplaceC('Enter Confirm Password');
      setcolor(Colors.Red);
    } else if (
      name != '' &&
      Email != '' &&
      password != '' &&
      confirmpassword != ''
    ) {
      setplaceE('Enter Email ');
      setplaceP('Enter Password ');
      setplaceN('Enter Name ');
      setplaceC('Enter Confirm Password ');
      setcolor(Colors.Red);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{flex: 1, backgroundColor: '#121212'}}
        contentContainerStyle={{flexGrow: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar backgroundColor="#121212" barStyle={'light-content'} />
          <View style={{flex: 1}}>
            <Text style={styles.title}>Sign Up</Text>
            <View>
              <Image style={styles.image} source={car} />
            </View>
            <AnimatedCar visible={lodaer} />
            <Animated.View style={{transform: [{translateY: Spring}]}}>
              <View style={{marginTop: 20, marginHorizontal: 10}}>
                <View>
                  <Image
                    style={{
                      height: 26,
                      width: 26,
                      position: 'absolute',
                      top: 22,
                      left: 25,
                      tintColor: Colors.White,
                    }}
                    source={users}
                  />
                  <TextInput
                    style={styles.textinput}
                    placeholder={placeN}
                    placeholderTextColor={color}
                    keyboardType="email-address"
                    onChangeText={setname}
                    value={name}
                    autoCapitalize="words"
                  />
                </View>
                <View>
                  <Image
                    style={[
                      styles.smallimage,
                      {
                        position: 'absolute',
                        top: 24,
                        left: 25,
                        tintColor: Colors.White,
                      },
                    ]}
                    source={mail}
                  />
                  <TextInput
                    style={styles.textinput}
                    placeholder={placeE}
                    placeholderTextColor={color}
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    value={Email}
                    autoCapitalize="none"
                  />
                </View>
              </View>
              <View style={{marginHorizontal: 10}}>
                <Image
                  style={[
                    styles.smallimage,
                    {
                      position: 'absolute',
                      top: 21,
                      left: 25,
                      tintColor: Colors.White,
                    },
                  ]}
                  source={lock}
                />
                <TextInput
                  style={[styles.textinput, {paddingRight: 45}]}
                  placeholder={placeP}
                  placeholderTextColor={color}
                  secureTextEntry={secureP}
                  onChangeText={setpassword}
                  value={password}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={{
                    flex: 1,
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    top: 22,
                  }}
                  onPress={SecureP}>
                  <Image
                    style={{
                      flex: 1,
                      marginRight: 25,
                      height: 30,
                      width: 30,
                      tintColor: Colors.White,
                      // position: 'absolute',
                    }}
                    source={secureP ? closedeye : eye}
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={SecureP}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                  tintColor: Colors.White,
                  position: 'absolute',
                  right: 25,
                  bottom: 20,
                }}
                source={secureP ? closedeye : eye}
              />
            </TouchableOpacity> */}
              </View>
              <View style={{marginHorizontal: 10}}>
                <Image
                  style={[
                    styles.smallimage,
                    {
                      position: 'absolute',
                      top: 21,
                      left: 25,
                      tintColor: Colors.White,
                    },
                  ]}
                  source={lock}
                />
                <TextInput
                  style={[styles.textinput, {paddingRight: 50}]}
                  placeholder={placeC}
                  placeholderTextColor={color}
                  secureTextEntry={secureC}
                  onChangeText={setconfirmpassword}
                  value={confirmpassword}
                  autoCapitalize="none"
                />
                {/* <TouchableOpacity onPress={SecureC}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                  tintColor: Colors.White,
                  position: 'absolute',
                  right: 25,
                  bottom: 20,
                }}
                source={secureC ? closedeye : eye}
              />
            </TouchableOpacity> */}
                <TouchableOpacity
                  style={{
                    flex: 1,
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    top: 21,
                  }}
                  onPress={SecureC}>
                  <Image
                    style={{
                      flex: 1,
                      marginRight: 25,
                      height: 30,
                      width: 30,
                      tintColor: Colors.White,
                      // position: 'absolute',
                    }}
                    source={secureC ? closedeye : eye}
                  />
                </TouchableOpacity>
              </View>

              <Alerts
                isVisible={show}
                Title="Warning"
                SubText={ModalText}
                btnTitle="Dismiss"
                onPress={Show}
              />

              <TouchableOpacity onPress={Auth} style={styles.btn}>
                <Text style={styles.btntext}>Signup</Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginBottom: 15,
                }}>
                <Text style={{color: Colors.White}}>
                  Alredy have an account?
                </Text>
                <Pressable onPress={Navi}>
                  <Text style={{color: Colors.Yellow}}> Login</Text>
                </Pressable>
              </View>
            </Animated.View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default SignUpScreen;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    margin: 10,
    fontSize: 36,
    fontFamily: Fonts.ProductItalic,
    color: Colors.White,
    marginVertical: 25,
  },
  image: {
    marginVertical: 20,
    alignSelf: 'center',
    borderRadius: 20,
    height: 170,
    width: 340,
  },
  textinput: {
    padding: 15,
    margin: 8,
    color: Colors.White,
    marginHorizontal: 10,
    fontSize: 20,
    backgroundColor: 'rgba(256,256,256,0.2)',
    borderRadius: 20,
    paddingLeft: 50,
  },
  smallimage: {
    height: 25,
    width: 25,
  },
  btntext: {
    textAlign: 'center',
    padding: 15,
    color: Colors.White,
    fontSize: 20,
  },
  btn: {
    margin: 20,
    marginHorizontal: 20,
    backgroundColor: Colors.Yellow,
    borderRadius: 20,
  },
});
