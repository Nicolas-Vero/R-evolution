import React from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SelectDropdown from 'react-native-select-dropdown';
//import { auth } from '../../api/Register';
import { Formik } from 'formik';
import { CheckBox, Text } from 'react-native-elements';
import { Button } from '../components/Button';
import Header from '../components/Header';
import { Right } from 'native-base';
import { ScrollView } from 'react-native';
import { loadFonts } from '../configs/design/font';
import { get_coach_athlete } from '../api/Coach';
import { AntDesign } from '@expo/vector-icons';
import { isLoaded } from 'expo-font';
import { get_availabilities } from '../api/Availabilities';
import { LinearGradient } from 'expo-linear-gradient';
const { width } = Dimensions.get('window');
export default class CreateReminder extends React.Component {
  state = {
    type: 'Coaching',
    isLoaded: false,
    atlhetesActifs: [],
    atlhetesProspects: [],
    atlhetesInactifs: [],
    slots: [],
  };
  componentDidMount() {
    loadFonts;
    get_availabilities().then((res) => {
      //  this.setState({slots:res.data})
      console.log(res.data);
    });
    get_coach_athlete()
      .then((res) => {
        this.filterDAta(res.data.athletes);
      })
      .then(() => {
        this.setState({ isLoaded: true });
      });
  }

  filterDAta(data) {
    const actifs = [];
    const inactifs = [];
    const prospects = [];
    data.forEach((element) => {
      console.log(element.status);
      switch (element.status) {
        case 'ACTIVE':
          actifs.push(`${element.first_name} ${element.last_name}`);
          break;
        case 'INACTIVE':
          inactifs.push(`${element.first_name} ${element.last_name}`);
          break;
        case 'PROSPECT':
          prospects.push(`${element.first_name} ${element.last_name}`);
          break;

        default:
          break;
      }
    }, this.setState({ atlhetesActifs: actifs, atlhetesInactifs: inactifs, atlhetesProspects: prospects }));
  }

  async onLoginPress(values) {
    console.log(values);
  }

  getErrorMessage() {
    if (this.state.errorMessage !== '')
      return (
        <ResponsiveText style={{ alignSelf: 'center', fontSize: '3.5%' }}>
          {this.state.errorMessage}
        </ResponsiveText>
      );
    return (
      <ResponsiveText
        style={{
          alignSelf: 'center',
          fontSize: '3.5%',
          opacity: 0,
        }}>
        Hidden Text
      </ResponsiveText>
    );
  }

  render() {
    const color = ['blue', 'red', 'green', 'yellow'];
    if (!isLoaded) {
      return (
        <View style={[styles.Activitycontainer, styles.horizontal]}>
          <ActivityIndicator size="large" color="#696969" />
        </View>
      );
    } else {
      return (
        <LinearGradient
          colors={['black', '#2D333C']}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 1,
            y: 1,
          }}
          style={styles.background}>
          <View style={{ alignItems: 'center' }}>
            <SafeAreaView style={styles.safeArea} />

            <Header title="RAPPELS" />

            <View style={{ paddingLeft: 15, paddingRight: 15 }}>
              <Formik
                initialValues={{
                  date: 'Coaching',
                  heure: '',
                  title: '',
                  content: '',
                  status: '',
                  color: 'blue',
                }}
                onSubmit={(values, { onLoginPress }) => onLoginPress(values)}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                }) => (
                    <SafeAreaView>
                  <View style={{ marginTop: 70 }}>
                      <View >
                    <View
                      style={{
                        flexDirection: 'row',
                        width: wp(92),
                        marginBottom: 20,
                      }}>
                      <View style={{ flex: 2 }}>
                          <Text style={{ color:'white',fontFamily:'RobotoBold',fontSize:15}}>Date</Text>
                        <TextInput
                          placeholder="date"
                          style={styles.form1}
                          onChangeText={handleChange('first_name')}
                          onBlur={handleBlur('first_name')}
                          value={values.first_name}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                      <Text style={{ color:'white',fontFamily:'RobotoBold',fontSize:15}}>heure</Text>
                        <TextInput
                          placeholder="Heure"
                          style={styles.form1}
                          onChangeText={handleChange('first_name')}
                          onBlur={handleBlur('first_name')}
                          value={values.first_name}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                      <Text style={{ color:'white',fontFamily:'RobotoBold',fontSize:15}}>couleur</Text>
                      <SelectDropdown
                        buttonStyle={{ backgroundColor:'transparent', borderRadius: 5, width:wp(23)}}
                        data={color}
                        defaultButtonText={'choisir un crénaux'}
                        onSelect={(selectedItem, index) => {
                          console.log(selectedItem, index);
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
                        rowTextForSelection={(item, index) => {
                          // text represented for each item in dropdown
                          // if data array is an array of objects then return item.property to represent item in dropdown
                          return item;
                        }}
                      />
                      </View>
                    </View>
                    <View>
                      <View style={{ marginBottom: 20 }}>
                        <TextInput
                          placeholder="Objet du rappel"
                          style={styles.form2}
                          onChangeText={handleChange('first_name')}
                          onBlur={handleBlur('first_name')}
                          value={values.first_name}
                        />
                      </View>
                      <View style={{ marginBottom: 20 }}>
                        <TextInput
                          placeholder="Description"
                          style={{
                            backgroundColor: '#FFFFFF',
                            paddingTop: 10,
                            borderRadius: 5,
                            paddingBottom: 170,
                            paddingLeft: 15,
                            paddingRight: 15,
                            width: wp(92),
                            height: 200,
                          }}
                          onChangeText={handleChange('first_name')}
                          onBlur={handleBlur('first_name')}
                          value={values.first_name}
                        />
                      </View>
                    </View>
                    </View>
                   <View style={{marginTop:150}}>
                    <Button
                      style={{
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 15,
                        paddingRight: 15,
                      }}
                      customTextStyle={{
                        color: 'black',
                        fontFamily: 'RobotoBold',
                        fontWeight: 'bold',
                        fontSize: 17,
                      }}
                      loading={false}
                      title="Ajouter le Rappel"
                      onPress={console.log(values)}
                    />
                    </View>
                  </View>
                  </SafeAreaView>
                )}
              </Formik>
            </View>
          </View>
        </LinearGradient>
      );
    }
  }
}

const styles = StyleSheet.create({
  image: {
    width: width,
  },
  background: {
    flex: 1,
  },
  backgroundContainer: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  form1: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    borderRadius: 5,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 5,
    height: 50,
  },
  form2: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    borderRadius: 5,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    width: wp(92),
    height: 50,
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
  text: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  euro: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#FFFFFF',
    marginLeft: 5,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 112,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
    marginBottom: 35,
  },
  loginButton: {
    width: 158.4,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 22,
    borderColor: '#2CDEE4',
    backgroundColor: 'transparent',
  },
  registerButton: {
    width: 158.4,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginLeft: 22,
  },
  container: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    marginTop: 45,
    marginBottom: 50,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
});
