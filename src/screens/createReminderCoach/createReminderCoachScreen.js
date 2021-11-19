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
import { loadFonts } from '../../configs/design/font';
import { isLoaded } from 'expo-font';
import { coach_reminder } from '../../api/CoachReminder';
import * as Notifications from 'expo-notifications';
import styles from './createReminderCoachStyle';
import KeyboardSpacer from 'react-native-keyboard-spacer';
export default class createReminderCoachScreen extends React.Component {
  state = {
    isLoaded: false,
  };
  componentDidMount() {
    this.scheduleNotification();
    loadFonts;
  }

  scheduleNotification = async (value) => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
    let date = value.date.split('/').reverse().join('-');
    Notifications.scheduleNotificationAsync({
      content: {
        title: value?.title,
        body: value?.content,
      },
      trigger:
        new Date(date).getTime() - 60000 * 60 * 5 + 60000 * 60 * value.hour,
    });
  };

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
                    onSubmit={(values) => {
                      console.log(values);
                      try {
                        coach_reminder(values).then(navigate('Activitie'));
                      } catch (error) {
                        console.log(error);
                      }
                    }}>
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
                              <Text style={styles.formRowText}>Couleur</Text>
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
                                buttonTextAfterSelection={(
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
                                rowTextForSelection={(item, index) => {
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
                            onPress={() => {
                              try {
                                console.log(values);
                                coach_reminder(values).then(() => {
                                  this.scheduleNotification(values);
                                  navigate('Activitie');
                                });
                              } catch (error) {
                                console.log(error);
                              }
                            }}
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
