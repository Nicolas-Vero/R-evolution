import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import styles from './AccountScreenStyle';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import RenewDemandDialog from '../../components/dialogs/renewDemandDialog/renewDemandDialog';
export default class AccountScreenView extends AbstractScreenView {
  renderDialog() {
    return (
      <RenewDemandDialog
        isNewOffer={true}
        dialogVisible={this.component.state.isDialogVisible}
        onClose={this.controller.onDismissDialog}
        onCheckInfoPress={this.controller.onCheckInfoPress}
        onRenewPress={this.controller.onRenewPress}
      />
    );
  }
  render() {
    const { haveCoach } = this.component.state;
    return (
      <View style={styles.container}>
        <Header title="MON COMPTE" />
        <View style={styles.content}>
          <TouchableOpacity
            onPress={this.controller.onProfilePress}
            style={styles.item}>
            <View style={styles.itemRow}>
              <Image
                source={require('../../../assets/icons/my_informations.png')}
                style={styles.icon}></Image>
              <Text style={styles.itemText}>Mes informations</Text>
            </View>
          </TouchableOpacity>
          {haveCoach ? null : (
            <View>
              {this.renderDialog()}
              <TouchableOpacity
                style={styles.item}
                onPress={this.controller.openDialog}>
                <View style={styles.itemRow}>
                  <Image
                    source={require('../../../assets/icons/renew.png')}
                    style={styles.icon}></Image>
                  <Text style={styles.itemText}>Renouveller la demande</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            onPress={this.controller.onLogoutPress}
            style={[styles.item, { backgroundColor: '#2CDEE4' }]}>
            <View style={styles.itemRow}>
              <Image
                source={require('../../../assets/icons/logout.png')}
                style={styles.icon}></Image>
              <Text style={[styles.itemText, { color: '#000' }]}>
                Déconnexion
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
