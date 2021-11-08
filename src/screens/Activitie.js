import React from 'react';
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Text,
  Image,
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
const { width } = Dimensions.get('window');
import { LocaleConfig } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { FlatList } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { get_coach_reminder } from '../api/CoachReminder';
import { Swipeable } from 'react-native-gesture-handler';

const options = [
  { label: 'NOTIFICATIONS', value: 'NOTIFICATIONS' },
  { label: 'RAPPELS', value: 'RAPPELS' },
];
export default class Activitie extends React.Component {
  state = {
    reminders: [],
    refresh: false,
    user: { name: 'toto', avatar: 'string avatar' },
    screen: 'NOTIFICATIONS',
  };
  componentDidMount() {
    get_coach_reminder().then((res) => {
      this.setState({ reminders: res.data.reminders });
      console.log(this.state.reminders);
    });
  }
  RightSwipe(removeTicker) {
    return (
      <TouchableOpacity
        // onPress={removeTicker}
        style={styles.actionRightContainer}>
        <Text style={{ color: '#fff' }}>Delete</Text>
      </TouchableOpacity>
    );
  }

  rightSwipe(item) {
    return (
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#e74c3c',
          width: 75,
        }}>
        <Text style={{ color: '#fff' }}>Delete</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      //  <View style={{ flex: 1, backgroundColor: 'black' }}>
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
        <SafeAreaView>
          <Header title="ACTIVITÉ"/>
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
            {this.state.screen == 'NOTIFICATIONS' ? (
              <View></View>
            ) : (
              <View style={{ marginVertical: 20 }}>
                <View style={{ paddingBottom: heightPercentageToDP(35) }}>
                  <FlatList
                    data={this.state.reminders}
                    extraData={this.state}
                    // onRefresh={onRefresh}
                    // refreshing={this.state.refresh}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <Swipeable
                        key={Math.random()}
                        renderRightActions={() => this.rightSwipe(item)}>
                        <TouchableOpacity
                          style={{ alignItems: 'center' }}
                          onPress={() => {
                            console.log(item);
                          }}>
                          <View
                            style={{
                              borderRadius: 5,
                              margin: 5,
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
                                  margin: 20,
                                }}>
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'white',
                                  }}>
                                  {item.title}{' '}
                                </Text>
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'white',
                                  }}>
                                  {item.content}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </Swipeable>
                    )}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    alignItems: 'flex-end',
                    left: widthPercentageToDP(90),
                    top: heightPercentageToDP(50),
                  }}
                  onPress={() => {
                    navigate('CreateReminder');
                  }}>
                  <Image
                    source={require('../../assets/images/Group_8766.png')}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </SafeAreaView>
      </LinearGradient>
      //    </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    flex: 1,
  },
});
