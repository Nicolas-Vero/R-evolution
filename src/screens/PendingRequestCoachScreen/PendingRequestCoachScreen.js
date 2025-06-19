import React from 'react';
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
  SectionList,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/Header';
import { Avatar } from 'react-native-elements';
import moment from 'moment';
import styles from './PendingRequestCoachScreenStyle';
import { usePendingRequestCoachScreen } from './usePendingRequestCoachScreen';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const PendingRequestCoachScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {
    isRefreshing,
    loaded,
    personalRequest,
    publicRequest,
    assignedRequest,
    loadData,
  } = usePendingRequestCoachScreen({ navigation, isFocused });

  if (!loaded) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  const renderItem = ({ item, section }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('TreshRequestCoachScreen', { item })}
      style={[
        styles.item,
        { backgroundColor: section.isMine ? '#2CDEE4' : '#1E2026' },
      ]}
    >
      <View style={styles.avatarContainer}>
        <View style={styles.alignCenter}>
          <Avatar
            style={styles.avatarImage}
            rounded
            source={
              item.athlete.profile_picture_url
                ? { uri: item.athlete.profile_picture_url }
                : require('../../../assets/images/no_pp.jpg')
            }
          />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              styles.username,
              { color: section.isMine ? '#000' : '#FFF' },
            ]}
          >
            {item.athlete.first_name} {item.athlete.last_name}
          </Text>
        </View>
      </View>
      <View style={styles.itemRight}>
        <Text
          style={[
            styles.timerText,
            { color: section.isMine ? '#000' : '#979797' },
          ]}
        >
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
          <SectionList
            sections={[
              {
                title: !personalRequest.length
                  ? "Aucune demande ne t'est adréssée"
                  : "Ces demandes s'adressent à toi uniquement",
                data: personalRequest,
                isMine: true,
              },
              {
                title: !publicRequest.length
                  ? 'Aucune demande aux coachs'
                  : "Ces demandes s'adressent à tous les coachs",
                data: publicRequest,
                isMine: false,
              },
            ]}
            keyExtractor={(item) => item.id.toString()}
            renderSectionHeader={({ section: { title } }) => (
              <Text
                style={
                  title.includes('coach') ? styles.textUserInfo : styles.textInfo
                }
              >
                {title}
              </Text>
            )}
            renderItem={renderItem}
            refreshing={isRefreshing}
            onRefresh={loadData}
            contentContainerStyle={{
              paddingBottom: publicRequest.length ? 50 : 0,
            }}
            ListFooterComponent={
              <View style={styles.processedRequestContainer}>
                <Text style={styles.textColored}>{assignedRequest} </Text>
                <Text style={styles.processedRequestText}>
                  demandes ont été traitées ce mois-ci
                </Text>
              </View>
            }
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default PendingRequestCoachScreen;
