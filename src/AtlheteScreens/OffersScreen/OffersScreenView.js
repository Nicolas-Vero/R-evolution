import React from 'react';
import { Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { ModifyButton } from '../../components/Button';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { Avatar } from 'react-native-elements';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import RenewOfferDialog from '../../components/dialogs/renewOfferDialog/renewOfferDialog';

import styles from './OffersScreenStyle';

const options = [
  { label: 'EN COURS', value: 'EN COURS' },
  { label: 'CATALOGUE', value: 'CATALOGUE' },
];

export default class OffersScreenView extends AbstractScreenView {
  renderDialog() {
    return (
      <RenewOfferDialog
        isNewOffer={true}
        dialogVisible={this.component.state.isDialogVisible}
        onClose={this.controller.onDismissDialog}
        onValidate={this.controller.onCoachPress}
      />
    );
  }
  renderSwitchSelector() {
    return (
      <View style={{ alignItems: 'center' }}>
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
          style={{ width: 'auto' }}
          hasPadding
          fontSize={13}
          selectedTextStyle={{
            fontFamily: 'MontserratBoldItalic',
            lineHeight: 15,
          }}
          textStyle={{
            fontFamily: 'MontserratBoldItalic',
            lineHeight: 15,
          }}
          valuePadding={3}
          borderColor="#1E2026"
        />
      </View>
    );
  }

  renderCurrentOffers = () => {
    return <View></View>;
  };

  renderCatalog = () => {
    return (
      <View>
        {this.renderDialog()}
        <FlatList
          style={styles.flatlist}
          data={this.component.state.offers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <LinearGradient
              colors={['#101010', '#2D333C']}
              start={{
                x: 1,
                y: 1,
              }}
              end={{
                x: 0,
                y: 0,
              }}
              style={[styles.catalogItem, { marginTop: index === 0 ? 0 : 5 }]}>
              <Text style={styles.catalogItemTitle}>{item.title}</Text>
              <Text style={styles.catalogItemDescription}>{item.content}</Text>
              <Text style={styles.catalogItemCoaching}>
                {item.nb_credits} coachings
              </Text>
              <TouchableOpacity
                onPress={this.controller.openDialog}
                style={styles.catalogItemButtonContainer}>
                <View style={styles.catalogItemButton}>
                  <Text style={styles.catalogItemButtonText}>
                    Choisir cette offre
                  </Text>
                </View>
                <Text style={styles.catalogItemPrice}>{item.price / 100}€</Text>
              </TouchableOpacity>
            </LinearGradient>
          )}
        />
      </View>
    );
  };
  render() {
    if (!this.component.state.loading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView>
            <Header title="LES OFFRES" disableBackPress />
            <View style={styles.alignCenter}>
              {this.renderSwitchSelector()}
              {this.component.state.screen == 'EN COURS' ? (
                this.component.state.ActiveCourses.offer == null ? (
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: heightPercentageToDP(25),
                    }}>
                    <Text
                      style={{
                        fontFamily: 'RobotoBold',
                        fontSize: 20,
                        color: '#FFFF',
                      }}>
                      Pas de cours actif
                    </Text>
                  </View>
                ) : (
                  <LinearGradient
                    colors={['#101010', '#2D333C']}
                    start={{
                      x: 1,
                      y: 1,
                    }}
                    end={{
                      x: 0,
                      y: 0,
                    }}
                    style={{
                      flexDirection: 'column',
                      backgroundColor: 'grey',
                      marginVertical: 10,
                      borderRadius: 10,
                      padding: 20,
                    }}>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Avatar
                        size="medium"
                        rounded
                        source={{
                          uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/photo_florian_coach.png',
                        }}
                      />
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 20,
                          marginLeft: 10,
                          fontFamily: 'RobotoBold',
                          color: '#FFFFFF',
                          lineHeight: 24,
                        }}>
                        {this.component.state.ActiveCourses.coach.first_name}{' '}
                        {this.component.state.ActiveCourses.coach.last_name}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          marginTop: 30,
                          fontFamily: 'MontserratBold',
                          fontSize: 20,
                          color: '#FFFFFF',
                          lineHeight: 24,
                        }}>
                        {this.component.state.ActiveCourses.offer.title}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          marginTop: 10,
                          color: '#FFFFFF',
                          fontSize: 10,
                        }}>
                        {this.component.state.ActiveCourses.offer.content}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: widthPercentageToDP(90),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{ marginTop: 10, color: '#2CDEE4' }}>
                        {this.component.state.ActiveCourses.total_sessions}{' '}
                        coachings
                      </Text>
                      <Text
                        style={{
                          fontStyle: 'italic',
                          fontWeight: 'bold',
                          fontSize: 20,
                          color: '#2CDEE4',
                        }}>
                        {this.component.state.ActiveCourses.offer.price}€
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 20,
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <View
                          style={{
                            backgroundColor: '#2CDEE4',
                            alignItems: 'center',
                            padding: 10,
                            paddingHorizontal: 30,
                            borderRadius: 10,
                            width: widthPercentageToDP(90),
                          }}>
                          <Text style={{ fontFamily: 'Roboto' }}>
                            Nombre de séances restantes:{' '}
                            {
                              this.component.state.ActiveCourses.offer
                                .nb_credits
                            }
                          </Text>
                        </View>
                      </View>
                    </View>
                  </LinearGradient>
                )
              ) : this.component.state.offers == null ? (
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: heightPercentageToDP(25),
                  }}>
                  <Text
                    style={{
                      fontFamily: 'RobotoBold',
                      fontSize: 20,
                      color: '#FFFF',
                    }}>
                    pas de coach associé
                  </Text>
                </View>
              ) : (
                this.renderCatalog()
              )}
            </View>
          </SafeAreaView>
        </View>
      );
    }
  }
}
