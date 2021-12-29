import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import moment from 'moment';
import { get_availabilities } from '../../api/Availabilities';
import { get_appointement } from '../../api/Coach';
import * as Notifications from 'expo-notifications';
import AuthService from '../../services/AuthService';
import XDate from 'xdate';
import { get_public_request } from '../../api/Request';

import { slots } from '../../helpers/dateHelper';

export default class HomeCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      refresh: false,
      carousselLoad: false,
      currentMonth: new XDate(),
      MonthBookingNumberPerDay: [],
      user: {},
      screen: 'Planning',
      currentDate: '',
      selectedDate: moment(new Date()).format('YYYY-MM-DD'),
      today: '',
      currentAvailabilities: [],
      availabilities: [],
      page: [],
      publicRequest: 0,
      dialogVisible: false,
      todayIndex: null,
      refrehing: false,
    };
  }

  sendNotificationImmediately = async (notification) => {
    // alert(JSON.parse(notification))
    let notificationId = await Notifications.presentLocalNotificationAsync({
      title: notification?.request?.content?.title,
      body: notification?.request?.content?.body,
    });
  };

  async componentDidMount() {
    this.component.listRef = null;
    const user = await AuthService.getUser();
    this.component.setState({ user });
    const curDate = moment().format('YYYY-MM-DD');
    this.component.setState({ today: curDate });
    this.changeTaskList(curDate);
    this.onMonthChange(curDate, true);
    get_public_request().then((res) => {
      this.component.setState({ publicRequest: res.data.requests.length });
    });
    this.getAvailabilities(curDate);
    this.component.notificationListener =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log('[Notification-C-Dashboard]', notification);
        this.sendNotificationImmediately(notification);
      });
    this.component.responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('[Response-C-Dashboard]', response);
        this.sendNotificationImmediately(response);
        this.component.props.navigation.push('activitiesCoachScreen');
      });
  }
  componentDidUpdate(prevProps) {
    if (
      this.component.props.isFocused &&
      prevProps.isFocused !== this.component.props.isFocused
    ) {
      get_public_request()
        .then((res) => {
          this.component.setState({ publicRequest: res.data.requests.length });
        })
        .then(() => {
          this.component.setState({ loaded: true });
        });
    }
  }

  componentWillUnmount() {
    Notifications.removeNotificationSubscription(
      this.component.notificationListener,
    );
    Notifications.removeNotificationSubscription(
      this.component.responseListener,
    );
  }

  handler = (param) => {
    this.getAvailabilities(param.date);
  };

  getDate(date = new Date()) {
    return moment(date).format('YYYY-MM-DD');
  }
  month(xd) {
    const year = xd.getFullYear(),
      month = xd.getMonth();
    const days = new Date(year, month + 1, 0).getDate();

    const firstDay = new XDate(year, month, 1, 0, 0, 0, true);
    const lastDay = new XDate(year, month, days, 0, 0, 0, true);
    return this.fromTo(firstDay, lastDay);
  }

  fromTo(a, b) {
    const days = [];
    let from = +a,
      to = +b;
    for (; from <= to; from = new XDate(from, true).addDays(1).getTime()) {
      days.push(new XDate(from, true));
    }
    return days;
  }

  handleRefresh = () => {
    this.component.setState({ refreshing: true });
  };

  fetchData = async () => {
    this.component.setState({ refreshing: true });
    const date = moment(this.component.state.selectedDate).format('YYYY-MM-DD');
    const avaibilities = await get_availabilities(date);
    if (avaibilities.status === 200) {
      this.component.setState({
        currentAvailabilities: { avaibilities: avaibilities.data, day: date },
      });
    }

    this.component.setState({ refreshing: false });
  };

  getDaysArrayByMonth(date) {
    var daysInMonth = moment(date).daysInMonth();
    var arrDays = [];
    while (daysInMonth && daysInMonth >= 1) {
      var current = moment(date).date(daysInMonth);
      arrDays.push(current);
      daysInMonth--;
    }
    return arrDays.reverse();
  }

  getAvailabilities(item) {
    const date = moment(item).format('YYYY-MM-DD');
    get_availabilities(date).then((res) => {
      this.component.setState({
        currentAvailabilities: { avaibilities: res.data, day: date },
      });
      this.component.setState({ refresh: !this.component.state.refresh });
    });
  }

  onMonthChange = (date, isMount) => {
    var item = [];
    var ArrayOfday = this.getDaysArrayByMonth(
      moment(date).format('YYYY-MM-DD'),
    );
    let todayIndex = 0;
    ArrayOfday.forEach((element, index) => {
      if (this.component.state.today === moment(element).format('YYYY-MM-DD'))
        todayIndex = index;
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
    if (isMount) {
      this.scrollToIndex(todayIndex, true);
    }
  };

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
    this.component.setState({
      selectedDate: moment(date.dateString).format('YYYY-MM-DD'),
    });
    const curDate = moment(date.dateString).format('dddd D MMMM ');
    this.component.setState({ currentDate: curDate });

    get_appointement(formatdata).then((res) => {
      this.component.setState({ carousselLoad: false });
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
      this.component.setState({ page: arrayOfPage });
      this.component.setState({ carousselLoad: true });
    });
  }

  onOpenDialog = () => {
    this.component.setState({ dialogVisible: true });
  };

  onDismissDialog = () => {
    this.component.setState({ dialogVisible: !this.state.dialogVisible });
  };

  onFilterTimes = () => {
    this.onDismissDialog();
  };

  scrollToIndex = (index, animated) => {
    setTimeout(() => {
      this.component.listRef &&
        this.component.listRef.scrollToIndex({ animated, index });
    }, 3000);
  };

  onLinePress = (time) => {
    const values = Object.values(slots);
    const slot = values.indexOf(time);
    this.component.props.navigation.navigate('CreateBookCoachScreen', {
      time,
      slot,
      date: this.component.state.selectedDate,
    });
  };
}
