import * as Font from 'expo-font';


export const loadFonts = async () =>{
    await Font.loadAsync({
      MontserratBold: require('../../../assets/fonts/Montserrat-ExtraBold.ttf'),
      MontserratBoldItalic: require('../../../assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
      Montserrat: require('../../../assets/fonts/Montserrat-Regular.ttf'),
      Roboto: require('../../../assets/fonts/Roboto-Regular.ttf'),
      RobotoBold: require('../../../assets/fonts/Roboto-Bold.ttf'),
    });

  }
