import React from 'react';
import { Text, View, SafeAreaView, Keyboard } from 'react-native';
import Slider from 'react-native-slider';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik, Field } from 'formik';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import Header from '../../../../components/Header';
import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../../components/Button';
import styles from './experienceStyle';

export default class experienceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'initial',
      // passItem: this.props.navigation.state.params.item,
      arrayofdiplomas: [],
    };
  }

  onNavigate = (item) => {
    this.props.navigation.navigate('goalScreen', { item: item });
  };

  render() {
    const passItem = this.props.navigation.state.params.item;
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
            <RegisterStepImageView step={2} />
            <View style={styles.content}>
              <Formik
                initialValues={{
                  experience_years: '0',
                }}
                onSubmit={(values) => {
                  const item = { ...passItem, ...values };
                  this.onNavigate(item);
                }}>
                {({ handleSubmit, isValid, validate, ref }) => (
                  <View style={styles.content}>
                    <Field
                      name="experience_years"
                      id="experience_years"
                      validate={validate}>
                      {({ field, form: {} }) => {
                        return (
                          <View
                            style={{
                              height: heightPercentageToDP(72),
                            }}>
                            <Text style={styles.title}>
                              ANNÉE(S) D'EXPÉRIENCE
                            </Text>
                            <View style={styles.content}>
                              <Slider
                                style={{ width: widthPercentageToDP(90) }}
                                trackStyle={styles.track}
                                thumbStyle={styles.thumb}
                                minimumTrackTintColor="#2CDEE4"
                                track
                                ref={ref}
                                name="experience_years"
                                onSlidingComplete={(num) => {
                                  field.onChange('experience_years')('' + num);
                                }}
                                maximumValue={10}
                                minimumValue={0}
                                step={1}
                              />
                              <View style={styles.infoContainer}>
                                {field.value < 1 ? (
                                  <Text style={styles.textInfo}>
                                    MOINS D'UN AN
                                  </Text>
                                ) : field.value == 1 ? (
                                  <Text style={styles.textInfoBold}>
                                    {field.value} AN
                                  </Text>
                                ) : field.value > 9 ? (
                                  <Text style={styles.textInfoBold}>
                                    PLUS DE {field.value} ANS
                                  </Text>
                                ) : (
                                  <Text style={styles.textInfoBold}>
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
