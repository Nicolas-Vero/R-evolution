import React from 'react';
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
const { width } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import { get_personnal_request, get_public_request } from '../api/Request';
import { Avatar } from 'react-native-elements';
import moment from 'moment';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { loadFonts } from '../configs/design/font';
export default class AwaitingDemand extends React.Component {
  state = {
    personalRequest: [],
    publicRequest: [],
    loaded: false,
  };

  componentDidMount() {
    loadFonts().then(() => {
      this.setState({ loaded: true });
    });
    get_personnal_request().then((res) => {
      this.setState({ personalRequest: res.data.requests });
    });
    get_public_request()
      .then((res) => {
        this.setState({ publicRequest: res.data.requests });
      })
      .then(() => {
        this.setState({ loaded: true });
      });
  }

  render() {
    if (!this.state.loaded) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <SafeAreaView>
          <Header title="DEMANDES EN ATTENTE" />
          <View>
            <View style={{ alignItems: 'center' }}>
              <View
                style={{ width: widthPercentageToDP(94), marginVertical: 10 }}>
                <Text style={{ color: '#2CDEE4', fontFamily: 'RobotoBold' }}>
                  Ces demandes s'adressent à toi uniquement
                </Text>
              </View>
              <FlatList
                data={this.state.personalRequest}
                extraData={this.state}
                refreshing={this.state.refresh}
                keyExtractor={(item) => item?.id.toString()}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        console.log('item', item);
                      }}>
                      <View
                        style={{
                          backgroundColor: '#2CDEE4',
                          flexDirection: 'row',
                          height: heightPercentageToDP(7),
                          justifyContent: 'space-around',
                          alignContent: 'center',
                          margin: 5,
                          borderRadius: 5,
                          width: widthPercentageToDP(94),
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Avatar
                            size="medium"
                            rounded
                            source={{
                              uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
                            }}
                          />
                        </View>
                        <View
                          style={{
                            justifyContent: 'center',
                            flexDirection: 'column',
                            marginRight: widthPercentageToDP(30),
                          }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text
                              style={{
                                fontFamily: 'RobotoBold',
                                fontSize: 17,
                                marginBottom: 5,
                              }}>
                              {item?.athlete?.first_name}{' '}
                              {item?.athlete?.last_name}
                            </Text>
                          </View>
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              fontSize: 15,
                            }}>
                            {moment(item?.athlete?.created_at).format('LT')}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            <View style={{ alignItems: 'center' }}>
              <View
                style={{ width: widthPercentageToDP(94), marginVertical: 10 }}>
                <Text style={{ color: 'white', fontFamily: 'RobotoBold' }}>
                  Ces demandes s'adressent à tous les coachs
                </Text>
              </View>
              <FlatList
                data={this.state.publicRequest}
                extraData={this.state}
                keyExtractor={(item) => item?.id.toString()}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        console.log(item);
                      }}>
                      <View
                        style={{
                          backgroundColor: '#1E2026',
                          flexDirection: 'row',
                          height: heightPercentageToDP(7),
                          justifyContent: 'space-around',
                          alignContent: 'center',
                          margin: 5,
                          borderRadius: 5,
                          width: widthPercentageToDP(94),
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Avatar
                            size="medium"
                            rounded
                            source={{
                              uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
                            }}
                          />
                        </View>
                        <View
                          style={{
                            justifyContent: 'center',
                            flexDirection: 'column',
                            marginRight: widthPercentageToDP(30),
                          }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text
                              style={{
                                fontFamily: 'RobotoBold',
                                fontSize: 17,
                                marginBottom: 5,
                                color: 'white',
                              }}>
                              {item?.athlete.first_name}{' '}
                              {item?.athlete?.last_name}
                            </Text>
                          </View>
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              fontSize: 15,
                              color: '#979797',
                            }}>
                            {moment(item?.athlete?.created_at).format('LT')}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            <Text style={{ color: 'white', fontFamily: 'RobotoBold' ,marginVertical:10}}>
               demandes ont été traitées ce mois-ci
            </Text>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listonebyone: {},

  ccontainer: {},
  item: {
    backgroundColor: '#2CDEE4',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  items: {
    flex: 1,
    borderRadius: 25,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  calendar: {
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    marginTop: 20,
    height: 400,
  },
  background: {
    backgroundColor: 'black',
    flex: 1,
  },
  day: {
    borderWidth: 3,
    borderColor: 'blue',
    height: 80,
    width: 50,
    backgroundColor: '#2D333C',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
