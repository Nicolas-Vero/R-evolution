import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Keyboard,
  TextInput,
  ScrollView,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Formik, FieldArray, Field } from 'formik';

import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign } from '@expo/vector-icons';
import Header from '../../../../components/Header';
import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../../components/Button';
import styles from './healthStyle';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class healthScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'initial',
    };
  }

  onNavigate = (item) => {
    this.props.navigation.navigate('selectGymScreen', { item: item });
  };

  render() {
    const data = ['OUI', 'NON'];
    const passItem = this.props.navigation.state.params.item;
    return (
      <View style={styles.container}>
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
          style={styles.background}>
          <Header title="LET'S GO" />
          <SafeAreaView style={styles.container} onPress={Keyboard.dismiss}>
            <RegisterStepImageView step={4} />
            <ScrollView keyboardShouldPersistTaps="handled">
              <View style={styles.content}>
                <Formik
                  initialValues={{
                    health_issues: false,
                    health_problem_description: '',
                  }}
                  onSubmit={(values) => {
                    const item = { ...passItem, ...values };
                    this.onNavigate(item);
                  }}>
                  {({ handleSubmit, isValid, validate, ref }) => (
                    <View style={styles.content}>
                      <Field
                        name="health_issues"
                        id="health_issues"
                        validate={validate}>
                        {() => {
                          return (
                            <View
                              style={{
                                height: heightPercentageToDP(72),
                              }}>
                              <Text style={styles.title}>
                                DES PROBLÈMES DE SANTÉ A SIGNALER ?
                              </Text>
                              <View style={styles.healthContainer}>
                                <FieldArray
                                  name="health_issues"
                                  render={(arrayhelper) => (
                                    <View>
                                      <View style={styles.dropdownContainer}>
                                        <SelectDropdown
                                          buttonStyle={styles.dropdownButton}
                                          buttonTextStyle={
                                            styles.dropdownButtonText
                                          }
                                          rowTextStyle={styles.dropdownRowText}
                                          dropdownStyle={styles.dropdownBg}
                                          rowStyle={styles.dropdownRow}
                                          data={data}
                                          defaultButtonText={'Choisir'}
                                          onSelect={(selectedItem) => {
                                            let value;
                                            if (selectedItem == 'OUI') {
                                              value = true;
                                            } else {
                                              value = false;
                                            }
                                            arrayhelper.form.values.health_issues =
                                              value;
                                          }}
                                          renderDropdownIcon={() => {
                                            return (
                                              <AntDesign
                                                name="down"
                                                size={18}
                                                color="black"
                                              />
                                            );
                                          }}
                                          dropdownIconPosition={'right'}
                                          buttonTextAfterSelection={(
                                            selectedItem,
                                            index,
                                          ) => {
                                            // text represented after item is selected
                                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                                            return selectedItem;
                                          }}
                                          rowTextForSelection={(
                                            item,
                                            index,
                                          ) => {
                                            // text represented for each item in dropdown
                                            // if data array is an array of objects then return item.property to represent item in dropdown
                                            return item;
                                          }}
                                        />
                                      </View>
                                      <View>
                                        <Text style={styles.subTitle}>
                                          INFORMATIONS COMPLÉMENTAIRES
                                        </Text>
                                        <View style={styles.inputContainer}>
                                          <TextInput
                                            keyboardType="default"
                                            returnKeyType="done"
                                            blurOnSubmit={true}
                                            onSubmitEditing={() => {
                                              Keyboard.dismiss();
                                            }}
                                            multiline={true}
                                            style={styles.input}
                                            placeholder="Description"
                                            placeholderTextColor="#979797"
                                            onChangeText={(text) =>
                                              (arrayhelper.form.values.health_problem_description =
                                                text)
                                            }
                                          />
                                        </View>
                                      </View>
                                    </View>
                                  )}
                                />
                              </View>
                            </View>
                          );
                        }}
                      </Field>
                      <Button
                        loading={false}
                        disabled={!isValid}
                        title="Suivant"
                        customTextStyle={styles.nextButtonText}
                        onPress={handleSubmit}
                      />
                    </View>
                  )}
                </Formik>
              </View>
              <KeyboardSpacer />
            </ScrollView>
          </SafeAreaView>
        </LinearGradient>
      </View>
    );
  }
}
