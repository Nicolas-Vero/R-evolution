import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import { AddButton, ModifyButton } from '../../components/Button';
import DeleteOfferDialog from '../../components/dialogs/deleteOfferDialog/deleteOfferDialog';
import SidappRefreshControl from '../../components/SidappRefreshControl/SidappRefreshControl';
import styles from './OffersCoachScreenStyle';

const OffersCoachScreenView = ({ state, controller }) => {
  const navigation = useNavigation();

  const renderDialog = () => (
    <DeleteOfferDialog
      dialogVisible={state.dialogVisible}
      onClose={controller.onDismissDialog}
      onDelete={(itemId) => controller.onDelete(itemId)}
    />
  );

  const renderOfferItem = ({ item }) => (
    <LinearGradient
      colors={['#101010', '#2D333C']}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={styles.item}
    >
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemContent}>{item.content}</Text>

      {item.nb_credits > 0 && item.type !== 'Autre' && (
        <Text style={styles.itemNbCredits}>
          {`${item.nb_credits} coaching${item.nb_credits > 1 ? 's' : ''}`}
        </Text>
      )}

      <View style={styles.itemBottomContainer}>
        <View style={styles.itemBottomLeft}>
          <ModifyButton
            title="Modifier"
            customContainerStyles={{ backgroundColor: '#fff' }}
            onPress={() => navigation.navigate('UpdateOfferCoachScreen', { item })}
          />
          <ModifyButton
            title="Supprimer"
            customContainerStyles={{
              backgroundColor: 'transparent',
              borderWidth: 2,
              borderColor: '#FFF',
              borderRadius: 3,
            }}
            customTextStyle={{ fontFamily: 'Roboto', color: '#fff' }}
            onPress={() => controller.onOpenDialog(item.id)}
          />
        </View>
        <Text style={styles.itemBottomPrice}>{item.price}€</Text>
      </View>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <Header title="MES OFFRES" />
      {renderDialog()}
      <View style={styles.content}>
        <AddButton
          customContainerStyles={styles.addButton}
          customTextStyle={styles.addButtonText}
          title="CRÉER UNE NOUVELLE OFFRE"
          onPress={() => navigation.navigate('CreateOfferCoachScreen')}
        />
        <View style={styles.alignCenter}>
          <FlatList
            data={state.offers}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 200 }}
            style={styles.flatList}
            refreshControl={
              <SidappRefreshControl
                refreshing={state.refreshing}
                onRefresh={controller.fetchData}
              />
            }
            renderItem={renderOfferItem}
          />
        </View>
      </View>
    </View>
  );
};

export default OffersCoachScreenView;
