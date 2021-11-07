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
} from 'react-native';
const { width } = Dimensions.get('window');
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import { Button } from './Button';
import { Avatar } from 'react-native-elements';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import * as Yup from 'yup';
import { Formik, FieldArray, Field } from 'formik';
import { auth } from '../api/Coach';
import { ScrollView } from 'react-native-gesture-handler';

export default class trainingPlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'initial',
      // passItem: this.props.navigation.state.params.item,
      isLoaded: false,
      image: '',
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
  render() {
    const passItem = this.props.navigation.state.params.item;
    const { navigation } = this.props;
    const pickImage = async (arrayhelper) => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        this.setState({ image: result.uri });
        arrayhelper.form.values.profile_picture_url = result.uri;
      }
    };
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
          <SafeAreaView onPress={Keyboard.dismiss}>
            <Header title="LET'S GO" />
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../assets/images/Group_5.png')}
                style={{ width: widthPercentageToDP(75) }}
              />
            </View>

            <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
              <Formik
                initialValues={{
                  profile_picture_url: '',
                }}
                onSubmit={(values) => {
                  const item = { ...passItem, ...values };
                  // navigation.navigate('avatar', { item: item });
                  try {
                    auth(item).then(() => {
                      navigate('loginScreen');
                    });
                  } catch (error) {
                    console.log(error, 'data', item);
                  }
                  console.log(item);
                }}>
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
                  validate,
                  ref,
                }) => (
                  <View>
                    <Field
                      name="profile_picture_url"
                      id="profile_picture_url"
                      validate={validate}>
                      {({
                        field,
                        meta,
                        form: {
                          touched,
                          errors,
                          isSubmitting,
                          setFieldTouched,
                        },
                      }) => {
                        return (
                          <View
                            style={{
                              alignItems: 'center',

                              height: heightPercentageToDP(75),
                            }}>
                            <View
                              style={{
                                alignItems: 'center',
                                marginTop: 75,
                                marginBottom: 100,
                              }}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  fontSize: 20,
                                  color: '#FFFF',
                                }}>
                                PHOTO DE PROFIL
                              </Text>
                            </View>
                            <View>
                              <View style={{ marginBottom: 50 }}>
                                {this.state.image ? (
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                      fontSize: 17,
                                      color: '#FFFF',
                                    }}>
                                    Superbe photo !
                                  </Text>
                                ) : (
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                      fontSize: 17,
                                      color: '#FFFF',
                                      textAlign: 'center',
                                    }}>
                                    C'est toujours plus professionnel avec une
                                    photo de profil
                                  </Text>
                                )}
                              </View>
                            </View>

                            <FieldArray
                              name="profile_picture_url"
                              render={(arrayhelper) => (
                                <TouchableOpacity
                                  onPress={(item) => {
                                    pickImage(arrayhelper, item);
                                  }}>
                                  {this.state.image ? (
                                    <View>
                                      <Avatar
                                        size="xlarge"
                                        rounded
                                        source={{ uri: this.state.image }}
                                      />
                                    </View>
                                  ) : (
                                    <Image
                                      style={{
                                        height: 150,
                                        width: 190,
                                        resizeMode: 'contain',
                                      }}
                                      source={require('../../assets/images/AddPhoto.png')}
                                    />
                                  )}
                                </TouchableOpacity>
                              )}
                            />
                          </View>
                        );
                      }}
                    </Field>
                    <Button
                      loading={false}
                      disabled={!isValid}
                      title="Suivant"
                      customTextStyle={{
                        fontFamily: 'RobotoBold',
                        fontSize: 17,
                      }}
                      onPress={handleSubmit}
                    />
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
  container1: {
    height: 300,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },

  item: {
    backgroundColor: '#393637',
    borderRadius: 25,
    marginVertical: 8,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'RobotoBold',
    fontSize: 20,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  text: {
    fontFamily: 'RobotoBold',
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: 30,
    width: widthPercentageToDP(90),
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
  title: {
    fontFamily: 'RobotoBold',
    fontSize: 20,
    color: '#FFFFFF',
    lineHeight: 24,
  },
});
