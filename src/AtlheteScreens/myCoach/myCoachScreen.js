import React from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';

import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import { loadFonts } from '../../configs/design/font';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { get_coach_by_id } from '../../api/Coach';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE } from '../../configs/Constants';
import Header from '../../components/Header';
import styles from'./myCoachStyle';

export default class myCoachScreen extends React.Component {
  state = {
    coach: {},
    loading: false,
    coach_id: '',
  };
  async componentDidMount() {
    loadFonts;
    let user = await AsyncStorage.getItem(STORAGE.USER);
    user = JSON.parse(user);
    if (user.coach) {
      this.setState({ coach_id: user.coach?.coach_id });

      get_coach_by_id(user.coach?.coach_id)
        .then((res) => {
          this.setState({ coach: res.data });
        })
        .then(() => {
          this.setState({ loading: true });
        });
    } else {
      this.setState({ loading: true });
    }
  }
  render() {
    const dayPreference = [];
    return this.state.loading == false ? (
      <ActivityIndicator size="large" color="#2CDEE4" />
    ) : this.state.coach ? (
      <View style={{ backgroundColor: 'black', flex: 1 }}>
        <SafeAreaView>
        <Header title="TON COACH" />
        </SafeAreaView>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{ fontFamily: 'RobotoBold', fontSize: 20, color: '#FFFF' }}>
            pas de coach associé
          </Text>
        </View>
      </View>
    ) : (
      <View
        style={{
          backgroundColor: 'black',
          flex: 1,
          paddingTop: heightPercentageToDP(4),
        }}>
        <SafeAreaView>
          <Header title="TON COACH" />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
            }}>
            <View
              style={{
                width: widthPercentageToDP(100),
                marginTop: 15,
                alignItems: 'center',
              }}>
              <Avatar
                size={100}
                rounded
                source={{
                  uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
                }}
              />
              <Text
                style={{
                  fontFamily: 'MontserratSemiBold',
                  fontSize: 20,
                  marginTop: 20,
                  color: 'white',
                }}>
                {this.state.coach?.first_name} {this.state.coach?.last_name}
              </Text>
              <Text
                style={{
                  fontFamily: 'MontserratSemiBold',
                  fontSize: 13,
                  marginTop: 10,
                  color: '#2CDEE4',
                }}></Text>
            </View>
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
                    {this.state.coach?.phone}
                  </Text>
                  <Image
                    style={styles.Logo}
                    source={require('../../../assets/images/phone.png')}
                  />
                </View>
                <View style={styles.container}>
                  <Text style={styles.text}>Adresse e-mail :</Text>
                  <Text style={styles.textBlue}>{this.state.coach?.email}</Text>
                </View>
                <View
                  style={{
                    margin: 5,
                    backgroundColor: '#1E2026',
                    borderRadius: 5,
                    maxHeight: 150,
                    paddingBottom: 10,
                  }}>
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.text}>Diplôme(s) :</Text>
                  </View>
                  <FlatList
                    data={this.state.coach?.diplomas}
                    extraData={this.state}
                    keyExtractor={(item) => item?.id.toString()}
                    renderItem={({ item }) => (
                      <View>
                        <Text style={styles.textBlue}>{item.diploma_name}</Text>
                      </View>
                    )}
                  />
                </View>
                <View style={styles.container}>
                  <Text style={styles.text}>Année(s) d'expérience : </Text>
                  <Text style={styles.textBlue}>
                    {this.state.coach?.experience_years} ans
                  </Text>
                </View>
                <View
                  style={{
                    margin: 5,
                    backgroundColor: '#1E2026',
                    borderRadius: 5,
                  }}>
                  <Text style={styles.text}> Spécialitée(s) :</Text>
                  <FlatList
                    horizontal={true}
                    data={this.state.coach?.specialties}
                    extraData={this.state}
                    // onRefresh={onRefresh}
                    // refreshing={this.state.refresh}
                    keyExtractor={(item) => item?.id.toString()}
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
                            {item.specialty_name}
                          </Text>
                        </View>
                      </View>
                    )}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
