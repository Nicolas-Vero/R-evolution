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
import { upload_file } from '../../../../api/File';
import Header from '../../../../components/Header';
import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../../components/Button';
import styles from './avatarStyle';
export default class avatarScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      image: {},
      isValid: true,
    };
  }
  async componentDidMount() {
    {
      console.log(props.item);
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    }
  }

  onNavigate = () => {
    this.props.navigation.navigate('LoginAthlete');
  };

  render() {
    const passItem = this.props.navigation.state.params.item;
    console.log(passItem);
    const { navigation } = this.props;
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
            <RegisterStepImageView step={8} />
            <View style={styles.content}>
              <Formik
                initialValues={{
                  profile_picture_url: '',
                }}
                onSubmit={(values) => {
                  var item = { ...passItem, ...values };
                  console.log('item', item);
                  const formData = new FormData();
                  formData.append('file', {
                    uri: this.state.image.uri,
                    type: this.state.image.type,
                  });
                  try {
                    upload_file(formData)
                      .then((res) => {
                        item.profile_picture_url = res.data.location;
                      })
                      .then(() => {
                        console.log('item', item);
                        sign_up(item);
                      })
                      .then(() => {
                        this.onNavigate();
                      });
                  } catch (error) {
                    console.log('error:', error, ' ', 'data:', item);
                  }
                }}>
                {({ handleSubmit, isValid, validate, ref }) => (
                  <View style={styles.content}>
                    <Field
                      name="profile_picture_url"
                      id="profile_picture_url"
                      validate={validate}>
                      {({ form: {} }) => {
                        return (
                          <View
                            style={{
                              height: heightPercentageToDP(75),
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
                      loading={false}
                      disabled={!isValid}
                      title="Suivant"
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
