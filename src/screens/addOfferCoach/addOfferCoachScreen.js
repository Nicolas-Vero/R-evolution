import React from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  Keyboard,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
//import { auth } from '../../api/Register';
import { Formik } from 'formik';
import { CheckBox, Text } from 'react-native-elements';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
import { AddOffer } from '../../api/Offers';
//import { Slider } from 'react-native-elements';
import styles from './addOfferCoachStyle';
export default class addOfferCoachScreen extends React.Component {
  state = {
    type: 'Coaching',
  };

  async onLoginPress(values) {
    console.log(values);
  }

  createOffer(values) {
    try {
      values.price = parseFloat(values.price) * 100;
      AddOffer(values).then(
        this.props.navigation.navigate('offersCoachScreen'),
      );
    } catch (error) {
      this.setState({ loading: false });
      //alert('Please try again. ');
      console.warn(error);
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
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea} />
        <Header title="CRÉER UNE OFFRE" />
        <View style={styles.content}>
          <Formik
            initialValues={{
              type: 'Coaching',
              title: '',
              content: '',
              nb_credits: '',
              price: '',
            }}
            onSubmit={(values, { onLoginPress }) => onLoginPress(values)}>
            {({ handleChange, handleBlur, setFieldValue, values }) => (
              <View>
                <View style={styles.inputContainer}>
                  <CheckBox
                    containerStyle={styles.checkbox}
                    title="Coaching"
                    textStyle={styles.checkBoxText}
                    checkedColor="#2CDEE4"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={values.type.toString() === 'Coaching'}
                    value={values.type}
                    onPress={() => {
                      setFieldValue('type', 'Coaching'),
                        this.setState({ type: 'Coaching' });
                    }}
                  />
                  <CheckBox
                    containerStyle={styles.checkbox}
                    title="Autre prestation"
                    textStyle={styles.checkBoxText}
                    checkedColor="#2CDEE4"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={values.type === 'Autre'}
                    value={values.type}
                    onPress={() => {
                      setFieldValue('type', 'Autre'),
                        this.setState({ type: 'Autre' });
                    }}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Titre"
                    placeholderTextColor="#979797"
                    style={styles.input}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values.title}
                    blurOnSubmit={false}
                    onSubmitEditing={() =>
                      this.descriptionInput && this.descriptionInput.focus()
                    }
                    returnKeyType="next"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    multiline
                    ref={(ref) => (this.descriptionInput = ref)}
                    blurOnSubmit={false}
                    onSubmitEditing={() =>
                      this.nbSeanceInput && this.nbSeanceInput.focus()
                    }
                    returnKeyType="next"
                    placeholder="Description"
                    placeholderTextColor="#979797"
                    style={styles.textArea}
                    onChangeText={handleChange('content')}
                    onBlur={handleBlur('content')}
                    value={values.content}
                  />
                </View>
                <View style={styles.bottomInputContainer}>
                  {this.state.type == 'Coaching' ? (
                    <View style={styles.seanceContainer}>
                      <Text style={styles.text}>Nombre de séances</Text>
                      <TextInput
                        ref={(ref) => (this.nbSeanceInput = ref)}
                        blurOnSubmit={false}
                        onSubmitEditing={() =>
                          this.nbSeanceInput && this.nbSeanceInput.focus()
                        }
                        returnKeyType="next"
                        keyboardType="numeric"
                        placeholder="120"
                        style={styles.bottomInput}
                        onChangeText={handleChange('nb_credits')}
                        onBlur={handleBlur('nb_credits')}
                        value={values.nb_credits}
                      />
                    </View>
                  ) : null}
                  <View>
                    <Text style={styles.text}>Prix</Text>
                    <View style={styles.priceContainer}>
                      <TextInput
                        ref={(ref) => (this.price = ref)}
                        blurOnSubmit={false}
                        onSubmitEditing={() => Keyboard.dismiss()}
                        keyboardType="number-pad"
                        returnKeyType="done"
                        placeholder="120"
                        style={styles.bottomInput}
                        onChangeText={handleChange('price')}
                        onBlur={handleBlur('price')}
                        value={values.price}
                      />
                      <Text style={styles.euro}>€</Text>
                    </View>
                  </View>
                </View>
                <Button
                  customTextStyle={styles.buttonTextStyle}
                  style={styles.button}
                  loading={false}
                  title="Valider"
                  onPress={() => {
                    this.createOffer(values);
                  }}
                />
              </View>
            )}
          </Formik>
        </View>
      </View>
    );
  }
}
