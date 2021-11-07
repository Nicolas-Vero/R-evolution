import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
const { width } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';

export default class Notifications extends React.Component {
  state = {
    refresh: false,
    screen: 'NOTIFICATIONS',
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
