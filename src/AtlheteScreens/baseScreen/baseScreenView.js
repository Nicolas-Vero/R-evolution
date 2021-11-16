import React from 'react';
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../components/Button';
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
  Text,
  FlatList,
  Modal,
  Image,
} from 'react-native';
import {
  athlete_booking,
  get_athlete_active_courses,
  get_availabilities,
} from '../../api/Athlete';
import SwitchSelector from 'react-native-switch-selector';
import { Avatar } from 'react-native-elements';
import MonthsSlider from '../../components/MonthsSlider';
import {} from '../../api/Availabilities';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import styles from './homeAthleteStyle';
import { options, LocaleConfig } from './homeAthleteConfig';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import { convertSlotToDate } from '../../helpers/dateHelper';

export default class BaseScreenView extends AbstractScreenView {
  render() {
    return <View style={styles.container}></View>;
  }
}
