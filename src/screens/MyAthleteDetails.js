import React from 'react';
import moment from 'moment';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import { get_athlete_active_courses } from '../api/Athlete';
import { get_paiement_for_coach } from '../api/Paiement';
import HeaderLight from '../components/HeaderLight';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
const { width } = Dimensions.get('window');

export default class MyAthleteDetails extends React.Component {
  state = {
    ActiveCourses: [],
    Paiement: [],
  
  };
  componentDidMount() {
    get_athlete_active_courses().then((res) => {
      this.setState({ ActiveCourses: res.data });
    });
    get_paiement_for_coach().then((res) => {
      this.setState({ Paiement: res.data });
    });
  }
  render() {
    const Athlete = this.props.navigation.state.params.item;
    const dayPreference = []
    if (Athlete.is_monday_preferred == true) {
        dayPreference.push({day:'Lundi'})
    }
    if (Athlete.is_tuesday_preferred == true) {
        dayPreference.push({day:'Mardi'})
    }
    if (Athlete.is_wednesday_preferred == true) {
        dayPreference.push({day:'Mercreedi'})  
    }
    if (Athlete.is_thursday_preferred == true) {
        dayPreference.push({day:'Jeudi'})
    }
    if (Athlete.is_friday_preferred == true) {
        dayPreference.push({day:'Vendredi'})
    }
    if (Athlete.is_saturday_preferred == true) {
        dayPreference.push({day:'Samedi'})
    }
    if (Athlete.is_sunday_preferred == true) {
        dayPreference.push({day:'Dimanche'})
    }
    console.log('toto', Athlete.goals);
    return (
      <View style={{ backgroundColor: 'black', flex: 1 }}>
        <SafeAreaView>
          
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent:'space-between'
              }}>
              <HeaderLight />
              <View style={{ flexDirection: 'column' }}>
                <Avatar
                  size="xlarge"
                  rounded
                  source={{
                    uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
                  }}
                />
                
                <Text style={styles.text}>helllo uhuhuhu</Text>
              </View>
              <Image 
                 style={styles.tinyLogo}
                 source={{
                   uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/Actif.png',
                 }}
                />
            </View>
            <ScrollView style={{height:550}}>
            <View style={{ backgroundColor: '#2CDEE4', margin: 5,height:50,borderRadius:5,justifyContent:'center' }}>
              <Text style={styles.text}>Son numéro: {Athlete.phone}</Text>
            </View>
            <View
              style={styles.container}>
              <Text style={styles.text}>Adresse e-mail:</Text>
              <Text style={styles.textBlue}>{Athlete.email}</Text>
            </View>
            <View
              style={styles.container}>
              <Text style={styles.text}>offre en cours</Text>
              <Text></Text>
            </View>
            <View style={{ backgroundColor: '#1E2026', margin: 5 , height:150 }}>
              <Text style={styles.text}>paiement</Text>
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
                      marginHorizontal:10,
                      padding:5,
                      marginVertical:5,
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
                        {item.offer.title}
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
              <Text>ajouter un paiement </Text>
            </View>
            <View
              style={{
                margin: 5,
                backgroundColor: '#1E2026',
                borderRadius: 5,
              }}>
              <Text style={styles.text}> Ses objectifs:</Text>
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
                      padding:5,
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
                height:50
              }}>
              <View style={{  margin: 5, borderRadius: 5, flex: 2,   backgroundColor: '#1E2026', flexDirection:'row' }}>
                <Text style={styles.text}>Taille:</Text><Text style={styles.text}>{Athlete.size / 100}</Text>
              </View>
              <View style={{  margin: 5, borderRadius: 5, flex: 2 ,   backgroundColor: '#1E2026',}}>
                <Text style={styles.text}>poids:{Athlete.weight} kg </Text>
              </View>
            </View>
            <View
              style={{
                margin: 5,
                borderRadius: 5,
                backgroundColor: '#1E2026',
                height:50
              }}>
              <Text style={styles.text}>Age:{Athlete.age} ans</Text>
            </View>
            <View
              style={{
                margin: 5,
                borderRadius: 5,
                backgroundColor: '#1E2026',
                height:90,
              }}>
              <Text style={styles.text}>crénaux de sport souhaités:</Text>
              <Text>
                Entre {Athlete.preferred_time_start} et{' '}
                {Athlete.preferred_time_end}
              </Text>
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
                        padding:5,
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
            <View
              style={styles.container}>
              <Text style={styles.text}>experience(s) sportive(s):</Text>
              <Text>plus de {Athlete.experience_years} ans</Text>
            </View>
            <View
              style={styles.container}>
              <Text style={styles.text}>santé:</Text>
              {Athlete.health_issues == true ? (
                <Text>oui</Text>
              ) : (
                <Text>Non</Text>
              )}
            </View>
            <View
               style={styles.container}>
              <Text style={styles.text}>info complémentaires: </Text>
              {Athlete.health_problem_description == null ? (
                <Text>Pas d'information</Text>
              ) : (
                <Text>{Athlete.health_problem_description}</Text>
              )}
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
        width: 40,
        height: 20,
      },
      container:{
        backgroundColor: '#1E2026',
        flexDirection: 'column',
        margin: 5,
        height:70,

      },
      text:{
        fontSize:15,
        color:'white'
      },
      textBlue:{
        fontSize:20,
        color:'#2CDEE4'
      }

});
