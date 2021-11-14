import React from 'react';
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE } from '../../configs/Constants';
import { FieldArray, Field, Formik } from 'formik';
import { AntDesign } from '@expo/vector-icons';
import { Avatar, CheckBox } from 'react-native-elements';
import { Button, DeleteButton, ModifyButton } from '../../components/Button';
import HeaderLight from '../../components/HeaderLight';
import { FontAwesome } from '@expo/vector-icons';
const { width } = Dimensions.get('window');
import { loadFonts } from '../../configs/design/font';
import { ScrollView } from 'react-native-gesture-handler';
import { get_coach_me } from '../../api/Coach';
import SelectDropdown from 'react-native-select-dropdown';
import { get_gym } from '../../api/ReferenceData';
import styles from './profileCoachStyle';
export default class profileCoachScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 'initial',
      stepperStep: 0,
      progress: 0,
      Coach: {},
      User: [],
      term: '',
      loaded: false,
      Gymdata: [],
      diplomas: [],
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
    console.log(user);
    this.setState({ User: JSON.parse(user) });
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
          //TODO USE AuthService.setAuth for update HEADER
          await AsyncStorage.setItem(
            STORAGE.HEADERS,
            JSON.stringify(res.headers),
          );
        })
        .then(() => {
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
        <View style={styles.container}>
          <SafeAreaView>
            <ScrollView>
              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  <HeaderLight />
                </View>
                <View style={styles.headerMidle}>
                  <Avatar
                    size={105}
                    rounded
                    source={{
                      uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
                    }}
                  />
                </View>
                <View style={styles.headerRight}></View>
              </View>
              <Formik
                initialValues={{
                  ...this.state.User,
                }}
                onSubmit={(values) => onContinuePress(values)}>
                {({ handleChange, handleBlur, setFieldValue, values }) => (
                  <View style={styles.content}>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                      <CheckBox
                        containerStyle={styles.checkBox}
                        checkedColor="#2CDEE4"
                        title="M"
                        textStyle={{ color: '#fff' }}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="dot-circle-o"
                        checked={values.gender === 'male'}
                        value={values.gender}
                        onPress={() => setFieldValue('gender', 'male')}
                      />
                      <CheckBox
                        checkedColor="#2CDEE4"
                        containerStyle={styles.checkBox}
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
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholder="Nom"
                        placeholderTextColor="#979797"
                        style={styles.input}
                        onChangeText={handleChange('first_name')}
                        onBlur={handleBlur('first_name')}
                        value={values.first_name}
                      />
                    </View>
                    <Text style={styles.text}>Nom</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholder="Prénom"
                        placeholderTextColor="#979797"
                        style={styles.input}
                        onChangeText={handleChange('last_name')}
                        onBlur={handleBlur('last_name')}
                        value={values.last_name}
                      />
                    </View>
                    <Text style={styles.text}>Adresse e-mail</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholder="Email"
                        placeholderTextColor="#979797"
                        style={styles.input}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                      />
                    </View>
                    <Text style={styles.text}>Téléphone</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholder="Téléphone"
                        placeholderTextColor="#979797"
                        style={styles.input}
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        value={values.phone}
                      />
                    </View>
                    <View style={{ marginVertical: 10 }}>
                      <DeleteButton
                        customContainerStyles={styles.changePasswordButton}
                        customTextStyle={styles.changePasswordText}
                        title="Modifier mon mot de passe"
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.text}>Diplôme(s)</Text>
                      <FieldArray
                        render={(arrayhelper) => (
                          <View style={styles.inputWithButtonContainer}>
                            <TextInput
                              placeholder="Entre le nom de ton dîplôme"
                              placeholderTextColor="#979797"
                              name="diplomas"
                              value={this.state.term}
                              onChangeText={(text) => {
                                this.setState({ term: text });
                              }}
                              style={styles.inputWithButton}
                            />
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({
                                  User: [...this.state.User, term],
                                });
                                //TODO Diplomas, pas spécialités
                                values.spécialities.push({ value: term });
                              }}>
                              <View style={styles.addButton}>
                                <FontAwesome
                                  name="plus-square"
                                  size={25}
                                  color="#2CDEE4"
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                        )}
                      />
                    </View>
                    {/* <View style={styles.container3}>
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
                          const color = item.selected == 1 ? 'black' : 'white';
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
                    </View> */}
                    <Text style={styles.text}>Spécialities(s)</Text>
                    {/* <FlatList
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
                    /> */}

                    <View style={styles.inputContainer}>
                      <FieldArray
                        render={(arrayhelper) => (
                          <View style={styles.inputWithButtonContainer}>
                            <TextInput
                              placeholder="Entre une spécialité"
                              placeholderTextColor="#979797"
                              name="diplomas"
                              value={this.state.term}
                              onChangeText={(text) => {
                                term = text;
                                console.log('ff', term);
                              }}
                              style={styles.inputWithButton}
                            />
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({
                                  User: [...this.state.User, term],
                                });
                                values.spécialities.push({ value: term });
                              }}>
                              <View style={styles.addButton}>
                                <FontAwesome
                                  name="plus-square"
                                  size={25}
                                  color="#2CDEE4"
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                        )}
                      />
                    </View>
                    <View>
                      <Text style={styles.text}>
                        Dans quelle salle pratiques-tu ?
                      </Text>
                      <View style={{ alignItems: 'center' }}>
                        <SelectDropdown
                          buttonStyle={styles.dropdownButton}
                          buttonTextStyle={styles.dropdownButtonText}
                          rowTextStyle={styles.dropdownRowText}
                          dropdownStyle={styles.dropdownBg}
                          rowStyle={styles.dropdownRow}
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
                              <AntDesign name="down" size={18} color="black" />
                            );
                          }}
                          dropdownIconPosition={'right'}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.name;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item.name;
                          }}
                        />
                      </View>
                    </View>
                    <View style={styles.validateButton}>
                      <Button
                        loading={false}
                        title="Valider les changements"
                        customTextStyle={styles.validateButtonText}
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
    }
  }
}
