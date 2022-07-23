import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../constants/Colors';

export default function Modals({Title, SubText, btnTitle, onPress, isVisible}) {
  return (
    <View>
      <Modal
        isVisible={isVisible}
        useNativeDriver
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={300}
        animationOutTiming={300}
        backdropColor="black"
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        onBackdropPress={onPress}
        onBackButtonPress={onPress}
        backdropOpacity={0.7}
        swipeDirection={['up', 'down', 'left', 'right']}>
        <View
          style={{
            borderRadius: 20,
            borderWidth: 1,
            padding: 10,
            backgroundColor: '#1F1F1F',
            borderColor: Colors.Yellow,
          }}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 20,

              fontWeight: 'bold',
              color: Colors.Yellow,
              marginLeft: 10,
            }}>
            {Title}
          </Text>
          <Text
            style={{
              textAlign: 'justify',
              color: Colors.White,
              margin: 10,
            }}>
            {SubText}
          </Text>

          <TouchableOpacity
            style={{
              margin: 10,
              backgroundColor: Colors.Yellow,
              width: 300,
              alignSelf: 'center',
              borderRadius: 20,
            }}
            onPress={onPress}>
            <Text
              style={{
                color: Colors.White,
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 'bold',
                padding: 15,
              }}>
              {btnTitle}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderColor: '#F9AA33',
    borderWidth: 1,
    backgroundColor: '#1F1F1F',
    borderRadius: 20,
    elevation: 3,
  },
  title: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F9AA33',
    marginLeft: 10,
  },
  btn: {
    color: '#F9AA33',
    left: 220,
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
});
