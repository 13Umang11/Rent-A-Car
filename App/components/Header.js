import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import {share} from '../Assets/icons/Index';
import Colors from '../constants/Colors';

export default function Header({title, Show, Navigation, source, Share, Send}) {
  const [rotate, setrotate] = useState('0deg');
  return (
    <View
      style={{
        backgroundColor: '#121212',
        borderBottomColor: '#F9AA33',
        borderWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {Show && (
        <TouchableOpacity
          style={{position: 'absolute', left: 15}}
          onPress={Navigation}>
          <Image
            source={source}
            style={{
              height: 25,
              width: 25,
              tintColor: 'white',
            }}
          />
        </TouchableOpacity>
      )}
      <Text
        style={{
          alignSelf: 'center',
          color: '#F9AA33',
          textAlign: 'center',
          fontFamily: 'Product Sans Bold Italic',
          fontSize: 24,
          padding: 15,
        }}>
        {title}
      </Text>
      {Share && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 20,
            transform: [{rotateZ: rotate}],
          }}
          onPressIn={() => {
            ToastAndroid.show(
              'Share This App Link if You Like it',
              ToastAndroid.LONG,
            ),
              setrotate('45deg');
          }}
          onPressOut={() => setrotate('0deg')}
          onPress={Send}>
          <Image
            source={share}
            style={{
              height: 25,
              width: 25,
              tintColor: Colors.Yellow,
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
