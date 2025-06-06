import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import * as Yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik, Field } from 'formik';
import { CheckBox } from 'react-native-elements';

import Header from '../../../../components/Header';
import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../../components/Button';
import { get_coach_by_gym_place } from '../../../../api/Coach';
import { get_commercial_by_place } from '../../../../api/Commercial';
import styles from './selectCoachStyle';

const SelectCoachScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const passItem = route.params || {};
  const preferredGymId = passItem.preferred_gym_id;

  const [coaches, setCoaches] = useState([]);
  const [commercials, setCommercials] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [checkedCoach, setCheckedCoach] = useState(false);
  const [checkedCommercial, setCheckedCommercial] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commercialRes, coachRes] = await Promise.all([
          get_commercial_by_place(preferredGymId),
          get_coach_by_gym_place(preferredGymId),
        ]);
        setCommercials(commercialRes.data || []);
        setCoaches(coachRes.data || []);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchData();
  }, [preferredGymId]);

  const onNavigate = (item) => {
    navigation.navigate('AvatarScreen', { item });
  };

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2CDEE4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#060606', '#2D333C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}>
        <SafeAreaView style={styles.safeArea}>
          <Header title="LET'S GO" />
          <RegisterStepImageView step={7} />
          <View style={styles.content}>
            <Formik
              initialValues={{
                coach_preference: '',
                commercial_id: '',
              }}
              validationSchema={Yup.object().shape({
                coach_preference: Yup.mixed().required(
                  "Si vous n'avez pas de préférence, sélectionnez : Peu importe"
                ),
                commercial_id: Yup.mixed().required(
                  "Si vous n'avez pas été recommandé, sélectionnez : Je n'ai pas été recommandé"
                ),
              })}
              onSubmit={(values) => {
                onNavigate({ ...passItem, ...values });
              }}>
              {({ handleSubmit, setFieldValue, values, errors, isValid }) => (
                <View style={styles.content}>
                  <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    {/* Sélection du Coach */}
                    <Text style={[styles.title, { marginTop: 64 }]}>
                      À QUEL COACH VEUX-TU ADRESSER TA DEMANDE ?
                    </Text>
                    <SelectDropdown
                      data={coaches}
                      onSelect={(selectedItem) => {
                        setFieldValue('coach_preference', selectedItem.id);
                        setCheckedCoach(false);
                      }}
                      renderButton={(selectedItem) => (
                        <View style={styles.dropdownButton}>
                          <Text style={styles.dropdownButtonText}>
                            {selectedItem
                              ? `${selectedItem.first_name} ${selectedItem.last_name}`
                              : 'Recherche ton coach'}
                          </Text>
                          <AntDesign name="down" size={18} color="black" style={styles.dropdownIcon} />
                        </View>
                      )}
                      renderItem={(item) => (
                        <View style={styles.dropdownRow}>
                          <Text style={styles.dropdownRowText}>
                            {item.first_name} {item.last_name}
                          </Text>
                        </View>
                      )}
                      showsVerticalScrollIndicator
                      dropdownStyle={styles.dropdownMenuStyle}
                    />
                    <View style={styles.noWayContainer}>
                      <CheckBox
                        size={25}
                        containerStyle={styles.noWayCheckBox}
                        uncheckedColor="#2CDEE4"
                        checked={checkedCoach}
                        onPress={() => {
                          const newChecked = !checkedCoach;
                          setCheckedCoach(newChecked);
                          if (newChecked) {
                            setFieldValue('coach_preference', 'any_coach');
                          } else {
                            setFieldValue('coach_preference', '');
                          }
                        }}
                      />
                      <Text style={styles.noWayText}>Peu importe</Text>
                    </View>
                    {errors.coach_preference && <Text style={styles.errorText}>{errors.coach_preference}</Text>}

                    {/* Sélection du Commercial */}
                    <Text style={styles.title}>PAR QUEL COMMERCIAL AS-TU ÉTÉ RECOMMANDÉ ?</Text>
                    <SelectDropdown
                      data={commercials}
                      onSelect={(selectedItem) => {
                        setFieldValue('commercial_id', selectedItem.id);
                        setCheckedCommercial(false);
                      }}
                      renderButton={(selectedItem) => (
                        <View style={styles.dropdownButton}>
                          <Text style={styles.dropdownButtonText}>
                            {selectedItem
                              ? `${selectedItem.first_name} ${selectedItem.last_name}`
                              : 'Recherche ton commercial'}
                          </Text>
                          <AntDesign name="down" size={18} color="black" style={styles.dropdownIcon} />
                        </View>
                      )}
                      renderItem={(item) => (
                        <View style={styles.dropdownRow}>
                          <Text style={styles.dropdownRowText}>
                            {item.first_name} {item.last_name}
                          </Text>
                        </View>
                      )}
                      showsVerticalScrollIndicator
                      dropdownStyle={styles.dropdownMenuStyle}
                    />
                    <View style={styles.noWayContainer}>
                      <CheckBox
                        size={25}
                        containerStyle={styles.noWayCheckBox}
                        uncheckedColor="#2CDEE4"
                        checked={checkedCommercial}
                        onPress={() => {
                          const newChecked = !checkedCommercial;
                          setCheckedCommercial(newChecked);
                          if (newChecked) {
                            setFieldValue('commercial_id', 0);
                          } else {
                            setFieldValue('commercial_id', '');
                          }
                        }}
                      />
                      <Text style={styles.noWayText}>Je n'ai pas été recommandé</Text>
                    </View>
                    {errors.commercial_id && <Text style={styles.errorText}>{errors.commercial_id}</Text>}
                  </View>

                  <View style={styles.bottom}>
                    <Button
                      loading={false}
                      disabled={!isValid}
                      title="Suivant"
                      customTextStyle={styles.nextButtonText}
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default SelectCoachScreen;
