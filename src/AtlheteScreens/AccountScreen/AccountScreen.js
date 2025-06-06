import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import styles from './AccountScreenStyle';
import RenewDemandDialog from '../../components/dialogs/renewDemandDialog/renewDemandDialog';
import AuthService from '../../services/AuthService';
import { renew_request } from '../../api/Athlete';

const AccountScreen = () => {
  const navigation = useNavigation();

  const [haveCoach, setHaveCoach] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    const checkCoach = async () => {
      const user = await AuthService.getUser();
      setHaveCoach(!!user.coach);
    };
    checkCoach();
  }, []);

  const handleLogout = async () => {
    await AuthService.logout(false);
    navigation.navigate('Entry');
  };

  const handleProfilePress = () => {
    navigation.navigate('ProfileAthleteScreen');
  };

  const handleOpenDialog = () => setIsDialogVisible(true);
  const handleDismissDialog = () => setIsDialogVisible(false);

  const handleCheckInfoPress = () => {
    handleDismissDialog();
    handleProfilePress();
  };

  const handleRenewPress = async () => {
    await renew_request();
    handleDismissDialog();
  };

  return (
    <View style={styles.container}>
      <Header title="MON COMPTE" />
      <View style={styles.content}>
        <TouchableOpacity onPress={handleProfilePress} style={styles.item}>
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
            <RenewDemandDialog
              isNewOffer={true}
              dialogVisible={isDialogVisible}
              onClose={handleDismissDialog}
              onCheckInfoPress={handleCheckInfoPress}
              onRenewPress={handleRenewPress}
            />
            <TouchableOpacity onPress={handleOpenDialog} style={styles.item}>
              <View style={styles.itemRow}>
                <Image
                  source={require('../../../assets/icons/renew.png')}
                  style={styles.icon}
                />
                <Text style={styles.itemText}>Renouveler la demande</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          onPress={handleLogout}
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

export default AccountScreen;
