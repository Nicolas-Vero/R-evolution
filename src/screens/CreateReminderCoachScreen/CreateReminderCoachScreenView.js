import React from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  Keyboard,
  ScrollView,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Formik } from 'formik';
import { Text } from 'react-native-elements';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
import { isLoaded } from 'expo-font';
import styles from './CreateReminderCoachScreenStyle';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';

export default class CreateReminderCoachScreenView extends AbstractScreenView {
  render() {
    const colors = ['#2CDEE4', '#FD7279', '#4FE470', '#979797', '#FED32C'];
    if (!isLoaded) {
      return (
        <View>
          <ActivityIndicator size="large" color="#696969" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Header title="RAPPELS" />
            <ScrollView
              style={styles.ScrollView}
              keyboardShouldPersistTaps="handled">
              <SafeAreaView onPress={Keyboard.dismiss} style={styles.safeArea}>
                <View style={styles.formContainer}>
                  <Formik
                    initialValues={{
                      date: '',
                      hour: '',
                      title: '',
                      content: '',
                      status: 'ACTIVE',
                      color: '#2CDEE4',
                    }}
                    onSubmit={(values) =>
                      this.controller.onAddReminderPress(values)
                    }>
                    {({ handleChange, handleBlur, values }) => (
                      <View>
                        <View>
                          <View style={styles.formRow}>
                            <View style={{ flex: 1.5 }}>
                              <Text style={styles.formRowText}>Date</Text>
                              <TextInput
                                placeholderTextColor="#979797"
                                placeholder="29/05/2021"
                                style={styles.inputTop}
                                onChangeText={handleChange('date')}
                                onBlur={handleBlur('date')}
                                value={values.date}
                                blurOnSubmit={false}
                                autoCapitalize="none"
                                onSubmitEditing={() =>
                                  this.hourInput && this.hourInput.focus()
                                }
                                returnKeyType="next"
                              />
                            </View>
                            <View style={{ flex: 1 }}>
                              <Text style={styles.formRowText}>Heure</Text>
                              <TextInput
                                ref={(ref) => (this.hourInput = ref)}
                                placeholderTextColor="#979797"
                                placeholder="12:00"
                                style={styles.inputTop}
                                onChangeText={handleChange('hour')}
                                onBlur={handleBlur('hour')}
                                value={values.hour}
                                blurOnSubmit={false}
                                autoCapitalize="none"
                                onSubmitEditing={() =>
                                  this.rappelInput && this.rappelInput.focus()
                                }
                                returnKeyType="next"
                              />
                            </View>
                            <View style={{ flex: 1 }}>
                              <Text style={styles.formRowTextColor}>Couleur</Text>
                              <SelectDropdown
                                buttonStyle={styles.dropdownButton}
                                dropdownStyle={styles.dropdownBg}
                                rowTextStyle={styles.dropdownRowText}
                                rowStyle={styles.dropdownRow}
                                data={colors}
                                defaultValueByIndex={0}
                                onSelect={(selectedItem, index) => {
                                  values.color = selectedItem;
                                }}
                                renderCustomizedButtonChild={(
                                  selectedItem,
                                  index,
                                ) => {
                                  return (
                                    <View
                                      style={{
                                        backgroundColor: selectedItem,
                                        width: 28,
                                        height: 28,
                                        borderRadius: 14,
                                      }}></View>
                                  );
                                }}
                                renderCustomizedRowChild={(item, index) => {
                                  return (
                                    <View
                                      style={{
                                        backgroundColor: item,
                                        width: 28,
                                        height: 28,
                                        borderRadius: 14,
                                        borderColor: '#50525B',
                                        borderWidth:
                                          values.color === item ? 3 : 0,
                                      }}></View>
                                  );
                                }}
                              />
                            </View>
                          </View>
                          <View>
                            <View style={styles.inputContainer}>
                              <TextInput
                                ref={(ref) => (this.rappelInput = ref)}
                                placeholderTextColor="#979797"
                                placeholder="Objet du rappel"
                                style={styles.input}
                                onChangeText={handleChange('title')}
                                onBlur={handleBlur('title')}
                                value={values.title}
                                blurOnSubmit={false}
                                onSubmitEditing={() =>
                                  this.descriptionInput &&
                                  this.descriptionInput.focus()
                                }
                                returnKeyType="next"
                              />
                            </View>
                            <View style={styles.inputContainer}>
                              <TextInput
                                ref={(ref) => (this.descriptionInput = ref)}
                                placeholderTextColor="#979797"
                                placeholder="Description"
                                style={styles.textArea}
                                multiline
                                onChangeText={handleChange('content')}
                                onBlur={handleBlur('content')}
                                value={values.content}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                returnKeyType="done"
                              />
                            </View>
                          </View>
                        </View>
                        <View style={styles.buttonContainer}>
                          <Button
                            style={styles.button}
                            customTextStyle={styles.buttonText}
                            loading={false}
                            title="Ajouter le Rappel"
                            onPress={() =>
                              this.controller.onAddReminderPress(values)
                            }
                          />
                        </View>
                      </View>
                    )}
                  </Formik>
                </View>
              </SafeAreaView>
              <KeyboardSpacer />
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}
