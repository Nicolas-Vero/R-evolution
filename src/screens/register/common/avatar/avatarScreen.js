import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
  Image,
  SafeAreaView,
  Text,
  StatusBar,
  ScrollView,
} from 'react-native';
const { width } = Dimensions.get('window');
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-elements';

import { LinearGradient } from 'expo-linear-gradient';
import { Formik, FieldArray, Field } from 'formik';
import { sign_up } from '../../../../api/Athlete';
import { auth } from '../../../../api/Coach';
import { upload_file } from '../../../../api/File';
import Header from '../../../../components/Header';
import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../../components/Button';
import styles from './avatarStyle';
import { athlete_login, get_athlete } from '../../../../api/Athlete';
import AuthService from '../../../../services/AuthService';
export default class avatarScreen extends React.Component {
  constructor(props) {
    console.log(props.navigation.state.params);
    super(props);
    this.state = {
      isLoaded: false,
      image: {},
      isValid: true,
      isAthlete: props.navigation.state.params.item.userType === 'athlete',
    };
  }
  async componentDidMount() {
    {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    }
  }

  onRegister = async (formData, item) => {
    const { isAthlete } = this.state;
    const req = isAthlete ? await sign_up(item) : await auth(item);
    if (req.status === 200) {
      if (isAthlete) {
        await this.loginAthlete({ email: item.email, password: item.password });
        return;
      }

      this.props.navigation.popToTop();
      this.props.navigation.push('loginScreen');
    }
    // try {
    //   const req = isCoach === 'athlete' ? await sign_up(item) : await auth(item);
    //   console.log(req.status)
    //   if (req.status === 200) {
    //     this.props.navigation.popToTop();
    //     this.props.navigation.push('loginScreen');      }
    //   // (isCoach !== 'athlete' ? auth(item) : sign_up(item)).then(() => {
    //   //   console.log(DataTransfer)
    //   //   this.props.navigation.popToTop();
    //   //   this.props.navigation.push('loginScreen');
    //   // });
    //   // upload_file(formData)
    //   //   .then((res) => {
    //   //     console.log(res);
    //   //     item.profile_picture_url = res.data.location;
    //   //   })
    //   //   .then(() => {
    //   //     console.log('item', item);
    //   //     const register = isCoach ? auth(item) : sign_up(item);
    //   //     console.log('register', register);
    //   //   })
    //   //   .then(() => {
    //   //     //call login route item.email, item.pwd
    //   //     // get token
    //   //     // authservice.setAuth()
    //   //     // redirect to correct stack
    //   //     this.props.navigation.popToTop();
    //   //     this.props.navigation.push('loginScreen');
    //   //   });
    // } catch (error) {
    // console.log('error:', error, ' ', 'data:', item);
    // }
  };

  async loginAthlete(body) {
    const login = await athlete_login(body);
    if (login.status === 200) {
      await this.setAuth(login.data, 'athlete');
      const user = await get_athlete();
      if (user.status === 200) {
        await AuthService.setUser(user.data);
        console.log(await AuthService.getUser());

        this.props.navigation.navigate('DashboardStackAtlhete');
      }
    }
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

  onNavigate = () => {
    this.props.navigation.navigate('loginScreen');
  };

  render() {
    const passItem = this.props.navigation.state.params.item;
    const pickImage = async (arrayhelper) => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        this.setState({ image: result });
        arrayhelper.form.values.profile_picture_url = result.uri;
      }
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
          style={styles.background}>
          <Header title="LET'S GO" />
          <SafeAreaView onPress={Keyboard.dismiss} style={styles.safeArea}>
            <RegisterStepImageView step={this.state.isCoach ? 13 : 8} />
            <View style={styles.content}>
              <Formik
                initialValues={{
                  profile_picture_url: '',
                }}
                onSubmit={(values) => {
                  var item = { ...passItem, ...values };
                  const formData = new FormData();
                  formData.append('file', {
                    uri: this.state.image.uri,
                    type: this.state.image.type,
                    name: this.state.image.uri,
                  });
                  console.log(formData);
                  this.onRegister(formData, item);
                }}>
                {({ handleSubmit, validate, ref }) => (
                  <View style={styles.content}>
                    <Field
                      name="profile_picture_url"
                      id="profile_picture_url"
                      validate={validate}>
                      {({ form: {} }) => {
                        return (
                          <View
                            style={{
                              height: heightPercentageToDP(72),
                            }}>
                            <Text style={styles.title}>PHOTO DE PROFIL</Text>
                            <View
                              style={{
                                marginTop: 56,
                              }}>
                              {this.state.image.uri ? (
                                <Text style={styles.subTitle}>
                                  Superbe photo !
                                </Text>
                              ) : (
                                <Text style={styles.subTitle}>
                                  C'est toujours plus sympa avec {'\n'}une photo
                                  de profil
                                </Text>
                              )}
                            </View>
                            <View style={styles.photoPickerContainer}>
                              <FieldArray
                                name="profile_picture_url"
                                render={(arrayhelper) => (
                                  <TouchableOpacity
                                    onPress={(item) => {
                                      pickImage(arrayhelper, item);
                                    }}>
                                    {this.state.image.uri ? (
                                      <View>
                                        <Avatar
                                          size="xlarge"
                                          rounded
                                          source={{ uri: this.state.image.uri }}
                                        />
                                      </View>
                                    ) : (
                                      <Image
                                        style={styles.previewImage}
                                        source={require('../../../../../assets/images/AddPhoto.png')}
                                      />
                                    )}
                                  </TouchableOpacity>
                                )}
                              />
                            </View>
                          </View>
                        );
                      }}
                    </Field>
                    <Button
                      loading={!this.state.isValid}
                      disabled={this.state.isValid}
                      title="Créer ton compte"
                      customTextStyle={styles.buttonText}
                      onPress={handleSubmit}
                    />
                  </View>
                )}
              </Formik>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   safeArea: {
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//   },
//   container1: {
//     height: 300,
//     alignItems: 'center',
//     alignContent: 'center',
//     justifyContent: 'center',
//   },
//   container2: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'red',
//   },

//   item: {
//     backgroundColor: '#393637',
//     borderRadius: 25,
//     marginVertical: 8,
//     padding: 10,
//     justifyContent: 'center',
//   },
//   title: {
//     fontFamily: 'RobotoBold',
//     fontSize: 20,
//     color: '#FFFFFF',
//     lineHeight: 24,
//   },
//   text: {
//     fontFamily: 'RobotoBold',
//     fontSize: 15,
//     color: '#FFFFFF',
//     marginBottom: 30,
//     width: widthPercentageToDP(90),
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: width,
//     height: 49,
//     marginTop: 29,
//     marginBottom: 49,
//     paddingLeft: 16,
//     paddingRight: 16,
//   },
//   background: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//   },
//   title: {
//     fontFamily: 'RobotoBold',
//     fontSize: 20,
//     color: '#FFFFFF',
//     lineHeight: 24,
//   },
// });
