import React from 'react';
import moment from 'moment';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import HeaderLight from '../../components/HeaderLight';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from './AthleteSheetCoachScreenStyle';
import { isIphoneX } from 'react-native-iphone-x-helper';

import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
export default class AthleteSheetCoachScreenView extends AbstractScreenView {
  render() {
    const user = this.component.props.navigation.state.params.item;
    const dayPreference = [];
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

    let badgeImage = '';
    if (user.status === 'active')
      badgeImage = require('../../../assets/images/Actif.png');
    else if (user.status === 'inactive')
      badgeImage = require('../../../assets/images/Inactif.png');
    else if (user.status === 'prospect')
      badgeImage = require('../../../assets/images/Prospect.png');

    return (
      <View style={styles.container}>
        <SafeAreaView>
          <View style={{ marginTop: isIphoneX() ? 50 : 0 }}>
            <View style={styles.header}>
              <HeaderLight />
              <View style={styles.headerLeft}>
                <Avatar
                  size={82}
                  rounded
                  source={require('../../../assets/images/avatar.png')}
                />
                <Text style={styles.username}>
                  {user.first_name} {user.last_name}
                </Text>
              </View>
              <Image style={styles.userStatusImage} source={badgeImage} />
            </View>
          </View>
          <View style={styles.content}>
            <ScrollView style={styles.scrollView}>
              <View style={styles.phoneNumberContainer}>
                <Image
                  style={styles.phoneImg}
                  source={require('../../../assets/images/phone.png')}
                />
                <Text style={styles.phoneNumberText}>
                  {[
                    user.phone.slice(0, 2),
                    ' ',
                    user.phone.slice(2, 4),
                    ' ',
                    user.phone.slice(4, 6),
                    ' ',
                    user.phone.slice(6, 8),
                    ' ',
                    user.phone.slice(8, 10),
                  ].join('')}
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.infoText}>Adresse e-mail :</Text>
                <Text style={styles.valueText}>{user.email}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.infoText}>Commercial référent :</Text>
                <Text style={styles.valueText}>blabla</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.infoText}>Offre en cours :</Text>
                <Text style={styles.valueText}>
                  <Text style={styles.valueText}>
                    {this.component.state.ActiveCourses.offer?.title || 'Aucune offre'}
                  </Text>
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.infoText}>vente(s) effectuée(s) :</Text>

                <FlatList
                  style={styles.paiementList}
                  data={this.component.state.Paiement}
                  // onRefresh={onRefresh}
                  // refreshing={this.state.refresh}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        console.log(item);
                        //navigate('createPaymentScreen',{item:item});
                      }}>
                      <View style={styles.paiementItem}>
                        <Text style={styles.paiementItemText}>
                          {moment(item.created_at).format('L')}
                        </Text>
                        <Text style={styles.paiementItemText}>
                          {item.title}
                        </Text>
                        <Text style={styles.paiementItemText}>
                          {item.mode} - {item.amount}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigate('createPaymentScreen', {
                      athlete:
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
                    <Text style={styles.valueTextRow}>
                      {`${user.size / 100}`.substring(0, 1)}m
                      {`${user.size / 100}`.substring(2)}
                    </Text>
                  </View>
                </View>
                <View style={[styles.item, styles.itemRowRight]}>
                  <View style={styles.row}>
                    <Text style={styles.infoText}>Poids :</Text>
                    <Text style={styles.valueTextRow}>{user.weight}Kg</Text>
                  </View>
                </View>
              </View>
              <View style={styles.item}>
                <View style={styles.row}>
                  <Text style={styles.infoText}>Age :</Text>
                  <Text style={styles.valueTextRow}>{user.age} ans</Text>
                </View>
              </View>
              <View style={styles.item}>
                <Text style={styles.infoText}>
                  Créneaux de sport souhaités :
                </Text>
                <Text style={styles.sportSlotText}>
                  Entre{' '}
                  <Text style={styles.textColored}>
                    {user.preferred_time_start}H
                  </Text>{' '}
                  et{' '}
                  <Text style={styles.textColored}>
                    {user.preferred_time_end}H
                  </Text>
                </Text>
                <FlatList
                  style={styles.flatlist}
                  horizontal={true}
                  data={dayPreference}
                  // onRefresh={onRefresh}
                  // refreshing={this.state.refresh}
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
              </View>
              <View style={styles.item}>
                <Text style={styles.infoText}>Experience(s) sportive(s) :</Text>
                <Text style={styles.valueText}>
                  Plus de {user.experience_years} ans
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.infoText}>Santé :</Text>
                <Text style={styles.valueText}>
                  {user.health_issues || "Pas d'informations"}
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.infoText}>
                  Informations complémentaires :{' '}
                </Text>
                <Text style={styles.valueText}>
                  {user.health_problem_description || "Pas d'informations"}
                </Text>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
