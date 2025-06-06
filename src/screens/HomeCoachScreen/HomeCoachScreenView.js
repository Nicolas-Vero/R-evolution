import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import moment from 'moment';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import SwitchSelector from 'react-native-switch-selector';
import { Avatar } from 'react-native-elements';
import Pager from '../../common/Carrousel';
import { Calendar } from 'react-native-calendars';
import MonthsSlider from '../../components/MonthsSlider';
import { options } from './homeCoachConfig';
import styles from './HomeCoachScreenStyle';
import SidappRefreshControl from '../../components/SidappRefreshControl/SidappRefreshControl';
import { LinearGradient } from 'expo-linear-gradient';
import CoachAvaibility from '../../components/CoachAvaibility/CoachAvaibility';
import { slots } from '../../helpers/dateHelper';
import FilterTimesDialog from '../../components/dialogs/filterTimesDialog/filterTimesDialog';
import ChangeSlotDialog from '../../components/dialogs/changeSlotDialog/changeSlotDialog';
import { store } from '../../redux/store';

const HomeCoachScreenView = ({
  state,
  controller,
  navigation,
}) => {
  // Les ref et le state local éventuel ici si nécessaire
  const [screen, setScreen] = useState(state.screen);

  // Fonctions de rendu
  const renderBadge = () => (
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
  );

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
    let renderBadge = false;
    if (
      state.MonthBookingNumberPerDay[date.day - 1] > 0 &&
      new Date(state.currentMonth).getMonth() + 1 === date.month
    ) {
      bg = marking ? '#2CDEE4' : '#393637';
      renderBadge = true;
    }
    return (
      <TouchableOpacity
        style={styles.dayContainerCalendar}
        onPress={() => {
          controller.changeTaskList(date);
        }}>
        {renderBadge ? (
          <View style={[styles.dateMonth, { backgroundColor: badgeBg }]}>
            <View>
              <Text style={[styles.dateMonthText, { color: badgeTextColor }]}>
                {state.MonthBookingNumberPerDay[date.day - 1]}
              </Text>
            </View>
          </View>
        ) : null}
        <View
          style={[
            styles.day,
            {
              backgroundColor: bg,
            },
          ]}>
          <Text style={[styles.dayTextCalendar, { color: textColor }]}>
            {date.day}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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
        onPressArrowLeft={async (subtractMonth) => {
          await controller.bookingInMonth(-1);
          subtractMonth();
        }}
        onPressArrowRight={async (addMonth) => {
          await controller.bookingInMonth(1);
          addMonth();
        }}
        enableSwipeMonths
        firstDay={1}
        disableMonthChange
        markingType={'custom'}
        disabledByDefault
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
        onDayPress={(day) => controller.changeTaskList(day)}
        style={styles.calendar}
      />
    );
  };

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
              style={{
                borderRadius: 8,
                marginHorizontal: 16,
              }}>
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

  const renderAvailability = () => {
    const { slotsToUse } = state;
    const curDate = moment().format('YYYY-MM-DD');
    const { day } = state.currentAvailabilities || {};
    const { coachFilteredTime } = store.getState();

    if (!slotsToUse?.length) return null;
    return (
      <View style={{ height: heightPercentageToDP(50) }}>
        <FilterTimesDialog
          dialogVisible={state.dialogVisible}
          onClose={controller.onDismissDialog}
        />
        {state.selectedSlot && (
          <ChangeSlotDialog
            dialogVisible={state.isChangeSLotDialogVisible}
            onClose={controller.dismissChangeSlotDialog}
            date={state.selectedDate}
            slot={state.selectedSlot}
          />
        )}
        <View style={{ marginVertical: 10 }}>
          <MonthsSlider onChange={controller.onMonthChange} />
        </View>
        <View style={{ marginBottom: 34 }}>
          <FlatList
            ref={controller.listRef}
            horizontal
            data={state.availabilities}
            refreshing={state.refreshing}
            keyExtractor={() => String(Math.random(10))}
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
                  onPress={() => controller.getAvailabilities(item?.availability)}>
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
          <View style={styles.filterContainer}>
            <TouchableOpacity onPress={controller.openDialog}>
              <Image
                style={styles.filterImage}
                source={require('../../../assets/images/filtre.png')}
              />
            </TouchableOpacity>
            <Text style={styles.filterInfoText}>
              <Text>de</Text>
              <Text style={styles.textColor}>
                {` ${(slotsToUse[coachFilteredTime.start]).substring(0, 5)} `}
              </Text>
              <Text>à</Text>
              <Text style={styles.textColor}>
                {` ${slotsToUse[coachFilteredTime.end].substring(8, 13)}`}
              </Text>
            </Text>
          </View>
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
              data={state.currentAvailabilities.slots}
              keyExtractor={(item, index) => String(index)}
              refreshControl={
                <SidappRefreshControl
                  refreshing={state.refreshing}
                  onRefresh={controller.fetchData}
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
                    onSlotPress={controller.onSlotPress}
                    item={item}
                    day={day}
                    onLinePress={controller.onLinePress}
                    handler={() => controller.handler(day)}
                    onAthletePress={controller.onAthletePress}
                    onOtherBookPress={controller.onOtherBookPress}
                  />
                );
              }}
            />
          </LinearGradient>
        </View>
      </View>
    );
  };

  // Render principal
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
              {state.publicRequest > 0 ? renderBadge() : null}
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
        {screen === 'Planning'
          ? renderPlanning()
          : renderAvailability()}
      </View>
    </View>
  );
};

export default HomeCoachScreenView;
