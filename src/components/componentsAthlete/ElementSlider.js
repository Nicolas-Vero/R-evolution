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

import { Button } from '../../components/Button';
import Header from '../../components/Header';
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
          <Header title="LET'S GO" />
            <SafeAreaView onPress={Keyboard.dismiss} style={styles.safeArea}>
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={require('../../../assets/images/GroupA_2.png')}
                  style={{
                    width: widthPercentageToDP(80),
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
                <Formik
                  initialValues={{
                    experience_years: '0',
                  }}
                  onSubmit={(values) => {
                    const item = { ...passItem, ...values };
                    navigation.navigate('dynamicListAthlete', { item: item });
                    console.log(item);
                  }}>
                  {({ handleSubmit, isValid, validate, ref }) => (
                    <View>
                      <Field
                        name="experience_years"
                        id="experience_years"
                        validate={validate}>
                        {({ field, form: {} }) => {
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
                                  ANNÉE(S) D'EXPÉRIENCE
                                </Text>
                              </View>
                              <View
                                style={{
                                  alignItems: 'center',
                                  marginTop: 92,
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
                                    marginTop: 76,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: widthPercentageToDP(40),
                                    backgroundColor: '#282C3A',
                                    borderRadius: 5,
                                  }}>
                                  {field.value < 1 ? (
                                    <Text
                                      style={{
                                        marginVertical: 10,
                                        marginHorizontal: 14,
                                        fontFamily: 'RobotoBold',
                                        fontSize: 16,
                                        color: '#FFFF',
                                      }}>
                                      MOINS D'UN AN
                                    </Text>
                                  ) : field.value == 1 ? (
                                    <Text
                                      style={{
                                        fontWeight: 'bold',
                                        fontSize: 16,
                                        color: '#FFFF',
                                      }}>
                                      {field.value} AN
                                    </Text>
                                  ) : field.value > 9 ? (
                                    <Text
                                      style={{
                                        fontWeight: 'bold',
                                        fontSize: 16,
                                        color: '#FFFF',
                                      }}>
                                      PLUS DE {field.value} ANS
                                    </Text>
                                  ) : (
                                    <Text
                                      style={{
                                        fontWeight: 'bold',
                                        fontSize: 16,
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
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
