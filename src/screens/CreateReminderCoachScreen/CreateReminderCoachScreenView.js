import React, { useRef } from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  Keyboard,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import SelectDropdown from 'react-native-select-dropdown';
import { Formik } from 'formik';
import { Text } from 'react-native-elements';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
import styles from './CreateReminderCoachScreenStyle';
import moment from 'moment';

const CreateReminderCoachScreenView = ({ controller, state }) => {
  const rappelInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const colors = ['#2CDEE4', '#FD7279', '#4FE470', '#979797', '#FED32C'];

  if (!state.isLoaded) {
    return (
      <View>
        <ActivityIndicator size="large" color="#696969" />
      </View>
    );
  }

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
                onSubmit={(values) => controller.onAddReminderPress(values)}>
                {({ handleChange, handleBlur, values, setFieldValue }) => (
                  <View>
                    <View style={styles.formRow}>
                      <View style={{ flex: 1.5 }}>
                        <Text style={styles.formRowText}>Date</Text>
                        <View style={styles.inputTop}>
                          <TextInputMask
                            type={'datetime'}
                            options={{ format: 'DD/MM/YYYY' }}
                            placeholderTextColor="#979797"
                            placeholder={moment().format('DD/MM/YYYY')}
                            value={values.date}
                            onChangeText={handleChange('date')}
                            onBlur={handleBlur('date')}
                            blurOnSubmit={false}
                            onSubmitEditing={() => {
                              if (rappelInputRef.current) {
                                rappelInputRef.current.focus();
                              }
                            }}
                            returnKeyType="next"
                          />
                        </View>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.formRowText}>Heure</Text>
                        <View style={styles.inputTop}>
                          <TextInputMask
                            type={'datetime'}
                            options={{ format: 'HH:mm' }}
                            placeholderTextColor="#979797"
                            placeholder="12:00"
                            value={values.hour}
                            onChangeText={handleChange('hour')}
                            onBlur={handleBlur('hour')}
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onSubmitEditing={() => {
                              if (rappelInputRef.current) {
                                rappelInputRef.current.focus();
                              }
                            }}
                          />
                        </View>
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
                          onSelect={(selectedItem) => {
                            setFieldValue('color', selectedItem);
                          }}
                          renderCustomizedButtonChild={(selectedItem) => (
                            <View
                              style={{
                                backgroundColor: selectedItem,
                                width: 28,
                                height: 28,
                                borderRadius: 14,
                              }}
                            />
                          )}
                          renderCustomizedRowChild={(item) => (
                            <View
                              style={{
                                backgroundColor: item,
                                width: 28,
                                height: 28,
                                borderRadius: 14,
                                borderColor: '#50525B',
                                borderWidth: values.color === item ? 3 : 0,
                              }}
                            />
                          )}
                        />
                      </View>
                    </View>

                    <View style={styles.inputContainer}>
                      <TextInput
                        ref={rappelInputRef}
                        placeholderTextColor="#979797"
                        placeholder="Objet du rappel"
                        style={styles.input}
                        onChangeText={handleChange('title')}
                        onBlur={handleBlur('title')}
                        value={values.title}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                          if (descriptionInputRef.current) {
                            descriptionInputRef.current.focus();
                          }
                        }}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <TextInput
                        ref={descriptionInputRef}
                        placeholderTextColor="#979797"
                        placeholder="Description"
                        style={styles.textArea}
                        multiline
                        onChangeText={handleChange('content')}
                        onBlur={handleBlur('content')}
                        value={values.content}
                        onSubmitEditing={Keyboard.dismiss}
                        returnKeyType="done"
                      />
                    </View>

                    <View style={styles.buttonContainer}>
                      <Button
                        style={styles.button}
                        customTextStyle={styles.buttonText}
                        loading={false}
                        title="Ajouter le Rappel"
                        onPress={() => controller.onAddReminderPress(values)}
                      />
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    </View>
  );
};

export default CreateReminderCoachScreenView;
