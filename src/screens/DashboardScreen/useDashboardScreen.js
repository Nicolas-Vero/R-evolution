import { useCallback, useEffect, useState } from 'react';
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

export function useDashboardScreen({ navigation }) {
  const [screen, setScreen] = useState('CA');
  const [selectedMonth, setSelectedMonth] = useState(moment().format('YYYY-MM-DD'));
  const [selectedYear, setSelectedYear] = useState(moment().format('YYYY-MM-DD'));
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(null);
  const [turnOver, setTurnOver] = useState(null);
  const [sales, setSales] = useState(null);
  const [prospects, setProspects] = useState(null);
  const [year, setYear] = useState(moment().format('YYYY'));
  const [yearCA, setYearCA] = useState([]);
  const [athletes, setAthletes] = useState(null);
  const [isGoalModalVisible, setGoalModalVisible] = useState(false);
  const [isYearModalVisible, setYearModalVisible] = useState(false);
  const [specialities, setSpecialities] = useState([]);
  const [athletesGoals, setAthletesGoals] = useState({});

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = useCallback(async () => {
    const curDate = moment().format('YYYY-MM-DD');
    await onMonthChange(curDate);
    await fetchYearTurnOver();
    await fetchAthleteData();
    await fetchdefaultSpecialities();
    await fetchAthleteGoalsData();
  }, []);

  const onMonthChange = useCallback(async (date) => {
    const selected = moment(date).format('YYYY-MM-DD');
    setSelectedMonth(selected);
    setSelectedMonthIndex(parseInt(moment(selected).format('M'), 10) - 1);
    await fetchMonthlyTurnover(selected);
  }, []);

  const fetchMonthlyTurnover = useCallback(async (date) => {
    const d = date || selectedMonth;
    const res = await getMonthTurnover(d);
    if (res.status === 200) {
      setProspects(res.content.prospects);
      setSales(res.content.sales);
      setTurnOver(res.content.turnover);
    }
  }, [selectedMonth]);

  const fetchYearTurnOver = useCallback(async () => {
    const res = await getYearTurnover(selectedYear);
    if (res.status === 200) setYearCA(res.content);
  }, [selectedYear]);

  const fetchAthleteData = useCallback(async () => {
    const res = await getAthletesData();
    if (res.status === 200) setAthletes(res.content);
  }, []);

  const fetchdefaultSpecialities = useCallback(async () => {
    const res = await get_specialities();
    if (res.status === 200) setSpecialities(res.data.map((s) => s.value));
  }, []);

  const fetchAthleteGoalsData = useCallback(async () => {
    const res = await getAthletesGoalsData();
    if (res.status === 200) {
      let result = {};
      let others = 0;
      Object.keys(res.content).forEach((element) => {
        if (specialities.includes(element) && element !== 'autre') {
          result[element.toUpperCase()] = res.content[element];
        } else {
          others += res.content[element];
        }
      });
      result['AUTRE'] = others;
      setAthletesGoals(result);
    }
  }, [specialities]);

  const handleGoalModalVisible = useCallback(() => setGoalModalVisible(true), []);
  const handleDismissGoalDialog = useCallback(() => setGoalModalVisible((v) => !v), []);
  const handleYearModalVisible = useCallback(() => setYearModalVisible(true), []);
  const handleDismissYearDialog = useCallback(() => setYearModalVisible((v) => !v), []);

  const onGoalSubmit = useCallback(async (goal) => {
    handleDismissGoalDialog();
    if (!goal) return;
    const res = await postMonthlyCoachGoal(goal, selectedMonth);
    if (res.status === 200) await fetchMonthlyTurnover();
  }, [selectedMonth, fetchMonthlyTurnover, handleDismissGoalDialog]);

  const onYearSubmit = useCallback(async (yearVal) => {
    if (!yearVal) return;
    const yearMoment = moment().year(yearVal);
    if (yearMoment.isValid()) {
      setSelectedYear(yearMoment.format('YYYY-MM-DD'));
      setYear(yearVal);
      await SystemHelper.sleep(1000);
      await fetchYearTurnOver();
      handleDismissYearDialog();
    }
  }, [fetchYearTurnOver, handleDismissYearDialog]);

  const goToSaleDetail = useCallback(() => {
    navigation.navigate('SalesDetailsScreen', { selectedMonth });
  }, [navigation, selectedMonth]);

  return {
    screen,
    setScreen,
    selectedMonth,
    selectedYear,
    selectedMonthIndex,
    turnOver,
    sales,
    prospects,
    year,
    yearCA,
    athletes,
    isGoalModalVisible,
    isYearModalVisible,
    specialities,
    athletesGoals,
    onMonthChange,
    handleGoalModalVisible,
    handleDismissGoalDialog,
    handleYearModalVisible,
    handleDismissYearDialog,
    onGoalSubmit,
    onYearSubmit,
    goToSaleDetail,
  };
}
