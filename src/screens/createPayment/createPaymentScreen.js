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
import { Formik } from 'formik';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
import { Text } from 'react-native-elements';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { AddOffer, get_coach_offers } from '../../api/Offers';
import SelectDropdown from 'react-native-select-dropdown';
import { create_paiement, get_paiement_for_coach } from '../../api/Paiement';
import { loadFonts } from '../../configs/design/font';
import styles from './createPayementStyle';
export default class createPaymentScreen extends React.Component {
  state = {
    Offer: [],
    Paiement: [],
    loaded: false,
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
    get_paiement_for_coach().then((res) => {
      this.setState({ Paiement: res.data });
    });
  }

  addPaiement(values) {
    create_paiement(values).then(() => {});
  }

  createOffer(values) {
    try {
      AddOffer(values).then(this.props.navigation.goBack());
    } catch (error) {
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
          <Header title="PAIEMENT" />
          <View style={styles.content}>
            <Formik
              initialValues={{
                name: '',
                date: '',
                paiementMode: '',
                price: '',
              }}>
              {({ handleChange, handleBlur, values }) => (
                <View>
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
                      return selectedItem;
                    }}
                    renderDropdownIcon={() => {
                      return <AntDesign name="down" size={18} color="black" />;
                    }}
                    dropdownIconPosition={'right'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.title;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.title;
                    }}
                  />
                  <View style={styles.paymentInfoContainer}>
                    <View style={styles.paymentInfoColumn}>
                      <Text style={styles.text}>Date</Text>
                      <TextInput
                        placeholderTextColor="#979797"
                        placeholder="10/20/21"
                        style={styles.input}
                        onChangeText={handleChange('date')}
                        onBlur={handleBlur('date')}
                        value={values.date}
                      />
                    </View>
                    <View style={styles.paymentInfoColumnCenter}>
                      <Text style={styles.text}>Moyen de paiement</Text>
                      <SelectDropdown
                        buttonStyle={styles.dropdownButtonSmall}
                        buttonTextStyle={styles.dropdownButtonText}
                        rowTextStyle={styles.dropdownRowText}
                        dropdownStyle={styles.dropdownBg}
                        rowStyle={styles.dropdownRow}
                        data={paiementMode}
                        defaultButtonText={'Mode de paiement'}
                        onSelect={(selectedItem, index) => {}}
                        renderDropdownIcon={() => {
                          return (
                            <AntDesign name="down" size={18} color="black" />
                          );
                        }}
                        dropdownIconPosition={'right'}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                          return item;
                        }}
                      />
                    </View>
                    <View style={styles.paymentInfoColumn}>
                      <Text style={styles.text}>Prix</Text>
                      <View style={styles.priceContainer}>
                        <TextInput
                          placeholderTextColor="#979797"
                          placeholder="120"
                          style={styles.input}
                          onChangeText={handleChange('price')}
                          onBlur={handleBlur('price')}
                          value={values.price}
                        />
                        <Text style={styles.euro}>€</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.addPaiementContainer}
                    onPress={() => {}}>
                    <FontAwesome name="plus-square" size={26} color="#2CDEE4" />
                    <Text style={styles.addPaiementText}>
                      Ajouter un paiement
                    </Text>
                  </TouchableOpacity>
                  <View style={{ marginTop: heightPercentageToDP(5) }}>
                    <Text style={styles.text}>Paiement(s) enregistré(s)</Text>
                    <FlatList
                      style={{ maxHeight: 75 }}
                      data={this.state.Paiement}
                      extraData={this.state}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        <View style={styles.paymentItem}>
                          <Text style={styles.paymentItemText}>
                            {moment(item.created_at).format('L')}
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
                      <Text style={styles.text}>Paiement(s) en attente</Text>
                      <FlatList
                        style={{ maxHeight: 75 }}
                        data={this.state.Paiement}
                        extraData={this.state}
                        // onRefresh={onRefresh}
                        // refreshing={this.state.refresh}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                          <View style={styles.paymentItem}>
                            <Text style={styles.paymentItemText}>
                              {moment(item.created_at).format('L')}
                            </Text>
                            <Text style={styles.paymentItemText}>
                              {item.title}
                            </Text>
                            <Text style={styles.paymentItemText}>
                              {item.mode} - {item.amount}
                            </Text>
                          </View>
                        )}
                      />
                    </View>
                  </View>
                  <View style={styles.buttonContainer}>
                    <Button
                      customTextStyle={styles.buttonText}
                      loading={false}
                      title="Enregistrer le paiement"
                      onPress={() => {
                        this.createOffer(values);
                      }}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </LinearGradient>
      );
    }
  }
}
