import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import SwitchSelector from 'react-native-switch-selector';
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import { heightPercentageToDP } from 'react-native-responsive-screen';

import { get_availabilities } from '../../api/Availabilities';
import {
  get_appointement,
  get_appointement_calendar,
  get_public_request,
  get_appointment_by_athlete_id,
  get_coachAthlete_status,
} from '../../api/Coach';
import { get_commercial_by_id } from '../../api/Commercial';
import AuthService from '../../services/AuthService';
import Header from '../../components/Header';
import styles from './HomeCoachScreenStyle';
import { options } from './homeCoachConfig';
import Pager from '../../common/Carrousel';
import { Calendar } from 'react-native-calendars';
import MonthsSlider from '../../components/MonthsSlider';
import SidappRefreshControl from '../../components/SidappRefreshControl/SidappRefreshControl';
import CoachAvaibility from '../../components/CoachAvaibility/CoachAvaibility';
import { slots } from '../../helpers/dateHelper';
import FilterTimesDialog from '../../components/dialogs/filterTimesDialog/filterTimesDialog';
import ChangeSlotDialog from '../../components/dialogs/changeSlotDialog/changeSlotDialog';
import { store, dispatch } from '../../redux/store';

const HomeCoachScreen = () => {
  const navigation = useNavigation();
  const listRef = useRef(null);

  const [state, setState] = useState({
    refresh: false,
    carousselLoad: false,
    currentMonth: moment(),
    MonthBookingNumberPerDay: [],
    user: {},
    screen: 'Planning',
    currentDate: '',
    selectedDate: moment().format('YYYY-MM-DD'),
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

  // gestion de l’onglet Planning/Dispos
  const [screen, setScreen] = useState('Planning');

  // Initialisation et focus : chargement initial des données
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

  // -------- LOGIQUE --------

  const getAvailabilities = useCallback(async (item) => {
    const coachSlots = store.getState().coachSlots;
    const date = typeof item === 'string' ? item : item?.availability || state.selectedDate;
    setState((s) => ({ ...s, selectedDate: date }));
    const res = await get_availabilities(date);
    console.log('IIIIIIII', res.data)
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

  const scrollToIndex = (index, animated) => {
    setTimeout(() => {
      listRef.current &&
        listRef.current.scrollToIndex({ animated, index });
    }, 3000);
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

  // Dialogues
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

  // Rendu badge
  const renderBadge = () =>
    state.publicRequest > 0 ? (
      <View style={{ position: 'absolute', top: -2, right: -2, zIndex: 1 }}>
        <View
          style={{
            width: 13,
            height: 13,
            borderRadius: 6.5,
            backgroundColor: '#FD7279',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 8, fontFamily: 'Roboto' }}>
            {state.publicRequest}
          </Text>
        </View>
      </View>
    ) : null;

  // Calendrier jour
  const renderDay = (date, calendarState, marking) => {
    const isSelected = marking;
    const isToday = calendarState === 'today';
    const isBefore = moment().toDate() >= moment(date.dateString).toDate();
    let textColor = isBefore ? '#979797' : isToday || !marking ? '#fff' : '#000';
    let bg = marking && !isToday ? '#2CDEE4' : 'transparent';
    bg = marking && isToday ? '#2CDEE4' : bg;
    const badgeTextColor = isToday ? '#000' : marking ? '#fff' : '#000';
    const badgeBg = isToday ? '#2CDEE4' : isSelected ? '#393637' : '#2CDEE4';
    textColor = isToday ? '#2CDEE4' : textColor;
    textColor = isToday && marking ? '#000' : textColor;
    let _renderBadge = false;
    if (
      state.MonthBookingNumberPerDay[date.day - 1] > 0 &&
      new Date(state.currentMonth).getMonth() + 1 === date.month
    ) {
      bg = marking ? '#2CDEE4' : '#393637';
      _renderBadge = true;
    }
    return (
      <TouchableOpacity
        style={styles.dayContainerCalendar}
        onPress={() => changeTaskList(date)}>
        {_renderBadge ? (
          <View style={[styles.dateMonth, { backgroundColor: badgeBg }]}>
            <Text style={[styles.dateMonthText, { color: badgeTextColor }]}>
              {state.MonthBookingNumberPerDay[date.day - 1]}
            </Text>
          </View>
        ) : null}
        <View style={[styles.day, { backgroundColor: bg }]}>
          <Text style={[styles.dayTextCalendar, { color: textColor }]}>
            {date.day}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Calendrier composant
  const renderCalendar = () => {
    const selected = state.selectedDate;
    return (
      <Calendar
        scrollEnabled
        theme={{
          calendarBackground: 'transparent',
          textSectionTitleColor: 'white',
          textSectionTitleWeight: 'bold',
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#2CDEE4',
          todayTextColor: '#2CDEE4',
          dayTextColor: 'white',
          textDisabledColor: 'grey',
          arrowColor: 'white',
          monthTextColor: 'white',
          indicatorColor: '#2CDEE4',
          textDayFontFamily: 'Montserrat',
          textMonthFontFamily: 'MontserratBoldItalic',
          textDayHeaderFontFamily: 'MontserratMedium',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
        markedDates={{
          [selected]: {
            selected: true,
            selectedColor: '#2CDEE4',
            selectedTextColor: 'black',
          },
        }}
        dayComponent={({ date, state: calendarState, marking }) =>
          renderDay(date, calendarState, marking)
        }
        onDayPress={changeTaskList}
        style={styles.calendar}
      />
    );
  };

  // Rendu planning
  const renderPlanning = () => (
    <View style={{ marginTop: 25 }}>
      <View style={styles.tabContainer}>
        <Text style={[styles.currentDateText, { marginBottom: 15 }]}>
          {state.currentDate?.toUpperCase()}
        </Text>
      </View>
      <View style={styles.alignCenter}>
        {state.page.length === 0 ? (
          <View style={styles.noAppointmentContainer}>
            <Text style={styles.noAppointmentText}>
              Aucun rendez-vous prévu ce jour-là
            </Text>
          </View>
        ) : state.carousselLoad ? (
          <Pager pager={state.page} />
        ) : (
          <View style={styles.appointmentLoader}>
            <ActivityIndicator />
          </View>
        )}
      </View>
      {Platform.OS === 'android' ? (
        <View style={{ marginTop: state.page.length === 0 ? 15 : Dimensions.get('window').height >= 896 ? -20 : 0 }}>
          <ScrollView>
            <LinearGradient
              colors={['#23282E', '#141517']}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 8, marginHorizontal: 16 }}>
              {renderCalendar()}
            </LinearGradient>
          </ScrollView>
        </View>
      ) : (
        <ScrollView
          style={{ marginTop: state.page.length === 0 ? 15 : Dimensions.get('window').height >= 896 ? -20 : 0 }}
          contentInset={{ bottom: 80 }}>
          <LinearGradient
            colors={['#23282E', '#141517']}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              flex: 1,
              maxHeight: 400,
              borderRadius: 8,
              marginHorizontal: 16,
              alignItems: 'center',
            }}>
            {renderCalendar()}
          </LinearGradient>
        </ScrollView>
      )}
    </View>
  );

  // Rendu disponibilités coach
  const renderAvailability = () => {
    const { slotsToUse, currentAvailabilities } = state;
    const curDate = moment().format('YYYY-MM-DD');
    const { day } = currentAvailabilities || {};
    const { coachFilteredTime } = store.getState();

    if (!slotsToUse?.length) return null;
    return (
      <View style={{ height: heightPercentageToDP(50) }}>
        <FilterTimesDialog
          dialogVisible={state.dialogVisible}
          onClose={onDismissDialog}
        />
        {state.selectedSlot && (
          <ChangeSlotDialog
            dialogVisible={state.isChangeSLotDialogVisible}
            onClose={dismissChangeSlotDialog}
            date={state.selectedDate}
            slot={state.selectedSlot}
          />
        )}
        <View style={{ marginVertical: 10 }}>
          <MonthsSlider onChange={onMonthChange} />
        </View>
        <View style={{ marginBottom: 34 }}>
          <FlatList
            ref={listRef}
            horizontal
            data={state.availabilities}
            refreshing={state.refreshing}
            keyExtractor={(item, index) => String(index)}
            style={{ marginLeft: 16 }}
            renderItem={({ item, index }) => {
              const borderWidth = item?.availability === curDate ? 1 : 0;
              const date = moment(item.availability).format('YYYY-MM-DD');
              let isBefore =
                curDate !== date && moment().toDate() >= moment(item.availability).toDate();

              const backgroundColor = isBefore
                ? '#393637'
                : item.availability === state.selectedDate
                  ? '#2CDEE4'
                  : ['#2D333C', '#101010'];
              const textColor = isBefore
                ? '#979797'
                : item.availability === state.selectedDate
                  ? 'black'
                  : 'white';

              const colors = [];
              if (isBefore) {
                colors.push('#393637', '#393637');
              } else if (item.availability === state.selectedDate) {
                colors.push('#2CDEE4', '#2CDEE4');
              } else {
                colors.push('#252A30', '#1C1E22');
              }
              return (
                <TouchableOpacity
                  onPress={() => getAvailabilities(item?.availability)}>
                  <LinearGradient
                    colors={colors}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={[
                      styles.dayContainer,
                      {
                        backgroundColor,
                        borderWidth,
                        marginLeft: index === 0 ? 0 : 4,
                        marginRight: 4,
                      },
                    ]}>
                    <View style={styles.dayTextContainer}>
                      <Text style={[styles.dayText, { color: textColor }]}>
                        {item.availability_day}
                      </Text>
                      <Text style={[styles.dayTextNum, { color: textColor }]}>
                        {item?.availability_day_num}
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            }}
          />
          {/* Liste des créneaux CoachAvaibility */}
          <LinearGradient
            colors={['#000', '#24292F']}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <FlatList
              contentContainerStyle={{ paddingBottom: 120 }}
              style={{
                maxHeight: heightPercentageToDP(60),
                marginTop: 15,
                marginHorizontal: 16,
              }}
              data={currentAvailabilities?.slots}
              keyExtractor={(item, index) => String(index)}
              refreshControl={
                <SidappRefreshControl
                  refreshing={state.refreshing}
                  onRefresh={fetchData}
                />
              }
              renderItem={({ item, index }) => {
                if (coachFilteredTime) {
                  if (coachFilteredTime.start && coachFilteredTime.end) {
                    if (
                      index < coachFilteredTime.start ||
                      index > coachFilteredTime.end
                    ) {
                      return null;
                    }
                  } else if (
                    coachFilteredTime.end &&
                    index > coachFilteredTime.end
                  ) {
                    return null;
                  }
                }
                let disable = false;
                if (day < moment().format('YYYY-MM-DD')) {
                  disable = true;
                } else if (
                  day === moment().format('YYYY-MM-DD') &&
                  parseInt(slots[index].substring(0, 2)) <= moment().format('HH')
                ) {
                  disable = true;
                }
                return (
                  <CoachAvaibility
                    disable={disable}
                    index={index}
                    slot={slotsToUse[index]}
                    // Ajoute ici les handlers pour book, etc. si tu veux
                    item={item}
                    day={day}
                  // onSlotPress, etc.
                  />
                );
              }}
            />
          </LinearGradient>
        </View>
      </View>
    );
  };

  // ---- RENDU PRINCIPAL ----
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{ backgroundColor: '#000', marginBottom: 20 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('AccountScreen')}>
            <View style={styles.userInfoContainer}>
              <Avatar
                size={37}
                rounded
                source={
                  state.user.profile_picture_url
                    ? { uri: state.user.profile_picture_url }
                    : require('../../../assets/images/no_pp.jpg')
                }
              />
              <Text style={styles.username} numberOfLines={1} ellipsizeMode="tail">
                {state.user.first_name} {state.user.last_name}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => navigation.navigate('PendingRequestCoachScreen')}>
              {renderBadge()}
              <Image
                style={styles.headerRightImage}
                source={require('../../../assets/images/Demande.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ActivitiesCoachScreen')} style={styles.headerRightActivities}>
              <Image
                style={styles.headerRightImage}
                source={require('../../../assets/images/Notif.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headerBorder}></View>
      </View>
      <View>
        <View style={styles.alignCenter}>
          <SwitchSelector
            options={options}
            initial={0}
            onPress={setScreen}
            backgroundColor="#1E2025"
            buttonColor="#2CDEE4"
            selectedColor="#1E2025"
            textColor="white"
            borderRadius={10}
            height={45}
            style={{ width: 'auto' }}
            hasPadding
            fontSize={13}
            selectedTextStyle={{
              fontFamily: 'MontserratBoldItalic',
              lineHeight: 15,
            }}
            textStyle={{
              fontFamily: 'MontserratBoldItalic',
              lineHeight: 15,
            }}
            borderColor="#1E2026"
          />
        </View>
        {screen === 'Planning' ? renderPlanning() : renderAvailability()}
      </View>
    </View>
  );
};

export default HomeCoachScreen;
