import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Image,
} from 'react-native';
const { width } = Dimensions.get('window');
import { Field, FieldArray } from 'formik';
import Slider from 'react-native-slider';
import { Icon } from 'react-native-elements';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { loadFonts } from '../../configs/design/font';
import { FlatList } from 'react-native-gesture-handler';
import { forEach } from 'lodash';
export const ElementSlider2 = React.forwardRef(
  (
    { name, placeholder, values, secureTextEntry, keyboardType, validate },
    ref,
  ) => {
    useEffect(() => {
      loadFonts();
    }, []);
    const [multi, setMultivalues] = useState([6, 17]);
    const [SelectedDay, setSelectedDay] = useState([
      { day: 'L', selected: 0 },
      { day: 'M', selected: 0 },
      { day: 'ME', selected: 0 },
      { day: 'J', selected: 0 },
      { day: 'V', selected: 0 },
      { day: 'S', selected: 0 },
      { day: 'D', selected: 0 },
    ]);
    // let DayPreference = {
    //   is_monday_preferred: false,
    //   is_tuesday_preferred: false,
    //   is_wednesday_preferred: false,
    //   is_thursday_preferred: false,
    //   is_friday_preferred: false,
    //   is_saturday_preferred: false,
    //   is_sunday_preferred: false,
    // };
    return (
      <Field name={name} id={name} validate={validate}>
        {({
          field,
          meta,
          form: { touched, errors, isSubmitting, setFieldTouched },
        }) => {
          const [selectedId, setSelectedId] = useState(null);
          const fieldError = errors[field.name];
          const formatedFieldError =
            Object.prototype.toString.call(fieldError) === '[object Array]'
              ? fieldError.join(' & ')
              : fieldError;
          return (
            <View>
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={require('../../../assets/images/GroupA_6.png')}
                  style={{ width: widthPercentageToDP(80) }}
                />
              </View>
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
                  À QUELLE MOMMENT DE LA JOURNÉE?
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
                    {multi[0]}H
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
                    {multi[1]}H
                  </Text>
                </View>
              </View>
              <View style={{ alignItems: 'center', marginTop: 110 }}>
                <FieldArray
                  name={name}
                  render={(arrayhelper) => (
                    <MultiSlider
                      values={[multi[0], multi[1]]}
                      sliderLength={wp(90)}
                      onValuesChange={(values) => {
                        setMultivalues(values);
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
                      selectedStyle={{ backgroundColor: '#2CDEE4' }}
                      name={name}
                    />
                  )}
                />
                <View
                  style={{
                    marginVertical: wp(10),
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: hp(5),
                    width: wp(40),
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
              name={name}
              render={(arrayhelper) => (
              <FlatList
                style={{ width: wp(100) }}
                horizontal={true}
                data={SelectedDay}
                extraData={SelectedDay}
                renderItem={({ item }) => {
                  const borderColor =
                    item.selected == 1 ? 'transparent' : 'white';
                  const borderWidth = item.selected == 1 ? 1 : 1;
                  const color = item.selected == 1 ? 'black' : 'white';
                  const backgroundColor =
                    item.selected == 1 ? '#2CDEE4' : '#1E2026';
                  const textColor = item.selected == 1 ? 'black' : 'white';
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        switch (item.day) {
                          case 'L':
                            arrayhelper.form.values.days_preference.is_monday_preferred = !arrayhelper.form.values.days_preference.is_monday_preferred   
                            setSelectedDay(
                              SelectedDay.map((item) =>
                                item.day === 'L'
                                  ? { ...item, selected: !item.selected }
                                  : item,
                              ),
                            );
                            break;
                          case 'M':
                            arrayhelper.form.values.days_preference.is_tuesday_preferred =
                              !arrayhelper.form.values.days_preference.is_tuesday_preferred;
                            setSelectedDay(
                              SelectedDay.map((item) =>
                                item.day === 'M'
                                  ? { ...item, selected: !item.selected }
                                  : item,
                              ),
                            );
                            break;
                          case 'ME':
                            arrayhelper.form.values.days_preference.is_wednesday_preferred =
                              !arrayhelper.form.values.days_preference.is_wednesday_preferred;
                            setSelectedDay(
                              SelectedDay.map((item) =>
                                item.day === 'ME'
                                  ? { ...item, selected: !item.selected }
                                  : item,
                              ),
                            );
                            break;
                          case 'J':
                            arrayhelper.form.values.days_preference.is_thursday_preferred =
                              !arrayhelper.form.values.days_preference.is_thursday_preferred;
                            setSelectedDay(
                              SelectedDay.map((item) =>
                                item.day === 'J'
                                  ? { ...item, selected: !item.selected }
                                  : item,
                              ),
                            );
                            break;
                          case 'V':
                            arrayhelper.form.values.days_preference.is_friday_preferred =
                              !arrayhelper.form.values.days_preference.is_friday_preferred;
                            setSelectedDay(
                              SelectedDay.map((item) =>
                                item.day === 'V'
                                  ? { ...item, selected: !item.selected }
                                  : item,
                              ),
                            );
                            break;
                          case 'S':
                            arrayhelper.form.values.days_preference.is_saturday_preferred =
                              !arrayhelper.form.values.days_preference.is_saturday_preferred;
                            setSelectedDay(
                              SelectedDay.map((item) =>
                                item.day === 'S'
                                  ? { ...item, selected: !item.selected }
                                  : item,
                              ),
                            );
                            break;
                          case 'D':
                            arrayhelper.form.values.days_preference.is_sunday_preferred =
                              !arrayhelper.form.values.days_preference.is_sunday_preferred;
                            setSelectedDay(
                              SelectedDay.map((item) =>
                                item.day === 'D'
                                  ? { ...item, selected: !item.selected }
                                  : item,
                              ),
                            );
                            break;
                          default:
                            break;
                        }
                      }}>
                      <View
                        style={[
                          styles.day,
                          { backgroundColor: backgroundColor },
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
              )}/>
            </View>
          );
        }}
      </Field>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 48,
    backgroundColor: '#2CDEE4',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
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
