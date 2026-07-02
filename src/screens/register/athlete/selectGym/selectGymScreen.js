import React from 'react';
import { Text, View, SafeAreaView, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Formik, FieldArray, Field } from 'formik';

import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign } from '@expo/vector-icons';
import * as Yup from 'yup';

import { get_gym } from '../../../../api/ReferenceData';
import Header from '../../../../components/Header';
import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../../components/Button';
import styles from './selectGymStyle';

export default class selectGymScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'initial',
      Gymdata: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    get_gym().then((res) => {
      this.setState({ Gymdata: res.data });
      this.setState({ isLoaded: true });
    });
  }

  onNavigate = (item) => {
    this.props.navigation.navigate('trainingDayScreen', { item: item });
  };

  render() {
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
          <RegisterStepImageView step={5} />
          <Text style={styles.title}>DANS QUELLE SALLE PRATIQUES-TU ?</Text>
          <Formik
            initialValues={{
              preferred_gym_id: '',
            }}
            onSubmit={(values) => {
              const item = { ...passItem, ...values };
              this.onNavigate(item);
            }}
            validationSchema={Yup.object().shape({
              preferred_gym_id: Yup.string().required('Requis'),
            })}>
            {({ handleSubmit, isValid, validate }) => (
              <View style={styles.content}>
                <View style={styles.top}>
                  <Field
                    name="health_issues"
                    id="health_issues"
                    validate={validate}>
                    {() => {
                      return (
                        <View style={styles.selectContainer}>
                          <FieldArray
                            name="preferred_gym_id"
                            render={(arrayhelper) => (
                              <SelectDropdown
                                buttonStyle={styles.dropdownButton}
                                buttonTextStyle={styles.dropdownButtonText}
                                rowTextStyle={styles.dropdownRowText}
                                dropdownStyle={styles.dropdownBg}
                                rowStyle={styles.dropdownRow}
                                data={this.state.Gymdata}
                                defaultButtonText={
                                  'Recherche le nom de ta salle'
                                }
                                onSelect={(selectedItem, index) => {
                                  arrayhelper.form.values.preferred_gym_id =
                                    selectedItem.id;
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
                                buttonTextAfterSelection={(selectedItem) => {
                                  return selectedItem.name;
                                }}
                                rowTextForSelection={(item, index) => {
                                  return item.name;
                                }}
                              />
                            )}
                          />
                        </View>
                      );
                    }}
                  </Field>
                </View>
                <View style={styles.bottom}>
                  <Button
                    loading={false}
                    disabled={!isValid}
                    title="Suivant"
                    customTextStyle={styles.nextButtonText}
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            )}
          </Formik>
        </LinearGradient>
      </View>
    );
  }
}
