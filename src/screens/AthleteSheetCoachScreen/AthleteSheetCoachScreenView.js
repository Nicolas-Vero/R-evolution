import React from 'react';
import moment from 'moment';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import HeaderLight from '../../components/HeaderLight';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from './AthleteSheetCoachScreenStyle';
import { isIphoneX } from 'react-native-iphone-x-helper';

import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import CancelBookDialog from '../../components/dialogs/cancelBookDialog/cancelBookDialog';
import SidappRefreshControl from '../../components/SidappRefreshControl/SidappRefreshControl';
import { convertSlotToDate } from '../../helpers/dateHelper';
import UnlinkAthleteDialog from '../../components/dialogs/unlinkAthleteDialog/unlinkAthleteDialog';
export default class AthleteSheetCoachScreenView extends AbstractScreenView {
  renderCancelBookDialog = () => {
    return (
      <CancelBookDialog
        dialogVisible={this.component.state.isCancelBookModalVisible}
        onClose={this.controller.onDismissCancelSheetDialog}
        onDelete={this.controller.onValidateCancelBook}
      />
    );
  };

  renderUnlinkAthleteDialog = () => {
    return (
      <UnlinkAthleteDialog
        dialogVisible={this.component.state.isRemoveAthleteDialogVisible}
        onClose={this.controller.onDismissRemoveAthleteDialog}
        onDelete={this.controller.onValidateRemoveAthlete}
      />
    );
  };

