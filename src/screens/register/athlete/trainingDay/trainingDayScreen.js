import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Keyboard,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Formik, FieldArray, Field } from 'formik';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Header from '../../../../components/Header';
import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../../components/Button';
import styles from './trainingDayStyle';

export default class trainingDayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'initial',
      // passItem: this.props.navigation.state.params.item,
      multi: [6, 17],
      SelectedDay: [
        { day: 'L', selected: 0 },
        { day: 'M', selected: 0 },
        { day: 'ME', selected: 0 },
        { day: 'J', selected: 0 },
        { day: 'V', selected: 0 },
        { day: 'S', selected: 0 },
        { day: 'D', selected: 0 },
      ],
    };
  }

  onNavigate = (item) => {
    this.props.navigation.navigate('selectCoachScreen', { item: item });
  };

  setDayChoice = (val) => {
    this.setState({
      SelectedDay: this.state.SelectedDay.map((item) =>
        item.day === val
          ? {
              ...item,
              selected: !item.selected,
            }
          : item,
      ),
    });
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
            <RegisterStepImageView step={6} />
            <View style={styles.content}>
              <Formik
                initialValues={{
                  days_preference: {
                    is_monday_preferred: false,
                    is_tuesday_preferred: false,
                    is_wednesday_preferred: false,
                    is_thursday_preferred: false,
                    is_friday_preferred: false,
                    is_saturday_preferred: false,
                    is_sunday_preferred: false,
                  },
                  time_preference: {
                    start_time: 6,
                    end_time: 17,
                  },
                }}
                onSubmit={(values) => {
                  const item = { ...passItem, ...values };
                  this.onNavigate(item);
                }}>
                {({ handleSubmit, isValid, validate }) => (
                  <View style={{ paddingBottom: 15 }}>
                    <Field
                      name="days_preference"
                      id="days_preference"
                      validate={validate}>
                      {({ form: {} }) => {
                        return (
                          <View style={styles.content}>
                            <Text style={styles.title}>
                              À QUEL MOMENT DE LA JOURNÉE ?
                            </Text>
                            <Text style={styles.subTitle}>
                              ENTRE{' '}
                              <Text style={styles.subTitleColored}>
                                {this.state.multi[0]}H
                              </Text>{' '}
                              ET{' '}
                              <Text style={styles.subTitleColored}>
                                {this.state.multi[1]}H
                              </Text>
                            </Text>
                            <View style={styles.sliderContainer}>
                              <FieldArray
                                name="days_preference"
                                render={(arrayhelper) => (
                                  <MultiSlider
                                    values={[
                                      this.state.multi[0],
                                      this.state.multi[1],
                                    ]}
                                    sliderLength={widthPercentageToDP(90)}
                                    onValuesChange={(values) => {
                                      this.setState({ multi: values });
                                      arrayhelper.form.values.time_preference.start_time =
                                        values[0];
                                      arrayhelper.form.values.time_preference.end_time =
                                        values[1];
                                    }}
                                    min={0}
                                    max={24}
                                    step={1}
                                    snapped
                                    style={{
                                      padding: 0,
                                      margin: 0,
                                    }}
                                    trackStyle={styles.sliderTrack}
                                    markerStyle={styles.sliderMarker}
                                    selectedStyle={styles.sliderSelected}
                                    name="days_preference"
                                  />
                                )}
                              />
                            </View>
                            <Text style={styles.daysTitle}>
                              QUEL(S) JOUR(S) ?
                            </Text>
                            <FieldArray
                              name="days_preference"
                              render={(arrayhelper) => (
                                <FlatList
                                  style={styles.flatlist}
                                  horizontal={true}
                                  data={this.state.SelectedDay}
                                  extraData={this.state}
                                  renderItem={({ item }) => {
                                    const backgroundColor =
                                      item.selected == 1
                                        ? '#2CDEE4'
                                        : '#1E2026';
                                    const textColor =
                                      item.selected == 1 ? 'black' : 'white';
                                    return (
                                      <View>
                                        <TouchableOpacity
                                          onPress={() => {
                                            switch (item.day) {
                                              case 'L':
                                                arrayhelper.form.values.days_preference.is_monday_preferred =
                                                  !arrayhelper.form.values
                                                    .days_preference
                                                    .is_monday_preferred;
                                                this.setDayChoice('L');
                                                break;
                                              case 'M':
                                                arrayhelper.form.values.days_preference.is_tuesday_preferred =
                                                  !arrayhelper.form.values
                                                    .days_preference
                                                    .is_tuesday_preferred;
                                                this.setDayChoice('M');
                                                break;
                                              case 'ME':
                                                arrayhelper.form.values.days_preference.is_wednesday_preferred =
                                                  !arrayhelper.form.values
                                                    .days_preference
                                                    .is_wednesday_preferred;
                                                this.setDayChoice('ME');
                                                break;
                                              case 'J':
                                                arrayhelper.form.values.days_preference.is_thursday_preferred =
                                                  !arrayhelper.form.values
                                                    .days_preference
                                                    .is_thursday_preferred;
                                                this.setDayChoice('J');
                                                break;
                                              case 'V':
                                                arrayhelper.form.values.days_preference.is_friday_preferred =
                                                  !arrayhelper.form.values
                                                    .days_preference
                                                    .is_friday_preferred;
                                                this.setDayChoice('V');
                                                break;
                                              case 'S':
                                                arrayhelper.form.values.days_preference.is_saturday_preferred =
                                                  !arrayhelper.form.values
                                                    .days_preference
                                                    .is_saturday_preferred;
                                                this.setDayChoice('S');
                                                break;
                                              case 'D':
                                                arrayhelper.form.values.days_preference.is_sunday_preferred =
                                                  !arrayhelper.form.values
                                                    .days_preference
                                                    .is_sunday_preferred;
                                                this.setDayChoice('D');
                                                break;
                                              default:
                                                break;
                                            }
                                          }}>
                                          <View
                                            style={[
                                              styles.day,
                                              {
                                                backgroundColor:
                                                  backgroundColor,
                                              },
                                            ]}>
                                            <Text
                                              style={{
                                                fontSize: 13,
                                                color: textColor,
                                              }}>
                                              {item.day}
                                            </Text>
                                          </View>
                                        </TouchableOpacity>
                                      </View>
                                    );
                                  }}
                                  keyExtractor={(item) => item.day}
                                />
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
                      customTextStyle={styles.nextButtonText}
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
