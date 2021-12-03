import React from 'react';
import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { Button } from '../../components/Button';
import { Avatar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import HeaderLight from '../../components/HeaderLight';
import { ScrollView } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import TreshRequestDialog from '../../components/dialogs/treshRequestDialog/treshRequestDialog';

import styles from './TreshRequestCoachScreenStyle';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
export default class TreshRequestCoachScreenView extends AbstractScreenView {
  renderDialog() {
    return (
      <TreshRequestDialog
        isValidate={this.component.state.isValidate}
        dialogVisible={this.component.state.dialogVisible}
        onClose={() => this.controller.onDismissDialog()}
        onValidate={() => this.controller.onValidate()}
        onNavigateToUserSheet={() => this.controller.onNavigateToUserSheet()}
      />
    );
  }
  render() {
    const dayPreference = [];
    if (this.component.state.Athlete.athlete?.is_monday_preferred == true) {
      dayPreference.push({ day: 'Lundi' });
    }
    if (this.component.state.Athlete.athlete?.is_tuesday_preferred == true) {
      dayPreference.push({ day: 'Mardi' });
    }
    if (this.component.state.Athlete.athlete?.is_wednesday_preferred == true) {
      dayPreference.push({ day: 'Mercredi' });
    }
    if (this.component.state.Athlete.athlete?.is_thursday_preferred == true) {
      dayPreference.push({ day: 'Jeudi' });
    }
    if (this.component.state.Athlete.athlete?.is_friday_preferred == true) {
      dayPreference.push({ day: 'Vendredi' });
    }
    if (this.component.state.Athlete.athlete?.is_saturday_preferred == true) {
      dayPreference.push({ day: 'Samedi' });
    }
    if (this.component.state.Athlete.athlete?.is_sunday_preferred == true) {
      dayPreference.push({ day: 'Dimanche' });
    }

    if (!this.component.state.isLoaded) {
      return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView>
            {this.renderDialog()}
            <View style={styles.header}>
              <HeaderLight />
              <View style={styles.headerCenter}>
                <Avatar
                  size={82}
                  rounded
                  source={require('../../../assets/images/avatar.png')}
                />
                <Text style={styles.username}>
                  {this.component.state.Athlete.athlete?.first_name}{' '}
                  {this.component.state.Athlete.athlete?.last_name}
                </Text>
              </View>
              <View></View>
            </View>
            <ScrollView style={styles.scrollView}>
              <View>
                <View style={styles.item}>
                  <Text style={styles.infoText}>Demande adressée à :</Text>
                  <Text style={styles.valueText}>
                    {this.component.state.Athlete.request_coach_type ===
                    'any_coach'
                      ? 'tous les coachs'
                      : 'toi uniquement'}
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.infoText}>Commercial référent :</Text>
                  <Text style={styles.valueText}>
                    {this.component.state.Athlete.commercial
                      ? `${this.component.state.Athlete.commercial.first_name} ${this.component.state.Athlete.commercial.last_name}`
                      : 'Aucun'}
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.infoText}>Ses objectifs :</Text>
                  <FlatList
                    style={styles.flatlist}
                    horizontal={true}
                    data={this.component.state.Athlete.goals}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                      <View
                        style={[
                          styles.flatlistItem,
                          {
                            marginLeft: index === 0 ? 0 : 5,
                            marginRight:
                              index ===
                              this.component.state.Athlete.goals.length - 1
                                ? 0
                                : 5,
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
                        {`${
                          this.component.state.Athlete.athlete?.size / 100
                        }`.substring(0, 1)}
                        m
                        {`${
                          this.component.state.Athlete.athlete?.size / 100
                        }`.substring(2)}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.item, styles.itemRowRight]}>
                    <View style={styles.row}>
                      <Text style={styles.infoText}>Poids :</Text>
                      <Text style={styles.valueTextRow}>
                        {' '}
                        {this.component.state.Athlete.athlete?.weight}Kg
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.item}>
                  <View style={styles.row}>
                    <Text style={styles.infoText}>Age :</Text>
                    <Text style={styles.valueTextRow}>
                      {this.component.state.Athlete.athlete?.age}ans
                    </Text>
                  </View>
                </View>
                <View style={styles.item}>
                  <Text style={styles.infoText}>
                    Créneaux de sport souhaités :
                  </Text>
                  <Text style={styles.sportSlotText}>
                    Entre{' '}
                    <Text style={styles.textColored}>
                      {
                        this.component.state.Athlete.athlete
                          ?.preferred_time_start
                      }
                      H
                    </Text>{' '}
                    et{' '}
                    <Text style={styles.textColored}>
                      {this.component.state.Athlete.athlete?.preferred_time_end}
                      H
                    </Text>
                  </Text>
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
                </View>
                <View style={styles.item}>
                  <Text style={styles.infoText}>
                    Experience(s) sportive(s) :
                  </Text>
                  <Text style={styles.valueText}>
                    {this.component.state.Athlete.athlete?.experience_years > 0
                      ? `Plus de ${this.component.state.Athlete.athlete?.experience_years} ans`
                      : "Moins d'un an"}
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.infoText}>Santé :</Text>
                  <Text style={styles.valueText}>
                    {this.component.state.Athlete.athlete?.health_issues ||
                      "Pas d'informations"}
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.infoText}>
                    Informations complémentaires :{' '}
                  </Text>
                  <Text style={styles.valueText}>
                    {this.component.state.Athlete.athlete
                      ?.health_problem_description || "Pas d'informations"}
                  </Text>
                </View>
              </View>
              <View style={styles.button}>
                <Button
                  loading={false}
                  title="Traiter la demande"
                  customContainerStyles={{ width: 'auto' }}
                  customTextStyle={styles.butonText}
                  onPress={() => {
                    this.controller.onOpenDialog();
                  }}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      );
    }
  }
}
