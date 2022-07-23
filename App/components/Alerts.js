import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';

export default function Alerts({Title, SubText, btnTitle, onPress, isVisible}) {
  return (
    <View>
      <Modal
        isVisible={isVisible}
        animationIn="fadeIn"
        useNativeDriver
        animationOut="fadeOut"
        animationInTiming={400}
        animationOutTiming={400}
        backdropColor="black"
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        onBackdropPress={onPress}
        onBackButtonPress={onPress}
        backdropOpacity={0.7}
        swipeDirection={['up', 'down', 'left', 'right']}>
        <View style={styles.container}>
          <Text style={styles.title}>{Title}</Text>
          <Text style={{color: 'white', margin: 10, textAlign: 'justify'}}>
            {SubText}
          </Text>

          <TouchableOpacity
            style={{left: Dimensions.get('screen').width - 150}}
            onPress={onPress}>
            <Text style={styles.btn}>{btnTitle}</Text>
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
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
});
