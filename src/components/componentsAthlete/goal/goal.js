import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Keyboard,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import * as Yup from 'yup';
import { Formik, FieldArray, Field } from 'formik';
import { FontAwesome } from '@expo/vector-icons';

import RegisterStepImageView from '../../register/registerStepImage/RegisterStepImageView';
import { get_specialities } from '../../../api/ReferenceData';
import { Button } from '../../../components/Button';
import Header from '../../../components/Header';
import styles from './goalStyle';
import { ScrollView } from 'react-native-gesture-handler';

export default class goal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'initial',
      // passItem: this.props.navigation.state.params.item,
      specData: [],
      isLoaded: false,
      term: '',
    };
  }

  componentDidMount() {
    get_specialities().then((res) => {
      this.setState({ specData: res.data });
      this.setState({ isLoaded: true });
    });
  }

  onNavigate = (item) => {
    this.props.navigation.navigate('health', { item: item });
  };

  renderGoalList(errors, arrayhelper) {
    return (
      <View>
        <ScrollView style={{ maxHeight: 100, marginHorizontal: 15 }}>
          <FlatList
            data={this.state.specData}
            extraData={this.state}
            renderItem={({ item }) => {
              const backgroundColor =
                item.selected == 1 ? '#2CDEE4' : 'transparent';
              const borderColor = item.selected == 1 ? 'transparent' : 'white';
              const color = item.selected == 1 ? 'black' : 'white';

              return (
                <TouchableOpacity
                  onPress={() => {
                    item.selected != 1
                      ? (item.selected = 1)
                      : (item.selected = 0);
                    arrayhelper.form.values.goals.includes(item.value)
                      ? arrayhelper.remove(item.value)
                      : arrayhelper.push(item.value);
                  }}>
                  <View
                    style={{
                      ...styles.goalItem,
                      backgroundColor: backgroundColor,
                      borderColor: borderColor,
                    }}>
                    <Text
                      style={{
                        ...styles.goalIemText,
                        color: color,
                      }}>
                      {item.value}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item}
            // extraData={selectedId}
            numColumns={3}
          />
        </ScrollView>
        {errors.goals ? (
          <Text style={styles.errorText}>
            Selectionne ou ajoute un objectif
          </Text>
        ) : null}
      </View>
    );
  }

  render() {
    const passItem = this.props.navigation.state.params.item;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#060606', '#2D333C']}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 1,
            y: 1,
          }}
          style={styles.background}>
          <Header title="LET'S GO" />
          <SafeAreaView onPress={Keyboard.dismiss} style={styles.safeArea}>
            <RegisterStepImageView step={3} />
            <View style={styles.content}>
              <Formik
                initialValues={{
                  goals: [],
                }}
                onSubmit={(values) => {
                  const item = { ...passItem, ...values };
                  this.onNavigate(item);
                }}
                validationSchema={Yup.object().shape({
                  goals: Yup.array().min(1).required('Requis'),
                })}>
                {({ handleSubmit, isValid, validate }) => (
                  <View style={styles.content}>
                    <Field name="goals" id="goals" validate={validate}>
                      {({ form: { errors } }) => {
                        return (
                          <View
                            style={{
                              height: heightPercentageToDP(72),
                            }}>
                            <Text style={styles.title}>
                              QUEL EST TON OBJECTIF ?
                            </Text>
                            <Text style={styles.subTitle}>
                              Sélectionne ton ou tes objectifs(s)
                            </Text>

                            <View style={{ marginTop: 26, marginBottom: 26 }}>
                              <FieldArray
                                name="goals"
                                render={(arrayhelper) => (
                                  <View>
                                    <View
                                      style={{
                                        marginBottom: 24,
                                      }}>
                                      {this.renderGoalList(errors, arrayhelper)}
                                    </View>
                                    <TextInput
                                      name="goals"
                                      onChangeText={(text) => {
                                        this.setState({ term: text });
                                      }}
                                      style={styles.input}
                                    />
                                    <View style={styles.deleteGoalContainer}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          this.state.specData.pop();
                                          this.setState({ term: '' });
                                        }}>
                                        <Text style={styles.deleteGoalText}>
                                          Supprimer
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity
                                      onPress={() => {
                                        this.state.specData.push({
                                          value: this.state.term,
                                        }),
                                          this.setState({ term: '' });
                                      }}>
                                      <View
                                        style={styles.addGoalButtonContainer}>
                                        <FontAwesome
                                          name="plus-square"
                                          size={24}
                                          color="#2CDEE4"
                                        />
                                        <Text style={styles.addGoalButtonText}>
                                          Ajouter une specialité
                                        </Text>
                                      </View>
                                    </TouchableOpacity>
                                  </View>
                                )}
                              />
                            </View>
                          </View>
                        );
                      }}
                    </Field>
                    <Button
                      loading={false}
                      disabled={!isValid}
                      title="suivant"
                      customTextStyle={{
                        fontFamily: 'RobotoBold',
                        fontSize: 17,
                      }}
                      onPress={handleSubmit}
                    />
                  </View>
                )}
              </Formik>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
    );
  }
}
