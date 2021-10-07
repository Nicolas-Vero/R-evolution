import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
const { width } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';
import { AddButton, DeleteButton, ModifyButton } from '../components/Button';
import { FlatList } from 'react-native-gesture-handler';
import { delete_coach_offers } from '../api/Offers';
import { get_coach_offers } from '../api/Offers';
import Header from '../components/Header';
import { withNavigationFocus } from 'react-navigation';
import { widthPercentageToDP } from 'react-native-responsive-screen';
 class Offres extends React.Component {
  state = {
    offers: [],
    fontsLoaded: false,
  };
  componentDidMount() {
    get_coach_offers()
      .then((res) => res.data.offers)
      .then((res) => {
        this.setState({ offers: res });
      });
  }
  componentDidUpdate(prevProps){
      if (this.props.isFocused && prevProps.isFocused !== this.props.isFocused ) {
        get_coach_offers()
      .then((res) => res.data.offers)
      .then((res) => {
        this.setState({ offers: res });
      });
      }  
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#060606' }}>
        <SafeAreaView style={styles.safeArea} />

        <Header title="MES OFFRES" />
        <View style={{ marginVertical:20,alignItems:'center' ,}}>
          <AddButton
            title="CRÉER UNE NOUVELLE OFFRE"
            onPress={() => {
              navigate('OffreCreation');
            }}
          />
        </View>
        <View style={{alignItems:'center'}}>
          <FlatList
            style={{
            height:600
            }}
            data={this.state.offers}
            extraData={this.state}
            // onRefresh={onRefresh}
            //  refreshing={this.state.refresh}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <LinearGradient
                colors={['#101010', '#2D333C']}
                start={{
                  x: 1,
                  y: 1,
                }}
                end={{
                  x: 0,
                  y: 0,
                }}
                style={{
                  marginBottom: 10,
                  borderRadius:10,
                  width:widthPercentageToDP(94),
                  paddingLeft: 20,
                  marginLeft:6,
                  height: 170,
                 // justifyContent:"space-evenly"
                }}>
                <View>
                  <Text
                    style={{
                     marginTop:20,
                      fontSize: 20,
                      color: '#FFFFFF',
                      fontFamily:'Montserrat',
                      lineHeight: 24,
                    }}>
                    {item.title}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{ marginTop: 10, color: '#FFFFFF', fontSize: 12 }}>
                    {item.content}
                  </Text>
                </View>
                <View>
                  <Text style={{ marginTop: 15, color: '#2CDEE4' }}>
                    {item.nb_credits} coaching(s)
                  </Text>
                </View>
                <View
                  style={{
                   
                    alignItems:"center",
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop:15
                  }}>
                  <View
                    style={{
                    
                      alignItems:'center',
                      flexDirection: 'row',

                    }}>
                    <ModifyButton
                      title="Modifier"
                      onPress={() => {
                        navigate('OffreUpdate', {item});
                      }}></ModifyButton>
                    <DeleteButton onPress={()=>{delete_coach_offers({offer_id:item.id}).then(()=>{get_coach_offers().then(()=>{get_coach_offers().then((res) => res.data.offers).then((res) => {this.setState({ offers: res });});})})}} title="Supprimer"></DeleteButton>
                  </View>
                  <Text
                    style={{
                      fontStyle: 'italic',
                     fontWeight: '800',
                      fontSize: 22,
                      color: '#2CDEE4',
                      marginRight:15
                    }}>
                    {item.price}€
                  </Text>
                </View>
              </LinearGradient>
            )}
          />
        </View>
      </View>
    );
  }
}
export default withNavigationFocus(Offres);

const styles = StyleSheet.create({
  image: {
    width: width,
  },
  container: {
    height: 48,
    backgroundColor: '#2CDEE4',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: '#000000',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
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
