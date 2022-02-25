import React from 'react';
import {
  View,
  SafeAreaView,
  Image,
  TextInput,
  Keyboard,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';

import { Formik } from 'formik';
import { LinearGradient } from 'expo-linear-gradient';
import AuthService from '../../../services/AuthService';
import Header from '../../../components/Header';
import { Button } from '../../../components/Button';
import styles from './loginStyle';
import { coach_login, get_coach_me } from '../../../api/Coach';
import { athlete_login, get_athlete_me } from '../../../api/Athlete';
import { userType } from '../../../api/Auth';
export default class loginScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  async onLoginPress(values) {
    const { email, password } = values;
    const body = { email, password };
    const user = await userType(email);
    if (user.data.type === 'coach') {
      await this.loginCoach(body);
      return;
    }
    if (user.data.type === 'athlete') {
      await this.loginAthlete(body);
      return;
    }
  }

  async loginCoach(body) {
    const login = await coach_login(body);
    if (login.status === 200) {
      await this.setAuth(login.data, 'coach');
      const user = await get_coach_me();
      if (user.status === 200) {
        await AuthService.setUser(user.data);
        await AuthService.checkExpoToken();
        this.props.navigation.navigate('DashboardStack');
      }

      return;
    }

    this.setState({ password: '' });
  }

  async loginAthlete(body) {
    const login = await athlete_login(body);
    if (login.status === 200) {
      await this.setAuth(login.data, 'athlete');
      const user = await get_athlete_me();
      if (user.status === 200) {
        await AuthService.setUser(user.data);
        await AuthService.checkExpoToken();
        this.props.navigation.navigate('DashboardStackAtlhete');
      }

      return;
    }

    this.setState({ password: '' });
  }

  async setAuth(data, type) {
    const toStore = {
      user: { id: data.user.id, type },
      headers: {
        Authorization: 'Bearer ' + data.token,
      },
    };

    await AuthService.setAuth(toStore);
  }
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['black', '#2D333C']}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 1,
            y: 1,
          }}
          style={styles.background}>
          <Header />
          <SafeAreaView onPress={Keyboard.dismiss} style={styles.safeArea}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../../assets/images/logo.png')}
                style={styles.image}></Image>
            </View>
            <View style={styles.content}>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                onSubmit={(values, { onLoginPress }) => onLoginPress(values)}>
                {({ handleChange, handleBlur, values }) => (
                  <KeyboardAvoidingView>
                    <View style={{ marginBottom: 15 }}>
                      <TextInput
                        placeholderTextColor="#979797"
                        placeholder="Adresse e-mail"
                        style={styles.input}
                        onChangeText={handleChange('email')}
                        autoCapitalize="none"
                        onBlur={handleBlur('email')}
                        value={values.email}
                        onSubmitEditing={() =>
                          this.passwordInput && this.passwordInput.focus()
                        }
                        returnKeyType="next"
                      />
                    </View>
                    <TextInput
                      placeholderTextColor="#979797"
                      ref={(ref) => (this.passwordInput = ref)}
                      placeholder="Mot de passe"
                      secureTextEntry={true}
                      style={styles.input}
                      onChangeText={handleChange('password')}
                      autoCapitalize="none"
                      onBlur={handleBlur('password')}
                      value={values.password}
                      returnKeyType="done"
                    />

                    {/* TODO <View>
                      <TouchableOpacity>
                        <Text style={styles.forgetPasswordText}>
                          Mot de passe oublié ?
                        </Text>
                      </TouchableOpacity>
                    </View> */}

                    <View style={styles.buttonContainer}>
                      <Button
                        style={styles.button}
                        loading={false}
                        title="Se connecter"
                        customTextStyle={styles.buttonText}
                        onPress={() => {
                          this.onLoginPress(values);
                        }}
                      />
                    </View>
                    <View style={styles.notYetMemberContainer}>
                      <Text style={styles.notYetMemberText}>
                        Pas encore membre ?{' '}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate('registerScreen');
                        }}>
                        <Text style={styles.notYetMemberTextColor}>
                          Créer ton compte.
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </KeyboardAvoidingView>
                )}
              </Formik>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
    );
  }
}
