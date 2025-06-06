import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import Header from '../../components/Header';
import AuthService from '../../services/AuthService';
import { get_coach_by_id } from '../../api/Coach';
import styles from './CoachSheetScreenStyle';

const CoachSheetScreen = () => {
  const [coach, setCoach] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchCoach = async () => {
      setIsLoaded(false);
      const user = await AuthService.getUser();
      if (user.coach) {
        const coachRes = await get_coach_by_id(user.coach.coach_id);
        if (coachRes.status === 200) {
          setCoach(coachRes.data);
        }
      }
      setIsLoaded(true);
    };
    fetchCoach();
  }, []);

  const renderNoCoach = () => (
    <View style={{ marginTop: 150, flex: 1, alignItems: 'center' }}>
      <Text style={{ fontFamily: 'RobotoBold', fontSize: 20, color: '#FFFF' }}>
        Pas de coach associé
      </Text>
    </View>
  );

  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <Header title="TON COACH" disableBackPress />
        <ActivityIndicator size="large" color="#2CDEE4" />
      </View>
    );
  }

  if (!coach) {
    return (
      <View style={styles.container}>
        <Header title="TON COACH" disableBackPress />
        {renderNoCoach()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="TON COACH" disableBackPress />
      <View>
        <View style={styles.header}>
          <Avatar
            size={82}
            rounded
            source={
              coach.profile_picture_url
                ? { uri: coach.profile_picture_url }
                : require('../../../assets/images/no_pp.jpg')
            }
          />
          <Text style={styles.username} numberOfLines={1} ellipsizeMode="tail">
            {`${coach.first_name} ${coach.last_name}`}
          </Text>
          <Text style={styles.trainingPlace}>{coach.gym?.name}</Text>
        </View>

        <View style={styles.content}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.phoneNumberContainer}>
              <View style={styles.phoneNumberMidle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    style={styles.phoneImg}
                    source={require('../../../assets/images/phone.png')}
                  />
                  <Text style={styles.phoneNumberText}>{coach.phone}</Text>
                </View>
              </View>
            </View>

            <View style={styles.item}>
              <Text style={styles.infoText}>Adresse e-mail :</Text>
              <Text style={styles.valueText}>{coach.email}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.infoText}>Diplôme(s) :</Text>
              <FlatList
                data={coach.diplomas}
                keyExtractor={(item) => item?.id.toString()}
                renderItem={({ item }) => (
                  <Text style={styles.valueText}>{item.diploma_name}</Text>
                )}
              />
            </View>

            <View style={styles.item}>
              <Text style={styles.infoText}>Année(s) d'expérience :</Text>
              <Text style={styles.valueText}>{coach.experience_years} ans</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.infoText}>Spécialité(s) :</Text>
              <FlatList
                style={styles.flatlist}
                horizontal
                data={coach.specialties}
                keyExtractor={(item) => item?.id.toString()}
                renderItem={({ item, index }) => (
                  <View
                    style={[
                      styles.flatlistItem,
                      {
                        marginLeft: index === 0 ? 0 : 5,
                        marginRight:
                          index === coach.specialties.length - 1 ? 0 : 5,
                      },
                    ]}
                  >
                    <Text style={styles.flatlistItemText}>
                      {item.specialty_name}
                    </Text>
                  </View>
                )}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default CoachSheetScreen;
