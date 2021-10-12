import * as Font from 'expo-font';


export const loadFonts = async () =>{
    await Font.loadAsync({
      MontserratBold: require('../../../assets/fonts/Montserrat-ExtraBold.ttf'),
      MontserratBoldItalic: require('../../../assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
      MontserratMedium: require('../../../assets/fonts/Montserrat-Medium.ttf'),
      MontserratSemiBold: require('../../../assets/fonts/Montserrat-SemiBold.ttf'),
      Montserrat: require('../../../assets/fonts/Montserrat-Regular.ttf'),
      Roboto: require('../../../assets/fonts/Roboto-Regular.ttf'),
      RobotoItalic: require('../../../assets/fonts/Roboto-Italic.ttf'),
      RobotoBold: require('../../../assets/fonts/Roboto-Bold.ttf'),
      RobotoMedium: require('../../../assets/fonts/Roboto-Medium.ttf'),
    });

  }
