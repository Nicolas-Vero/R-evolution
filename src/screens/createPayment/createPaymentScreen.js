import React from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
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
import { AddOffer, get_coach_offers } from '../../api/Offers';
import SelectDropdown from 'react-native-select-dropdown';
import {
  get_paiement_for_coach,
  get_payment_details,
} from '../../api/Paiement';
import { loadFonts } from '../../configs/design/font';
import styles from './createPayementStyle';
import { add_manual_payment, add_transaction } from '../../api/Coach';
import { ScrollView } from 'react-native-gesture-handler';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { arrayPush } from 'redux-form';
export default class createPaymentScreen extends React.Component {
  state = {
    today: moment().format('l'),
    Offer: [],
    date: '',
    awaitingPaiement: [],
    Paiement: [],
    loaded: false,
    offer_id: '',
    transaction_id: Math.floor(Math.random() * 1000),
  };
  componentDidMount() {
    loadFonts(),
      get_coach_offers()
        .then((res) => {
          this.setState({ Offer: res.data.offers });
        })
        .then(() => {
          this.setState({ loaded: true });
        });
    // get_paiement_for_coach().then((res) => {
    //   this.setState({ Paiement: res.data });
    // });
  }

  addPaiement(values) {
    let totalAmount = 0;
    try {
      values.paiementList.forEach(async (element) => {
        element.athlete_id = this.props.navigation.state.params.athlete;
        element.offer_id = this.state.offer_id;
        element.transaction_id = this.state.transaction_id;
        totalAmount = totalAmount + parseInt(element.paiement.amount);
        element.mode = element.paiement.mode;
        element.date = element.paiement.date;
        element.amount = element.paiement.amount;
        element.installments = element.paiement.installments;
        await add_manual_payment(element);
      });
      add_transaction({
        athlete_id: this.props.navigation.state.params.athlete,
        installments: values.paiementList.length,
        offer_id: values.offer_id,
        transaction_id: this.state.transaction_id,
        amount: totalAmount,
      });
      this.props.navigation.goBack();
    } catch (err) {
      this.setState({ loading: false });
      console.warn(err);
    }
  }

  getErrorMessage() {
    if (this.state.errorMessage !== '')
      return (
        <ResponsiveText style={{ alignSelf: 'center', fontSize: '3.5%' }}>
          {this.state.errorMessage}
        </ResponsiveText>
      );
    return (
      <ResponsiveText
        style={{
          alignSelf: 'center',
          fontSize: '3.5%',
          opacity: 0,
        }}>
        Hidden Text
      </ResponsiveText>
    );
  }

