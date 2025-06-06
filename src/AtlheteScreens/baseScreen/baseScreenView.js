import React from 'react';
import {
  View,
} from 'react-native';
import { } from '../../api/Availabilities';
import styles from './homeAthleteStyle';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';

export default class BaseScreenView extends AbstractScreenView {
  render() {
    return <View style={styles.container}></View>;
  }
}
