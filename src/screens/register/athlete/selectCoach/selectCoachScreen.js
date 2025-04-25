import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import * as Yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik, FieldArray, Field } from 'formik';
import { CheckBox } from 'react-native-elements';

import Header from '../../../../components/Header';
import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../../components/Button';
import { get_coach_by_gym_place } from '../../../../api/Coach';
import styles from './selectCoachStyle';
import { get_commercial_by_place } from '../../../../api/Commercial';

const SelectCoachScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const passItem = route.params?.item || {}; // Correction pour éviter l'erreur `params undefined`
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
        console.log(commercialRes.data, '************', coachRes.data);
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
    navigation.navigate('avatarScreen', { item });
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
              onSubmit={(values) => {
                const item = { ...passItem, ...values };
                onNavigate(item);
              }}
              validationSchema={Yup.object().shape({
                coach_preference: Yup.object().required(
                  "Si vous n'avez pas de préférence, sélectionnez : Peu importe",
                ),
                commercial_id: Yup.string().required(
                  "Si vous n'avez pas été recommandé, sélectionnez : Je n'ai pas été recommandé",
                ),
              })}>
              {({ handleSubmit, isValid, validate }) => (
                <View style={styles.content}>
                  <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    {/* Sélection du Coach */}
                    <Field name="coach_preference" id="coach_preference" validate={validate}>
                      {({ form }) => (
                        <View>
                          <Text style={[styles.title, { marginTop: 64 }]}>
                            À QUEL COACH VEUX-TU ADRESSER TA DEMANDE ?
                          </Text>
                          <View style={styles.dropdownContainer}>
                            <FieldArray name="coach_preference">
                              {(arrayHelper) => (
                                <View>
                                  <SelectDropdown

                                    data={coaches}
                                    onSelect={(selectedItem) => {
                                      form.setFieldValue('commercial_id', selectedItem.id);
                                    }}
                                    renderButton={(selectedItem) => (
                                      <View style={styles.dropdownButton}>
                                        <Text style={styles.dropdownButtonText}>
                                          {`${selectedItem?.first_name}  ${selectedItem?.last_name} ` || 'Recherche ton coach'}
                                        </Text>
                                        <AntDesign name="down" size={18} color="black" style={styles.dropdownIcon} />
                                      </View>
                                    )}

                                    renderItem={(item, index, isSelected) => (
                                      <View style={styles.dropdownRow}>

                                        <View
                                          style={
                                            styles.dropdownRow
                                          }>
                                          <Text style={styles.dropdownRowText}>{item.first_name} {item.last_name}</Text>
                                        </View>
                                      </View >

                                    )}
                                    showsVerticalScrollIndicator={true}
                                    dropdownStyle={styles.dropdownMenuStyle}
                                  />
                                  <View style={styles.noWayContainer}>
                                    <CheckBox
                                      size={25}
                                      containerStyle={styles.noWayCheckBox}
                                      uncheckedColor="#2CDEE4"
                                      checked={checkedCoach}
                                      onPress={() => {
                                        arrayHelper.form.values.coach_preference = { type: 'any_coach' };
                                        setCheckedCoach(!checkedCoach);
                                      }}
                                    />
                                    <Text style={styles.noWayText}>Peu importe</Text>
                                  </View>
                                  {/* {errors.coach_preference && !checkedCoach && (
                                    <Text style={styles.errorText}>{errors.coach_preference}</Text>
                                  )} */}
                                </View>
                              )}
                            </FieldArray>
                          </View>
                        </View>
                      )}
                    </Field>

                    {/* Sélection du Commercial */}
                    <Field name="commercial_id" id="commercial_id" validate={validate}>
                      {({ form }) => (
                        <View style={styles.dropdownContainer}>
                          <Text style={styles.title}>PAR QUEL COMMERCIAL AS-TU ÉTÉ RECOMMANDÉ ?</Text>
                          <FieldArray name="commercial_id">
                            {(arrayHelper) => (
                              <View style={styles}>
                                <SelectDropdown

                                  data={commercials}
                                  defaultButtonText="Recherche ton commercial"
                                  onSelect={(selectedItem) => {
                                    form.setFieldValue('commercial_id', selectedItem.id);
                                  }}
                                  renderButton={(selectedItem) => (
                                    <View style={styles.dropdownButton}>
                                      <Text style={styles.dropdownButtonText}>
                                        {selectedItem?.name || 'Recherche ton commercial'}
                                      </Text>
                                      <AntDesign name="down" size={18} color="black" style={styles.dropdownIcon} />
                                    </View>
                                  )}

                                  renderItem={(item, index, isSelected) => (
                                    <View style={styles.dropdownRow}>

                                      <View
                                        style={
                                          styles.dropdownRow
                                        }>
                                        <Text style={styles.dropdownRowText}>{item.name}</Text>
                                      </View>
                                    </View >

                                  )}
                                  showsVerticalScrollIndicator={true}
                                  dropdownStyle={styles.dropdownMenuStyle}
                                />
                                <View style={styles.noWayContainer}>
                                  <CheckBox
                                    size={25}
                                    containerStyle={styles.noWayCheckBox}
                                    uncheckedColor="#2CDEE4"
                                    checked={checkedCommercial}
                                    onPress={() => {
                                      arrayHelper.form.values.commercial_id = 0;
                                      setCheckedCommercial(!checkedCommercial);
                                    }}
                                  />
                                  <Text style={styles.noWayText}>Je n'ai pas été recommandé</Text>
                                </View>
                                {/* {errors.commercial_id && !checkedCommercial && (
                                  <Text style={styles.errorText}>{errors.commercial_id}</Text>
                                )} */}
                              </View>
                            )}
                          </FieldArray>
                        </View>
                      )}
                    </Field>
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
