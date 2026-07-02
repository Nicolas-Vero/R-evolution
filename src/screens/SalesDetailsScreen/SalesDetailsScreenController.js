import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import moment from 'moment';
import {
  getYearTurnover,
  getMonthTurnover,
  getAthletesData,
  getAthletesPaymentsData,
} from '../../api/Dashboard';
export default class SalesDetailsScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      selectedMonth: moment(),
      oldSales: [],
      nextSales: [],
      totalOldAmount: 0,
      totalNextAmount: 0,
    };
  }

  componentDidMount = async () => {
    const { selectedMonth } = this.component.props;
    this.component.setState({
      selectedMonth,
    });
    await this.onMonthChange(selectedMonth);
  };

  onMonthChange = async (date) => {
    const selectedMonth = moment(date).format('YYYY-MM-DD');
    this.component.setState({
      selectedMonth,
    });
    const res = await getAthletesPaymentsData(selectedMonth);
    if (res.status === 200) {
      const { oldSales, nextSales, totalOldAmount, totalNextAmount } =
        res.content;
      this.component.setState({
        oldSales,
        nextSales,
        totalOldAmount,
        totalNextAmount,
      });
    }
  };
}
