import React from 'react';
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { FieldArray, Formik } from 'formik';
import { AntDesign } from '@expo/vector-icons';
import { Avatar, CheckBox } from 'react-native-elements';
import { Button, DeleteButton } from '../../components/Button';
import HeaderLight from '../../components/HeaderLight';
import { LinearGradient } from 'expo-linear-gradient';
import { loadFonts } from '../../configs/design/font';
import { ScrollView } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import { get_gym } from '../../api/ReferenceData';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styles from './myInformationsAthleteStyle';

export default class myInformationsAthleteScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 'initial',
      stepperStep: 0,
      progress: 0,
      Coach: {},
      User: {},
      term: '',
      multi: [],
      Gymdata: [],
      loaded: false,
      SelectedDay: [
        { day: 'L', selected: 0 },
        { day: 'M', selected: 0 },
        { day: 'ME', selected: 0 },
        { day: 'J', selected: 0 },
        { day: 'V', selected: 0 },
        { day: 'S', selected: 0 },
        { day: 'D', selected: 0 },
      ],
      multi: [6, 17],
    };
  }

  async componentDidMount() {
    loadFonts();
    get_gym().then((res) => {
      this.setState({ Gymdata: res.data });
      this.setState({ loaded: true });
    });
  }

  render() {
    const arrayhelper = [];
    const data = ['OUI', 'NON'];
    if (!this.state.loaded) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
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
            style={styles.background}
          />
          <SafeAreaView>
            <ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  marginBottom: heightPercentageToDP(5),
                }}>
                <View style={{ flex: 1 }}>
                  <HeaderLight />
                </View>
                <View style={{ flex: 2 }}>
                  <Avatar
                    size={100}
                    rounded
                    source={{
                      uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
                    }}
                  />
                </View>
              </View>
              <Formik
                initialValues={{
                  gender: 'male',
                  first_name: this.state.User.first_name,
                  last_name: this.state.User.last_name,
                  email: this.state.User.email,
                  phone: this.state.User.phone,
                  goals: this.state.User.goals,
                  health_issues: this.state.User.health_issues,
                  health_problem_description:
                    this.state.User.health_problem_description,
                  gym_place: this.state.User.gym_place,
                  days_preference: this.state.User.days_preference,
                  time_preference: { start_time: 5, end_time: 6 },
                  profile_picture_url: '',
                }}
                onSubmit={(values) => onContinuePress(values)}>
                {({ handleChange, handleBlur, setFieldValue, values }) => (
                  <View>
                    <View style={styles.container2}>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginBottom: 5,
                          width: widthPercentageToDP(92),
                        }}>
                        <CheckBox
                          containerStyle={{
                            paddingLeft: 0,
                            marginLeft: 0,
                            backgroundColor: 'transparent',
                            borderWidth: 0,
                          }}
                          checkedColor="#2CDEE4"
                          title="M"
                          textStyle={{ color: 'white' }}
                          checkedIcon="dot-circle-o"
                          uncheckedIcon="dot-circle-o"
                          checked={values.gender.toString() === 'male'}
                          value={values.gender}
                          onPress={() => setFieldValue('gender', 'male')}
                        />
                        <CheckBox
                          checkedColor="#2CDEE4"
                          containerStyle={{
                            paddingLeft: 0,
                            marginLeft: 0,
                            backgroundColor: 'transparent',
                            borderWidth: 0,
                          }}
                          title="Mme"
                          textStyle={{ color: 'white' }}
                          checkedIcon="dot-circle-o"
                          uncheckedIcon="dot-circle-o"
                          checked={values.gender === 'female'}
                          value={values.gender}
                          onPress={() => setFieldValue('gender', 'female')}
                        />
                      </View>
                    </View>
                    <Text style={styles.text}>Prénom</Text>
                    <View style={styles.inputs}>
                      <TextInput
                        placeholder="Prénom"
                        style={styles.container}
                        onChangeText={handleChange('first_name')}
                        onBlur={handleBlur('first_name')}
                        value={values.first_name}
                      />
                    </View>
                    <Text style={styles.text}>Nom</Text>
                    <View style={styles.inputs}>
                      <TextInput
                        placeholder="Nom"
                        style={styles.container}
                        onChangeText={handleChange('last_name')}
                        onBlur={handleBlur('last_name')}
                        value={values.last_name}
                      />
                    </View>
                    <Text style={styles.text}>Adresse e-mail</Text>
                    <View style={styles.inputs}>
                      <TextInput
                        placeholder="Email"
                        style={styles.container}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                      />
                    </View>
                    <Text style={styles.text}>Téléphone</Text>
                    <View style={styles.inputs}>
                      <TextInput
                        placeholder="Téléphone"
                        style={styles.container}
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        value={values.phone}
                      />
                    </View>
                    <View style={{ alignItems: 'center', marginVertical: 15 }}>
                      <DeleteButton
                        customContainerStyles={{
                          borderColor: 'black',
                          backgroundColor: '#1E2026',
                          height: 50,
                          width: widthPercentageToDP(92),
                        }}
                        title="modifier mot de passe"
                      />
                    </View>
                    <Text style={styles.text}>
                      Des problèmes de santé à signaler ?
                    </Text>
                    <View style={styles.inputs}>
                      <FieldArray
                        render={(arrayhelper) => (
                          <SelectDropdown
                            buttonStyle={{
                              width: widthPercentageToDP(50),
                              borderRadius: 5,
                            }}
                            data={data}
                            defaultButtonText={'choisir'}
                            onSelect={(selectedItem) => {
                              let boolValue = '';
                              if (selectedItem == 'OUI') {
                                boolValue = true;
                              } else {
                                boolValue = false;
                              }
                              arrayhelper.values = boolValue;
                            }}
                            renderDropdownIcon={() => {
                              return (
                                <AntDesign
                                  name="down"
                                  size={24}
                                  color="black"
                                />
                              );
                            }}
                            dropdownIconPosition={'right'}
                            buttonTextAfterSelection={(selectedItem) => {
                              // text represented after item is selected
                              // if data array is an array of objects then return selectedItem.property to render after item is selected
                              return selectedItem;
                            }}
                            rowTextStyle={{
                              color: 'white',
                              fontSize: 15,
                              marginRight: 90,
                            }}
                            dropdownStyle={{
                              backgroundColor: '#282C3A',
                              borderRadius: 5,
                            }}
                            rowTextForSelection={(item) => {
                              // text represented for each item in dropdown
                              // if data array is an array of objects then return item.property to represent item in dropdown
                              return item;
                            }}
                          />
                        )}
                      />
                    </View>
                    <Text style={styles.text}>
                      Informations complémentaires
                    </Text>
                    <View style={styles.inputs}>
                      <TextInput
                        style={styles.field}
                        placeholder="Description"
                        onChangeText={(text) =>
                          (arrayhelper.form.values.information = text)
                        }
                        value={values.health_problem_description}
                      />
                      <View style={{ alignItems: 'center' }}>
                        <View style={{ alignItems: 'center' }}>
                          <View style={styles.container3}></View>
                        </View>
                      </View>
                      <View>
                        <Text style={styles.text}>
                          Dans quelle salle pratiques-tu ?
                        </Text>
                        <View style={{ alignItems: 'center' }}>
                          <SelectDropdown
                            buttonStyle={{
                              width: widthPercentageToDP(92),
                              borderRadius: 5,
                            }}
                            data={this.state.Gymdata}
                            defaultButtonText={'Recherche le nom de ta salle'}
                            onSelect={(selectedItem) => {
                              if (arrayhelper.form.values.gymPlace.length > 1) {
                                // console.log(
                                //   arrayhelper?.form?.values?.gymPlace?.length,
                                // );
                                arrayhelper.push(selectedItem);
                                arrayhelper.pop();
                              } else {
                              }
                              arrayhelper.push(selectedItem);
                              // console.log(arrayhelper?.form?.values?.gymPlace);
                            }}
                            renderDropdownIcon={() => {
                              return (
                                <AntDesign
                                  name="down"
                                  size={24}
                                  color="black"
                                />
                              );
                            }}
                            dropdownIconPosition={'right'}
                            buttonTextAfterSelection={(selectedItem) => {
                              // text represented after item is selected
                              // if data array is an array of objects then return selectedItem.property to render after item is selected
                              return selectedItem;
                            }}
                            rowTextStyle={{
                              color: 'white',
                              fontSize: 15,
                              marginRight: 90,
                            }}
                            dropdownStyle={{
                              backgroundColor: '#282C3A',
                              borderRadius: 5,
                            }}
                            rowTextForSelection={(item) => {
                              // text represented for each item in dropdown
                              // if data array is an array of objects then return item.property to represent item in dropdown
                              return item.name;
                            }}
                          />
                          <View style={styles.inputs}>
                            <Text style={styles.text}>
                              A quel moment de la journée ?
                            </Text>
                          </View>
                          <FieldArray
                            render={(arrayhelper) => (
                              console.log(arrayhelper.form.values),
                              (
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
                                  selectedStyle={{ backgroundColor: '#2CDEE4' }}
                                />
                              )
                            )}
                          />
                        </View>

                        <FieldArray
                          render={(arrayhelper) => (
                            <FlatList
                              style={{ width: widthPercentageToDP(100) }}
                              horizontal={true}
                              data={this.state.SelectedDay}
                              extraData={this.state}
                              renderItem={({ item }) => {
                                const backgroundColor =
                                  item.selected == 1 ? '#2CDEE4' : '#1E2026';
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
                                          setSelectedDay(
                                            SelectedDay.map((item) =>
                                              item.day === 'L'
                                                ? {
                                                    ...item,
                                                    selected: !item.selected,
                                                  }
                                                : item,
                                            ),
                                          );
                                          break;
                                        case 'M':
                                          arrayhelper.form.values.days_preference.is_tuesday_preferred =
                                            !arrayhelper.form.values
                                              .days_preference
                                              .is_tuesday_preferred;
                                          setSelectedDay(
                                            SelectedDay.map((item) =>
                                              item.day === 'M'
                                                ? {
                                                    ...item,
                                                    selected: !item.selected,
                                                  }
                                                : item,
                                            ),
                                          );
                                          break;
                                        case 'ME':
                                          arrayhelper.form.values.days_preference.is_wednesday_preferred =
                                            !arrayhelper.form.values
                                              .days_preference
                                              .is_wednesday_preferred;
                                          setSelectedDay(
                                            SelectedDay.map((item) =>
                                              item.day === 'ME'
                                                ? {
                                                    ...item,
                                                    selected: !item.selected,
                                                  }
                                                : item,
                                            ),
                                          );
                                          break;
                                        case 'J':
                                          arrayhelper.form.values.days_preference.is_thursday_preferred =
                                            !arrayhelper.form.values
                                              .days_preference
                                              .is_thursday_preferred;
                                          setSelectedDay(
                                            SelectedDay.map((item) =>
                                              item.day === 'J'
                                                ? {
                                                    ...item,
                                                    selected: !item.selected,
                                                  }
                                                : item,
                                            ),
                                          );
                                          break;
                                        case 'V':
                                          arrayhelper.form.values.days_preference.is_friday_preferred =
                                            !arrayhelper.form.values
                                              .days_preference
                                              .is_friday_preferred;
                                          setSelectedDay(
                                            SelectedDay.map((item) =>
                                              item.day === 'V'
                                                ? {
                                                    ...item,
                                                    selected: !item.selected,
                                                  }
                                                : item,
                                            ),
                                          );
                                          break;
                                        case 'S':
                                          arrayhelper.form.values.days_preference.is_saturday_preferred =
                                            !arrayhelper.form.values
                                              .days_preference
                                              .is_saturday_preferred;
                                          setSelectedDay(
                                            SelectedDay.map((item) =>
                                              item.day === 'S'
                                                ? {
                                                    ...item,
                                                    selected: !item.selected,
                                                  }
                                                : item,
                                            ),
                                          );
                                          break;
                                        case 'D':
                                          arrayhelper.form.values.days_preference.is_sunday_preferred =
                                            !arrayhelper.form.values
                                              .days_preference
                                              .is_sunday_preferred;
                                          setSelectedDay(
                                            SelectedDay.map((item) =>
                                              item.day === 'D'
                                                ? {
                                                    ...item,
                                                    selected: !item.selected,
                                                  }
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
                          )}
                        />

                        <View style={{ alignItems: 'center' }}>
                          <Button
                            loading={false}
                            title="Valider les changements"
                            customTextStyle={{
                              fontFamily: 'RobotoBold',
                              fontSize: 17,
                            }}
                            onPress={(values) => {
                              console.log(values);
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </Formik>
            </ScrollView>
          </SafeAreaView>
        </View>
      );
    }
  }
}
