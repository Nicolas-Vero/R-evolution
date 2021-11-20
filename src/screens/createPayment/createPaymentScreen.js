import React from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  LogBox,
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
import { get_paiement_for_coach } from '../../api/Paiement';
import { loadFonts } from '../../configs/design/font';
import styles from './createPayementStyle';
import { add_manual_payment } from '../../api/Coach';
import { ScrollView } from 'react-native-gesture-handler';
import KeyboardSpacer from 'react-native-keyboard-spacer';
export default class createPaymentScreen extends React.Component {
  state = {
    Offer: [],
    Paiement: [],
    loaded: false,
    offer_id:'',
    payment_id:'12355',
    
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
    try {
      values.Paiement.forEach(async(element) => {
        element.athlete_id = this.props.navigation.state.params.athlete
        element.offer_id = this.state.offer_id
        element.payment_id = this.state.payment_id
        await add_manual_payment(element,) 
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
          <Header title="PAIEMENT" />
          <View style={styles.content}>
            <Formik
              initialValues={{
                Paiement: [{
                  amount: 0,
                  installments:1,
                  mode: "",
                }],
                offer_id:''
              }}
              onSubmit={(values) => {
                 this.addPaiement(values);
                console.log('ttt',values);
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
                               <Text style={styles.text}>
                                            Nom de l'offre
                                          </Text>        
                           <SelectDropdown
                                            buttonStyle={styles.dropdownButton}
                                            buttonTextStyle={
                                              styles.dropdownButtonText
                                            }
                                            rowTextStyle={
                                              styles.dropdownRowText
                                            }
                                            dropdownStyle={styles.dropdownBg}
                                            rowStyle={styles.dropdownRow}
                                            data={this.state.Offer}
                                            defaultButtonText={
                                              'Recherche ton offre'
                                            }
                                            onSelect={(selectedItem, index) => {

                                              this.setState({offer_id:selectedItem.id})
                                              values.offer_id = selectedItem.id
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
                                            buttonTextAfterSelection={(
                                              selectedItem,
                                              index,
                                            ) => {
                                              return selectedItem.title;
                                            }}
                                            rowTextForSelection={(
                                              item,
                                              index,
                                            ) => {
                                              return item.title;
                                            }}
                                          />
                          <FieldArray
                            name="Paiement"
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
                                    {field.value.map((fields, index) => (
                                      <View
                                        key={index}
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
                                                onChangeText={(text) =>
                                                  (field.value[index].date = text)
                                                }
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
                                                dropdownStyle={
                                                  styles.dropdownBg
                                                }
                                                rowStyle={styles.dropdownRow}
                                                data={paiementMode}
                                                defaultButtonText={
                                                  'Mode de paiement'
                                                }
                                                onSelect={(
                                                  selectedItem,
                                                  
                                                  
                                                ) => {      
                                                 (field.value[index].mode = selectedItem) 
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
                                              <View
                                                style={styles.priceContainer}>
                                                <TextInput
                                                  placeholderTextColor="#979797"
                                                  placeholder="120"
                                                  style={styles.input}
                                                  onChangeText={(text) =>
                                                    (field.value[index].amount = text)
                                                  }
                                                  onBlur={handleBlur('price')}
                                                  value={values.price}
                                                />
                                                <Text style={styles.euro}>
                                                  €
                                                </Text>
                                              </View>
                                            </View>
                                          </View>
                                          
                                          <View style={styles.buttonContainer}>

                                          </View>
                                        </View>
                                        {
                                          <View
                                            style={
                                              styles.PaiementDeleteContainer
                                            }>
                                            <TouchableOpacity
                                              onPress={() =>
                                                arrayhelper.remove(index)
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
                                    ))}
                                  </View>
                                  <KeyboardSpacer />
                                </ScrollView>
                                <TouchableOpacity
                                    onPress={() =>{ 
                                      console.log(field.value.length + 1);
                                      arrayhelper.push({
                                      amount: 0,
                                      installments:field.value.length + 1,
                                      mode: "",
                                    })}}>
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
                                              marginTop:
                                                heightPercentageToDP(5),
                                            }}>
                                            <Text style={styles.text}>
                                              Paiement(s) enregistré(s)
                                            </Text>
                                            <FlatList
                                              style={{ maxHeight: 75 }}
                                              data={this.state.Paiement}
                                              extraData={this.state}
                                              keyExtractor={(item) =>
                                                item.id.toString()
                                              }
                                              renderItem={({ item }) => (
                                                <View
                                                  style={styles.paymentItem}>
                                                  <Text
                                                    style={
                                                      styles.paymentItemText
                                                    }>
                                                    {moment(
                                                      item.created_at,
                                                    ).format('L')}
                                                  </Text>
                                                  <Text
                                                    style={
                                                      styles.paymentItemText
                                                    }>
                                                    {item.offer?.title}
                                                  </Text>
                                                  <Text
                                                    style={
                                                      styles.paymentItemText
                                                    }>
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
                                                data={this.state.Paiement}
                                                extraData={this.state}
                                                keyExtractor={(item) =>
                                                  item.id.toString()
                                                }
                                                renderItem={({ item }) => (
                                                  <View
                                                    style={styles.paymentItem}>
                                                    <Text
                                                      style={
                                                        styles.paymentItemText
                                                      }>
                                                      {moment(
                                                        item.created_at,
                                                      ).format('L')}
                                                    </Text>
                                                    <Text
                                                      style={
                                                        styles.paymentItemText
                                                      }>
                                                      {item.title}
                                                    </Text>
                                                    <Text
                                                      style={
                                                        styles.paymentItemText
                                                      }>
                                                      {item.mode} -
                                                      {item.amount}
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
