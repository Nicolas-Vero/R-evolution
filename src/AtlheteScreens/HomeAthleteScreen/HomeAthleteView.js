import React from 'react';
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../components/Button';
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Modal,
  Image,
} from 'react-native';
import { athlete_booking } from '../../api/Athlete';
import SwitchSelector from 'react-native-switch-selector';
import { Avatar } from 'react-native-elements';
import MonthsSlider from '../../components/MonthsSlider';
import {} from '../../api/Availabilities';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import styles from './HomeAthleteStyle';
import { options } from './HomeAthleteConfig';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import { convertSlotToDate } from '../../helpers/dateHelper';
import RenewOfferDialog from '../../components/dialogs/renewOfferDialog/renewOfferDialog';
import BookOfferDialog from '../../components/dialogs/bookSessionDialog/bookOfferDialog';
import UnBookOfferDialog from '../../components/dialogs/unBookSessionDialog/unBookOfferDialog';
import { isIphoneX } from 'react-native-iphone-x-helper';
export default class HomeAthleteView extends AbstractScreenView {
  renderHeader() {
    return (
      <View style={{ paddingTop: isIphoneX() ? 30 : 20 }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigate('AccountScreen');
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
              navigate('NotificationsScreen');
            }}
            style={styles.headerRight}>
            <Image
              style={styles.headerRightImage}
              source={require('../../../assets/images/Notif.png')}
            />
          </TouchableOpacity>
        </View>
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
          style={{ width: widthPercentageToDP(91.5) }}
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

  renderRenewOfferDialog() {
    return (
      <RenewOfferDialog
        dialogVisible={this.component.state.isRenewDialogVisible}
        onClose={this.controller.onDismissRenewDialog}
        onValidate={this.controller.onCoachPress}
      />
    );
  }

  renderBookDialog() {
    const coachName = `${this.component.state.coach.first_name} ${this.component.state.coach.last_name}`;
    return (
      <BookOfferDialog
        coachName={coachName}
        slot={this.component.state.currentSlot}
        dialogVisible={this.component.state.isBookOfferDialogVisible}
        onClose={this.controller.onDismissBookDialog}
        onValidate={this.controller.onBook}
      />
    );
  }

  renderUnbookDialog() {
    const coachName = `${this.component.state.coach.first_name} ${this.component.state.coach.last_name}`;
    return (
      <UnBookOfferDialog
        coachName={coachName}
        slot={this.component.state.currentSlot}
        dialogVisible={this.component.state.isUnBookOfferDialogVisible}
        onClose={this.controller.onDismissUnBookDialog}
        onValidate={this.controller.onUnbook}
      />
    );
  }

  renderInfos = () => {
    return this.component.state.coach ? (
      <View style={styles.renewContainer}>
        {this.renderRenewOfferDialog()}
        <Text style={styles.renewText}>
          IL NE TE RESTE QUE <Text style={styles.textColored}>"X"</Text>
          SÉANCES SUR TON
          <Text style={styles.textColored}> "PACK X"</Text>
        </Text>
        <TouchableOpacity
          onPress={this.controller.onRenewOfferPress}
          style={styles.renewButton}>
          <Text style={styles.renewButtonText}>Renouveler l'offre</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.noCoachContainer}>
        <Text style={styles.noCoachText}>
          Ta demande est en cours de traitement. Un coach te contactera
          prochainement pour répondre à tes besoins.
        </Text>
      </View>
    );
  };
  renderMyAppointment() {
    return (
      <View style={styles.content}>
        {this.renderInfos()}
        <Text style={styles.appointmentText}>AUJOURD'HUI</Text>
        {this.component.state.dayApointement &&
        this.component.state.dayApointement.length ? (
          <FlatList
            data={this.component.state.dayApointement}
            refreshing={this.component.state.refresh}
            keyExtractor={(item) => item?.id.toString()}
            renderItem={({ item }) => {
              return (
                <View style={styles.appointmentTodayItem}>
                  <View style={styles.appointmentTodayItemLeft}>
                    <Avatar
                      size={44}
                      rounded
                      source={{
                        uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
                      }}
                    />
                    <View style={styles.appointmentTodayItemLeftTexts}>
                      <Text style={styles.appointmentTodayItemLeftUsername}>
                        {`${this.component.state.coach.first_name} ${this.component.state.coach.last_name}`}
                      </Text>
                      <Text style={styles.appointmentTodayItemLeftSession}>
                        Séance: {item?.session_number}/
                        {item?.athleteCourse?.total_sessions}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.appointmentTodayItemRight}>
                    <Text style={styles.appointmentTodayItemRightText}>
                      {convertSlotToDate(item?.slot)}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <Text style={styles.noSeanceText}>Aucune séance</Text>
        )}
        <Text style={styles.appointmentText}>À VENIR</Text>

        {this.component.state.upcomingApointement &&
        this.component.state.upcomingApointement.length ? (
          <FlatList
            style={{ maxHeight: heightPercentageToDP(45) }}
            data={this.component.state.upcomingApointement}
            refreshing={this.component.state.refresh}
            keyExtractor={(item) => item?.id.toString()}
            renderItem={({ item }) => {
              return (
                <View>
                  {item?.show == 1 ? (
                    <View style={styles.appointmentItemDateContainer}>
                      <Text style={styles.appointmentItemDateText}>
                        {moment(item?.date).format('dddd D MMMM').toUpperCase()}
                      </Text>
                      <View
                        style={{
                          borderColor: 'white',
                          flex: 1,
                          borderBottomWidth: 0.3,
                        }}></View>
                    </View>
                  ) : null}
                  <View style={styles.appointmentTodayItem}>
                    <View style={styles.appointmentTodayItemLeft}>
                      <Avatar
                        size={44}
                        rounded
                        source={{
                          uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
                        }}
                      />
                      <View style={styles.appointmentTodayItemLeftTexts}>
                        <Text style={styles.appointmentTodayItemLeftUsername}>
                          {item?.athlete.first_name} {item?.athlete?.last_name}
                        </Text>
                        <Text style={styles.appointmentTodayItemLeftSession}>
                          Séance: {item?.session_number}/
                          {item?.athleteCourse?.total_sessions}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.appointmentTodayItemRight}>
                      <Text style={styles.appointmentTodayItemRightText}>
                        {convertSlotToDate(item?.slot)}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <Text style={styles.noSeanceText}>Aucune séance</Text>
        )}
      </View>
    );
  }

  renderReserve() {
    const curDate = moment().format('YYYY-MM-DD');
    const { coach } = this.component.state;
    console.log(coach);

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
        {coach ? this.renderBookDialog() : null}
        {coach ? this.renderUnbookDialog() : null}
        {coach ? (
          <View>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                fontSize: 13,
                fontFamily: 'MontserratBoldItalic',
                marginTop: 24,
                marginBottom: 5,
              }}>
              IL TE RESTE 2 SÉANCES À PLACER
            </Text>
          </View>
        ) : null}

        <MonthsSlider onChange={this.controller.onMonthChange.bind(this)} />
        {coach ? (
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
            ref={(ref) => (this.component.listRef = ref)}
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
                  onPress={() => this.controller.onDayPress(item)}>
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
            {coach
              ? "Tu peux annuler une séance jusqu'à 24h avant le début de celle-ci."
              : 'Tu dois être suivi(e) par un coach pour voir ses disponibilités'}
          </Text>
        </View>
        <FlatList
          style={{ marginHorizontal: 50 }}
          contentContainerStyle={{ paddingBottom: 50 }}
          data={this.component.state.currentAvailabilities}
          extraData={this.component.state}
          //onRefresh={onRefresh}
          refreshing={this.component.state.refresh}
          keyExtractor={(item) => {
            item?.slot;
          }}
          renderItem={({ item, index }) => {
            const { disableAction } = this.component.state;
            return (
              <View
                style={[
                  styles.reserveItem,
                  {
                    marginTop: index === 0 ? 0 : 9,
                  },
                ]}>
                <View style={styles.reserveLeft}>
                  <Text style={styles.reserveItemText}>
                    {convertSlotToDate(item?.slot)}
                  </Text>
                </View>
                <View style={styles.reserveRight}>
                  {item.value ? (
                    <TouchableOpacity
                      disabled={disableAction}
                      onPress={() => {
                        this.controller.onBookOfferPress(item?.slot);
                      }}
                      style={styles.reserveItemButton}>
                      <Text style={styles.reserveItemButtonText}>
                        Réserver ce créneau
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      disabled={disableAction}
                      onPress={() => {
                        this.controller.onUnbookOfferPress(item.slot);
                      }}
                      style={styles.unReserveItemButton}>
                      <Text style={styles.unReserveItemButtonText}>
                        Annuler ma réservation
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          }}
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
