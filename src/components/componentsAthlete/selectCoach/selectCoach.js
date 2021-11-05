import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  Dimensions,
  Keyboard,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import * as Yup from 'yup';
import { LinearGradient } from 'expo-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { Formik, FieldArray, Field } from 'formik';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { CheckBox } from 'react-native-elements';

import RegisterStepImageView from '../../register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../components/Button';
import Header from '../../../components/Header';
import { get_coach } from '../../api/Coach';
import styles from './selectCoachStyle';

export default class selectCoach extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'initial',
      // passItem: this.props.navigation.state.params.item,
      Coach: [],
      isLoaded: false,
      checked: false,
    };
  }
  componentDidMount() {
    get_coach().then((res) => {
      this.setState({ Coach: res.data });
      this.setState({ isLoaded: true });
    });
  }

  onNavigate = (item) => {
    this.props.navigation.navigate('avatarAthlete', { item: item });
  };

  setDayChoice = (val) => {
    this.setState({
      SelectedDay: this.state.SelectedDay.map((item) =>
        item.day === val
          ? {
              ...item,
              selected: !item.selected,
            }
          : item,
      ),
    });
  };
  render() {
    if (!this.state.isLoaded) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    const passItem = this.props.navigation.state.params.item;

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
            <RegisterStepImageView step={7} />
            <View style={styles.content}>
              <Formik
                initialValues={{
                  coach_preference: '',
                }}
                onSubmit={(values) => {
                  const item = { ...passItem, ...values };
                  this.onNavigate(item);
                  console.log(item);
                }}
                validationSchema={Yup.object().shape({
                  coach_preference: Yup.object().required(
                    "Si vous n'avez pas de preférence selectionner peu importe",
                  ),
                })}>
                {({ handleSubmit, isValid, validate }) => (
                  <View style={{ paddingBottom: 15 }}>
                    <Field
                      name="coach_preference"
                      id="coach_preference"
                      validate={validate}>
                      {({ form: {} }) => {
                        return (
                          <View style={styles.content}>
                            <Text style={styles.title}>
                              À QUI VEUX-TU ADRESSER TA DEMANDE ?
                            </Text>
                            <Text style={styles.subTitle}>
                              Un coach en particulier ?
                            </Text>
                            <View style={styles.dropdownContainer}>
                              <FieldArray
                                name="coach_preference"
                                render={(arrayhelper) => (
                                  <View>
                                    <SelectDropdown
                                      buttonStyle={styles.dropdownButton}
                                      buttonTextStyle={
                                        styles.dropdownButtonText
                                      }
                                      rowTextStyle={styles.dropdownRowText}
                                      dropdownStyle={styles.dropdownBg}
                                      rowStyle={styles.dropdownRow}
                                      data={this.state.Coach}
                                      defaultButtonText={'Recherche ton coach'}
                                      onSelect={(selectedItem, index) => {
                                        arrayhelper.form.values.coach_preference =
                                          {
                                            type: 'specific_coach',
                                            coach_id: selectedItem.id,
                                          };
                                        this.setState({ checked: false });
                                      }}
                                      renderDropdownIcon={() => {
                                        return (
                                          <AntDesign
                                            name="down"
                                            size={24}
                                            color="black"
                                          />
                                        );
                                      }}
                                      dropdownIconPosition={'right'}
                                      buttonTextAfterSelection={(
                                        selectedItem,
                                      ) => {
                                        let show = '';
                                        this.state.checked
                                          ? null
                                          : (show = `${selectedItem.first_name}  ${selectedItem.last_name}`);
                                        return show;
                                      }}
                                      rowTextForSelection={(item, index) => {
                                        return item.first_name;
                                      }}
                                    />
                                    <View style={styles.noWayContainer}>
                                      <CheckBox
                                        size={25}
                                        containerStyle={{
                                          paddingLeft: 0,
                                          marginLeft: 0,
                                          borderWidth: 0,
                                        }}
                                        uncheckedColor="#2CDEE4"
                                        checked={this.state.checked}
                                        value={
                                          arrayhelper.form.values
                                            .coach_preference
                                        }
                                        onPress={() => {
                                          arrayhelper.form.values.coach_preference =
                                            {
                                              type: 'any_coach',
                                            };
                                          this.setState({
                                            checked: true,
                                          });
                                        }}
                                      />
                                      <Text style={styles.noWayText}>
                                        Peu importe
                                      </Text>
                                    </View>
                                    {errors.coach_preference &&
                                      touched.coach_preference && (
                                        <View
                                          style={{
                                            alignItems: 'flex-end',
                                          }}>
                                          <Text style={styles.errorText}>
                                            {errors.coach_preference}
                                          </Text>
                                        </View>
                                      )}
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
                      title="Suivant"
                      customTextStyle={styles.nextButtonText}
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
