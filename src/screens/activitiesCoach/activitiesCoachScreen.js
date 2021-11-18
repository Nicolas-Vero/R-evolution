import React from 'react';
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
  Image,
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { LinearGradient } from 'expo-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { Swipeable } from 'react-native-gesture-handler';
import { FlatList } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { get_coach_reminder } from '../../api/CoachReminder';
import Header from '../../components/Header';
import styles from './activitiesCoachStyle';

const options = [
  { label: 'NOTIFICATIONS', value: 'NOTIFICATIONS' },
  { label: 'RAPPELS', value: 'RAPPELS' },
];
export default class activitiesCoachScreen extends React.Component {
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
  rightSwipe() {
    return (
      <TouchableOpacity style={styles.rightSwip}>
        <FontAwesome name="trash" size={26} color="#fff" />
      </TouchableOpacity>
    );
  }

  renderReminder = () => {
    console.log('reminder', this.state.reminders[0]);
    return (
      <View>
        <View style={{ paddingBottom: heightPercentageToDP(35) }}>
          <FlatList
            data={this.state.reminders}
            // onRefresh={onRefresh}
            // refreshing={this.state.refresh}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <Swipeable
                key={index}
                renderRightActions={() => this.rightSwipe(item)}>
                <TouchableOpacity
                  onPress={() => {
                    console.log(item);
                  }}>
                  <LinearGradient
                    colors={['#101010', '#2D333C']}
                    start={{
                      x: 0,
                      y: 1,
                    }}
                    end={{
                      x: 0,
                      y: 0,
                    }}
                    style={styles.item}>
                    <View
                      style={[
                        styles.itemColor,
                        { backgroundColor: item.color || '#2CDEE4' },
                      ]}
                    />
                    <View style={styles.itemContent}>
                      <View style={styles.itemLeft}>
                        <Text style={styles.itemText}>
                          {`${item.title} ${item.content}`}
                        </Text>
                      </View>
                      <View style={styles.itemRight}>
                        <Text style={styles.itemText}>9:00</Text>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </Swipeable>
            )}
          />
        </View>
        <TouchableOpacity
          style={styles.createReminderButton}
          onPress={() => {
            navigate('createReminderCoachScreen');
          }}>
          <Image
            source={require('../../../assets/images/Group_8766.png')}
            style={styles.createReminderImage}
          />
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <Header title="ACTIVITÉ" />
          <View style={styles.content}>
            <View style={{ marginBottom: 28 }}>
              <SwitchSelector
                options={options}
                initial={0}
                onPress={(value) => this.setState({ screen: value })}
                backgroundColor="#1E2026"
                buttonColor="#2CDEE4"
                selectedColor="#1E2026"
                textColor="white"
                borderRadius={10}
                height={38}
                style={{ width: widthPercentageToDP(92) }}
                fontSize={13}
                selectedTextStyle={styles.switchSelectedText}
                textStyle={styles.switchSelectedText}
                valuePadding={3}
                borderColor="#1E2026"
              />
            </View>
            {this.state.screen == 'NOTIFICATIONS' ? (
              <View></View>
            ) : (
              this.renderReminder()
            )}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
