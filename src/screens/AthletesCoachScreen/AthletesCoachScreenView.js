import React from 'react';
import {
  TouchableOpacity,
  View,
  Keyboard,
  Text,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { Avatar } from 'react-native-elements';
import { Entypo, AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import HeaderSimple from '../../components/HeaderSimple';
import SidappRefreshControl from '../../components/SidappRefreshControl/SidappRefreshControl';
import styles from './AthletesCoachScreenStyle';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import { Swipeable } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import DeleteSheetDialog from '../../components/dialogs/deleteSheetDialog/deleteSheetDialog';

const options = [
  { label: 'ACTIFS', value: 'ACTIFS' },
  { label: 'INACTIFS', value: 'INACTIFS' },
  { label: 'PROSPECTS', value: 'PROSPECTS' },
];
export default class AthletesCoachScreenView extends AbstractScreenView {
  renderActifList = () => {
    const { athletes, atlhetesActifs } = this.component.state;
    const list = athletes.length ? athletes : atlhetesActifs;
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 50 }}
          style={styles.container}
          data={list}
          refreshControl={
            <SidappRefreshControl
              refreshing={this.component.state.refreshing}
              onRefresh={this.controller.fetchData}
            />
          }
          keyExtractor={(item, index) => toString(index)}
          renderItem={({ item, index }) => this.renderItem(item, index)}
        />
      </View>
    );
  };

  renderInactifList = () => {
    const { athletes, atlhetesInactifs } = this.component.state;
    const list = athletes.length ? athletes : atlhetesInactifs;
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 50 }}
          data={list}
          refreshControl={
            <SidappRefreshControl
              refreshing={this.component.state.refreshing}
              onRefresh={this.controller.fetchData}
            />
          }
          // onRefresh={onRefresh}
          // refreshing={this.state.refresh}
          keyExtractor={(item) => toString(item.id)}
          renderItem={({ item, index }) => this.renderItem(item, index)}
        />
      </View>
    );
  };

  rightSwipe(athleteId) {
    return (
      <TouchableOpacity
        style={styles.rightSwip}
        onPress={() => this.controller.onDeleteSheetPress(athleteId)}>
        <FontAwesome name="trash" size={22} color="#fff" />
      </TouchableOpacity>
    );
  }
  renderDeleteSheetDialog = () => {
    return (
      <DeleteSheetDialog
        dialogVisible={this.component.state.isDeleteSheetModalVisible}
        onClose={this.controller.onDismissDeleteSheetDialog}
        onDelete={this.controller.onValidateDeleteSheet}
      />
    );
  };
  renderProspectList = () => {
    const { athletes, atlhetesProspects } = this.component.state;
    const list = athletes.length ? athletes : atlhetesProspects;
    return (
      <View style={styles.container}>
        {this.renderDeleteSheetDialog()}
        <FlatList
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 50 }}
          data={list}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <SidappRefreshControl
              refreshing={this.component.state.refreshing}
              onRefresh={this.controller.fetchData}
            />
          }
          renderItem={({ item, index }) => {
            return (
              <Swipeable
                key={index}
                renderRightActions={() => this.rightSwipe(item.id)}>
                {this.renderItem(item, index, true)}
              </Swipeable>
            );
          }}
        />
      </View>
    );
  };
  renderItem = (item, index, isProspect) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          this.controller.onNavigate({ item });
        }}
        style={styles.item}>
        <View style={styles.itemContent}>
          <View style={styles.avatarContainer}>
            <View style={styles.alignCenter}>
              <Avatar
                style={styles.avatarImage}
                rounded
                source={
                  item.profile_picture_url
                    ? {
                      uri: item.profile_picture_url,
                    }
                    : require('../../../assets/images/no_pp.jpg')
                }
              />
              <Text style={styles.username}>
                {item.first_name} {item.last_name}{' '}
              </Text>
            </View>
            <View style={{ alignSelf: 'center', marginTop: 2 }}>
              {item.pendingPayment ? (
                <Image
                  source={require('../../../assets/images/€.png')}
                  style={{ resizeMode: 'contain', width: 20, height: 18 }}
                />
              ) : null}
            </View>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.timerText}>
              Depuis le {moment(item.created_at).format('DD/MM/YYYY')}
            </Text>
            <View style={{ alignSelf: 'center', marginTop: 2 }}>
              {!isProspect ? null : !item.coach.is_validate ? (
                <Image
                  source={require('../../../assets/images/not_validate.png')}
                  style={{ resizeMode: 'contain', width: 20, height: 18 }}
                />
              ) : (
                <Image
                  source={require('../../../assets/images/validate.png')}
                  style={{ resizeMode: 'contain', width: 20, height: 18 }}
                />
              )}
            </View>
          </View>
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
            onPress={this.controller.onChangeTab}
            backgroundColor="#1E2026"
            buttonColor="#2CDEE4"
            selectedColor="#1E2026"
            textColor="white"
            borderRadius={10}
            height={45}
            hasPadding
            fontSize={13}
            selectedTextStyle={styles.switchSelectedText}
            textStyle={styles.switchSelectedText}
            valuePadding={0}
            borderColor="#000"
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <HeaderSimple title="MES ATHLÈTES" />
          <View style={styles.content}>
            <SwitchSelector
              options={options}
              initial={0}
              onPress={this.controller.onChangeTab}
              backgroundColor="#1E2026"
              buttonColor="#2CDEE4"
              selectedColor="#1E2026"
              textColor="white"
              borderRadius={10}
              height={45}
              hasPadding
              fontSize={13}
              selectedTextStyle={styles.switchSelectedText}
              textStyle={styles.switchSelectedText}
              valuePadding={0}
              borderColor="#000"
            />
            <View style={styles.listContainer}>
              <TextInput
                placeholder="Rechercher"
                placeholderTextColor="#979797"
                blurOnSubmit={false}
                autoCapitalize="none"
                onSubmitEditing={() => Keyboard.dismiss()}
                returnKeyType="done"
                style={styles.input}
                onChangeText={this.controller.filterSearch}
                value={this.component.state.search}
              />
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
        </View>
      );
    }
  }
}
