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
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import HeaderSimple from '../../components/HeaderSimple';
import SidappRefreshControl from '../../components/SidappRefreshControl/SidappRefreshControl';
import styles from './AthletesCoachScreenStyle';
import { Swipeable } from 'react-native-gesture-handler';
import DeleteSheetDialog from '../../components/dialogs/deleteSheetDialog/deleteSheetDialog';
import { useNavigation } from '@react-navigation/native';
import { useAthletesCoachScreen } from './useAthletesCoachScreen';

const options = [
  { label: 'ACTIFS', value: 'ACTIFS' },
  { label: 'INACTIFS', value: 'INACTIFS' },
  { label: 'PROSPECTS', value: 'PROSPECTS' },
];

const AthletesCoachScreen = () => {
  const navigation = useNavigation();
  const hook = useAthletesCoachScreen(navigation);

  // Destructure pour lisibilité
  const {
    screen,
    setScreen,
    athletes,
    atlhetesActifs,
    atlhetesInactifs,
    atlhetesProspects,
    search,
    setSearch,
    refreshing,
    isDeleteSheetModalVisible,
    handleDeleteSheetPress,
    handleDismissDeleteSheetDialog,
    handleValidateDeleteSheet,
    handleNavigate,
    fetchData,
  } = hook;

  const rightSwipe = (athleteId) => (
    <TouchableOpacity
      style={styles.rightSwip}
      onPress={() => handleDeleteSheetPress(athleteId)}
    >
      <FontAwesome name="trash" size={22} color="#fff" />
    </TouchableOpacity>
  );

  const renderItem = (item, index, isProspect) => (
    <TouchableOpacity
      key={index}
      onPress={() => handleNavigate({ item })}
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
          refreshing={refreshing}
          onRefresh={fetchData}
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
    switch (screen) {
      case 'ACTIFS':
        return renderList(athletes.length ? athletes : atlhetesActifs);
      case 'INACTIFS':
        return renderList(athletes.length ? athletes : atlhetesInactifs);
      case 'PROSPECTS':
        return (
          <>
            <DeleteSheetDialog
              dialogVisible={isDeleteSheetModalVisible}
              onClose={handleDismissDeleteSheetDialog}
              onDelete={handleValidateDeleteSheet}
            />
            {renderList(athletes.length ? athletes : atlhetesProspects, true)}
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
          onPress={setScreen}
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
            onChangeText={setSearch}
            value={search}
          />
          {renderCurrentTab()}
        </View>
      </View>
    </View>
  );
};

export default AthletesCoachScreen;
