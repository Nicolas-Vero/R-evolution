import React from 'react';
import { ScrollView, ActivityIndicator, Text, TextInput } from 'react-native';
import {
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
const { width } = Dimensions.get('window');
import HeaderLight from '../../components/HeaderLight';
import styles from './ProfileAthleteScreenStyle';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import { Avatar, CheckBox } from 'react-native-elements';
import { FieldArray, Field, Formik } from 'formik';
import { Button, DeleteButton, ModifyButton } from '../../components/Button';
import SelectDropdown from 'react-native-select-dropdown';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { isIphoneX } from 'react-native-iphone-x-helper';

export default class ProfileAthleteScreenView extends AbstractScreenView {
  renderHeader() {
    return (
      <View style={{ paddingTop: isIphoneX() ? 30 : 0 }}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <HeaderLight />
          </View>
          <View style={styles.headerMidle}>
            <Avatar
              size={105}
              rounded
              source={{
                uri: '../../../assets/images/avatar.png',
              }}
            />
          </View>
          <View style={styles.headerRight}></View>
        </View>
      </View>
    );
  }

  render() {
    if (!this.component.state.loaded) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ScrollView>
          <View style={styles.content}>
            <Formik
              initialValues={{
                gender: 'male',
                time_preference: { start_time: 5, end_time: 6 },
                profile_picture_url: '',
                ...this.component.state.User,
              }}
              onSubmit={(values) => onContinuePress(values)}>
              {({ handleChange, handleBlur, setFieldValue, values }) => (
                <View>
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      containerStyle={styles.checkBox}
                      checkedColor="#2CDEE4"
                      title="M"
                      textStyle={{ color: '#fff' }}
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="dot-circle-o"
                      checked={values.gender === 'male'}
                      value={values.gender}
                      onPress={() => setFieldValue('gender', 'male')}
                    />
                    <CheckBox
                      checkedColor="#2CDEE4"
                      containerStyle={styles.checkBox}
                      title="Mme"
                      textStyle={{ color: 'white' }}
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="dot-circle-o"
                      checked={values.gender === 'female'}
                      value={values.gender}
                      onPress={() => setFieldValue('gender', 'female')}
                    />
                  </View>
                  <Text style={styles.text}>Prénom</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Prénom"
                      placeholderTextColor="#979797"
                      style={styles.input}
                      onChangeText={handleChange('first_name')}
                      onBlur={handleBlur('first_name')}
                      value={values.first_name}
                      onSubmitEditing={() =>
                        this.firstnameInput && this.firstnameInput.focus()
                      }
                      returnKeyType="next"
                    />
                  </View>
                  <Text style={styles.text}>Nom</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      ref={(ref) => (this.firstnameInput = ref)}
                      placeholder="Prénom"
                      placeholderTextColor="#979797"
                      style={styles.input}
                      onChangeText={handleChange('last_name')}
                      onBlur={handleBlur('last_name')}
                      value={values.last_name}
                      onSubmitEditing={() =>
                        this.emailInput && this.emailInput.focus()
                      }
                      returnKeyType="next"
                    />
                  </View>
                  <Text style={styles.text}>Adresse e-mail</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      ref={(ref) => (this.emailInput = ref)}
                      placeholder="Email"
                      placeholderTextColor="#979797"
                      style={styles.input}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      onSubmitEditing={() =>
                        this.phoneInput && this.phoneInput.focus()
                      }
                      returnKeyType="next"
                    />
                  </View>
                  <Text style={styles.text}>Téléphone</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      ref={(ref) => (this.phoneInput = ref)}
                      placeholder="Téléphone"
                      placeholderTextColor="#979797"
                      style={styles.input}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                      returnKeyType="done"
                    />
                  </View>
                  <View style={styles.changePasswordContainer}>
                    <DeleteButton
                      customContainerStyles={styles.changePasswordButton}
                      customTextStyle={styles.changePasswordText}
                      title="Modifier mon mot de passe"
                    />
                  </View>

                  <Text style={styles.text}>
                    Des probèmes de santé à signaler ?
                  </Text>
                  <View style={styles.inputContainer}>
                    <FieldArray
                      render={(arrayhelper) => (
                        <SelectDropdown
                          buttonStyle={styles.dropdownButton}
                          buttonTextStyle={styles.dropdownButtonText}
                          rowTextStyle={styles.dropdownRowText}
                          dropdownStyle={styles.dropdownBg}
                          rowStyle={styles.dropdownRow}
                          data={['OUI', 'NON']}
                          defaultButtonText={'Choisir'}
                          onSelect={(selectedItem) => {
                            let boolValue = '';
                            if (selectedItem == 'OUI') {
                              boolValue = true;
                            } else {
                              boolValue = false;
                            }
                            arrayhelper.values = boolValue;
                          }}
                          renderDropdownIcon={() => (
                            <AntDesign name="down" size={18} color="black" />
                          )}
                          dropdownIconPosition={'right'}
                          buttonTextAfterSelection={(selectedItem) => {
                            return selectedItem;
                          }}
                          rowTextForSelection={(item) => {
                            return item;
                          }}
                        />
                      )}
                    />
                  </View>
                  <Text style={styles.text}>Informations complémentaires</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      multiline
                      onChangeText={(text) =>
                        (arrayhelper.form.values.information = text)
                      }
                      value={values.health_problem_description}
                      ref={(ref) => (this.descriptionInput = ref)}
                      blurOnSubmit={false}
                      returnKeyType="done"
                      placeholder="Description"
                      placeholderTextColor="#979797"
                      style={styles.textArea}
                      onBlur={handleBlur('content')}
                    />
                  </View>
                  <Text style={styles.text}>Où souhaites-tu t’entraîner ?</Text>
                  <View style={styles.inputContainer}>
                    <SelectDropdown
                      buttonStyle={styles.dropdownButton}
                      buttonTextStyle={styles.dropdownButtonText}
                      rowTextStyle={styles.dropdownRowText}
                      dropdownStyle={styles.dropdownBg}
                      rowStyle={styles.dropdownRow}
                      data={this.component.state.Gymdata}
                      defaultButtonText={'Recherche le nom de ta salle'}
                      onSelect={(selectedItem) => {
                        if (arrayhelper.form.values.gymPlace.length > 1) {
                          arrayhelper.push(selectedItem);
                          arrayhelper.pop();
                        } else {
                        }
                        arrayhelper.push(selectedItem);
                      }}
                      renderDropdownIcon={() => (
                        <AntDesign name="down" size={18} color="black" />
                      )}
                      dropdownIconPosition={'right'}
                      buttonTextAfterSelection={(selectedItem) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item) => {
                        return item.name;
                      }}
                    />
                  </View>
                  <Text style={styles.text}>A quel moment de la journée ?</Text>
                  <FieldArray
                    render={(arrayhelper) => (
                      console.log(arrayhelper.form.values),
                      (
                        <MultiSlider
                          values={[
                            this.component.state.multi[0],
                            this.component.state.multi[1],
                          ]}
                          sliderLength={widthPercentageToDP(92)}
                          onValuesChange={(values) => {
                            this.component.setState({ multi: values });
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
                          trackStyle={styles.sliderTrack}
                          markerStyle={styles.sliderMarker}
                          selectedStyle={styles.sliderSelected}
                        />
                      )
                    )}
                  />
                  <Text style={styles.text}>Quel(s) jour(s) ?</Text>
                  <FieldArray
                    render={(arrayhelper) => (
                      <FlatList
                        horizontal={true}
                        data={this.component.state.SelectedDay}
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
                                      !arrayhelper.form.values.days_preference
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
                                      !arrayhelper.form.values.days_preference
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
                                      !arrayhelper.form.values.days_preference
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
                                      !arrayhelper.form.values.days_preference
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
                                      !arrayhelper.form.values.days_preference
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
                                      !arrayhelper.form.values.days_preference
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
                                      !arrayhelper.form.values.days_preference
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
                                  styles.dayContainer,
                                  { backgroundColor: backgroundColor },
                                  // { borderWidth: borderWidth },
                                ]}>
                                <View style={styles.dayTextContainer}>
                                  <Text
                                    style={[
                                      styles.dayTextNum,
                                      {
                                        color: textColor,
                                      },
                                    ]}>
                                    {item?.day}
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
                  <View style={styles.validateButton}>
                    <Button
                      loading={false}
                      title="Valider les changements"
                      customTextStyle={styles.validateButtonText}
                      onPress={(values) => {
                        console.log(values);
                      }}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
          <KeyboardSpacer />
        </ScrollView>
      </View>
    );
  }
}
