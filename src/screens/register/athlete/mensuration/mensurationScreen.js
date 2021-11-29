import React from 'react';
import {
  View,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Formik, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import Header from '../../../../components/Header';
import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../../components/Button';
import styles from './mensurationStyle';

export default class mensurationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'initial',
      // passItem: this.props.navigation.state.params.item,
      arrayofdiplomas: [],
    };
  }

  onNavigate = (item) => {
    this.props.navigation.navigate('experienceScreen', { item: item });
  };

  render() {
    const passItem = this.props.navigation.state.params;
    console.log('passitem', passItem);
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
          style={styles.container}>
          <Header title="LET'S GO" />
          <SafeAreaView
            onPress={Keyboard.dismiss}
            style={styles.safeArea}
            style={styles.container}>
            <ScrollView
              style={styles.container}
              keyboardShouldPersistTaps="handled">
              <RegisterStepImageView step={1} />
              <View style={styles.content}>
                <Formik
                  initialValues={{
                    age: '',
                    weight: '',
                    size: '',
                  }}
                  onSubmit={(values) => {
                    const item = { ...passItem, ...values };
                    this.onNavigate(item);
                  }}
                  validationSchema={Yup.object().shape({
                    age: Yup.number()
                      .typeError('Âge non valide')
                      .min(15, 'Tu dois entrer un âge correct')
                      .max(100, 'Tu dois entrer un âge correct')
                      .required('Requis'),
                    weight: Yup.number()
                      .typeError('Poids non valide')
                      .max(300, 'Tu dois entrer un poids correct')
                      .min(30, 'Tu dois entrer un poids correct')
                      .required('Requis'),
                    size: Yup.number()
                      .typeError('Taille non valide')
                      .min(100, 'Tu dois entrer une taille correcte')
                      .max(300, 'Tu dois entrer une taille correcte')
                      .required('Requis'),
                  })}>
                  {({ handleSubmit, isValid, validate, ref }) => (
                    <View style={styles.content}>
                      <Field
                        name="mensuration"
                        id="mensuration"
                        validate={validate}>
                        {({ form: { touched, errors } }) => {
                          return (
                            <View
                              style={{
                                height: heightPercentageToDP(72),
                                flex: 1,
                              }}>
                              <View>
                                <Text style={styles.title}>
                                  AIDE NOUS A MIEUX TE CONNAÎTRE
                                </Text>
                              </View>
                              <View style={styles.content}>
                                <FieldArray
                                  name="mensuration"
                                  render={(arrayhelper) => (
                                    <View>
                                      <View style={styles.inputContainer}>
                                        <TextInput
                                          style={{
                                            ...styles.input,
                                            borderWidth:
                                              errors.size && touched.size
                                                ? 2
                                                : 0,
                                            borderColor:
                                              errors.size && touched.size
                                                ? '#FD7279'
                                                : null,
                                          }}
                                          placeholder="Taille (en cm)"
                                          onChangeText={(text) =>
                                            (arrayhelper.form.values.size =
                                              text)
                                          }
                                          placeholderTextColor="#979797"
                                          blurOnSubmit={false}
                                          onSubmitEditing={() =>
                                            this.weightInput &&
                                            this.weightInput.focus()
                                          }
                                          returnKeyType="next"
                                        />
                                        {errors.size && touched.size && (
                                          <View
                                            style={styles.errorInputContainer}>
                                            <Text style={styles.errorInputText}>
                                              {errors.size}
                                            </Text>
                                          </View>
                                        )}
                                      </View>
                                      <View style={styles.inputContainer}>
                                        <TextInput
                                          placeholder="Poids"
                                          onChangeText={(text) =>
                                            (arrayhelper.form.values.weight =
                                              text)
                                          }
                                          style={{
                                            ...styles.input,
                                            borderWidth:
                                              errors.weight && touched.weight
                                                ? 2
                                                : 0,
                                            borderColor:
                                              errors.weight && touched.weight
                                                ? '#FD7279'
                                                : null,
                                          }}
                                          ref={(ref) =>
                                            (this.weightInput = ref)
                                          }
                                          placeholderTextColor="#979797"
                                          blurOnSubmit={false}
                                          onSubmitEditing={() =>
                                            this.ageInput &&
                                            this.ageInput.focus()
                                          }
                                          returnKeyType="next"
                                        />
                                        {errors.weight && touched.weight && (
                                          <View
                                            style={styles.errorInputContainer}>
                                            <Text style={styles.errorInputText}>
                                              {errors.weight}
                                            </Text>
                                          </View>
                                        )}
                                      </View>
                                      <TextInput
                                        style={{
                                          ...styles.input,
                                          borderWidth:
                                            errors.size && touched.size ? 2 : 0,
                                          borderColor:
                                            errors.size && touched.size
                                              ? '#FD7279'
                                              : null,
                                        }}
                                        placeholder="Âge"
                                        onChangeText={(text) =>
                                          (arrayhelper.form.values.age = text)
                                        }
                                        ref={(ref) => (this.ageInput = ref)}
                                        placeholderTextColor="#979797"
                                        blurOnSubmit={false}
                                        onSubmitEditing={() =>
                                          Keyboard.dismiss()
                                        }
                                        returnKeyType="done"
                                      />
                                      {errors.age && touched.age && (
                                        <View
                                          style={styles.errorInputContainer}>
                                          <Text style={styles.errorInputText}>
                                            {errors.age}
                                          </Text>
                                        </View>
                                      )}
                                    </View>
                                  )}
                                />
                              </View>
                            </View>
                          );
                        }}
                      </Field>
                      <View style={styles.buttonContainer}>
                        <Button
                          loading={false}
                          disabled={!isValid}
                          title="Suivant"
                          customTextStyle={styles.buttonText}
                          onPress={handleSubmit}
                        />
                      </View>
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
