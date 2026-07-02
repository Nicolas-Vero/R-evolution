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
import { isIphoneX } from 'react-native-iphone-x-helper';

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
          initial={this.component.props.tab || 0}
          onPress={(value) => this.component.setState({ screen: value })}
          backgroundColor="#1E2026"
          buttonColor="#2CDEE4"
          selectedColor="#1E2026"
          textColor="white"
          borderRadius={10}
          height={45}
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
      <View style={{ height: '100%' }}>
        {this.renderDialog()}
        <FlatList
          contentContainerStyle={{
            paddingBottom: 200,
          }}
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
                {/* <Text style={styles.catalogItemPrice}>{item.price}€</Text> */}
              </TouchableOpacity>
            </LinearGradient>
          )}
        />
      </View>
    );
  };
  render() {
    return !this.component.state.isLoaded ? (
      <View style={styles.container}>
        <View style={styles.content}>
          <ActivityIndicator />
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        <Header title="LES OFFRES" disableBackPress />
        <View style={styles.alignCenter}>
          {this.renderSwitchSelector()}
          {this.component.state.screen == 'EN COURS' ? (
            this.component.state.ActiveCourses.offer == null ? (
              <View style={styles.noCourContainer}>
                <Text style={styles.noCourText}>Pas de cours actif</Text>
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
                style={styles.currentOffer}>
                <View style={styles.currentOfferCoach}>
                  <Avatar
                    size={44}
                    rounded
                    source={
                      this.component.state.ActiveCourses.coach
                        .profile_picture_url
                        ? {
                            uri: this.component.state.ActiveCourses.coach
                              .profile_picture_url,
                          }
                        : require('../../../assets/images/no_pp.jpg')
                    }
                  />
                  <Text
                    style={styles.currentOfferCoachName}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {this.component.state.ActiveCourses.coach.first_name}{' '}
                    {this.component.state.ActiveCourses.coach.last_name}
                  </Text>
                </View>
                <View>
                  <Text style={styles.currentOfferTitle}>
                    {this.component.state.ActiveCourses.offer.title}
                  </Text>
                </View>
                <View>
                  <Text style={styles.currentOfferContent}>
                    {this.component.state.ActiveCourses.offer.content}
                  </Text>
                </View>
                <View style={styles.currentOfferInfos}>
                  <Text style={styles.currentOfferSessions}>
                    {`${this.component.state.ActiveCourses.total_sessions} ${
                      this.component.state.ActiveCourses.total_sessions > 1
                        ? 'coachings'
                        : 'coaching'
                    }`}
                  </Text>
                  <Text style={styles.currentOfferPrice}>
                    {this.component.state.ActiveCourses.offer.price}€
                  </Text>
                </View>
                <View style={styles.currentOfferSessionsLeftContainer}>
                  <Text style={styles.currentOfferSessionsLefText}>
                    {`Nombre de séances restantes: ${
                      this.component.state.ActiveCourses.total_sessions -
                      this.component.state.ActiveCourses.booked_session
                    }`}
                  </Text>
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
                Pas de coach associé
              </Text>
            </View>
          ) : (
            this.renderCatalog()
          )}
        </View>
      </View>
    );
  }
}
