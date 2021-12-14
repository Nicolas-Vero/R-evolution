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
import { get_gym } from '../api/ReferenceData';
import { Button } from './Button';
import Header from './Header';
const { width } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';
import * as Yup from 'yup';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { Formik, FieldArray, Field } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';

export default class trainingPlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'initial',
      // passItem: this.props.navigation.state.params.item,
      Gymdata: [],
      isLoaded: false,
      term: '',
    };
  }
  componentDidMount() {
    get_gym().then((res) => {
      this.setState({ Gymdata: res.data });
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
                  source={require('../../assets/images/Group_4.png')}
                  style={{ width: widthPercentageToDP(80) }}
                />
              </View>

              <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
                <Formik
                  initialValues={{
                   gym_id:'',
                  }}
                  onSubmit={(values) => {
                    const item = { ...passItem, ...values };
                    navigation.navigate('avatar',{ item:item})
                  }}
                  validationSchema={Yup.object().shape({
                    gym_id: Yup.string().required('Requis'),
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
                    <View >
                      <Field name="gym_id" id="gym_id" validate={validate}>
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
                            <View style={{height:heightPercentageToDP(75)}}>
          
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
                                  LIEU D'EXPERIENCE
                                </Text>
                              </View>
                              <View style={{ marginTop: 30 }}>
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    color: '#FFFF',
                                  }}>
                                  Dans quelle salle pratiques-tu?
                                </Text>
                              </View>
                              <View style={styles.container}>
                                <FieldArray
                                  name='gym_id'
                                  render={(arrayhelper) => (
                                    <SelectDropdown
                                      buttonStyle={{
                                        width: widthPercentageToDP(90),
                                        borderRadius: 5,
                                      }}
                                      data={this.state.Gymdata}
                                      defaultButtonText={
                                        'Recherche le nom de ta salle'
                                      }
                                      onSelect={(selectedItem, index) => {
                                     
                                        arrayhelper.form.values.gym_id =
                                          selectedItem.id;
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
