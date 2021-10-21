import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  Dimensions,
  Keyboard,
  StatusBar,
  TextInput,
  Image,
} from 'react-native';

import { Button } from '../Button';
import Header from '../../components/Header';
const { width } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';
import { Formik, FieldArray, Field } from 'formik';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import * as Yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';
export default class mensuration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'initial',
      // passItem: this.props.navigation.state.params.item,
      arrayofdiplomas: [],
    };
  }
  render() {
    const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const passItem = this.props.navigation.state.params.item;
    const { navigation } = this.props;
    console.log('passitem', passItem);
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
              <Header title="Let' go" />
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={require('../../../assets/images/GroupA_1.png')}
                  style={{
                    width: widthPercentageToDP(80),
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
                <Formik
                  initialValues={{
                    age: '',
                    weight: '',
                    size: '',
                  }}
                  onSubmit={(values) => {
                    const item = { ...passItem, ...values };
                    navigation.navigate('ElementSlider', { item: item });
                    console.log(item);
                  }}
                  // validationSchema={Yup.object().shape({
                  //   age: Yup.string()
                  //   .matches(
                  //     phoneRegExp,
                  //     'Tu dois entrer un age valide.',
                  //   ).required('Requis'),
                  //   weight: Yup.string()
                  //   .matches(
                  //     phoneRegExp,
                  //     'Tu dois entrer un poids valide.',
                  //   ).required('Requis'),
                  //   size: Yup.string()
                  //   .matches(
                  //     phoneRegExp,
                  //     'Tu dois entrer une taille valide.',
                  //   ).required('Requis'),
                  // })}
                  validationSchema={Yup.object().shape({
                    age: Yup.number().required('Requis'),
                    weight: Yup.number().required('Requis'),
                    size: Yup.number().required('Requis'),
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
                    validate,
                    ref,
                  }) => (
                    <View>
                      <Field
                        name="mensuration"
                        id="mensuration"
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
                            <View style={{ height: heightPercentageToDP(72) }}>
                              <View
                                style={{
                                  alignItems: 'center',
                                  marginTop: 135,
                                }}>
                                <Text
                                  style={{
                                    fontFamily: 'RobotoBold',
                                    fontSize: 20,
                                    color: '#FFFF',
                                  }}>
                                  AIDE NOUS A MIEUX TE CONNAÎTRE
                                </Text>
                              </View>
                              <View style={styles.container}>
                                <FieldArray
                                  name="mensuration"
                                  render={(arrayhelper) => (
                                    <View style={styles.container2}>
                                      {
                                        <View>
                                          <View style={styles.container2}>
                                            <TextInput
                                              style={{
                                                backgroundColor: '#FFFFFF',
                                                width: widthPercentageToDP(60),
                                                paddingTop: 10,
                                                paddingBottom: 10,
                                                paddingLeft: 15,
                                                paddingRight: 15,
                                                borderRadius: 5,
                                                borderWidth:
                                                  errors.size && touched.size
                                                    ? 2
                                                    : 0,
                                                borderColor:
                                                  errors.size && touched.size
                                                    ? 'red'
                                                    : null,
                                              }}
                                              placeholder="Taille"
                                              onChangeText={(text) =>
                                                (arrayhelper.form.values.size =
                                                  text)
                                              }
                                            />
                                            {errors.size && touched.size && (
                                              <View
                                                style={{
                                                  alignItems: 'flex-end',
                                                }}>
                                                <Text
                                                  style={{
                                                    fontSize: 15,
                                                    color: 'red',
                                                  }}>
                                                  {errors.size}
                                                </Text>
                                              </View>
                                            )}
                                          </View>
                                          <View style={styles.container2}>
                                            <TextInput
                                              placeholder="Poids"
                                              onChangeText={(text) =>
                                                (arrayhelper.form.values.weight =
                                                  text)
                                              }
                                              style={{
                                                backgroundColor: '#FFFFFF',
                                                width: widthPercentageToDP(60),
                                                paddingTop: 10,
                                                paddingBottom: 10,
                                                paddingLeft: 15,
                                                paddingRight: 15,
                                                borderRadius: 5,
                                                borderWidth:
                                                  errors.weight &&
                                                  touched.weight
                                                    ? 2
                                                    : 0,
                                                borderColor:
                                                  errors.weight &&
                                                  touched.weight
                                                    ? 'red'
                                                    : null,
                                              }}
                                            />
                                            {errors.weight && touched.weight && (
                                              <View
                                                style={{
                                                  alignItems: 'flex-end',
                                                }}>
                                                <Text
                                                  style={{
                                                    fontSize: 15,
                                                    color: 'red',
                                                  }}>
                                                  {errors.weight}
                                                </Text>
                                              </View>
                                            )}
                                          </View>
                                          <View style={styles.container2}>
                                            <TextInput
                                              style={{
                                                backgroundColor: '#FFFFFF',
                                                width: widthPercentageToDP(60),
                                                paddingTop: 10,
                                                paddingBottom: 10,
                                                paddingLeft: 15,
                                                paddingRight: 15,
                                                borderRadius: 5,
                                                borderWidth:
                                                  errors.size && touched.size
                                                    ? 2
                                                    : 0,
                                                borderColor:
                                                  errors.size && touched.size
                                                    ? 'red'
                                                    : null,
                                              }}
                                              placeholder="Âge"
                                              onChangeText={(text) =>
                                                (arrayhelper.form.values.age =
                                                  text)
                                              }
                                            />
                                            {errors.age && touched.age && (
                                              <View
                                                style={{
                                                  alignItems: 'flex-end',
                                                }}>
                                                <Text
                                                  style={{
                                                    fontSize: 15,
                                                    color: 'red',
                                                  }}>
                                                  {errors.age}
                                                </Text>
                                              </View>
                                            )}
                                          </View>
                                        </View>
                                      }
                                    </View>
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
                        title="suivant"
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
  container: {
    width: width,
    height: 48,
    backgroundColor: '#2CDEE4',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: '#000000',
  },
  container: {
    marginTop: heightPercentageToDP(10),
    alignItems: 'center',
  },
  container2: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textStyle: {
    color: '#000000',
  },
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
  container: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  textStyle: {
    color: '#000000',
  },
  field: {
    backgroundColor: '#FFFFFF',
    width: widthPercentageToDP(60),
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});
