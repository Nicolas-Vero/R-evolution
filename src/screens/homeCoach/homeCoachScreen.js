import React from 'react';
import moment from 'moment';
import Pager from '../../common/Carrousel';
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { get_availabilities } from '../../api/Availabilities';
import SwitchSelector from 'react-native-switch-selector';
import { Avatar } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import MonthsSlider from '../../components/MonthsSlider';
import { get_appointement } from '../../api/Coach';
import SwitchButton from '../../components/SwitchButton';
import {} from '../../api/Availabilities';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { loadFonts } from '../../configs/design/font';
import * as Notifications from 'expo-notifications';
import { ScrollView } from 'react-native';
import { options, LocaleConfig } from './homeCoachConfig';
import styles from './homeCoachStyle';
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);
  }
  state = {
    refresh: false,
    carousselLoad: false,
    user: { name: 'Florian GALOPIN', avatar: 'string avatar' },
    screen: 'Planning',
    user: {
      name: 'toto',
      avatar: '../../../assets/icon.png',
    },
    selectedDate: '',
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
    currentDate: '',
    selectedDate: '',
    today: '',
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
    dialogVisible: false,
  };

  sendNotificationImmediately = async (notification) => {
    // alert(JSON.parse(notification))
    console.log('=====>>>>>', notification);
    let notificationId = await Notifications.presentLocalNotificationAsync({
      title: notification?.request?.content?.title,
      body: notification?.request?.content?.body,
    });
    console.log(notificationId); // can be saved in AsyncStorage or send to server
  };

  async componentDidMount() {
    loadFonts();
    const curDate = moment().format('YYYY-MM-DD');
    this.setState({ today: curDate });
    this.changeTaskList(curDate);
    this.getAvailabilities(curDate);
    this.onMonthChange(curDate);
    this.notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('[Notification-C-Dashboard]', notification);
        this.sendNotificationImmediately(notification);
      },
    );
    this.responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('[Response-C-Dashboard]', response);
        this.sendNotificationImmediately(response);
        this.props.navigation.push('activitiesCoachScreen');
      });
  }

  componentWillUnmount() {
    Notifications.removeNotificationSubscription(this.notificationListener);
    Notifications.removeNotificationSubscription(this.responseListener);
  }

  handler(param) {
    this.getAvailabilities(param);
  }

  getDate(date = new Date()) {
    return moment(date).format('YYYY-MM-DD');
  }

  handleRefresh = () => {
    this.setState({ refreshing: true });
  };

  fetchData = () => {
    dispatch(getAllDataAction(userParamData));
    setIsFetching(false);
  };

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
    let formatdata = {};
    if (date.dateString == undefined) {
      formatdata = {
        date: date,
      };
    } else {
      formatdata = {
        date: date.dateString,
      };
    }
    this.setState({
      selectedDate: moment(date.dateString).format('YYYY-MM-DD'),
    });
    const curDate = moment(date.dateString).format('dddd D MMMM ');
    this.setState({ currentDate: curDate });

    get_appointement(formatdata).then((res) => {
      this.setState({ carousselLoad: false });
      const arrayOfAppointment = res.data;
      const arrayOfPage = [];
      arrayOfAppointment.forEach((rdv) => {
        arrayOfPage.push({
          firstname: rdv?.athlete?.first_name,
          Avatar:
            '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
          lastname: rdv.athlete.last_name,
          session_number: rdv?.session_number,
          total_sessions: rdv?.athleteCourse?.total_sessions,
          slot: rdv?.slot,
        });
      });
      this.setState({ page: arrayOfPage });
      this.setState({ carousselLoad: true });
      // console.log(this.state.page);
    });
  }

  onOpenDialog = () => {
    this.setState({ dialogVisible: true });
  };

  onDismissDialog = () => {
    this.setState({ dialogVisible: !this.state.dialogVisible });
  };

  onFilterTimes = () => {
    this.onDismissDialog();
  };
  renderDialog() {
    return (
      <TreshRequestDialog
        dialogVisible={this.state.dialogVisible}
        onClose={() => this.onDismissDialog()}
        onValidate={() => this.onValidate()}
      />
    );
  }

  renderPlanning = () => {
    const selected = this.state.selectedDate;
    return (
      <View>
        <View style={styles.tabContainer}>
          <Text style={styles.currentDateText}>
            {this.state.currentDate.toUpperCase()}
          </Text>
        </View>
        <View>
          <View style={styles.alignCenter}>
            {this.state.page.length == 0 ? (
              <View style={styles.noAppointmentContainer}>
                <Text style={styles.noAppointmentText}>
                  Aucun rendez-vous prévu ce jour-là
                </Text>
              </View>
            ) : this.state.carousselLoad ? (
              <Pager pager={this.state.page} />
            ) : (
              <View style={styles.appointmentLoader}>
                <ActivityIndicator />
              </View>
            )}
          </View>
          <View style={styles.calendarContainer}>
            <ScrollView>
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
                  },
                }}
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
                style={styles.calendar}
              />
            </ScrollView>
            <TouchableOpacity
              style={styles.addBookContainer}
              onPress={() => {
                navigate('createBookCoachScreen');
              }}>
              <Image
                source={require('../../../assets/images/Group_8766.png')}
                style={styles.addBookImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  renderAvailability = () => {
    const curDate = moment().format('YYYY-MM-DD');
    return (
      <View style={{ height: heightPercentageToDP(50) }}>
        <View>
          <MonthsSlider onChange={this.onMonthChange.bind(this)} />
          <View style={{ marginBottom: 34 }}>
            <FlatList
              horizontal={true}
              data={this.state.availabilities}
              extraData={this.state}
              // onRefresh={onRefresh}
              refreshing={this.state.refresh}
              keyExtractor={(item) => item?.date}
              renderItem={({ item }) => {
                const borderWidth = item?.availability === curDate ? 2 : 0;
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
                        styles.dayContainer,
                        { backgroundColor: backgroundColor },
                        { borderWidth: borderWidth },
                      ]}>
                      <View style={styles.dayTextContainer}>
                        <Text
                          style={[
                            styles.dayText,
                            {
                              color: textColor,
                            },
                          ]}>
                          {item.availability_day}
                        </Text>
                        <Text
                          style={[
                            styles.dayTextNum,
                            {
                              color: textColor,
                            },
                          ]}>
                          {item?.availability_day_num}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
            <View style={styles.filterContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.openDialog();
                }}>
                <Image
                  style={styles.filterImage}
                  source={require('../../../assets/images/filtre.png')}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              style={{ maxHeight: heightPercentageToDP(50), marginTop: 5 }}
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
    );
  };
  render() {
    const selected = this.state.selectedDate;
    const curDate = moment().format('YYYY-MM-DD');
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <View style={{ marginTop: 20 }}>
            <View style={styles.headerLeft}>
              <TouchableOpacity
                onPress={() => {
                  navigate('AccountScreen');
                }}>
                <View style={styles.userInfoContainer}>
                  <Avatar
                    size={37}
                    rounded
                    source={{
                      uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/photo_florian_coach.png',
                    }}
                  />
                  <Text style={styles.username}>{this.state.user.name}</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.headerRight}>
                <TouchableOpacity
                  onPress={() => {
                    navigate('pendingRequestCoachScreen');
                  }}>
                  <Image
                    style={styles.headerRightImage}
                    source={require('../../../assets/images/Demande.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigate('ActivitiesCoachScreen');
                  }}
                  style={styles.headerRightActivities}>
                  <Image
                    style={styles.headerRightImage}
                    source={require('../../../assets/images/Notif.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.headerBorder}></View>
          <View>
            <View style={styles.alignCenter}>
              <SwitchSelector
                options={options}
                initial={0}
                onPress={(value) => this.setState({ screen: value })}
                backgroundColor="#1E2026"
                buttonColor="#2CDEE4"
                selectedColor="#1E2026"
                textColor="white"
                borderRadius={10}
                height={38}
                style={{ width: widthPercentageToDP(100) }}
                hasPadding
                fontSize={13}
                selectedTextStyle={{
                  fontFamily: 'MontserratBoldItalic',
                  lineHeight: 15,
                }}
                textStyle={{
                  fontFamily: 'MontserratBoldItalic',
                  lineHeight: 15,
                }}
                valuePadding={3}
                borderColor="#1E2026"
              />
            </View>
            <View>{/*TO DO: passe les jours en francais  */}</View>
            {this.state.screen == 'Planning'
              ? this.renderPlanning()
              : this.renderAvailability()}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
