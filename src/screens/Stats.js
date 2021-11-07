import React from 'react';
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
//import { auth } from '../../api/Register';
import { Formik } from 'formik';
import { CheckBox } from 'react-native-elements';
import { Button } from '../components/Button';
import Header from '../components/Header';
//import { Slider } from 'react-native-elements';
import { experience } from '../components/experience';
const { width } = Dimensions.get('window');
import { diplomas } from '../components/diplomas';
import { specialities } from '../components/specialities';
import { trainingPlace } from '../components/trainingPlace';
import { LinearGradient } from 'expo-linear-gradient';
import { avatar } from '../components/avatar';
const inputs = [
  { name: 'degrees', type: 'default', component: diplomas },
  { name: 'xP', type: 'default', component: experience },
  { name: 'spécialities', type: 'default', component: specialities },
  { name: 'gymPlace', type: 'default', component: trainingPlace },
  { name: 'avatar', type: 'default', component: avatar },
];

export default class Stats extends React.Component {
  constructor(props) {
    super(props);
  }

  async onContinuePress() {
    if (this.password === this.confirm_password) {
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
      
  }}

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
        {stepperStep < 1 ? (
          <Header title="inscription" />
        ) : (
          <Header
            title="LET'S GO"
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
                  confirm_password: '',
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
                        onChangeText={handleChange('confirm_password')}
                        onBlur={handleBlur('confirm_password')}
                        value={values.confirm_password}
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
                        onPress={()=>{
                          navigate('MoreInfo')
                          this.onContinuePress.bind(values)}
                        }
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
                        onPress={() => navigate('loginScreen')}>
                        Connecter-vous
                      </Text>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
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