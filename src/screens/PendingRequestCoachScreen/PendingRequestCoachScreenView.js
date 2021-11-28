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
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
export default class PendingRequestCoachScreenView extends AbstractScreenView {
  renderItem = (item, isMine) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.controller.onItemPress(item);
        }}
        style={[
          styles.item,
          { backgroundColor: isMine ? '#2CDEE4' : '#1E2026' },
        ]}>
        <View style={styles.avatarContainer}>
          <View style={styles.alignCenter}>
            <Avatar
              style={styles.avatarImage}
              rounded
              source={{
                uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
              }}
            />
            <Text
              style={[styles.username, { color: isMine ? '#000' : '#FFF' }]}>
              {item?.athlete?.first_name} {item?.athlete?.last_name}
            </Text>
          </View>
        </View>
        {}
        <View style={styles.itemRight}>
          <Text
            style={[styles.timerText, { color: isMine ? '#000' : '#979797' }]}>
            {moment(item?.athlete?.created_at).format('LT')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const { isRefreshing, loaded } = this.component.state;

    console.log(isRefreshing);
    if (!loaded) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SafeAreaView>
          <Header title="DEMANDES EN ATTENTE" />
          <View style={styles.content}>
            <ScrollView>
              <View>
                <Text style={styles.textInfo}>
                  {!this.component.state.personalRequest.length
                    ? "Aucune demande ne t'est adréssée"
                    : "Ces demandes s'adressent à toi uniquement"}
                </Text>
                <View style={{ flex: 1 }}>
                  <FlatList
                    data={this.component.state.personalRequest}
                    onRefresh={() => this.controller.loadData()}
                    refreshing={isRefreshing}
                    keyExtractor={(item) => item?.id.toString()}
                    renderItem={({ item }) => this.renderItem(item, true)}
                  />
                </View>
              </View>
              <View style={{ marginTop: 15 }}>
                <Text style={styles.textUserInfo}>
                  {!this.component.state.publicRequest.length
                    ? 'Aucune demande aux coachs'
                    : "Ces demandes ici présentés s'adressent à tous les coachs"}
                </Text>
                <FlatList
                  contentContainerStyle={{
                    paddingBottom: this.component.state.publicRequest.length
                      ? 50
                      : 0,
                  }}
                  data={this.component.state.publicRequest}
                  onRefresh={() => this.controller.loadData()}
                  refreshing={isRefreshing}
                  keyExtractor={(item) => item?.id.toString()}
                  renderItem={({ item }) => this.renderItem(item, false)}
                />
              </View>
              <View style={styles.processedRequestContainer}>
                <Text style={styles.textColored}>0 </Text>
                <Text style={styles.processedRequestText}>
                  demandes ont été traitées ce mois-ci
                </Text>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
