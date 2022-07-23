import React from 'react';
import {View, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import {carBooking, home, users} from '../../Assets/icons/Index';

const Bottom = ({state, descriptors, navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: '#1F1F1F'}}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={1}
              onPress={() => navigation.navigate(route.name)}
              style={{
                flex: 1,
                backgroundColor: isFocused ? '#312A21' : '#1F1F1F',
              }}>
              {index == 0 && (
                <View style={{padding: 15}}>
                  <Image
                    source={home}
                    style={{
                      width: 25,
                      height: 25,
                      alignSelf: 'center',
                      tintColor: isFocused ? '#F9AA33' : 'white',
                    }}
                  />
                </View>
              )}
              {index == 1 && (
                <View style={{padding: 15}}>
                  <Image
                    source={carBooking}
                    style={{
                      width: 25,
                      height: 25,
                      alignSelf: 'center',
                      tintColor: isFocused ? '#F9AA33' : 'white',
                    }}
                  />
                </View>
              )}
              {index == 2 && (
                <View style={{padding: 15}}>
                  <Image
                    source={users}
                    style={{
                      width: 25,
                      height: 25,
                      alignSelf: 'center',
                      tintColor: isFocused ? '#F9AA33' : 'white',
                    }}
                  />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default Bottom;
