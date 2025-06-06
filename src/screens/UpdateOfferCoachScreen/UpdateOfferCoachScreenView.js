import React, { useRef } from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  Keyboard,
} from 'react-native';
import { Formik } from 'formik';
import { Text } from 'react-native-elements';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
import styles from './UpdateOfferCoachScreenStyle';

const UpdateOfferCoachScreenView = ({ route, controller, state }) => {
  const { item } = route.params;
  const descriptionInput = useRef(null);
  const nbSeanceInput = useRef(null);
  const priceInput = useRef(null);

  const initialValues = {
    offer_id: item.id,
    type: item.type,
    title: item.title,
    content: item.content,
    nb_credits: item.nb_credits.toString(),
    price: item.price.toString(),
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} />
      <Header title="MODIFIER L'OFFRE" />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => controller.onUpdatePress(values)}
          >
            {({ handleChange, handleBlur, setFieldValue, values, handleSubmit }) => (
              <View>
                {/* Type selection (commented out in original) */}

                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Titre"
                    placeholderTextColor="#979797"
                    style={styles.input}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values.title}
                    blurOnSubmit={false}
                    onSubmitEditing={() => descriptionInput.current?.focus()}
                    returnKeyType="next"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    multiline
                    ref={descriptionInput}
                    placeholder="Description"
                    placeholderTextColor="#979797"
                    style={styles.textArea}
                    onChangeText={handleChange('content')}
                    onBlur={handleBlur('content')}
                    value={values.content}
                    blurOnSubmit={false}
                    onSubmitEditing={() => nbSeanceInput.current?.focus()}
                  />
                </View>
                <View style={styles.bottomInputContainer}>
                  {values.type === 'Coaching' && (
                    <View style={styles.seanceContainer}>
                      <Text style={styles.text}>Nombre de séances</Text>
                      <TextInput
                        ref={nbSeanceInput}
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
                  )}
                  <View>
                    <Text style={styles.text}>Prix</Text>
                    <View style={styles.priceContainer}>
                      <TextInput
                        ref={priceInput}
                        keyboardType="number-pad"
                        returnKeyType="done"
                        placeholderTextColor="#979797"
                        placeholder="120"
                        style={styles.bottomInput}
                        onChangeText={handleChange('price')}
                        onBlur={handleBlur('price')}
                        value={values.price}
                        onSubmitEditing={() => Keyboard.dismiss()}
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
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateOfferCoachScreenView;