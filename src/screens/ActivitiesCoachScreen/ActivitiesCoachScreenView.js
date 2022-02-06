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
import { Swipeable } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../../components/Header';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import styles from './activitiesCoachScreenStyle';
import moment from 'moment';
import SidappRefreshControl from '../../components/SidappRefreshControl/SidappRefreshControl';
import { Avatar } from 'react-native-elements';
const options = [
  { label: 'NOTIFICATIONS', value: 'NOTIFICATIONS' },
  { label: 'RAPPELS', value: 'RAPPELS' },
];
export default class ActivitiesCoachScreenView extends AbstractScreenView {
  rightSwipe(itemId) {
    return (
      <TouchableOpacity
        style={styles.rightSwip}
        onPress={() => this.controller.onDeleteReminder(itemId)}>
        <FontAwesome name="trash" size={22} color="#fff" />
      </TouchableOpacity>
    );
  }

  rightSwipeNotification(itemId) {
    return (
      <TouchableOpacity
        style={styles.rightSwip}
        onPress={() => this.controller.onDeleteNotification(itemId)}>
        <FontAwesome name="trash" size={22} color="#fff" />
      </TouchableOpacity>
    );
  }

  renderNotifications = () => {
    const { refreshing } = this.component.state;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          refreshControl={
            <SidappRefreshControl
              refreshing={refreshing}
              onRefresh={this.controller.fetchData}
            />
          }
          contentContainerStyle={{
            paddingBottom: 200,
          }}
          style={{ backgroundColor: '#000' }}
          data={this.component.state.notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            return (
              <Swipeable
                key={index}
                renderRightActions={() => this.rightSwipeNotification(item.id)}>
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
                    <View style={[styles.itemLeft, { flexDirection: 'row' }]}>
                      <View style={{ marginRight: 10 }}>
                        <Avatar
                          size={27}
                          rounded
                          source={{
                            uri:
                              item.picture ||
                              '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
                          }}
                        />
                      </View>
                      <Text style={styles.itemTextContentNotification}>
                        {item.content}
                      </Text>
                    </View>
                    <View style={styles.itemRight}>
                      <Text style={styles.itemTextDate}>
                        {moment(item.date).format('dddd D MMMM')}
                      </Text>
                      <Text style={styles.itemTextDate}>
                        {moment(item.date).format('hh:mm')}
                      </Text>
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
  renderReminder = () => {
    const { refreshing } = this.component.state;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          refreshControl={
            <SidappRefreshControl
              refreshing={refreshing}
              onRefresh={this.controller.fetchData}
            />
          }
          contentContainerStyle={{
            paddingBottom: 200,
          }}
          style={{ backgroundColor: '#000' }}
          data={this.component.state.reminders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            return (
              <Swipeable
                key={index}
                renderRightActions={() => this.rightSwipe(item.id)}>
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
                      <Text style={styles.itemText}>{`${item.title}`}</Text>
                      <Text style={styles.itemTextContent}>{item.content}</Text>
                    </View>
                    <View style={styles.itemRight}>
                      <Text style={styles.itemTextDate}>
                        {moment(item.date).format('dddd D MMMM')}
                      </Text>
                      <Text style={styles.itemTextDate}>
                        {item.hour.slice(0, 5)}
                      </Text>
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
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator size="large" color="#2CDEE4" />
      </View>
    ) : (
      <View style={styles.container}>
        <Header title="ACTIVITÉ" />
        {this.component.state.screen === 'NOTIFICATIONS' ? null : (
          <TouchableOpacity
            style={styles.createReminderButton}
            onPress={() => this.controller.onCreateReminderPress()}>
            <Image
              source={require('../../../assets/images/Group_8766.png')}
              style={styles.createReminderImage}
            />
          </TouchableOpacity>
        )}

        <View style={styles.content}>
          <View style={{ marginBottom: 28, alignItems: 'center' }}>
            <SwitchSelector
              options={options}
              initial={0}
              onPress={(value) => this.component.setState({ screen: value })}
              backgroundColor="#1E2026"
              buttonColor="#2CDEE4"
              selectedColor="#1E2026"
              textColor="white"
              borderRadius={10}
              height={45}
              style={{ width: 'auto' }}
              fontSize={13}
              selectedTextStyle={styles.switchSelectedText}
              textStyle={styles.switchSelectedText}
              borderColor="#1E2026"
            />
          </View>
          {this.component.state.screen == 'NOTIFICATIONS' ? (
            <View>{this.renderNotifications()}</View>
          ) : (
            <View>{this.renderReminder()}</View>
          )}
        </View>
      </View>
    );
  }
}
