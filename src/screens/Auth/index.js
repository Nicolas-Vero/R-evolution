import React from 'react'
import {View, Text, SafeAreaView, ImageBackground, Image, StyleSheet, Platform, StatusBar, Dimensions } from 'react-native'
import {Button} from '../../components/Button'
const {width} = Dimensions.get('window');

export default class Index extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ImageBackground source={require('../../../assets/images/entryBackground.png')}  
                style={styles.backgroundContainer}
            >
                <View style={styles.container}>
                    <SafeAreaView style={styles.safeArea} />
                    <View style={{flex: 1}}>
                        <Image source={require('../../../assets/images/logo.png')} style={{marginTop: 181, marginLeft: 44}}/>
                        <Text style={styles.title}>
                            “Une évolution est une révolution sans en avoir l’R”{'\n'} -P.-H. Cami
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                          title="Rejoindre"
                          customContainerStyles={styles.registerButton}
                          customTextStyle={{color: "#393637"}}
                          onPress={() => navigate('Dashboard')}
                        />
                        <Button 
                          title="Se connecter"
                          customTextStyle={{color: "#FFFFFF"}}
                          customContainerStyles={styles.loginButton} 
                          onPress={() => navigate('Login')}
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
    container: {flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.88)', alignItems: 'center'},
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
        fontSize: 15, 
        fontStyle: 'italic',
        textAlign: 'center', 
        marginTop: 112
    },
    buttonContainer: {
        flexDirection: 'row', 
        width: width, 
        justifyContent: 'space-between',
        marginBottom: 35
    },
    loginButton: {
        width: 158.4, 
        height: 48, 
        borderRadius: 10,
        borderWidth: 1, 
        marginRight: 22,
        borderColor: '#2CDEE4',
        backgroundColor: 'transparent'
    },
    registerButton: {
        width: 158.4, 
        height: 48, 
        backgroundColor: '#FFFFFF', 
        borderRadius: 10,
         marginLeft: 22
    }
  });