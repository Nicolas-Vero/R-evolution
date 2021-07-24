import React, { useState } from 'react';
import moment from 'moment';
import { Button } from 'react-native-elements';
import axios from 'axios';
import {LinearGradient} from 'expo-linear-gradient';
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
import { updateorcreate_availability ,update_availability} from '../api/Availabilities';
import SwitchSelector from 'react-native-switch-selector';
import { Card, Icon, Avatar } from 'react-native-elements';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
const { width } = Dimensions.get('window');
import { LocaleConfig } from 'react-native-calendars';
import MonthsSlider from '../components/MonthsSlider';
import { Task } from '../api/Task';
import SwitchButton from './SwitchButton';
import {} from '../api/Availabilities'
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

const options = [
  { label: 'Planning', value: 'Planning' },
  { label: 'Disponibilité', value: 'Disponibilite' },
];
export default class Dashboard extends React.Component {
  state = {
    refresh: false,
    user: { name: 'toto', avatar: 'string avatar' },
    screen: 'Planning',
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
    currentAvailabilities: [
      {
        date: '2021/07/09',
        availability_slot_1: false,
        availability_slot_2: false,
        availability_slot_3: false,
        availability_slot_4: false,
        availability_slot_5: false,
        availability_slot_6: false,
        availability_slot_7: false,
        availability_slot_8: false,
        availability_slot_9: false,
        availability_slot_10: false,
        availability_slot_11: false,
        availability_slot_12: false,
        availability_slot_13: false,
        availability_slot_14: false,
        availability_slot_15: false,
        availability_slot_17: false,
        availability_slot_18: false,
        availability_slot_19: false,
        availability_slot_20: false,
        availability_slot_21: false,
        availability_slot_22: false,
        availability_slot_23: false,
        availability_slot_24: false,
      },
    ],
    markedDate: {
      '2021-07-15': { marked: true, dotColor: '#50cebb' },
      '2021-05-16': { marked: true, dotColor: '#50cebb' },
      '2021-05-21': { startingDay: true, color: '#50cebb', textColor: 'white' },
      '2021-05-22': { color: '#70d7c7', textColor: 'white' },
      '2021-05-23': {
        color: '#70d7c7',
        textColor: 'white',
        marked: true,
        dotColor: 'white',
      },
      '2021-05-24': { color: '#70d7c7', textColor: 'white' },
      '2021-05-25': { endingDay: true, color: '#50cebb', textColor: 'white' },
    },
    // ajouter le coach id pour pouvoir associe des dispo a un coacg
    // availabilities: [
    //   {
    //     date: '2021/07/09',
    //     availability_slot_1: false,
    //     availability_slot_2: false,
    //     availability_slot_3: false,
    //     availability_slot_4: false,
    //     availability_slot_5: false,
    //     availability_slot_6: false,
    //     availability_slot_7: false,
    //     availability_slot_8: false,
    //     availability_slot_9: false,
    //     availability_slot_10: false,
    //     availability_slot_11: false,
    //     availability_slot_12: false,
    //     availability_slot_13: false,
    //     availability_slot_14: false,
    //     availability_slot_15: false,
    //     availability_slot_17: false,
    //     availability_slot_18: false,
    //     availability_slot_19: false,
    //     availability_slot_20: false,
    //     availability_slot_21: false,
    //     availability_slot_22: false,
    //     availability_slot_23: false,
    //     availability_slot_24: false,
    //   },
    //   {
    //     date: '2021/07/10',
    //     availability_slot_1: false,
    //     availability_slot_2: false,
    //     availability_slot_3: false,
    //     availability_slot_4: false,
    //     availability_slot_5: false,
    //     availability_slot_6: false,
    //     availability_slot_7: false,
    //     availability_slot_8: false,
    //     availability_slot_9: false,
    //     availability_slot_10: false,
    //     availability_slot_11: false,
    //     availability_slot_12: false,
    //     availability_slot_13: false,
    //     availability_slot_14: false,
    //     availability_slot_15: false,
    //     availability_slot_17: false,
    //     availability_slot_18: false,
    //     availability_slot_19: false,
    //     availability_slot_20: false,
    //     availability_slot_21: false,
    //     availability_slot_22: false,
    //     availability_slot_23: false,
    //     availability_slot_24: false,
    //   },
    //   { coachId:'azerty',
    //     date: '2021/07/11',
    //     availability_slot_1: false,
    //     availability_slot_2: false,
    //     availability_slot_3: false,
    //     availability_slot_4: false,
    //     availability_slot_5: false,
    //     availability_slot_6: false,
    //     availability_slot_7: false,
    //     availability_slot_8: false,
    //     availability_slot_9: false,
    //     availability_slot_10: false,
    //     availability_slot_11: false,
    //     availability_slot_12: false,
    //     availability_slot_13: false,
    //     availability_slot_14: false,
    //     availability_slot_15: false,
    //     availability_slot_17: false,
    //     availability_slot_18: false,
    //     availability_slot_19: false,
    //     availability_slot_20: false,
    //     availability_slot_21: false,
    //     availability_slot_22: false,
    //     availability_slot_23: false,
    //     availability_slot_24: false,
    //   },
    // ],
  };

