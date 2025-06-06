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
import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import HeaderSimple from '../../components/HeaderSimple';
import SidappRefreshControl from '../../components/SidappRefreshControl/SidappRefreshControl';
import styles from './AthletesCoachScreenStyle';
import { Swipeable } from 'react-native-gesture-handler';
import DeleteSheetDialog from '../../components/dialogs/deleteSheetDialog/deleteSheetDialog';

const options = [
  { label: 'ACTIFS', value: 'ACTIFS' },
  { label: 'INACTIFS', value: 'INACTIFS' },
  { label: 'PROSPECTS', value: 'PROSPECTS' },
];

const AthletesCoachScreenView = ({ state, controller }) => {
  const rightSwipe = (athleteId) => (
    <TouchableOpacity
      style={styles.rightSwip}
      onPress={() => controller.onDeleteSheetPress(athleteId)}
    >
      <FontAwesome name="trash" size={22} color="#fff" />
    </TouchableOpacity>
  );

  const renderItem = (item, index, isProspect) => (
    <TouchableOpacity
      key={index}
      onPress={() => controller.onNavigate({ item })}
      style={styles.item}
    >
      <View style={styles.itemContent}>
        <View style={styles.avatarContainer}>
          <View style={styles.alignCenter}>
            <Avatar
              style={styles.avatarImage}
              rounded
              source={
                item.profile_picture_url
                  ? { uri: item.profile_picture_url }
                  : require('../../../assets/images/no_pp.jpg')
              }
            />
            <View style={{ flex: 1, flexDirection: 'row', marginRight: 30 }}>
              <Text
                style={styles.username}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.first_name} {item.last_name}
              </Text>
              {item.pendingPayment && (
                <Image
                  source={require('../../../assets/images/€.png')}
                  style={{
                    resizeMode: 'contain',
                    width: 20,
                    height: 18,
                    marginLeft: 5,
                  }}
                />
              )}
            </View>
          </View>
        </View>
        <View style={styles.itemRight}>
          <Text style={styles.timerText}>
            Depuis le {moment(item.created_at).format('DD/MM/YYYY')}
          </Text>
          <View style={{ alignSelf: 'center', marginTop: 2 }}>
            {isProspect &&
              (!item.coach?.is_validate ? (
                <Image
                  source={require('../../../assets/images/not_validate.png')}
                  style={{ resizeMode: 'contain', width: 20, height: 18 }}
                />
              ) : (
                <Image
                  source={require('../../../assets/images/validate.png')}
                  style={{ resizeMode: 'contain', width: 20, height: 18 }}
                />
              ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderList = (list, isProspect = false) => (
    <FlatList
      contentContainerStyle={{ paddingBottom: 50 }}
      style={styles.container}
      data={list}
      keyExtractor={(item, index) => item.id?.toString() || index.toString()}
      refreshControl={
        <SidappRefreshControl
          refreshing={state.refreshing}
          onRefresh={controller.fetchData}
        />
      }
      renderItem={({ item, index }) =>
        isProspect ? (
          <Swipeable renderRightActions={() => rightSwipe(item.id)}>
            {renderItem(item, index, true)}
          </Swipeable>
        ) : (
          renderItem(item, index, false)
        )
      }
    />
  );

  const renderCurrentTab = () => {
    switch (state.screen) {
      case 'ACTIFS':
        return renderList(state.athletes.length ? state.athletes : state.atlhetesActifs);
      case 'INACTIFS':
        return renderList(state.athletes.length ? state.athletes : state.atlhetesInactifs);
      case 'PROSPECTS':
        return (
          <>
            <DeleteSheetDialog
              dialogVisible={state.isDeleteSheetModalVisible}
              onClose={controller.onDismissDeleteSheetDialog}
              onDelete={controller.onValidateDeleteSheet}
            />
            {renderList(state.athletes.length ? state.athletes : state.atlhetesProspects, true)}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <HeaderSimple title="MES ATHLÈTES" />
      <View style={styles.content}>
        <SwitchSelector
          options={options}
          initial={0}
          onPress={controller.onChangeTab}
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
            onChangeText={controller.filterSearch}
            value={state.search}
          />
          {renderCurrentTab()}
        </View>
      </View>
    </View>
  );
};

export default AthletesCoachScreenView;
