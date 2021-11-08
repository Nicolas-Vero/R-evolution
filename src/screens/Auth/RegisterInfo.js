import React from 'react';
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Platform,
  Keyboard,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import { auth } from '../../api/Coach';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE } from '../../configs/Constants';
import { Formik } from 'formik';
import { CheckBox } from 'react-native-elements';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
const { width } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';
import { loadFonts } from '../../configs/design/font';
import * as Yup from 'yup';
import {ScrollView} from 'react-native-gesture-handler';
export default class RegisterInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 'initial',
      stepperStep: 0,
      progress: 0,
      termsCondition: false,
    };
  }

  async componentDidMount() {
    loadFonts();
  }

  onContinuePress(values) {
    if (values.password === values.confirm_password) {
      auth(values)
        .then(
          (res) => (
            {
              data: res.data.data,
              headers: {
                access_token: res.data.headers['access-token'],
                token_type: res.data.headers['token-name'],
                uid: res.data.headers['uid'],
              },
            },
            this.changeStep,
            console.log(header)
          ),
        )
        .then(async (res) => {
          await AsyncStorage.setItem(STORAGE.USER, JSON.stringify(res.data));
          await AsyncStorage.setItem(
            STORAGE.HEADERS,
            JSON.stringify(res.headers),
          );
        })
        .then(() => {
          console.log;
          this.changeStep;
        })
        .catch((err) => {
          //  this.setState({loading: false});
          if (err.request && err.request.status === 422) {
            // this.setState({
            //   message: 'Email déjà utilisé, veuillez vous connecter.',
            // });
          } else {
            console.log(err);
            //alert('Please try again. ');
          }
        });
    } else {
      console.log('invalid confirmation');
      //alert('Passwords don\'t match');
    }
  }

  render() {
    const { navigation } = this.props;
    const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
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
          style={styles.background}>
          <ScrollView>
            <SafeAreaView onPress={Keyboard.dismiss} style={styles.safeArea}>
              <Header title="INSCRIPTION" />
              <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
                <Formik
                  initialValues={{
                    gender: 'male',
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirm_password: '',
                  }}
                  onSubmit={(values) => {
                    this.state.termsCondition
                      ? navigation.navigate('diplomas', { item: values })
                      : alert('accepter les terms des conditons');
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
                    confirm_password: Yup.string().oneOf(
                      [Yup.ref('password'), null],
                      'Les mots de passe saisis ne sont pas identiques.',
                    ),
                  })}>
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    values,
                    setFieldTouched,
                    touched,
                    errors,
                    isValid,
                  }) => (
                    <View>
                      <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <CheckBox
                          containerStyle={{
                            paddingLeft: 0,
                            marginLeft: 0,
                            backgroundColor: 'transparent',
                            borderWidth: 0,
                          }}
                          checkedColor="#2CDEE4"
                          title="M"
                          textStyle={{ color: 'white' }}
                          checkedIcon="dot-circle-o"
                          uncheckedIcon="dot-circle-o"
                          checked={values.gender.toString() === 'male'}
                          value={values.gender}
                          onPress={() => setFieldValue('gender', 'male')}
                        />
                        <CheckBox
                          checkedColor="#2CDEE4"
                          containerStyle={{
                            paddingLeft: 0,
                            marginLeft: 0,
                            backgroundColor: 'transparent',
                            borderWidth: 0,
                          }}
                          title="Mme"
                          textStyle={{ color: 'white' }}
                          checkedIcon="dot-circle-o"
                          uncheckedIcon="dot-circle-o"
                          checked={values.gender === 'female'}
                          value={values.gender}
                          onPress={() => setFieldValue('gender', 'female')}
                        />
                      </View>
                      <KeyboardAvoidingView>
                        <View style={{ marginBottom: 15 }}>
                          <TextInput
                            name="first_Name"
                            placeholder="Prénom"
                            style={{
                              backgroundColor: '#FFFFFF',
                              paddingTop: 10,
                              paddingBottom: 10,
                              borderRadius: 5,
                              height: 45,
                              paddingLeft: 15,
                              paddingRight: 15,
                              borderWidth:
                                errors.first_name && touched.first_name ? 2 : 0,
                              borderColor:
                                errors.first_name && touched.first_name
                                  ? 'red'
                                  : null,
                            }}
                            onChangeText={handleChange('first_name')}
                            onBlur={handleBlur('first_name')}
                            value={values.first_name}
                          />
                          {errors.first_name && touched.first_name && (
                            <View style={{ alignItems: 'flex-end' }}>
                              <Text style={{ fontSize: 15, color: 'red' }}>
                                {errors.first_name}
                              </Text>
                            </View>
                          )}
                        </View>
                        <View style={{ marginBottom: 15 }}>
                          <TextInput
                            name="last_name"
                            placeholder="Nom"
                            style={{
                              backgroundColor: '#FFFFFF',
                              paddingTop: 10,
                              paddingBottom: 10,
                              borderRadius: 5,
                              height: 45,
                              paddingLeft: 15,
                              paddingRight: 15,
                              borderWidth:
                                errors.last_name && touched.last_name ? 2 : 0,
                              borderColor:
                                errors.last_name && touched.last_name
                                  ? 'red'
                                  : null,
                            }}
                            onChangeText={handleChange('last_name')}
                            onBlur={handleBlur('last_name')}
                            value={values.last_name}
                          />
                          {errors.last_name && touched.last_name && (
                            <View style={{ alignItems: 'flex-end' }}>
                              <Text style={{ fontSize: 15, color: 'red' }}>
                                {errors.last_name}
                              </Text>
                            </View>
                          )}
                        </View>
                        <View style={{ marginBottom: 15 }}>
                          <TextInput
                            name="email"
                            placeholder="Email"
                            style={{
                              backgroundColor: '#FFFFFF',
                              paddingTop: 10,
                              paddingBottom: 10,
                              borderRadius: 5,
                              height: 45,
                              paddingLeft: 15,
                              paddingRight: 15,
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
                            <View style={{ alignItems: 'flex-end' }}>
                              <Text style={{ fontSize: 15, color: 'red' }}>
                                {errors.email}
                              </Text>
                            </View>
                          )}
                        </View>
                        <View style={{ marginBottom: 15 }}>
                          <TextInput
                            name="phone"
                            placeholder="Téléphone"
                            style={{
                              backgroundColor: '#FFFFFF',
                              paddingTop: 10,
                              paddingBottom: 10,
                              paddingLeft: 15,
                              paddingRight: 15,
                              height: 45,
                              borderRadius: 5,
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
                            <View style={{ alignItems: 'flex-end' }}>
                              <Text style={{ fontSize: 15, color: 'red' }}>
                                {errors.phone}
                              </Text>
                            </View>
                          )}
                        </View>
                        <View style={{ marginBottom: 15 }}>
                          <TextInput
                            name="password"
                            placeholder="Mot de passe"
                            secureTextEntry={true}
                            style={{
                              backgroundColor: '#FFFFFF',
                              paddingTop: 10,
                              paddingBottom: 10,
                              paddingLeft: 15,
                              paddingRight: 15,
                              height: 45,
                              borderRadius: 5,
                              borderWidth:
                                errors.password &&
                                touched.password
                                  ? 2
                                  : 0,
                              borderColor:
                                errors.password &&
                                touched.password
                                  ? 'red'
                                  : null,
                            }}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                          />
                          {errors.password && touched.password && (
                            <View style={{ alignItems: 'flex-end' }}>
                              <Text style={{ fontSize: 15, color: 'red' }}>
                                {errors.password}
                              </Text>
                            </View>
                          )}
                        </View>

                        <View style={{ marginBottom: 15 }}>
                          <TextInput
                            name="confirm_password"
                            placeholder="Confirmer votre mot de passe"
                            secureTextEntry={true}
                            style={{
                              backgroundColor: '#FFFFFF',
                              paddingTop: 10,
                              paddingBottom: 10,
                              borderRadius: 5,
                              height: 45,
                              paddingLeft: 15,
                              paddingRight: 15,
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
                            <View style={{ alignItems: 'flex-end' }}>
                              <Text style={{ fontSize: 15, color: 'red' }}>
                                {errors.confirm_password}
                              </Text>
                            </View>
                          )}
                        </View>
                      </KeyboardAvoidingView>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 15,
                          marginBottom: 24,
                        }}>
                        <CheckBox
                          size={25}
                          containerStyle={{
                            paddingLeft: 0,
                            marginLeft: 0,
                            backgroundColor: 'transparent',
                            borderWidth: 0,
                          }}
                          checked={this.state.termsCondition}
                          value={this.state.termsCondition}
                          onPress={() =>
                            this.setState({
                              termsCondition: !this.state.termsCondition,
                            })
                          }
                        />
                        <Text
                          style={{
                            flex: 1,
                            flexWrap: 'wrap',
                            color: '#FFFFFF',
                            fontFamily: 'Roboto',
                            fontSize: 13,
                          }}>
                          En créant un compte, vous acceptez de vous conformer à
                          la Politique de confidentialité et aux Conditions
                          générales de [R]evolution.
                        </Text>
                      </View>

                      <View style={{ alignItems: 'center' }}>
                        <Button
                          loading={false}
                          disabled={!isValid}
                          title="Rejoins-nous"
                          customTextStyle={{
                            fontFamily: 'RobotoBold',
                            fontSize: 17,
                          }}
                          onPress={handleSubmit}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 25,
                          marginBottom: 24,
                        }}>
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontFamily: 'Montserrat',
                          }}>
                          Déjà membre ?{' '}
                        </Text>
                        <Text
                          style={{
                            color: '#2CDEE4',
                            textDecorationLine: 'underline',
                            fontFamily: 'Montserrat',
                          }}
                          onPress={() => navigate('loginScreen')}>
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
}
const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
    height: 49,
    marginTop: 29,
    marginBottom: 49,
    paddingLeft: 16,
    paddingRight: 16,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
