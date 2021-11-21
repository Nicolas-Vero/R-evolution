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
import { FlatList } from 'react-native-gesture-handler';
import { get_coach_athlete } from '../../api/Coach';
import { Avatar } from 'react-native-elements';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import moment from 'moment';
import HeaderSimple from '../../components/HeaderSimple';

import styles from './AthletesCoachScreenStyle';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
const options = [
  { label: 'ACTIFS', value: 'ACTIFS' },
  { label: 'INACTIFS', value: 'INACTIFS' },
  { label: 'PROSPECTS', value: 'PROSPECTS' },
];
export default class AthletesCoachScreenView extends AbstractScreenView {
  renderActifList = () => {
    return (
      <View>
        {/* <SearchBar
         //        size={50}
         //         clearIcon={false}
         //         placeholder="Type Here..."
         // onChangeText={this.updateSearch}
         // value={this.state.search}
                 /> */}
        <FlatList
          contentContainerStyle={{ paddingBottom: 50 }}
          data={this.component.state.atlhetesActifs}
          // onRefresh={onRefresh}
          // refreshing={this.state.refresh}
          keyExtractor={(item) => toString(item.id)}
          renderItem={({ item }) => this.renderItem(item)}
        />
      </View>
    );
  };

  renderInactifList = () => {
    return (
      <View>
        {/* <SearchBar
                   size={50}
                   clearIcon={false}
                   placeholder="Type Here..."
                   onChangeText={this.updateSearch}
                   value={this.state.search}
                 /> */}
        <FlatList
          data={this.component.state.atlhetesInactifs}
          // onRefresh={onRefresh}
          // refreshing={this.state.refresh}
          keyExtractor={(item) => toString(item.id)}
          renderItem={({ item }) => this.renderItem(item)}
        />
      </View>
    );
  };

  renderProspectList = () => {
    return (
      <View>
        {/* <SearchBar
         //        size={50}
         //         clearIcon={false}
         //         placeholder="Type Here..."
         // onChangeText={this.updateSearch}
         // value={this.state.search}
                 /> */}
        <FlatList
          data={this.component.state.atlhetesProspects}
          keyExtractor={(item) => toString(item.id)}
          renderItem={({ item }) => this.renderItem(item)}
        />
      </View>
    );
  };
  renderItem = (item) => {
    console.log('item', item.status);
    return (
      <TouchableOpacity
        onPress={() => {
          this.controller.onNavigate({ item });
        }}
        style={styles.item}>
        <View style={styles.avatarContainer}>
          <View style={styles.alignCenter}>
            <Avatar
              style={styles.avatarImage}
              rounded
              source={{
                uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
              }}
            />
            <Text style={styles.username}>
              {item.first_name} {item.last_name}{' '}
            </Text>
          </View>
        </View>
        {}
        <View style={styles.itemRight}>
          <Text style={styles.timerText}>
            Depuis le {moment(item.created_at).format('DD/MM/YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    if (!this.component.state.loaded) {
      return (
        <View style={styles.container}>
          <HeaderSimple title="MES ATHLÈTES" />
          <SwitchSelector
            options={options}
            initial={0}
            onPress={(value) => this.component.setState({ screen: value })}
            backgroundColor="#1E2026"
            buttonColor="#2CDEE4"
            selectedColor="#1E2026"
            textColor="white"
            borderRadius={10}
            height={50}
            style={{ width: widthPercentageToDP(92) }}
            hasPadding
            fontSize={15}
            selectedTextStyle={styles.switchSelectedText}
            textStyle={styles.switchSelectedText}
            valuePadding={0}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView>
            <HeaderSimple title="MES ATHLÈTES" />
            <View style={styles.content}>
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
                hasPadding
                fontSize={13}
                selectedTextStyle={styles.switchSelectedText}
                textStyle={styles.switchSelectedText}
                valuePadding={0}
                borderColor="#000"
              />
              <View style={styles.listContainer}>
                {this.component.state.screen == 'ACTIFS'
                  ? this.renderActifList()
                  : null}
                {this.component.state.screen == 'INACTIFS'
                  ? this.renderInactifList()
                  : null}
                {this.component.state.screen == 'PROSPECTS'
                  ? this.renderProspectList()
                  : null}
              </View>
            </View>
          </SafeAreaView>
        </View>
      );
    }
  }
}
