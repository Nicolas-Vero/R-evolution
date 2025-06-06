import { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import {
  get_athlete_active_appointement,
  get_book_athlete,
  athlete_booking,
  get_athlete_active_courses,
  get_availabilities,
  cancel_booking_athlete,
} from '../../api/Athlete';
import { get_coach_by_id } from '../../api/Coach';
import { convertSlotToDate } from '../../helpers/dateHelper';
import AuthService from '../../services/AuthService';

export const useHomeAthlete = (navigation) => {
  const [state, setState] = useState({
    scroll: 0,
    user: {},
    coach_id: '',
    coach: null,
    screen: 'MES RENDEZ-VOUS',
    refresh: false,
    currentDate: '',
    selectedDate: '',
    today: moment().format('YYYY-MM-DD'),
    athleteCourse: {},
    currentItem: null,
    currentSlot: '',
    dayAppointment: [],
    upcomingAppointment: [],
    isLoad: false,
    isBookOfferDialogVisible: false,
    isUnBookOfferDialogVisible: false,
    isRenewDialogVisible: false,
    currentAvailabilities: [],
    availabilities: [],
    book: null,
    disableAction: false,
  });

  const listRef = useRef(null);

  const set = (patch) => setState((prev) => ({ ...prev, ...patch }));

  useEffect(() => {
    const init = async () => {
      const user = await AuthService.getUser();
      set({ user, coach_id: user.coach?.coach_id });

      const courseRes = await get_athlete_active_courses();
      if (courseRes.status === 200) set({ athleteCourse: courseRes.data });

      if (user.coach?.coach_id) {
        const coachRes = await get_coach_by_id(user.coach.coach_id);
        if (coachRes.status === 200) set({ coach: coachRes.data });
      }

      const dayAppRes = await get_athlete_active_appointement({ today: true });
      if (dayAppRes.status === 200) set({ dayAppointment: dayAppRes.data });

      const nextAppRes = await get_athlete_active_appointement({ upcoming: true });
      if (nextAppRes.status === 200) {
        const data = nextAppRes.data.map((item, index, arr) => ({
          ...item,
          show: index === 0 || item.date !== arr[index - 1].date,
        }));
        set({ upcomingAppointment: data });
      }

      set({ isLoad: true });
      onMonthChange(moment().format('YYYY-MM-DD'), true);
    };

    init();
  }, []);

  const getDaysArrayByMonth = (date) => {
    const days = [];
    const daysInMonth = moment(date).daysInMonth();
    for (let i = 1; i <= daysInMonth; i++) {
      const day = moment(date).date(i);
      days.push({
        availability_day: day.format('dd'),
        availability_day_num: day.format('D'),
        availability: day.format('YYYY-MM-DD'),
      });
    }
    return days;
  };

  const onMonthChange = (date, isMount = false) => {
    const days = getDaysArrayByMonth(date);
    const todayIndex = days.findIndex(d => d.availability === state.today);
    set({ availabilities: days });
    if (isMount && listRef.current) {
      setTimeout(() => {
        listRef.current.scrollToIndex({ index: todayIndex, animated: true });
      }, 300);
    }
  };

  const getAvailabilities = async (item) => {
    const date = item.availability;
    const bookedSlots = (await get_book_athlete(date)).data.map(b => b.slot);

    const res = await get_availabilities({ date, coach_id: state.coach_id });
    const allSlots = Array.from({ length: 24 }, (_, i) => ({
      slot: i,
      value: res.data[`slot_${i}`],
    }));

    const currentAvailabilities = allSlots.filter(
      (s) => s.value || bookedSlots.includes(s.slot)
    );

    set({
      currentAvailabilities,
      selectedDate: date,
      currentItem: item,
      disableAction: state.today > date,
    });
  };

  const onDayPress = (item) => {
    set({ currentItem: item });
    getAvailabilities(item);
  };

  const onBookOfferPress = (slot) => {
    if (!state.athleteCourse?.id) {
      return set({ isBookOfferDialogVisible: true });
    }
    set({
      currentSlot: convertSlotToDate(slot),
      book: {
        date: state.selectedDate,
        coach_id: state.coach_id,
        slot,
        athlete_course_id: state.athleteCourse.id,
      },
      isBookOfferDialogVisible: true,
    });
  };

  const onBook = async () => {
    const res = await athlete_booking(state.book);
    if (res.status === 200) {
      await getAvailabilities(state.currentItem);
      const courseRes = await get_athlete_active_courses();
      if (courseRes.status === 200) set({ athleteCourse: courseRes.data });
    }
    set({ isBookOfferDialogVisible: false });
  };

  const onUnbookOfferPress = (slot) => {
    set({
      currentSlot: convertSlotToDate(slot),
      book: {
        date: state.selectedDate,
        coach_id: state.coach_id,
        slot,
        athlete_course_id: state.athleteCourse.id,
      },
      isUnBookOfferDialogVisible: true,
    });
  };

  const onUnbook = async () => {
    const res = await cancel_booking_athlete(state.book);
    if (res.status === 200) {
      await getAvailabilities(state.currentItem);
      const courseRes = await get_athlete_active_courses();
      if (courseRes.status === 200) set({ athleteCourse: courseRes.data });
    }
    set({ isUnBookOfferDialogVisible: false });
  };

  return {
    state,
    listRef,
    onMonthChange,
    onDayPress,
    onBookOfferPress,
    onBook,
    onUnbookOfferPress,
    onUnbook,
    getAvailabilities,
    onCatalogPress: () => navigation.navigate('OffersScreen', { tab: 1 }),
    onCoachPress: () => navigation.navigate('AthletesStack'),
    toggleRenewDialog: () => set({ isRenewDialogVisible: !state.isRenewDialogVisible }),
    toggleBookDialog: () => set({ isBookOfferDialogVisible: !state.isBookOfferDialogVisible }),
    toggleUnBookDialog: () => set({ isUnBookOfferDialogVisible: !state.isUnBookOfferDialogVisible }),
  };
};
