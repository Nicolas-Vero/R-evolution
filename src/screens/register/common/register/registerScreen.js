import React from 'react';
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
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Yup from 'yup';
import styles from './registerStyle';

import { isEmailExist } from '../../../../api/Auth';
export default class registerScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 'initial',
      stepperStep: 0,
      progress: 0,
      termsCondition: false,
      error: null,
    };
  }

  onNavigate = async (item) => {
    const res = await isEmailExist(item.email);
    if (res.data.userExist) {
      this.setState({
        error: 'Email déjà utilisé',
      });

      return;
    }

    this.setState({
      error: null,
    });

    this.props.navigation.navigate(
      item.userType === 'coach' ? 'diplomasScreen' : 'mensurationScreen',
      item,
    );
  };
  render() {
    const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const formValue = {
      gender: 'male',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: '',
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
          <Header title="INSCRIPTION" />
          <ScrollView
            style={styles.ScrollView}
            keyboardShouldPersistTaps="handled">
            <SafeAreaView onPress={Keyboard.dismiss} style={styles.safeArea}>
              <View style={styles.formContainer}>
                <Formik
                  initialValues={formValue}
                  onSubmit={(values) => {
                    this.state.termsCondition
                      ? this.onNavigate(values)
                      : alert(
                          'Accepter les termes des conditions pour continuer.',
                        );
                  }}
                  validationSchema={Yup.object().shape({
                    first_name: Yup.string().required('Requis'),
                    last_name: Yup.string().required('Requis'),
                    email: Yup.string()
                      .email('L’adresse e-mail n’est pas valide')
                      .required('Requis'),
                    phone: Yup.string()
                      .matches(
                        phoneRegExp,
                        'Tu dois entrer un numéro de téléphone valide.',
                      )
                      .min(10, 'Tu dois entrer un numéro de téléphone valide.')
                      .max(10, 'Tu dois entrer un numéro de téléphone valide.')
                      .required('Requis'),
                    password: Yup.string().required('Requis'),
                    confirm_password: Yup.string()
                      .oneOf(
                        [Yup.ref('password'), null],
                        'Les mots de passe saisis ne sont pas identiques.',
                      )
                      .required('Requis'),
                  })}>
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
                        <View style={styles.inputContainer}>
                          <TextInput
                            name="first_Name"
                            placeholder="Prénom"
                            placeholderTextColor="#979797"
                            blurOnSubmit={false}
                            onSubmitEditing={() =>
                              this.lastNameInput && this.lastNameInput.focus()
                            }
                            returnKeyType="next"
                            style={{
                              ...styles.input,
                              borderWidth:
                                errors.first_name && touched.first_name ? 2 : 0,
                              borderColor:
                                errors.first_name && touched.first_name
                                  ? '#FD7279'
                                  : null,
                            }}
                            onChangeText={handleChange('first_name')}
                            onBlur={handleBlur('first_name')}
                            value={values.first_name}
                          />
                          {errors.first_name && touched.first_name && (
                            <View style={styles.errorInputContainer}>
                              <Text style={styles.errorInputText}>
                                {errors.first_name}
                              </Text>
                            </View>
                          )}
                        </View>
                        <View style={styles.inputContainer}>
                          <TextInput
                            name="last_name"
                            placeholder="Nom"
                            placeholderTextColor="#979797"
                            ref={(ref) => (this.lastNameInput = ref)}
                            blurOnSubmit={false}
                            onSubmitEditing={() =>
                              this.emailInput && this.emailInput.focus()
                            }
                            returnKeyType="next"
                            style={{
                              ...styles.input,
                              borderWidth:
                                errors.last_name && touched.last_name ? 2 : 0,
                              borderColor:
                                errors.last_name && touched.last_name
                                  ? '#FD7279'
                                  : null,
                            }}
                            onChangeText={handleChange('last_name')}
                            onBlur={handleBlur('last_name')}
                            value={values.last_name}
                          />
                          {errors.last_name && touched.last_name && (
                            <View style={styles.errorInputContainer}>
                              <Text style={styles.errorInputText}>
                                {errors.last_name}
                              </Text>
                            </View>
                          )}
                        </View>
                        <View style={styles.inputContainer}>
                          <TextInput
                            name="email"
                            placeholder="Adresse e-mail"
                            placeholderTextColor="#979797"
                            ref={(ref) => (this.emailInput = ref)}
                            blurOnSubmit={false}
                            autoCapitalize="none"
                            onSubmitEditing={() =>
                              this.phoneNumberInput &&
                              this.phoneNumberInput.focus()
                            }
                            returnKeyType="next"
                            style={{
                              ...styles.input,
                              borderWidth:
                                errors.email && touched.email ? 2 : 0,
                              borderColor:
                                errors.email && touched.email ? 'red' : null,
                            }}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                          />
                          {errors.email && touched.email && (
                            <View style={styles.errorInputContainer}>
                              <Text style={styles.errorInputText}>
                                {errors.email}
                              </Text>
                            </View>
                          )}
                          {this.state.error && (
                            <View style={styles.errorInputContainer}>
                              <Text style={styles.errorInputText}>
                                {this.state.error}
                              </Text>
                            </View>
                          )}
                        </View>
                        <View style={styles.inputContainer}>
                          <TextInput
                            name="phone"
                            placeholder="Numéro de téléphone"
                            placeholderTextColor="#979797"
                            ref={(ref) => (this.phoneNumberInput = ref)}
                            keyboardType="numeric"
                            blurOnSubmit={false}
                            autoCapitalize="none"
                            onSubmitEditing={() =>
                              this.passwordInput && this.passwordInput.focus()
                            }
                            returnKeyType="next"
                            style={{
                              ...styles.input,
                              borderWidth:
                                errors.phone && touched.phone ? 2 : 0,
                              borderColor:
                                errors.phone && touched.phone ? 'red' : null,
                            }}
                            onChangeText={handleChange('phone')}
                            onBlur={handleBlur('phone')}
                            value={values.phone}
                          />
                          {errors.phone && touched.phone && (
                            <View style={styles.errorInputContainer}>
                              <Text style={styles.errorInputText}>
                                {errors.phone}
                              </Text>
                            </View>
                          )}
                        </View>
                        <View style={styles.inputContainer}>
                          <TextInput
                            name="password"
                            placeholder="Mot de passe"
                            placeholderTextColor="#979797"
                            ref={(ref) => (this.passwordInput = ref)}
                            blurOnSubmit={false}
                            autoCapitalize="none"
                            onSubmitEditing={() =>
                              this.confirmPasswordInput &&
                              this.confirmPasswordInput.focus()
                            }
                            returnKeyType="next"
                            secureTextEntry={true}
                            style={{
                              ...styles.input,
                              borderWidth:
                                errors.password && touched.password ? 2 : 0,
                              borderColor:
                                errors.password && touched.password
                                  ? 'red'
                                  : null,
                            }}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                          />
                          {errors.password && touched.password && (
                            <View style={styles.errorInputContainer}>
                              <Text style={styles.errorInputText}>
                                {errors.password}
                              </Text>
                            </View>
                          )}
                        </View>
                        <View style={styles.inputContainer}>
                          <TextInput
                            name="confirm_password"
                            placeholder="Confirmation du mot de passe"
                            secureTextEntry={true}
                            placeholderTextColor="#979797"
                            ref={(ref) => (this.confirmPasswordInput = ref)}
                            blurOnSubmit={false}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            autoCapitalize="none"
                            returnKeyType="done"
                            style={{
                              ...styles.input,
                              borderWidth:
                                errors.confirm_password &&
                                touched.confirm_password
                                  ? 2
                                  : 0,
                              borderColor:
                                errors.confirm_password &&
                                touched.confirm_password
                                  ? 'red'
                                  : null,
                            }}
                            onChangeText={handleChange('confirm_password')}
                            onBlur={handleBlur('confirm_password')}
                            value={values.confirm_password}
                          />
                          {errors.confirm_password && touched.confirm_password && (
                            <View style={styles.errorInputContainer}>
                              <Text style={styles.errorInputText}>
                                {errors.confirm_password}
                              </Text>
                            </View>
                          )}
                        </View>
                        <View style={styles.checkBoxContainer}>
                          <CheckBox
                            containerStyle={styles.checkbox}
                            checkedColor="#2CDEE4"
                            title="Athlete"
                            textStyle={styles.checkboxTextColor}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="dot-circle-o"
                            checked={values.userType.toString() === 'athlete'}
                            value={values.userType}
                            onPress={() => setFieldValue('userType', 'athlete')}
                          />
                          <CheckBox
                            checkedColor="#2CDEE4"
                            containerStyle={styles.checkbox}
                            title="Coach"
                            textStyle={styles.checkboxTextColor}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="dot-circle-o"
                            checked={values.userType === 'coach'}
                            value={values.userType}
                            onPress={() => setFieldValue('userType', 'coach')}
                          />
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
                          checked={this.state.termsCondition}
                          value={this.state.termsCondition}
                          onPress={() =>
                            this.setState({
                              termsCondition: !this.state.termsCondition,
                            })
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
                          la{' '}
                          <Text style={styles.acceptTextLink}>
                            Politique de confidentialité
                          </Text>{' '}
                          et aux{' '}
                          <Text style={styles.acceptTextLink}>
                            Conditions générales
                          </Text>{' '}
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
                          Déjà membre ?{' '}
                        </Text>
                        <Text
                          style={styles.alreadyMemberTextUnderline}
                          onPress={() => navigate('loginScreen')}>
                          Se connecter.
                        </Text>
                      </View>
                    </View>
                  )}
                </Formik>
              </View>
            </SafeAreaView>
            <KeyboardSpacer />
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}
