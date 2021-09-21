import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Formik } from 'formik';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
import { ElementSlider } from '../../components/componentsAthlete/ElementSlider';
const { width } = Dimensions.get('window');
import { destinataire } from '../../components/componentsAthlete/destinataire';
import { dynamicListAthlete } from '../../components/componentsAthlete/dynamicListAthlete';
import { selectList } from '../../components/componentsAthlete/selectList';
import { avatar } from '../../components/componentsAthlete/avatar';
import { LinearGradient } from 'expo-linear-gradient';
import { mensuration } from '../../components/componentsAthlete/mensuration';
import { health } from '../../components/componentsAthlete/health';
import { ElementSlider2 } from '../../components/componentsAthlete/ElementSlider2';
import { loadFonts } from '../../configs/design/font';
import { sign_up } from '../../api/Athlete';
const inputs = [
  { name: 'mensuration', type: 'default', component: mensuration },
  { name: 'xP', type: 'default', component: ElementSlider },
  { name: 'objectifs', type: 'default', component: dynamicListAthlete },
  { name: 'healthIssues', type: 'default', component: health },
  { name: 'gymPlace', type: 'default', component: selectList },
  { name: 'days_preference', type: 'default', component: ElementSlider2 },
  { name: 'destinataire', type: 'default', component: destinataire },
  { name: 'avatar', type: 'default', component: avatar },
];
export default class MoreInfoAthlete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 'initial',
      stepperStep: 0,
      progress: 0,
      values: {},
    };
  }
  componentDidMount() {
    loadFonts();
  }
  changeStep = (newStep) => {
    const inputLenght = inputs.length;
    const percent = ((newStep + 1) / inputLenght) * 1.0;
    this.setState({
      stepperStep: newStep,
      progress: percent,
      step: 'complementary',
    });
  };

  render() {
    const { navigation } = this.props;
    const { stepperStep, step } = this.state;
    const Layout = inputs[stepperStep].component;
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
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
          style={styles.background}
        />
        <SafeAreaView style={styles.safeArea} />
        {stepperStep < 1 ? (
          <Header title="LET'S GO" />
        ) : (
          <View style={styles.container}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{ paddingLeft: 7 }}
                onPress={() => this.changeStep(stepperStep - 1)}>
                <Image
                  source={require('../../../assets/icons/header-back.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>LET'S GO</Text>
            </View>
            <View style={{ flex: 1 }} />
          </View>
        )}
        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
          <Formik
            innerRef={this.formikRef}
            initialValues={{
              age: '',
              weight: '',
              size: '',
              experience_years: '',
              objectifs: [],
              health_issues: '',
              health_problem_description: '',
              coach_preference: {},
              gymPlace: '',
              days_preference: { 
                is_monday_preferred: false,
                is_tuesday_preferred: false,
                is_wednesday_preferred: false,
                is_thursday_preferred: false,
                is_friday_preferred: false,
                is_saturday_preferred: false,
                is_sunday_preferred: false,
              },
              time_preference: {
                start_time: 6,
                end_time: 17,
              },
              profile_picture_url: '',
            }}
            onSubmit={(values, actions) => {
              const data = {
                ...values,
                ...this.props.navigation.state.params.item,

              };
              console.log('dataaaa',data);
              try {
                sign_up(data).then(() => {
                  navigate('LoginAthlete');
                });
              } catch (error) {
                console.log('error:', error, ' ', 'data:', data);
              }
            }}>
            {({
              values,
              errors,
              isSubmitting,
              handleSubmit,
              setValues,
              setFieldTouched,
              setFieldValue,
            }) => (
              // <ScrollView>
              <View
                style={{
                  height: hp('80%'),
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    alignContent: 'center',
                    height: hp(70),
                    justifyContent: 'space-between',
                    maxHeight: hp('70'),
                  }}>
                  <Layout
                    component={inputs[stepperStep].component}
                    placeholder={inputs[stepperStep].name}
                    name={inputs[stepperStep].name}
                    onChangeText={this.onChangeText}
                    keyboardType={inputs[stepperStep].type}
                    secureTextEntry={
                      inputs[stepperStep] && inputs[stepperStep].secureEntry
                    }
                    errorContainer={{
                      alignItems: 'center',
                      paddingLeft: 50,
                    }}
                    values={values}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    setValues={setValues}
                    errors={errors}
                  />
                </View>
                <View>
                  {isSubmitting ? (
                    <ActivityIndicator />
                  ) : (
                    <View>
                      <Button
                        customTextStyle={{
                          fontFamily: 'RobotoBold',
                          fontSize: 17,
                        }}
                        title="Suivant"
                        onPress={ console.log('valuesssxsssss',values),
                          inputs[inputs.length - 1] &&
                          stepperStep === inputs.length - 1
                            ? handleSubmit
                            : () => {
                                this.changeStep(stepperStep + 1)
                        
                              }
                        }
                        disabled={Object.keys(errors).some((v) =>
                          inputs[stepperStep].name.includes(v),
                        )}></Button>
                    </View>
                  )}
                </View>
              </View>
              //   </ScrollView>
            )}
          </Formik>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
    height: 49,
    marginTop: 29,
    marginBottom: 49,
    paddingLeft: 16,
    paddingRight: 16,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
    height: 49,
    marginBottom: 29,
  },
  image: { marginLeft: 10, height: 20.54, width: 12.33, resizeMode: 'contain' },
  textContainer: { alignItems: 'center', flex: 6 },
  text: {
    fontStyle: 'italic',
    fontWeight: '800',
    fontSize: 22,
    color: '#FFFFFF',
    lineHeight: 24,
  },
});
