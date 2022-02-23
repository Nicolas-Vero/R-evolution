import React from 'react';
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import Pager from '../../common/Carrousel';
import SwitchSelector from 'react-native-switch-selector';
import { Avatar } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import MonthsSlider from '../../components/MonthsSlider';
import SwitchButton from '../../components/SwitchButton';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { options } from './homeCoachConfig';
import styles from './HomeCoachScreenStyle';
import SidappRefreshControl from '../../components/SidappRefreshControl/SidappRefreshControl';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

export default class HomeCoachScreenView extends AbstractScreenView {
  renderDialog() {
    return (
      <TreshRequestDialog
        dialogVisible={this.state.dialogVisible}
        onClose={this.controller.onCloseonDismissDialog}
        onValidate={this.controller.onValidate}
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

    let bg = marking && !isToday ? '#2CDEE4' : '';
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
        style={{ height: 25, width: 30 }}
        onPress={() => {
          this.controller.changeTaskList(date);
        }}>
        {this.component.state.MonthBookingNumberPerDay[date.day - 1] > 0 &&
        new Date(this.component.state.currentMonth).getMonth() + 1 ===
          date.month ? (
          <View
            style={{
              zIndex: 1,
              position: 'absolute',
              right: -7,
              width: 13,
              height: 13,
              borderRadius: 10,
              backgroundColor: badgeBg,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 8,
                  color: badgeTextColor,
                  fontFamily: 'Montserrat',
                }}>
                {this.component.state.MonthBookingNumberPerDay[date.day - 1]}
              </Text>
            </View>
          </View>
        ) : null}
        <View
          style={{
            // borderWidth: isToday ? 1 : 0,
            // borderColor: isToday ? '#2CDEE4' : '#393637',
            alignItems: 'center',
            justifyContent: 'center',
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: bg,
          }}>
          <Text
            style={{
              color: textColor,
              fontSize: 15,
              fontFamily: 'MontserratMedium',
            }}>
            {date.day}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  renderPlanning = () => {
    const selected = this.component.state.selectedDate;
    const pageLength = this.component.state.page.length;
    return (
      <View style={{ marginTop: 15 }}>
        <View style={styles.tabContainer}>
          <Text
            style={[
              styles.currentDateText,
              {
                marginBottom: pageLength === 0 ? 25 : 0,
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
        <ScrollView>
          <View
            style={{
              marginTop: pageLength == 0 ? 25 : 0,
            }}>
            <LinearGradient
              colors={['#2D333C', '#101010']}
              start={{
                x: 0,
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
              <Calendar
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
                onPressArrowLeft={(subtractMonth) => {
                  subtractMonth();
                  this.controller.bookingInMonth(-1);
                }}
                onPressArrowRight={(addMonth) => {
                  addMonth();
                  this.controller.bookingInMonth(1);
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
            </LinearGradient>
          </View>
        </ScrollView>
      </View>
    );
  };

  renderAvailability = () => {
    const curDate = moment().format('YYYY-MM-DD');
    return (
      <View style={{ height: heightPercentageToDP(50) }}>
        <View>
          <MonthsSlider onChange={this.controller.onMonthChange.bind(this)} />
          <View style={{ marginBottom: 34 }}>
            <FlatList
              ref={(ref) => (this.component.listRef = ref)}
              horizontal={true}
              data={this.component.state.availabilities}
              refreshing={this.component.state.refreshing}
              keyExtractor={() => String(Math.random(10))}
              renderItem={({ item }) => {
                const borderWidth = item?.availability === curDate ? 2 : 0;
                const date = moment(item.availability).format('YYYY-MM-DD');
                let isBefore =
                  curDate !== date &&
                  moment().toDate() >= moment(item.availability).toDate();

                const backgroundColor = isBefore
                  ? '#393637'
                  : item.availability === this.component.state.selectedDate
                  ? '#2CDEE4'
                  : '#1E2026';
                const textColor = isBefore
                  ? '#979797'
                  : item.availability === this.component.state.selectedDate
                  ? 'black'
                  : 'white';
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.component.setState({
                        selectedDate: item?.availability,
                      });
                      this.controller.getAvailabilities(item?.availability);
                    }}>
                    <View
                      style={[
                        styles.dayContainer,
                        { backgroundColor: backgroundColor },
                        { borderWidth: borderWidth },
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
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
            {/* <View style={styles.filterContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.controller.openDialog();
                }}>
                <Image
                  style={styles.filterImage}
                  source={require('../../../assets/images/filtre.png')}
                />
              </TouchableOpacity>
            </View> */}
            <FlatList
              contentContainerStyle={{ paddingBottom: 60 }}
              style={{ maxHeight: heightPercentageToDP(50), marginTop: 25 }}
              data={[this.component.state.currentAvailabilities.avaibilities]}
              keyExtractor={(item) => String(item.time)}
              refreshControl={
                <SidappRefreshControl
                  refreshing={this.component.state.refreshing}
                  onRefresh={this.controller.fetchData}
                />
              }
              renderItem={({ item }) => {
                return (
                  <SwitchButton
                    onLinePress={this.controller.onLinePress}
                    onAthletePress={this.controller.onAthletePress}
                    day={this.component.state.currentAvailabilities.day}
                    today={this.component.state.today}
                    item={item}
                    handler={() => {
                      this.controller.handler(item);
                    }}
                  />
                );
              }}
            />
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
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <View style={{ marginTop: 20 }}>
            <View style={styles.headerLeft}>
              <TouchableOpacity
                onPress={() => {
                  navigate('AccountScreen');
                }}>
                <View style={styles.userInfoContainer}>
                  <Avatar
                    size={37}
                    rounded
                    source={{
                      uri:
                        this.component.state.user.profile_picture_url ||
                        '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
                    }}
                  />
                  <Text style={styles.username}>
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
          </View>
          <View style={styles.headerBorder}></View>
          <View>
            <View style={styles.alignCenter}>
              <SwitchSelector
                options={options}
                initial={0}
                onPress={(value) => this.component.setState({ screen: value })}
                backgroundColor="#1E2026"
                buttonColor="#2CDEE4"
                selectedColor="#1E2026"
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
            <View>{/*TO DO: passe les jours en francais  */}</View>
            {this.component.state.screen == 'Planning' ? (
              <View>{this.renderPlanning()}</View>
            ) : (
              this.renderAvailability()
            )}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
