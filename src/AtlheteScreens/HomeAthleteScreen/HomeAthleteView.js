import React from 'react';
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../components/Button';
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
  Text,
  FlatList,
  Modal,
  Image,
} from 'react-native';
import {
  athlete_booking,
  get_athlete_active_courses,
  get_availabilities,
} from '../../api/Athlete';
import SwitchSelector from 'react-native-switch-selector';
import { Avatar } from 'react-native-elements';
import MonthsSlider from '../../components/MonthsSlider';
import {} from '../../api/Availabilities';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import styles from './HomeAthleteStyle';
import { options, LocaleConfig } from './HomeAthleteConfig';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import { convertSlotToDate } from '../../helpers/dateHelper';

export default class HomeAthleteView extends AbstractScreenView {
  renderHeader() {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigate('AccountAthlete');
          }}>
          <View style={styles.headerLeft}>
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
        <TouchableOpacity
          onPress={() => {
            navigate('Notifications');
          }}
          style={styles.headerRight}>
          <Image
            style={styles.headerRightImage}
            source={require('../../../assets/images/Notif.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
  renderSwitchSelector() {
    return (
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
          style={{ width: widthPercentageToDP(95) }}
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
    );
  }
  renderModal() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.component.state.modalVisible}
        onRequestClose={() => {
          setModalVisible(!this.component.state.modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontFamily: 'Roboto',
                  color: 'white',
                }}>
                Es-tu sûr(e) de vouloir annuler la séance avec{' '}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    color: '#2CDEE4',
                  }}>
                  {this.component.state.coach.first_name}{' '}
                  {this.component.state.coach.last_name}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    color: 'white',
                  }}>
                  de
                </Text>
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    color: '#2CDEE4',
                  }}>
                  {this.component.state.currentSlot.substring(0, 5)}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    color: 'white',
                  }}>
                  a
                </Text>
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    color: '#2CDEE4',
                  }}>
                  {this.component.state.currentSlot.substring(8)}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    color: 'white',
                  }}>
                  ?
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 40 }}>
              <Button
                title="Oui"
                customContainerStyles={{
                  backgroundColor: 'white',
                  height: 30,
                  width: 100,
                  margin: 5,
                }}
                customTextStyle={{
                  color: 'black',
                  fontFamily: 'RobotoBold',
                  fontWeight: 'bold',
                  fontSize: 10,
                }}
                onPress={() => {
                  athlete_booking(this.component.state.book).then(() => {
                    this.controller.getAvailabilities(
                      this.component.state.currentItem,
                    );
                  });
                  this.component.setState({ modalVisible: false });
                }}
              />
              <Button
                title="Non"
                customContainerStyles={{
                  backgroundColor: 'white',
                  height: 30,
                  width: 100,
                  margin: 5,
                }}
                customTextStyle={{
                  color: 'black',
                  fontFamily: 'RobotoBold',
                  fontWeight: 'bold',
                  fontSize: 10,
                }}
                onPress={() => this.component.setState({ modalVisible: false })}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  renderMyAppointment() {
    return (
      <View>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: 'MontserratBoldItalic',
              fontSize: 25,
              color: '#FFFFFF',
              margin: 10,
            }}>
            AUJOURD'HUI
          </Text>
        </View>
        {this.component.state.dayApointement &&
        this.component.state.dayApointement.length ? (
          <FlatList
            data={this.component.state.dayApointement}
            refreshing={this.component.state.refresh}
            keyExtractor={(item) => item?.id.toString()}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    console.log(item);
                  }}>
                  <View
                    style={{
                      backgroundColor: '#2CDEE4',
                      flexDirection: 'row',
                      height: 70,
                      justifyContent: 'space-around',
                      alignContent: 'center',
                      margin: 10,
                      borderRadius: 5,
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Avatar
                        size={65}
                        rounded
                        source={{
                          uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
                        }}
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        flexDirection: 'column',
                        marginRight: 40,
                      }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text
                          style={{
                            fontFamily: 'RobotoBold',
                            fontSize: 25,
                            marginBottom: 5,
                          }}>
                          {item?.athlete.first_name} {item?.athlete?.last_name}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontFamily: 'Roboto',
                          fontSize: 10,
                          marginBottom: 15,
                        }}>
                        Séance: {item?.session_number}/
                        {item?.athleteCourse?.total_sessions}
                      </Text>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 20,
                        }}>
                        {convertSlotToDate(item?.slot)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: 'Montserrat',
                fontSize: 17,
                color: '#DFDFDF',
                margin: 10,
              }}>
              Aucune séance
            </Text>
          </View>
        )}
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: 'MontserratBoldItalic',
              fontSize: 25,
              color: '#FFFFFF',
              margin: 20,
            }}>
            À VENIR
          </Text>
        </View>
        {this.component.state.upcomingApointement &&
        this.component.state.upcomingApointement.length ? (
          <FlatList
            style={{ maxHeight: heightPercentageToDP(45) }}
            data={this.component.state.upcomingApointement}
            // onRefresh={onRefresh}
            refreshing={this.component.state.refresh}
            keyExtractor={(item) => item?.id.toString()}
            renderItem={({ item }) => {
              return (
                <View style={{ alignItems: 'center' }}>
                  {item?.show == 1 ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        width: widthPercentageToDP(94),
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          flex: 2,
                          fontSize: 10,
                          fontFamily: 'MontserratBoldItalic',
                        }}>
                        {moment(item?.date).format('dddd D MMMM')}
                      </Text>
                      <View
                        style={{
                          borderColor: 'white',
                          flex: 5,
                          borderBottomWidth: 1,
                        }}></View>
                    </View>
                  ) : (
                    <View></View>
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      console.log(item);
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignContent: 'center',
                        backgroundColor: '#1E2026',
                        margin: 10,
                        width: widthPercentageToDP(94),
                        borderRadius: 5,
                      }}>
                      <View
                        style={{
                          height: 70,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Avatar
                          size="medium"
                          rounded
                          source={{
                            uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
                          }}
                        />
                      </View>

                      <View
                        style={{
                          justifyContent: 'center',
                          flexDirection: 'column',
                          marginRight: 40,
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              fontSize: 17,
                              color: 'white',
                            }}>
                            {item?.athlete.first_name} {item?.athlete.last_name}
                          </Text>
                        </View>
                        <Text style={{ fontSize: 12, color: 'white' }}>
                          Séance : {item?.session_number}/
                          {item?.athleteCourse?.total_sessions}
                        </Text>
                      </View>
                      <View style={{ justifyContent: 'center' }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 15,
                            color: 'white',
                          }}>
                          {convertSlotToDate(item?.slot)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: 'Montserrat',
                fontSize: 17,
                color: '#DFDFDF',
                margin: 10,
              }}>
              Aucune séance
            </Text>
          </View>
        )}
      </View>
    );
  }

  renderReserve() {
    const curDate = moment().format('YYYY-MM-DD');

    return (
      <LinearGradient
        colors={['black', '#2D333C']}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={styles.reserveContainer}>
        {this.renderModal()}
        <MonthsSlider onChange={this.controller.onMonthChange.bind(this)} />
        {this.component.state.coach.first_name ? (
          <Text style={styles.coachName}>
            Les diponibilités de{' '}
            <Text style={styles.textColored}>
              {`${this.component.state.coach.first_name} ${this.component.state.coach.last_name}`}
            </Text>
          </Text>
        ) : (
          <Text style={styles.coachName}>Pas de coach associé</Text>
        )}
        <View>
          <FlatList
            style={styles.flatlist}
            horizontal={true}
            data={this.component.state.availabilities}
            // onRefresh={onRefresh}
            refreshing={this.component.state.refresh}
            keyExtractor={(item) => item?.date}
            renderItem={({ item }) => {
              const borderWidth = item?.availability === curDate ? 2 : 0;
              const backgroundColor =
                item?.availability === this.component.state.selectedDate
                  ? '#2CDEE4'
                  : '#1E2026';
              const textColor =
                item?.availability === this.component.state.selectedDate
                  ? 'black'
                  : 'white';
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.component.setState({
                      selectedDate: item?.availability,
                    });
                    this.controller.getAvailabilities(item);
                    this.component.setState({ currentItem: item });
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
        </View>
        <View>
          <Text style={styles.reserveInfoText}>
            {this.component.state.coach.first_name
              ? "Tu peux annuler une séance jusqu'à 24h avant le début de celle-ci."
              : 'tu dois être pris en charge par un coach associé pour voir ces diponibilitées'}
          </Text>
        </View>
        <FlatList
          data={this.component.state.currentAvailabilities}
          extraData={this.component.state}
          //onRefresh={onRefresh}
          refreshing={this.component.state.refresh}
          keyExtractor={(item) => {
            item?.slot;
          }}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.reserveItem,
                {
                  marginTop: index === 0 ? 0 : 9,
                },
              ]}>
              <Text style={styles.reserveItemText}>
                {convertSlotToDate(item?.slot)}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.component.setState({
                    currentSlot: convertSlotToDate(item?.slot),
                  });
                  const bookInformation = {
                    date: this.component.state.selectedDate,
                    coach_id: this.component.state.coach_id,
                    currentSlot: item?.slot,
                    athlete_course_id: this.component.state.athleteCourse.id,
                  };
                  this.component.setState({ book: bookInformation });
                  this.component.setState({ modalVisible: true });
                }}
                style={styles.reserveItemButton}
                title="Réserver ce créneau">
                <Text style={styles.reserveItemButtonText}>
                  Réserver ce créneau
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </LinearGradient>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderSwitchSelector()}
        <View>{/*TO DO: passe les jours en francais  */}</View>
        {this.component.state.screen == 'MES RENDEZ-VOUS'
          ? this.renderMyAppointment()
          : this.renderReserve()}
      </View>
    );
  }
}
