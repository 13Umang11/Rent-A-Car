import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StatusBar,
  Animated,
  TextInput,
  StyleSheet,
  Image,
  BackHandler,
  TouchableOpacity,
  ScrollView,
  Pressable,
  ToastAndroid,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Colors from '../../constants/Colors';
import Alerts from '../../components/Alerts';
import database from '@react-native-firebase/database';
import auth, {firebase} from '@react-native-firebase/auth';
import AnimatedCar from '../../components/AnimatedCars';
import Fonts from '../../constants/Fonts';
import {mail, lock, eye, closedeye, car} from '../../Assets/icons/Index';

const SignInScreen = ({navigation, route}) => {
  const [Email, setEmail] = useState('');
  const [placeE, setplaceE] = useState('Email');
  const [placeP, setplaceP] = useState('Password');
  const [password, setpassword] = useState('');
  const [color, setcolor] = useState(Colors.lightGray);
  const [secure, setsecure] = useState(true);
  const [show, setshow] = useState(false);
  const [title, settitle] = useState('Warning');
  const [loader, setloader] = useState(false);
  const [ModalText, setModalText] = useState('');

  const Spring = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  const refPassword = useRef();

  const Show = () => {
    if (Email != '') {
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (Email.match(validRegex)) {
        auth().sendPasswordResetEmail(Email);
        setModalText(
          'We have sent a password recover instructions to your mail.',
        );
        settitle('Check Your Mail Box!');
        setshow(!show);
      } else {
        setModalText('Please Enter Valid Email Address');
        setshow(!show);
      }
    } else {
      setModalText('Please enter email address linked to your account');
      setshow(!show);
    }
  };
  const Secure = () => {
    console.log('wevwsvs');
    setsecure(!secure);
  };

  const Auth = () => {
    if (Email != '' && password != '') {
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      // try {
      if (Email.match(validRegex)) {
        setloader(true);
        if (password.length >= 6) {
          // auth()
          //   .signInWithEmailAndPassword(Email.trim(), password)
          //   .then(data => {
          //     const Check = database()
          //       .ref(`Users/${data.user.uid}`)
          //       .once('value')
          //       .then(data => {
          //         var Role = data.val().Role;
          //         if (Role == 'ADMIN') {
          //           navigation.replace('Admin');
          //           setloader(false);
          //           ToastAndroid.show('Login Success!', ToastAndroid.SHORT);
          //         } else {
          //           navigation.replace('Home');
          //           setloader(false);
          //           ToastAndroid.show('Login Success!', ToastAndroid.SHORT);
          //         }
          //       });
          //   })
          //   .catch(error => {
          //     setModalText(String(error));
          //     setshow(!show);
          //     setloader(false);
          //   });
          auth()
            .signInWithEmailAndPassword(Email.trim(), password)
            .then(data => {
              const Check = database()
                .ref(`Users/${data.user.uid}`)
                .once('value')
                .then(data => {
                  console.log('data', data);
                  // var Role = data.val().Role;
                  // if (Role == 'ADMIN') {
                  //   navigation.replace('Admin');
                  //   setloader(false);
                  //   ToastAndroid.show('Login Success!', ToastAndroid.SHORT);
                  // } else {
                  //   navigation.replace('Home');
                  //   setloader(false);
                  //   ToastAndroid.show('Login Success!', ToastAndroid.SHORT);
                  // }
                });
            })
            .catch(error => {
              setModalText(String(error));
              setshow(!show);
              // if (error.code === 'auth/wrong-password') {
              //   ToastAndroid.show('Password is invalid!', ToastAndroid.SHORT);
              //   setModalText('Password is invalid!');
              //   setshow(!show);
              //   console.log(
              //     'The password is invalid or the user does not have a password.',
              //   );
              // }
              // if (error.code === 'auth/user-not-found') {
              //   ToastAndroid.show(
              //     'User Not exist! Create an new account',
              //     ToastAndroid.SHORT,
              //   );
              //   setModalText('User Not Found');
              //   setshow(!show);
              //   console.log('User Not Found');
              // }
              // if (error.code === 'auth/invalid-email') {
              //   ToastAndroid.show(
              //     'Write Email In Proper format',
              //     ToastAndroid.SHORT,
              //   );
              //   setModalText('Write Email In Proper format');
              //   setshow(!show);
              //   console.log('Write Email In Proper format');
              // }
              // if (error.code === 'auth/too-many-requests') {
              //   ToastAndroid.show(
              //     'Try Again Later! Too Many Tries',
              //     ToastAndroid.SHORT,
              //   );
              //   setModalText('Too Many tries! Try Again Later');
              //   setshow(!show);
              //   console.log('Too Many tries! Try Again Later');
              // }
              setloader(false);
            });
        } else {
          settitle('Warning');
          setModalText('Enter Password More then 6 Character');
          setshow(!show);
        }
      }
    } else {
      if (Email == '') {
        setplaceE('Enter Email ');
        setcolor(Colors.Red);
      }
      if (password == '') {
        setplaceP('Enter Password ');
        setcolor(Colors.Red);
      }
    }
  };

  useEffect(() => {
    Animated.spring(Spring, {
      toValue: 0,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  }, []);

  const SignUp = () => {
    navigation.replace('SignUpScreen');
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
            <View>
              <Text style={styles.title}>Login</Text>
            </View>

            <AnimatedCar visible={loader} />

            <View style={{transform: [{rotateY: '180deg'}]}}>
              <Image style={styles.image} source={car} />
            </View>

            <Animated.View style={{transform: [{translateY: Spring}]}}>
              <View>
                <View style={{marginTop: 40, marginHorizontal: 10}}>
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
                    onChangeText={text => setEmail(text.trim())}
                    value={Email}
                    autoCapitalize="none"
                    onSubmitEditing={() => {
                      refPassword.current.focus();
                    }}
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />
                </View>
                <View style={{marginHorizontal: 10}}>
                  <Image
                    style={[
                      styles.smallimage,
                      {
                        position: 'absolute',
                        top: 22,
                        left: 25,
                        tintColor: Colors.White,
                      },
                    ]}
                    source={lock}
                  />
                  <TextInput
                    style={[styles.textinput, {paddingRight: 53}]}
                    ref={refPassword}
                    placeholder={placeP}
                    placeholderTextColor={color}
                    onChangeText={setpassword}
                    value={password}
                    autoCapitalize="none"
                    secureTextEntry={secure}
                  />
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      position: 'absolute',
                      alignSelf: 'flex-end',
                      top: 21,
                    }}
                    onPress={Secure}>
                    <Image
                      style={{
                        flex: 1,
                        marginRight: 25,
                        height: 30,
                        width: 30,
                        tintColor: Colors.White,
                        // position: 'absolute',
                      }}
                      source={secure ? closedeye : eye}
                    />
                  </TouchableOpacity>
                </View>

                <Alerts
                  isVisible={show}
                  Title={title}
                  SubText={ModalText}
                  btnTitle="Dismiss"
                  onPress={Show}
                />

                <Pressable onPress={Show}>
                  <Text style={styles.text}>Forgot password?</Text>
                </Pressable>

                <TouchableOpacity style={styles.btn} onPress={Auth}>
                  <Text style={styles.btntext}>Login</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginVertical: 15,
                  }}>
                  <Text style={styles.textlink}>Don't have an account? </Text>
                  <Pressable onPress={SignUp}>
                    <Text style={styles.link} accessibilityRole="link">
                      Sign Up
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Animated.View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default SignInScreen;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: 36,
    margin: 10,
    fontFamily: Fonts.ProductItalic,
    color: Colors.White,
    marginVertical: 25,
  },
  image: {
    marginVertical: 50,
    alignSelf: 'center',
    borderRadius: 20,
    height: 170,
    width: 340,
  },
  textinput: {
    padding: 15,
    margin: 8,
    color: Colors.lightGray,
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
    fontSize: 22,
  },
  btn: {
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: Colors.Yellow,
    borderRadius: 15,
  },
  link: {
    color: Colors.Yellow,
    textAlign: 'center',
  },
  text: {
    textAlign: 'right',
    marginHorizontal: 25,
    marginTop: 10,
    color: Colors.White,
  },
  textlink: {
    textAlign: 'center',
    color: Colors.White,
  },
});
