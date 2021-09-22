import React from 'react';
import * as Font from 'expo-font';
import {View, Text, SafeAreaView, ImageBackground, Image, StyleSheet, Platform, StatusBar, Dimensions } from 'react-native'
import {Button} from '../../components/Button'
import { widthPercentageToDP as wp} from 'react-native-responsive-screen';
const {width} = Dimensions.get('window');

export default class Index extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        fontsLoaded: false,
      };

    async loadFonts() {
        await Font.loadAsync({
          MontserratItalic: require('../../../assets/fonts/Montserrat-Italic.ttf'),
          Montserrat: require('../../../assets/fonts/Montserrat-Regular.ttf'),
          RobotoBold: require('../../../assets/fonts/Roboto-Bold.ttf'),
        });
        this.setState({ fontsLoaded: true });
      }

      componentDidMount() {
        this.loadFonts();
      }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <ImageBackground source={require('../../../assets/images/Photo_page_accueil.jpg')}  
                style={styles.backgroundContainer}
            >
                <View style={styles.container}>
                    <SafeAreaView style={styles.safeArea} />
                    <View style={{flex: 1, marginTop:50}}>
                        <Image source={require('../../../assets/images/logo.png')} style={{ marginTop: 181,height:60,width:wp(75),  resizeMode: 'contain'}}/>
                        <Text style={styles.title}>
                            “Une évolution est une révolution{'\n'} sans en avoir l’R”
                        </Text>
                       <Text style={styles.subtitle}> -P.-H. Cami</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                          title="Rejoindre"
                          customContainerStyles={styles.registerButton}
                          customTextStyle={{color: "#393637", fontFamily:'RobotoBold',fontWeight:'bold',fontSize:17}}
                          onPress={() => navigate('SwitchAppAuth')}
                        />
                        <Button 
                          title="Se connecter"
                          customTextStyle={{color: "#FFFFFF",fontFamily:'RobotoBold',fontWeight:'bold',fontSize:17}}
                          customContainerStyles={styles.loginButton} 
                          onPress={() => navigate('SwitchApp')}
                        />
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {    
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    container: {flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.92)', alignItems: 'center'},
    safeArea: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
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
      paddingRight: 16
    },
    title: {
        color: "#FFFFFF", 
        fontWeight: '500', 
        fontSize: 18.5, 
        fontFamily:'MontserratItalic',
        fontStyle: 'italic',
        textAlign: 'center', 
        marginTop: 112
    },
    subtitle: {
        color: "#FFFFFF", 
        fontWeight: '500', 
        fontSize: 18.5, 
        fontFamily:'Montserrat',
        textAlign: 'center', 
        marginTop:10
    },
    buttonContainer: {
        flexDirection: 'row', 
        width: width, 
        justifyContent: 'space-between',
        marginBottom: 35
    },
    loginButton: {
      width: wp(43), 
        height: 52, 
        borderRadius: 10,
        borderWidth: 2, 
        fontFamily:'RobotoBold',
        marginRight: 22,
        
        borderColor: '#2CDEE4',
        backgroundColor: 'transparent'
    },
    registerButton: {
        width: wp(43), 
        height: 52, 
        backgroundColor: '#FFFFFF', 
        borderRadius: 10,
         marginLeft: 22
    }
  });