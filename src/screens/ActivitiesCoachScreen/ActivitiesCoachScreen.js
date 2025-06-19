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
import styles from './activitiesCoachScreenStyle';
import moment from 'moment';
import SidappRefreshControl from '../../components/SidappRefreshControl/SidappRefreshControl';
import { Avatar } from 'react-native-elements';
import { useActivitiesCoachScreen } from './useActivitiesCoachScreen'; // <- ton hook custom ici

const options = [
  { label: 'NOTIFICATIONS', value: 'NOTIFICATIONS' },
  { label: 'RAPPELS', value: 'RAPPELS' },
];

const ActivitiesCoachScreen = () => {
  // Hook custom
  const {
    reminders,
    notifications,
    refreshing,
    isLoaded,
    screen,
    setScreen,
    fetchData,
    onCreateReminderPress,
    onDeleteReminder,
    onDeleteNotification,
  } = useActivitiesCoachScreen();

  const rightSwipe = (itemId, index) => (
    <TouchableOpacity
      style={styles.rightSwip}
      onPress={() => onDeleteReminder(itemId, index)}>
      <FontAwesome name="trash" size={22} color="#fff" />
    </TouchableOpacity>
  );

  const rightSwipeNotification = (itemId, index) => (
    <TouchableOpacity
      style={styles.rightSwip}
      onPress={() => onDeleteNotification(itemId, index)}>
      <FontAwesome name="trash" size={22} color="#fff" />
    </TouchableOpacity>
  );

  const renderNotifications = () => (
    <FlatList
      refreshControl={
        <SidappRefreshControl
          refreshing={refreshing}
          onRefresh={fetchData}
        />
      }
      contentContainerStyle={{ paddingBottom: 200 }}
      style={{ backgroundColor: '#000' }}
      data={notifications}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <Swipeable
          key={index}
          renderRightActions={() => rightSwipeNotification(item.id, index)}>
          <LinearGradient
            colors={['#101010', '#2D333C']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.item}>
            <View style={[styles.itemColor, { backgroundColor: item.color || '#2CDEE4' }]} />
            <View style={styles.itemContent}>
              <View style={[styles.itemLeft, { flexDirection: 'row' }]}>
                <Avatar
                  size={27}
                  rounded
                  source={
                    item.picture
                      ? { uri: item.picture }
                      : require('../../../assets/images/no_pp.jpg')
                  }
                  containerStyle={{ marginRight: 10 }}
                />
                <Text style={styles.itemTextContentNotification}>{item.content}</Text>
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemTextDate}>{moment(item.date).format('dddd D MMMM')}</Text>
                <Text style={styles.itemTextDate}>{moment(item.date).format('hh:mm')}</Text>
              </View>
            </View>
          </LinearGradient>
        </Swipeable>
      )}
    />
  );

  const renderReminder = () => (
    <FlatList
      refreshControl={
        <SidappRefreshControl
          refreshing={refreshing}
          onRefresh={fetchData}
        />
      }
      contentContainerStyle={{ paddingBottom: 200 }}
      style={{ backgroundColor: '#000' }}
      data={reminders}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <Swipeable
          key={index}
          renderRightActions={() => rightSwipe(item.id, index)}>
          <LinearGradient
            colors={['#101010', '#2D333C']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.item}>
            <View style={[styles.itemColor, { backgroundColor: item.color || '#2CDEE4' }]} />
            <View style={styles.itemContent}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemText}>{item.title}</Text>
                <Text style={styles.itemTextContent}>{item.content}</Text>
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemTextDate}>{moment(item.date).format('dddd D MMMM')}</Text>
                <Text style={styles.itemTextDate}>{item.hour?.slice(0, 5)}</Text>
              </View>
            </View>
          </LinearGradient>
        </Swipeable>
      )}
    />
  );

  if (!isLoaded) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator size="large" color="#2CDEE4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="ACTIVITÉ" />
      {screen === 'NOTIFICATIONS' ? null : (
        <TouchableOpacity
          style={styles.createReminderButton}
          onPress={onCreateReminderPress}>
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
            value={screen}
            onPress={setScreen}
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
        {screen === 'NOTIFICATIONS' ? renderNotifications() : renderReminder()}
      </View>
    </View>
  );
};

export default ActivitiesCoachScreen;
