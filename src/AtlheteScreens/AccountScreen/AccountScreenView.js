import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import styles from './AccountScreenStyle';
import RenewDemandDialog from '../../components/dialogs/renewDemandDialog/renewDemandDialog';

const AccountScreenView = ({ state, controller }) => {
  const { haveCoach, isDialogVisible } = state;

  const renderDialog = () => (
    <RenewDemandDialog
      isNewOffer={true}
      dialogVisible={isDialogVisible}
      onClose={controller.onDismissDialog}
      onCheckInfoPress={controller.onCheckInfoPress}
      onRenewPress={controller.onRenewPress}
    />
  );

  return (
    <View style={styles.container}>
      <Header title="MON COMPTE" />
      <View style={styles.content}>
        <TouchableOpacity onPress={controller.onProfilePress} style={styles.item}>
          <View style={styles.itemRow}>
            <Image
              source={require('../../../assets/icons/my_informations.png')}
              style={styles.icon}
            />
            <Text style={styles.itemText}>Mes informations</Text>
          </View>
        </TouchableOpacity>

        {!haveCoach && (
          <View>
            {renderDialog()}
            <TouchableOpacity onPress={controller.openDialog} style={styles.item}>
              <View style={styles.itemRow}>
                <Image
                  source={require('../../../assets/icons/renew.png')}
                  style={styles.icon}
                />
                <Text style={styles.itemText}>Renouveller la demande</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          onPress={controller.onLogoutPress}
          style={[styles.item, { backgroundColor: '#2CDEE4' }]}
        >
          <View style={styles.itemRow}>
            <Image
              source={require('../../../assets/icons/logout.png')}
              style={styles.icon}
            />
            <Text style={[styles.itemText, { color: '#000' }]}>
              Déconnexion
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountScreenView;
