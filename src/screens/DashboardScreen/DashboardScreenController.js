import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import moment from 'moment';
export default class DashboardScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      screen: 'CA',
      selectedMonth: null,
      selectedMonthIndex: null,
      turnOver: {
        current: 50,
        goal: 100,
        percentage: 50,
      },
      sales: {
        total: 10,
        new: 5,
        renew: 5,
        percentage: 50,
      },
      prospects: {
        total: 20,
        converted: 10,
        notConverted: 10,
        percentage: 50,
      },
      yearCA: [1200, 500, 800, 0, 400, 1600, 700, 1000, 0, 0, 1000, 1000],
    };
  }

  componentDidMount = () => {
    const curDate = moment().format('YYYY-MM-DD');
    this.onMonthChange(curDate);
    this.definePercent(
      this.component.state.turnOver.current,
      this.component.state.turnOver.goal,
    );
  };

  onMonthChange = (date) => {
    const selectedMonth = moment(date).format('YYYY-MM-DD');
    const selectedMonthIndex = parseInt(moment(selectedMonth).format('M'));
    this.component.setState({
      selectedMonth,
      selectedMonthIndex: selectedMonthIndex - 1,
    });
  };

  definePercent = (value, max) => {
    return (value / max) * 100;
    console.log(percentage); // 👇️ 50

    // 👇️ 2 decimals
    const fixed = percentage.toFixed(2);
    console.log(fixed); // 👉️ "50.00"
  };
}