  onSlotAvailabilityChange(date, slot, params) {
    this.setState({ updating: true });
    update_availability({date ,slot, ...params }, this.props.navigation)
      .then((res) => {/*
        this.getAvailabilities(
          this.getDate(new Date(res.data['data']['attributes']['date'])),
        );
        */
        console.log(res)
       })
      .catch((err) => console.warn(err));
  }
  getSlotTime(time) {
    let date = new Date(time);
    const day = FrenchConfig.dayNames[date.getDay()];
    const month = FrenchConfig.monthNames[date.getMonth()];
    return `${day} ${date.getDate()} ${month}`;
  }
  getDate(date = new Date()) {
    const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const m =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const y = date.getFullYear();
    return `${d}-${m}-${y}`;
  }

  handleRefresh = () => {
    this.setState({ refreshing: true });
  };

  fetchData = () => {
    dispatch(getAllDataAction(userParamData));
    setIsFetching(false);
  };

  show(item) {
    this.setState({ currentAvailabilities: item });
    this.setState({ refresh: !this.state.refresh });
  }
  getDaysArrayByMonth(date) {
    var daysInMonth = moment(date, 'DD-MM').daysInMonth();
    var arrDays = [];
    console.log(daysInMonth);
    while (daysInMonth && daysInMonth >= 1) {
      var current = moment(date, 'DD-MM').date(daysInMonth);
      arrDays.push(current);
      daysInMonth--;
    }
    console.log(arrDays);
    return arrDays.reverse();
  }
  getAvailabilities(date) {
    // todo requete en base pour trouver des availabilities existante
    var item = [];
    var ArrayOfday = this.getDaysArrayByMonth(date);
    // si les availabilities n'existes pas les initialiser
    ArrayOfday.forEach((element) => {
      element = moment(element).format('LLLL');
      var Object = {
        availability_id: uuidv4(),
        coachId: '1',
        date: element,
        availability_slot_1: false,
        availability_slot_2: false,
        availability_slot_3: false,
        availability_slot_4: false,
        availability_slot_5: false,
        availability_slot_6: false,
        availability_slot_7: false,
        availability_slot_8: false,
        availability_slot_9: false,
        availability_slot_10: false,
        availability_slot_11: false,
        availability_slot_12: false,
        availability_slot_13: false,
        availability_slot_14: false,
        availability_slot_15: false,
        availability_slot_17: false,
        availability_slot_18: false,
        availability_slot_19: false,
        availability_slot_20: false,
        availability_slot_21: false,
        availability_slot_22: false,
        availability_slot_23: false,
        availability_slot_24: false,
      };
      item.push(Object);
    });
    this.setState({ availabilities: item });
    const response = updateorcreate_availability(item)
    console.log(response)
    
    //  ({date}, this.props.navigation)
    //   .then(res => res.data.data)
    //   .then(availabilities => this.setState({availabilities, updating: false}))
    //   .catch(err => console.warn(err));
  }
  onMonthChange(date) {
    console.warn(date);
    this.getAvailabilities(this.getDate(date));
  }
  async changeTaskList(data) {
    const formatdata = {
      coachId: 1,
      date: data.dateString,
    };

    const daytak = [];
    datas = await Task(formatdata);
    datas.forEach((element) => {
      daytak.push({
        date: element.date,
        content: element.content,
        slot: element.slot,
      });
    });
    this.setState({
      currentDate: { date: data.dateString, day: data.day, dayItem: daytak },
    });
  }

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
          style={styles.background}
        >

