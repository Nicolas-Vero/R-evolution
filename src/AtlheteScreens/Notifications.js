import React from 'react';
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
const { width } = Dimensions.get('window');
import { LocaleConfig } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';

export default class Notifications extends React.Component {
  state = {
    refresh: false,
    user: { name: 'toto', avatar: 'string avatar' },
    screen: 'NOTIFICATIONS',
    user: {
      name: 'toto',
      avatar: '../../assets/icon.png',
    },
    items: [
      {
        coachId: 1,
        date: '2018-07-19',
        content: 'add stone wall',
        slot: '12H-13H',
      },
      {
        coachId: 1,
        date: '2018-07-20',
        content: 'landscaping',
        slot: '16H-17H',
      },
      { coachId: 1, date: '2018-07-20', content: 'fix door', slot: '12H-13H' },
      { coachId: 1, date: '2018-07-20', content: 'masonary', slot: '12H-13H' },
    ],
    currentDate: {
      date: '2018-07-19',
      dayItem: [
        { date: '2018-07-19', content: 'add stone wall', slot: '12H-13H' },
        { date: '2018-07-19', content: 'add stone wall', slot: '12H-13H' },
        { date: '2018-07-19', content: 'add stone wall', slot: '12H-13H' },
      ],
    },

    '2021-05-24': { color: '#70d7c7', textColor: 'white' },
    '2021-05-25': { endingDay: true, color: '#50cebb', textColor: 'white' },
  };

  render() {
    return (
      //  <View style={{ flex: 1, backgroundColor: 'black' }}>
      <LinearGradient
        colors={['#060606', '#2D333C']}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={styles.background}>
          
        <SafeAreaView>
        <Header title="NOTIFICATION" />
          <View>
          </View>
        </SafeAreaView>
      </LinearGradient>
      //    </View>
    );
  }
}

const styles = StyleSheet.create({

  background: {
    backgroundColor: 'black',
    flex: 1,
  },
});
