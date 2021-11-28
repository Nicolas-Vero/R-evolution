import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import * as Yup from 'yup';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik, FieldArray, Field } from 'formik';
import { CheckBox } from 'react-native-elements';

import Header from '../../../../components/Header';
import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../../components/Button';
import { get_coach } from '../../../../api/Coach';
import styles from './selectCoachStyle';
import { get_commercial_by_place } from '../../../../api/Commercial';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default class selectCoachScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'initial',
      Coach: [],
      isLoaded: false,
      checkedCommercial: false,
      checkedCoach: false,
      Commercial:[]
    };
  }
  componentDidMount() {
    get_commercial_by_place(this.props.navigation.state.params.item.preferred_gym_id).then((res)=>{
      this.setState({Commercial:res.data})
      console.log(res.data);
      this.setState({ isLoaded: true });
    });
    get_coach().then((res) => {
      this.setState({ Coach: res.data });
      this.setState({ isLoaded: true });
    });
  }

  onNavigate = (item) => {
    this.props.navigation.navigate('avatarScreen', { item: item });
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
                  commercial_id: 0,
                }}
                onSubmit={(values) => {
                  const item = { ...passItem, ...values };
                  this.onNavigate(item);
                }}
                validationSchema={Yup.object().shape({
                  coach_preference: Yup.object().required(
                    "Si vous n'avez pas de preférence selectionner peu importe",
                  ),
                })}>
                {({ handleSubmit, isValid, validate }) => (
                  <View>
                    <Field
                      name="coach_preference"
                      id="coach_preference"
                      validate={validate}>
                      {({ form: { errors } }) => {
                        return (
                          <View style={styles.content}>
                            <Text style={styles.title}>
                              À QUEL COACH VEUX-TU ADRESSER TA DEMANDE ?
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
                                      defaultButtonText={
                                        'Recherche le nom de ton coach'
                                      }
                                      onSelect={(selectedItem, index) => {
                                        arrayhelper.form.values.coach_preference =
                                          {
                                            type: 'specific_coach',
                                            coach_id: selectedItem.id,
                                          };
                                        this.setState({ checkedCoach: false });
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
                                      ) => {
                                        let show = '';
                                        this.state.checkedCoach
                                          ? null
                                          : (show = `${selectedItem.first_name}  ${selectedItem.last_name}`);
                                        return show;
                                      }}
                                      rowTextForSelection={(item, index) => {
                                        return `${item.first_name} ${item.last_name}`;
                                      }}
                                    />
                                    <View style={styles.noWayContainer}>
                                      <CheckBox
                                        size={25}
                                        containerStyle={styles.noWayCheckBox}
                                        uncheckedColor="#2CDEE4"
                                        checked={this.state.checkedCoach}
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
                                            checkedCoach:
                                              !this.state.checkedCoach,
                                          });
                                        }}
                                      />
                                      <Text style={styles.noWayText}>
                                        Peu importe
                                      </Text>
                                    </View>
                                    {errors.coach_preference && (
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
                            {this.renderCommercialView()}
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

  renderCommercialView = () => {
    return (
      <View style={styles.dropdownContainer}>
        <Text style={styles.title}>
          Par quel commercial as-tu été recommandé ?
        </Text>
        <FieldArray
          name="commercial_id"
          render={(arrayhelper) => (
            <View style={styles.dropdownContainer}>
              <View>
                <SelectDropdown
                  buttonStyle={styles.dropdownButton}
                  buttonTextStyle={styles.dropdownButtonText}
                  rowTextStyle={styles.dropdownRowText}
                  dropdownStyle={styles.dropdownBg}
                  rowStyle={styles.dropdownRow}
                  data={this.state.Commercial}
                  defaultButtonText={'Recherche ton commercial'}
                  onSelect={(selectedItem, index) => {
                    (arrayhelper.form.values.commercial_id = selectedItem.id),
                      this.setState({ checkedCommercial: false });
                  }}
                  renderDropdownIcon={() => {
                    return <AntDesign name="down" size={18} color="black" />;
                  }}
                  dropdownIconPosition={'right'}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    let show = '';
                    this.state.checkedCommercial
                      ? null
                      : (show = `${selectedItem.first_name}  ${selectedItem.last_name}`);
                    return show;
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item.first_name;
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 24,
                  }}>
                  <CheckBox
                    size={25}
                    containerStyle={styles.noWayCheckBox}
                    uncheckedColor="#2CDEE4"
                    checked={this.state.checkedCommercial}
                    value={arrayhelper.form.values.coach_preference}
                    onPress={() => {
                      arrayhelper.form.values.commercial_id = 0;
                      this.setState({
                        checkedCommercial: !this.state.checkedCommercial,
                      });
                    }}
                  />
                  <Text style={styles.noWayText}>Je n'ai pas été contacté</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    );
  };
}
