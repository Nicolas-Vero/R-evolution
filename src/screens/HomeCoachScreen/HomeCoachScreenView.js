import React from 'react';
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
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
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
import { store } from '../../redux/store';
export default class HomeCoachScreenView extends AbstractScreenView {
  renderDialog() {
    return (
      <FilterTimesDialog
        dialogVisible={this.component.state.dialogVisible}
        onClose={this.controller.onDismissDialog}
      />
    );
  }

  renderDay = (date, state, marking) => {
    const isSelected = marking;
    const isToday = state === 'today';

    const isBefore = moment().toDate() >= moment(date.dateString).toDate();
    let textColor = isBefore
      ? '#979797'
      : isToday || !marking
      ? '#fff'
      : '#000';

    let bg = marking && !isToday ? '#2CDEE4' : 'transparent';
    bg = marking && isToday ? '#2CDEE4' : bg;

    const badgeTextColor = isToday ? '#000' : marking ? '#fff' : '#000';
    const badgeBg = isToday ? '#2CDEE4' : isSelected ? '#393637' : '#2CDEE4';

    textColor = isToday ? '#2CDEE4' : textColor;
    textColor = isToday && marking ? '#000' : textColor;
    let renderBadge = false;
    if (
      this.component.state.MonthBookingNumberPerDay[date.day - 1] > 0 &&
      new Date(this.component.state.currentMonth).getMonth() + 1 === date.month
    ) {
      bg = marking ? '#2CDEE4' : '#393637';
      renderBadge = true;
    }
    return (
      <TouchableOpacity
        style={styles.dayContainerCalendar}
        onPress={() => {
          this.controller.changeTaskList(date);
        }}>
        {renderBadge ? (
          <View style={[styles.dateMonth, { backgroundColor: badgeBg }]}>
            <View>
              <Text style={[styles.dateMonthText, { color: badgeTextColor }]}>
                {this.component.state.MonthBookingNumberPerDay[date.day - 1]}
              </Text>
            </View>
          </View>
        ) : null}
        <View
          style={[
            styles.day,
            {
              backgroundColor: bg,
              // borderWidth: isToday ? 1 : 0,
              // borderColor: isToday ? '#2CDEE4' : '#393637',
            },
          ]}>
          <Text style={[styles.dayTextCalendar, { color: textColor }]}>
            {date.day}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderCalendarAndroid = () => {
    const pageLength = this.component.state.page.length;
    const isBigPhone = Dimensions.get('window').height >= 896;

    return (
      <View
        style={{
          marginTop: pageLength == 0 ? 15 : isBigPhone ? -20 : 0,
        }}>
        <ScrollView>
          <LinearGradient
            colors={['#23282E', '#141517']}
            // locations={[-0.25, 1]}
            start={{
              x: 1,
              y: 0,
            }}
            end={{
              x: 1,
              y: 1,
            }}
            style={{
              borderRadius: 8,
              marginHorizontal: 16,
            }}>
            {this.renderCalendar()}
          </LinearGradient>
        </ScrollView>
      </View>
    );
  };
  renderCalendarIos = () => {
    const pageLength = this.component.state.page.length;
    const isBigPhone = Dimensions.get('window').height >= 896;

    return (
      <ScrollView
        style={{
          marginTop: pageLength == 0 ? 15 : isBigPhone ? -20 : 0,
        }}
        contentInset={{ bottom: 80 }}>
        <LinearGradient
          colors={['#23282E', '#141517']}
          // locations={[-0.25, 1]}
          start={{
            x: 1,
            y: 0,
          }}
          end={{
            x: 1,
            y: 1,
          }}
          style={{
            flex: 1,
            maxHeight: 400,
            borderRadius: 8,
            marginHorizontal: 16,
            alignItems: 'center',
          }}>
          {this.renderCalendar()}
        </LinearGradient>
      </ScrollView>
    );
  };

  renderCalendar = () => {
    const selected = this.component.state.selectedDate;
    return (
      <Calendar
        scrollEnabled={true}
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
          await this.controller.bookingInMonth(-1);
          subtractMonth();
        }}
        onPressArrowRight={async (addMonth) => {
          await this.controller.bookingInMonth(1);
          addMonth();
        }}
        enableSwipeMonths={true}
        firstDay={1}
        disableMonthChange={true}
        markingType={'custom'}
        disabledByDefault
        markedDates={{
          [selected]: {
            selected: true,
            selectedColor: '#2CDEE4',
            selectedTextColor: 'black',
          },
        }}
        dayComponent={({ date, state, marking }) =>
          this.renderDay(date, state, marking)
        }
        onDayPress={(day) => this.controller.changeTaskList(day)}
        style={styles.calendar}
      />
    );
  };
  renderPlanning = () => {
    return (
      <View style={{ marginTop: 25 }}>
        <View style={styles.tabContainer}>
          <Text
            style={[
              styles.currentDateText,
              {
                marginBottom: 15,
              },
            ]}>
            {this.component.state.currentDate.toUpperCase()}
          </Text>
        </View>
        <View style={styles.alignCenter}>
          {this.component.state.page.length == 0 ? (
            <View style={styles.noAppointmentContainer}>
              <Text style={styles.noAppointmentText}>
                Aucun rendez-vous prévu ce jour-là
              </Text>
            </View>
          ) : this.component.state.carousselLoad ? (
            <Pager pager={this.component.state.page} />
          ) : (
            <View style={styles.appointmentLoader}>
              <ActivityIndicator />
            </View>
          )}
        </View>
        {Platform.OS === 'android'
          ? this.renderCalendarAndroid()
          : this.renderCalendarIos()}
      </View>
    );
  };

