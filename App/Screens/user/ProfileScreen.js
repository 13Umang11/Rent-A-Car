import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  StatusBar,
  Share,
  SafeAreaView,
  Image,
} from 'react-native';
import {User} from '../../Assets/icons/Index';
import AnimatedCar from '../../components/AnimatedCars';
import auth from '@react-native-firebase/auth';
import Header from '../../components/Header';
import database, {firebase} from '@react-native-firebase/database';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import FastImage from 'react-native-fast-image';

const ProfileScreen = ({navigation}) => {
  const [uid, setuid] = useState('');
  const [name, setname] = useState('');
  const [Contact] = useState('N/A');
  const [Age] = useState('N/A');
  const [Profile, setProfile] = useState(false);
  const [email, setemail] = useState('');
  const [image, setimage] = useState(null);
  const [Gender] = useState('N/A');
  const [color, setcolor] = useState();
  const [loader, setloader] = useState(false);
  const [user, setuser] = useState({
    name: name,
    contact: Contact,
    image: image,
    age: Age,
    gender: Gender,
  });

  useEffect(() => {
    setloader(true);
    const user = firebase.auth().currentUser;
    if (user) {
      setemail(user.email);
    }
    database()
      .ref(`Users/${user.uid}`)
      .on('value', snapshot => {
        console.log('User data: ', snapshot.val());
        setuser({
          name: snapshot.val().Name,
          contact: snapshot.val().Mobile,
          gender: snapshot.val().Gender,
          age: snapshot.val().Age,
          image: snapshot.val().ProfilePic,
        });
        setloader(false);
      });
  }, [image]);

  useEffect(() => {
    console.log(user);
    if (user.image == 'N/A') {
      console.log(user);
      setProfile(false);
      setcolor(Colors.Yellow);
    } else {
      setProfile(true);
      setcolor();
    }
  }, [user.image]);

  const SignOut = () => {
    auth().signOut();
    console.log('Sign Out......');
    navigation.replace('SignIn');
  };

  // const Send = async () => {
  //   try {
  //     const share = await Share.share({
  //       title: 'Rent-A-Car',
  //       message:
  //         'App Installation link  https://carsforyou.page.link/cars-for-everyone',
  //     });
  //     if (share.action === Share.sharedAction) {
  //       if (share.activityType) {
  //         console.log('Share');
  //       } else {
  //         console.log('Shared');
  //       }
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }Share={true} {Send={Send}}
  // };

  const Navigation = () => {
    navigation.navigate('Edit', {
      name: name,
      image: user.image,
      user: user,
      email: email,
    });
  };

  return (
    <View style={{backgroundColor: '#121212', flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
        <View style={{flex:1}}>
          <Header title="Profile" />
          <StatusBar backgroundColor="#121212" />
          <AnimatedCar visible={loader} />

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: Colors.Yellow,
              height:
                Dimensions.get('screen').height / 2.5 > 260
                  ? 280
                  : Dimensions.get('screen').height / 2.5,
            }}>
            <View style={styles.imageview}>
              <Image
                defaultSource={User}
                source={
                  Profile == true ? {uri: user.image, priority: 'high'} : User
                }
                style={{
                  ...styles.image,
                  tintColor: !Profile ? Colors.Yellow : null,
                }}
              />
              {/* <FastImage
                source={
                  Profile == true ? {uri: user.image, priority: 'high'} : User
                }
                style={{
                  ...styles.image,
                }}
                tintColor={!Profile ? Colors.Yellow : null}
              /> */}
            </View>

            <Text
              style={[
                styles.text,
                {
                  color: Colors.Gray,
                  marginTop: 30,
                  fontWeight: '300',
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
              {user.name}
            </Text>
          </View>
          <ScrollView style={{flex:1}}>
          <View style={{flex:1}}>
            
              <View style={styles.subview}>
                <Text style={styles.subtext}>Email</Text>
                <Text style={styles.subans}>{email}</Text>
              </View>
              <View style={styles.subview}>
                <Text style={styles.subtext}>Contact No.</Text>
                <Text style={styles.subans}>{user.contact}</Text>
              </View>
              <View style={styles.subview}>
                <Text style={styles.subtext}>Gender</Text>
                <Text style={styles.subans}>{user.gender}</Text>
              </View>
              <View style={styles.subview}>
                <Text style={styles.subtext}>Age</Text>
                <Text style={styles.subans}>{user.age}</Text>
              </View>

              <TouchableOpacity onPress={Navigation} style={styles.btn}>
                <Text style={styles.btntext}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={SignOut} style={styles.btn}>
                <Text style={styles.btntext}>Logout</Text>
              </TouchableOpacity>
            
          </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  image: {
    height: 130,
    width: 130,
    borderRadius: 100,
    backgroundColor: '#1F1F1F',
  },
  text: {
    alignSelf: 'center',
  },
  btntext: {
    textAlign: 'center',
    color: Colors.White,
    fontSize: 18,
  },
  btn: {
    margin: 10,
    backgroundColor: Colors.Yellow,
    width: '85%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  subtext: {
    color: Colors.White,
    marginVertical: 20,
    margin: 5,
    fontSize: 18,
  },
  subans: {
    color: Colors.Gray,
    margin: 20,
    fontSize: 18,
  },
  subview: {
    flexDirection: 'row',
    borderBottomColor: Colors.Gray,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    width: '90%',
    justifyContent: 'space-between',
  },
  imageview: {
    marginVertical: 10,
    borderRadius: 100,
    borderColor: Colors.Yellow,
    borderWidth: 1,
    padding: 5,
    alignSelf: 'center',
  },
});
