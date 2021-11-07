import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  Keyboard,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import Color from '../../configs/design/color';
import ResponsiveText from '../../common/ResponsiveText';
import { coach_login } from '../../api/Coach';
import Header from '../../components/Header';
const { width } = Dimensions.get('window');
import { Formik } from 'formik';
import { STORAGE } from '../../configs/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../../components/Button';
import { get_coach_me } from '../../api/Coach';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { loadFonts } from '../../configs/design/font';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import AuthService from '../../services/AuthService';
export default class Login extends React.Component {
  componentDidMount() {
    console.log('login');
    loadFonts;
  }
  async onLoginPress(values) {
    const { email, password } = values;
    const body = { email, password };
    console.log(body);
    this.setState({ loading: true });
    coach_login(body)
      .then(async (res) => {
        console.log('data response', res.data);
        await AuthService.setAuth(res.data);
        const auth = await AuthService.getAuth();
        console.log('auth token', auth.token);
        console.log('auth userId', auth.token);

        return auth;
        // ({
        //   data: res.data,
        //   headers: {
        //     Authorization: 'Bearer ' + res.data.token,
        //   },
        // });
      })
      .then(async (res) => {
        // console.log(res);
        // try {
        //   await AsyncStorage.setItem(
        //     STORAGE.HEADERS,
        //     JSON.stringify(res.headers),
        //   );
        //   this.setState({ loading: false });
        // } catch (err) {
        //   this.setState({ loading: false });
        //   //alert('Please try again. ');
        //   console.warn(err);
        // }
      })
      .then(() => {
        // get_coach_me()
        //   .then(async (res) => {
        //     await AsyncStorage.setItem(STORAGE.USER, JSON.stringify(res.data));
        //     // this.props.navigation.navigate('Dashboard');
        //   })
        //   .then(async () => {
        //     const test = await AsyncStorage.getItem(STORAGE.USER);
        //     console.log('*******', test);
        //   });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          Alert.alert('Login failed', error.response.data.errors[0]);
        }
        this.setState({ loading: false });
      })
      .finally(() => {
        this.setState({ password: '' });
      });
  }

  getErrorMessage() {
    if (this.state.errorMessage !== '')
      return (
        <ResponsiveText
          style={{
            alignSelf: 'center',
            fontSize: '3.5%',
            color: Color.Primary,
          }}>
          {this.state.errorMessage}
        </ResponsiveText>
      );
    return (
      <ResponsiveText
        style={{
          alignSelf: 'center',
          fontSize: '3.5%',
          opacity: 0,
        }}>
        Hidden Text
      </ResponsiveText>
    );
  }

  render() {
    return (
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
        style={{
          backgroundColor: 'black',
          flex: 1,
        }}>
        <ScrollView>
          <SafeAreaView onPress={Keyboard.dismiss}>
            <Header />
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.image}></Image>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                onSubmit={(values, { onLoginPress }) => onLoginPress(values)}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                }) => (
                  <KeyboardAvoidingView>
                    <View style={{ marginBottom: 15 }}>
                      <TextInput
                        placeholder="Email"
                        style={{
                          backgroundColor: '#FFFFFF',
                          height: 40,
                          width: wp(92),
                          borderRadius: 5,
                          paddingLeft: 15,
                        }}
                        onChangeText={handleChange('email')}
                        autoCapitalize="none"
                        onBlur={handleBlur('email')}
                        value={values.mail}
                      />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                      <TextInput
                        placeholder="Mot de passe"
                        secureTextEntry={true}
                        style={{
                          backgroundColor: '#FFFFFF',
                          height: 40,
                          width: wp(92),
                          borderRadius: 5,
                          paddingLeft: 15,
                        }}
                        onChangeText={handleChange('password')}
                        autoCapitalize="none"
                        onBlur={handleBlur('password')}
                        value={values.password}
                      />
                    </View>
                    {/* <View>
                    <TouchableOpacity>
                      <Text style={{ fontFamily: 'Roboto', color: '#B9B9BC' }}>
                        Mot de passe oublié ?
                      </Text>
                    </TouchableOpacity>
                  </View> */}

                    <View style={{ alignItems: 'center', marginTop: 25 }}>
                      <Button
                        style={{ width: wp(94), borderRadius: 5 }}
                        loading={false}
                        title="Se connecter"
                        customTextStyle={{
                          color: 'black',
                          fontFamily: 'RobotoBold',
                          fontWeight: 'bold',
                          fontSize: 17,
                        }}
                        onPress={() => {
                          this.onLoginPress(values);
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 20,
                      }}>
                      <Text style={{ fontFamily: 'Roboto', color: '#B9B9BC' }}>
                        Pas encore membre ?{' '}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate('RegisterInfo');
                        }}>
                        <Text
                          style={{ fontFamily: 'Roboto', color: '#2CDEE4' }}>
                          Créer ton compte
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </KeyboardAvoidingView>
                )}
              </Formik>
            </View>
          </SafeAreaView>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: heightPercentageToDP(20),
    width: wp(90),
    resizeMode: 'contain',
    marginBottom: heightPercentageToDP(5),
  },
  backgroundContainer: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.88)',
    alignItems: 'center',
  },
  // safeArea: {
  //   paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  // },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,

    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 112,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
    marginBottom: 35,
  },
  container: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: heightPercentageToDP(5),
  },
});