  renderAvailability = () => {
    const { coachFilteredTime } = store.getState();
    const curDate = moment().format('YYYY-MM-DD');
    return (
      <View style={{ height: heightPercentageToDP(50) }}>
        <View>
          {this.renderDialog()}
          <View style={{ marginVertical: 10 }}>
            <MonthsSlider onChange={this.controller.onMonthChange.bind(this)} />
          </View>
          <View style={{ marginBottom: 34 }}>
            <FlatList
              ref={(ref) => (this.component.listRef = ref)}
              horizontal={true}
              data={this.component.state.availabilities}
              refreshing={this.component.state.refreshing}
              keyExtractor={() => String(Math.random(10))}
              style={{ marginLeft: 16 }}
              renderItem={({ item, index }) => {
                const borderWidth = item?.availability === curDate ? 1 : 0;
                const date = moment(item.availability).format('YYYY-MM-DD');
                let isBefore =
                  curDate !== date &&
                  moment().toDate() >= moment(item.availability).toDate();

                const backgroundColor = isBefore
                  ? '#393637'
                  : item.availability === this.component.state.selectedDate
                  ? '#2CDEE4'
                  : ['#2D333C', '#101010'];
                const textColor = isBefore
                  ? '#979797'
                  : item.availability === this.component.state.selectedDate
                  ? 'black'
                  : 'white';

                const colors = [];
                if (isBefore) {
                  colors.push('#393637', '#393637');
                } else if (
                  item.availability === this.component.state.selectedDate
                ) {
                  colors.push('#2CDEE4', '#2CDEE4');
                } else {
                  colors.push('#252A30', '#1C1E22');
                }
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.component.setState({
                        selectedDate: item?.availability,
                      });
                      this.controller.getAvailabilities(item?.availability);
                    }}>
                    <LinearGradient
                      disable
                      colors={colors}
                      start={{
                        x: 0,
                        y: 1,
                      }}
                      end={{
                        x: 1,
                        y: 1,
                      }}
                      style={[
                        styles.dayContainer,
                        {
                          backgroundColor,
                          borderWidth,
                          marginLeft: index === 0 ? 0 : 4,
                          marginRight: 4,
                        },
                        ,
                      ]}>
                      <View style={styles.dayTextContainer}>
                        <Text
                          style={[
                            styles.dayText,
                            {
                              color: textColor,
                            },
                          ]}>
                          {item.availability_day}
                        </Text>
                        <Text
                          style={[
                            styles.dayTextNum,
                            {
                              color: textColor,
                            },
                          ]}>
                          {item?.availability_day_num}
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              }}
            />
            <View style={styles.filterContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.controller.openDialog();
                }}>
                <Image
                  style={styles.filterImage}
                  source={require('../../../assets/images/filtre.png')}
                />
              </TouchableOpacity>
              <Text style={styles.filterInfoText}>
                <Text>de</Text>
                <Text style={styles.textColor}>
                  {` ${(slots[coachFilteredTime.start] || slots[0]).substring(
                    0,
                    5,
                  )} `}
                </Text>
                <Text>à</Text>
                <Text style={styles.textColor}>
                  {` ${slots[coachFilteredTime.end].substring(8, 13)}`}
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
                data={this.component.state.currentAvailabilities.slots}
                keyExtractor={(item, index) => String(index)}
                refreshControl={
                  <SidappRefreshControl
                    refreshing={this.component.state.refreshing}
                    onRefresh={this.controller.fetchData}
                  />
                }
                renderItem={({ item, index }) => {
                  const { day } = this.component.state.currentAvailabilities;
                  if (coachFilteredTime) {
                    if (coachFilteredTime.start && coachFilteredTime.end) {
                      if (
                        index < coachFilteredTime.start ||
                        index > coachFilteredTime.end
                      ) {
                        return;
                      }
                    } else if (
                      coachFilteredTime.end &&
                      index > coachFilteredTime.end
                    ) {
                      return;
                    }
                  }

                  let disable = false;

                  if (day < moment().format('YYYY-MM-DD')) {
                    disable = true;
                  } else if (
                    day === moment().format('YYYY-MM-DD') &&
                    parseInt(slots[index].substring(0, 2)) <=
                      moment().format('HH')
                  ) {
                    disable = true;
                  }

                  return (
                    <CoachAvaibility
                      disable={disable}
                      index={index}
                      item={item}
                      onLinePress={this.controller.onLinePress}
                      day={day}
                      handler={() => this.controller.handler(day)}
                      onAthletePress={this.controller.onAthletePress}
                    />
                  );
                }}
              />
            </LinearGradient>
          </View>
        </View>
      </View>
    );
  };

  renderBadge = () => {
    return (
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
            {this.component.state.publicRequest}
          </Text>
        </View>
      </View>
    );
  };
  render() {
    const { navigate } = this.component.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: '#000', marginBottom: 20 }}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigate('AccountScreen');
              }}>
              <View style={styles.userInfoContainer}>
                <Avatar
                  size={37}
                  rounded
                  source={
                    this.component.state.user.profile_picture_url
                      ? {
                          uri: this.component.state.user.profile_picture_url,
                        }
                      : require('../../../assets/images/no_pp.jpg')
                  }
                />
                <Text
                  style={styles.username}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {this.component.state.user.first_name}{' '}
                  {this.component.state.user.last_name}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <TouchableOpacity
                onPress={() => {
                  navigate('PendingRequestCoachScreen');
                }}>
                {this.component.state.publicRequest > 0
                  ? this.renderBadge()
                  : null}
                <Image
                  style={styles.headerRightImage}
                  source={require('../../../assets/images/Demande.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigate('ActivitiesCoachScreen');
                }}
                style={styles.headerRightActivities}>
                {/* {this.renderBadge()} */}
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
              onPress={(value) => this.component.setState({ screen: value })}
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
          {this.component.state.screen == 'Planning'
            ? this.renderPlanning()
            : this.renderAvailability()}
        </View>
      </View>
    );
  }
}
