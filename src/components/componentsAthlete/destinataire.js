import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  Dimensions,
  Keyboard,
  StatusBar,
  Image,
} from 'react-native';
import { ActivityIndicator } from 'react-native';
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
import { get_coach } from '../../api/Coach';
import { CheckBox } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

export default class destinataire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'initial',
      // passItem: this.props.navigation.state.params.item,
      Coach: [],
      isLoaded: false,
      checked: false,
    };
  }
  componentDidMount() {
    get_coach().then((res) => {
      this.setState({ Coach: res.data });
      this.setState({ isLoaded: true });
    });
  }
  render() {
    const passItem = this.props.navigation.state.params.item;
    const { navigation } = this.props;
    if (!this.state.isLoaded) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
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
              <Header title="LET'S GO" />
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={require('../../../assets/images/GroupA_7.png')}
                    style={{  width: widthPercentageToDP(80),
                      resizeMode: 'contain', }}
                  />
                </View>

                <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
                  <Formik
                    initialValues={{
                      coach_preference: '',
                    }}
                    onSubmit={(values) => {
                      const item = { ...passItem, ...values };
                      navigation.navigate('avatarAthlete', { item: item });
                      console.log(item);
                    }}
                    validationSchema={Yup.object().shape({
                      coach_preference: Yup.object().required(
                        "Si vous n'avez pas de preférence selectionner peu importe",
                      ),
                    })}>
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
                      <View>
                        <Field
                          name="coach_preference"
                          id="coach_preference"
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
                                style={{ height: heightPercentageToDP(75) }}>
                                <View
                                  style={{
                                    alignItems: 'center',
                                    marginTop: 75,
                                    marginBottom: 100,
                                  }}>
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                      fontSize: 20,
                                      color: '#FFFF',
                                    }}>
                                    À QUI VEUX-TU ADRESSER TA DEMANDE ?
                                  </Text>
                                </View>
                                <View>
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                      fontSize: 17,
                                      color: '#FFFF',
                                    }}>
                                    Un coach en particulier ?
                                  </Text>
                                </View>
                                <View style={styles.container}>
                                  <FieldArray
                                    name="coach_preference"
                                    render={(arrayhelper) => (
                                      <View>
                                        <View>
                                          <SelectDropdown
                                            buttonStyle={{
                                              width: widthPercentageToDP(90),
                                              borderRadius: 5,
                                            }}
                                            data={this.state.Coach}
                                            defaultButtonText={
                                              'Recherche ton coach'
                                            }
                                            onSelect={(selectedItem, index) => {
                                              arrayhelper.form.values.coach_preference =
                                                {
                                                  type: 'specific_coach',
                                                  coach_id: selectedItem.id,
                                                };
                                              this.setState({ checked: false });
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
                                              let show = '';
                                              this.state.checked
                                                ? null
                                                : (show = `${selectedItem.first_name}  ${selectedItem.last_name}`);
                                              return show;
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
                                              return item.first_name;
                                            }}
                                          />
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              marginTop: 15,
                                              marginBottom: 24,
                                              borderWidth:
                                                errors.coach_preference &&
                                                touched.coach_preference
                                                  ? 2
                                                  : 0,
                                              borderColor:
                                                errors.coach_preference &&
                                                touched.coach_preference
                                                  ? 'red'
                                                  : null,
                                            }}>
                                            <CheckBox
                                              size={25}
                                              containerStyle={{
                                                paddingLeft: 0,
                                                marginLeft: 0,
                                                borderWidth: 0,
                                              }}
                                              uncheckedColor="#2CDEE4"
                                              checked={this.state.checked}
                                              value={
                                                arrayhelper.form.values
                                                  .coach_preference
                                              }
                                              onPress={() => {
                                                arrayhelper.form.values.coach_preference =
                                                  {
                                                    type: 'any_coach',
                                                  };
                                                this.setState({
                                                  checked: true,
                                                });
                                              }}
                                            />
                                            <Text
                                              style={{
                                                flex: 1,
                                                flexWrap: 'wrap',
                                                color: '#FFFFFF',
                                                fontFamily: 'Roboto',
                                                fontSize: 13,
                                              }}>
                                              Peu importe
                                            </Text>
                                          </View>
                                          {errors.coach_preference &&
                                            touched.coach_preference && (
                                              <View
                                                style={{
                                                  alignItems: 'flex-end',
                                                }}>
                                                <Text
                                                  style={{
                                                    fontSize: 15,
                                                    color: 'red',
                                                  }}>
                                                  {errors.coach_preference}
                                                </Text>
                                              </View>
                                            )}
                                        </View>
                                      </View>
                                    )}
                                  />
                                </View>
                                {/* <View >
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 17,
                      color: '#FFFF',
                    }}>
                    Quel commercial t'a contacté ?
                  </Text>
                </View>
                <View style={styles.container}>
                  <FieldArray
                    name='coach_preference'
                    render={(arrayhelper) => (
                   <View>
                   <View>
                        <SelectDropdown
                          buttonStyle={{ width: widthPercentageToDP(90), borderRadius: 5 }}
                          data={this.state.Coach}
                          defaultButtonText={'Recherche ton commercial'}
                          onSelect={(selectedItem, index) => {
                            arrayhelper.form.values.coach_preference = {
                              type: 'specific_coach',
                              coach_id: selectedItem.id,
                            };
                            this.setState({checked:false})
                          }}
                          renderDropdownIcon={() => {
                            return (
                              <AntDesign name="down" size={24} color="black" />
                            );
                          }}
                          dropdownIconPosition={'right'}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            let show = '';
                            this.state.checked?null: show = `${selectedItem.first_name}  ${selectedItem.last_name}`;
                            return show;
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
                          rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item.first_name;
                          }}
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 15,
                            marginBottom: 24,
                          }}>
                          <CheckBox
                            size={25}
                            containerStyle={{
                              paddingLeft: 0,
                              marginLeft: 0,
                              borderWidth: 0,
                            }}
                            uncheckedColor="#2CDEE4"
                            checked={this.state.checked}
                            value={arrayhelper.form.values.coach_preference}
                            onPress={() => {
                              arrayhelper.form.values.coach_preference = {
                                type: 'any_coach',
                              };
                              this.setState({checked:true})
                            }}
                          />
                          <Text
                            style={{
                              flex: 1,
                              flexWrap: 'wrap',
                              color: '#FFFFFF',
                              fontFamily: 'Roboto',
                              fontSize: 13,
                            }}>
                            je n'ai pas été contacté
                          </Text>
                        </View>
                      </View>
                            
                </View>
                    )}
                  />
              
              </View> */}
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
}

const styles = StyleSheet.create({
  container1: {
    height: 300,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  container2: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 65,
  },
  container3: {
    height: 150,
    width: widthPercentageToDP(95),
    padding: 5,
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
});
