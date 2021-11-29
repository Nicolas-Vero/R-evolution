import React from 'react';
import { View, Text, ActivityIndicator, SafeAreaView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Header from '../../components/Header';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import styles from './CoachSheetScreenStyle';

export default class CoachSheetScreenView extends AbstractScreenView {
  renderNoCoach() {
    return (
      <View
        style={{
          marginTop: 150,
          flex: 1,
          alignItems: 'center',
        }}>
        <Text
          style={{ fontFamily: 'Roboto', fontSize: 20, color: '#FFFF' }}>
          Pas de coach associé
        </Text>
      </View>
    );
  }
  render() {
    console.log(this.component.state.coach);
    return (
      <View style={styles.container}>
        <Header title="TON COACH" disableBackPress />
        {!this.component.state.isLoaded ? (
          <ActivityIndicator size="large" color="#2CDEE4" />
        ) : !this.component.state.coach ? (
          this.renderNoCoach()
        ) : (
          <View>
            <View style={styles.header}>
              <Avatar
                size={82}
                rounded
                source={{
                  uri: '../../../assets/images/avatar.png',
                }}
              />
              <Text style={styles.username}>
                {`${this.component.state.coach?.first_name} ${this.component.state.coach?.last_name}`}
              </Text>
              <Text style={styles.trainingPlace}>
                {this.component.state.coach?.gym.name}
              </Text>
            </View>
            <View style={styles.content}>
              <ScrollView style={styles.scrollView}>
                <View style={styles.phoneNumberContainer}>
                  <View style={styles.phoneNumberMidle}>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        style={styles.phoneImg}
                        source={require('../../../assets/images/phone.png')}
                      />
                      <Text style={styles.phoneNumberText}>
                        {this.component.state.coach?.phone}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.item}>
                  <Text style={styles.infoText}>Adresse e-mail :</Text>
                  <Text style={styles.valueText}>
                    {this.component.state.coach?.email}
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.infoText}>Diplôme(s) :</Text>
                  <FlatList
                    data={this.component.state.coach?.diplomas}
                    keyExtractor={(item) => item?.id.toString()}
                    renderItem={({ item }) => (
                      <Text style={styles.valueText}>{item.diploma_name}</Text>
                    )}
                  />
                </View>
                <View style={styles.item}>
                  <Text style={styles.infoText}>Année(s) d'expérience : </Text>
                  <Text style={styles.valueText}>
                    {this.component.state.coach?.experience_years} ans
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.infoText}>Spécialité(s) :</Text>
                  <FlatList
                    style={styles.flatlist}
                    horizontal={true}
                    data={this.component.state.coach?.specialties}
                    keyExtractor={(item) => item?.id.toString()}
                    renderItem={({ item, index }) => (
                      <View
                        style={[
                          styles.flatlistItem,
                          {
                            marginLeft: index === 0 ? 0 : 5,
                            marginRight:
                              index ===
                              this.component.state.coach?.specialties.length - 1
                                ? 0
                                : 5,
                          },
                        ]}>
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
        )}
      </View>
    );
  }
}
