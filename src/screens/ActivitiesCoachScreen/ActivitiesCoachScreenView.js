import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { LinearGradient } from 'expo-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { Swipeable } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../../components/Header';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import styles from './activitiesCoachScreenStyle';

const options = [
  { label: 'NOTIFICATIONS', value: 'NOTIFICATIONS' },
  { label: 'RAPPELS', value: 'RAPPELS' },
];
export default class ActivitiesCoachScreenView extends AbstractScreenView {
  rightSwipe() {
    return (
      <TouchableOpacity style={styles.rightSwip}>
        <FontAwesome name="trash" size={26} color="#fff" />
      </TouchableOpacity>
    );
  }

  renderReminder = () => {
    return (
      <View style={{ paddingBottom: heightPercentageToDP(35) }}>
        <FlatList
          style={{ backgroundColor: '#000' }}
          data={this.component.state.reminders}
          // onRefresh={onRefresh}
          // refreshing={this.component.state.refresh}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            console.log(index, item);
            return (
              <Swipeable
                key={index}
                renderRightActions={() => this.rightSwipe(item)}>
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
              </Swipeable>
            );
          }}
        />
      </View>
    );
  };
  render() {
    return !this.component.state.isLoaded ? (
      <ActivityIndicator size="large" color="#2CDEE4" />
    ) : (
      <View style={styles.container}>
        <Header title="ACTIVITÉ" />
        <View style={styles.content}>
          <View style={{ marginBottom: 28 }}>
            <SwitchSelector
              options={options}
              initial={0}
              onPress={(value) => this.component.setState({ screen: value })}
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
          {this.component.state.screen == 'NOTIFICATIONS' ? (
            <View></View>
          ) : (
            this.renderReminder()
          )}
          <TouchableOpacity
            style={styles.createReminderButton}
            onPress={() => this.controller.onCreateReminderPress()}>
            <Image
              source={require('../../../assets/images/Group_8766.png')}
              style={styles.createReminderImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
