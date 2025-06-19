import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import HeaderLight from '../../components/HeaderLight';
import TreshRequestDialog from '../../components/dialogs/treshRequestDialog/treshRequestDialog';
import { Button } from '../../components/Button';
import styles from './TreshRequestCoachScreenStyle';
import { useTreshRequestCoachScreen } from './useTreshRequestCoachScreen';

const TreshRequestCoachScreen = () => {
  const {
    Athlete,
    isLoaded,
    dialogVisible,
    isValidate,
    onOpenDialog,
    onDismissDialog,
    onValidate,
    onNavigateToUserSheet,
  } = useTreshRequestCoachScreen();

  const dayPreference = [];
  const athlete = Athlete?.athlete || {};
  const daysMap = [
    { key: 'is_monday_preferred', label: 'Lundi' },
    { key: 'is_tuesday_preferred', label: 'Mardi' },
    { key: 'is_wednesday_preferred', label: 'Mercredi' },
    { key: 'is_thursday_preferred', label: 'Jeudi' },
    { key: 'is_friday_preferred', label: 'Vendredi' },
    { key: 'is_saturday_preferred', label: 'Samedi' },
    { key: 'is_sunday_preferred', label: 'Dimanche' },
  ];
  daysMap.forEach(({ key, label }) => {
    if (athlete[key]) dayPreference.push({ day: label });
  });

  if (!isLoaded) {
    return (
      <View style={{ backgroundColor: 'black', flex: 1 }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TreshRequestDialog
          isValidate={isValidate}
          dialogVisible={dialogVisible}
          onClose={onDismissDialog}
          onValidate={onValidate}
          onNavigateToUserSheet={onNavigateToUserSheet}
        />
        <View style={styles.header}>
          <HeaderLight />
          <View style={styles.headerCenter}>
            <Avatar
              size={82}
              rounded
              source={
                athlete.profile_picture_url
                  ? { uri: athlete.profile_picture_url }
                  : require('../../../assets/images/no_pp.jpg')
              }
            />
            <Text
              style={styles.username}
              numberOfLines={1}
              ellipsizeMode="tail">
              {athlete.first_name} {athlete.last_name}
            </Text>
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          <View>
            <View style={styles.item}>
              <Text style={styles.infoText}>Demande adressée à :</Text>
              <Text style={styles.valueText}>
                {Athlete.request_coach_type === 'any_coach'
                  ? 'tous les coachs'
                  : 'toi uniquement'}
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.infoText}>Commercial référent :</Text>
              <Text style={styles.valueText}>
                {Athlete.commercial
                  ? `${Athlete.commercial.first_name} ${Athlete.commercial.last_name}`
                  : 'Pas de recommandation'}
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.infoText}>Ses objectifs :</Text>
              <FlatList
                horizontal
                data={Athlete.goals}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <View
                    style={[
                      styles.flatlistItem,
                      {
                        marginLeft: index === 0 ? 0 : 5,
                        marginRight:
                          index === Athlete.goals.length - 1 ? 0 : 5,
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
                    {athlete.size
                      ? `${Math.floor(athlete.size / 100)}m${athlete.size % 100}`
                      : 'N.C.'}
                  </Text>
                </View>
              </View>
              <View style={[styles.item, styles.itemRowRight]}>
                <View style={styles.row}>
                  <Text style={styles.infoText}>Poids :</Text>
                  <Text style={styles.valueTextRow}>
                    {athlete.weight ? `${athlete.weight}Kg` : 'N.C.'}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.item}>
              <View style={styles.row}>
                <Text style={styles.infoText}>Age :</Text>
                <Text style={styles.valueTextRow}>
                  {athlete.age ? `${athlete.age} ans` : 'N.C.'}
                </Text>
              </View>
            </View>

            <View style={styles.item}>
              <Text style={styles.infoText}>Créneaux de sport souhaités :</Text>
              <Text style={styles.sportSlotText}>
                Entre{' '}
                <Text style={styles.textColored}>
                  {athlete.preferred_time_start}H
                </Text>{' '}
                et{' '}
                <Text style={styles.textColored}>
                  {athlete.preferred_time_end}H
                </Text>
              </Text>
              <FlatList
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
                    ]}>
                    <Text style={styles.flatlistItemText}>{item.day}</Text>
                  </View>
                )}
              />
            </View>

            <View style={styles.item}>
              <Text style={styles.infoText}>Expérience(s) sportive(s) :</Text>
              <Text style={styles.valueText}>
                {!athlete.experience_years
                  ? "Pas d'informations"
                  : athlete.experience_years > 0
                    ? `Plus de ${athlete.experience_years} ans`
                    : "Moins d'un an"}
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.infoText}>Problème(s) de santé :</Text>
              <Text style={styles.valueText}>
                {athlete.health_issues || 'Non'}
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.infoText}>Informations complémentaires :</Text>
              <Text style={styles.valueText}>
                {athlete.health_problem_description || "Pas d'informations"}
              </Text>
            </View>
          </View>

          <View style={styles.button}>
            <Button
              loading={false}
              title="Traiter la demande"
              customContainerStyles={{ width: 'auto' }}
              customTextStyle={styles.butonText}
              onPress={onOpenDialog}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TreshRequestCoachScreen;
