import React from 'react';
import moment from 'moment';
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
  ActivityIndicator
} from 'react-native';
import {
  get_availabilities,
  update_availability,
} from '../api/Availabilities';
import SwitchSelector from 'react-native-switch-selector';
import { Avatar } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
const { width } = Dimensions.get('window');
import { LocaleConfig } from 'react-native-calendars';
import MonthsSlider from '../components/MonthsSlider';
import { get_appointement } from '../api/Coach';
import SwitchButton from '../components/SwitchButton';
import {} from '../api/Availabilities';
import { FrenchConfig } from '../components/FrenchCalendar';
import {
  heightPercentageToDP,
widthPercentageToDP,
} from 'react-native-responsive-screen';
import { loadFonts } from '../configs/design/font';
import { Right } from 'native-base';
import * as Notifications from 'expo-notifications';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'JANVIER',
    'FÉVRIER',
    'MARS',
    'AVRIL',
    'MAI',
    'JUIN',
    'JUILLET',
    'AOÛT',
    'SEPTEMBRE',
    'OCTOBRE',
    'NOVEMBRE',
    'DÉCEMBRE',
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
  dayNamesShort: ['D', 'L', 'M', 'ME', 'J', 'V', 'S'],
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
 moment.locale('fr', {
  months:
    'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split(
      '_',
    ),
  monthsShort:
    'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
  monthsParseExact: true,
  weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
  weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
  weekdaysMin: 'D_L_M_ME_J_V_S'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[Aujourd’hui à] LT',
    nextDay: '[Demain à] LT',
    nextWeek: 'dddd [à] LT',
    lastDay: '[Hier à] LT',
    lastWeek: 'dddd [dernier à] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'dans %s',
    past: 'il y a %s',
    s: 'quelques secondes',
    m: 'une minute',
    mm: '%d minutes',
    h: 'une heure',
    hh: '%d heures',
    d: 'un jour',
    dd: '%d jours',
    M: 'un mois',
    MM: '%d mois',
    y: 'un an',
    yy: '%d ans',
  },
  dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
  ordinal: function (number) {
    return number + (number === 1 ? 'er' : 'e');
  },
  meridiemParse: /PD|MD/,
  isPM: function (input) {
    return input.charAt(0) === 'M';
  },
  // In case the meridiem units are not separated around 12, then implement
  // this function (look at locale/id.js for an example).
  // meridiemHour : function (hour, meridiem) {
  //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
  // },
  meridiem: function (hours, minutes, isLower) {
    return hours < 12 ? 'PD' : 'MD';
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4, // Used to determine first week of the year.
  },
 });
