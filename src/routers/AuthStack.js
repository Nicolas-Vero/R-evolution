import {createStackNavigator} from 'react-navigation-stack';
//import Register from '../screens/Auth/Register';
//import Login from '../screens/Authentication/Login';
//import Color from '../configs/design/color';
import RegisterInfo from '../screens/Auth/RegisterInfo';
// import AddPhoto from '../screens/Auth/AddPhoto';
// import AddGym from '../screens/Auth/AddGym';
// import AddDegrees from '../screens/Auth/AddDegrees';
// import AddSpecialities from '../screens/Auth/AddSpecialities';
// import AddXp from '../screens/Auth/AddXp';

//import ResetPassword from "../screens/Authentication/ResetPassword";

const AuthStack = createStackNavigator(
  {
    // Login: {
    //     screen: Login,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    RegisterInfo: {
      screen:RegisterInfo,
      navigationOptions: {
        header: null
      }
    },
    // Register: {
    //   screen: Register,
    //   navigationOptions: {
    //     header: null
    //   }},
      
    //   AddDegrees: {
    //     screen: AddDegrees,
    //     navigationOptions: {
    //       header: null
    //     }},   
    //     AddXp: {
    //       screen: AddXp,
    //       navigationOptions: {
    //         header: null
    //       }},   
    //       AddSpecialities: {
    //         screen: AddSpecialities,
    //         navigationOptions: {
    //           header: null
    //         }},

    //         AddSpecialities: {
    //           screen: AddSpecialities,
    //           navigationOptions: {
    //             header: null
    //           }},
    //          AddGym: {
    //           screen: AddGym,
    //           navigationOptions: {
    //             header: null
    //           }},
              
    //           AddPhoto: {
    //             screen: AddPhoto,
    //             navigationOptions: {
    //               header: null
    //             }},
    //             // Support: {
    //             //     screen: Support,
                
    //             // },
    //             ResetPassword: ResetPassword
               },
              {
                initialRouteName: 'RegisterInfo',
                // cardStyle: {
                //   backgroundColor: Color.BackgroundColor
                // }
              }
              );
              
              export default AuthStack;
