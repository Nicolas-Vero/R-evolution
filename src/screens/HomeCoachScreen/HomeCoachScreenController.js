import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import moment from 'moment';
import { get_availabilities_v2 } from '../../api/Availabilities';
import {
  get_appointement,
  get_appointement_calendar,
  get_appointment_by_athlete_id,
  get_coachAthlete_status,
} from '../../api/Coach';
import * as Notifications from 'expo-notifications';
import AuthService from '../../services/AuthService';
import XDate from 'xdate';
import { get_public_request } from '../../api/Request';

import { slots } from '../../helpers/dateHelper';
import { get_commercial_by_id } from '../../api/Commercial';

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
      today: moment().format('YYYY-MM-DD'),
      currentAvailabilities: null,
      slots: [],
      availabilities: [],
      page: [],
      publicRequest: 0,
      dialogVisible: false,
      todayIndex: null,
      refrehing: false,
      reload: false,
    };
  }

  async componentDidMount() {
    const curDate = moment().format('YYYY-MM-DD');
    this.component.listRef = null;
    const user = await AuthService.getUser();
    this.component.setState({ user });
    this.changeTaskList(curDate);
    this.onMonthChange(curDate, true);
    const res = await get_public_request();
    if (res.status === 200) {
      this.component.setState({ publicRequest: res.data.requests.length });
    }
    await this.getAvailabilities(curDate);

    const bookingPerday = [];
    const dayOfMonth = this.month(this.component.state.currentMonth);
    for (let element of dayOfMonth) {
      const appointement = await get_appointement_calendar(
        moment(new Date(element)).format('YYYY-MM-DD'),
      );
      bookingPerday.push(appointement.data.length);
    }

    this.component.setState({
      MonthBookingNumberPerDay: bookingPerday,
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

  handler = async (date) => {
    await this.getAvailabilities(date);
  };

  getDate(date = new Date()) {
    return moment(date).format('YYYY-MM-DD');
  }
  month = (xd) => {
    const year = xd.getFullYear(),
      month = xd.getMonth();
    const days = new Date(year, month + 1, 0).getDate();

    const firstDay = new XDate(year, month, 1, 0, 0, 0, true);
    const lastDay = new XDate(year, month, days, 0, 0, 0, true);
    return this.fromTo(firstDay, lastDay);
  };

  fromTo = (a, b) => {
    const days = [];
    let from = +a,
      to = +b;
    for (; from <= to; from = new XDate(from, true).addDays(1).getTime()) {
      days.push(new XDate(from, true));
    }
    return days;
  };

  handleRefresh = () => {
    this.component.setState({ refreshing: true });
  };

  fetchData = async () => {
    this.component.setState({ refreshing: true });
    const date = moment(this.component.state.selectedDate).format('YYYY-MM-DD');
    await this.getAvailabilities(date);

    const requests = await get_public_request();
    if (requests.status === 200) {
      this.component.setState({ publicRequest: requests.data.requests.length });
    }

    this.component.setState({ refreshing: false });
  };

  getDaysArrayByMonth = (date) => {
    let daysInMonth = moment(date).daysInMonth();
    const arrDays = [];
    while (daysInMonth && daysInMonth >= 1) {
      const current = moment(date).date(daysInMonth);
      arrDays.push(current);
      daysInMonth--;
    }
    return arrDays.reverse();
  };

  getAvailabilities = async (item) => {
    const date = moment(item).format('YYYY-MM-DD');
    const res = await get_availabilities_v2(date);
    if (res.status == 200) {
      this.component.setState({
        currentAvailabilities: {
          slots: res.data.slots,
          day: date,
          refresh: !this.component.state.refresh,
        },
      });
    }
  };

  onMonthChange = (date, isMount) => {
    const item = [];
    const ArrayOfday = this.getDaysArrayByMonth(
      moment(date).format('YYYY-MM-DD'),
    );
    let todayIndex = null;
    ArrayOfday.forEach((element, index) => {
      if (this.component.state.today === moment(element).format('YYYY-MM-DD')) {
        todayIndex = index;
      }

      item?.push({
        availability_day: moment(element).format('dd'),
        availability_day_num: moment(element).format('D'),
        availability: moment(element).format('YYYY-MM-DD'),
      });
    });
    this.component.setState({ availabilities: item });
    if (isMount && todayIndex) {
      this.scrollToIndex(todayIndex, true);
    }
  };

  async changeTaskList(date) {
    const formatdata = {
      date: date.dateString || date,
    };

    this.component.setState({
      selectedDate: moment(date.dateString).format('YYYY-MM-DD'),
    });
    this.component.setState({
      currentDate: moment(date.dateString).format('dddd D MMMM '),
    });

    const res = await get_appointement(formatdata);
    if (res.status === 200) {
      this.component.setState({ carousselLoad: false });
      const arrayOfPage = [];
      res.data.forEach((rdv) => {
        if (rdv.athlete) {
          arrayOfPage.push({ rdv });
        }
      });
      arrayOfPage.sort((a, b) =>
        a.rdv?.slot > b.rdv?.slot ? 1 : b.rdv?.slot > a.rdv?.slot ? -1 : 0,
      );
      this.component.setState({ page: arrayOfPage, carousselLoad: true });
    }
  }

  openDialog = () => {
    this.component.setState({ dialogVisible: true });
  };

  onDismissDialog = () => {
    this.component.setState({
      dialogVisible: !this.component.state.dialogVisible,
    });
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
      cb: this.getAvailabilities,
    });
  };

  onAthletePress = async (athlete) => {
    // TODO recuperer également le slot et la date et l'ajouter a l'objet athlete
    const book = await get_appointment_by_athlete_id(athlete.id);
    if (book.status === 200) {
      athlete.book = book.data;
    }
    const data = await get_coachAthlete_status(athlete.id);
    if (data.status === 200) {
      athlete.status = data.data.status;
    }
    if (athlete.commercial_id) {
      const commercial = await get_commercial_by_id(athlete.commercial_id);
      if (commercial.status === 200) {
        athlete.commercial = {
          first_name: commercial.data.commercial.first_name,
          last_name: commercial.data.commercial.last_name,
        };
      }
    }
    this.component.props.navigation.navigate('AthleteSheetCoachScreen', {
      item: athlete,
      date: this.component.state.selectedDate,
      cb: this.getAvailabilities,
    });
  };
  bookingInMonth = async (addSubMonth) => {
    const bookingPerday = [];
    const dayOfMonth = this.month(
      this.component.state.currentMonth.addMonths(addSubMonth, true),
    );
    for (let element of dayOfMonth) {
      const appointement = await get_appointement_calendar(
        moment(new Date(element)).format('YYYY-MM-DD'),
      );
      bookingPerday.push(appointement.data.length);
    }
    this.component.setState({
      MonthBookingNumberPerDay: bookingPerday,
    });
  };
}
