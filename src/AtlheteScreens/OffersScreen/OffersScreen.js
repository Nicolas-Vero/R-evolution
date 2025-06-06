import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import SwitchSelector from 'react-native-switch-selector';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import RenewOfferDialog from '../../components/dialogs/renewOfferDialog/renewOfferDialog';
import styles from './OffersScreenStyle';
import { ScreenContainer } from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import { useOffersScreen } from './useOffersScreen'; // le hook ci-dessus

const options = [
  { label: 'EN COURS', value: 'EN COURS' },
  { label: 'CATALOGUE', value: 'CATALOGUE' },
];

const OffersScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const tab = props.tab ?? route.params?.tab ?? 0; // Fallback params
  const {
    offers,
    screen,
    setScreen,
    activeCourses,
    isLoaded,
    isDialogVisible,
    openDialog,
    closeDialog,
  } = useOffersScreen(tab);

  const renderSwitchSelector = () => (
    <View style={styles.alignCenter}>
      <SwitchSelector
        options={options}
        initial={screen === 'CATALOGUE' ? 1 : 0}
        onPress={setScreen}
        backgroundColor="#1E2026"
        buttonColor="#2CDEE4"
        selectedColor="#1E2026"
        textColor="white"
        borderRadius={10}
        height={45}
        hasPadding
        fontSize={13}
        style={{ width: 'auto' }}
        selectedTextStyle={{ fontFamily: 'MontserratBoldItalic', lineHeight: 15 }}
        textStyle={{ fontFamily: 'MontserratBoldItalic', lineHeight: 15 }}
        borderColor="#1E2026"
      />
    </View>
  );

  const renderCurrentOffer = () => {
    if (!activeCourses || !activeCourses.offer || !activeCourses.coach) return null;
    const { offer, coach, total_sessions, booked_session } = activeCourses;
    const sessionsLeft = total_sessions - booked_session;

    return (
      <LinearGradient colors={["#101010", "#2D333C"]} style={styles.currentOffer}>
        <View style={styles.currentOfferCoach}>
          <Avatar
            size={44}
            rounded
            source={
              coach.profile_picture_url
                ? { uri: coach.profile_picture_url }
                : require('../../../assets/images/no_pp.jpg')
            }
          />
          <Text style={styles.currentOfferCoachName} numberOfLines={1} ellipsizeMode="tail">
            {coach.first_name} {coach.last_name}
          </Text>
        </View>
        <Text style={styles.currentOfferTitle}>{offer.title}</Text>
        <Text style={styles.currentOfferContent}>{offer.content}</Text>
        <View style={styles.currentOfferInfos}>
          <Text style={styles.currentOfferSessions}>{`${total_sessions} coachings`}</Text>
          <Text style={styles.currentOfferPrice}>{`${offer.price}€`}</Text>
        </View>
        <View style={styles.currentOfferSessionsLeftContainer}>
          <Text style={styles.currentOfferSessionsLefText}>
            {`Nombre de séances restantes: ${sessionsLeft}`}
          </Text>
        </View>
      </LinearGradient>
    );
  };

  const renderCatalog = () => (
    <View style={{ height: '100%' }}>
      <RenewOfferDialog
        isNewOffer={true}
        dialogVisible={isDialogVisible}
        onClose={closeDialog}
        onValidate={() => {
          navigation.navigate('AthletesStack');
          closeDialog();
        }}
      />
      <FlatList
        contentContainerStyle={{ paddingBottom: 200 }}
        style={styles.flatlist}
        data={offers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <LinearGradient
            colors={['#101010', '#2D333C']}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={[styles.catalogItem, { marginTop: index === 0 ? 0 : 5 }]}
          >
            <Text style={styles.catalogItemTitle}>{item.title}</Text>
            <Text style={styles.catalogItemDescription}>{item.content}</Text>
            <Text style={styles.catalogItemCoaching}>{item.nb_credits} coachings</Text>
            <TouchableOpacity
              onPress={openDialog}
              style={styles.catalogItemButtonContainer}
            >
              <View style={styles.catalogItemButton}>
                <Text style={styles.catalogItemButtonText}>Choisir cette offre</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        )}
      />
    </View>
  );

  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <ActivityIndicator />
        </View>
      </View>
    );
  }

  return (
    <ScreenContainer>
      <Header title="LES OFFRES" disableBackPress />
      {renderSwitchSelector()}
      {screen === 'EN COURS'
        ? (activeCourses?.offer ? renderCurrentOffer() : (
          <View style={styles.noCourContainer}>
            <Text style={styles.noCourText}>Pas de cours actif</Text>
          </View>
        ))
        : (offers.length ? renderCatalog() : (
          <View style={{ alignItems: 'center', marginTop: 100 }}>
            <Text style={{ fontFamily: 'RobotoBold', fontSize: 20, color: '#FFF' }}>
              Pas de coach associé
            </Text>
          </View>
        ))}
    </ScreenContainer>
  );
};

export default OffersScreen;
