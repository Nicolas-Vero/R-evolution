import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import { CheckBox } from 'react-native-elements';
import { Button } from '../../../../components/Button';
import Header from '../../../../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import * as Yup from 'yup';
import styles from './registerStyle';

import { isEmailExist, isPhoneExist } from '../../../../api/Auth';

const RegisterScreen = ({ navigation }) => {
  const [termsCondition, setTermsCondition] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [userType, setUserType] = useState('athlete')
  const handleNavigation = async (values) => {
    const emailRes = await isEmailExist(values.email);
    if (emailRes.data.userExist) {
      setEmailError('Email déjà utilisé');
      return;
    }


    const phoneRes = await isPhoneExist(values.phone);
    if (phoneRes.data.exist) {
      setPhoneError('Numéro de téléphone déjà utilisé');
      return;
    }

    values.email = values.email.toLowerCase();

    navigation.navigate(
      values.userType === 'coach' ? 'diplomasScreen' : 'mensurationScreen',
      values,
    );
  };

  const validationSchemaCoach = Yup.object().shape({
    first_name: Yup.string().required('Requis'),
    last_name: Yup.string().required('Requis'),
    email: Yup.string().email('Email invalide').required('Requis'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Numéro de téléphone invalide')
      .required('Requis'),
    password: Yup.string().required('Requis'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas')
      .required('Requis'),
  });


  const validationSchemaAthlete = Yup.object().shape({
    first_name: Yup.string().required('Requis'),
    last_name: Yup.string().required('Requis'),
    email: Yup.string().email('Email invalide').required('Requis'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Numéro de téléphone invalide')
      .required('Requis'),

  });


  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const initialValues = {
    gender: 'male',
    first_name: 'a',
    last_name: 'a',
    email: 'a@a.com',
    phone: '1233567890',
    password: 'aa',
    confirm_password: 'aa',
    userType: 'athlete',
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#060606', '#2D333C']}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={{ flex: 1 }}>
        <ScrollView
          style={styles.ScrollView}
          keyboardShouldPersistTaps="handled">
          <SafeAreaView onPress={Keyboard.dismiss} style={styles.safeArea}>
            <Header title="INSCRIPTION" />

            <View style={styles.formContainer}>
              <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                  console.log(values, 'OPOPO')
                  termsCondition
                    ? navigation.navigate(userType === 'athlete' ? 'MensurationScreen' : 'DiplomasScreen', values)
                    : alert(
                      'Accepter les termes des conditions pour continuer.',
                    );
                }}
                validationSchema={userType === 'athlete' ? validationSchemaAthlete : validationSchemaCoach}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                  touched,
                  errors,
                  isValid,
                }) => (
                  <View>
                    <View style={styles.checkBoxContainer}>
                      <CheckBox
                        containerStyle={styles.checkbox}
                        checkedColor="#2CDEE4"
                        title="M"
                        textStyle={styles.checkboxTextColor}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="dot-circle-o"
                        checked={values.gender.toString() === 'male'}
                        value={values.gender}
                        onPress={() => setFieldValue('gender', 'male')}
                      />
                      <CheckBox
                        checkedColor="#2CDEE4"
                        containerStyle={styles.checkbox}
                        title="Mme"
                        textStyle={styles.checkboxTextColor}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="dot-circle-o"
                        checked={values.gender === 'female'}
                        value={values.gender}
                        onPress={() => setFieldValue('gender', 'female')}
                      />
                    </View>
                    <KeyboardAvoidingView>
                      {['first_name', 'last_name', 'email', 'phone', 'password', 'confirm_password'].map((field, idx) => {
                        const isPasswordField = field.includes('password');
                        const shouldRender =
                          (values.userType === 'athlete' && !isPasswordField) ||
                          (values.userType === 'coach');

                        return (
                          shouldRender && (
                            <View key={idx} style={styles.inputContainer}>
                              <TextInput
                                placeholder={field.replace('_', ' ').toUpperCase()}
                                placeholderTextColor="#979797"
                                secureTextEntry={isPasswordField}
                                keyboardType={field === 'phone' ? 'numeric' : 'default'}
                                autoCapitalize="none"
                                style={{
                                  ...styles.input,
                                  borderWidth: errors[field] && touched[field] ? 2 : 0,
                                  borderColor: errors[field] && touched[field] ? '#FD7279' : undefined,
                                }}
                                onChangeText={handleChange(field)}
                                onBlur={handleBlur(field)}
                                value={values[field]}
                              />
                              {errors[field] && touched[field] && (
                                <Text style={styles.errorInputText}>{errors[field]}</Text>
                              )}
                            </View>
                          )
                        );
                      })}

                      {emailError && <Text style={styles.errorInputText}>{emailError}</Text>}
                      {phoneError && <Text style={styles.errorInputText}>{phoneError}</Text>}

                      <View style={styles.checkBoxContainer}>
                        {['athlete', 'coach'].map((type) => (
                          <CheckBox
                            key={type}
                            title={type.charAt(0).toUpperCase() + type.slice(1)}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checkedColor="#2CDEE4"
                            containerStyle={styles.checkbox}
                            textStyle={styles.checkboxTextColor}
                            checked={values.userType === type}
                            onPress={() => {
                              setFieldValue('userType', type)
                              setUserType(type)
                            }}
                          />
                        ))}
                      </View>

                    </KeyboardAvoidingView>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 24,
                      }}>
                      <CheckBox
                        size={25}
                        containerStyle={styles.acceptContainer}
                        checked={termsCondition}
                        value={termsCondition}
                        onPress={() => {
                          setTermsCondition(!termsCondition)
                        }
                        }
                      />
                      {errors.userType && (
                        <View style={styles.errorInputContainer}>
                          <Text style={styles.errorInputText}>
                            {errors.userType}
                          </Text>
                        </View>
                      )}
                      <Text style={styles.acceptText}>
                        En créant un compte, vous acceptez de vous conformer à
                        la
                        <Text style={styles.acceptTextLink}>
                          Politique de confidentialité
                        </Text>
                        et aux
                        <Text style={styles.acceptTextLink}>
                          Conditions générales
                        </Text>
                        de [R]evolution.
                      </Text>
                    </View>
                    <View style={styles.butonContainer}>
                      <Button
                        loading={false}
                        disabled={!isValid}
                        title="Rejoins-nous"
                        customTextStyle={styles.buttonText}
                        onPress={handleSubmit}
                      />
                    </View>
                    <View style={styles.alreadyMemberContainer}>
                      <Text style={styles.alreadyMemberText}>
                        Déjà membre ?
                      </Text>
                      <Text
                        style={styles.alreadyMemberTextUnderline}
                        onPress={() => navigation.navigate('LoginScreen')}>
                        Se connecter.
                      </Text>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </SafeAreaView>

        </ScrollView>
      </LinearGradient>
    </View>
  );

}
export default RegisterScreen 