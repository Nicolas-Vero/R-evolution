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
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { auth } from '../../api/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE } from '../../configs/Constants';
import { Formik } from 'formik';
import { Icon, CheckBox } from 'react-native-elements';

import { BasicTextInput } from '../../components/inputs/index';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
//import { Slider } from 'react-native-elements';
import { ElementSlider } from '../../components/ElementSlider';
const { width } = Dimensions.get('window');
import { dynamicInput } from '../../components/inputs/dynamicInput';
import { dynamicList } from '../../components/dynamicList';
import { selectList } from '../../components/selectList';
import { LinearGradient } from 'expo-linear-gradient';
import { avatar } from '../../components/avatar';
const inputs = [
  { name: 'degrees', type: 'default', component: dynamicInput },
  { name: 'xP', type: 'default', component: ElementSlider },
  { name: 'spécialities', type: 'default', component: dynamicList },
  { name: 'gymPlace', type: 'default', component: selectList },
  { name: 'avatar', type: 'default', component: avatar },
];

export default class RegisterInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 'complementary',
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
  changeStep = (newStep) => {
    const inputLenght = inputs.length;
    const percent = ((newStep + 1) / inputLenght) * 1.0;
    this.setState({
      stepperStep: newStep,
      progress: percent,
      step: 'complementary',
    });
    // switch (this.step) {
    //   case 'initial':
    //     this.setState({step:'complementary'})
    //     break;
    //   case 'complementary':
    //     this.setState({step:'payment'})
    //   default:
    //     break;
    // }
  };

  async onContinuePress() {
    if (this.password === this.confirmPassword) {
      const { gender, first_name, last_name, telephone, email, password } =
        this;
      const body = {
        gender: gender,
        first_name: first_name,
        last_name: last_name,
        phone: telephone,
        email: email,
        password: password,
      };
      // this.setState({loading: true});
      auth(body)
        .then((res) => ({
          data: res.data.data,
          headers: {
            access_token: res.data.headers['access-token'],
            token_type: res.data.headers['token-name'],
            uid: res.data.headers['uid'],
            // client: res.headers['client'],
            //    expiry: res.headers['expiry'],
          },
        }))
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

          //this.props.navigation.navigate('AddSpecialities');
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
    const { stepperStep, step } = this.state;
    console.log(stepperStep);
    const Layout = inputs[stepperStep].component;
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
          style={styles.background}
        />
        <SafeAreaView style={styles.safeArea} />
        {/*todo relier correctement les pages precedentes*/}
        {stepperStep < 1 ? (
          <Header title="inscription" />
        ) : (
          <Header
            title="let's go"
            onPress={() => this.changeStep(stepperStep - 1)}
          />
        )}
        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
          {step === 'initial' && (
            <View>
              <Formik
                initialValues={{
                  gender: 'male',
                  first_name: '',
                  last_name: '',
                  email: '',
                  phone: '',
                  password: '',
                  confirmPassword: '',
                  termsCondition: false,
                }}
                onSubmit={(values) => onContinuePress(values)}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                }) => (
                  <View>
                    {/* {console.log(values)} */}
                    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                      <CheckBox
                        containerStyle={{
                          paddingLeft: 0,
                          marginLeft: 0,
                          backgroundColor: 'transparent',
                          borderWidth: 0,
                        }}
                        title="M"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={values.gender.toString() === 'male'}
                        value={values.gender}
                        onPress={() => setFieldValue('gender', 'male')}
                      />
                      <CheckBox
                        containerStyle={{
                          paddingLeft: 0,
                          marginLeft: 0,
                          backgroundColor: 'transparent',
                          borderWidth: 0,
                        }}
                        title="Mme"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={values.gender === 'female'}
                        value={values.gender}
                        onPress={() => setFieldValue('gender', 'female')}
                      />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                      <TextInput
                        placeholder="Nom"
                        style={{
                          backgroundColor: '#FFFFFF',
                          paddingTop: 10,
                          paddingBottom: 10,
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}
                        onChangeText={handleChange('first_name')}
                        onBlur={handleBlur('first_name')}
                        value={values.first_name}
                      />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                      <TextInput
                        placeholder="Prénom"
                        style={{
                          backgroundColor: '#FFFFFF',
                          paddingTop: 10,
                          paddingBottom: 10,
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}
                        onChangeText={handleChange('last_name')}
                        onBlur={handleBlur('last_name')}
                        value={values.last_name}
                      />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                      <TextInput
                        placeholder="Email"
                        style={{
                          backgroundColor: '#FFFFFF',
                          paddingTop: 10,
                          paddingBottom: 10,
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                      />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                      <TextInput
                        placeholder="Téléphone"
                        style={{
                          backgroundColor: '#FFFFFF',
                          paddingTop: 10,
                          paddingBottom: 10,
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        value={values.phone}
                      />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                      <TextInput
                        placeholder="Mot de passe"
                        style={{
                          backgroundColor: '#FFFFFF',
                          paddingTop: 10,
                          paddingBottom: 10,
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                      />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                      <TextInput
                        placeholder="Confirmer votre mot de passe"
                        style={{
                          backgroundColor: '#FFFFFF',
                          paddingTop: 10,
                          paddingBottom: 10,
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 15,
                        marginBottom: 24,
                      }}>
                      <CheckBox
                        containerStyle={{
                          paddingLeft: 0,
                          marginLeft: 0,
                          backgroundColor: 'transparent',
                          borderWidth: 0,
                        }}
                        checked={values.termsCondition}
                        value={values.termsCondition}
                        onPress={() =>
                          setFieldValue(
                            'termsCondition',
                            !values.termsCondition,
                          )
                        }
                      />
                      <Text
                        style={{
                          flex: 1,
                          flexWrap: 'wrap',
                          color: '#FFFFFF',
                          textAlign: 'justify',
                        }}>
                        En créant un compte, vous acceptez de vous conformer à
                        la Politique de confidentialité et aux Conditions
                        générales de [R]evolution.
                      </Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                      <Button
                        loading={false}
                        title="Rejoins-nous"
                        onPress={this.onContinuePress.bind(values)}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 15,
                        marginBottom: 24,
                      }}>
                      <Text>déja membre ? </Text>
                      <Text
                        style={{ color: '#38aae3' }}
                        onPress={() => navigate('Login')}>
                        Connecter-vous
                      </Text>
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
                degrees: [],
                xP: '',
                spécialities: [
                  { name: 'muscu', selected: 0 },
                  { name: 'endurance', selected: 0 },
                  { name: 'force', selected: 0 },
                ],
                gymPlace: '',
                avatar: '',
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
                // <ScrollView>
                  <View style={{height:hp('80%'), borderColor:'blue',borderWidth:3, justifyContent:'space-between'}}>
                    <View style={{
                      alignContent:'center', maxHeight:hp('70'), borderColor:'red',borderWidth:3}}>
                      <Layout
                        component={inputs[stepperStep].component}
                        placeholder={inputs[stepperStep].name}
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
                    <View style={{borderColor:'green',borderWidth:3}}>
                      {isSubmitting ? (
                        <Loader />
                      ) : (
                        <View style={{}}>
                          <Button
                            title="Suivant"
                            onPress={
                              inputs[inputs.length - 1] &&
                              stepperStep === inputs.length - 1
                                ? handleSubmit
                                : () => this.changeStep(stepperStep + 1)
                            }
                            disabled={Object.keys(errors).some((v) =>
                              inputs[stepperStep].name.includes(v),
                            )}>
        
                          </Button>
                        </View>
                      )}
                    </View>
                  </View>
             //   </ScrollView>
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
