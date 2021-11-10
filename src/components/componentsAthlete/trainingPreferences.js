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
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Button } from '../Button';
import Header from '../Header';
import { LinearGradient } from 'expo-linear-gradient';
const { width } = Dimensions.get('window');
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { Field, FieldArray, Formik } from 'formik';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

export default class trainingPreferences extends React.Component {
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
  render() {
    const passItem = this.props.navigation.state.params.item;
    const { navigation } = this.props;
    console.log('passitem', this.state.SelectedDay);
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
          {/* <ScrollView> */}
          <SafeAreaView onPress={Keyboard.dismiss} style={styles.safeArea}>
            <Header title="LET'S GO" />
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../../assets/images/GroupA_6.png')}
                style={{
                  width: widthPercentageToDP(80),
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
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
                  navigation.navigate('destinataire', { item: item });
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
                  <View style={{ paddingBottom: 10 }}>
                    <Field
                      name="days_preference"
                      id="days_preference"
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
                                marginTop: '15%',
                              }}>
                              <Text
                                style={{
                                  marginTop: 60,
                                  fontFamily: 'RobotoBold',
                                  fontSize: 20,
                                  color: '#FFFF',
                                }}>
                                À QUEL MOMENT DE LA JOURNÉE?
                              </Text>
                              <View style={{ flexDirection: 'row' }}>
                                <Text
                                  style={{
                                    fontFamily: 'RobotoBold',
                                    fontSize: 17,
                                    color: '#FFFF',
                                  }}>
                                  ENTRE
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: 'RobotoBold',
                                    fontSize: 17,
                                    color: '#2CDEE4',
                                    marginHorizontal: 5,
                                  }}>
                                  {this.state.multi[0]}H
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: 'RobotoBold',
                                    fontSize: 17,
                                    color: '#FFFF',
                                    marginHorizontal: 5,
                                  }}>
                                  ET
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: 'RobotoBold',
                                    fontSize: 17,
                                    color: '#2CDEE4',
                                  }}>
                                  {this.state.multi[1]}H
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                alignItems: 'center',
                                marginTop: '15%',
                              }}>
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
                                    trackStyle={{ height: 5 }}
                                    selectedStyle={{
                                      backgroundColor: '#2CDEE4',
                                    }}
                                    name="days_preference"
                                  />
                                )}
                              />
                              <View
                                style={{
                                  marginVertical: widthPercentageToDP(10),
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: heightPercentageToDP(5),
                                  width: widthPercentageToDP(40),
                                  backgroundColor: '#282C3A',
                                  borderRadius: 5,
                                }}>
                                <Text
                                  style={{
                                    fontFamily: 'RobotoBold',
                                    fontSize: 17,
                                    color: '#FFFF',
                                  }}>
                                  QUEL(S) JOUR(S) ?
                                </Text>
                              </View>
                            </View>
                            <FieldArray
                              name="days_preference"
                              render={(arrayhelper) => (
                                <FlatList
                                  style={{
                                    width: widthPercentageToDP(96),
                                    alignSelf: 'center',
                                  }}
                                  horizontal={true}
                                  data={this.state.SelectedDay}
                                  extraData={this.state}
                                  renderItem={({ item }) => {
                                    const borderColor =
                                      item.selected == 1
                                        ? 'transparent'
                                        : 'white';
                                    const borderWidth =
                                      item.selected == 1 ? 1 : 1;
                                    const color =
                                      item.selected == 1 ? 'black' : 'white';
                                    const backgroundColor =
                                      item.selected == 1
                                        ? '#2CDEE4'
                                        : '#1E2026';
                                    const textColor =
                                      item.selected == 1 ? 'black' : 'white';
                                    return (
                                      <TouchableOpacity
                                        onPress={() => {
                                          switch (item.day) {
                                            case 'L':
                                              arrayhelper.form.values.days_preference.is_monday_preferred =
                                                !arrayhelper.form.values
                                                  .days_preference
                                                  .is_monday_preferred;
                                              this.setState({
                                                SelectedDay:
                                                  this.state.SelectedDay.map(
                                                    (item) =>
                                                      item.day === 'L'
                                                        ? {
                                                            ...item,
                                                            selected:
                                                              !item.selected,
                                                          }
                                                        : item,
                                                  ),
                                              });
                                              break;
                                            case 'M':
                                              arrayhelper.form.values.days_preference.is_tuesday_preferred =
                                                !arrayhelper.form.values
                                                  .days_preference
                                                  .is_tuesday_preferred;
                                              this.setState({
                                                SelectedDay:
                                                  this.state.SelectedDay.map(
                                                    (item) =>
                                                      item.day === 'M'
                                                        ? {
                                                            ...item,
                                                            selected:
                                                              !item.selected,
                                                          }
                                                        : item,
                                                  ),
                                              });
                                              break;
                                            case 'ME':
                                              arrayhelper.form.values.days_preference.is_wednesday_preferred =
                                                !arrayhelper.form.values
                                                  .days_preference
                                                  .is_wednesday_preferred;
                                              this.setState({
                                                SelectedDay:
                                                  this.state.SelectedDay.map(
                                                    (item) =>
                                                      item.day === 'ME'
                                                        ? {
                                                            ...item,
                                                            selected:
                                                              !item.selected,
                                                          }
                                                        : item,
                                                  ),
                                              });
                                              break;
                                            case 'J':
                                              arrayhelper.form.values.days_preference.is_thursday_preferred =
                                                !arrayhelper.form.values
                                                  .days_preference
                                                  .is_thursday_preferred;
                                              this.setState({
                                                SelectedDay:
                                                  this.state.SelectedDay.map(
                                                    (item) =>
                                                      item.day === 'J'
                                                        ? {
                                                            ...item,
                                                            selected:
                                                              !item.selected,
                                                          }
                                                        : item,
                                                  ),
                                              });
                                              break;
                                            case 'V':
                                              arrayhelper.form.values.days_preference.is_friday_preferred =
                                                !arrayhelper.form.values
                                                  .days_preference
                                                  .is_friday_preferred;
                                              this.setState({
                                                SelectedDay:
                                                  this.state.SelectedDay.map(
                                                    (item) =>
                                                      item.day === 'V'
                                                        ? {
                                                            ...item,
                                                            selected:
                                                              !item.selected,
                                                          }
                                                        : item,
                                                  ),
                                              });
                                              break;
                                            case 'S':
                                              arrayhelper.form.values.days_preference.is_saturday_preferred =
                                                !arrayhelper.form.values
                                                  .days_preference
                                                  .is_saturday_preferred;
                                              this.setState({
                                                SelectedDay:
                                                  this.state.SelectedDay.map(
                                                    (item) =>
                                                      item.day === 'S'
                                                        ? {
                                                            ...item,
                                                            selected:
                                                              !item.selected,
                                                          }
                                                        : item,
                                                  ),
                                              });
                                              break;
                                            case 'D':
                                              arrayhelper.form.values.days_preference.is_sunday_preferred =
                                                !arrayhelper.form.values
                                                  .days_preference
                                                  .is_sunday_preferred;
                                              this.setState({
                                                SelectedDay:
                                                  this.state.SelectedDay.map(
                                                    (item) =>
                                                      item.day === 'D'
                                                        ? {
                                                            ...item,
                                                            selected:
                                                              !item.selected,
                                                          }
                                                        : item,
                                                  ),
                                              });
                                              break;
                                            default:
                                              break;
                                          }
                                        }}>
                                        <View
                                          style={[
                                            styles.day,
                                            {
                                              backgroundColor: backgroundColor,
                                            },
                                          ]}>
                                          <View
                                            style={{
                                              flexDirection: 'column',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              alignContent: 'center',
                                            }}>
                                            <Text
                                              style={{
                                                color: textColor,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                alignContent: 'center',
                                              }}>
                                              {item.availability_day}
                                            </Text>
                                            <Text
                                              style={{
                                                color: textColor,
                                                marginTop: 10,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                alignContent: 'center',
                                              }}>
                                              {item.day}
                                            </Text>
                                          </View>
                                        </View>
                                      </TouchableOpacity>
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
                      customTextStyle={{
                        fontFamily: 'RobotoBold',
                        fontSize: 17,
                      }}
                      customContainerStyles={{
                        marginBottom: widthPercentageToDP(30),
                      }}
                      onPress={handleSubmit}
                    />
                  </View>
                )}
              </Formik>
            </View>
          </SafeAreaView>
          {/* </ScrollView> */}
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
  day: {
    height: 70,
    width: 50,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textStyle: {
    color: '#000000',
  },
});
