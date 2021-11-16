import { Animated } from 'react-native';
import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import * as Notifications from 'expo-notifications';
import AuthService from '../../services/AuthService';
import { get_athlete_active_appointement } from '../../api/Athlete';
import { get_coach_by_id } from '../../api/Coach';
import { loadFonts } from '../../configs/design/font';
import {
  athlete_booking,
  get_athlete_active_courses,
  get_availabilities,
} from '../../api/Athlete';
import moment from 'moment';

export default class HomeAhleteController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      scroll: new Animated.Value(0),
      userGrade: null,
      refresh: false,
      screen: 'MES RENDEZ-VOUS',
      user: {},
      coach_id: '',
      coach: {},
      currentDate: '',
      modalVisible: false,
      currentAvailabilities: [],
      book: [],
      currentItem: [],
      availabilities: [],
      athleteCourse: {},
      currentSlot: '',
      dayApointement: [],
      upcomingApointement: [],
    };
  }

  async componentDidMount() {
    try {
      this.notificationListener = Notifications.addNotificationReceivedListener(
        (notification) => {
          console.log('[Notification-A-Dashboard]', notification);
          this.sendNotificationImmediately(notification);
        },
      );
      this.responseListener =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log('[Response-A-Dashboard]', response);
          this.sendNotificationImmediately(response);
          this.props.navigation.push('Activitie');
        });
    } catch (error) {
      console.log('[Error]', error);
    }

    await loadFonts();
    let user = await AuthService.getUser();
    try {
      this.component.setState({ coach_id: user.coach?.coach_id });
      this.component.setState({ user: user });
      get_athlete_active_courses().then((res) => {
        this.component.setState({ athleteCourse: res.data });
      });
      const curDate = moment().format('YYYY-MM-DD');
      this.onMonthChange(curDate);

      get_coach_by_id(this.component.state.coach_id).then((res) => {
        this.component.setState({
          coach: {
            id: res.data.id,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
          },
        });
      });

      get_athlete_active_appointement({ today: true }).then((res) => {
        this.component.setState({ dayApointement: res.data });
      });
      get_athlete_active_appointement({ upcoming: true }).then((res) => {
        const data = res.data.map((item, index) => {
          console.log(item);
          if (index == 0) {
            return { ...item, show: true };
          } else {
            return item?.date === res.data[index - 1].date
              ? { ...item, show: false }
              : { ...item, show: true };
          }
        });
        this.component.setState({ upcomingApointement: data });
      });
    } catch (error) {
      console.log(error);
    }

    this.component.setState({ user: user });
  }

  componentWillUnmount() {
    Notifications.removeNotificationSubscription(this.notificationListener);
    Notifications.removeNotificationSubscription(this.responseListener);
  }

  getDate = (date = new Date()) => {
    return moment(date).format('YYYY-MM-DD');
  };

  getDaysArrayByMonth = (date) => {
    var daysInMonth = moment(date, 'DD-MM').daysInMonth();
    var arrDays = [];
    while (daysInMonth && daysInMonth >= 1) {
      var current = moment(date, 'DD-MM').date(daysInMonth);
      arrDays.push(current);
      daysInMonth--;
    }
    return arrDays.reverse();
  };
  getAvailabilities = (item) => {
    const date = moment(item?.availability).format('YYYY-MM-DD');
    const params = { date: date, coach_id: this.component.state.coach_id };
    get_availabilities(params).then((res) => {
      const availabilitiesArray = [];
      const data = [
        { slot: 0, value: res.data.slot_0 },
        { slot: 1, value: res.data.slot_1 },
        { slot: 2, value: res.data.slot_2 },
        { slot: 3, value: res.data.slot_3 },
        { slot: 4, value: res.data.slot_4 },
        { slot: 5, value: res.data.slot_5 },
        { slot: 6, value: res.data.slot_6 },
        { slot: 7, value: res.data.slot_7 },
        { slot: 8, value: res.data.slot_8 },
        { slot: 9, value: res.data.slot_9 },
        { slot: 10, value: res.data.slot_10 },
        { slot: 11, value: res.data.slot_11 },
        { slot: 12, value: res.data.slot_12 },
        { slot: 13, value: res.data.slot_13 },
        { slot: 14, value: res.data.slot_14 },
        { slot: 15, value: res.data.slot_15 },
        { slot: 16, value: res.data.slot_16 },
        { slot: 17, value: res.data.slot_17 },
        { slot: 18, value: res.data.slot_18 },
        { slot: 19, value: res.data.slot_19 },
        { slot: 20, value: res.data.slot_20 },
        { slot: 21, value: res.data.slot_21 },
        { slot: 22, value: res.data.slot_22 },
        { slot: 23, value: res.data.slot_23 },
      ];
      data.forEach((element) => {
        if (element.value == true) {
          availabilitiesArray.push(element);
        }
      });
      this.component.setState({ currentAvailabilities: availabilitiesArray });
      this.component.setState({ refresh: !this.component.state.refresh });
      console.log(this.component.state.currentAvailabilities);
    });
  };

  onMonthChange = (date) => {
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
    this.component.setState({ availabilities: item });
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
}
