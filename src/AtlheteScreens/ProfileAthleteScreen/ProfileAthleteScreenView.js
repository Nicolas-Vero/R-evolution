import React from 'react';
import { ScrollView, ActivityIndicator, Text, TextInput } from 'react-native';
import {
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import HeaderLight from '../../components/HeaderLight';
import styles from './ProfileAthleteScreenStyle';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import { Avatar, CheckBox } from 'react-native-elements';
import { FieldArray, Formik } from 'formik';
import { Button, DeleteButton } from '../../components/Button';
import SelectDropdown from 'react-native-select-dropdown';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';


export default class ProfileAthleteScreenView extends AbstractScreenView {
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
        <ScrollView>
          <Formik
            initialValues={{
              gender: 'male',
              first_name: this.component.state.User.first_name,
              last_name: this.component.state.User.last_name,
              email: this.component.state.User.email,
              phone: this.component.state.User.phone,
              health_issues: this.component.state.User.health_issues,
              health_problem_description:
                this.component.state.User.health_problem_description,
              days_preference: {
                is_monday_preferred:
                  this.component.state.User.is_monday_preferred,
                is_tuesday_preferred:
                  this.component.state.User.is_tuesday_preferred,
                is_wednesday_preferred:
                  this.component.state.User.is_wednesday_preferred,
                is_thursday_preferred:
                  this.component.state.User.is_thursday_preferred,
                is_friday_preferred:
                  this.component.state.User.is_friday_preferred,
                is_saturday_preferred:
                  this.component.state.User.is_saturday_preferred,
                is_sunday_preferred:
                  this.component.state.User.is_sunday_preferred,
              },
              preferred_gym_id: this.component.state.User.preferred_gym_id,
              time_preference: {
                start_time: this.component.state.User.preferred_time_start,
                end_time: this.component.state.User.preferred_time_end,
              },
            }}
            onSubmit={(values) => onContinuePress(values)}>
            {({ handleChange, handleBlur, setFieldValue, values }) => (
              <View>
                <View style={{ paddingTop: 30 }}>
                  <View style={styles.header}>
                    <View style={styles.headerLeft}>
                      <HeaderLight />
                    </View>
                    <View style={styles.headerMidle}>
                      <FieldArray
                        render={(arrayhelper) => (
                          <TouchableOpacity onPress={this.controller.pickImage}>
                            {this.component.state.image.uri ? (
                              <Avatar
                                size={105}
                                rounded
                                source={{
                                  uri: this.component.state.image.uri,
                                }}
                              />
                            ) : this.component.state.User
                              .profile_picture_url ? (
                              <Avatar
                                size={105}
                                rounded
                                source={{
                                  uri: this.component.state.User
                                    .profile_picture_url,
                                }}
                              />
                            ) : (
                              <Image
                                style={styles.previewImage}
                                source={require('../../../assets/images/no_pp.jpg')}
                              />
                            )}
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                    <View style={styles.headerRight}></View>
                  </View>
                </View>
                <View style={styles.content}>
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
                    />
                  </View>
                  <Text style={styles.text}>Nom</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Nom"
                      placeholderTextColor="#979797"
                      style={styles.input}
                      onChangeText={handleChange('last_name')}
                      onBlur={handleBlur('last_name')}
                      value={values.last_name}
                    />
                  </View>
                  <Text style={styles.text}>Adresse e-mail</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor="#979797"
                      style={styles.input}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      autoCapitalize="none"
                    />
                  </View>
                  <Text style={styles.text}>Téléphone</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Téléphone"
                      placeholderTextColor="#979797"
                      style={styles.input}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
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
                          defaultButtonText={
                            this.component.state.User.health_issues
                              ? 'OUI'
                              : 'NON'
                          }
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
                      onChangeText={handleChange('health_problem_description')}
                      value={values.health_problem_description}
                      returnKeyType="done"
                      placeholder="Description"
                      placeholderTextColor="#979797"
                      style={styles.textArea}
                      onBlur={handleBlur('health_problem_description')}
                    />
                  </View>
                  <Text style={styles.text}>Où souhaites-tu t’entraîner ?</Text>
                  <View style={styles.inputContainer}>
                    <FieldArray
                      render={(arrayhelper) => (
                        <SelectDropdown
                          buttonStyle={styles.dropdownButton}
                          buttonTextStyle={styles.dropdownButtonText}
                          rowTextStyle={styles.dropdownRowText}
                          dropdownStyle={styles.dropdownBg}
                          rowStyle={styles.dropdownRow}
                          data={this.component.state.Gymdata}
                          defaultButtonText={this.component.state.gym}
                          onSelect={(selectedItem) => {
                            arrayhelper.form.values.preferred_gym_id =
                              selectedItem.id;
                          }}
                          renderDropdownIcon={() => (
                            <AntDesign name="down" size={18} color="black" />
                          )}
                          dropdownIconPosition={'right'}
                          buttonTextAfterSelection={(selectedItem) => {
                            return selectedItem.name;
                          }}
                          rowTextForSelection={(item) => {
                            return item.name;
                          }}
                        />
                      )}
                    />
                  </View>
                  <Text style={styles.text}>A quel moment de la journée ?</Text>
                  <View style={styles.center}>
                    <Text style={styles.text}>
                      ENTRE{' '}
                      <Text style={styles.subTitleColored}>
                        {this.component.state.multi[0]}H
                      </Text>{' '}
                      ET{' '}
                      <Text style={styles.subTitleColored}>
                        {this.component.state.multi[1]}H
                      </Text>
                    </Text>
                  </View>
                  <FieldArray
                    render={(arrayhelper) => (
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
                    )}
                  />
                  <Text style={styles.text}>Quel(s) jour(s) ?</Text>
                  <View style={{ alignItems: 'center' }}>
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
                                      this.component.setState({
                                        SelectedDay:
                                          this.component.state.SelectedDay.map(
                                            (item) =>
                                              item.day === 'L'
                                                ? {
                                                  ...item,
                                                  selected: !item.selected,
                                                }
                                                : item,
                                          ),
                                      });
                                      break;
                                    case 'M':
                                      arrayhelper.form.values.days_preference.is_tuesday_preferred =
                                        !arrayhelper.form.values
                                          .is_tuesday_preferred;
                                      this.component.setState({
                                        SelectedDay:
                                          this.component.state.SelectedDay.map(
                                            (item) =>
                                              item.day === 'M'
                                                ? {
                                                  ...item,
                                                  selected: !item.selected,
                                                }
                                                : item,
                                          ),
                                      });
                                      break;
                                    case 'ME':
                                      arrayhelper.form.values.days_preference.days_preference.is_wednesday_preferred =
                                        !arrayhelper.form.values
                                          .is_wednesday_preferred;
                                      this.component.setState({
                                        SelectedDay:
                                          this.component.state.SelectedDay.map(
                                            (item) =>
                                              item.day === 'ME'
                                                ? {
                                                  ...item,
                                                  selected: !item.selected,
                                                }
                                                : item,
                                          ),
                                      });
                                      break;
                                    case 'J':
                                      arrayhelper.form.values.days_preference.is_thursday_preferred =
                                        !arrayhelper.form.values
                                          .is_thursday_preferred;
                                      this.component.setState({
                                        SelectedDay:
                                          this.component.state.SelectedDay.map(
                                            (item) =>
                                              item.day === 'J'
                                                ? {
                                                  ...item,
                                                  selected: !item.selected,
                                                }
                                                : item,
                                          ),
                                      });
                                      break;
                                    case 'V':
                                      arrayhelper.form.values.days_preference.is_friday_preferred =
                                        !arrayhelper.form.values
                                          .is_friday_preferred;
                                      this.component.setState({
                                        SelectedDay:
                                          this.component.state.SelectedDay.map(
                                            (item) =>
                                              item.day === 'V'
                                                ? {
                                                  ...item,
                                                  selected: !item.selected,
                                                }
                                                : item,
                                          ),
                                      });
                                      break;
                                    case 'S':
                                      arrayhelper.form.values.days_preference.is_saturday_preferred =
                                        !arrayhelper.form.values
                                          .is_saturday_preferred;
                                      this.component.setState({
                                        SelectedDay:
                                          this.component.state.SelectedDay.map(
                                            (item) =>
                                              item.day === 'S'
                                                ? {
                                                  ...item,
                                                  selected: !item.selected,
                                                }
                                                : item,
                                          ),
                                      });
                                      break;
                                    case 'D':
                                      arrayhelper.form.values.days_preference.is_sunday_preferred =
                                        !arrayhelper.form.values
                                          .is_sunday_preferred;
                                      this.component.setState({
                                        SelectedDay:
                                          this.component.state.SelectedDay.map(
                                            (item) =>
                                              item.day === 'D'
                                                ? {
                                                  ...item,
                                                  selected: !item.selected,
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
                  </View>
                  <View style={styles.validateButton}>
                    <Button
                      loading={false}
                      title="Valider les changements"
                      customTextStyle={styles.validateButtonText}
                      onPress={() => {
                        this.controller.onSave(values);
                      }}
                    />
                  </View>
                </View>
              </View>
            )}
          </Formik>

        </ScrollView>
      </View>
    );
  }
}
