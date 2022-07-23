import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AnimatedCar from '../../components/AnimatedCars';
import database from '@react-native-firebase/database';
import {back} from '../../Assets/icons/Index';
import Header from '../../components/Header';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import FastImage from 'react-native-fast-image';

export default function EditUser({navigation, route}) {
  const [loader, setloader] = useState(false);
  const [open, setopen] = useState(false);
  const [role, setrole] = useState(route.params.Role);
  const [items, setitems] = useState([
    {label: 'User', value: 'USER'},
    {label: 'Admin', value: 'ADMIN'},
  ]);

  const Save = () => {
    console.log('role', role);
    setloader(true);
    const Role = database()
      .ref(`Users/${route.params.UserID}`)
      .update({
        Role: role,
      })
      .then(() => {
        console.log('Role Set...'), navigation.goBack(), setloader(false);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#121212'}}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
        <Header
          title={route.params.Name}
          Show="true"
          source={back}
          Navigation={() => navigation.goBack()}
        />
        <AnimatedCar visible={loader} />
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="always">
          <View style={styles.imageview}>
            <FastImage
              source={{uri: route.params.ProfilePic, priority: 'high'}}
              style={[
                styles.image,
                {tintColor: route.params.ProfilePic ? null : Colors.Yellow},
              ]}
            />
          </View>

          <Text style={styles.name}>{route.params.Name}</Text>

          <View style={{marginVertical: 20}}>
            <View
              style={[
                styles.view,
                {
                  borderTopColor: 'gray',
                  borderTopWidth: 1,
                  justifyContent: 'space-between',
                },
              ]}>
              <Text style={styles.text}>UserID</Text>
              <Text
                style={[
                  styles.text,
                  {color: 'gray', width: 250, fontSize: 16},
                ]}>
                {route.params.UserID}
              </Text>
            </View>
            <View style={[styles.view, {justifyContent: 'space-between'}]}>
              <Text style={{...styles.text}}>Email</Text>
              <Text style={[styles.text, {color: 'gray', maxWidth: 290}]}>
                {route.params.Email}
              </Text>
            </View>
            <View style={[styles.view, {justifyContent: 'space-between'}]}>
              <Text style={styles.text}>Contact No.</Text>
              <Text style={[styles.text, {color: 'gray'}]}>
                {route.params.Mobile}
              </Text>
            </View>
            <View style={[styles.view, {justifyContent: 'space-between'}]}>
              <Text style={styles.text}>Gender</Text>
              <Text style={[styles.text, {color: 'gray'}]}>
                {route.params.Gender}
              </Text>
            </View>
            <View style={[styles.view, {justifyContent: 'space-between'}]}>
              <Text style={styles.text}>Age</Text>
              <Text style={[styles.text, {color: 'gray'}]}>
                {route.params.Age}
              </Text>
            </View>
            <View
              style={[
                styles.view,
                {justifyContent: 'space-between', zIndex: 2000},
              ]}>
              <Text style={styles.text}>Role</Text>
              <DropDownPicker
                open={open}
                value={role}
                items={items}
                setOpen={setopen}
                setValue={setrole}
                setItems={setitems}
                closeOnBackPressed={true}
                showTickIcon={false}
                itemKey="value"
                itemSeparator={true}
                placeholder="Role"
                dropDownDirection="TOP"
                style={{
                  marginVertical: 15,
                  marginLeft: 130,
                  borderColor: Colors.Yellow,
                  borderWidth: 1,
                  width: 120,
                  height: 30,
                  backgroundColor: 'black',
                }}
                textStyle={{
                  color: Colors.Yellow,
                }}
                listParentLabelStyle={{
                  color: Colors.White,
                }}
                arrowIconStyle={{
                  width: 20,
                  height: 20,
                  tintColor: Colors.Yellow,
                }}
                dropDownContainerStyle={{
                  backgroundColor: 'black',
                  width: 120,
                  marginLeft: 130,
                  borderColor: Colors.Yellow,
                  marginVertical: 15,
                  borderWidth: 1,
                }}
                selectedItemLabelStyle={{
                  fontWeight: 'bold',
                  color: Colors.Yellow,
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{...styles.mainbtn, zIndex: 1000}}
            onPress={Save}>
            <Text style={styles.maintext}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.White,
    fontSize: 18,
    fontWeight: '100',
    padding: 15,
    marginHorizontal: 10,
  },
  imageview: {
    marginVertical: 10,
    borderRadius: 100,
    borderColor: Colors.Yellow,
    borderWidth: 1,
    padding: 5,
    width: 130,
    alignSelf: 'center',
  },
  image: {
    height: 120,
    width: 120,

    borderRadius: 100,
    backgroundColor: '#1F1F1F',
  },
  name: {
    color: Colors.White,
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 0,
  },
  view: {
    flexDirection: 'row',
    marginHorizontal: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  mainbtn: {
    borderColor: Colors.Yellow,
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  maintext: {
    padding: 8,
    textAlign: 'center',
    color: Colors.White,
    marginVertical: 5,
    fontSize: 20,
  },
});
