import React from 'react';
import { View, TextInput, SafeAreaView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
//import { auth } from '../../api/Register';
import { Formik } from 'formik';
import { CheckBox, Text } from 'react-native-elements';
import { ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { isLoaded } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE } from '../../configs/Constants';
import { loadFonts } from '../../configs/design/font';
import { get_availabilities } from '../../api/Availabilities';
import {
  coach_booking,
  get_coach_athlete,
  invite_prospect,
} from '../../api/Coach';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
import styles from './createBookCoachStyle';

import { slots, formConfig } from './createBookCoachConfig';
export default class createBookCoachScreen extends React.Component {
  state = {
    type: 'Coaching',
    coach: {},
    isLoaded: false,
    atlhetesActifs: [],
    atlhetesProspects: [],
    atlhetesInactifs: [],
    slots: [],
    availabilities: [],
    isProspect: false,
  };
  async componentDidMount() {
    const user = await AsyncStorage.getItem(STORAGE.USER);

    this.setState({ coach: JSON.parse(user) });
    loadFonts;
    get_availabilities().then((res) => {
      let arrayOfAvailabilities = [];
      res.data.map((item) => {
        for (const property in item) {
          if (item[property] == true && property.match(/slot/g)) {
            arrayOfAvailabilities.push({
              [property]: item[property],
              date: item.date,
              slot: parseInt(property.slice(5)),
            });
          }
        }
      });
      this.setState({ availabilities: arrayOfAvailabilities });
    });

    get_coach_athlete()
      .then((res) => {
        this.filterDAta(res.data.athletes);
      })
      .then(() => {
        this.setState({ isLoaded: true });
      });
  }

  filterDAta(data) {
    const actifs = data
      .filter((user) => user.status === 'active')
      .map((user) => `${user.first_name} ${user.last_name}`);
    const inactifs = data
      .filter((user) => user.status === 'inactive')
      .map((user) => `${user.first_name} ${user.last_name}`);
    const prospects = data
      .filter((user) => user.status === 'prospect')
      .map((user) => `${user.first_name} ${user.last_name}`);

    this.setState({
      atlhetesActifs: actifs,
      atlhetesInactifs: inactifs,
      atlhetesProspects: prospects,
    });
  }

  async onLoginPress(values) {
    console.log(values);
  }

  getErrorMessage() {
    if (this.state.errorMessage !== '')
      return (
        <ResponsiveText style={{ alignSelf: 'center', fontSize: '3.5%' }}>
          {this.state.errorMessage}
        </ResponsiveText>
      );
    return (
      <ResponsiveText
        style={{
          alignSelf: 'center',
          fontSize: '3.5%',
          opacity: 0,
        }}>
        Hidden Text
      </ResponsiveText>
    );
  }

  render() {
    if (!isLoaded) {
      return (
        <View>
          <ActivityIndicator size="large" color="#696969" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['black', '#2D333C']}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 1,
            y: 1,
          }}
          style={styles.background}>
          <SafeAreaView style={styles.safeArea} />
          <Header title="AJOUTER UN RDV" />
          <View style={styles.content}>
            <Formik
              initialValues={formConfig}
              onSubmit={(values, { onLoginPress }) => onLoginPress(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
              }) => (
                <View>
                  <View style={{ flexDirection: 'column', marginBottom: 15 }}>
                    <CheckBox
                      containerStyle={styles.checkBoxContainer}
                      title="Mes athlètes actifs"
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="dot-circle-o"
                      checkedColor="#2CDEE4"
                      textStyle={styles.checkBoxText}
                      checked={values.type === 'Actifs'}
                      value={values.type}
                      onPress={() => {
                        setFieldValue('type', 'Actifs'),
                          this.setState({ type: 'Actifs' });
                        this.setState({ isProspect: false });
                      }}
                    />
                    {this.state.type == 'Actifs' ? (
                      <View>
                        <SelectDropdown
                          buttonStyle={styles.dropdownButton}
                          buttonTextStyle={styles.dropdownButtonText}
                          rowTextStyle={styles.dropdownRowText}
                          dropdownStyle={styles.dropdownBg}
                          rowStyle={styles.dropdownRow}
                          data={[this.state.atlhetesActifs]}
                          defaultButtonText={'Choisir'}
                          onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                          }}
                          renderDropdownIcon={() => {
                            return (
                              <AntDesign name="down" size={18} color="black" />
                            );
                          }}
                          dropdownIconPosition={'right'}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item;
                          }}
                        />
                      </View>
                    ) : null}
                    <CheckBox
                      containerStyle={styles.checkBoxContainer}
                      title="Mes athlètes inactifs"
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="dot-circle-o"
                      checkedColor="#2CDEE4"
                      textStyle={styles.checkBoxText}
                      checked={values.type.toString() === 'Inactifs'}
                      value={values.type}
                      onPress={() => {
                        setFieldValue('type', 'Inactifs'),
                          this.setState({ type: 'Inactifs' });
                        this.setState({ isProspect: false });
                      }}
                    />
                    {this.state.type == 'Inactifs' ? (
                      <View>
                        <SelectDropdown
                          buttonStyle={styles.dropdownButton}
                          buttonTextStyle={styles.dropdownButtonText}
                          rowTextStyle={styles.dropdownRowText}
                          dropdownStyle={styles.dropdownBg}
                          rowStyle={styles.dropdownRow}
                          data={this.state.atlhetesInactifs}
                          defaultButtonText={'Choisir'}
                          onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                          }}
                          renderDropdownIcon={() => {
                            return (
                              <AntDesign name="down" size={18} color="black" />
                            );
                          }}
                          dropdownIconPosition={'right'}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item;
                          }}
                        />
                      </View>
                    ) : null}

                    <CheckBox
                      containerStyle={styles.checkBoxContainer}
                      title="Prospect"
                      checkedColor="#2CDEE4"
                      checkedIcon="dot-circle-o"
                      textStyle={styles.checkBoxText}
                      uncheckedIcon="dot-circle-o"
                      checked={values.type.toString() === 'Prospect'}
                      value={values.type}
                      onPress={() => {
                        setFieldValue('type', 'Prospect'),
                          this.setState({ type: 'Prospect' });
                        this.setState({ isProspect: true });
                      }}
                    />
                    {this.state.type == 'Prospect' ? (
                      <View>
                        <SelectDropdown
                          buttonStyle={styles.dropdownButton}
                          buttonTextStyle={styles.dropdownButtonText}
                          rowTextStyle={styles.dropdownRowText}
                          dropdownStyle={styles.dropdownBg}
                          rowStyle={styles.dropdownRow}
                          data={this.state.atlhetesProspects}
                          defaultButtonText={'Choisir un prospect existant'}
                          onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                          }}
                          renderDropdownIcon={() => {
                            return (
                              <AntDesign name="down" size={18} color="black" />
                            );
                          }}
                          dropdownIconPosition={'right'}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item;
                          }}
                        />
                        <ScrollView style={styles.scrollView}>
                          <View>
                            <Text style={styles.addProspectText}>
                              Ou ajouter un Prospect
                            </Text>
                            <View>
                              <View style={styles.addProspectCheckBoxContainer}>
                                <CheckBox
                                  containerStyle={styles.checkBoxContainer}
                                  title="M"
                                  checkedColor="#2CDEE4"
                                  checkedIcon="dot-circle-o"
                                  textStyle={styles.checkBoxText}
                                  uncheckedIcon="dot-circle-o"
                                  checked={values.gender.toString() === 'male'}
                                  value={values.gender}
                                  onPress={() =>
                                    setFieldValue('gender', 'male')
                                  }
                                />
                                <CheckBox
                                  containerStyle={styles.checkBoxContainer}
                                  title="Mme"
                                  checkedColor="#2CDEE4"
                                  checkedIcon="dot-circle-o"
                                  textStyle={styles.checkBoxText}
                                  uncheckedIcon="dot-circle-o"
                                  checked={values.gender === 'female'}
                                  value={values.gender}
                                  onPress={() =>
                                    setFieldValue('gender', 'female')
                                  }
                                />
                              </View>
                              <View style={styles.inputContainer}>
                                <TextInput
                                  name="first_name"
                                  placeholder="Prénom"
                                  placeholderTextColor="#979797"
                                  style={styles.input}
                                  onChangeText={handleChange('last_name')}
                                  onBlur={handleBlur('last_name')}
                                  value={values.last_name}
                                  onSubmitEditing={() =>
                                    this.lastNameInput &&
                                    this.lastNameInput.focus()
                                  }
                                  blurOnSubmit={false}
                                  returnKeyType="next"
                                />
                              </View>
                              <View style={styles.inputContainer}>
                                <TextInput
                                  name="last_name"
                                  placeholder="Nom"
                                  placeholderTextColor="#979797"
                                  ref={(ref) => (this.lastNameInput = ref)}
                                  style={styles.input}
                                  onChangeText={handleChange('first_name')}
                                  onBlur={handleBlur('first_name')}
                                  value={values.last_name}
                                  onSubmitEditing={() =>
                                    this.emailInput && this.emailInput.focus()
                                  }
                                  blurOnSubmit={false}
                                  returnKeyType="next"
                                />
                              </View>

                              <View style={styles.inputContainer}>
                                <TextInput
                                  name="email"
                                  placeholder="Email"
                                  placeholderTextColor="#979797"
                                  ref={(ref) => (this.emailInput = ref)}
                                  style={styles.input}
                                  onChangeText={handleChange('email')}
                                  onBlur={handleBlur('email')}
                                  value={values.email}
                                  onSubmitEditing={() =>
                                    this.phoneInput && this.phoneInput.focus()
                                  }
                                  blurOnSubmit={false}
                                  autoCapitalize="none"
                                  returnKeyType="next"
                                />
                              </View>
                              <View style={styles.inputContainer}>
                                <TextInput
                                  name="phone"
                                  placeholder="Téléphone"
                                  placeholderTextColor="#979797"
                                  ref={(ref) => (this.phoneInput = ref)}
                                  style={styles.input}
                                  onChangeText={handleChange('phone')}
                                  onBlur={handleBlur('phone')}
                                  value={values.phone}
                                  onSubmitEditing={() =>
                                    this.descriptionInput &&
                                    this.descriptionInput.focus()
                                  }
                                  blurOnSubmit={false}
                                  returnKeyType="next"
                                />
                              </View>
                              <View style={styles.inputContainer}>
                                <View>
                                  <SelectDropdown
                                    buttonStyle={styles.dropdownButton}
                                    buttonTextStyle={styles.dropdownButtonText}
                                    rowTextStyle={styles.dropdownRowText}
                                    dropdownStyle={styles.dropdownBg}
                                    rowStyle={styles.dropdownRow}
                                    data={slots}
                                    defaultButtonText={'choisir un créneau'}
                                    onSelect={(selectedItem, index) => {
                                      console.log(selectedItem, index);
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
                                    buttonTextAfterSelection={(
                                      selectedItem,
                                      index,
                                    ) => {
                                      return (
                                        moment(selectedItem.date).format(
                                          'dddd D MMMM ',
                                        ) +
                                        '   ' +
                                        slots[selectedItem.slot]
                                      );
                                    }}
                                    rowTextForSelection={(item, index) => {
                                      values.slot = item.slot;
                                      values.date = item.date;

                                      return (
                                        moment(item.date).format(
                                          'dddd D MMMM ',
                                        ) +
                                        '   ' +
                                        slots[item.slot]
                                      );
                                    }}
                                  />
                                </View>
                              </View>
                              <View style={styles.inputContainer}>
                                <TextInput
                                  placeholder="Description"
                                  multiline={true}
                                  ref={(ref) => (this.descriptionInput = ref)}
                                  style={{
                                    backgroundColor: '#FFFFFF',
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    paddingLeft: 15,
                                    paddingRight: 15,
                                    height: 100,
                                  }}
                                  onChangeText={handleChange('Description')}
                                  onBlur={handleBlur('Description')}
                                  value={values.description}
                                />
                              </View>
                            </View>
                          </View>
                          <Button
                            style={{
                              paddingTop: 10,
                              paddingBottom: 10,
                              paddingLeft: 15,
                              paddingRight: 15,
                            }}
                            loading={false}
                            customTextStyle={{
                              color: 'black',
                              fontFamily: 'RobotoBold',
                              fontWeight: 'bold',
                              fontSize: 15,
                            }}
                            title="Valider"
                            onPress={() => {
                              console.log(values);
                              invite_prospect({
                                email: values.email,
                                first_name: values.first_name,
                                last_name: values.last_name,
                                gender: values.gender,
                                phone: values.phone,
                                slot: values.slot,
                              });
                            }}
                          />
                        </ScrollView>
                      </View>
                    ) : (
                      <View>
                        <View>
                          <SelectDropdown
                            buttonStyle={styles.dropdownButton}
                            buttonTextStyle={styles.dropdownButtonText}
                            rowTextStyle={styles.dropdownRowText}
                            dropdownStyle={styles.dropdownBg}
                            rowStyle={styles.dropdownRow}
                            data={slots}
                            defaultButtonText={'choisir un créneau'}
                            onSelect={(selectedItem, index) => {
                              console.log(selectedItem, index);
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
                            buttonTextAfterSelection={(selectedItem, index) => {
                              // text represented after item is selected
                              // if data array is an array of objects then return selectedItem.property to render after item is selected
                              return (
                                moment(selectedItem.date).format(
                                  'dddd D MMMM ',
                                ) +
                                '   ' +
                                slots[index]
                              );
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
                            rowTextForSelection={(item, index) => {
                              console.log(item);
                              values.date = item.date;
                              values.slot = item.slot;
                              return (
                                moment(item.date).format('dddd D MMMM ') +
                                '   ' +
                                slots[item.slot]
                              );
                            }}
                          />
                        </View>
                      </View>
                    )}
                  </View>

                  <View style={styles.buttonContainer}>
                    <Button
                      style={styles.button}
                      customTextStyle={styles.buttonText}
                      loading={false}
                      title="Valider"
                      onPress={coach_booking({
                        slot: values.slot,
                        coach_id: this.state.coach.id,
                        date: values.date,
                        coach_course_id: 0,
                        currentSlot: values.slot,
                      }).then(() => {
                        navigate.goBack();
                      })}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </LinearGradient>
      </View>
    );
  }
}
