import React, { useRef, useState } from 'react';
import {
  View,
  SafeAreaView,
  Image,
  TextInput,
  Keyboard,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import { LinearGradient } from 'expo-linear-gradient';
import * as Yup from 'yup';

import AuthService from '../../../services/AuthService';
import Header from '../../../components/Header';
import { Button } from '../../../components/Button';
import styles from './loginStyle';
import { coach_login, get_coach_me } from '../../../api/Coach';
import { athlete_login, get_athlete_me } from '../../../api/Athlete';
import { userType } from '../../../api/Auth';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email invalide').required('Email requis'),
  password: Yup.string().required('Mot de passe requis'),
});

const LoginScreen = ({ navigation }) => {
  const passwordInputRef = useRef(null);
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const onLoginPress = async ({ email, password }) => {
    setError(null);
    setPasswordError(null);

    const userResponse = await userType(email);
    console.log(userResponse);
    if (userResponse.status !== 200) {
      setError("Cet email n'existe pas");
      return;
    }

    const loginFn =
      userResponse.content.type === 'coach' ? coach_login : athlete_login;
    const getUserFn =
      userResponse.content.type === 'coach' ? get_coach_me : get_athlete_me;

    const loginResponse = await loginFn({ email, password });

    if (loginResponse.status !== 200) {
      setPasswordError('Mot de passe incorrect');
      return;
    }

    await AuthService.setAuth({
      user: { id: loginResponse.content.user.id, type: userResponse.content.type },
      headers: { Authorization: `Bearer ${loginResponse.content.token}` },
    });

    const user = await getUserFn();

    if (user.status === 200) {
      await AuthService.setUser(user.content);
      //  await AuthService.checkExpoToken(user.content);

      navigation.navigate(
        userResponse.content.type === 'coach'
          ? 'DashboardStack'
          : 'DashboardStackAthlete',
      );
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['black', '#2D333C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}>
        <Header />
        <SafeAreaView style={styles.safeArea}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../../assets/images/logo.png')}
                style={styles.image}
              />
            </View>

            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={onLoginPress}>
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <KeyboardAvoidingView>
                  <TextInput
                    placeholder="Adresse e-mail"
                    placeholderTextColor="#979797"
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordInputRef.current.focus()}
                  />
                  {(errors.email && touched.email) || error ? (
                    <Text style={styles.error}>{errors.email || error}</Text>
                  ) : null}

                  <TextInput
                    ref={passwordInputRef}
                    placeholder="Mot de passe"
                    placeholderTextColor="#979797"
                    style={styles.input}
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    returnKeyType="done"
                  />
                  {(errors.password && touched.password) || passwordError ? (
                    <Text style={styles.error}>{errors.password || passwordError}</Text>
                  ) : null}

                  <TouchableOpacity
                    onPress={() => navigation.navigate('forgetPasswordScreen')}>
                    <Text style={styles.forgetPasswordText}>Mot de passe oublié ?</Text>
                  </TouchableOpacity>

                  <View style={styles.buttonContainer}>
                    <Button
                      title="Se connecter"
                      onPress={handleSubmit}
                      customTextStyle={styles.buttonText}
                    />
                  </View>

                  <View style={styles.notYetMemberContainer}>
                    <Text style={styles.notYetMemberText}>Pas encore membre ? </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('RegisterScreen')}>
                      <Text style={styles.notYetMemberTextColor}>Créer ton compte.</Text>
                    </TouchableOpacity>
                  </View>
                </KeyboardAvoidingView>
              )}
            </Formik>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default LoginScreen;