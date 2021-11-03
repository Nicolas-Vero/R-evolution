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
  Image,
} from 'react-native';

import { Button } from '../components/Button';
import Header from '../components/Header';
const { width } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';
import { Formik, Field } from 'formik';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import Slider from 'react-native-slider';
import { ScrollView } from 'react-native-gesture-handler';
export default class ElementSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'initial',
      // passItem: this.props.navigation.state.params.item,
      arrayofdiplomas: [],
    };
  }
  render() {
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
                  source={require('../../assets/images/Group_2.png')}
                  style={{ width: widthPercentageToDP(80) }}
                />
              </View>
              <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
                <Formik
                  initialValues={{
                    experience_years: '0',
                  }}
                  onSubmit={(values) => {
                    const item = { ...passItem, ...values };
                    navigation.navigate('dynamicList', { item: item });
                    console.log(item);
                  }}>
                  {({
                    handleSubmit,
                    isValid,
                    validate,
                    ref,
                  }) => (
                    <View>
                      <Field
                        name="experience_years"
                        id="experience_years"
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
                            <View style={{ height: heightPercentageToDP(75) }}>
                              <View
                                style={{
                                  alignContent: 'center',
                                  alignItems: 'center',
                                  marginTop: 75,
                                }}>
                                <Text
                                  style={{
                                    marginTop: 60,
                                    fontFamily: 'RobotoBold',
                                    fontSize: 20,
                                    color: '#FFFF',
                                  }}>
                                  ANNÉE(S) D'EXPÉRIENCE
                                </Text>
                              </View>
                              <View
                                style={{
                                  alignItems: 'center',
                                  marginTop: 110,
                                }}>
                                <Slider
                                  style={{ width: widthPercentageToDP(90) }}
                                  trackStyle={{
                                    height: 10,
                                    backgroundColor: '#282C3A',
                                  }}
                                  thumbStyle={{
                                    height: 20,
                                    width: 20,
                                    backgroundColor: '#2CDEE4',
                                  }}
                                  minimumTrackTintColor="#2CDEE4"
                                  track
                                  ref={ref}
                                  name="experience_years"
                                  onSlidingComplete={(num) => {
                                    field.onChange('experience_years')(
                                      '' + num,
                                    );
                                  }}
                                  maximumValue={10}
                                  minimumValue={0}
                                  step={1}
                                />
                                <View
                                  style={{
                                    marginTop: widthPercentageToDP(10),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: heightPercentageToDP(5),
                                    width: widthPercentageToDP(40),
                                    backgroundColor: '#282C3A',
                                    borderRadius: 5,
                                  }}>
                                  {field.value < 1 ? (
                                    <Text
                                      style={{
                                        fontFamily: 'RobotoBold',
                                        fontSize: 17,
                                        color: '#FFFF',
                                      }}>
                                      MOINS D'UN ANS
                                    </Text>
                                  ) : field.value == 1 ? (
                                    <Text
                                      style={{
                                        fontWeight: 'bold',
                                        fontSize: 20,
                                        color: '#FFFF',
                                      }}>
                                      {field.value} AN
                                    </Text>
                                  ) : field.value > 9 ? (
                                    <Text
                                      style={{
                                        fontWeight: 'bold',
                                        fontSize: 20,
                                        color: '#FFFF',
                                      }}>
                                      PLUS DE {field.value} ANS
                                    </Text>
                                  ) : (
                                    <Text
                                      style={{
                                        fontWeight: 'bold',
                                        fontSize: 20,
                                        color: '#FFFF',
                                      }}>
                                      {field.value} ANS
                                    </Text>
                                  )}
                                </View>
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
});
