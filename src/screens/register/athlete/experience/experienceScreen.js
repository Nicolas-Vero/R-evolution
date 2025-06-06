import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik, Field } from 'formik';
import { LinearGradient } from 'expo-linear-gradient';
import { Slider } from 'react-native-elements';
import { widthPercentageToDP } from 'react-native-responsive-screen';

import { Button } from '../../../../components/Button';
import Header from '../../../../components/Header';
import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import styles from './experienceStyle';
const ExperienceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [step, setStep] = useState('initial');

  const passItem = route.params || {}; // Récupération des paramètres de navigation

  const onNavigate = (item) => {
    console.log('itmmmmmmem', item);
    navigation.navigate('GoalScreen', item);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#060606', '#2D333C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      >
        <SafeAreaView style={styles.safeArea}>
          <Header title="LET'S GO" />
          <RegisterStepImageView step={2} />
          <View style={styles.content}>
            <Formik
              initialValues={{ experience_years: '0' }}
              onSubmit={(values) => {
                console.log('values', passItem);
                onNavigate({ ...passItem, ...values });
              }}
            >
              {({ handleSubmit }) => (
                <View style={styles.content}>
                  <Field name="experience_years">
                    {({ field, form }) => (
                      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                        <Text style={styles.title}>EXPÉRIENCES SPORTIVES</Text>
                        <View style={styles.content}>
                          <View style={styles.infoContainer}>
                            <Text style={styles.textInfo}>
                              {field.value < 1
                                ? "MOINS D'UN AN"
                                : field.value == 1
                                  ? `${field.value} AN`
                                  : field.value > 9
                                    ? `PLUS DE ${field.value} ANS`
                                    : `${field.value} ANS`}
                            </Text>
                          </View>
                          <Slider
                            style={{ width: widthPercentageToDP(90) }}
                            trackStyle={styles.track}
                            thumbStyle={styles.thumb}
                            minimumTrackTintColor="#2CDEE4"
                            maximumValue={10}
                            minimumValue={0}
                            step={1}
                            onSlidingComplete={(num) =>
                              form.setFieldValue('experience_years', String(num))
                            }
                          />
                        </View>
                      </View>
                    )}
                  </Field>
                  <View style={styles.bottom}>
                    <Button
                      loading={false}
                      title="Suivant"
                      customTextStyle={styles.buttonText}
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

export default ExperienceScreen;
