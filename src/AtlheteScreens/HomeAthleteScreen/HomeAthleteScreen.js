import { React, useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import SwitchSelector from 'react-native-switch-selector';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import moment from 'moment';

import { useHomeAthlete } from './useHomeAthlete';
import MonthsSlider from '../../components/MonthsSlider';
import RenewOfferDialog from '../../components/dialogs/renewOfferDialog/renewOfferDialog';
import BookOfferDialog from '../../components/dialogs/bookSessionDialog/bookOfferDialog';
import UnBookOfferDialog from '../../components/dialogs/unBookSessionDialog/unBookOfferDialog';
import styles from './HomeAthleteStyle';
import { options } from './HomeAthleteConfig';
import { convertSlotToDate } from '../../helpers/dateHelper';
import { ScreenContainer } from '../../components/abstracts/AbstractScreen/AbstractScreenView';

const HomeAthleteScreen = () => {
  const navigation = useNavigation();
  const { state,
    listRef,
    onMonthChange,
    onDayPress,
    onBookOfferPress,
    onBook,
    onUnbookOfferPress,
    onUnbook,
    getAvailabilities,
    onCatalogPress,
    onCoachPress,
    toggleRenewDialog,
    toggleBookDialog,
    toggleUnBookDialog } = useHomeAthlete(navigation);
  const [screen, setScreen] = useState('MES RENDEZ-VOUS');
  const [isRenewDialogVisible, setIsRenewDialogVisible] = useState(false);
  const handleCloseRenewDialog = () => setIsRenewDialogVisible(false);
  const [isbookDialogVisible, setIsbookDialogVisible] = useState(false);
  const handleCloseBookDialog = () => setIsbookDialogVisible(false);
  const [isUnbookDialogVisible, setisUnbookDialogVisible] = useState(false);
  const handleCloseUnbookDialog = () => setisUnbookDialogVisible(false);


  if (!state.isLoad) return null;

  const renderHeader = () => (
    <View style={{ paddingTop: 30 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
          <View style={styles.headerLeft}>
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
        <TouchableOpacity
          onPress={() => navigation.navigate('NotificationsScreen')}
          style={styles.headerRight}
        >
          <Image
            style={styles.headerRightImage}
            source={require('../../../assets/images/Notif.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSwitchSelector = () => (
    <View style={styles.alignCenter}>
      <SwitchSelector
        options={options}
        initial={0}
        onPress={(value) => setScreen(value)}
        backgroundColor="#1E2026"
        buttonColor="#2CDEE4"
        selectedColor="#1E2026"
        textColor="white"
        borderRadius={10}
        height={45}
        style={{ width: widthPercentageToDP(91.5) }}
        hasPadding
        fontSize={13}
        selectedTextStyle={{ fontFamily: 'MontserratBoldItalic', lineHeight: 15 }}
        textStyle={{ fontFamily: 'MontserratBoldItalic', lineHeight: 15 }}
        borderColor="#1E2026"
      />
    </View>
  );

  const renderDialogs = () => (
    <>
      <RenewOfferDialog
        dialogVisible={isRenewDialogVisible}
        onClose={handleCloseRenewDialog}
        onValidate={onCoachPress}
      />
      <BookOfferDialog
        coachName={`${state.coach?.first_name} ${state.coach?.last_name}`}
        haveCourse={state.athleteCourse}
        slot={state.currentSlot}
        dialogVisible={isbookDialogVisible}
        onClose={handleCloseBookDialog}
        onValidate={onBook}
      />
      <UnBookOfferDialog
        coachName={`${state.coach?.first_name} ${state.coach?.last_name}`}
        slot={state.currentSlot}
        dialogVisible={isUnbookDialogVisible}
        onClose={handleCloseUnbookDialog}
        onValidate={onUnbook}
      />
    </>
  );
  const renderInfos = () => {
    if (!state.athleteCourse) return null;
    const sessionsLeft =
      state.athleteCourse.total_sessions - state.athleteCourse.booked_session;
    const renderSessionLeft =
      sessionsLeft <= state.athleteCourse.total_sessions / 3;

    return sessionsLeft && renderSessionLeft ? (
      <View style={styles.renewContainer}>
        {renderRenewOfferDialog()}
        <Text style={styles.renewText}>
          IL NE TE RESTE QUE{' '}
          <Text style={styles.textColored}>{sessionsLeft}</Text>
          {' '}SÉANCES SUR TON
          <Text style={styles.textColored}>
            {' '}
            {state.athleteCourse.offer?.title}
          </Text>
        </Text>
        <TouchableOpacity
          onPress={onRenewOfferPress}
          style={styles.renewButton}
        >
          <Text style={styles.renewButtonText}>Renouveler l'offre</Text>
        </TouchableOpacity>
      </View>
    ) : state.coach ? null : (
      <View style={styles.noCoachContainer}>
        <Text style={styles.noCoachText}>
          Ta demande est en cours de traitement. Un coach te contactera prochainement pour répondre à tes besoins.
        </Text>
      </View>
    );
  };
  const renderMyAppointment = () => (
    <View style={styles.content}>
      {renderInfos()}
      <Text style={styles.appointmentText}>AUJOURD'HUI</Text>
      {state.dayApointement && state.dayApointement.length ? (
        <FlatList
          data={state.dayApointement}
          refreshing={state.refresh}
          keyExtractor={(item) => item?.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.appointmentTodayItem}>
              <View style={styles.appointmentTodayItemLeft}>
                <Avatar
                  size={44}
                  rounded
                  source={
                    state.coach?.profile_picture_url
                      ? { uri: state.coach.profile_picture_url }
                      : require('../../../assets/images/no_pp.jpg')
                  }
                />
                <View style={styles.appointmentTodayItemLeftTexts}>
                  <Text style={styles.appointmentTodayItemLeftUsername}>
                    {`${moment(item.date).format('dddd DD MMMM')}`}
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
          )}
        />
      ) : (
        <Text style={styles.noSeanceText}>Aucune séance</Text>
      )}
      <Text style={styles.appointmentText}>À VENIR</Text>
      {state.upcomingApointement && state.upcomingApointement.length ? (
        <FlatList
          style={{ maxHeight: heightPercentageToDP(45) }}
          data={state.upcomingApointement}
          refreshing={state.refresh}
          keyExtractor={(item) => item?.id.toString()}
          renderItem={({ item }) => (
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
                    }}
                  />
                </View>
              ) : null}
              <View style={styles.appointmentTodayItem}>
                <View style={styles.appointmentTodayItemLeft}>
                  <Avatar
                    size={44}
                    rounded
                    source={
                      state.coach?.profile_picture_url
                        ? { uri: state.coach.profile_picture_url }
                        : require('../../../assets/images/no_pp.jpg')
                    }
                  />
                  <View style={styles.appointmentTodayItemLeftTexts}>
                    <Text style={styles.appointmentTodayItemLeftUsername}>
                      {`${moment(item.date).format('dddd DD MMMM')}`}
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
          )}
        />
      ) : (
        <Text style={styles.noSeanceText}>Aucune séance</Text>
      )}
    </View>
  );

  const renderReserve = () => {
    const curDate = moment().format('YYYY-MM-DD');
    const coach = state.coach;
    const sessionsLeft =
      state.athleteCourse.total_sessions - state.athleteCourse.booked_session;
    return (
      <LinearGradient
        colors={['black', '#2D333C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.reserveContainer}
      >

        <Text style={styles.reserveTitle}>RESERVEZ VOTRE SÉANCE</Text>
        {coach ? renderBookDialog() : null}
        {coach ? renderUnbookDialog() : null}
        {coach && state.athleteCourse.total_sessions ? (
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
              IL TE RESTE
              <Text style={{ color: '#2CDEE4' }}>{` ${sessionsLeft} `}</Text>
              {`SÉANCE${sessionsLeft > 1 ? 'S' : ''}`} À PLACER
            </Text>
          </View>
        ) : null}
        <MonthsSlider onChange={onMonthChange} />
        {coach ? (
          <Text style={styles.coachName}>
            Les disponibilités de{' '}
            <Text
              style={styles.textColored}
              numberOfLines={1}
              ellipsizeMode="tail">
              {`${coach.first_name} ${coach.last_name}`}
            </Text>
          </Text>
        ) : (
          <Text style={styles.coachName}>Pas de coach associé</Text>
        )}
        <View>
          <FlatList
            ref={listRef}
            style={styles.flatlist}
            horizontal
            data={state.availabilities}
            refreshing={state.refresh}
            keyExtractor={(item) => item?.date}
            renderItem={({ item }) => {
              const date = moment(item.availability).format('YYYY-MM-DD');
              let isBefore =
                curDate !== date &&
                moment().toDate() >= moment(item.availability).toDate();
              const backgroundColor = isBefore
                ? '#393637'
                : item.availability === state.selectedDate
                  ? '#2CDEE4'
                  : '#1E2026';
              const textColor = isBefore
                ? '#979797'
                : item.availability === state.selectedDate
                  ? 'black'
                  : 'white';
              const borderWidth = item?.availability === curDate ? 2 : 0;
              return (
                <TouchableOpacity
                  onPress={() => onDayPress(item)}
                >
                  <View
                    style={[
                      styles.dayContainer,
                      { backgroundColor, borderWidth },
                    ]}
                  >
                    <View style={styles.dayTextContainer}>
                      <Text style={[styles.dayText, { color: textColor }]}>
                        {item.availability_day}
                      </Text>
                      <Text style={[styles.dayTextNum, { color: textColor }]}>
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
          data={state.currentAvailabilities}
          refreshing={state.refresh}
          keyExtractor={(item, index) => `slot-${item.slot}-${index}`}
          renderItem={({ item, index }) => {
            const { disableAction } = state;
            return (
              <View
                style={[
                  styles.reserveItem,
                  { marginTop: index === 0 ? 0 : 9 },
                ]}
              >
                <View style={styles.reserveLeft}>
                  <Text style={styles.reserveItemText}>
                    {convertSlotToDate(item?.slot)}
                  </Text>
                </View>
                <View style={styles.reserveRight}>
                  {item.value ? (
                    <TouchableOpacity
                      disabled={disableAction}
                      onPress={() => onBookOfferPress(item?.slot)}
                      style={styles.reserveItemButton}
                    >
                      <Text style={styles.reserveItemButtonText}>
                        Réserver ce créneau
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      disabled={disableAction}
                      onPress={() => onUnbookOfferPress(item.slot)}
                      style={styles.unReserveItemButton}
                    >
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
  };
  const renderContent = () => {
    if (screen === 'MES RENDEZ-VOUS') {
      return <>{renderReserve()}</>;
    } else {
      return <>{renderMyAppointment()}</>;
    }
  };

  return (
    <ScreenContainer>
      {renderHeader()}
      {renderSwitchSelector()}
      {renderDialogs()}
      {renderContent()}
    </ScreenContainer>
  );
};

export default HomeAthleteScreen;
