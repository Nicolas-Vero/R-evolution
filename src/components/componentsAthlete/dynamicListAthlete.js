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
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

import { Button } from '../../components/Button';
import Header from '../../components/Header';
const { width } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';
import * as Yup from 'yup';
import { Formik, FieldArray, Field } from 'formik';
import { FontAwesome } from '@expo/vector-icons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
//import { ScrollView } from 'react-native-gesture-handler';

import { get_specialities } from '../../api/ReferenceData';
import { ScrollView } from 'react-native-gesture-handler';

export default class dynamicListAthlete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'initial',
      // passItem: this.props.navigation.state.params.item,
      specData: [],
      isLoaded: false,
      term: '',
    };
  }
  componentDidMount() {
    get_specialities().then((res) => {
      this.setState({ specData: res.data });
      this.setState({ isLoaded: true });
    });
  }
  render() {
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
            <View style={{alignItems:'center'}}>
            <Image
              source={require('../../../assets/images/GroupA_3.png')}
              style={{ width: widthPercentageToDP(80) }}
            />
            </View>
            <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
              <Formik
                initialValues={{
                  goals: [],
                }}
                onSubmit={(values) => {
                  const item = { ...passItem, ...values };
                  navigation.navigate('health', { item: item });
                  console.log(item);
                }}
                validationSchema={Yup.object().shape({
                  goals: Yup.array().min(1).required('Requis'),
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
                      name="goals"
                      id="goals"
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
                        const numColumns = 3;
                        return (
                          <View
                            style={{
                              alignItems: 'center',
                              height: heightPercentageToDP(75),
                            }}><View
                            style={{
                              alignItems: 'center',
                              marginTop: 75,
                              marginBottom: 100,
                            }}>
                            
                  <Text style={styles.title}>QUEL EST TON OBJECTIF ?</Text>
                </View>
                            <Text style={styles.text}>
                              Sélectionne ton ou tes objectifs(s)
                            </Text>

                            <View >
                              <FieldArray
                                name="goals"
                                render={(arrayhelper) => (
                                  <View>
                                    <View
                                      style={{
                                        borderWidth: errors.goals ? 2 : 0,
                                        borderColor: errors.goals
                                          ? 'red'
                                          : 'transparent',
                                        height: 150,
                                        width: widthPercentageToDP(95),
                                        padding: 5,
                                        justifyContent: 'center',
                                      }}>
                                      <FlatList
                                        data={this.state.specData}
                                        extraData={this.state}
                                        renderItem={({ item }) => {
                                          console.log('item', item),
                                            item.selected
                                              ? console.log(item.selected)
                                              : console.log('noclick');
                                          const backgroundColor =
                                            item.selected == 1
                                              ? '#2CDEE4'
                                              : 'transparent';
                                          const borderColor =
                                            item.selected == 1
                                              ? 'transparent'
                                              : 'white';
                                          const borderWidth =
                                            item.selected == 1 ? 1 : 1;
                                          const color =
                                            item.selected == 1
                                              ? 'black'
                                              : 'white';

                                          return (
                                            <TouchableOpacity
                                              onPress={() => {
                                                item.selected != 1
                                                  ? (item.selected = 1)
                                                  : (item.selected = 0);
                                                arrayhelper.form.values.goals.includes(
                                                  item.value,
                                                )
                                                  ? arrayhelper.remove(
                                                      item.value,
                                                    )
                                                  : arrayhelper.push(
                                                      item.value,
                                                    );
                                              }}>
                                              <View
                                                style={{
                                                  backgroundColor:
                                                    backgroundColor,
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
                                                  {item.value}
                                                </Text>
                                              </View>
                                            </TouchableOpacity>
                                          );
                                        }}
                                        keyExtractor={(item) => item}
                                        // extraData={selectedId}
                                        numColumns={numColumns}
                                      />
                                    </View>
                                    {errors.goals ? (
                                      <Text style={{ color: 'red' }}>
                                        Ajoute un objectif
                                      </Text>
                                    ) : null}
                                    <TextInput
                                      name="goals"
                                      onChangeText={(text) => {
                                        this.setState({ term: text });
                                      }}
                                      style={{
                                        backgroundColor: '#FFFFFF',
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        paddingLeft: 15,
                                        paddingRight: 15,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        width: widthPercentageToDP(94),
                                      }}
                                    />

                                    <View
                                      style={{
                                        alignItems: 'flex-end',
                                        marginTop: 15,
                                        marginBottom: 5,
                                        marginRight: 5,
                                        color: '#2CDEE4',
                                      }}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          this.state.specData.pop();
                                          this.setState({ term: '' });
                                        }}>
                                        <Text style={{ color: '#2CDEE4' }}>
                                          Supprimer
                                        </Text>
                                      </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity
                                      onPress={() => {
                                        this.state.specData.push({
                                          value: this.state.term,
                                        }),
                                          this.setState({ term: '' });
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
});
