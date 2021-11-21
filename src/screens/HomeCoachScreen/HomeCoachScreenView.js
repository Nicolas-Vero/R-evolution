import React from 'react';
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
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
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { options } from './homeCoachConfig';
import styles from './HomeCoachScreenStyle';
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

  renderPlanning = () => {
    const selected = this.component.state.selectedDate;
    return (
      <View>
        <View style={styles.tabContainer}>
          <Text style={styles.currentDateText}>
            {this.component.state.currentDate.toUpperCase()}
          </Text>
        </View>
        <View>
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
          <View style={styles.calendarContainer}>
            <ScrollView style={{ flex: 1, maxHeight: 500 }}>
              <Calendar
                theme={{
                  calendarBackground: '#1E2026',
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
                  textMonthFontSize: 22,
                  textDayHeaderFontSize: 16,
                }}
                enableSwipeMonths={true}
                firstDay={1}
                markingType={'custom'}
                markedDates={{
                  [selected]: {
                    selected: true,
                    selectedColor: '#2CDEE4',
                    selectedTextColor: 'black',
                  },
                }}
                // dayComponent={({date, state}) => {
                //   return (
                //     <View>
                //       <Text style={[styles.customDay, state === 'disabled' ? styles.disabledText : styles.defaultText]}>
                //         {date.day}
                //       </Text>
                //     </View>
                //   );
                // }}
                onDayPress={(day) => this.controller.changeTaskList(day)}
                style={styles.calendar}
              />
            </ScrollView>
            <TouchableOpacity
              style={styles.addBookContainer}
              onPress={() => {
                navigate('CreateBookCoachScreen');
              }}>
              <Image
                source={require('../../../assets/images/Group_8766.png')}
                style={styles.addBookImage}
              />
            </TouchableOpacity>
          </View>
        </View>
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
              horizontal={true}
              data={this.component.state.availabilities}
              refreshing={this.component.state.refresh}
              keyExtractor={(item) => item?.date}
              renderItem={({ item }) => {
                const borderWidth = item?.availability === curDate ? 2 : 0;
                const backgroundColor =
                  item.availability === this.component.state.selectedDate
                    ? '#2CDEE4'
                    : '#1E2026';
                const textColor =
                  item.availability === this.component.state.selectedDate
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
            </View>
            <FlatList
              contentContainerStyle={{ paddingBottom: 50 }}
              style={{ maxHeight: heightPercentageToDP(50), marginTop: 5 }}
              data={[this.component.state.currentAvailabilities]}
              //      onRefresh={onRefresh}
              // refreshing={this.component.state.refresh}
              // keyExtractor={(item) => {item?.date;}}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({ item }) => (
                <SwitchButton
                  item={item}
                  handler={() => {
                    this.controller.handler(item);
                  }}
                />
              )}
            />
          </View>
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
                      uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/photo_florian_coach.png',
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
                height={38}
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
                valuePadding={3}
                borderColor="#1E2026"
              />
            </View>
            <View>{/*TO DO: passe les jours en francais  */}</View>
            {this.component.state.screen == 'Planning'
              ? this.renderPlanning()
              : this.renderAvailability()}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
