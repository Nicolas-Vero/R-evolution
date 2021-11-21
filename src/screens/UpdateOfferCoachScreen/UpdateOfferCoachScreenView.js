import React from 'react';
import { View, TextInput, SafeAreaView, Keyboard } from 'react-native';
import { Formik } from 'formik';
import { CheckBox, Text } from 'react-native-elements';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
import styles from './UpdateOfferCoachScreenStyle';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
export default class UpdateOfferCoachScreenView extends AbstractScreenView {
  getErrorMessage() {
    if (this.component.state.errorMessage !== '')
      return (
        <ResponsiveText style={{ alignSelf: 'center', fontSize: '3.5%' }}>
          {this.component.state.errorMessage}
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
    const initialValues = this.component.props.navigation.state.params.item;
    console.log(initialValues.price / 100);
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea} />
        <Header title="MODIFIER L'OFFRE" />
        <View style={styles.content}>
          <Formik
            initialValues={{
              offer_id: initialValues.id,
              type: initialValues.type,
              title: initialValues.title,
              content: initialValues.content,
              nb_credits: initialValues.nb_credits.toString(),
              price: (initialValues.price / 100).toString(),
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
                        this.component.setState({ type: 'Coaching' });
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
                        this.component.setState({ type: 'Autre' });
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
                    placeholder="Description"
                    placeholderTextColor="#979797"
                    style={styles.textArea}
                    onChangeText={handleChange('content')}
                    onBlur={handleBlur('content')}
                    value={values.content}
                    blurOnSubmit={false}
                    onSubmitEditing={() =>
                      this.nbSeanceInput && this.nbSeanceInput.focus()
                    }
                  />
                </View>
                <View style={styles.bottomInputContainer}>
                  {this.component.state.type == 'Coaching' ? (
                    <View style={styles.seanceContainer}>
                      <Text style={styles.text}>Nombre de séances</Text>
                      <TextInput
                        ref={(ref) => (this.nbSeanceInput = ref)}
                        blurOnSubmit={false}
                        onSubmitEditing={() =>
                          this.nbSeanceInput && this.nbSeanceInput.focus()
                        }
                        keyboardType="numeric"
                        placeholderTextColor="#979797"
                        returnKeyType="next"
                        placeholder="Nombre de séances"
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
                        placeholderTextColor="#979797"
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
                    this.controller.onUpdatePress(values);
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
