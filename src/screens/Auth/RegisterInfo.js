import React from 'react';
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import {auth} from '../../api/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE} from '../../configs/Constants';
import {Formik} from 'formik';
import {Icon, CheckBox} from 'react-native-elements';

import {BasicTextInput} from '../../components/inputs/index';
import {Button} from '../../components/Button';
import Header from '../../components/Header';

const {width} = Dimensions.get('window')

const inputs = [
  {name: 'firstName', type: 'default', component: BasicTextInput},
  {name: 'lastName', type: 'default', component: BasicTextInput},
  {name: 'email', type: 'email-address', component: BasicTextInput},
];

export default class RegisterInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 'initial',
      stepperStep: 0,
      progress: 0,
    };
  }

  // handleErrorsTab(errors) {
  //   const indexes = [];
  //   Object.keys(errors).some(v => {
  //     const idx = inputs.map(e => e.name).indexOf(v);
  //     indexes.push(idx);
  //   });

  //   var min = Math.min(...indexes);
  //   this.changeStep(min);
  // }

  changeStep = newStep => {
    const inputLenght = inputs.length;
    const percent = ((newStep + 1) / inputLenght) * 1.0;
    this.setState({stepperStep: newStep, progress: percent});
  };

  async onContinuePress() {
    if (this.state.password === this.state.confirmPassword) {
      const {name, first_name, telephone, mail, password} = this.state;
      const body = {
        first_name: first_name,
        last_name: name,
        phone: telephone,
        email: mail,
        password: password,
      };
      this.setState({loading: true});
      auth(body)
        .then(res => ({
          data: res.data.data,
          headers: {
            access_token: res.data.headers['access-token'],
            token_type: res.data.headers['token-name'],
            uid: res.data.headers.uid,
            // client: res.headers['client'],
            //    expiry: res.headers['expiry'],
          },
        }))
        .then(async res => {
          await AsyncStorage.setItem(STORAGE.USER, JSON.stringify(res.data));
          await AsyncStorage.setItem(
            STORAGE.HEADERS,
            JSON.stringify(res.headers),
          );
        })
        .then(() => {
          this.setState({loading: false});

          // this.props.navigation.navigate('AddSpecialities');
        })
        .catch(err => {
          this.setState({loading: false});
          if (err.request && err.request.status === 422) {
            this.setState({
              message: 'Email déjà utilisé, veuillez vous connecter.',
            });
          } else {
            console.log(err);
            //alert('Please try again. ');
          }
        });
    } else {
      //alert('Passwords don\'t match');
    }
  }

  render() {
    const {navigation} = this.props
    const {stepperStep, step} = this.state;
    const Layout = inputs[stepperStep].component;
    return (
      <View style={{flex: 1, backgroundColor: '#060606'}}>
        <SafeAreaView style={styles.safeArea} />
          <Header title="inscription" />
          <View style={{paddingLeft: 16, paddingRight: 16}}>
          {step === 'initial' && (
            <View>
              <Formik
                initialValues={{
                  gender: 'male',
                  first_name: '',
                  last_name: '',
                  mail: '',
                  phone: '',
                  password: '',
                  termsCondition: false,
                }}
                onSubmit={values => console.log(values)}>
                {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => (
                  <View>
                    {console.log(values)}
                    <View style={{flexDirection: 'row', marginBottom: 15}}>
                      <CheckBox
                        containerStyle={{paddingLeft: 0, marginLeft: 0, backgroundColor: 'transparent', borderWidth: 0}}
                        title='M'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={values.gender.toString() === 'male'}
                        value={values.gender}
                        onPress={() => setFieldValue('gender', 'male')}
                      />
                      <CheckBox
                        containerStyle={{paddingLeft: 0, marginLeft: 0, backgroundColor: 'transparent', borderWidth: 0}}
                        title='M'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={values.gender === 'female'}
                        value={values.gender}
                        onPress={() => setFieldValue('gender', 'female')}
                      />
                    </View>
                    <View style={{marginBottom: 15}}>
                      <TextInput
                        placeholder="Nom"
                        style={{backgroundColor: '#FFFFFF', paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15}}
                        onChangeText={handleChange('first_name')}
                        onBlur={handleBlur('first_name')}
                        value={values.first_name}
                      />
                    </View>
                    <View style={{marginBottom: 15}}>
                      <TextInput
                        placeholder="Prénom"
                        style={{backgroundColor: '#FFFFFF', paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15}}
                        onChangeText={handleChange('last_name')}
                        onBlur={handleBlur('last_name')}
                        value={values.last_name}
                      />
                    </View>
                    <View style={{marginBottom: 15}}>
                      <TextInput
                        placeholder="Email"
                        style={{backgroundColor: '#FFFFFF', paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15}}
                        onChangeText={handleChange('mail')}
                        onBlur={handleBlur('mail')}
                        value={values.mail}
                      />
                    </View>
                    <View style={{marginBottom: 15}}>
                      <TextInput
                        placeholder="Téléphone"
                        style={{backgroundColor: '#FFFFFF', paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15}}
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        value={values.phone}
                      />
                    </View>
                    <View style={{marginBottom: 15}}>
                      <TextInput
                        placeholder="Mot de passe"
                        style={{backgroundColor: '#FFFFFF', paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15}}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                      />
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 24}}>
                      <CheckBox
                        containerStyle={{paddingLeft: 0, marginLeft: 0, backgroundColor: 'transparent', borderWidth: 0}}
                        checked={values.termsCondition}
                        value={values.termsCondition}
                        onPress={() => setFieldValue('termsCondition', !values.termsCondition)}
                      />
                      <Text style={{flex: 1, flexWrap: 'wrap', color: '#FFFFFF', textAlign: 'justify'}}>En créant un compte, vous acceptez de vous conformer à la Politique de confidentialité et aux Conditions générales de [R]evolution.</Text>
                    </View>

                    <View style={{alignItems: 'center'}}>
                      <Button loading={false}>Rejoins-nous</Button>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          )}

          {step === 'complementary' && (
            <Formik
              innerRef={this.formikRef}
              initialValues={{
                name: '',
                first_name: '',
                telephone: '',
                mail: '',
                password: '',
                confirmPassword: '',
                passwordShow: true,
                confirmPasswordShow: true,
                loading: false,
                message: '',
              }}
              onSubmit={(values, actions) =>
                this.handleFormSubmit(values, actions)
              }>
              {({
                values,
                errors,
                isSubmitting,
                handleSubmit,
                setValues,
                setFieldTouched,
                setFieldValue,
              }) => (
                <View>
                  <View>
                    <Layout
                        placeholder={inputs[stepperStep].name}
                        component={inputs[stepperStep].component}
                        name={inputs[stepperStep].name}
                        onChangeText={this.onChangeText}
                        keyboardType={inputs[stepperStep].type}
                        secureTextEntry={
                          inputs[stepperStep] && inputs[stepperStep].secureEntry
                        }
                        errorContainer={{
                          alignItems: 'center',
                          paddingLeft: 50,
                        }}
                        values={values}
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        setValues={setValues}
                        errors={errors}
                      />
                  </View>
                  <View>
                    {stepperStep >= 1 && (
                      <TouchableOpacity
                        onPress={() => this.changeStep(step - 1)}>
                        <View>
                          <Icon
                            name="arrow-left"
                            type="material-community"
                            color="#949CC5"
                          />
                        </View>
                      </TouchableOpacity>
                    )}

                    {isSubmitting ? (
                      <Loader />
                    ) : (
                      <TouchableOpacity
                        onPress={
                          inputs[inputs.length - 1] &&
                          stepperStep === inputs.length - 1
                            ? handleSubmit
                            : () => this.changeStep(stepperStep + 1)
                        }
                        disabled={Object.keys(errors).some(v =>
                          inputs[stepperStep].name.includes(v),
                        )}>
                        <View>
                          <Icon
                            name="check"
                            type="material-community"
                            color="#FFFFFF"
                          />
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
            </Formik>
          )}

        {step === 'payment' && <View />}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
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
    paddingRight: 16
  },
});