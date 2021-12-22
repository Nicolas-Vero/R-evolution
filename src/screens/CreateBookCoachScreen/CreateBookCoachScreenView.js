import React from 'react';
import { View, TextInput, SafeAreaView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Formik } from 'formik';
import { CheckBox, Text } from 'react-native-elements';
import { ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
import { slots, formConfig } from './createBookCoachConfig';
import styles from './CreateBookCoachScreenStyle';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
export default class CreateBookCoachScreenView extends AbstractScreenView {
  render() {
    if (!this.component.state.isLoaded) {
      return <View></View>;
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
              initialValues={{
                type: 'Coaching',
                athlete_id: '',
                offer_id: '',
                slot: this.component.props.time,
                coach_notes: 'rendez-vous créer par le coach',
                coach_course_id: '',
                gender: 'male',
                date: this.component.props.date,
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                description: '',
              }}
              onSubmit={(values, { onLoginPress }) => onLoginPress(values)}>
              {({ handleChange, handleBlur, setFieldValue, values }) => (
                <View>
                  <View style={{ flexDirection: 'column', marginBottom: 15 }}>
                    <View style={{ marginVertical: 5 }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontFamily: 'Roboto',
                          textAlign: 'center',
                        }}>
                        {`Le ${moment(this.component.props.date).format(
                          'dddd D MMMM ',
                        )} à ${this.component.props.time}`}
                      </Text>
                    </View>
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
                          this.component.setState({ type: 'Actifs' });
                        this.component.setState({ isProspect: false });
                      }}
                    />
                    {this.component.state.type == 'Actifs' ? (
                      <View>
                        <SelectDropdown
                          buttonStyle={styles.dropdownButton}
                          buttonTextStyle={styles.dropdownButtonText}
                          rowTextStyle={styles.dropdownRowText}
                          dropdownStyle={styles.dropdownBg}
                          rowStyle={styles.dropdownRow}
                          data={this.component.state.atlhetesActifs}
                          defaultButtonText={'Choisir'}
                          onSelect={(selectedItem, index) => {
                            console.log(selectedItem);
                            values.athlete_id = selectedItem.id;
                            values.offer_id = selectedItem.offer_id;
                          }}
                          renderDropdownIcon={() => {
                            return (
                              <AntDesign name="down" size={18} color="black" />
                            );
                          }}
                          dropdownIconPosition={'right'}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.full_name;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item.full_name;
                          }}
                        />
                      </View>
                    ) : null}
                    <CheckBox
                      containerStyle={styles.checkBoxContainer}
                      title="Prospects"
                      checkedColor="#2CDEE4"
                      checkedIcon="dot-circle-o"
                      textStyle={styles.checkBoxText}
                      uncheckedIcon="dot-circle-o"
                      checked={values.type.toString() === 'Prospect'}
                      value={values.type}
                      onPress={() => {
                        setFieldValue('type', 'Prospect'),
                          this.component.setState({ type: 'Prospect' });
                        this.component.setState({ isProspect: true });
                      }}
                    />
                    {this.component.state.type == 'Prospect' ? (
                      <View>
                        <SelectDropdown
                          buttonStyle={styles.dropdownButton}
                          buttonTextStyle={styles.dropdownButtonText}
                          rowTextStyle={styles.dropdownRowText}
                          dropdownStyle={styles.dropdownBg}
                          rowStyle={styles.dropdownRow}
                          data={this.component.state.atlhetesProspects}
                          defaultButtonText={'Choisir un prospect existant'}
                          onSelect={(selectedItem, index) => {
                            values.athlete_id = selectedItem.id;
                          }}
                          renderDropdownIcon={() => {
                            return (
                              <AntDesign name="down" size={18} color="black" />
                            );
                          }}
                          dropdownIconPosition={'right'}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.full_name;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item.full_name;
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
                              this.controller.onInviteProspectPress(values);
                            }}
                          />
                        </ScrollView>
                      </View>
                    ) : (
                      <View></View>
                    )}
                  </View>
                  {this.component.state.type === 'Prospect' ? null : (
                    <View style={styles.buttonContainer}>
                      <Button
                        style={styles.button}
                        customTextStyle={styles.buttonText}
                        loading={false}
                        title="Valider"
                        onPress={() => {
                          this.controller.onCreateBookPress(values);
                        }}
                      />
                    </View>
                  )}
                </View>
              )}
            </Formik>
          </View>
        </LinearGradient>
      </View>
    );
  }
}
