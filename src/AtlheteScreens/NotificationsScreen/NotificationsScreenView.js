import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';

import styles from './NotificationsScreenStyle';
import Header from '../../components/Header';
import SidappRefreshControl from '../../components/SidappRefreshControl/SidappRefreshControl';

const NotificationsScreenView = ({ state, controller }) => {
  const renderRightSwipe = (itemId, index) => (
    <TouchableOpacity
      style={styles.rightSwip}
      onPress={() => controller.onDeleteNotification(itemId, index)}
    >
      <FontAwesome name="trash" size={22} color="#fff" />
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) => (
    <Swipeable key={index} renderRightActions={() => renderRightSwipe(item.id, index)}>
      <LinearGradient
        colors={['#101010', '#2D333C']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.item}
      >
        <View style={[styles.itemColor, { backgroundColor: item.color || '#2CDEE4' }]} />
        <View style={styles.itemContent}>
          <View style={[styles.itemLeft, { flexDirection: 'row' }]}>
            <View style={{ marginRight: 10 }}>
              <Avatar
                size={27}
                rounded
                source={
                  item.picture
                    ? { uri: item.picture }
                    : require('../../../assets/images/no_pp.jpg')
                }
              />
            </View>
            <Text style={styles.itemTextContentNotification}>{item.content}</Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.itemTextDate}>
              {moment(item.date).format('dddd D MMMM')}
            </Text>
            <Text style={styles.itemTextDate}>
              {moment(item.date).format('HH:mm')}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <Header title="NOTIFICATIONS" />
      <View style={styles.content}>
        <FlatList
          style={{ flex: 1 }}
          refreshControl={
            <SidappRefreshControl
              refreshing={state.refreshing}
              onRefresh={controller.fetchData}
            />
          }
          contentContainerStyle={{ paddingBottom: 200 }}
          data={state.notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default NotificationsScreenView;
