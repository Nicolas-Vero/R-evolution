import React from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Platform,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { heightPercentageToDP, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
//import { auth } from '../../api/Register';
import { Formik } from 'formik';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons'; 
import { CheckBox, Text } from 'react-native-elements';
import { Button } from '../components/Button';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { Right } from 'native-base';
import { AddOffer, get_coach_offers } from '../api/Offers';
import SelectDropdown from 'react-native-select-dropdown';
import { get_paiement_for_coach } from '../api/Paiement';
import { loadFonts } from '../configs/design/font';
//import { Slider } from 'react-native-elements';
const { width } = Dimensions.get('window');
export default class Paiements extends React.Component {
  state = {
   Offer:[],
   Paiement:[],
   paiementMode:['Virement','Espece']
  };
  componentDidMount(){
    loadFonts(),
    get_coach_offers().then((res)=>{
      this.setState({Offer:res.data})
    })
    get_paiement_for_coach().then((res) => {
      this.setState({ Paiement: res.data });
    });
  }

  async onLoginPress(values) {
    console.log(values);
  }

  createOffer(values){
    try {
      AddOffer(values).then(
        this.props.navigation.navigate('Offres')
      )
    } catch (error) {
      this.setState({loading: false});
          //alert('Please try again. ');
          console.warn(err)
    }


  }
  getErrorMessage() {
    if (this.state.errorMessage !== '')
      return (
        <ResponsiveText style={{ alignSelf: 'center', fontSize: '3.5%' }}>
          {this.state.errorMessage}
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
    return (
      <LinearGradient  colors={['#060606', '#2D333C']}
      start={{
        x: 0,
        y: 0,
      }}
      end={{
        x: 1,
        y: 1,
      }}
      style={{flex:1}}>
      
        <SafeAreaView style={styles.safeArea} />

        <Header title="Paiement" />

        <View style={{ paddingLeft: 15, paddingRight: 15 }}>
          <Formik
            initialValues={{
              name: 'Coaching',
              date: '',
              paiementMode: '',
              price: '',
            }}
            onSubmit={(values, { onLoginPress }) => onLoginPress(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
            }) => (
              <View>
                <View style={{marginBottom:50}}>
              <Text style={styles.text}>Nom de l'offre</Text>
              <SelectDropdown
                  buttonStyle={{ width: wp(90), borderRadius:5  }}
                  data={this.state.Offer}
                  defaultButtonText={"Recherche ton offre"}
                  onSelect={(selectedItem, index) => {
                   
                  }}
                  renderDropdownIcon={() => {
                    return <AntDesign name="down" size={24} color="black" />;
                  }}
                  dropdownIconPosition={'right'}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    
                    return selectedItem.name;
                  }}
                  
                  rowTextStyle={{color:'white',fontSize:15, marginRight:90}}
                  dropdownStyle={{backgroundColor:'#282C3A',borderRadius:5 }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item.name;
                  }}
                />
     
            </View>
                <View style={{ flexDirection:'row',height:60, justifyContent:'center' }}>
                  <View style={{flexDirection:'column'}}>
                  <Text style={styles.text}>Date</Text>
                  <TextInput
                    placeholder="10/20/21"
                    style={{
                      backgroundColor: '#FFFFFF',
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 15,
                      paddingRight: 15,
                      margin:2,
                      borderRadius:5,
                      flex:1
                    }}
                    onChangeText={handleChange('content')}
                    onBlur={handleBlur('content')}
                    value={values.content}
                  />
                  </View>
                  <View style={{flexDirection:'column',margin:2}}>
                    <Text style={styles.text}>Moyen de paiement</Text>
                      <SelectDropdown
                  buttonStyle={{flex:2, borderRadius:5,  }}
                  data={this.state.Offer}
                  defaultButtonText={"Mode de paiement"}
                  onSelect={(selectedItem, index) => {
                   
                  }}
                  renderDropdownIcon={() => {
                    return <AntDesign name="down" size={24} color="black" />;
                  }}
                  dropdownIconPosition={'right'}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    
                    return selectedItem.name;
                  }}
                  
                  rowTextStyle={{color:'white',fontSize:15, marginRight:90}}
                  dropdownStyle={{backgroundColor:'#282C3A',borderRadius:5 }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item.name;
                  }}
                />
                </View>
                <View>
                  <Text style={styles.text}>Prix</Text>
                 <TextInput
                    placeholder="Prix"
                    style={{
                      backgroundColor: '#FFFFFF',
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 15,
                      margin:2,
                      flex:1,
                      paddingRight: 15,
                      borderRadius:5
                    }}
                    onChangeText={handleChange('content')}
                    onBlur={handleBlur('content')}
                    value={values.content}
                  />
                  </View>
                </View>
                <TouchableOpacity 
                             
                             onPress={() => {
                              specData.push({ value: term }),
                                setTerm()
                            }}
                          >
                      <View style={{flexDirection:'row' ,alignItems:'baseline',margin:5, justifyContent:'flex-end'}}>
                          <FontAwesome name="plus-square" size={24} color="#2CDEE4" />
                          <Text style={{fontFamily: 'RobotoBold',marginLeft:10,padding:5,color:'#FFFFFF'}}>Ajouter une specialité</Text>
                          </View>
                          </TouchableOpacity>
                <View style={{marginTop:heightPercentageToDP(5)}}>

                <Text style={styles.text}>Paiement(s) enregistré(s)</Text>
                <FlatList
                style={{maxHeight:75
                }}
                data={this.state.Paiement}
                extraData={this.state}
                // onRefresh={onRefresh}
                // refreshing={this.state.refresh}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View
                  style={{
                    alignContent: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#393637',
                    height: 30,
                    marginHorizontal:10,
                    padding:5,
                    marginVertical:5,
                    borderRadius: 5,
                  }}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginHorizontal: 5,
                      }}>
                      <Text
                        style={styles.text2}>
                        {moment(item.created_at).format('L')}
                      </Text>
                      <Text
                        style={styles.text2}>
                        {item.title}
                      </Text>
                      <Text
                        style={styles.text2}>
                        {item.mode} - {item.amount}
                      </Text>
                    </View>
                  </View>
                )}
                />

                  <Text style={styles.text}>Paiement en attente</Text>
                <FlatList
                style={{maxHeight:75
                }}
                data={this.state.Paiement}
                extraData={this.state}
                // onRefresh={onRefresh}
                // refreshing={this.state.refresh}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View
                  style={{
                    alignContent: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#393637',
                    height: 30,
                    marginHorizontal:10,
                    padding:5,
                    marginVertical:5,
                    borderRadius: 5,
                  }}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginHorizontal: 5,
                      }}>
                      <Text
                        style={styles.text2}>
                        {moment(item.created_at).format('L')}
                      </Text>
                      <Text
                        style={styles.text2}>
                        {item.title}
                      </Text>
                      <Text
                        style={styles.text2}>
                        {item.mode} - {item.amount}
                      </Text>
                    </View>
                  </View>
                )}
                />
                </View>
                    
   

                <View
                  style={{
                    marginTop:150
                  }}>
                  <Button
                    style={{
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 15,
                      paddingRight: 15,
                    }}
                    loading={false}
                    title="Enregistrer le paiement"
                    onPress={()=>{this.createOffer(values)}}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: width,
  },
  text:{
    fontFamily:'RobotoBold',
    fontSize:15,
    color:'black',
    marginLeft:15,
    color:'white'
  },
  text2:{
    fontFamily:'RobotoBold',
    color:'#2CDEE4'
  },
  backgroundContainer: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.88)',
    alignItems: 'center',
  },
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
  text: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  euro: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#FFFFFF',
    marginLeft: 5,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 112,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
    marginBottom: 35,
  },
  loginButton: {
    width: 158.4,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 22,
    borderColor: '#2CDEE4',
    backgroundColor: 'transparent',
  },
  registerButton: {
    width: 158.4,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginLeft: 22,
  },
  container: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    marginTop: 45,
    marginBottom: 50,
  },
  form: {
    marginLeft: 70,
    marginRight: 30,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
});
