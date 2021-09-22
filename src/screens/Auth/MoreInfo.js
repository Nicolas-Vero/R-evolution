import React from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE } from '../../configs/Constants';
import { Formik } from 'formik';
import { CheckBox } from 'react-native-elements';
import Loader from 'react-loader-spinner';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
import { auth } from '../../api/Coach';
//import { Slider } from 'react-native-elements';
import { ElementSlider } from '../../components/ElementSlider';
const { width } = Dimensions.get('window');
import { dynamicInput } from '../../components/dynamicInput';
import { dynamicList } from '../../components/dynamicList';
import { selectList } from '../../components/selectList';
import { LinearGradient } from 'expo-linear-gradient';
import { avatar } from '../../components/avatar';
import { values } from 'lodash';
import { loadFonts } from '../../configs/design/font';
const inputs = [
  { name: 'degrees', type: 'default', component: dynamicInput },
  { name: 'xP', type: 'default', component: ElementSlider },
  { name: 'spécialities', type: 'default', component: dynamicList },
  { name: 'gymPlace', type: 'default', component: selectList },
  { name: 'avatar', type: 'default', component: avatar },
];
export default class MoreInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 'initial',
      stepperStep: 0,
      progress: 0,
      values:{} 
    };
  }
  componentDidMount(){
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
    console.log()
  };

  render() {

    const { navigation } = this.props;
    const { stepperStep, step } = this.state;
    console.log(stepperStep);
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
          <View style={ styles.container }>
          <View style={{flex: 1}}>
              <TouchableOpacity  style={{paddingLeft:7}}  onPress={() => this.changeStep(stepperStep - 1)}>
                  <Image source={require('../../../assets/icons/header-back.png')} style={styles.image}/>
              </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
              <Text style={styles.text}>LET'S GO</Text>
          </View>
          <View style={{flex: 1}} />
      </View>
        )}
        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
            <Formik
              innerRef={this.formikRef}
              initialValues={{
                degrees: [],
                xP: '',
                spécialities: [],
                gymPlace:[],
                avatar: '',
              }}
              onSubmit={(values, actions) =>{
              const  data = {...values ,...this.props.navigation.state.params.item }
              try {
                auth(data).then(()=>{navigate('Login')})
              } catch (error) {
                console.log(error,'data',data);
              }
             
               } }>
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
                      height:hp(70),
                      justifyContent:'space-between',
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
                  <View >
                    {isSubmitting ? (
                      <ActivityIndicator />
                    ) : (
                      <View>
                        <Button
                         customTextStyle={{fontFamily:'RobotoBold',fontSize:17}}
                          title="Suivant"
                          onPress={
                            inputs[inputs.length - 1] &&
                            stepperStep === inputs.length - 1
                              ? handleSubmit
                              : () => this.changeStep(stepperStep + 1)
                          }
                          disabled={Object.keys(errors).some((v) =>
                            inputs[stepperStep].name.includes(v),
                          )}/>
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
    marginBottom: 29
   
},
image: {marginLeft:10,height: 20.54, width: 12.33, resizeMode: 'contain'},
textContainer: {alignItems: 'center', flex: 6},
text: {  fontStyle: 'italic', fontWeight: '800', fontSize: 22, color: '#FFFFFF', lineHeight: 24}
});