  render() {
    const paiementMode = ['Virement', 'Espece'];
    if (!this.state.loaded) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
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
          style={styles.container}>
          <SafeAreaView style={styles.safeArea} />
          <Header title="VENTE" />
          <View style={styles.content}>
            <Formik
              initialValues={{
                Paiement: {
                  amount: 0,
                  installments: 1,
                  mode: '',
                  date: '',
                },
                offer_id: '',
                paiementList: [],
              }}
              onSubmit={(values) => {
                this.addPaiement(values);
              }}>
              {({
                handleChange,
                handleSubmit,
                handleBlur,
                values,
                validate,
                isValid,
              }) => (
                <View style={styles.container}>
                  <Field name="Paiement" id="Paiement" validate={validate}>
                    {({ field, form: { errors } }) => {
                      return (
                        <View style={styles.container}>
                          <Text style={styles.text}>Nom de l'offre</Text>
                          <SelectDropdown
                            buttonStyle={styles.dropdownButton}
                            buttonTextStyle={styles.dropdownButtonText}
                            rowTextStyle={styles.dropdownRowText}
                            dropdownStyle={styles.dropdownBg}
                            rowStyle={styles.dropdownRow}
                            data={this.state.Offer}
                            defaultButtonText={'Recherche ton offre'}
                            onSelect={(selectedItem, index) => {
                              this.setState({ offer_id: selectedItem.id });
                              values.offer_id = selectedItem.id;
                              return selectedItem;
                            }}
                            renderDropdownIcon={() => {
                              return (
                                <AntDesign
                                  name="down"
                                  size={18}
                                  color="black"
                                />
                              );
                            }}
                            dropdownIconPosition={'right'}
                            buttonTextAfterSelection={(selectedItem, index) => {
                              return selectedItem.title;
                            }}
                            rowTextForSelection={(item, index) => {
                              return item.title;
                            }}
                          />
                          <FieldArray
                            name="paiementList"
                            render={(arrayhelper) => (
                              <View style={styles.PaiementContainer}>
                                <ScrollView
                                  ref={(ref) => (this.scrollView = ref)}
                                  style={styles.scrollView}
                                  onContentSizeChange={(width, height) =>
                                    this.scrollView.scrollTo({
                                      y: height,
                                    })
                                  }>
                                  <View style={styles.alignCenter}>
                                    <View
                                      style={{
                                        marginBottom: 25,
                                      }}>
                                      <View>
                                        <View
                                          style={styles.paymentInfoContainer}>
                                          <View
                                            style={styles.paymentInfoColumn}>
                                            <Text style={styles.text}>
                                              Date
                                            </Text>
                                            <TextInput
                                              placeholderTextColor="#979797"
                                              placeholder="10/20/21"
                                              style={styles.input}
                                              onChangeText={(text) => {
                                                field.value.date = text;
                                                this.setState({ date: text });
                                              }}
                                              onBlur={handleBlur('date')}
                                              value={values.date}
                                            />
                                          </View>
                                          <View
                                            style={
                                              styles.paymentInfoColumnCenter
                                            }>
                                            <Text style={styles.text}>
                                              Moyen de paiement
                                            </Text>
                                            <SelectDropdown
                                              buttonStyle={
                                                styles.dropdownButtonSmall
                                              }
                                              buttonTextStyle={
                                                styles.dropdownButtonText
                                              }
                                              rowTextStyle={
                                                styles.dropdownRowText
                                              }
                                              dropdownStyle={styles.dropdownBg}
                                              rowStyle={styles.dropdownRow}
                                              data={paiementMode}
                                              defaultButtonText={
                                                'Mode de paiement'
                                              }
                                              onSelect={(selectedItem) => {
                                                field.value.mode = selectedItem;
                                              }}
                                              renderDropdownIcon={() => {
                                                return (
                                                  <AntDesign
                                                    name="down"
                                                    size={18}
                                                    color="black"
                                                  />
                                                );
                                              }}
                                              dropdownIconPosition={'right'}
                                              buttonTextAfterSelection={(
                                                selectedItem,
                                                index,
                                              ) => {
                                                return selectedItem;
                                              }}
                                              rowTextForSelection={(
                                                item,
                                                index,
                                              ) => {
                                                return item;
                                              }}
                                            />
                                          </View>
                                          <View
                                            style={styles.paymentInfoColumn}>
                                            <Text style={styles.text}>
                                              Prix
                                            </Text>
                                            <View style={styles.priceContainer}>
                                              <TextInput
                                                placeholderTextColor="#979797"
                                                placeholder="120"
                                                style={styles.input}
                                                onChangeText={(text) =>
                                                  (field.value.amount = text)
                                                }
                                                onBlur={handleBlur('price')}
                                                value={values.price}
                                              />
                                              <Text style={styles.euro}>€</Text>
                                            </View>
                                          </View>
                                        </View>

                                        <View
                                          style={styles.buttonContainer}></View>
                                      </View>
                                      {
                                        <View
                                          style={
                                            styles.PaiementDeleteContainer
                                          }>
                                          <TouchableOpacity
                                            onPress={() =>
                                              arrayhelper.remove()
                                            }>
                                            <Text
                                              style={{
                                                color: '#2CDEE4',
                                              }}>
                                              Supprimer
                                            </Text>
                                          </TouchableOpacity>
                                        </View>
                                      }
                                    </View>
                                  </View>
                                  <KeyboardSpacer />
                                </ScrollView>
                                <TouchableOpacity
                                  onPress={() => {
                                    const paiementDate = moment(
                                      this.state.date,
                                    ).format('l');

                                    const paiement = {
                                      amount: field.value.amount,
                                      installments:
                                        values.paiementList.length + 1,
                                      mode: field.value.mode,
                                      date: field.value.date,
                                    };
                                    arrayhelper.push({ paiement });
                                    if (this.state.today > paiementDate) {
                                      this.setState((prevState) => ({
                                        Paiement: [
                                          ...prevState.Paiement,
                                          paiement,
                                        ],
                                      }));
                                    } else {
                                      this.setState((prevState) => ({
                                        awaitingPaiement: [
                                          ...prevState.awaitingPaiement,
                                          paiement,
                                        ],
                                      }));
                                    }
                                  }}>
                                  <View style={styles.addPaiementContainer}>
                                    <FontAwesome
                                      name="plus-square"
                                      size={24}
                                      color="#2CDEE4"
                                    />
                                    <Text style={styles.addPaiementText}>
                                      Ajouter un paiement
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                                <View
                                  style={{
                                    marginTop: heightPercentageToDP(5),
                                  }}>
                                  <Text style={styles.text}>
                                    Paiement(s) enregistré(s)
                                  </Text>
                                  <FlatList
                                    style={{ maxHeight: 75 }}
                                    data={this.state.Paiement}
                                    extraData={this.state}
                                    keyExtractor={
                                      (item) => item
                                      // .id.toString()
                                    }
                                    renderItem={({ item }) => (
                                      <View style={styles.paymentItem}>
                                        <Text style={styles.paymentItemText}>
                                          {moment(item.date).format('L')}
                                        </Text>
                                        <Text style={styles.paymentItemText}>
                                          {item.offer?.title}
                                        </Text>
                                        <Text style={styles.paymentItemText}>
                                          {item.mode} - {item.amount}€
                                        </Text>
                                      </View>
                                    )}
                                  />

                                  <View style={{ marginTop: 10 }}>
                                    <Text style={styles.text}>
                                      Paiement(s) en attente
                                    </Text>
                                    <FlatList
                                      style={{ maxHeight: 75 }}
                                      data={this.state.awaitingPaiement}
                                      extraData={this.state}
                                      keyExtractor={
                                        (item) => item
                                        //  .id.toString()
                                      }
                                      renderItem={({ item }) => (
                                        <View style={styles.paymentItem}>
                                          <Text style={styles.paymentItemText}>
                                            {moment(item.date).format('l')}
                                          </Text>
                                          <Text style={styles.paymentItemText}>
                                            {item.title}
                                          </Text>
                                          <Text style={styles.paymentItemText}>
                                            {item.mode} -{item.amount}
                                          </Text>
                                        </View>
                                      )}
                                    />
                                  </View>
                                </View>
                              </View>
                            )}
                          />
                        </View>
                      );
                    }}
                  </Field>
                  <Button
                    loading={false}
                    disabled={!isValid}
                    title="Enregistrer un paiement"
                    customTextStyle={styles.nextButtonText}
                    onPress={handleSubmit}
                  />
                </View>
              )}
            </Formik>
          </View>
        </LinearGradient>
      );
    }
  }
}
