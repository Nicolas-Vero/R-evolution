import React from 'react';
import moment from 'moment';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity} from 'react-native';
import { Avatar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import { get_athlete_active_courses } from '../api/Athlete';
import { get_paiement_for_coach } from '../api/Paiement';
import HeaderLight from '../components/HeaderLight';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import { loadFonts } from '../configs/design/font';
import { Entypo } from '@expo/vector-icons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
const { width } = Dimensions.get('window');

export default class MyAthleteDetails extends React.Component {
  state = {
    ActiveCourses: [],
    Paiement: [],
  };
  componentDidMount() {
    loadFonts;
    get_athlete_active_courses().then((res) => {
      this.setState({ ActiveCourses: res.data });
    });
    get_paiement_for_coach().then((res) => {
      this.setState({ Paiement: res.data });
    });
  }
  render() {
    const Athlete = this.props.navigation.state.params.item;
    const dayPreference = [];
    if (Athlete.is_monday_preferred == true) {
      dayPreference.push({ day: 'Lundi' });
    }
    if (Athlete.is_tuesday_preferred == true) {
      dayPreference.push({ day: 'Mardi' });
    }
    if (Athlete.is_wednesday_preferred == true) {
      dayPreference.push({ day: 'Mercreedi' });
    }
    if (Athlete.is_thursday_preferred == true) {
      dayPreference.push({ day: 'Jeudi' });
    }
    if (Athlete.is_friday_preferred == true) {
      dayPreference.push({ day: 'Vendredi' });
    }
    if (Athlete.is_saturday_preferred == true) {
      dayPreference.push({ day: 'Samedi' });
    }
    if (Athlete.is_sunday_preferred == true) {
      dayPreference.push({ day: 'Dimanche' });
    }
    console.log('toto', Athlete.goals);
    return (
      <View style={{ backgroundColor: 'black', flex: 1 }}>
        <SafeAreaView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
            }}>
            <HeaderLight />
            <View
              style={{
                marginLeft: 60,
                marginTop: 15,
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Avatar
                size={100}
                rounded
                source={require('../../assets/images/avatar.png')}
              />

              <Text
                style={{
                  fontFamily: 'MontserratSemiBold',
                  fontSize: 20,
                  marginTop: 20,
                  color: 'white',
                }}>
               {Athlete.first_name }   {Athlete.last_name }
              </Text>
            </View>
            <Image
              style={styles.tinyLogo}
              source={require('../../assets/images/Actif.png')}
            />
          </View>
          <View style={{ alignItems: 'center' }}>
            <ScrollView style={{ height: heightPercentageToDP(65) }}>
              <View>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: '#2CDEE4',
                    marginTop: 15,
                    margin: 5,
                    height: 50,
                    width: widthPercentageToDP(94),
                    borderRadius: 5,
                    justifyContent: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      fontFamily: 'Roboto',
                      marginLeft: 15,
                    }}>
                    Son numéro :{' '}
                  </Text>
                  <Text
                    style={{
                      justifyContent: 'center',
                      fontFamily: 'RobotoBold',
                      fontSize: 18,
                      marginRight: 50,
                    }}>
                    {Athlete.phone}
                  </Text>
                  <Image
                    style={styles.Logo}
                    source={require('../../assets/images/Téléphone.png')}
                  />
                </View>
                <View style={styles.container}>
                  <Text style={styles.text}>Adresse e-mail :</Text>
                  <Text style={styles.textBlue2}>{Athlete.email}</Text>
                </View>
                <View style={styles.container}>
                  <Text style={styles.text}>Offre en cours :</Text>
                  <Text style={styles.textBlue2}>
                    Pack transformation - 8 séances restantes sur 10
                  </Text>
                </View>
                <View
                  style={{
                    alignContent: 'center',
                    backgroundColor: '#1E2026',
                    margin: 5,
                    borderRadius: 5,
                    height: 200,
                  }}>
                  <Text style={styles.text}>Paiement(s) effectué(s) :</Text>

                  <FlatList
                    data={this.state.Paiement}
                    extraData={this.state}
                    // onRefresh={onRefresh}
                    // refreshing={this.state.refresh}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          alignContent: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#2CDEE4',
                          height: 30,
                          marginHorizontal: 10,
                          padding: 5,
                          marginVertical: 5,
                          borderRadius: 5,
                        }}>
                        <View
                          style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginHorizontal: 5,
                          }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                            }}>
                            {moment(item.created_at).format('L')}
                          </Text>
                          <Text
                            style={{
                              fontWeight: 'bold',
                            }}>
                            {item.title}
                          </Text>
                          <Text
                            style={{
                              fontWeight: 'bold',
                            }}>
                            {item.mode} - {item.amount}
                          </Text>
                        </View>
                      </View>
                    )}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      margin: 10,
                    }}>
                    <Entypo name="squared-plus" size={27} color="#2CDEE4" />
                    <TouchableOpacity
                      onPress={() => {
                        navigate('AddPaiement');
                      }}>
                      <Text style={styles.text}>Ajouter un paiement : </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    margin: 5,
                    backgroundColor: '#1E2026',
                    borderRadius: 5,
                  }}>
                  <Text style={styles.text}>Ses objectifs :</Text>
                  <FlatList
                    horizontal={true}
                    data={Athlete.goals}
                    extraData={this.state}
                    // onRefresh={onRefresh}
                    // refreshing={this.state.refresh}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          alignContent: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#2CDEE4',
                          height: 30,
                          margin: 10,
                          padding: 5,
                          borderRadius: 20,
                        }}>
                        <View
                          style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginHorizontal: 5,
                          }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                            }}>
                            {item.name}
                          </Text>
                        </View>
                      </View>
                    )}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    height: 50,
                    marginVertical:5,
                  }}>
                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      height: 50,

                      marginHorizontal: 5,
                      borderRadius: 5,
                      backgroundColor: '#1E2026',
                      backgroundColor: '#1E2026',
                    }}>
                    <View
                      style={{                      
                        borderRadius: 5,
                        flexDirection: 'row',
                      }}>
                      <Text style={styles.text2}>Taille :</Text>
                      <Text style={styles.textBlue2}>
                        {`${Athlete.size / 100}`.substring(0, 1)}m
                        {`${Athlete.size / 100}`.substring(2)}{' '}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      height: 50,
                     
                      marginHorizontal: 5,
                      borderRadius: 5,
                      backgroundColor: '#1E2026',
                      backgroundColor: '#1E2026',
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.text2}>Poids:</Text>
                      <Text style={styles.textBlue2}>{Athlete.weight}Kg</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    margin: 5,
                    borderRadius: 5,
                    backgroundColor: '#1E2026',
                    height: 50,
                    justifyContent: 'center',
                  }}>
                  <View style={{ flexDirection: 'row'}}>
                    <Text style={styles.text}>Age:</Text>
                    <Text style={styles.textBlue}>{Athlete.age}ans</Text>
                  </View>
                </View>
                <View
                  style={{
                    margin: 5,
                    borderRadius: 5,
                    backgroundColor: '#1E2026',
                    height: 130,
                    justifyContent: 'center',
                  }}>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.text}>Créneaux de sport souhaités :</Text>

                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                      <Text style={styles.textTiny}> Entre</Text>
                      <Text style={styles.textBlue2Tiny}>
                        {Athlete.preferred_time_start}H
                      </Text>
                      <Text style={styles.textTiny}>et</Text>
                      <Text style={styles.textBlue2Tiny}>
                        {Athlete.preferred_time_end}H
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginTop: 5 }}>
                    <FlatList
                      horizontal={true}
                      data={dayPreference}
                      extraData={this.state}
                      // onRefresh={onRefresh}
                      // refreshing={this.state.refresh}
                      keyExtractor={(item) => item.day}
                      renderItem={({ item }) => (
                        <View
                          style={{
                            alignContent: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#2CDEE4',
                            height: 30,
                            margin: 10,
                            borderRadius: 20,
                          }}>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexDirection: 'row',
                              padding: 5,
                              marginHorizontal: 5,
                            }}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                              }}>
                              {item.day}
                            </Text>
                          </View>
                        </View>
                      )}
                    />
                  </View>
                </View>
                <View style={styles.container}>
                  <Text style={styles.text}>Experience(s) sportive(s) :</Text>
                  <Text style={styles.textBlue2}>
                    plus de {Athlete.experience_years} ans
                  </Text>
                </View>
                <View style={styles.container}>
                  <Text style={styles.text}>Santé :</Text>
                  {Athlete.health_issues ? (
                    <Text style={styles.textBlue2}>{Athlete.health_issues}</Text>
                  ) : (
                    <Text style={styles.textBlue2}>Pas d'information</Text>
                  )}
                </View>
                <View style={styles.container}>
                  <Text style={styles.text}>Info complémentaires : </Text>
                  {Athlete.health_problem_description == null ? (
                    <Text style={styles.textBlue2}>Pas d'information</Text>
                  ) : (
                    <Text style={styles.textBlue2}>{Athlete.health_problem_description}</Text>
                  )}
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tinyLogo: {
    resizeMode: 'contain',
    width: 80,
    height: 50,
    marginRight: 12,
    marginTop: 10,
  },
  Logo: {
    resizeMode: 'contain',
    width: 25,
    height: 30,
    marginRight: 25,
  },
  container: {
    backgroundColor: '#1E2026',
    flexDirection: 'column',
    margin: 5,
    borderRadius: 5,
    alignContent: 'center',
    justifyContent: 'center',
    height: 70,
   },
  text: {
    fontFamily: 'RobotoBold',
    fontSize: 15,
    color: 'black',
    marginLeft: 15,
    marginVertical:10,
    color: 'white',
  },
  textTiny: {
    fontFamily: 'RobotoBold',
    fontSize: 13,
    color: 'black',
    marginLeft: 15,
    color: 'white',
  },
  text2: {
    fontFamily: 'RobotoBold',
    fontSize: 15,
    color: 'black',
    marginLeft: 15,
    color: 'white',
  },
  textBlue: {
    fontFamily: 'RobotoBold',
    fontSize: 15,
    marginLeft: 15,
    marginTop: 9,
    color: '#2CDEE4',
  },
  textBlue2: {
    fontSize: 15,
    marginLeft: 15,
    fontFamily: 'RobotoBold',
    color: '#2CDEE4',
  },
  textBlue2Tiny: {
    fontSize: 13,
    marginLeft: 10,
    fontFamily: 'RobotoBold',
    color: '#2CDEE4',
  },
});
