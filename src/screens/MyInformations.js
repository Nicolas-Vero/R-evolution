import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE } from '../configs/Constants';
import { FieldArray, Field, Formik } from 'formik';
import { AntDesign } from '@expo/vector-icons';
import { Avatar, CheckBox } from 'react-native-elements';
import { Button, DeleteButton, ModifyButton } from '../components/Button';
import HeaderLight from '../components/HeaderLight';
//import { Slider } from 'react-native-elements';
import { ElementSlider } from '../components/ElementSlider';
import { FontAwesome } from '@expo/vector-icons';
const { width } = Dimensions.get('window');
import { dynamicInput } from '../components/dynamicInput';
import { dynamicList } from '../components/dynamicList';
import { selectList } from '../components/selectList';
import { LinearGradient } from 'expo-linear-gradient';
import { avatar } from '../components/avatar';
import { loadFonts } from '../configs/design/font';
import { ScrollView } from 'react-native-gesture-handler';
import { get_coach_me } from '../api/Coach';
import SelectDropdown from 'react-native-select-dropdown';
import { get_gym } from '../api/ReferenceData';
const inputs = [
  { name: 'degrees', type: 'default', component: dynamicInput },
  { name: 'xP', type: 'default', component: ElementSlider },
  { name: 'spécialities', type: 'default', component: dynamicList },
  { name: 'gymPlace', type: 'default', component: selectList },
  { name: 'avatar', type: 'default', component: avatar },
];

