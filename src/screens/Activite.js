import React, { useState } from 'react';
import moment from 'moment';
import { Button } from 'react-native-elements';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
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
import SwitchSelector from "react-native-switch-selector";
import { Card, Icon, Avatar } from 'react-native-elements';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
const { width } = Dimensions.get('window');
import { LocaleConfig } from 'react-native-calendars';
import MonthsSlider from '../components/MonthsSlider';
import { Task } from '../api/Task';
import SwitchButton from './SwitchButton';
import { FrenchConfig } from '../components/FrenchCalendar';
LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

const monthNames = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];
const dayNames = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
];

const options=[
  { label: "NOTIFICATIONS", value: "NOTIFICATIONS",  }, 
  { label: "RAPPELS", value: "RAPPELS", } 
];
export default class Activite extends React.Component {
  state = {
    refresh: false,
    user:{name:'toto',avatar:'string avatar'},
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
    list = () => {
      return this.state.items.map((element) => {
        return console.log(element);
      });
    };
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.item}>
          {item.content} -- {item.slot}
        </Text>
      </TouchableOpacity>
    );
    const onRefresh = () => {
      // this.setState({refresh:true});
      console.log(this.state.refresh);
    };
    const renderItem = ({ item }) => {
      return <Item stlyes item={item} onPress={(data) => console.log(data)} />;
    };

    return (
      <View style={styles.background}>
        
        <Image
          resizeMode="cover"
          rounded
          source={{ uri: this.state.user.avatar }}
        />
        <Text>{this.state.user.name}</Text>
        <View style={{flexDirection:'row',}}> 
        <Button
           type='clear'
           buttonStyle={{
             borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="VIEW NOW"
        />
         <Button
         type='clear'
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="VIEW NOW"
        />
        </View>
              <View style={{height:50, borderBottomColor: '#2CDEE4',
    borderBottomWidth: 2,marginBottom:35}}> 
              </View>
           
            <SafeAreaView>
             
        <View>
          <View>
           
          </View>
          <View>
            <SwitchSelector
            options={options}
            initial={0}
            onPress={value => this.setState({ screen: value })}
            backgroundColor='#1E2026'
            buttonColor = '#2CDEE4'
            borderRadius = '5'
            />
          </View>
          <View>
            {/*TO DO: passe les jours en francais  */}
          </View>
          {this.state.screen == 'NOTIFICATIONS' ? (
            <View>    
            </View>
          ) : (
            <View>
            </View>
          )}
        </View>
      </SafeAreaView>
    {/*  </LinearGradient> */}
    </View> 
    );
  }
}

const styles = StyleSheet.create({
  listonebyone:{

  },

  ccontainer: {
  },
  item: {
    backgroundColor: '#2CDEE4',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  items: {
    flex: 1,
    borderRadius: 25,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  calendar:{
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    marginTop: 20,
    height:400
  },
  background: {
    backgroundColor: 'black',
    flex: 1,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
