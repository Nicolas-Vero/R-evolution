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
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SelectDropdown from 'react-native-select-dropdown';
import { Formik } from 'formik';
import { Text } from 'react-native-elements';
import { Button } from '../components/Button';
import Header from '../components/Header';
import { loadFonts } from '../configs/design/font';
import { get_coach_athlete } from '../api/Coach';
import { AntDesign } from '@expo/vector-icons';
import { isLoaded } from 'expo-font';
import { get_availabilities } from '../api/Availabilities';
import { LinearGradient } from 'expo-linear-gradient';
import { coach_reminder } from '../api/CoachReminder';
 const { width } = Dimensions.get('window');
 import * as Notifications from 'expo-notifications';
import moment from 'moment';
export default class CreateReminder extends React.Component {
  state = {
    
    isLoaded: false,
   
  };
  componentDidMount() {
    this.scheduleNotification()
    loadFonts;
  }

  scheduleNotification = async (value) => {
    const newDate = new Date(value.date).getTime() - ((60000*60)*5) + ((60000*60)*value.hour)
      // alert(moment(newDate).format("YYYY-MM-DD hh:mm:ss"))
    

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
      }),
  });

Notifications.scheduleNotificationAsync({
          content: {
            title: value?.title,
            body: value?.content,
          },
          trigger: new Date(value.date).getTime() - ((60000*60)*5) + ((60000*60)*value.hour),
      });
    // console.log(notificationId);
  //  alert(JSON.stringify(notificationId))
  
  };

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
                  date: '',
                  hour: '',
                  title: '',
                  content: '',
                  status: 'ACTIVE',
                  color: '',
                }}
                onSubmit={(values) =>{try {
                  coach_reminder(values).then(navigate('Activitie'))
                } catch (error) {
                  console.log(error);
                }} }>
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
                          placeholder="2021-09-29"
                          style={styles.form1}
                          onChangeText={handleChange('date')}
                          onBlur={handleBlur('date')}
                          value={values.date}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                      <Text style={{ color:'white',fontFamily:'RobotoBold',fontSize:15}}>heure</Text>
                        <TextInput
                          placeholder="Heure"
                          style={styles.form1}
                          onChangeText={handleChange('hour')}
                          onBlur={handleBlur('hour')}
                          value={values.hour}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                      <Text style={{ color:'white',fontFamily:'RobotoBold',fontSize:15}}>couleur</Text>
                      <SelectDropdown
                        buttonStyle={{ backgroundColor:'transparent', borderRadius: 5, width:wp(23)}}
                        data={color}
                        defaultButtonText={'choisir un crénaux'}
                        onSelect={(selectedItem, index) => {
                         values.color = selectedItem
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
                        dropdownStyle={{
                          backgroundColor: '#282C3A',
                          borderRadius: 5,
                        }}
                        rowTextStyle={{color:'white',fontSize:15}}
                        dropdownStyle={{backgroundColor:'#282C3A',borderRadius:5 }}
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
                          onChangeText={handleChange('title')}
                          onBlur={handleBlur('title')}
                          value={values.title}
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
                          onChangeText={handleChange('content')}
                          onBlur={handleBlur('content')}
                          value={values.content}
                        />
                      </View>
                    </View>
                    </View>
                   <View style={{marginTop:10}}>
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
                      onPress={()=>{
                        try {
                        coach_reminder(values).then(()=> {
                          this.scheduleNotification(values);
                          navigate('Activitie');
                        })
                      } catch (error) {
                        console.log(error);
                      }}}
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
