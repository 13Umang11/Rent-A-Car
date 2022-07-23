import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  LogBox,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Fonts from '../../constants/Fonts';
import CalendarPicker from 'react-native-calendar-picker';
import {india, rightarrow} from '../../Assets/icons/Index';
import Header from '../../components/Header';
import Modal from 'react-native-modal';
import moment from 'moment';
import AnimatedCar from '../../components/AnimatedCars';
import Colors from '../../constants/Colors';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function HomeScreen({navigation, route}) {
  const [show, setshow] = useState(false);
  const [Pick, setPick] = useState('');
  const [DROP, setDrop] = useState('');
  const [min, setmin] = useState('');
  const [Start, setStart] = useState('');
  const [End, setEnd] = useState('');
  const [total, settotal] = useState(1);

  useEffect(() => {
    var today = moment();
    setStart(today);
    setEnd(today);
    setPick(today);
    setDrop(today);
    setmin(today);
  }, []);

  useEffect(() => {
    var d1 = Start;
    var d2 = End;
    var diff = Math.abs(d1 - d2);
    var day = Math.abs(diff / 1000 / 60 / 60 / 24) + 1;
    settotal(day);
  }, [Start, End]);

  //for date changes
  const Datec = (date, type) => {
    if (date !== null) {
      if (type === 'START_DATE') {
        setStart(date);
        setEnd(date);
      } else {
        setEnd(date);
      }
    }
  };

  const Confirm = () => {
    setPick(Start);
    setDrop(End);
    Show();
  };

  const Navigation = () => {
    navigation.navigate('Choose Your Car', {
      Pick: Pick,
      Drop: DROP,
      total: total,
    });
  };

  const Show = () => {
    setshow(!show);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#121212', flex: 1}}>
      <View
        style={{
          flex: 1,
        }}>
        <StatusBar backgroundColor="#121212" barStyle={'light-content'} />
        <View
          style={{
            flex: 1,
          }}>
          <Header title="Home" />
          <AnimatedCar />

          <TouchableOpacity
            style={{
              // flex: 0.28,
              height:
                Dimensions.get('screen').height / 5.5 < 120
                  ? Dimensions.get('screen').height / 5.5
                  : 150, // 130,
              flexDirection: 'row',
              backgroundColor: Colors.lightBlack,
              justifyContent: 'space-evenly',
              borderRadius: 20,
              margin: 20,
              padding: 15,
            }}
            onPress={Show}
            activeOpacity={1}>
            <View style={{justifyContent: 'center', width: '50%'}}>
              <Text style={styles.Date}>PICK-UP</Text>
              <Text style={styles.date}>{moment(Pick).format('D')}</Text>
              <Text style={styles.day}>{moment(Pick).format('ddd | MMM')}</Text>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  height: Dimensions.get('screen').height / 20,
                  alignSelf: 'center',
                  marginBottom: 5,
                  width: 1,
                  borderColor: Colors.lightGray,
                  borderWidth: 1,
                }}
              />
              <Image
                style={{
                  alignSelf: 'center',
                  height: 25,
                  width: 25,
                  tintColor: Colors.White,
                  borderRadius: 100,
                }}
                source={rightarrow}
              />
              <View
                style={{
                  alignSelf: 'center',
                  height: Dimensions.get('screen').height / 20,
                  marginTop: 5,
                  width: 1,
                  borderColor: Colors.lightGray,
                  borderWidth: 1,
                }}
              />
            </View>

            <View style={{justifyContent: 'center', width: '50%'}}>
              <Text style={styles.Date}>DROP-OFF</Text>
              <Text style={styles.date}>{moment(DROP).format('D')}</Text>
              <Text style={styles.day}>{moment(DROP).format('ddd | MMM')}</Text>
            </View>
          </TouchableOpacity>

          <Modal
            isVisible={show}
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInTiming={400}
            animationOutTiming={400}
            onBackButtonPress={Show}
            onBackdropPress={Show}
            useNativeDriver
            deviceHeight={Dimensions.get('screen').height}
            backdropOpacity={0.7}
            backdropTransitionInTiming={400}
            backdropTransitionOutTiming={400}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  padding: 10,
                  backgroundColor: '#1f1f1f',
                  borderRadius: 30,
                  borderColor: Colors.Yellow,
                  borderWidth: 1,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <View
                    style={{
                      marginLeft: 10,
                      alignSelf: 'center',
                    }}>
                    <Text style={styles.textm}>PICK-UP</Text>
                    <Text style={[styles.datem]}>
                      {moment(Start).format('D MMM')}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 10,
                      height: 35,
                      marginVertical: 13,
                      width: 1,
                      borderColor: Colors.Gray,
                      borderWidth: 1,
                    }}
                  />
                  <View style={{margin: 10}}>
                    <Text style={styles.textm}>DROP-OFF</Text>
                    <Text style={styles.datem}>
                      {moment(End).format('D MMM')}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginVertical: 10,
                    borderColor: Colors.Yellow,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                    marginVertical: 0,
                    marginHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      color: Colors.Gray,
                      textAlign: 'center',
                      padding: 10,
                      fontSize: 12,
                    }}>
                    You've chosen
                    <Text style={{color: Colors.White, fontSize: 14}}>
                      {' '}
                      {total}{' '}
                    </Text>
                    rental days
                  </Text>
                </View>
                <CalendarPicker
                  width={300}
                  height={310}
                  minDate={min}
                  allowRangeSelection={true}
                  dayLabelsWrapper={{
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                    borderBottomColor: Colors.Yellow,
                    borderTopColor: Colors.Yellow,
                  }}
                  maxRangeDuration={20}
                  // showDayStragglers={true}
                  headerWrapperStyle={{margin: 5, width: 360}}
                  allowBackwardRangeSelect={true}
                  previousTitleStyle={{color: Colors.Yellow, marginLeft: 30}}
                  nextTitleStyle={{color: Colors.Yellow, marginRight: 30}}
                  selectedDayTextStyle={{fontWeight: 'bold'}}
                  selectedRangeStartStyle={{backgroundColor: Colors.Yellow}}
                  selectedRangeEndStyle={{backgroundColor: Colors.Yellow}}
                  selectedRangeStyle={{backgroundColor: Colors.Yellow}}
                  disabledDatesTextStyle={{color: 'gray'}}
                  todayTextStyle={{fontWeight: 'bold', color: Colors.White}}
                  restrictMonthNavigation={true}
                  textStyle={{
                    color: Colors.White,
                  }}
                  onDateChange={Datec}
                />
                <View
                  style={{
                    marginHorizontal: 10,
                    borderRadius: 20,
                    marginVertical: 10,
                  }}>
                  <TouchableOpacity onPress={Confirm} style={styles.confirm}>
                    <Text
                      style={{
                        color: Colors.White,
                        fontSize: 20,
                        padding: 12,
                        textAlign: 'center',
                      }}>
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <TouchableOpacity
            onPress={() => {
              Navigation();
            }}
            style={styles.btn}>
            <Text style={styles.btntext}>Search</Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <Image
              style={{
                backgroundColor: '#121212',
                tintColor: Colors.White,
                height: Dimensions.get('screen').height / 7.5,
                width: Dimensions.get('screen').width,
                // top: 268,
              }}
              source={india}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  Date: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 10,
  },
  date: {
    color: Colors.White,
    fontSize: 50,
    textAlign: 'center',
    fontFamily: Fonts.Robotothin,
  },
  day: {
    color: Colors.White,
    fontSize: 21,
    textAlign: 'center',
  },
  textm: {
    color: Colors.DarkGray,
    fontSize: 10,
    textAlign: 'center',
  },
  datem: {
    color: Colors.White,
    fontSize: 20,
    textAlign: 'center',
  },

  textdays: {
    color: Colors.White,
  },
  confirm: {
    margin: 10,
    borderRadius: 20,
    backgroundColor: '#121212',
    borderColor: Colors.Yellow,
    borderWidth: 1,
  },
  btntext: {
    textAlign: 'center',
    padding: 15,
    color: Colors.White,
    fontSize: 20,
  },
  btn: {
    marginHorizontal: 20,
    backgroundColor: Colors.Yellow,
    borderRadius: 20,
  },
});