  render() {
    const { navigate } = this.component.props.navigation;
    if (this.component.props.navigation.state.params.item.athlete) {
      var user = this.component.props.navigation.state.params.item.athlete;
    } else {
      var user = this.component.props.navigation.state.params.item;
    }
    const dayPreference = [];
    if (this.component.props.navigation.state.params.item.athlete) {
      if (user.athlete.is_monday_preferred == true) {
        dayPreference.push({ day: 'Lundi' });
      }
      if (user.athlete.is_tuesday_preferred == true) {
        dayPreference.push({ day: 'Mardi' });
      }
      if (user.athlete.is_wednesday_preferred == true) {
        dayPreference.push({ day: 'Mercredi' });
      }
      if (user.athlete.is_thursday_preferred == true) {
        dayPreference.push({ day: 'Jeudi' });
      }
      if (user.athlete.is_friday_preferred == true) {
        dayPreference.push({ day: 'Vendredi' });
      }
      if (user.athlete.is_saturday_preferred == true) {
        dayPreference.push({ day: 'Samedi' });
      }
      if (user.athlete.is_sunday_preferred == true) {
        dayPreference.push({ day: 'Dimanche' });
      }
    } else {
      if (user.is_monday_preferred == true) {
        dayPreference.push({ day: 'Lundi' });
      }
      if (user.is_tuesday_preferred == true) {
        dayPreference.push({ day: 'Mardi' });
      }
      if (user.is_wednesday_preferred == true) {
        dayPreference.push({ day: 'Mercredi' });
      }
      if (user.is_thursday_preferred == true) {
        dayPreference.push({ day: 'Jeudi' });
      }
      if (user.is_friday_preferred == true) {
        dayPreference.push({ day: 'Vendredi' });
      }
      if (user.is_saturday_preferred == true) {
        dayPreference.push({ day: 'Samedi' });
      }
      if (user.is_sunday_preferred == true) {
        dayPreference.push({ day: 'Dimanche' });
      }
    }

    let renderPayment = true;
    let badgeImage = '';
    if (user.status === 'active')
      badgeImage = require('../../../assets/images/Actif.png');
    else if (user.status === 'inactive')
      badgeImage = require('../../../assets/images/Inactif.png');
    else if (user.status === 'prospect') {
      badgeImage = require('../../../assets/images/Prospect.png');
      // renderPayment = false;
    } else if (
      user.status === 'prospect' &&
      this.component.state.Paiement.length
    ) {
      badgeImage = require('../../../assets/images/Actif.png');
    }
    const isProspect = user.status === 'prospect';
    const isActif = user.status === 'active';
    const { isCanceled, ActiveCourses } = this.component.state;
    const sessionLeft =
      ActiveCourses.total_sessions - ActiveCourses.booked_session;
    const { books } = this.component.state;
    return (
      <View style={styles.container}>
        <View style={{ marginTop: isIphoneX() ? 20 : 0 }}>
          <View style={styles.header}>
            <HeaderLight />
            <View style={styles.headerLeft}>
              <Avatar
                size={82}
                rounded
                source={{
                  uri:
                    user.profile_picture_url ||
                    '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
                }}
              />
              <Text style={styles.username}>
                {user.first_name} {user.last_name}
              </Text>
            </View>
            <Image style={styles.userStatusImage} source={badgeImage} />
          </View>
        </View>
        <View style={styles.content}>
          <ScrollView
            style={styles.scrollView}
            refreshControl={
              <SidappRefreshControl
                refreshing={this.component.state.refreshing}
                onRefresh={this.controller.fetchData}
              />
            }>
            {books && books.length ? (
              <View style={styles.cancelItem}>
                <Text style={styles.infoText}>Séance :</Text>
                <View style={styles.cancelBookContainer}>
                  <Text style={styles.cancelBookValue}>
                    {moment(books[0]?.date).format('DD/MM/YYYY')} -{' '}
                    {convertSlotToDate(books[0].slot)}
                  </Text>
                  <Text
                    style={styles.cancelBook}
                    onPress={this.controller.onCancelBook}>
                    Annuler
                  </Text>
                </View>
                {this.renderCancelBookDialog()}
              </View>
            ) : null}
            <View style={styles.phoneNumberContainer}>
              <Image
                style={styles.phoneImg}
                source={require('../../../assets/images/phone.png')}
              />
              <Text style={styles.phoneNumberText}>
                {[
                  this.component.props.navigation.state.params.item.athlete
                    ? user.athlete.phone.slice(0, 2)
                    : user.phone.slice(0, 2),
                  ' ',
                  this.component.props.navigation.state.params.item.athlete
                    ? user.athlete.phone.slice(2, 4)
                    : user.phone.slice(2, 4),
                  ' ',
                  this.component.props.navigation.state.params.item.athlete
                    ? user.athlete.phone.slice(4, 6)
                    : user.phone.slice(4, 6),
                  ' ',
                  this.component.props.navigation.state.params.item.athlete
                    ? user.athlete.phone.slice(6, 8)
                    : user.phone.slice(6, 8),
                  ' ',
                  this.component.props.navigation.state.params.item.athlete
                    ? user.athlete.phone.slice(8, 10)
                    : user.phone.slice(8, 10),
                ].join('')}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.infoText}>Adresse e-mail :</Text>
              {this.component.props.navigation.state.params.item.athlete ? (
                <Text style={styles.valueText}>{user.athlete.email}</Text>
              ) : (
                <Text style={styles.valueText}>{user.email}</Text>
              )}
            </View>
            <View style={styles.item}>
              <Text style={styles.infoText}>Commercial référent :</Text>
              {this.component.props.navigation.state.params.item.athlete ? (
                <Text style={styles.valueText}>
                  {' '}
                  {user.commercial
                    ? user.commercial.first_name.concat(
                        ' ',
                        user.commercial.last_name,
                      )
                    : 'Pas de recommandation'}
                </Text>
              ) : (
                <Text style={styles.valueText}>
                  {' '}
                  {user.commercial
                    ? user.commercial.first_name.concat(
                        ' ',
                        user.commercial.last_name,
                      )
                    : 'Pas de recommandation'}
                </Text>
              )}
            </View>
            <View style={styles.item}>
              <Text style={styles.infoText}>Offre en cours :</Text>
              <Text style={styles.valueText}>
                <Text style={styles.valueText}>
                  {ActiveCourses.offer
                    ? `${ActiveCourses.offer.title} - ${sessionLeft} ${
                        sessionLeft > 1
                          ? 'séances restantes'
                          : 'séance restante'
                      } sur ${ActiveCourses.total_sessions}`
                    : 'Aucune offre'}
                </Text>
              </Text>
            </View>
            {renderPayment ? (
              <View style={styles.item}>
                <Text style={styles.infoText}>Vente(s) effectuée(s) :</Text>

                <FlatList
                  style={styles.paiementList}
                  data={this.component.state.Paiement}
                  // onRefresh={onRefresh}
                  // refreshing={this.state.refresh}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => {
                    const isDone =
                      item.course_details?.booked_session ===
                      item.course_details?.total_sessions;
                    return (
                      <TouchableOpacity
                        disabled={isDone}
                        onPress={() => {
                          navigate('CreateSaleScreen', { item: item });
                        }}>
                        <View
                          style={[
                            styles.paiementItem,
                            {
                              backgroundColor: isDone ? '#979797' : '#2CDEE4',
                            },
                          ]}>
                          <Text style={styles.paiementItemText}>
                            {moment(item.created_at).format('L')}
                          </Text>
                          <Text style={styles.paiementItemText}>
                            {item.offer?.title}
                          </Text>
                          <Text style={styles.paiementItemText}>
                            {`${item.amount}€`}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigate('CreateSaleScreen', {
                      isCreation: true,
                      athleteId:
                        this.component.props.navigation.state.params.item.id,
                    });
                  }}
                  style={styles.addPaiementContainer}>
                  <View style={styles.addPaiementIconMargin}>
                    <Entypo name="squared-plus" size={27} color="#2CDEE4" />
                  </View>
                  <Text style={styles.infoText}>Ajouter une vente</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            <View style={styles.item}>
              <Text style={styles.infoText}>Ses objectifs :</Text>
              <FlatList
                style={styles.flatlist}
                horizontal={true}
                data={user.goals}
                // onRefresh={onRefresh}
                // refreshing={this.state.refresh}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <View
                    style={[
                      styles.flatlistItem,
                      {
                        marginLeft: index === 0 ? 0 : 5,
                        marginRight: index === user.goals.length - 1 ? 0 : 5,
                      },
                    ]}>
                    <Text style={styles.flatlistItemText}>{item.name}</Text>
                  </View>
                )}
              />
            </View>
            <View style={styles.row}>
              <View style={[styles.item, styles.itemRowLeft]}>
                <View style={styles.row}>
                  <Text style={styles.infoText}>Taille :</Text>
                  {this.component.props.navigation.state.params.item.athlete ? (
                    <Text style={styles.valueTextRow}>
                      {`${user.athlete.size / 100}`.substring(0, 1)}m
                      {`${user.athlete.size / 100}`.substring(2)}
                    </Text>
                  ) : !user.size ? (
                    <Text style={styles.valueTextRow}>N.C.</Text>
                  ) : (
                    <Text style={styles.valueTextRow}>
                      {`${user.size / 100}`.substring(0, 1)}m
                      {`${user.size / 100}`.substring(2)}
                    </Text>
                  )}
                </View>
              </View>
              <View style={[styles.item, styles.itemRowRight]}>
                <View style={styles.row}>
                  <Text style={styles.infoText}>Poids :</Text>
                  {this.component.props.navigation.state.params.item.athlete ? (
                    <Text style={styles.valueTextRow}>
                      {user.athlete.weight}Kg
                    </Text>
                  ) : (
                    <Text style={styles.valueTextRow}>
                      {user.weight ? `${user.weight} Kg` : 'N.C.'}
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.item}>
              <View style={styles.row}>
                <Text style={styles.infoText}>Age :</Text>
                {this.component.props.navigation.state.params.item.athlete ? (
                  <Text style={styles.valueTextRow}>
                    {user.athlete.age} ans
                  </Text>
                ) : (
                  <Text style={styles.valueTextRow}>
                    {user.age ? `${user.age} ans` : 'N.C.'}
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.infoText}>Créneaux de sport souhaités :</Text>
              <Text style={styles.sportSlotText}>
                Entre{' '}
                {this.component.props.navigation.state.params.item.athlete ? (
                  <Text style={styles.textColored}>
                    {user.athlete.preferred_time_start}H
                  </Text>
                ) : (
                  <Text style={styles.textColored}>
                    {user.preferred_time_start}H
                  </Text>
                )}{' '}
                et{' '}
                {this.component.props.navigation.state.params.item.athlete ? (
                  <Text style={styles.textColored}>
                    {user.athlete.preferred_time_end}H
                  </Text>
                ) : (
                  <Text style={styles.textColored}>
                    {user.preferred_time_end}H
                  </Text>
                )}
              </Text>
              {dayPreference && dayPreference.length ? (
                <FlatList
                  style={styles.flatlist}
                  horizontal={true}
                  data={dayPreference}
                  keyExtractor={(item) => item.day}
                  renderItem={({ item, index }) => (
                    <View
                      style={[
                        styles.flatlistItem,
                        {
                          marginLeft: index === 0 ? 0 : 5,
                          marginRight:
                            index === dayPreference.length - 1 ? 0 : 5,
                        },
                      ]}>
                      <Text style={styles.flatlistItemText}>{item.day}</Text>
                    </View>
                  )}
                />
              ) : null}
            </View>
            <View style={styles.item}>
              <Text style={styles.infoText}>Expérience(s) sportive(s) :</Text>
              {this.component.props.navigation.state.params.item.athlete ? (
                <Text style={styles.valueText}>
                  {!user.athlete.experience_years
                    ? "Pas d'informations"
                    : user.athlete.experience_years > 0
                    ? ` Plus de ${user.athlete.experience_years} an${
                        user.athlete.experience_years === 1 ? '' : 's'
                      }`
                    : `Moins d'un an`}
                </Text>
              ) : (
                <Text style={styles.valueText}>
                  {!user.experience_years
                    ? "Pas d'informations"
                    : user.experience_years > 0
                    ? ` Plus de ${user.experience_years} ans`
                    : `Moins d'un an`}
                </Text>
              )}
            </View>
            <View style={styles.item}>
              <Text style={styles.infoText}>Problème(s) de santé :</Text>
              {this.component.props.navigation.state.params.item.athlete ? (
                <Text style={styles.valueText}>
                  {user.athlete.health_issues || 'Non'}
                </Text>
              ) : (
                <Text style={styles.valueText}>
                  {user.health_issues ? 'Oui' : 'Non'}
                </Text>
              )}
            </View>
            <View style={styles.item}>
              <Text style={styles.infoText}>
                Informations complémentaires :
              </Text>
              {this.component.props.navigation.state.params.item.athlete ? (
                <Text style={styles.valueText}>
                  {user.athlete.health_problem_description ||
                    "Pas d'informations"}
                </Text>
              ) : (
                <Text style={styles.valueText}>
                  {user.health_problem_description || "Pas d'informations"}
                </Text>
              )}
            </View>
            {!isProspect ? null : (
              <TouchableOpacity
                style={styles.deleteSHeetContainer}
                onPress={this.controller.onRemoveAthletePress}>
                {this.renderUnlinkAthleteDialog()}
                <Text style={styles.deleteSheet}>
                  Renvoyer dans la liste d'attente
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
}
