import React, { useRef } from 'react';
import {
  View,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';

import Header from '../../../../components/Header';
import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../../components/Button';
import styles from './mensurationStyle';

const MensurationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const passItem = route.params || {};
  console.log(passItem, 'tototo')
  const weightInputRef = useRef(null);
  const ageInputRef = useRef(null);

  const validationSchema = Yup.object().shape({
    age: Yup.number()
      .typeError('Âge non valide')
      .min(15, 'Tu dois entrer un âge correct')
      .max(100, 'Tu dois entrer un âge correct')
      .required('Requis'),
    weight: Yup.number()
      .typeError('Poids non valide')
      .min(30, 'Tu dois entrer un poids correct')
      .max(300, 'Tu dois entrer un poids correct')
      .required('Requis'),
    size: Yup.number()
      .typeError('Taille non valide')
      .min(100, 'Tu dois entrer une taille correcte')
      .max(300, 'Tu dois entrer une taille correcte')
      .required('Requis'),
  });

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#060606', '#2D333C']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <Header title="LET'S GO" />
          <RegisterStepImageView step={1} />
          <View style={styles.content}>
            <Text style={styles.title}>AIDE-NOUS À MIEUX TE CONNAÎTRE</Text>

            <Formik
              initialValues={{ age: '20', weight: '50', size: '160' }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                ;
                navigation.navigate('ExperienceScreen', { ...passItem, ...values });
              }}
            >
              {({ handleSubmit, handleChange, values, errors, touched }) => (
                <ScrollView
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    marginHorizontal: 16,
                  }}
                >
                  <View style={styles.top}>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={[
                          styles.input,
                          errors.size && touched.size && { borderColor: '#FD7279', borderWidth: 2 },
                        ]}
                        placeholder="Taille (en cm)"
                        placeholderTextColor="#979797"
                        keyboardType="numeric"
                        returnKeyType="next"
                        onChangeText={handleChange('size')}
                        value={values.size}
                        onSubmitEditing={() => weightInputRef.current?.focus()}
                      />
                      {errors.size && touched.size && (
                        <Text style={styles.errorInputText}>{errors.size}</Text>
                      )}
                    </View>

                    <View style={styles.inputContainer}>
                      <TextInput
                        style={[
                          styles.input,
                          errors.weight && touched.weight && { borderColor: '#FD7279', borderWidth: 2 },
                        ]}
                        placeholder="Poids (en kg)"
                        placeholderTextColor="#979797"
                        keyboardType="numeric"
                        returnKeyType="next"
                        onChangeText={handleChange('weight')}
                        value={values.weight}
                        ref={weightInputRef}
                        onSubmitEditing={() => ageInputRef.current?.focus()}
                      />
                      {errors.weight && touched.weight && (
                        <Text style={styles.errorInputText}>{errors.weight}</Text>
                      )}
                    </View>

                    <View style={styles.inputContainer}>
                      <TextInput
                        style={[
                          styles.input,
                          errors.age && touched.age && { borderColor: '#FD7279', borderWidth: 2 },
                        ]}
                        placeholder="Âge"
                        placeholderTextColor="#979797"
                        keyboardType="numeric"
                        returnKeyType="done"
                        onChangeText={handleChange('age')}
                        value={values.age}
                        ref={ageInputRef}
                        onSubmitEditing={Keyboard.dismiss}
                      />
                      {errors.age && touched.age && (
                        <Text style={styles.errorInputText}>{errors.age}</Text>
                      )}
                    </View>
                  </View>

                  <View style={styles.bottom}>
                    <Button
                      title="Suivant"
                      disabled={!values.age || !values.weight || !values.size}
                      customTextStyle={styles.buttonText}
                      onPress={handleSubmit}
                    />
                  </View>
                </ScrollView>
              )}
            </Formik>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default MensurationScreen;
