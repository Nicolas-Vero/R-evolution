import React from 'react';
import { View, TextInput, SafeAreaView, Keyboard } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Formik } from 'formik';
import { CheckBox, Text } from 'react-native-elements';
import { ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
import styles from './CreateBookCoachScreenStyle';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import { get_athlete_active_courses } from '../../api/Coach';
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
          style={{ flex: 1 }}>
          <SafeAreaView style={styles.safeArea} />
          <Header title="AJOUTER UN RDV" />
          <View style={{ marginVertical: 5 }}>
            <Text
              style={{
                color: '#2CDEE4',
                fontFamily: 'Roboto',
                textAlign: 'center',
              }}>
              {`Le ${moment(this.component.props.date).format(
                'dddd D MMMM ',
              )} ${this.component.props.time}`}
            </Text>
          </View>
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
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  marginHorizontal: 16,
                }}>
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
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
                        defaultButtonText={'Athlète'}
                        onSelect={async (selectedItem, index) => {
                          const course = await get_athlete_active_courses(
                            selectedItem.id,
                          );
                          values.athlete_id = selectedItem.id;
                          this.component.setState({
                            athlete_course: course.data,
                          });
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
                      {this.component.state.athlete_course ? (
                        <SelectDropdown
                          buttonStyle={styles.dropdownButton}
                          buttonTextStyle={styles.dropdownButtonText}
                          rowTextStyle={styles.dropdownRowText}
                          dropdownStyle={styles.dropdownBg}
                          rowStyle={styles.dropdownRow}
                          data={this.component.state.athlete_course}
                          defaultButtonText={'offre'}
                          onSelect={(selectedItem, index) => {
                            values.offer_id = selectedItem.id;
                          }}
                          renderDropdownIcon={() => {
                            return (
                              <AntDesign name="down" size={18} color="black" />
                            );
                          }}
                          dropdownIconPosition={'right'}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.offer.title;
                          }}
                          rowTextForSelection={(item, index) => {
                            return `${item.offer.title} session(s) prise(s): ${item.booked_session}/${item.total_sessions}`;
                          }}
                        />
                      ) : null}
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
                          values.email = selectedItem.email;
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
                              onPress={() => setFieldValue('gender', 'male')}
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
                              onPress={() => setFieldValue('gender', 'female')}
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
                                this.firstName && this.firstName.focus()
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
                              ref={(ref) => (this.firstName = ref)}
                              style={styles.input}
                              onChangeText={handleChange('first_name')}
                              onBlur={handleBlur('first_name')}
                              value={values.first_name}
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
                              placeholderTextColor="#979797"
                              multiline={true}
                              ref={(ref) => (this.descriptionInput = ref)}
                              style={styles.textArea}
                              onChangeText={handleChange('description')}
                              onBlur={handleBlur('description')}
                              value={values.description}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View></View>
                  )}
                  <CheckBox
                    containerStyle={styles.checkBoxContainer}
                    title="Autre"
                    checkedColor="#2CDEE4"
                    checkedIcon="dot-circle-o"
                    textStyle={styles.checkBoxText}
                    uncheckedIcon="dot-circle-o"
                    checked={values.type.toString() === 'Autre'}
                    value={values.type}
                    onPress={() => {
                      setFieldValue('type', 'Autre'),
                        this.component.setState({ type: 'Autre' });
                      this.component.setState({ isOther: true });
                    }}
                  />
                  {this.component.state.type === 'Autre' ? (
                    <View>
                      <View style={styles.inputContainer}>
                        <TextInput
                          name="title"
                          placeholder="Titre"
                          placeholderTextColor="#979797"
                          ref={(ref) => (this.title = ref)}
                          style={styles.input}
                          onChangeText={this.controller.onChangeTitle}
                          onBlur={handleBlur('title')}
                          value={this.component.state.title}
                          onSubmitEditing={() =>
                            this.otherDescriptionInput &&
                            this.otherDescriptionInput.focus()
                          }
                          blurOnSubmit={false}
                          returnKeyType="next"
                        />
                      </View>

                      <View style={styles.inputContainer}>
                        <TextInput
                          name="otherDescription"
                          placeholder="Description"
                          placeholderTextColor="#979797"
                          multiline={true}
                          ref={(ref) => (this.otherDescriptionInput = ref)}
                          style={styles.textArea}
                          onChangeText={this.controller.onChangeDescription}
                          onBlur={handleBlur('otherDescription')}
                          onSubmitEditing={() => Keyboard && Keyboard.dismiss()}
                          value={this.component.state.description}
                        />
                      </View>
                    </View>
                  ) : null}
                </View>

                <View
                  style={{
                    justifyContent: 'flex-end',
                    marginBottom: 50,
                    alignItems: 'center',
                  }}>
                  <Button
                    style={styles.buttonContainer}
                    customTextStyle={styles.buttonText}
                    loading={false}
                    title="Valider"
                    onPress={() => {
                      this.component.state.type === 'Autre'
                        ? this.controller.onCreateOtherPress()
                        : this.component.state.type === 'Prospect'
                          ? this.controller.onInviteProspectPress(values)
                          : this.controller.onCreateBookPress(values);
                    }}
                  />
                </View>

              </ScrollView>
            )}
          </Formik>
        </LinearGradient>
      </View>
    );
  }
}
