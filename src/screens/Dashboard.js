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
  dayNamesShort: ['D', 'L', 'M', 'MM', 'J', 'V', 'S'],
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
//  moment.locale('fr', {
//   months:
//     'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split(
//       '_',
//     ),
//   monthsShort:
//     'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
//   monthsParseExact: true,
//   weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
//   weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
//   weekdaysMin: 'D_L_M_M_J_V_S'.split('_'),
//   weekdaysParseExact: true,
//   longDateFormat: {
//     LT: 'HH:mm',
//     LTS: 'HH:mm:ss',
//     L: 'DD/MM/YYYY',
//     LL: 'D MMMM YYYY',
//     LLL: 'D MMMM YYYY HH:mm',
//     LLLL: 'dddd D MMMM YYYY HH:mm',
//   },
//   calendar: {
//     sameDay: '[Aujourd’hui à] LT',
//     nextDay: '[Demain à] LT',
//     nextWeek: 'dddd [à] LT',
//     lastDay: '[Hier à] LT',
//     lastWeek: 'dddd [dernier à] LT',
//     sameElse: 'L',
//   },
//   relativeTime: {
//     future: 'dans %s',
//     past: 'il y a %s',
//     s: 'quelques secondes',
//     m: 'une minute',
//     mm: '%d minutes',
//     h: 'une heure',
//     hh: '%d heures',
//     d: 'un jour',
//     dd: '%d jours',
//     M: 'un mois',
//     MM: '%d mois',
//     y: 'un an',
//     yy: '%d ans',
//   },
//   dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
//   ordinal: function (number) {
//     return number + (number === 1 ? 'er' : 'e');
//   },
//   meridiemParse: /PD|MD/,
//   isPM: function (input) {
//     return input.charAt(0) === 'M';
//   },
//   // In case the meridiem units are not separated around 12, then implement
//   // this function (look at locale/id.js for an example).
//   // meridiemHour : function (hour, meridiem) {
//   //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
//   // },
//   meridiem: function (hours, minutes, isLower) {
//     return hours < 12 ? 'PD' : 'MD';
//   },
//   week: {
//     dow: 1, // Monday is the first day of the week.
//     doy: 4, // Used to determine first week of the year.
//   },
//  });
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
    currentDate:'',
 
    currentAvailabilities: [],
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
    availabilities: [],
    page: [
      <View key={1}>
        <Text>toto</Text>
        <Text>hello</Text>
      </View>,
      <View key={2}>
        <Text>tot</Text>
      </View>,
      <View key={3}>
        <Text>hoo</Text>
      </View>,
      <View key={4}>
        <Text>gg</Text>
      </View>,
      <View key={5}>
        <Text>hh</Text>
      </View>,
      <View key={6}>
        <Text>zz</Text>
      </View>,
    ],
  };

  onSlotAvailabilityChange(id, params) {
    this.setState({ updating: true });
    update_availability({ id, params }, this.props.navigation)
      .then((res) => {
        get_availabilities(res.availability_date).then(() => {
          this.setState({ updating: false });
          const test = res;
          this.setState({ currentAvailabilities: test });
          this.setState({ onRefresh: false });
        });
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
    moment.locale('en')
    const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const m =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const y = date.getFullYear();
    return `${y}-${m}-${d}`;
  }

  handleRefresh = () => {
    this.setState({ refreshing: true });
  };

  fetchData = () => {
    dispatch(getAllDataAction(userParamData));
    setIsFetching(false);
  };

  show(item) {
    const params = {
      availability_date: item.availability_date,
      coachId: item.coachId,
    };
    get_availabilities(params)
      .then((res) => {
        this.setState({ currentAvailabilities: res });
        this.setState({ currentAvailabilities: res[0] });
      })
      .catch((error) => {
        console.log('Api call error');
        alert(error.message);
      });

    this.setState({ currentAvailabilities: item });
    this.setState({ refresh: !this.state.refresh });
  }
  getDaysArrayByMonth(date) {
    var daysInMonth = moment(date, 'DD-MM').daysInMonth();
    var arrDays = [];
    while (daysInMonth && daysInMonth >= 1) {
      var current = moment(date, 'DD-MM').date(daysInMonth);
      arrDays.push(current);
      daysInMonth--;
    }
    return arrDays.reverse();
  }
  getAvailabilities(date) {
   get_availabilities().then((res)=>{
    this.setState({currentAvailabilities:res.data})
    this.setState({ refresh: !this.state.refresh });
   })
  }
  onMonthChange(date) {
    console.log(this.getDate(date))
    console.log('aaaaa');
    var item = [];
    console.log(this.getDate(date))
    console.log('iciii');
    var ArrayOfday = this.getDaysArrayByMonth(this.getDate(date));
    // si les availabilities n'existes pas les initialiser
    ArrayOfday.forEach((element) => {
     const  elementdaynum = moment(element).format('dd');
     const elementday = moment(element).format('D');
      element=  moment(element).format('L')
      var Object = {
        availability_day: elementdaynum,
        availability_day_num : elementday,
        availability:element

      };
      item.push(Object);
    });
    this.setState({ availabilities: item });
  }
  
  async changeTaskList(date) {

    
    const formatdata = {
      date: date.dateString,
    };
    const curDate = moment(date.dateString).format('L')
    console.log('curr',curDate)
    this.setState({currentDate:curDate})
    get_appointement(formatdata).then((res) => {
     
      const arrayOfAppointment = res.data;
      const arrayOfPage = [];
      arrayOfAppointment.forEach((rdv) => {
        arrayOfPage.push(
          <TouchableOpacity onPress={()=>{console.log(rdv)}}>
          <View style={{flexDirection:'row',justifyContent:'space-around',alignContent:'center'}}key={rdv.id}>
            <View style={{justifyContent:'center',alignItems:'center'}}><Avatar
                size="medium"
                rounded
                source={{
                  uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
                }}
              /></View>
            <View style={{flexDirection:'column',marginRight:40}}>
              <View style={{flexDirection:'row'}}>
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>{rdv.athlete.first_name}</Text>
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>{rdv.athlete.last_name}</Text>
            </View>
            <Text>seance{rdv.session_number}/{rdv.athleteCourse.total_sessions}</Text>
            </View>
            <View style={{justifyContent:'center'}}>
              <Text style={{
                  fontWeight: 'bold',
                  fontSize: 20,}} >{this.convertSlotToDate(rdv.slot)}</Text>
            </View>
          </View>
          </TouchableOpacity>
          ,
        );
      });
      this.setState({ page: arrayOfPage });
      // console.log(this.state.page);
    });
  }
  convertSlotToDate(slot) {
    switch (slot) {
      case 0:
        return '00:00 - 01:00';
        break;
      case 1:
        return '01:00 - 02:00';
        break;
      case 2:
        return '02:00 - 03:00';
        break;
      case 3:
        return '03:00 - 04:00';
        break;
      case 4:
        return '04:00 - 05:00';
        break;
      case 5:
        return '05:00 - 06:00';
        break;
      case 6:
        return '06:00 - 07:00';
        break;
      case 7:
        return '07:00 - 08:00';
        break;
      case 8:
        return '08:00 - 09:00';
        break;
      case 9:
        return '09:00 - 10:00';
        break;
      case 10:
        return '10:00 - 11:00';
        break;
      case 11:
        return '11:00 - 12:00';
        break;
      case 12:
        return '12:00 - 13:00';
        break;
      case 13:
        return '13:00 - 14:00';
        break;
      case 14:
        return '14:00 - 15:00';
        break;
      case 15:
        return '15:00 - 16:00';
        break;
      case 16:
        return '16:00 - 17:00';
        break;
      case 17:
        return '17:00 - 18:00';
        break;
      case 18:
        return '18:00 - 19:00';
        break;
      case 19:
        return '19:00 - 20:00';
        break;
      case 20:
        return '20:00 - 21:00';
        break;
      case 21:
        return '21:00 - 22:00';
        break;
      case 22:
        return '22:00 - 23:00';
        break;
      case 23:
        return '23:00 - 00:00';
        break;
      default:
        break;
    }
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
      this.setState({ refresh: true });
      console.log(this.state.refresh);
    };
    const renderItem = ({ item }) => {
      return <Item stlyes item={item} onPress={(data) => console.log(data)} />;
    };

    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <SafeAreaView>
          
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar
                size="medium"
                rounded
                source={{
                  uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
                }}
              />
              <Text
                style={{
                  marginLeft: 20,
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: '#FFFFFF',
                  lineHeight: 24,
                }}>
                {this.state.user.name}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  navigate('AwaitingDemand');
                }}
                style={{}}>
                <Ionicons name="person-add" size={35} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigate('Activite');
                }}
                style={{ marginLeft: 20, marginRight: 10 }}>
                <Ionicons
                  name="md-notifications-circle"
                  size={35}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: 20,
              borderBottomColor: '#2CDEE4',
              borderBottomWidth: 0.5,
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
                selectedColor="#1E2026"
                textColor="white"
                borderRadius={10}
                height={50}
                hasPadding
                bold={true}
                fontSize={20}
                textStyle={"italic"}
                valuePadding={3}
                borderColor="#1E2026"
              />
            </View>
            <View>{/*TO DO: passe les jours en francais  */}</View>
            {this.state.screen == 'Planning' ? (
              <View>
                <View style={{ alignItems: 'center' }}>
                  <Text
                    style={{
                      fontStyle: 'italic',
                      fontWeight: 'bold',
                      fontSize: 25,
                      color: '#FFFFFF',
                      margin: 10,
                    }}>
                    {
                    ((this.state.currentDate))}
                  </Text>
                </View>
                {this.state.page == [] ? (
                  <Text> pas de rendez-vous Aujourd'hui</Text>
                ) : (
                  <Pager pager={this.state.page} />
                )}
                <View>
                  <Calendar
                    theme={{
                      calendarBackground: '#2D333C',
                      textSectionTitleColor: 'white',
                      textSectionTitleWeight: 'bold',
                      textSectionTitleDisabledColor: '#d9e1e8',
                      selectedDayBackgroundColor: '#00adf5',
                      todayTextColor: '#00adf5',
                      dayTextColor: 'white',
                      textDisabledColor: 'grey',
                      dotColor: '#00adf5',
                      selectedDotColor: '#ffffff',
                      arrowColor: 'white',
                      monthTextColor: 'white',
                      indicatorColor: 'blue',
                      textMonthFontWeight: 'bold',
                      textDayHeaderFontWeight: '300',
                      textDayFontSize: 16,
                      textMonthFontSize: 25,
                      textDayHeaderFontSize: 16,
                    }}
                    markingType={'period'}
                    onDayPress={(day) => this.changeTaskList(day)}
                    markedDates={this.state.markedDate}
                    style={styles.calendar}
                  >
                    
                  </Calendar>
                  <TouchableOpacity
                    style={{ position: 'absolute', marginLeft:370 ,marginTop:250}}
                    onPress={() => {
                      navigate('CreateBook');
                    }}>
                    <Entypo name="circle-with-plus" size={40} color="#2CDEE4" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                {/* Dispo screen */}
                <View style={{ height: 800 }}>
                  <View style={{ flex: 1 }}>
                    <MonthsSlider onChange={this.onMonthChange.bind(this)} />
                    <View>
                      <FlatList
                        horizontal={true}
                        data={this.state.availabilities}
                        extraData={this.state}
                        // onRefresh={onRefresh}
                        refreshing={this.state.refresh}
                        keyExtractor={(item) => item.date}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                              onPress={() => {
                                this.getAvailabilities(item)
                              }}>
                          <View style={styles.day}>
                              <View style={{flexDirection:'column'}}>
                              <Text style={{ color: 'white' }}>
                                {item.availability_day}
                              </Text>
                              <Text style={{ color: 'white', marginTop:10 }}>
                                {item.availability_day_num}
                              </Text>
                              </View>
                          </View>
                            </TouchableOpacity>
                        )}
                      />

        <View>
          <Button title='filtre par heures'></Button>

          </View>
                      <FlatList
                        style={{ maxHeight: 550 }}
                        data={[this.state.currentAvailabilities]}
                        extraData={this.state}
                        //      onRefresh={onRefresh}
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
      </View>
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
    borderRadius: 30,
    padding: 10,
    marginRight: 10,
    marginTop: 20,
  },
  background: {
    backgroundColor: 'black',
   
  },
  day: {
    height: 80,
    width: 50,
    backgroundColor: '#2D333C',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
