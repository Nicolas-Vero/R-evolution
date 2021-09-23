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
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { auth } from '../../api/Coach';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE } from '../../configs/Constants';
import { Formik } from 'formik';
import { CheckBox } from 'react-native-elements';
import Loader from 'react-loader-spinner';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
//import { Slider } from 'react-native-elements';
import { ElementSlider } from '../../components/ElementSlider';
const { width } = Dimensions.get('window');
import { dynamicInput } from '../../components/dynamicInput';
import { dynamicList } from '../../components/dynamicList';
import { selectList } from '../../components/selectList';
import { LinearGradient } from 'expo-linear-gradient';
import { avatar } from '../../components/avatar';
import { loadFonts } from '../../configs/design/font';
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

        <Header title="INSCRIPTION" />

        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
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
                  <View style={{ marginBottom: 15 }}>
                    <TextInput
                      placeholder="Nom"
                      style={{
                        backgroundColor: '#FFFFFF',
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderRadius: 5,
                        height: 45,
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
                        height: 45,
                        borderRadius: 5,
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
                        height: 45,
                        borderRadius: 5,
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
                        height: 45,
                        borderRadius: 5,
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
                        height: 45,
                        borderRadius: 5,
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
                        height: 45,
                        borderRadius: 5,
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
                      En créant un compte, vous acceptez de vous conformer à la
                      Politique de confidentialité et aux Conditions générales
                      de [R]evolution.
                    </Text>
                  </View>

                  <View style={{ alignItems: 'center' }}>
                    <Button
                      loading={false}
                      title="Rejoins-nous"
                      customTextStyle={{
                        fontFamily: 'RobotoBold',
                        fontSize: 17,
                      }}
                      onPress={() => {
                        this.state.termsCondition
                          ? navigation.navigate('MoreInfo', { item: values })
                          : alert('accepter les terms des conditons');
                      }}
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
                      style={{ color: '#FFFFFF', fontFamily: 'Montserrat' }}>
                      Déjà membre ?
                    </Text>
                    <Text
                      style={{
                        color: '#2CDEE4',
                        textDecorationLine: 'underline',
                        fontFamily: 'Montserrat',
                      }}
                      onPress={() => navigate('Login')}>
                      Se connecter.
                    </Text>
                  </View>
                </View>
              )}
            </Formik>
          </View>
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