        <SafeAreaView>
        <Image
          resizeMode="cover"
          rounded
          source={{ uri: this.state.user.avatar }}
        />
        <Text>{this.state.user.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Button
            type="clear"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="VIEW NOW"
          />
          <Button
            type="clear"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="VIEW NOW"
          />
        </View>
        <View
          style={{
            height: 50,
            borderBottomColor: '#2CDEE4',
            borderBottomWidth: 2,
            marginBottom: 35,
          }}></View>
          <View>
            <View></View>
            <View>
              <SwitchSelector
                options={options}
                initial={0}
                onPress={(value) => this.setState({ screen: value })}
                backgroundColor="#1E2026"
                buttonColor="#2CDEE4"
                borderRadius="5"
              />
            </View>
            <View>{/*TO DO: passe les jours en francais  */}</View>
            {this.state.screen == 'Planning' ? (
              <View>
                <View>
                  <Text>
                    {moment(this.state.currentDate.date).format('LLLL')}
                    {''}
                    {/*this.state.currentDate.date*/}
                  </Text>
                  <FlatList
                    style={styles.containers}
                    data={this.state.currentDate.dayItem}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.date + item.slot}
                  />
                </View>
                <View>
                  <Calendar
                    theme={{ calendarBackground: '#2D333C' }}
                    markingType={'period'}
                    onDayPress={(day) => this.changeTaskList(day)}
                    markedDates={this.state.markedDate}
                    style={styles.calendar}
                  />
                </View>
              </View>
            ) : (
              <View>
                {/* Dispo screen */}
                <View style={{ height: 800 }}>
                  <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <MonthsSlider onChange={this.onMonthChange.bind(this)} />
                    <View>
                      <FlatList
                      style={{borderWidth:3,borderColor:'green',backgroundColor:'black'}}
                        horizontal={true}
                        data={this.state.availabilities}
                        extraData={this.state}
                        //onRefresh={onRefresh}
                        refreshing={this.state.refresh}
                        keyExtractor={(item) => item.date}
                        renderItem={({ item }) => (
                          <View style={styles.day}>
                            <TouchableOpacity
                              onPress={() => {
                                this.show(item);
                              }}>
                              <Text style={{color:'white'}}> {this.getSlotTime(item.date)} </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      />
                      {console.log('this.state', this.state.refresh)}
                      <FlatList
                      style={{maxHeight:550}}
                        data={[this.state.currentAvailabilities]}
                        extraData={this.state}
                        //  onRefresh={onRefresh}
                        refreshing={this.state.refresh}
                        // keyExtractor={(item) => {item.date;}}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item }) => (
                          <SwitchButton
                            item={item}
                            disabled={this.state.updating}
                            onSlotAvailabilityChange={this.onSlotAvailabilityChange.bind(
                              this,
                            )}
                          />
                        )}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>
        </LinearGradient>
  //    </View>
    );
  }
}

const styles = StyleSheet.create({
  listonebyone: {},

  ccontainer: {},
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
  calendar: {
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    marginTop: 20,
    height: 400,
  },
  background: {
    backgroundColor: 'black',
    flex: 1,
  },
  day:{borderWidth:3,
    borderColor:'blue',
    height:80,
    width:50,
    backgroundColor:'#2D333C',
    margin:5,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
