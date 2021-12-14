import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import * as Yup from 'yup';
import { Formik, FieldArray, Field } from 'formik';
import { FontAwesome } from '@expo/vector-icons';
import { heightPercentageToDP } from 'react-native-responsive-screen';

import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../../components/Button';
import Header from '../../../../components/Header';
import styles from './diplomasStyle';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class diplomasScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 'initial',
      // passItem: this.props.navigation.state.params.item,
      arrayofdiplomas: [],
    };
  }

  onNavigate = (item) => {
    this.props.navigation.navigate('experienceCoachScreen', { item: item });
  };

  render() {
    const passItem = this.props.navigation.state.params;
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
          <SafeAreaView onPress={Keyboard.dismiss} style={styles.safeArea}>
            <RegisterStepImageView step={9} />
            <View style={styles.content}>
              <Formik
                initialValues={{
                  diplomas: [''],
                }}
                onSubmit={(values) => {
                  const item = { ...passItem, ...values };
                  this.onNavigate(item);
                }}
                validationSchema={Yup.object().shape({
                  diplomas: Yup.array().min(1).required('Requis'),
                })}>
                {({ handleSubmit, isValid, validate }) => (
                  <View style={styles.alignCenter}>
                    <Field name="diplomas" id="diplomas" validate={validate}>
                      {({ field, form: { errors } }) => {
                        return (
                          <View
                            style={{
                              height: heightPercentageToDP(72),
                            }}>
                            <Text style={styles.title}>DIPLÔME(S)</Text>
                            <View style={styles.container}>
                              <FieldArray
                                name="diplomas"
                                render={(arrayhelper) => (
                                  <View style={styles.diplomasContainer}>
                                    <ScrollView
                                      ref={(ref) => (this.scrollView = ref)}
                                      style={styles.scrollView}
                                      onContentSizeChange={(width, height) =>
                                        this.scrollView.scrollTo({
                                          y: height,
                                        })
                                      }>
                                      {/* onContentSizeChange={(width, height) =>
                                        this.refs.scrollView.scrollTo({
                                          y: height,
                                        })
                                      }>
                                      > */}
                                      <View style={styles.alignCenter}>
                                        {field.value.map((fields, index) => (
                                          <View
                                            key={index}
                                            style={{
                                              marginBottom: 25,
                                            }}>
                                            <TextInput
                                              placeholderTextColor="#979797"
                                              placeholder="Entre le nom de ton diplôme"
                                              onChangeText={(text) =>
                                                (field.value[index] = text)
                                              }
                                              style={styles.input}
                                              name={`degrees.${index}`}
                                            />
                                            {
                                              <View
                                                style={
                                                  styles.diplomasDeleteContainer
                                                }>
                                                <TouchableOpacity
                                                  onPress={() =>
                                                    arrayhelper.remove(index)
                                                  }>
                                                  <Text
                                                    style={{
                                                      color: '#2CDEE4',
                                                    }}>
                                                    Supprimer
                                                  </Text>
                                                </TouchableOpacity>
                                              </View>
                                            }
                                          </View>
                                        ))}
                                      </View>
                                      <TouchableOpacity
                                        onPress={() => arrayhelper.push('')}>
                                        <View
                                          style={styles.addDiplomasContainer}>
                                          <FontAwesome
                                            name="plus-square"
                                            size={24}
                                            color="#2CDEE4"
                                          />
                                          <Text style={styles.addDiplomasText}>
                                            Ajouter un diplôme
                                          </Text>
                                        </View>
                                      </TouchableOpacity>
                                      <KeyboardSpacer />
                                    </ScrollView>

                                    {errors.diplomas ? (
                                      <View style={styles.errorContainer}>
                                        <Text style={styles.errorText}>
                                          Ajouter un diplôme
                                        </Text>
                                      </View>
                                    ) : null}
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
          </SafeAreaView>
        </LinearGradient>
      </View>
    );
  }
}
