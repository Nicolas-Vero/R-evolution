import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik, FieldArray, Field } from 'formik';
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign } from '@expo/vector-icons';
import * as Yup from 'yup';

import { get_gym } from '../../../../api/ReferenceData';
import Header from '../../../../components/Header';
import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../../components/Button';
import styles from './selectGymStyle';

const SelectGymScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const passItem = route.params || {};

  const [gymData, setGymData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    get_gym().then((res) => {
      setGymData(res.data);
      setIsLoaded(true);
    });
  }, []);

  const onNavigate = (item) => {
    navigation.navigate('TrainingDayScreen', item);
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
          <RegisterStepImageView step={5} />
          <Text style={styles.title}>DANS QUELLE SALLE PRATIQUES-TU ?</Text>
          <Formik
            initialValues={{ preferred_gym_id: '' }}
            onSubmit={(values) => {

              onNavigate({ ...passItem, ...values });
            }}
            validationSchema={Yup.object().shape({
              preferred_gym_id: Yup.string().required('Requis'),
            })}>
            {({ handleSubmit, isValid }) => (
              <View style={styles.content}>
                <View style={styles.top}>
                  <Field name="preferred_gym_id">
                    {({ form }) => (
                      <View style={styles.selectContainer}>
                        <FieldArray
                          name="preferred_gym_id"
                          render={() => (
                            <SelectDropdown
                              data={gymData}
                              onSelect={(selectedItem) => {
                                form.setFieldValue('preferred_gym_id', selectedItem.id);
                              }}
                              renderButton={(selectedItem) => (
                                <View style={styles.dropdownButton}>
                                  <Text style={styles.dropdownButtonText}>
                                    {selectedItem?.name || 'Recherche le nom de ta salle'}
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
                          )}
                        />
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
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default SelectGymScreen;
