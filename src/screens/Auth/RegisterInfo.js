import React from 'react';
import {Text, View, SafeAreaView, Image, Dimensions, TouchableOpacity, ScrollView, KeyboardAvoidingView, Button} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
// import Container from '../../common/Container';
// import Logo from '../../common/Logo';
import InputField from '../../common/InputField';
//import Icons from '../../configs/design/icon';
//import Button from '../../common/Button';
//import Color from '../../configs/design/color';
import ResponsiveText from '../../common/ResponsiveText';
import AuthInput from '../../common/AuthInput';
import {auth} from '../../api/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE } from '../../configs/Constants';
import { BasicTextInput } from '../../components/inputs/index';
import {Formik} from 'formik';
import {Icon} from 'react-native-elements';


const inputs = [
  {name: 'firstName', type: 'default', component: BasicTextInput},
  {name: 'lastName', type: 'default', component: BasicTextInput},
  {name: 'email', type: 'email-address', component: BasicTextInput},
];


export default class RegisterInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      progress: 0,
    };
  }

  // state = {
  //   name: '',
  //   first_name: '',
  //   telephone: '',
  //   mail: '',
  //   password: '',
  //   confirmPassword: '',
  //   passwordShow: true,
  //   confirmPasswordShow: true,
  //   loading: false,
  //   message: '',
  // };


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
    this.setState({step: newStep, progress: percent});
  };


  onNameChange(name) {
    this.setState({name})
  }

  onfirst_nameChange(first_name) {
    this.setState({first_name})
  }

  onTelephoneChange(telephone) {
    this.setState({telephone})
  }

  onPasswordChange(password) {
    this.setState({password})
  }

  onConfirmPasswordChange(confirmPassword) {
    this.setState({confirmPassword})
  }

  onMailChange(mail) {
    this.setState({mail})
  }


  async onContinuePress() {
    if (this.state.password === this.state.confirmPassword) {
      const {name, first_name, telephone, mail,password} = this.state;
      const body = {first_name:first_name, last_name:name,phone:telephone, email: mail, password:password};
      this.setState({loading: true});
      auth(body)
        .then(res => ({
          data:res.data.data,
          headers: {
            access_token: res.data.headers['access-token'],
            token_type: res.data.headers['token-name'],
            uid: res.data.headers['uid'],
           // client: res.headers['client'],
        //    expiry: res.headers['expiry'],
          }
        }))
        .then(async res => {
          await AsyncStorage.setItem(STORAGE.USER, JSON.stringify(res.data));
          await AsyncStorage.setItem(STORAGE.HEADERS, JSON.stringify(res.headers));
        })
      .then(() => {
          this.setState({loading: false});
          this.props.navigation.navigate('AddSpecialities');
        })
        .catch(err => {
          this.setState({loading: false});
          if (err.request && err.request.status === 422) {
            this.setState({message: 'Email déjà utilisé, veuillez vous connecter.'});
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
    const {step, progress} = this.state;
    const Layout = inputs[step].component;
    return (

        <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
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
                      touched,
                      dirty,
                      isValid,
                      isSubmitting,
                      handleChange,
                      handleSubmit,
                      setValues,
                      setFieldError,
                      setFieldTouched,
                      setFieldValue,
                }) => (
                  <View>
                    <View >
                    <Layout
                    placeholder={inputs[step].name}
                    component={inputs[step].component}
                    name={inputs[step].name}
                    onChangeText={this.onChangeText}
                    keyboardType={inputs[step].type}
                    secureTextEntry={
                      inputs[step] && inputs[step].secureEntry
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
                      {step >= 1 && (
                        <TouchableOpacity
                          onPress={() => this.changeStep(step - 1)}>
                          <View >
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
                            step === inputs.length - 1
                              ? handleSubmit
                              : () => this.changeStep(step + 1)
                          }
                          disabled={Object.keys(errors).some(v =>
                            inputs[step].name.includes(v),
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
        </KeyboardAvoidingView>
    );
  }
}
const styles = {
  container: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45,
    marginBottom: 50,
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: '5%',
    alignSelf: 'center',
    marginTop: 20
  },
  errorMessage: {
    alignSelf: 'center',
    fontSize: '3.5%',
    marginVertical: 10,
  },
}
