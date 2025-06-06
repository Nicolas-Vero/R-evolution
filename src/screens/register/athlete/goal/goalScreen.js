import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import * as Yup from 'yup';
import { Formik, FieldArray, Field } from 'formik';
import { FontAwesome } from '@expo/vector-icons';

import { get_specialities } from '../../../../api/ReferenceData';
import Header from '../../../../components/Header';
import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../../components/Button';
import styles from './goalStyle';

const GoalScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const passItem = route.params || {};
  console.log('ressssss', passItem);

  const [specData, setSpecData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    get_specialities().then((res) => {
      setSpecData(res.data.map((item) => ({ ...item, selected: false })));
      setIsLoaded(true);
    });
  }, []);

  const validationSchema = Yup.object().shape({
    goals: Yup.array().min(1, 'Sélectionne au moins un objectif').required('Requis'),
  });

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#060606', '#2D333C']} style={styles.background}>
        <SafeAreaView style={styles.safeArea}>
          <Header title="LET'S GO" />
          <RegisterStepImageView step={3} />

          <Formik
            initialValues={{ goals: [] }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log('values', values, 'passItem', passItem);
              navigation.navigate('HealthScreen', { ...passItem, ...values });
            }}
          >
            {({ handleSubmit, values, setFieldValue, errors }) => (
              <View style={styles.content}>
                <View style={styles.top}>
                  <Text style={styles.title}>QUEL EST TON OBJECTIF ?</Text>
                  <Text style={styles.subTitle}>Sélectionne ton ou tes objectifs</Text>

                  <ScrollView style={styles.goalContainer}>
                    <FlatList
                      data={specData}
                      keyExtractor={(item) => item.value}
                      numColumns={3}
                      renderItem={({ item }) => {
                        const isSelected = values.goals.includes(item.value);
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              const newSelected = isSelected
                                ? values.goals.filter((goal) => goal !== item.value)
                                : [...values.goals, item.value];
                              setFieldValue('goals', newSelected);

                              setSpecData((prevSpecData) =>
                                prevSpecData.map((goal) =>
                                  goal.value === item.value
                                    ? { ...goal, selected: !goal.selected }
                                    : goal
                                )
                              );
                            }}
                          >
                            <View
                              style={[
                                styles.goalItem,
                                {
                                  backgroundColor: isSelected ? '#2CDEE4' : 'transparent',
                                  borderColor: isSelected ? 'transparent' : 'white',
                                },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.goalIemText,
                                  { color: isSelected ? 'black' : 'white' },
                                ]}
                              >
                                {item.value}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </ScrollView>

                  {errors.goals && values.goals.length === 0 && (
                    <Text style={styles.errorText}>{errors.goals}</Text>
                  )}
                </View>

                <View style={styles.bottom}>
                  <Button
                    title="Suivant"
                    disabled={values.goals.length === 0}
                    customTextStyle={styles.buttonText}
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

export default GoalScreen;
