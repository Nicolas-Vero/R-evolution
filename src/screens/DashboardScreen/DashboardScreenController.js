import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import moment from 'moment';
import {
  getYearTurnover,
  getMonthTurnover,
  getAthletesData,
  postMonthlyCoachGoal,
  getAthletesGoalsData,
} from '../../api/Dashboard';
import { get_specialities } from '../../api/ReferenceData';

import SystemHelper from '../../helpers/SystemHelper';

export default class DashboardScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      screen: 'CA',
      selectedMonth: moment().format('YYYY-MM-DD'),
      selectedYear: moment().format('YYYY-MM-DD'),
      selectedMonthIndex: null,
      turnOver: null,
      sales: null,
      prospects: null,
      year: moment().format('YYYY'),
      yearCA: [],
      athletes: null,
      isGoalModalVisible: false,
      isYearModalVisible: false,
      specialities: [],
      athletesGoals: [],
    };
  }

  componentDidMount = async () => {
    await this.fetchData();
  };

  fetchData = async () => {
    const curDate = moment().format('YYYY-MM-DD');
    this.onMonthChange(curDate);
    await this.fetchYearTurnOver();
    await this.fetchAthleteData();

    await this.fetchdefaultSpecialities();
    await this.fetchAthleteGoalsData();
  };

  onMonthChange = async (date) => {
    const selectedMonth = moment(date).format('YYYY-MM-DD');

    this.component.setState({
      selectedMonth: selectedMonth,
      selectedMonthIndex: parseInt(moment(selectedMonth).format('M')) - 1,
    });

    await this.fetchMonthlyTurnover();
  };

  fetchMonthlyTurnover = async () => {
    const { selectedMonth } = this.component.state;
    const res = await getMonthTurnover(selectedMonth);
    if (res.status === 200) {
      this.component.setState({
        prospects: res.content.prospects,
        sales: res.content.sales,
        turnOver: res.content.turnover,
      });
    }
  };

  fetchYearTurnOver = async () => {
    const { selectedYear } = this.component.state;
    const res = await getYearTurnover(selectedYear);
    if (res.status === 200) {
      this.component.setState({
        yearCA: res.content,
      });
    }
  };

  fetchAthleteData = async () => {
    const res = await getAthletesData();
    if (res.status === 200) {
      this.component.setState({
        athletes: res.content,
      });
    }
  };

  fetchdefaultSpecialities = async () => {
    const res = await get_specialities();
    if (res.status === 200) {
      const specialities = res.data.map((speciality) => {
        return speciality.value;
      });

      this.component.setState({
        specialities,
      });
    }
  };

  fetchAthleteGoalsData = async () => {
    const { specialities } = this.component.state;
    const res = await getAthletesGoalsData();

    if (res.status === 200) {
      let result = {};
      let others = 0;

      for (const element of Object.keys(res.content)) {
        if (specialities.includes(element) && element !== 'autre') {
          result[element.toUpperCase()] = res.content[element];
        } else {
          others += res.content[element];
        }
      }

      result['AUTRE'] = others;

      this.component.setState({
        athletesGoals: result,
      });
    }
  };

  setGoalModalVisible = () => {
    this.component.setState({
      isGoalModalVisible: true,
    });
  };

  onDismissGoalDialog = () => {
    const { isGoalModalVisible } = this.component.state;
    this.component.setState({
      isGoalModalVisible: !isGoalModalVisible,
    });
  };

  onDismissYearDialog = () => {
    const { isYearModalVisible } = this.component.state;
    this.component.setState({
      isYearModalVisible: !isYearModalVisible,
    });
  };

  setYearModalVisible = () => {
    this.component.setState({
      isYearModalVisible: true,
    });
  };

  onGoalSubmit = async (goal) => {
    this.onDismissGoalDialog();
    if (!goal) {
      return;
    }
    const res = await postMonthlyCoachGoal(
      goal,
      this.component.state.selectedMonth,
    );
    if (res.status === 200) {
      await this.fetchMonthlyTurnover();
    }
  };

  onYearSubmit = async (year) => {
    if (!year) {
      return;
    }
    const selectedYear = moment().year(year);

    if (selectedYear.isValid()) {
      this.component.setState({
        selectedYear: moment().year(year).format('YYYY-MM-DD'),
        year,
      });

      await SystemHelper.sleep(1000);
      await this.fetchYearTurnOver();
      this.onDismissYearDialog();
    }
  };

  goToSaleDetail = () => {
    this.component.props.navigation.navigate('SalesDetailsScreen', {
      selectedMonth: this.component.state.selectedMonth,
    });
  };
}
