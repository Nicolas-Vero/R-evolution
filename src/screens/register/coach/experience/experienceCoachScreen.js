import React from 'react';
import { Text, View, SafeAreaView, Keyboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik, Field } from 'formik';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import Header from '../../../../components/Header';
import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../../components/Button';
import styles from './experienceCoachStyle';
import Slider from '@react-native-community/slider';

const ExperienceCoachScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const passItem = route.params?.item || {}; // Évite undefined si params n'existe pas

  const onNavigate = (item) => {
    navigation.navigate('speclalitiesScreen', { item });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#060606', '#2D333C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}>
        <Header title="LET'S GO" />
        <SafeAreaView onPress={Keyboard.dismiss} style={styles.safeArea}>
          <RegisterStepImageView step={10} />
          <View style={styles.content}>
            <Formik
              initialValues={{
                experience_years: '0',
              }}
              onSubmit={(values) => {
                const item = { ...passItem, ...values };
                onNavigate(item);
              }}>
              {({ handleSubmit, isValid, validate }) => (
                <View style={styles.content}>
                  <Field name="experience_years" id="experience_years" validate={validate}>
                    {({ field }) => (
                      <View style={{ height: heightPercentageToDP(72) }}>
                        <Text style={styles.title}>ANNÉE(S) D'EXPÉRIENCE</Text>
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
                          <View style={styles.sliderContainer}>
                            <Slider
                              style={{ width: widthPercentageToDP(90) }}
                              trackStyle={styles.track}
                              thumbStyle={styles.thumb}
                              minimumTrackTintColor="#2CDEE4"
                              track
                              name="experience_years"
                              onSlidingComplete={(num) => {
                                field.onChange('experience_years')(
                                  '' + num,
                                );
                              }}
                              maximumValue={10}
                              minimumValue={0}
                              step={1}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                  </Field>
                  <Button
                    loading={false}
                    disabled={!isValid}
                    title="Suivant"
                    customTextStyle={styles.buttonText}
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

export default ExperienceCoachScreen;
