import React from 'react';
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import { Avatar } from 'react-native-elements';
import moment from 'moment';
import styles from './PendingRequestCoachScreenStyle';

const PendingRequestCoachScreenView = ({ state, controller }) => {
  const { isRefreshing, loaded, personalRequest, publicRequest, assignedRequest } = state;

  if (!loaded) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  const renderItem = (item, isMine) => (
    <TouchableOpacity
      onPress={() => controller.onItemPress(item)}
      style={[styles.item, { backgroundColor: isMine ? '#2CDEE4' : '#1E2026' }]}
    >
      <View style={styles.avatarContainer}>
        <View style={styles.alignCenter}>
          <Avatar
            style={styles.avatarImage}
            rounded
            source={item.athlete.profile_picture_url
              ? { uri: item.athlete.profile_picture_url }
              : require('../../../assets/images/no_pp.jpg')}
          />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.username, { color: isMine ? '#000' : '#FFF' }]}
          >
            {item.athlete.first_name} {item.athlete.last_name}
          </Text>
        </View>
      </View>
      <View style={styles.itemRight}>
        <Text style={[styles.timerText, { color: isMine ? '#000' : '#979797' }]}>
          {moment(item.athlete.created_at).format('DD/MM/YYYY - hh:mm')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header title="DEMANDES EN ATTENTE" />
        <View style={styles.content}>
          <ScrollView contentInset={{ bottom: 200 }}>
            <View>
              <Text style={styles.textInfo}>
                {!personalRequest.length
                  ? "Aucune demande ne t'est adréssée"
                  : "Ces demandes s'adressent à toi uniquement"}
              </Text>
              <View style={{ flex: 1 }}>
                <FlatList
                  data={personalRequest}
                  onRefresh={controller.loadData}
                  refreshing={isRefreshing}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => renderItem(item, true)}
                />
              </View>
            </View>
            <View style={{ marginTop: 15 }}>
              <Text style={styles.textUserInfo}>
                {!publicRequest.length
                  ? 'Aucune demande aux coachs'
                  : "Ces demandes s'adressent à tous les coachs"}
              </Text>
              <FlatList
                contentContainerStyle={{ paddingBottom: publicRequest.length ? 50 : 0 }}
                data={publicRequest}
                onRefresh={controller.loadData}
                refreshing={isRefreshing}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => renderItem(item, false)}
              />
            </View>
            <View style={styles.processedRequestContainer}>
              <Text style={styles.textColored}>{assignedRequest} </Text>
              <Text style={styles.processedRequestText}>
                demandes ont été traitées ce mois-ci
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default PendingRequestCoachScreenView;
