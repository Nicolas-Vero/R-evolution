import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Keyboard,
  TextInput,
} from 'react-native';
import { Formik } from 'formik';
import { CheckBox, Text } from 'react-native-elements';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
import styles from './CreateOfferCoachScreenStyle';

const CreateOfferCoachScreenView = ({ controller }) => {
  const [offerType, setOfferType] = useState('Coaching');

  // Refs pour naviguer entre les champs
  const descriptionInputRef = useRef(null);
  const nbSeanceInputRef = useRef(null);
  const priceInputRef = useRef(null);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} />
      <Header title="CRÉER UNE OFFRE" />
      <ScrollView
        style={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Formik
          initialValues={{
            type: 'Coaching',
            title: '',
            content: '',
            nb_credits: '',
            price: '',
          }}
          onSubmit={(values) => {
            if (values.type === 'Autre') {
              values.nb_credits = 1;
            }
            controller.createOffer(values);
          }}
        >
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
                  checked={offerType === 'Coaching'}
                  onPress={() => {
                    setFieldValue('type', 'Coaching');
                    setOfferType('Coaching');
                  }}
                />
                <CheckBox
                  containerStyle={styles.checkbox}
                  title="Autre prestation"
                  textStyle={styles.checkBoxText}
                  checkedColor="#2CDEE4"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={offerType === 'Autre'}
                  onPress={() => {
                    setFieldValue('type', 'Autre');
                    setOfferType('Autre');
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
                  returnKeyType="next"
                  onSubmitEditing={() => descriptionInputRef.current?.focus()}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  multiline
                  ref={descriptionInputRef}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  placeholder="Description"
                  placeholderTextColor="#979797"
                  style={styles.textArea}
                  onChangeText={handleChange('content')}
                  onBlur={handleBlur('content')}
                  value={values.content}
                  onSubmitEditing={() => nbSeanceInputRef.current?.focus()}
                />
              </View>

              {offerType === 'Coaching' && (
                <View style={styles.bottomInputContainer}>
                  <View style={styles.seanceContainer}>
                    <Text style={styles.text}>Nombre de séances</Text>
                    <TextInput
                      ref={nbSeanceInputRef}
                      blurOnSubmit={false}
                      returnKeyType="next"
                      keyboardType="numeric"
                      placeholder="120"
                      style={styles.bottomInput}
                      onChangeText={handleChange('nb_credits')}
                      onBlur={handleBlur('nb_credits')}
                      value={values.nb_credits}
                      onSubmitEditing={() => priceInputRef.current?.focus()}
                    />
                  </View>
                </View>
              )}

              <View style={styles.priceContainer}>
                <Text style={styles.text}>Prix</Text>
                <View style={styles.priceContainer}>
                  <TextInput
                    ref={priceInputRef}
                    blurOnSubmit={false}
                    returnKeyType="done"
                    keyboardType="number-pad"
                    placeholder="120"
                    style={styles.bottomInput}
                    onChangeText={handleChange('price')}
                    onBlur={handleBlur('price')}
                    value={values.price}
                    onSubmitEditing={Keyboard.dismiss}
                  />
                  <Text style={styles.euro}>€</Text>
                </View>
              </View>

              <Button
                customTextStyle={styles.buttonTextStyle}
                style={styles.button}
                loading={false}
                title="Valider"
                onPress={() => controller.createOffer(values)}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default CreateOfferCoachScreenView;
