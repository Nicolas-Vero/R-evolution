import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, SafeAreaView } from 'react-native';
import styles from './NotificationsScreenStyle';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import Header from '../../components/Header';
export default class NotificationsScreenView extends AbstractScreenView {
  render() {
    return (
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
        style={styles.container}>
        <SafeAreaView>
          <Header title="NOTIFICATIONS" />
          <View></View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}