const options = [
  { label: 'PLANNING', value: 'Planning' },
  { label: 'DISPONIBILITÉS', value: 'Disponibilite' },
];
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this)
    
  }
  state = {
    refresh: false,
    carousselLoad:false,
    user: { name: 'Florian GALOPIN', avatar: 'string avatar' },
    screen: 'Planning',
    user: {
      name: 'toto',
      avatar: '../../assets/icon.png',
    },
    selectedDate:'',
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
    selectedDate:'',
    today:'',
    currentAvailabilities: [],
  //   markedDate: [
  //     '2021-07-15',
  //     '2021-05-16',
  //     '2021-05-21',
  //     '2021-05-22',
  //     '2021-05-23',
  //     '2021-05-24' ,
  //     '2021-05-25',
  // ],
    markedDate: {
      '2021-07-15': { marked: true, dotColor: 'blue' },
      '2021-05-16': { marked: true, dotColor: '#50cebb' },
      '2021-05-23': {
        color: '#70d7c7',
        textColor: 'white',
        marked: true,
        dotColor: 'white',
      },
    },

    // ajouter le coach id pour pouvoir associe des dispo a un coacg
    availabilities: [],
    page: [],
  };


  async componentDidMount(){
    loadFonts();
   const curDate = moment().format('YYYY-MM-DD')
   console.log('curr',curDate) 
   this.setState({today:curDate})
    
    this.notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('[Notification-C-Dashboard]', notification);
    });
    this.responseListener = Notifications.addNotificationResponseReceivedListener(response => {
        console.log('[Response-C-Dashboard]', response);
        this.props.navigation.push('Activitie');
    });
  }

  componentWillUnmount () {
    Notifications.removeNotificationSubscription(this.notificationListener);
    Notifications.removeNotificationSubscription(this.responseListener);
  }

  handler(param) {
    this.getAvailabilities(param);
  }

  getSlot(time, status, item, slots) {
    const { disabled } = this.props;
    return (
      <View style={styles.container}>
        <ResponsiveText style={{ fontSize: '4%', color: 'white' }}>
          {time}
        </ResponsiveText>
        {status == false ? (
          <ResponsiveText style={{ fontSize: '4%', color: 'white' }}>
            indisponible
          </ResponsiveText>
        ) : (
          <ResponsiveText style={{ fontSize: '4%', color: '#2CDEE4' }}>
            Disponible
          </ResponsiveText>
        )}
        <CheckBox
          size={40}
          containerStyle={{
            paddingLeft: 0,
            marginLeft: 0,
            backgroundColor: 'transparent',
            borderWidth: 0,
          }}
          checkedColor="#2CDEE4"
          checkedIcon="dot-circle-o"
          uncheckedIcon="dot-circle-o"
          checked={status === true}
          value={status}
          onPress={() => {
            update_availabilities({ slots, date: item.date }).then(() => {
              get_availabilities(item.date);
            });
            update_availabilities(onChangeParams).then(get_availabilities())
          }}
        />
      </View>
    );
  }

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
    return  moment(date).format('YYYY-MM-DD');
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
      availability_date: item?.availability_date,
      coachId: item?.coachId,
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
  getAvailabilities(item) {
    const date = moment(item).format('YYYY-MM-DD');
    get_availabilities(date).then((res) => {
      this.setState({ currentAvailabilities: res.data });
      this.setState({ refresh: !this.state.refresh });
    });
  }
  onMonthChange(date) {
    var item = [];
    var ArrayOfday = this.getDaysArrayByMonth(this.getDate(date));
    ArrayOfday.forEach((element) => {
      const elementdaynum = moment(element).format('dd');
      const elementday = moment(element).format('D');
      element = moment(element).format('YYYY-MM-DD');
      var Object = {
        availability_day: elementdaynum,
        availability_day_num: elementday,
        availability: element,
      };
      item?.push(Object);
    });
    this.setState({ availabilities: item });
  }

  async changeTaskList(date) {
    const formatdata = {
      date: date.dateString,
    };
    this.setState({
      selectedDate: moment(date.dateString).format('YYYY-MM-DD'),
    });
    const curDate = moment(date.dateString).format('dddd D MMMM ');
    this.setState({ currentDate: curDate });

    get_appointement(formatdata).then((res) => {
      this.setState({carousselLoad:false})
      const arrayOfAppointment = res.data;
      const arrayOfPage = [];
      arrayOfAppointment.forEach((rdv) => {
        arrayOfPage.push({
          firstname: rdv.athlete.first_name,
          Avatar:
            '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
          lastname: rdv.athlete.last_name,
          session_number: rdv.session_number,
          total_sessions: rdv.athleteCourse.total_sessions,
          slot: rdv.slot
        });
      });
      this.setState({ page: arrayOfPage })
      this.setState({carousselLoad:true})
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
    const selected = this.state.selectedDate;
    const dates  =  this.state.markedDate;
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <SafeAreaView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigate('Account');
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 16,
                }}>
                <Avatar
                  size={40}
                  rounded
                  source={{
                    uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/photo_florian_coach.png',
                  }}
                />
                <Text
                  style={{
                    marginLeft: 6,
                    fontFamily: 'RobotoMedium',
                    fontSize: 16,
                    color: '#FFFFFF',
                    lineHeight: 24,
                  }}>
                  {this.state.user.name}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  navigate('AwaitingDemand');
                }}>
                <Image
                  style={{ height: 38, width: 48, resizeMode: 'contain' }}
                  source={require('../../assets/images/Demande.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigate('Activitie');
                }}
                style={{ marginLeft: 20, marginRight: 10 }}>
                <Image
                  style={{ height: 38, width: 48, resizeMode: 'contain' }}
                  source={require('../../assets/images/Notif.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: 15,
              borderBottomColor: '#2CDEE4',
              borderBottomWidth: 0.5,
              marginBottom: 25,
            }}></View>
          <View>
            <View></View>
            <View style={{ alignItems: 'center' }}>
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
                style={{ width: widthPercentageToDP(92) }}
                hasPadding
                fontSize={15}
                selectedTextStyle={{ fontFamily: 'MontserratBoldItalic' }}
                textStyle={{ fontFamily: 'MontserratBoldItalic' }}
                valuePadding={3}
                borderColor="#1E2026"
              />
            </View>
            <View>{/*TO DO: passe les jours en francais  */}</View>
            {this.state.screen == 'Planning' ? (
              <View>
                <View style={{ alignItems: 'center', marginTop: 16 }}>
                  <Text
                    style={{
                      fontFamily: 'MontserratBoldItalic',
                      fontSize: 18,
                      color: '#FFFFFF',
                      marginVertical: 10,
                      paddingBottom: 10,
                    }}>
                    {this.state.currentDate.toUpperCase()}
                  </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  {this.state.page == [] ? (
                    <Text> pas de rendez-vous Aujourd'hui</Text>
                  ) : (
                    this.state.carousselLoad?(    <Pager pager={this.state.page} />):(
                      <View style={{ height:180, width:widthPercentageToDP(94), alignItems:'center'}}>
                        <ActivityIndicator/>
                      </View>
                    )
                   
                  )}
                </View>
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                  <Calendar
                    theme={{
                      
                      calendarBackground: '#1E2026',
                      textSectionTitleColor: 'white',
                      textSectionTitleWeight: 'bold',
                      textSectionTitleDisabledColor: '#d9e1e8',
                      selectedDayBackgroundColor: '#2CDEE4',
                      todayTextColor: '#2CDEE4',
                      dayTextColor: 'white',
                      textDisabledColor: 'grey',
                      arrowColor: 'white',
                      monthTextColor: 'white',
                      indicatorColor: '#2CDEE4',
                      textDayFontFamily: 'Montserrat',
                      textMonthFontFamily: 'MontserratBoldItalic',
                      textDayHeaderFontFamily: 'MontserratMedium',
                      textDayFontSize: 16,
                      textMonthFontSize: 22,
                      textDayHeaderFontSize: 16,
                    }}
                    enableSwipeMonths={true}
                    firstDay={1}
                    markingType={'custom'}
                    markedDates={{
    
                      [selected]: {
                      selected: true,
                      selectedColor: '#2CDEE4',
                      selectedTextColor: 'black',
                    },}}
                    // dayComponent={({date, state}) => {
                    //   return (
                    //     <View>
                    //       <Text style={[styles.customDay, state === 'disabled' ? styles.disabledText : styles.defaultText]}>
                    //         {date.day}
                    //       </Text>
                    //     </View>
                    //   );
                    // }}
                    onDayPress={(day) => this.changeTaskList(day)}
                    style={styles.calendar}/>
                </View>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    alignItems: 'flex-end',
                    left: widthPercentageToDP(90),
                    top: heightPercentageToDP(50),
                  }}
                  onPress={() => {
                    navigate('CreateBook');
                  }}>
                  <Image
                    source={require('../../assets/images/Group_8766.png')}></Image>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <View style={{ height: 800 }}>
                  <View>
                    <MonthsSlider onChange={this.onMonthChange.bind(this)} />
                    <View style={{ marginBottom: 20 }}>
                      <FlatList
                        style
                        horizontal={true}
                        data={this.state.availabilities}
                        extraData={this.state}
                        // onRefresh={onRefresh}
                        refreshing={this.state.refresh}
                        keyExtractor={(item) => item?.date}
                        renderItem={({ item }) => {
                          const backgroundColor =
                            item.availability === this.state.selectedDate
                              ? '#2CDEE4'
                              : '#1E2026';
                          const textColor =
                            item.availability === this.state.selectedDate
                              ? 'black'
                              : 'white';
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({
                                  selectedDate: item?.availability,
                                });
                                this.getAvailabilities(item?.availability);
                              }}>
                              <View
                                style={[
                                  styles.day,
                                  { backgroundColor: backgroundColor },
                                ]}>
                                <View
                                  style={{
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      color: textColor,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      alignContent: 'center',
                                    }}>
                                    {item.availability_day}
                                  </Text>
                                  <Text
                                    style={{
                                      color: textColor,
                                      marginTop: 10,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      alignContent: 'center',
                                    }}>
                                    {item?.availability_day_num}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          );
                        }}
                      />

                      <View>
                        <TouchableOpacity>
                          <Image
                            style={{
                              resizeMode: 'contain',
                              width: widthPercentageToDP(40),
                              height: 50,
                              marginLeft: 18,
                              marginTop: 8,
                            }}
                            source={require('../../assets/images/filtre.png')}
                          />
                        </TouchableOpacity>
                      </View>
                      <FlatList
                        style={{ maxHeight: 550 }}
                        data={[this.state.currentAvailabilities]}
                        extraData={this.state}
                        //      onRefresh={onRefresh}
                        refreshing={this.state.refresh}
                        // keyExtractor={(item) => {item?.date;}}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item }) => (
                          <SwitchButton item={item} handler={this.handler} />
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
    backgroundColor: '#1E2026',
    borderRadius: 25,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  calendar: {
    borderRadius: 13,
    paddingLeft:30,
    paddingRight:30,
    marginTop: 18,
    width: widthPercentageToDP(94),
  },
  background: {
    backgroundColor: 'black',
  },
  day: {
    height: 70,
    width: 50,
    marginHorizontal: 5,
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