export default class MyInformations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 'initial',
      stepperStep: 0,
      progress: 0,
      Coach: {},
      User: [],
      term: '',
      loaded:false,
      Gymdata: [],
    };
  }

  async componentDidMount() {
    loadFonts();
    get_coach_me().then((res) => {
      this.setState({ Coach: res.data });
    });
    get_gym().then((res) => {
      this.setState({ Gymdata: res.data });
    });
    const user = await AsyncStorage.getItem(STORAGE.USER);
    this.setState({ User: JSON.parse( user) });
    this.setState({ loaded: true });
  }

  onContinuePress(values) {
    if (values.password === values.confirm_password) {
      auth(values)
        .then(
          (res) => (
            {
              data: res.data.data,
              headers: {
                access_token: res.data.headers['access-token'],
                token_type: res.data.headers['token-name'],
                uid: res.data.headers['uid'],
              },
            },
            this.changeStep,
            console.log(header)
          ),
        )
        .then(async (res) => {
          await AsyncStorage.setItem(STORAGE.USER, JSON.stringify(res.data));
          await AsyncStorage.setItem(
            STORAGE.HEADERS,
            JSON.stringify(res.headers),
          );
        })
        .then(() => {
          console.log;
          this.changeStep;

          //this.props.navigation.navigate('AddSpecialities');
        })
        .catch((err) => {
          //  this.setState({loading: false});
          if (err.request && err.request.status === 422) {
            // this.setState({
            //   message: 'Email déjà utilisé, veuillez vous connecter.',
            // });
          } else {
            console.log(err);
            //alert('Please try again. ');
          }
        });
    } else {
      console.log('invalid confirmation');
      //alert('Passwords don\'t match');
    }
  }

  render() {
    const { navigation } = this.props;
    var term = '';
    const arrayhelper = [];
    if (!this.state.loaded) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
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
          style={styles.background}
        />
        <SafeAreaView>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',

                alignContent: 'center',
              }}>
              <View style={{ flex: 1 }}>
                <HeaderLight />
              </View>
              <View style={{ flex: 2 }}>
                <Avatar
                  size={100}
                  rounded
                  source={{
                    uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
                  }}
                />
              </View>
            </View>
            <Formik
              initialValues={{
                gender: this.state.User.gender,
                first_name: this.state.User.first_name,
                last_name: this.state.User.last_name,
                email: this.state.User.email,
                phone: this.state.User.phone,
                password: this.state.User.password,
                confirm_password: this.state.User.confirm_password,
                degrees:this.state.User.degrees,
                xP:this.state.User.xP,
                spécialities: this.state.User.spécialities,
                gymPlace: this.state.User.gymPlace,
                avatar: this.state.User.avatar,
              }}
              onSubmit={(values) => onContinuePress(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
              }) => (
                <View>
                  <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <CheckBox
                      containerStyle={{
                        paddingLeft: 0,
                        marginLeft: 0,
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                      }}
                      checkedColor="#2CDEE4"
                      title="M"
                      textStyle={{ color: 'white' }}
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="dot-circle-o"
                      checked={values.gender === 'male'}
                      value={values.gender}
                      onPress={() => setFieldValue('gender', 'male')}
                    />
                    <CheckBox
                      checkedColor="#2CDEE4"
                      containerStyle={{
                        paddingLeft: 0,
                        marginLeft: 0,
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                      }}
                      title="Mme"
                      textStyle={{ color: 'white' }}
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="dot-circle-o"
                      checked={values.gender === 'female'}
                      value={values.gender}
                      onPress={() => setFieldValue('gender', 'female')}
                    />
                  </View>
                  <Text style={styles.text}>Prénom</Text>
                  <View style={styles.inputs}>
                    <TextInput
                      placeholder="Nom"
                      style={styles.container}
                      onChangeText={handleChange('first_name')}
                      onBlur={handleBlur('first_name')}
                      value={values.first_name}
                    />
                  </View>
                  <Text style={styles.text}>Nom</Text>
                  <View style={styles.inputs}>
                    <TextInput
                      placeholder="Prénom"
                      style={styles.container}
                      onChangeText={handleChange('last_name')}
                      onBlur={handleBlur('last_name')}
                      value={values.last_name}
                    />
                  </View>
                  <Text style={styles.text}>Adresse e-mail</Text>
                  <View style={styles.inputs}>
                    <TextInput
                      placeholder="Email"
                      style={styles.container}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                  </View>
                  <Text style={styles.text}>Téléphone</Text>
                  <View style={styles.inputs}>
                    <TextInput
                      placeholder="Téléphone"
                      style={styles.container}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                    />
                  </View>
                  <View style={{ alignItems: 'center', marginVertical: 15 }}>
                    <DeleteButton
                      customContainerStyles={{
                        borderColor: 'black',
                        backgroundColor: '#1E2026',
                        height: 50,
                        width: widthPercentageToDP(92),
                      }}
                      title="modifier mot de passe"
                    />
                  </View>
                  <Text style={styles.text}>Diplôme(s)</Text>
                  <View style={styles.inputs}>
                    <View style={{ alignItems: 'center' }}>
                      <View style={{ width: widthPercentageToDP(92) }}>
                        <FieldArray
                          render={(arrayhelper) => (
                            <View>
                              <TextInput
                                style={styles.container}
                                onChangeText={(text) => {
                                  term = text;
                                  console.log('ff', term);
                                }}
                              />
                              <TouchableOpacity
                                onPress={() => {
                                  this.setState({
                                    User: [...this.state.User, term],
                                  });
                                  values.spécialities.push({ value: term });
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'baseline',

                                    marginLeft: 5,
                                    marginRight: widthPercentageToDP(48),
                                  }}>
                                  <FontAwesome
                                    name="plus-square"
                                    size={24}
                                    color="#2CDEE4"
                                  />
                                  <Text
                                    style={{
                                      fontFamily: 'RobotoBold',
                                      marginLeft: 10,
                                      padding: 5,
                                      color: '#FFFFFF',
                                    }}>
                                    Ajouter une specialité
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          )}
                        />
                        <View style={styles.container3}>
                          <FlatList
                            data={this.state.User}
                            extraData={this.state.User}
                            renderItem={({ item }) => {
                              item.selected
                                ? console.log(item.selected)
                                : console.log('noclick');
                              const backgroundColor =
                                item.selected == 1 ? '#2CDEE4' : 'transparent';
                              const borderColor =
                                item.selected == 1 ? 'transparent' : 'white';
                              const borderWidth = item.selected == 1 ? 1 : 1;
                              const color =
                                item.selected == 1 ? 'black' : 'white';
                              return (
                                <View style={{ flexDirection: 'row' }}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      item.selected != 1
                                        ? (item.selected = 1)
                                        : (item.selected = 0);
                                      arrayhelper?.form?.values?.spécialities?.includes(
                                        item?.value,
                                      )
                                        ? arrayhelper?.remove(item?.value)
                                        : arrayhelper?.push(item?.value);
                                    }}>
                                    <View
                                      style={{
                                        backgroundColor: backgroundColor,
                                        borderRadius: 25,
                                        padding: 10,
                                        justifyContent: 'center',
                                        margin: 5,
                                        borderColor: borderColor,
                                        borderWidth: borderWidth,
                                      }}>
                                      <Text
                                        style={{
                                          fontFamily: 'RobotoBold',
                                          fontSize: 15,
                                          color: color,
                                        }}>
                                        {item}
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                                  <View
                                    style={{
                                      alignItems: 'flex-end',

                                      marginRight: 5,
                                      color: '#2CDEE4',
                                    }}>
                                    <TouchableOpacity
                                      onPress={() => {
                                        this.state.User.pop();
                                        values.spécialities.pop();
                                      }}>
                                      <Text style={{ color: '#2CDEE4' }}>
                                        Supprimer
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              );
                            }}
                            keyExtractor={(item) => item.id.toString()}
                            //   extraData={selectedId}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.text}>Spécialities(s)</Text>
                  <FlatList
                    horizontal={true}
                    data={this.state.User}
                    extraData={this.state.User}
                    renderItem={({ item }) => {
                      item.selected
                        ? console.log(item.selected)
                        : console.log('noclick');
                      const backgroundColor =
                        item.selected == 1 ? '#2CDEE4' : 'transparent';
                      const borderColor =
                        item.selected == 1 ? 'transparent' : 'white';
                      const borderWidth = item.selected == 1 ? 1 : 1;
                      const color = item.selected == 1 ? 'black' : 'white';
                      return (
                        console.log(item),
                        (
                          <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                              onPress={() => {
                                item.selected != 1
                                  ? (item.selected = 1)
                                  : (item.selected = 0);
                                arrayhelper?.form?.values?.spécialities?.includes(
                                  item.value,
                                )
                                  ? arrayhelper?.remove(item?.value)
                                  : arrayhelper?.push(item?.value);
                              }}>
                              <View
                                style={{
                                  backgroundColor: backgroundColor,
                                  borderRadius: 25,
                                  padding: 10,
                                  justifyContent: 'center',
                                  margin: 5,
                                  borderColor: borderColor,
                                  borderWidth: borderWidth,
                                }}>
                                <Text
                                  style={{
                                    fontFamily: 'RobotoBold',
                                    fontSize: 15,
                                    color: color,
                                  }}>
                                  {item}
                                </Text>
                              </View>
                            </TouchableOpacity>
                            <View
                              style={{
                                alignItems: 'flex-end',
                                marginRight: 5,
                                color: '#2CDEE4',
                              }}>
                              <TouchableOpacity
                                onPress={() => {
                                  this.state.User.pop();
                                  values.spécialities.pop();
                                }}>
                                <Text style={{ color: '#2CDEE4' }}>
                                  Supprimer
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        )
                      );
                    }}
                    keyExtractor={(item) => item.id.toString()}
                  />

                  <View style={styles.inputs}>
                    <View style={{ alignItems: 'center' }}>
                      <View style={{ alignItems: 'center' }}>
                        <FieldArray
                          render={(arrayhelper) => (
                            <View>
                              <TextInput
                                style={{
                                  backgroundColor: '#FFFFFF',
                                  paddingTop: 10,
                                  paddingBottom: 10,
                                  paddingLeft: 15,
                                  height: 50,
                                  borderRadius: 5,
                                  paddingRight: 15,
                                  marginLeft: 5,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  alignContent: 'center',
                                  width: widthPercentageToDP(92),
                                }}
                                onChangeText={(text) => {
                                  term = text;
                                  console.log('ff', term);
                                }}
                              />
                              <TouchableOpacity
                                onPress={() => {
                                  this.setState({
                                    User: [...this.state.User, term],
                                  });
                                  values.spécialities.push({ value: term });
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'baseline',
                                    marginLeft: 5,
                                    marginRight: widthPercentageToDP(48),
                                  }}>
                                  <FontAwesome
                                    name="plus-square"
                                    size={24}
                                    color="#2CDEE4"
                                  />
                                  <Text
                                    style={{
                                      fontFamily: 'RobotoBold',
                                      marginLeft: 10,
                                      padding: 5,
                                      color: '#FFFFFF',
                                    }}>
                                    Ajouter une specialité
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          )}
                        />
                        <View style={styles.container3}></View>
                      </View>
                    </View>
                    <View style={styles}>
                      <Text style={styles.text}>
                        Dans quelle salle pratiques-tu ?
                      </Text>
                      <View style={{ alignItems: 'center' }}>
                        <SelectDropdown
                          buttonStyle={{
                            width: widthPercentageToDP(92),
                            borderRadius: 5,
                          }}
                          data={this.state.Gymdata}
                          defaultButtonText={'Recherche le nom de ta salle'}
                          onSelect={(selectedItem, index) => {
                            if (
                              arrayhelper?.form?.values?.gymPlace?.length > 1
                            ) {
                              console.log(
                                arrayhelper?.form?.values?.gymPlace?.length,
                              );
                              arrayhelper?.pop();
                            } else {
                            }
                            arrayhelper?.push(selectedItem);
                            console.log(arrayhelper?.form?.values?.gymPlace);
                          }}
                          renderDropdownIcon={() => {
                            return (
                              <AntDesign name="down" size={24} color="black" />
                            );
                          }}
                          dropdownIconPosition={'right'}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected

                            return selectedItem.name;
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
                            return item.name;
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={{ alignItems: 'center', marginVertical: 30 }}>
                    <Button
                      loading={false}
                      title="Valider les changements"
                      customTextStyle={{
                        fontFamily: 'RobotoBold',
                        fontSize: 17,
                      }}
                      onPress={() => {
                        navigation.navigate('MoreInfoAthlete', {
                          item: values,
                        });
                      }}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }}
}
const styles = StyleSheet.create({
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
  inputs: {
    marginBottom: 15,
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    width: widthPercentageToDP(92),
    height: 45,
    borderRadius: 5,
    paddingRight: 15,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
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
    maxHeight: 150,
    width: widthPercentageToDP(95),
    padding: 5,
    justifyContent: 'center',
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
    marginLeft: 15,
    marginBottom: 10,
  },
});
