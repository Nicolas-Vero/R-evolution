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
            <Header title="LET'S GO" />
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
                  }}
                  validationSchema={Yup.object().shape({
                    age: Yup.number().required('Requis'),
                    weight: Yup.number().required('Requis'),
                    size: Yup.number().required('Requis'),
                  })}>
                  {({ handleSubmit, isValid, validate, ref }) => (
                    <View>
                      <Field
                        name="mensuration"
                        id="mensuration"
                        validate={validate}>
                        {({
                          form: {
                            touched,
                            errors,
                          },
                        }) => {
                          return (
                            <View style={{ height: heightPercentageToDP(72) }}>
                              <View
                                style={{
                                  alignItems: 'center',
                                  marginTop: 88,
                                }}>
                                <Text
                                  style={{
                                    fontFamily: 'RobotoBold',
                                    fontSize: 16,
                                    color: '#FFFF',
                                  }}>
                                  AIDE NOUS A MIEUX TE CONNAÎTRE
                                </Text>
                              </View>
                              <View style={styles.container}>
                                <FieldArray
                                  name="mensuration"
                                  render={(arrayhelper) => (
                                    <View>
                                      <View style={{ marginBottom: 15 }}>
                                        <TextInput
                                          style={{
                                            ...styles.input,
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
                                          placeholderTextColor="#979797"
                                          blurOnSubmit={false}
                                          onSubmitEditing={() =>
                                            this.weightInput &&
                                            this.weightInput.focus()
                                          }
                                          returnKeyType="next"
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
                                      <View style={{ marginBottom: 15 }}>
                                        <TextInput
                                          placeholder="Poids"
                                          onChangeText={(text) =>
                                            (arrayhelper.form.values.weight =
                                              text)
                                          }
                                          style={{
                                            ...styles.input,
                                            borderWidth:
                                              errors.weight && touched.weight
                                                ? 2
                                                : 0,
                                            borderColor:
                                              errors.weight && touched.weight
                                                ? 'red'
                                                : null,
                                          }}
                                          ref={(ref) =>
                                            (this.weightInput = ref)
                                          }
                                          placeholderTextColor="#979797"
                                          blurOnSubmit={false}
                                          onSubmitEditing={() =>
                                            this.ageInput &&
                                            this.ageInput.focus()
                                          }
                                          returnKeyType="next"
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
                                      <TextInput
                                        style={{
                                          ...styles.input,
                                          borderWidth:
                                            errors.size && touched.size ? 2 : 0,
                                          borderColor:
                                            errors.size && touched.size
                                              ? 'red'
                                              : null,
                                        }}
                                        placeholder="Âge"
                                        onChangeText={(text) =>
                                          (arrayhelper.form.values.age = text)
                                        }
                                        ref={(ref) => (this.ageInput = ref)}
                                        placeholderTextColor="#979797"
                                        blurOnSubmit={false}
                                        onSubmitEditing={() =>
                                          Keyboard.dismiss()
                                        }
                                        returnKeyType="done"
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
                        customTextStyle={{
                          fontFamily: 'RobotoBold',
                          fontSize: 17,
                          color: '#393637',
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
  input: {
    backgroundColor: '#FFFFFF',
    width: widthPercentageToDP(60),
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 3,
    fontSize: 15,
  },
  textStyle: {
    color: '#000000',
  },
  container: {
    marginTop: heightPercentageToDP(10),
    alignItems: 'center',
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
    marginBottom: 15,
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
