import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  Dimensions,
  TextInput,
  Keyboard,
  StatusBar,
  Image,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
const { width } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';
import * as Yup from 'yup';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { Formik, FieldArray, Field } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';
export default class health extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'initial',
      // passItem: this.props.navigation.state.params.item,
      arrayofdiplomas: [],
    };
  }
  render() {
    const data = ['OUI', 'NON'];
    const passItem = this.props.navigation.state.params.item;
    const { navigation } = this.props;
    console.log('passitem', passItem);
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
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
          <ScrollView>
            <SafeAreaView onPress={Keyboard.dismiss} style={styles.safeArea}>
              <Header title="Let' go" />
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={require('../../../assets/images/GroupA_4.png')}
                  style={{
                    width: widthPercentageToDP(80),
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
                <Formik
                  initialValues={{
                    health_issues:false,
                    health_problem_description: '',
                  }}
                  onSubmit={(values) => {
                    const item = { ...passItem, ...values };
                    navigation.navigate('selectList', { item: item });
                    console.log(item);
                  }}>
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    values,
                    setFieldTouched,
                    touched,
                    errors,
                    isValid,
                    validate,
                    ref,
                  }) => (
                    <View style={{ paddingBottom: 15 }}>
                      <Field
                        name="health_issues"
                        id="health_issues"
                        validate={validate}>
                        {({
                          field,
                          meta,
                          form: {
                            touched,
                            errors,
                            isSubmitting,
                            setFieldTouched,
                          },
                        }) => {
                          return (
                            <View
                              style={{
                                height: heightPercentageToDP(75),
                              }}>
                              <View
                                style={{
                                  alignItems: 'flex-start',
                                  marginTop: 135,
                                }}>
                                <Text
                                  style={{
                                    fontFamily: 'RobotoBold',
                                    fontSize: 17,
                                    color: '#FFFF',
                                  }}>
                                  DES PROBLÈMES DE SANTÉ A SIGNALER
                                </Text>
                              </View>
                              <View>
                                <FieldArray
                                  name="health_issues"
                                  render={(arrayhelper) => (
                                    <View>
                                      <View style={styles.container3}>
                                        <SelectDropdown
                                          buttonStyle={{
                                            width: widthPercentageToDP(50),
                                            borderRadius: 5,
                                          }}
                                          data={data}
                                          defaultButtonText={'choisir'}
                                          onSelect={(selectedItem, index) => {
                                            let boolValue = '';
                                            if (selectedItem == 'OUI') {
                                              boolValue = true;
                                            } else {
                                              boolValue = false;
                                            }
                                            arrayhelper.form.values.health_issues =
                                              boolValue;
                                          }}
                                          renderDropdownIcon={() => {
                                            return (
                                              <AntDesign
                                                name="down"
                                                size={24}
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
                                          rowTextStyle={{
                                            color: 'white',
                                            fontSize: 15,
                                            marginRight: 90,
                                          }}
                                          dropdownStyle={{
                                            backgroundColor: '#282C3A',
                                            borderRadius: 5,
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
                                        <View style={{ marginTop: 10 }}>
                                          <Text
                                            style={{
                                              fontFamily: 'RobotoBold',
                                              fontSize: 17,
                                              color: '#FFFF',
                                              marginBottom: 10,
                                            }}>
                                            INFORMATIONS COMPLÉMENTAIRES
                                          </Text>
                                        </View>
                                        <View style={styles.container3}>
                                          <TextInput
                                            style={styles.field}
                                            placeholder="Description"
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
                        title="suivant"
                        customTextStyle={{
                          fontFamily: 'RobotoBold',
                          fontSize: 17,
                        }}
                        onPress={handleSubmit}
                      />
                    </View>
                  )}
                </Formik>
              </View>
            </SafeAreaView>
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container3: {
    height: 125,
    width: widthPercentageToDP(95),
    justifyContent: 'center',
    marginBottom: 30,
  },
  item: {
    backgroundColor: '#393637',
    borderRadius: 25,
    marginVertical: 8,
    padding: 10,
    justifyContent: 'center',
  },
  itemcontent: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  title: {
    fontFamily: 'RobotoBold',
    fontSize: 20,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  text: {
    fontFamily: 'RobotoBold',
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: 30,
    width: widthPercentageToDP(90),
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
    height: 49,
    marginTop: 29,
    marginBottom: 49,
    paddingLeft: 16,
    paddingRight: 16,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  title: {
    fontSize: 32,
  },

  field: {
    backgroundColor: '#FFFFFF',
    width: widthPercentageToDP(92),
    paddingLeft: 15,
    height: 130,
    paddingRight: 15,
    borderRadius: 5,
  },
});
