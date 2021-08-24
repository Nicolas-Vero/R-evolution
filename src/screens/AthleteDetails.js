
import React, { useState } from 'react';
import moment from 'moment';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Pager from '../common/Carrousel';
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  FlatList,
  TouchableOpacityBase,
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import {
  get_availabilities,
  updateorcreate_availability,
  update_availability,
} from '../api/Availabilities';
import SwitchSelector from 'react-native-switch-selector';
import { Card, Icon, Avatar } from 'react-native-elements';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
const { width } = Dimensions.get('window');
import { LocaleConfig } from 'react-native-calendars';
import MonthsSlider from '../components/MonthsSlider';
import { get_appointement } from '../api/Coach';
import SwitchButton from '../components/SwitchButton';
import {} from '../api/Availabilities';
import { FrenchConfig } from '../components/FrenchCalendar';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


export default class AthleteDetails extends React.Component {

    render(){
        return (
            <View>
                <View>
                    <Avatar></Avatar>
                </View>
                <View><Text>seance</Text></View>
                <View><Text>numero</Text></View>
                <View><Text>mail</Text></View>
                <View><Text>offre en cour</Text></View>
                <View><Text>paiement</Text></View>
                <View><Text>objectifs</Text></View>
                <View style={{flexDirection:'row'}}><View><Text>taille</Text><View><Text>poids</Text></View></View></View>
                <View><Text>Age</Text></View>
                <View><Text>crenaux</Text></View>
                <View><Text>experience</Text></View>
                <View><Text>santé</Text></View>
                <View><Text>info complémentaire</Text></View>
                
            </View>
        )
    }
}