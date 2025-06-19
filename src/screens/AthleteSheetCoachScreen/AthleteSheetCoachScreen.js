import React from 'react';
import moment from 'moment';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Linking,
  FlatList,
} from 'react-native';
import { Avatar, Switch } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import HeaderLight from '../../components/HeaderLight';
import CancelBookDialog from '../../components/dialogs/cancelBookDialog/cancelBookDialog';
import UnlinkAthleteDialog from '../../components/dialogs/unlinkAthleteDialog/unlinkAthleteDialog';
import SidappRefreshControl from '../../components/SidappRefreshControl/SidappRefreshControl';
import { convertSlotToDate } from '../../helpers/dateHelper';
import styles from './AthleteSheetCoachScreenStyle';
import { useAthleteSheetCoachScreen } from './useAthleteSheetCoachScreen';

const AthleteSheetCoachScreen = ({ navigation, route, cb }) => {
  // Intégration du hook :
  const {
    ActiveCourses,
    Paiement,
    isCancelBookModalVisible,
    book,
    isRemoveAthleteDialogVisible,
    is_validate,
    setIsValidate,
    note,
    setNote,
    refreshing,
    fetchData,
    onCancelBook,
    onDismissCancelSheetDialog,
    onValidateCancelBook,
    onRemoveAthletePress,
    onDismissRemoveAthleteDialog,
    onValidateRemoveAthlete,
    onBackPress,
  } = useAthleteSheetCoachScreen({ navigation, route, cb });

  const { params } = route;
  const user = params.item.athlete !== undefined ? params.item.athlete : params.item;

  // Préférences de jours
  const dayPreference = [];
  const athleteData = user.athlete || user;
  const dayFields = [
    { key: 'is_monday_preferred', label: 'Lundi' },
    { key: 'is_tuesday_preferred', label: 'Mardi' },
    { key: 'is_wednesday_preferred', label: 'Mercredi' },
    { key: 'is_thursday_preferred', label: 'Jeudi' },
    { key: 'is_friday_preferred', label: 'Vendredi' },
    { key: 'is_saturday_preferred', label: 'Samedi' },
    { key: 'is_sunday_preferred', label: 'Dimanche' },
  ];
  dayFields.forEach((d) => {
    if (athleteData[d.key]) {
      dayPreference.push({ day: d.label });
    }
  });

  // Badge :
  let badgeImage = '';
  const hasPayments = Paiement?.length > 0;
  if (user.status === 'active' || (user.status === 'prospect' && hasPayments)) {
    badgeImage = require('../../../assets/images/Actif.png');
  } else if (user.status === 'inactive') {
    badgeImage = require('../../../assets/images/Inactif.png');
  } else {
    badgeImage = require('../../../assets/images/Prospect.png');
  }

  const isProspect = user.status === 'prospect';
  const phoneRaw = athleteData.phone;
  const formattedPhone =
    phoneRaw && phoneRaw.length > 10
      ? phoneRaw
      : (phoneRaw || '').replace(/(.{2})/g, '$1 ').trim();

  const sessionLeft =
    ActiveCourses.total_sessions && ActiveCourses.booked_session
      ? ActiveCourses.total_sessions - ActiveCourses.booked_session
      : 0;

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <View style={styles.header}>
          <HeaderLight goBack={onBackPress} />
          <View style={styles.headerLeft}>
            <Avatar
              size={82}
              rounded
              source={
                user.profile_picture_url
                  ? { uri: user.profile_picture_url }
                  : require('../../../assets/images/no_pp.jpg')
              }
            />
          </View>
          <Image style={styles.userStatusImage} source={badgeImage} />
        </View>
      </View>

      <Text style={styles.username} numberOfLines={1} ellipsizeMode="tail">
        {user.first_name} {user.last_name}
      </Text>

      <View style={styles.content}>
        {isProspect && (
          <View style={styles.validateProspectRow}>
            <Switch
              ios_backgroundColor="#979797"
              trackColor={{ true: '#2CDEE4', false: '#979797' }}
              color="#2CDEE4"
              style={styles.validateProspectSwitch}
              value={is_validate}
              onValueChange={setIsValidate}
            />
            <Text style={styles.validateProspectText}>Prospect contacté</Text>
          </View>
        )}

        <ScrollView
          contentInset={{ bottom: 100 }}
          style={styles.scrollView}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <SidappRefreshControl
              refreshing={refreshing}
              onRefresh={fetchData}
            />
          }
        >
          {book && (
            <View style={styles.cancelItem}>
              <Text style={styles.infoText}>Séance :</Text>
              <View style={styles.cancelBookContainer}>
                <Text style={styles.cancelBookValue}>
                  {moment(book.date).format('DD/MM/YYYY')} -{' '}
                  {convertSlotToDate(book.slot)}
                </Text>
                <Text style={styles.cancelBook} onPress={onCancelBook}>
                  Annuler
                </Text>
              </View>
              <CancelBookDialog
                dialogVisible={isCancelBookModalVisible}
                onClose={onDismissCancelSheetDialog}
                onDelete={onValidateCancelBook}
              />
            </View>
          )}

          {/* Coordonnées */}
          <View style={styles.phoneNumberContainer}>
            <Image
              style={styles.phoneImg}
              source={require('../../../assets/images/phone.png')}
            />
            <Text
              style={styles.phoneNumberText}
              onPress={() => Linking.openURL(`tel:${phoneRaw}`)}
            >
              {formattedPhone}
            </Text>
          </View>

          {/* Email */}
          <View style={styles.item}>
            <Text style={styles.infoText}>Adresse e-mail :</Text>
            <Text style={styles.valueText}>{athleteData.email}</Text>
          </View>

          {/* Commercial référent */}
          <View style={styles.item}>
            <Text style={styles.infoText}>Commercial référent :</Text>
            <Text style={styles.valueText} numberOfLines={1} ellipsizeMode="tail">
              {user.commercial
                ? `${user.commercial.first_name} ${user.commercial.last_name}`
                : 'Pas de recommandation'}
            </Text>
          </View>

          {/* Offre */}
          <View style={styles.item}>
            <Text style={styles.infoText}>Offre en cours :</Text>
            <Text style={styles.valueText}>
              {ActiveCourses.offer
                ? `${ActiveCourses.offer.title} - ${sessionLeft} ${sessionLeft > 1 ? 'séances restantes' : 'séance restante'
                } sur ${ActiveCourses.total_sessions || 0}`
                : 'Aucune offre'}
            </Text>
          </View>

          {/* Paiements */}
          {user.status !== 'prospect' && (
            <View style={styles.item}>
              <Text style={styles.infoText}>Vente(s) effectuée(s) :</Text>
              <FlatList
                style={styles.paiementList}
                data={Paiement}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                  const isDone =
                    user.status === 'inactive'
                      ? false
                      : item.course_details?.booked_session === item.course_details?.total_sessions;
                  return (
                    <TouchableOpacity
                      disabled={isDone}
                      onPress={() => navigation.navigate('CreateSaleScreen', { item })}
                    >
                      <View
                        style={[
                          styles.paiementItem,
                          { backgroundColor: isDone ? '#979797' : '#2CDEE4' },
                        ]}
                      >
                        <Text style={styles.paiementItemText}>
                          {moment(item.created_at).format('L')}
                        </Text>
                        <Text style={styles.paiementItemText}>{item.offer?.title}</Text>
                        <Text style={styles.paiementItemText}>{`${item.amount}€`}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CreateSaleScreen', {
                    isCreation: true,
                    athleteId: params.item.id,
                  })
                }
                style={styles.addPaiementContainer}
              >
                <View style={styles.addPaiementIconMargin}>
                  <Entypo name="squared-plus" size={27} color="#2CDEE4" />
                </View>
                <Text style={styles.infoText}>Ajouter une vente</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Objectifs */}
          <View style={styles.item}>
            <Text style={styles.infoText}>Ses objectifs :</Text>
            <FlatList
              style={styles.flatlist}
              horizontal
              data={user.goals}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <View
                  style={[
                    styles.flatlistItem,
                    {
                      marginLeft: index === 0 ? 0 : 5,
                      marginRight: index === user.goals.length - 1 ? 0 : 5,
                    },
                  ]}
                >
                  <Text style={styles.flatlistItemText}>{item.name}</Text>
                </View>
              )}
            />
          </View>

          {/* Données physiques */}
          <View style={styles.row}>
            <View style={[styles.item, styles.itemRowLeft]}>
              <Text style={styles.infoText}>Taille :</Text>
              <Text style={styles.valueTextRow}>
                {athleteData.size ? `${(athleteData.size / 100).toFixed(2)}m` : 'N.C.'}
              </Text>
            </View>
            <View style={[styles.item, styles.itemRowRight]}>
              <Text style={styles.infoText}>Poids :</Text>
              <Text style={styles.valueTextRow}>
                {athleteData.weight ? `${athleteData.weight} Kg` : 'N.C.'}
              </Text>
            </View>
          </View>

          <View style={styles.item}>
            <Text style={styles.infoText}>Age :</Text>
            <Text style={styles.valueTextRow}>
              {athleteData.age ? `${athleteData.age} ans` : 'N.C.'}
            </Text>
          </View>

          {/* Créneaux */}
          <View style={styles.item}>
            <Text style={styles.infoText}>Créneaux de sport souhaités :</Text>
            <Text style={styles.sportSlotText}>
              Entre <Text style={styles.textColored}>{athleteData.preferred_time_start}H</Text> et{' '}
              <Text style={styles.textColored}>{athleteData.preferred_time_end}H</Text>
            </Text>
            {dayPreference.length > 0 && (
              <FlatList
                style={styles.flatlist}
                horizontal
                data={dayPreference}
                keyExtractor={(item) => item.day}
                renderItem={({ item, index }) => (
                  <View
                    style={[
                      styles.flatlistItem,
                      {
                        marginLeft: index === 0 ? 0 : 5,
                        marginRight: index === dayPreference.length - 1 ? 0 : 5,
                      },
                    ]}
                  >
                    <Text style={styles.flatlistItemText}>{item.day}</Text>
                  </View>
                )}
              />
            )}
          </View>

          {/* Expérience */}
          <View style={styles.item}>
            <Text style={styles.infoText}>Expérience(s) sportive(s) :</Text>
            <Text style={styles.valueText}>
              {!athleteData.experience_years
                ? "Pas d'informations"
                : athleteData.experience_years > 0
                  ? `Plus de ${athleteData.experience_years} an${athleteData.experience_years === 1 ? '' : 's'}`
                  : `Moins d'un an`}
            </Text>
          </View>

          {/* Santé */}
          <View style={styles.item}>
            <Text style={styles.infoText}>Problème(s) de santé :</Text>
            <Text style={styles.valueText}>
              {athleteData.health_issues ? 'Oui' : 'Non'}
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.infoText}>Informations complémentaires :</Text>
            <Text style={styles.valueText}>
              {athleteData.health_problem_description || "Pas d'informations"}
            </Text>
          </View>

          {/* Notes */}
          <View style={{ marginVertical: 5 }}>
            <TextInput
              multiline
              onChangeText={setNote}
              value={note}
              returnKeyType="done"
              placeholder="Note(s)"
              placeholderTextColor="#979797"
              style={styles.textArea}
            />
          </View>

          {isProspect && (
            <TouchableOpacity
              style={styles.deleteSHeetContainer}
              onPress={onRemoveAthletePress}
            >
              <UnlinkAthleteDialog
                dialogVisible={isRemoveAthleteDialogVisible}
                onClose={onDismissRemoveAthleteDialog}
                onDelete={onValidateRemoveAthlete}
              />
              <Text style={styles.deleteSheet}>Renvoyer dans la liste d'attente</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default AthleteSheetCoachScreen;
