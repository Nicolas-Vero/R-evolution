import React from 'react';
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
const { width } = Dimensions.get('window');
import { FlatList } from 'react-native-gesture-handler';
import { get_coach_athlete } from '../api/Coach';
import { Avatar } from 'react-native-elements';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import moment from 'moment';
import HeaderSimple from '../components/HeaderSimple';

const options = [
  { label: 'ACTIFS', value: 'ACTIFS' },
  { label: 'INACTIFS', value: 'INACTIFS' },
  { label: 'PROSPECTS', value: 'PROSPECTS' },
];
export default class MyAthletes extends React.Component {
  state = {
    refresh: false,
    user: { name: 'toto', avatar: 'string avatar' },
    screen: 'ACTIFS',
    atlhetesActifs: [],
    atlhetesInactifs: [],
    atlhetesProspects: [],
    search: '',
    loaded: false,
  };

  componentDidMount() {
    get_coach_athlete()
      .then((res) => {
        this.filterData(res.data.athletes);
      })
      .then(() => {
        this.setState({ loaded: true });
      });
  }

  filterData(data) {
    console.log(data);
    const actifs = [];
    const inactifs = [];
    const prospects = [];
    data.forEach((element) => {
      console.log(element.status);
      switch (element.status) {
        case 'ACTIVE':
          actifs.push(element);
          break;
        case 'INACTIVE':
          inactifs.push(element);
          break;
        case 'prospect':
          prospects.push(element);
          break;

        default:
          break;
      }
    }, this.setState({ atlhetesActifs: actifs, atlhetesInactifs: inactifs, atlhetesProspects: prospects }));
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    if (!this.state.loaded) {
      return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <SafeAreaView>
            <HeaderSimple title="MES ATHLÈTES" />
            <View style={{ alignItems: 'center' }}>
              <SwitchSelector
                options={options}
                initial={0}
                onPress={(value) => this.setState({ screen: value })}
                backgroundColor="#1E2026"
                buttonColor="#2CDEE4"
                selectedColor="#1E2026"
                textColor="white"
                borderRadius={10}
                height={50}
                style={{ width: widthPercentageToDP(92) }}
                hasPadding
                fontSize={15}
                selectedTextStyle={{ fontFamily: 'MontserratBoldItalic' }}
                textStyle={{ fontFamily: 'MontserratBoldItalic' }}
                valuePadding={3}
                borderColor="#1E2026"
              />
            </View>
          </SafeAreaView>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <SafeAreaView>
            <HeaderSimple title="MES ATHLÈTES" />
            <View>
              <View style={{ alignItems: 'center' }}>
                <SwitchSelector
                  options={options}
                  initial={0}
                  onPress={(value) => this.setState({ screen: value })}
                  backgroundColor="#1E2026"
                  buttonColor="#2CDEE4"
                  selectedColor="#1E2026"
                  textColor="white"
                  borderRadius={10}
                  height={50}
                  style={{ width: widthPercentageToDP(92) }}
                  hasPadding
                  fontSize={15}
                  selectedTextStyle={{ fontFamily: 'MontserratBoldItalic' }}
                  textStyle={{ fontFamily: 'MontserratBoldItalic' }}
                  valuePadding={3}
                  borderColor="#1E2026"
                />
              </View>
              {this.state.screen == 'ACTIFS' ? (
                <View>
                  {/* <SearchBar
         //        size={50}
         //         clearIcon={false}
         //         placeholder="Type Here..."
         // onChangeText={this.updateSearch}
         // value={this.state.search}
                 /> */}
                  <View style={{ marginTop: 50 }}>
                    <FlatList
                      data={this.state.atlhetesActifs}
                      extraData={this.state}
                      // onRefresh={onRefresh}
                      // refreshing={this.state.refresh}
                      keyExtractor={(item) => toString(item.id)}
                      renderItem={({ item }) => (
                        console.log('ddd', item),
                        (
                          <TouchableOpacity
                            style={{ alignItems: 'center', marginBottom: 10 }}
                            onPress={() => {
                              navigate('MyAthleteDetails', { item });
                            }}>
                            <View
                              style={{
                                borderRadius: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignContent: 'center',
                                backgroundColor: '#1E2026',
                                width: widthPercentageToDP(92),
                                height: 70,
                              }}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  flexDirection: 'row',
                                }}>
                                <View
                                  style={{
                                    justifyContent: 'center',
                                    marginLeft: 15,
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
                                    marginHorizontal: 20,
                                  }}>
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                      fontSize: 15,
                                      color: 'white',
                                    }}>
                                    {item.first_name} {item.last_name}
                                  </Text>
                                </View>
                              </View>
                              <View style={{ justifyContent: 'center' }}>
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    color: '#979797',
                                    fontSize: 10,
                                    marginRight: 10,
                                  }}>
                                  Depuis le{' '}
                                  {moment(item.created_at).format('DD/MM/YYYY')}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        )
                      )}
                    />
                  </View>
                </View>
              ) : null}
              {this.state.screen == 'INACTIFS' ? (
                <View style={{ marginTop: heightPercentageToDP(2) }}>
                  {/* <SearchBar
                   size={50}
                   clearIcon={false}
                   placeholder="Type Here..."
                   onChangeText={this.updateSearch}
                   value={this.state.search}
                 /> */}
                  <View style={{ marginTop: 50 }}>
                    <FlatList
                      data={this.state.atlhetesInactifs}
                      extraData={this.state}
                      // onRefresh={onRefresh}
                      // refreshing={this.state.refresh}
                      keyExtractor={(item) => toString(item.id)}
                      renderItem={({ item }) => (
                        console.log('ddd', item),
                        (
                          <TouchableOpacity
                            style={{ alignItems: 'center' }}
                            onPress={() => {
                              navigate('MyAthleteDetailsInactifs', { item });
                            }}>
                            <View
                              style={{
                                borderRadius: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignContent: 'center',
                                backgroundColor: '#1E2026',
                                width: widthPercentageToDP(92),
                                height: 70,
                              }}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  flexDirection: 'row',
                                }}>
                                <View
                                  style={{
                                    justifyContent: 'center',
                                    marginLeft: 15,
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
                                    marginHorizontal: 20,
                                  }}>
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                      fontSize: 15,
                                      color: 'white',
                                    }}>
                                    {item.first_name} {item.last_name}
                                  </Text>
                                </View>
                              </View>
                              <View style={{ justifyContent: 'center' }}>
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    color: '#979797',
                                    fontSize: 10,
                                    marginRight: 10,
                                  }}>
                                  Depuis le{' '}
                                  {moment(item.created_at).format('DD/MM/YYYY')}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        )
                      )}
                    />
                  </View>
                </View>
              ) : null}
              {this.state.screen == 'PROSPECTS' ? (
                <View>
                  {/* <SearchBar
         //        size={50}
         //         clearIcon={false}
         //         placeholder="Type Here..."
         // onChangeText={this.updateSearch}
         // value={this.state.search}
                 /> */}
                  <View style={{ marginTop: 50 }}>
                    <FlatList
                      data={this.state.atlhetesProspects}
                      extraData={this.state}
                      keyExtractor={(item) => toString(item.id)}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={{ alignItems: 'center' }}
                          onPress={() => {
                            navigate('MyAthleteDetailsProspects', { item });
                          }}>
                          <View
                            style={{
                              borderRadius: 5,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignContent: 'center',
                              backgroundColor: '#1E2026',
                              width: widthPercentageToDP(92),
                              height: 70,
                            }}>
                            <View
                              style={{
                                justifyContent: 'center',
                                flexDirection: 'row',
                              }}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  marginLeft: 15,
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
                                  marginHorizontal: 20,
                                }}>
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'white',
                                  }}>
                                  {item.first_name} {item.last_name}
                                </Text>
                              </View>
                            </View>
                            <View style={{ justifyContent: 'center' }}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  color: '#979797',
                                  fontSize: 10,
                                  marginRight: 10,
                                }}>
                                Depuis le{' '}
                                {moment(item.created_at).format('DD/MM/YYYY')}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </View>
              ) : null}
            </View>
          </SafeAreaView>
        </View>
      );
    }
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
