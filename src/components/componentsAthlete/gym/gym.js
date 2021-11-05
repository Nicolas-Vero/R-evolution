import React from 'react';
import { Text, View, SafeAreaView, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { Formik, FieldArray, Field } from 'formik';

import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign } from '@expo/vector-icons';
import * as Yup from 'yup';

import RegisterStepImageView from '../../register/registerStepImage/RegisterStepImageView';
import { get_gym } from '../../../api/ReferenceData';
import { Button } from '../../../components/Button';
import Header from '../../../components/Header';
import styles from './gymStyle';

export default class gym extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'initial',
      // passItem: this.props.navigation.state.params.item,
      Gymdata: [],
      isLoaded: false,
      term: '',
    };
  }

  componentDidMount() {
    get_gym().then((res) => {
      this.setState({ Gymdata: res.data });
      this.setState({ isLoaded: true });
    });
  }

  onNavigate = (item) => {
    this.props.navigation.navigate('ElementSlider2', { item: item });
  };

  render() {
    const data = ['OUI', 'NON'];
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
            <RegisterStepImageView step={5} />
            <View style={styles.content}>
              <Formik
                initialValues={{
                  gym_id: '',
                }}
                onSubmit={(values) => {
                  const item = { ...passItem, ...values };
                  this.onNavigate(item);
                }}
                validationSchema={Yup.object().shape({
                  gym_id: Yup.string().required('Requis'),
                })}>
                {({ handleSubmit, isValid, validate }) => (
                  <View style={{ paddingBottom: 15 }}>
                    <Field
                      name="health_issues"
                      id="health_issues"
                      validate={validate}>
                      {() => {
                        return (
                          <View style={{ height: heightPercentageToDP(72) }}>
                            <Text style={styles.title}>
                              OÙ SOUHAITES-TU T'ENTRAÎNER ?
                            </Text>
                            <Text style={styles.subTitle}>
                              Dans quelle salle pratiques-tu?
                            </Text>
                            <View style={styles.selectContainer}>
                              <FieldArray
                                name="gym_id"
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
                                      //   if (arrayhelper.form.values.gym_id.length!='') {
                                      //     console.log(arrayhelper.form.values.gym_id.length);
                                      //      arrayhelper.pop()
                                      //   }
                                      //   arrayhelper.push(selectedItem.id)
                                      // }
                                      arrayhelper.form.values.gym_id =
                                        selectedItem.id;
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
                                      // text represented after item is selected
                                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                                      return selectedItem.name;
                                    }}
                                    rowTextForSelection={(item, index) => {
                                      // text represented for each item in dropdown
                                      // if data array is an array of objects then return item.property to represent item in dropdown
                                      return item.name;
                                    }}
                                  />
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
