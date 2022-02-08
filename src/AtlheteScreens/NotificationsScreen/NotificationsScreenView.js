import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';

import styles from './NotificationsScreenStyle';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import Header from '../../components/Header';
import SidappRefreshControl from '../../components/SidappRefreshControl/SidappRefreshControl';
export default class NotificationsScreenView extends AbstractScreenView {
  rightSwipeNotification(itemId, index) {
    return (
      <TouchableOpacity
        style={styles.rightSwip}
        onPress={() => this.controller.onDeleteNotification(itemId, index)}>
        <FontAwesome name="trash" size={22} color="#fff" />
      </TouchableOpacity>
    );
  }
  render() {
    const { refreshing } = this.component.state;

    return (
      <View style={styles.container}>
        <Header title="NOTIFICATIONS" />
        <View style={styles.content}>
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
            data={this.component.state.notifications}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => {
              return (
                <Swipeable
                  key={index}
                  renderRightActions={() =>
                    this.rightSwipeNotification(item.id, index)
                  }>
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
      </View>
    );
  }
}
