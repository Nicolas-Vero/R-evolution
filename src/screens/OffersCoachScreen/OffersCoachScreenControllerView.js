import React from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList } from 'react-native-gesture-handler';
import Header from '../../components/Header';
import { AddButton, ModifyButton } from '../../components/Button';
import DeleteOfferDialog from '../../components/dialogs/deleteOfferDialog/deleteOfferDialog';
import styles from './OffersCoachScreenStyle';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import SidappRefreshControl from '../../components/SidappRefreshControl/SidappRefreshControl';
export default class OffersCoachScreenView extends AbstractScreenView {
  renderDialog() {
    return (
      <DeleteOfferDialog
        dialogVisible={this.component.state.dialogVisible}
        onClose={this.controller.onDismissDialog}
        onDelete={(itemId) => this.controller.onDelete(itemId)}
      />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Header title="MES OFFRES" />
        {this.renderDialog()}
        <View style={styles.content}>
          <AddButton
            customContainerStyles={styles.addButton}
            customTextStyle={styles.addButtonText}
            title="CRÉER UNE NOUVELLE OFFRE"
            onPress={() => {
              navigate('CreateOfferCoachScreen');
            }}
          />
          <View style={styles.alignCenter}>
            <FlatList
              refreshControl={
                <SidappRefreshControl
                  refreshing={this.component.state.refreshing}
                  onRefresh={this.controller.fetchData}
                />
              }
              contentContainerStyle={{ paddingBottom: 200 }}
              style={styles.flatList}
              data={this.component.state.offers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
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
                  style={styles.item}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemContent}>{item.content}</Text>
                  {!item.nb_credits ||
                  item.nb_credits < 1 ||
                  item.type === 'Autre' ? null : (
                    <Text style={styles.itemNbCredits}>
                      {`${item.nb_credits} coaching${
                        item.nb_credits > 1 ? 's' : ''
                      }`}
                    </Text>
                  )}
                  <View style={styles.itemBottomContainer}>
                    <View style={styles.itemBottomLeft}>
                      <ModifyButton
                        title="Modifier"
                        customContainerStyles={{
                          backgroundColor: '#fff',
                        }}
                        onPress={() => {
                          navigate('UpdateOfferCoachScreen', { item });
                        }}></ModifyButton>
                      <ModifyButton
                        title="Supprimer"
                        customContainerStyles={{
                          backgroundColor: 'transparent',
                          borderWidth: 2,
                          borderColor: '#FFF',
                          borderRadius: 3,
                        }}
                        customTextStyle={{
                          fontFamily: 'Roboto',
                          color: '#fff',
                        }}
                        onPress={() => {
                          this.controller.onOpenDialog(item.id);
                        }}></ModifyButton>
                    </View>
                    <Text style={styles.itemBottomPrice}>{item.price}€</Text>
                  </View>
                </LinearGradient>
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}
