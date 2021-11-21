import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import moment from 'moment';
import { get_availabilities } from '../../api/Availabilities';
import { get_appointement } from '../../api/Coach';
import * as Notifications from 'expo-notifications';
import { options, LocaleConfig } from './homeCoachConfig';
import AuthService from '../../services/AuthService';

export default class HomeCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      refresh: false,
      carousselLoad: false,
      user: {},
      screen: 'Planning',

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
        {
          coachId: 1,
          date: '2018-07-20',
          content: 'fix door',
          slot: '12H-13H',
        },
        {
          coachId: 1,
          date: '2018-07-20',
          content: 'masonary',
          slot: '12H-13H',
        },
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
      availabilities: [],
      page: [],
      dialogVisible: false,
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
    const user = await AuthService.getUser();
    console.log('user', user);
    this.component.setState({ user });
    const curDate = moment().format('YYYY-MM-DD');
    this.component.setState({ today: curDate });
    this.changeTaskList(curDate);
    this.getAvailabilities(curDate);
    this.onMonthChange(curDate);
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

  handleRefresh = () => {
    this.component.setState({ refreshing: true });
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
      this.component.setState({ currentAvailabilities: res.data });
      this.component.setState({ refresh: !this.component.state.refresh });
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
    this.component.setState({ availabilities: item });
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
      console.log('arrayOfPage', arrayOfPage);
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
}
