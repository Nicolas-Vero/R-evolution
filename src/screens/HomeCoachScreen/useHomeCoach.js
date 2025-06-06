import React, { useState, useEffect, useRef, useCallback } from 'react';
import moment from 'moment';
import XDate from 'xdate';

import { get_availabilities_v2 } from '../../api/Availabilities';
import {
    get_appointement,
    get_appointement_calendar,
    get_appointment_by_athlete_id,
    get_coachAthlete_status,
    get_public_request,
} from '../../api/Coach';
import { get_commercial_by_id } from '../../api/Commercial';
import AuthService from '../../services/AuthService';
import { slots } from '../../helpers/dateHelper';
import { store, dispatch } from '../../redux/store';

// Vous devrez passer ce hook à votre composant principal en tant que "controller"
export function useHomeCoach(navigation, isFocused) {
    const listRef = useRef(null);
    const [state, setState] = useState({
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
        refreshing: false,
        reload: false,
        isChangeSLotDialogVisible: false,
        selectedSlot: null,
        slotsToUse: slots,
    });

    // Initialisation
    useEffect(() => {
        const init = async () => {
            const curDate = moment().format('YYYY-MM-DD');
            await getAvailabilities(curDate);

            const user = await AuthService.getUser();
            setState((s) => ({ ...s, user }));

            onMonthChange(curDate, true);

            const res = await get_public_request();
            if (res.status === 200) {
                setState((s) => ({ ...s, publicRequest: res.data.requests.length }));
            }
        };
        init();
        // eslint-disable-next-line
    }, []);

    // Focus listener
    useEffect(() => {
        if (isFocused) {
            get_public_request()
                .then((res) => {
                    if (res.status === 200) {
                        setState((s) => ({ ...s, publicRequest: res.data.requests.length, loaded: true }));
                    }
                });
        }
    }, [isFocused]);

    // Functions

    // --- Dates helpers ---
    const getDate = (date = new Date()) => moment(date).format('YYYY-MM-DD');

    const fromTo = (a, b) => {
        const days = [];
        let from = +a, to = +b;
        for (; from <= to; from = new XDate(from, true).addDays(1).getTime()) {
            days.push(new XDate(from, true));
        }
        return days;
    };

    const month = (xd) => {
        const year = xd.getFullYear();
        const monthIdx = xd.getMonth();
        const days = new Date(year, monthIdx + 1, 0).getDate();
        const firstDay = new XDate(year, monthIdx, 1, 0, 0, 0, true);
        const lastDay = new XDate(year, monthIdx, days, 0, 0, 0, true);
        return fromTo(firstDay, lastDay);
    };

    const getDaysArrayByMonth = (date) => {
        let daysInMonth = moment(date).daysInMonth();
        const arrDays = [];
        while (daysInMonth && daysInMonth >= 1) {
            const current = moment(date).date(daysInMonth);
            arrDays.push(current);
            daysInMonth--;
        }
        return arrDays.reverse();
    };

    // --- API calls and UI actions ---
    const getAvailabilities = useCallback(async (item) => {
        const coachSlots = store.getState().coachSlots;
        dispatch('selectedDate', { date: state.selectedDate });
        setState((s) => ({ ...s, selectedDate: item }));
        const date = moment(item).format('YYYY-MM-DD');
        const res = await get_availabilities_v2(date);
        if (res.status === 200) {
            setState((s) => ({
                ...s,
                currentAvailabilities: {
                    slots: res.data.slots,
                    day: date,
                    refresh: !s.refresh,
                },
                slotsToUse:
                    coachSlots.savedSlots && coachSlots.savedSlots[date]
                        ? coachSlots.savedSlots[date]
                        : slots,
            }));
        }
        // eslint-disable-next-line
    }, [state.selectedDate, state.refresh]);

    const fetchData = async () => {
        setState((s) => ({ ...s, refreshing: true }));
        const date = moment(state.selectedDate).format('YYYY-MM-DD');
        await getAvailabilities(date);

        const requests = await get_public_request();
        if (requests.status === 200) {
            setState((s) => ({ ...s, publicRequest: requests.data.requests.length }));
        }
        setState((s) => ({ ...s, refreshing: false }));
    };

    const onMonthChange = (date, isMount) => {
        const item = [];
        const ArrayOfday = getDaysArrayByMonth(moment(date).format('YYYY-MM-DD'));
        let todayIndex = null;
        ArrayOfday.forEach((element, index) => {
            if (state.today === moment(element).format('YYYY-MM-DD')) {
                todayIndex = index;
            }
            item.push({
                availability_day: moment(element).format('dd'),
                availability_day_num: moment(element).format('D'),
                availability: moment(element).format('YYYY-MM-DD'),
            });
        });
        setState((s) => ({ ...s, availabilities: item }));
        if (isMount && todayIndex) {
            scrollToIndex(todayIndex, true);
        }
    };

    const changeTaskList = async (date) => {
        const formatdata = { date: date.dateString || date };
        setState((s) => ({
            ...s,
            selectedDate: moment(date).format('YYYY-MM-DD'),
            currentDate: moment(date).format('dddd D MMMM '),
        }));

        const res = await get_appointement(formatdata);
        if (res.status === 200) {
            setState((s) => ({
                ...s,
                carousselLoad: false,
                page: res.data
                    .filter((rdv) => rdv.athlete)
                    .sort((a, b) => a?.slot > b?.slot ? 1 : b?.slot > a?.slot ? -1 : 0)
                    .map((rdv) => ({ rdv })),
                carousselLoad: true,
            }));
        }
    };

    const bookingInMonth = async (addSubMonth) => {
        const bookingPerday = [];
        const dayOfMonth = month(state.currentMonth.addMonths(addSubMonth, true));
        for (let element of dayOfMonth) {
            const appointement = await get_appointement_calendar(
                moment(new Date(element)).format('YYYY-MM-DD'),
            );
            bookingPerday.push(appointement.data.length);
        }
        setState((s) => ({ ...s, MonthBookingNumberPerDay: bookingPerday }));
    };

    const scrollToIndex = (index, animated) => {
        setTimeout(() => {
            listRef.current &&
                listRef.current.scrollToIndex({ animated, index });
        }, 3000);
    };

    // --- Dialogues et autres actions ---
    const openDialog = () => setState((s) => ({ ...s, dialogVisible: true }));
    const onDismissDialog = () => setState((s) => ({ ...s, dialogVisible: !s.dialogVisible }));

    const onSlotPress = (slot) =>
        setState((s) => ({
            ...s,
            selectedSlot: slot,
            isChangeSLotDialogVisible: true,
        }));

    const dismissChangeSlotDialog = () =>
        setState((s) => ({
            ...s,
            selectedSlot: null,
            isChangeSLotDialogVisible: false,
        }));

    // --- Navigation/Press (à passer dans les composants enfants) ---
    const onLinePress = (time) => {
        const values = Object.values(state.slotsToUse);
        const slot = values.indexOf(time);
        navigation.navigate('CreateBookCoachScreen', {
            time,
            slot,
            date: state.selectedDate,
            cb: getAvailabilities,
        });
    };

    const onAthletePress = async (athlete, slot) => {
        const book = await get_appointment_by_athlete_id(athlete.id);
        if (book.status === 200) {
            athlete.book = book.data.find((obj) => obj.slot === slot);
        }
        const data = await get_coachAthlete_status(athlete.id);
        if (data.status === 200) {
            athlete.status = data.data.status;
        }
        if (athlete.commercial_id) {
            const commercial = await get_commercial_by_id(athlete.commercial_id);
            if (commercial.status === 200 && commercial.data.commercial) {
                athlete.commercial = {
                    first_name: commercial.data.commercial.first_name,
                    last_name: commercial.data.commercial.last_name,
                };
            }
        }
        navigation.navigate('AthleteSheetCoachScreen', {
            item: athlete,
            date: state.selectedDate,
            cb: getAvailabilities,
        });
    };

    const onOtherBookPress = (item, slot) => {
        navigation.navigate('UpdateBookCoachScreen', {
            item,
            date: state.selectedDate,
            time: slot,
            cb: getAvailabilities,
        });
    };

    // Output controller API (passe dans le composant view)
    return {
        state,
        setState,
        listRef,
        getAvailabilities,
        fetchData,
        onMonthChange,
        changeTaskList,
        bookingInMonth,
        openDialog,
        onDismissDialog,
        onSlotPress,
        dismissChangeSlotDialog,
        onLinePress,
        onAthletePress,
        onOtherBookPress,
    };
}
