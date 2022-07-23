import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import database from '@react-native-firebase/database';
import AnimatedCar from '../../components/AnimatedCars';
import {back, users} from '../../Assets/icons/Index';
import Header from '../../components/Header';
import Colors from '../../constants/Colors';
import FastImage from 'react-native-fast-image';

export default function ManageUsers({navigation, route}) {
  const [flatlistdata, setflatlistdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [loader, setloader] = useState(false);

  useEffect(() => {
    setloader(true);
    const userInfo = database()
      .ref(`Users`)
      .on('value', data => {
        var tempdata = [];
        data.forEach(function (item, index) {
          tempdata.push(item);
        });
        setflatlistdata(tempdata);
        setloader(false);
      });
    setloader(false);
  }, []);

  const EditUser = (
    Email,
    Name,
    UserID,
    ProfilePic,
    Mobile,
    Gender,
    Age,
    Role,
  ) => {
    navigation.navigate('EditUser', {
      Email: Email,
      Name: Name,
      UserID: UserID,
      ProfilePic: ProfilePic,
      Mobile: Mobile,
      Gender: Gender,
      Age: Age,
      Role: Role,
    });
  };

  const RenderItem = ({item, index}) => {
    var user = item.val();
    var Email = user.Email;
    var Name = user.Name;
    var UserID = user.UserID;
    var ProfilePic = user.ProfilePic;
    var Mobile = user.Mobile;
    var Gender = user.Gender;
    var Age = user.Age;
    var Role = user.Role;
    return (
      <TouchableOpacity
        onPress={() =>
          EditUser(Email, Name, UserID, ProfilePic, Mobile, Gender, Age, Role)
        }>
        <View key={String(index)} style={[styles.main, {flexDirection: 'row'}]}>
          <FastImage
            style={{
              height: 110,
              width: 100,
              borderRadius: 5,
              marginRight: 10,
              tintColor: ProfilePic ? null : Colors.Yellow,
              backgroundColor: '#1F1F1F',
            }}
            source={ProfilePic ? {uri: ProfilePic, priority: 'high'} : users}
          />
          <View>
            <Text style={{color: Colors.White, fontSize: 18, width: 210}}>
              {Name}
            </Text>
            <Text style={{width: 210, color: Colors.Yellow, fontSize: 14}}>
              UID :{' '}
              <Text style={{color: Colors.White, fontSize: 11}}>{UserID}</Text>
            </Text>
            <Text style={{color: Colors.Yellow, fontSize: 14, width: 210}}>
              Email :
              <Text style={{color: Colors.White, fontSize: 11}}> {Email}</Text>
            </Text>
            <Text style={{color: Colors.Yellow, fontSize: 14}}>
              Role :<Text style={{color: Colors.White}}>{Role}</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#121212'}}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
        <Header
          title="Manage Users"
          Show="true"
          source={back}
          Navigation={() => navigation.goBack()}
        />
        <AnimatedCar visible={loader} />
        {/* {console.log('In flatlistdata', flatlistdata)} */}
        <FlatList
          data={flatlistdata}
          renderItem={RenderItem}
          ListEmptyComponent={
            <View
              style={{
                height: Dimensions.get('screen').height / 1.2,
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
          refreshing={false}
          onRefresh={() => setloading(!loading)}
        />
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    borderColor: Colors.Yellow,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 15,
    padding: 10,
  },
});
