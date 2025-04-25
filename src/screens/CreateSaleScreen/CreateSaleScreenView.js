import React from 'react';
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
import { Text } from 'react-native-elements';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import SelectDropdown from 'react-native-select-dropdown';
import styles from './CreateSaleScreenStyle';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Entypo } from '@expo/vector-icons';
import DeleteSaleDialog from '../../components/dialogs/deleteSaleDialog/deleteSaleDialog';
import ValidateSaleDialog from '../../components/dialogs/validateSaleDialog/validateSaleDialog';
import { TextInputMask } from 'react-native-masked-text';

import { heightPercentageToDP } from 'react-native-responsive-screen';
import SaveSaleDialog from '../../components/dialogs/saveSaleDialog/SaveSaleDialog';
import 'moment/locale/fr';
moment.locale('fr');

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
  renderSaveSaleDialog = () => {
    const { isSaveSaleVisible, isCreation } = this.component.state;
    return (
      <SaveSaleDialog
        dialogVisible={isSaveSaleVisible}
        onValidate={() =>
          isCreation ? this.controller.onSave() : this.controller.onUpdate()
        }
        onClose={this.controller.onDismissSaveSaleDialog}
        update={!isCreation}
      />
    );
  };
  renderCreation = () => {
    const { isCreation, item, totalPrice } = this.component.state;
    return (
      <View style={styles.offerTop}>
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>Nom de l'offre</Text>
          <View></View>
          {isCreation ? (
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
          ) : (
            <View style={styles.offerInfo}>
              <Text
                style={
                  styles.offerInfoText
                }>{`${item.offer?.title} - ${item.offer?.price}€`}</Text>
            </View>
          )}
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

  renderOfferInfo = () => {
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
    </View>;
  };

  renderAddSale = () => {
    const paiementMode = ['Espèce', 'CB', 'Chèque', 'Virement'];

    const { selectedSaleType, inputDate, addPrice } = this.component.state;

    let isValid = moment(inputDate, 'DD/MM/YYYY', true).isValid();
    const canAddSale = isValid && addPrice && selectedSaleType;
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
              alignItems: 'center',
            }}>
            <TextInputMask
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY',
              }}
              placeholder={moment().format('DD/MM/YYYY')}
              value={inputDate}
              onChangeText={(text) => {
                this.component.setState({
                  inputDate: text,
                });
              }}
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
              returnKeyType="done"
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
              keyExtractor={() => Math.random().toString()}
              renderItem={({ item, index }) => {
                const date = moment(item.date).isValid()
                  ? moment(item.date).format('DD/MM/YYYY')
                  : item.date;
                return (
                  <View style={styles.paymentItem}>
                    <Text style={styles.paymentItemText}>{date}</Text>
                    <Text style={styles.paymentItemText}>{item.mode}</Text>
                    <Text style={styles.paymentItemText}>{item.amount}€</Text>
                  </View>
                );
              }}
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
        {!nextPayment.length ? (
          <Text style={styles.noPaymentText}>Aucun</Text>
        ) : (
          <FlatList
            style={styles.flatlist}
            data={this.component.state.nextPayment}
            keyExtractor={() => Math.random().toString()}
            renderItem={({ item, index }) => {
              const date = moment(item.date).isValid()
                ? moment(item.date).format('DD/MM/YYYY')
                : item.date;
              return (
                <View style={{ marginTop: 22 }}>
                  <View style={styles.nextPaymentItem}>
                    <TouchableOpacity
                      onPress={() => this.controller.openDeleteSaleDialog(item)}
                      style={styles.paiymentDelete}>
                      <Entypo name="cross" size={15} />
                    </TouchableOpacity>
                    <Text style={styles.paymentItemText}>{date}</Text>
                    <Text style={styles.paymentItemText}>{item.mode}</Text>
                    <Text style={styles.paymentItemText}>{item.amount}€</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => this.controller.openValidateSaleDialog(item)}
                    style={{ alignItems: 'flex-end', marginTop: 12 }}>
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
              );
            }}
          />
        )}
      </View>
    );
  }
  renderSaveButton = () => {
    const { oldPayment, nextPayment, isCreation } = this.component.state;
    const isValid = oldPayment.length > 0 || nextPayment.length > 0;
    return (
      <View
        style={{
          bottom: 100,
        }}>
        <TouchableOpacity
          disabled={!isValid}
          onPress={this.controller.openSaveSaleDialog}
          style={{
            paddingVertical: 15,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#2CDEE4',
            borderRadius: 3,
          }}>
          <Text style={{ fontSize: 15, fontFamily: 'RobotoBold' }}>
            Enregistrer
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    if (!this.component.state.loaded) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    const { item, selectedOffer } = this.component.state;

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
          <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
            {this.renderCreation()}
            <View
              style={{
                flex: 1,
                height: heightPercentageToDP(80),
              }}>
              {!selectedOffer && !item ? null : this.renderAddSale()}
              {!selectedOffer && !item ? null : this.renderOldSales()}
              {!selectedOffer && !item ? null : this.renderNextSales()}
            </View>
            {this.renderValidateSaleDialog()}
            {this.renderDeleteSaleDialog()}
            {this.renderSaveSaleDialog()}
            {!selectedOffer && !item ? null : this.renderSaveButton()}

          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}
