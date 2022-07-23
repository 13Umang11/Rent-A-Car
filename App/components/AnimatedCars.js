import React from 'react';
import {View, StyleSheet} from 'react-native';

import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import Colors from '../constants/Colors';

export default function AnimatedCar({visible}) {
  return (
    <Modal
      isVisible={visible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      useNativeDriver
      backdropOpacity={0.8}
      style={{margin: 0}}>
      <View
        style={{
          justifyContent: 'center',
          height: 100,
          width: 100,
          borderColor: Colors.Yellow,
          borderWidth: 1,
          borderRadius: 20,
          alignSelf: 'center',
          backgroundColor: Colors.Black,
        }}>
        <LottieView
          source={require('../Assets/Animation.json')}
          style={styles.loder}
          autoPlay
        />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  loder: {
    height: 100,
    width: 100,
  },
});
