import React from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Field, FieldArray, Formik } from 'formik';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
import { Text } from 'react-native-elements';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import SelectDropdown from 'react-native-select-dropdown';
import styles from './CreateSaleScreenStyle';
import { ScrollView } from 'react-native-gesture-handler';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Entypo } from '@expo/vector-icons';
import DeleteSaleDialog from '../../components/dialogs/deleteSaleDialog/deleteSaleDialog';
import ValidateSaleDialog from '../../components/dialogs/validateSaleDialog/validateSaleDialog';
export default class CreateSaleScreenView extends AbstractScreenView {
  renderValidateSaleDialog = () => {
    const { isValidateSaleDialogVisible } = this.component.state;
    return (
      <ValidateSaleDialog
        dialogVisible={isValidateSaleDialogVisible}
        onValidate={this.controller.onValidateSale}
        onClose={this.controller.onDismissValidateSaleDialog}
      />
    );
  };

  renderDeleteSaleDialog = () => {
    const { isDeleteSaleVisible } = this.component.state;
    return (
      <DeleteSaleDialog
        dialogVisible={isDeleteSaleVisible}
        onValidate={this.controller.onDeleteSale}
        onClose={this.controller.onDismissDeleteSaleDialog}
      />
    );
  };
  renderCreation = () => {
    const { selectedOffer, totalPrice } = this.component.state;
    return (
      <View style={styles.offerTop}>
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>Nom de l'offre</Text>
          <SelectDropdown
            buttonStyle={styles.dropdownButton}
            buttonTextStyle={styles.dropdownButtonText}
            rowTextStyle={styles.dropdownRowText}
            dropdownStyle={styles.dropdownBg}
            rowStyle={styles.dropdownRow}
            data={this.component.state.Offer}
            defaultButtonText={'Recherche ton offre'}
            onSelect={(selectedOffer, index) => {
              this.controller.onChangeOffer(selectedOffer);
              // values.offer_id = selectedItem.id;
              return selectedOffer;
            }}
            renderDropdownIcon={() => {
              return <AntDesign name="down" size={18} color="black" />;
            }}
            dropdownIconPosition={'right'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return `${selectedItem.title} - ${selectedItem.price}€`;
            }}
            rowTextForSelection={(item, index) => {
              return `${item.title} - ${item.price}€`;
            }}
          />
        </View>
        <View style={{ marginLeft: 24 }}>
          <Text style={styles.text}>Prix total</Text>
          <View style={styles.row}>
            <View style={styles.priceInfo}>
              <Text style={styles.priceText}>
                {totalPrice > 0 ? totalPrice : null}
              </Text>
            </View>
            <Text style={styles.priceCurrency}>€</Text>
          </View>
        </View>
      </View>
    );
  };

  renderOfferInfo = () => {};

  renderAddSale = () => {
    const paiementMode = ['Virement', 'Espece'];

    const { selectedSaleType, inputDate, addPrice } = this.component.state;

    const canAddSale = inputDate && addPrice && selectedSaleType;
    return (
      <View style={{ marginTop: 20 }}>
        <Text style={styles.text}>Ajouter un paiement :</Text>

        <View style={styles.row}>
          <View
            style={{
              width: 100,
              backgroundColor: '#fff',
              height: 30,
              justifyContent: 'center',
            }}>
            <DateTimePicker
              textColor="dark"
              display={'default'}
              minimumDate={new Date()}
              testID="dateTimePicker"
              value={inputDate}
              mode={'date'}
              is24Hour={true}
              locale="fr-FR"
              is24Hour={true}
              display="default"
              onChange={this.controller.onDateChange}
            />
          </View>
          <SelectDropdown
            buttonStyle={styles.dropdownButtonSmall}
            buttonTextStyle={styles.dropdownButtonText}
            rowTextStyle={styles.dropdownRowText}
            dropdownStyle={styles.dropdownBg}
            rowStyle={styles.dropdownRow}
            data={paiementMode}
            defaultButtonText={'Mode de paiement'}
            onSelect={(selectedItem) => {
              this.component.setState({ selectedSaleType: selectedItem });
            }}
            renderDropdownIcon={() => {
              return <AntDesign name="down" size={18} color="black" />;
            }}
            dropdownIconPosition={'right'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedSaleType || 'Mode de paiement';
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
          <View style={[styles.row]}>
            <TextInput
              keyboardType="numeric"
              style={styles.priceInput}
              placeholder="Prix"
              placeholderTextColor="#979797"
              onChangeText={(val) => this.controller.onChangePrice(val)}
              value={addPrice}
            />
            <Text style={styles.priceCurrency}>€</Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity
            style={{ marginTop: 12 }}
            disabled={!canAddSale}
            onPress={this.controller.onAddPaiement}>
            <Text
              style={{
                color: canAddSale ? '#fff' : '#979797',
                fontSize: 12,
                fontFamily: 'Roboto',
              }}>
              Valider la ligne de paiement
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderOldSales() {
    const { oldPayment } = this.component.state;
    return (
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentTitle}>Paiement(s) encaissé(s) :</Text>
        <View style={styles.paymentContent}>
          {!oldPayment.length ? (
            <Text style={styles.noPaymentText}>Aucun</Text>
          ) : (
            <FlatList
              style={styles.flatlist}
              data={this.component.state.oldPayment}
              keyExtractor={() => Math.random()}
              renderItem={({ item, index }) => (
                <View style={styles.paymentItem}>
                  <TouchableOpacity
                    onPress={() => this.controller.openDeleteSaleDialog(item)}
                    style={styles.paiymentDelete}>
                    <Entypo name="cross" size={15} />
                  </TouchableOpacity>
                  <Text style={styles.paymentItemText}>
                    {moment(item.date).format('L')}
                  </Text>
                  <Text style={styles.paymentItemText}>{item.mode}</Text>
                  <Text style={styles.paymentItemText}>{item.amount}€</Text>
                </View>
              )}
            />
          )}
        </View>
      </View>
    );
  }

  renderNextSales() {
    const { nextPayment } = this.component.state;

    return (
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentTitle}>Paiement(s) en attente :</Text>
        <View style={styles.paymentContent}>
          {!nextPayment.length ? (
            <Text style={styles.noPaymentText}>Aucun</Text>
          ) : (
            <FlatList
              style={styles.flatlist}
              data={this.component.state.nextPayment}
              keyExtractor={() => Math.random()}
              renderItem={({ item, index }) => (
                <View>
                  <View
                    style={[
                      styles.paymentItem,
                      { backgroundColor: '#2CDEE4' },
                    ]}>
                    <TouchableOpacity
                      onPress={() => this.controller.openDeleteSaleDialog(item)}
                      style={styles.paiymentDelete}>
                      <Entypo name="cross" size={15} />
                    </TouchableOpacity>
                    <Text style={styles.paymentItemText}>
                      {moment(item.date).format('L')}
                    </Text>
                    <Text style={styles.paymentItemText}>{item.mode}</Text>
                    <Text style={styles.paymentItemText}>{item.amount}€</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => this.controller.openValidateSaleDialog(item)}
                    style={{ alignItems: 'flex-end' }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 10,
                        fontFamily: 'RobotoBold',
                      }}>
                      Valider le paiement
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>
      </View>
    );
  }
  renderSaveButton = () => {
    const { oldPayment, nextPayment } = this.component.state;
    const isValid = oldPayment.length > 0 || nextPayment.length > 0;
    return (
      <Button
        loading={false}
        disabled={!isValid}
        title="Enregistrer"
        customTextStyle={styles.nextButtonText}
        onPress={this.controller.onSave}
      />
    );
  };
  render() {
    const { isCreation, selectedOffer } = this.component.state;
    if (!this.component.state.loaded) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#000000', '#2D333C']}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 1,
            y: 1,
          }}
          style={styles.content}>
          <Header title="VENTE" />
          {isCreation ? this.renderCreation() : null}
          {!selectedOffer ? null : this.renderAddSale()}
          {!selectedOffer ? null : this.renderOldSales()}
          {!selectedOffer ? null : this.renderNextSales()}
          {!selectedOffer ? null : this.renderSaveButton()}
          {this.renderValidateSaleDialog()}
          {this.renderDeleteSaleDialog()}
        </LinearGradient>
      </View>
    );
  }
}
