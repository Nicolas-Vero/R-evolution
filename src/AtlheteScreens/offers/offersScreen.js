import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
const { width } = Dimensions.get('window');
import SwitchSelector from 'react-native-switch-selector';
import { FlatList } from 'react-native-gesture-handler';
import { get_coach_offer_by_id } from '../../api/Offers';
import Header from '../../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { ModifyButton } from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE } from '../../configs/Constants';
import { get_athlete_active_courses } from '../../api/Athlete';
import { loadFonts } from '../../configs/design/font';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { Avatar } from 'react-native-elements';
const options = [
  { label: 'EN COURS', value: 'EN COURS' },
  { label: 'CATALOGUE', value: 'CATALOGUE' },
];

export default class offersScreen extends React.Component {
  state = {
    offers: [],
    screen: 'EN COURS',
    ActiveCourses: [],
    loading: false,
  };
  //to do actualiser la liste apres chaque création

  async componentDidMount() {
    loadFonts();
    var user = await AsyncStorage.getItem(STORAGE.USER);
    user = JSON.parse(user);
    get_athlete_active_courses()
      .then((res) => {
        this.setState({ ActiveCourses: res.data });
      })
      .then(() => {
        this.setState({ loading: true });
      });
    get_coach_offer_by_id(user.coach.coach_id).then((res) => {
      this.setState({ offers: res.data.offers });
    });
  }

  render() {
    if (!this.state.loading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <SafeAreaView>
            <Header title="LES OFFRES" />
            <View
              style={{
                alignSelf: 'center',
                marginBottom: 15,
              }}>
              <SwitchSelector
                options={options}
                initial={0}
                onPress={(value) => this.setState({ screen: value })}
                backgroundColor="#1E2026"
                buttonColor="#2CDEE4"
                selectedColor="#1E2026"
                textColor="white"
                borderRadius={10}
                height={60}
                style={{ width: widthPercentageToDP(95) }}
                hasPadding
                fontSize={15}
                selectedTextStyle={{ fontFamily: 'MontserratBoldItalic' }}
                textStyle={{ fontFamily: 'MontserratBoldItalic' }}
                valuePadding={3}
                borderColor="#1E2026"
              />
            </View>

            {this.state.screen == 'EN COURS' ? (
              this.state.ActiveCourses.offer == null ? (
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: heightPercentageToDP(25),
                  }}>
                  <Text
                    style={{
                      fontFamily: 'RobotoBold',
                      fontSize: 20,
                      color: '#FFFF',
                    }}>
                    Pas de cours actif
                  </Text>
                </View>
              ) : (
                <LinearGradient
                  colors={['#101010', '#2D333C']}
                  start={{
                    x: 1,
                    y: 1,
                  }}
                  end={{
                    x: 0,
                    y: 0,
                  }}
                  style={{
                    flexDirection: 'column',
                    backgroundColor: 'grey',
                    marginVertical: 10,
                    borderRadius: 10,
                    padding: 20,
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar
                      size="medium"
                      rounded
                      source={{
                        uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/photo_florian_coach.png',
                      }}
                    />
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        marginLeft: 10,
                        fontFamily: 'RobotoBold',
                        color: '#FFFFFF',
                        lineHeight: 24,
                      }}>
                      {this.state.ActiveCourses.coach.first_name}{' '}
                      {this.state.ActiveCourses.coach.last_name}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        marginTop: 30,
                        fontFamily: 'MontserratBold',
                        fontSize: 20,
                        color: '#FFFFFF',
                        lineHeight: 24,
                      }}>
                      {this.state.ActiveCourses.offer.title}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{ marginTop: 10, color: '#FFFFFF', fontSize: 10 }}>
                      {this.state.ActiveCourses.offer.content}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: widthPercentageToDP(90),
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{ marginTop: 10, color: '#2CDEE4' }}>
                      {this.state.ActiveCourses.total_sessions} coachings
                    </Text>
                    <Text
                      style={{
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#2CDEE4',
                      }}>
                      {this.state.ActiveCourses.offer.price}€
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 20,
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          backgroundColor: '#2CDEE4',
                          alignItems: 'center',
                          padding: 10,
                          paddingHorizontal: 30,
                          borderRadius: 10,
                          width: widthPercentageToDP(90),
                        }}>
                        <Text style={{ fontFamily: 'Roboto' }}>
                          Nombre de séances restantes:{' '}
                          {this.state.ActiveCourses.offer.nb_credits}
                        </Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              )
            ) : (
              
                this.state.ActiveCourses.offer == null ? (
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: heightPercentageToDP(25),
                    }}>
                    <Text
                      style={{
                        fontFamily: 'RobotoBold',
                        fontSize: 20,
                        color: '#FFFF',
                      }}>
                     pas de coach associé
                    </Text>
                  </View>
                ) :(
              <FlatList
                style={{
                  height: heightPercentageToDP(70),
                }}
                data={this.state.offers}
                extraData={this.state}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <LinearGradient
                    colors={['#101010', '#2D333C']}
                    start={{
                      x: 1,
                      y: 1,
                    }}
                    end={{
                      x: 0,
                      y: 0,
                    }}
                    style={{
                      flexDirection: 'column',
                      backgroundColor: 'grey',
                      marginVertical: 10,
                      borderRadius: 10,
                      paddingLeft: 20,
                      height: 200,
                    }}>
                    <View>
                      <Text
                        style={{
                          marginTop: 30,
                          fontWeight: 'bold',
                          fontSize: 20,
                          color: '#FFFFFF',
                          lineHeight: 24,
                        }}>
                        {item.title}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          marginTop: 10,
                          color: '#FFFFFF',
                          fontSize: 10,
                        }}>
                        {item.title}
                        {item.content}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ marginTop: 10, color: '#2CDEE4' }}>
                        {item.nb_credits} coachings
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 20,
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <ModifyButton
                          title="Choisir cette offre"
                          onPress={() => {
                            navigate('offerPaimentModeScreen', { item });
                          }}></ModifyButton>
                      </View>
                      <Text
                        style={{
                          fontStyle: 'italic',
                          fontWeight: 'bold',
                          fontSize: 20,
                          color: '#2CDEE4',
                          marginRight: 15,
                        }}>
                        {item.price}€
                      </Text>
                    </View>
                  </LinearGradient>
                )}
              />)
              )}
          </SafeAreaView>
        </View>
      );
    }
  }
}

