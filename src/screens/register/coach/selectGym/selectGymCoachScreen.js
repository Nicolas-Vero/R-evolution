import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Formik, FieldArray, Field } from 'formik';

import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign } from '@expo/vector-icons';
import * as Yup from 'yup';

import { get_gym } from '../../../../api/ReferenceData';
import Header from '../../../../components/Header';
import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../../components/Button';
import styles from './selectGymCoachStyle';

const SelectGymCoachScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const passItem = route.params?.item || {}; // Sécurise l'accès aux params

  const [gymData, setGymData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    get_gym().then((res) => {
      setGymData(res.data);
      setIsLoaded(true);
    });
  }, []);

  const onNavigate = (item) => {
    navigation.navigate('avatarScreen', { item, isCoach: true });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#060606', '#2D333C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}>
        <SafeAreaView style={styles.safeArea}>
          <Header title="LET'S GO" />
          <RegisterStepImageView step={12} />
          <View style={styles.content}>
            <Formik
              initialValues={{ gym_id: '' }}
              onSubmit={(values) => {
                const item = { ...passItem, ...values };
                onNavigate(item);
              }}
              validationSchema={Yup.object().shape({
                gym_id: Yup.string().required('Requis'),
              })}>
              {({ handleSubmit, isValid }) => (
                <View style={{ paddingBottom: 15 }}>
                  <Field name="gym_id">
                    {({ form }) => (
                      <View style={{ height: heightPercentageToDP(72) }}>
                        <Text style={styles.title}>
                          DANS QUELLE SALLE PRATIQUES-TU ?
                        </Text>
                        <View style={styles.selectContainer}>
                          <FieldArray
                            name="gym_id"
                            render={(arrayhelper) => (
                              <SelectDropdown
                                buttonStyle={styles.dropdownButton}
                                buttonTextStyle={styles.dropdownButtonText}
                                rowTextStyle={styles.dropdownRowText}
                                dropdownStyle={styles.dropdownBg}
                                rowStyle={styles.dropdownRow}
                                data={gymData}
                                defaultButtonText="Recherche le nom de ta salle"
                                onSelect={(selectedItem) => {
                                  form.setFieldValue('gym_id', selectedItem.id);
                                }}
                                renderDropdownIcon={() => (
                                  <AntDesign name="down" size={24} color="black" />
                                )}
                                dropdownIconPosition="right"
                                buttonTextAfterSelection={(selectedItem) => selectedItem.name}
                                rowTextForSelection={(item) => item.name}
                              />
                            )}
                          />
                        </View>
                      </View>
                    )}
                  </Field>
                  <Button
                    loading={false}
                    disabled={!isValid}
                    title="Suivant"
                    customTextStyle={styles.nextButtonText}
                    onPress={handleSubmit}
                  />
                </View>
              )}
            </Formik>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default SelectGymCoachScreen;
