import {createAppContainer, createSwitchNavigator} from 'react-navigation';
// Auth import
import AppTabsNavigator from './Dashbord/AppTabsNavigator';
import AuthStack from './AuthStack';
import DashboardStack from './DashboardStack';


// Auth bottom tabs menu
// const AuthTabsNavigator = createStackNavigator(
//   {
//     AuthEntry: {
//       screen: AuthEntry,
//       navigationOptions: {
//         header: null,
//       },
//     },
//     Login: {
//       screen: Login,
//       navigationOptions: {
//         tabBarLabel: 'Sign in',
//         tabBarIcon: ({tintColor}) => (
//           <Ionicons  size={20} color={tintColor} />
//         ),
//         header: null,
//       },
//     },
//     RegisterInfo: {
//       screen: RegisterInfo,
//       navigationOptions: {
//         tabBarLabel: 'Sign up',
//         tabBarIcon: ({tintColor}) => (
//           <Ionicons  size={20} color={tintColor} />
//         ),
//         header: null,
//       },
//     },
//     MoreInfo: {
//       screen: MoreInfo,
//       navigationOptions: {
//         tabBarLabel: 'Sign up',
//         tabBarIcon: ({tintColor}) => (
//           <Ionicons  size={20} color={tintColor} />
//         ),
//         header: null,
//       },
//     },
//     AddAvatar: {
//       screen: AddAvatar,
//       navigationOptions: {
//         tabBarLabel: 'Sign up',
//         tabBarIcon: ({tintColor}) => (
//           <Ionicons  size={20} color={tintColor} />
//         ),
//       },
//     },
//     RegisterInfo: {
//       screen: RegisterInfo,
//       navigationOptions: {
//         tabBarLabel: 'Sign up',
//         tabBarIcon: ({tintColor}) => (
//           <Ionicons  size={20} color={tintColor} />
//         ),
//         header: null,
//       },
//     },

//   },
//   {
//     lazy: true,
//     initialRouteName: 'AuthEntry',
//     swipeEnabled: true,
//     animationEnabled: true,
//     tabBarPosition: 'bottom',
//     navigationOptions: {
//       tabBarVisible: false,
//       headerVisible: false,
//       animationEnabled: true,
//     },
//  //   tabBarComponent: props => <CustomMainTabBar {...props} main={false} />,
//     tabBarOptions: {
//       activeTintColor: 'white',
//       inactiveTintColor: 'grey',
//       showIcon: true,
//       allowFontScaling: false,
//     },
//   },
// );

// const OffresStack = createStackNavigator(
//   {
//     OffresFormations: {
//       screen: OffresFormations,
//       navigationOptions: {
//         header: null,
//       },
//     },
//     Offres: {
//       screen: Offres,
//       navigationOptions: {
       
//         tabBarIcon: ({tintColor}) => (
//           <Ionicons  size={20} color={tintColor} />
//         ),
//         header: null,
//       },},
//     OffreCreation: {
//       screen: OffreCreation,
//       navigationOptions: {
//         tabBarIcon: ({tintColor}) => (
//           <Ionicons  size={20} color={tintColor} />
//         ),
//         header: null,
//       },
//     },
//   },
//   {
//     lazy: true,
//     initialRouteName: 'OffresFormations',
//     swipeEnabled: true,
//     animationEnabled: true,

//   },
// );


// // Main app bottom tabs menu
// const AppTabsNavigator = createBottomTabNavigator(
//   {
//     Dashboard: {
//       screen: Dashboard,
//       navigationOptions: {
//         tabBarLabel: 'Dashboard',
//         tabBarIcon: ({tintColor}) => (
//          <Image source={require('../../assets/images/Calendar.png')}
//                 style={{height: 24, resizeMode: 'contain', tintColor}}
//          />
//         ),
//       },
//     },
//     OffresStack: {
//       screen: OffresStack,
//       navigationOptions: {
//         tabBarLabel: 'Dashboard',
//         tabBarIcon: ({tintColor}) => (
//           <Image source={require('../../assets/images/Category.png')}
//           style={{height: 24, resizeMode: 'contain', tintColor}}
//    />
//         ),
//       },
//     },
//     User: {
//       screen: User,
//       navigationOptions: {
//         tabBarLabel: 'Dashboard',
//         tabBarIcon: ({tintColor}) => (
//           <Image source={require('../../assets/images/User.png')}
//           style={{height: 24, resizeMode: 'contain', tintColor}}
//    />
//         ),
//       },
//     },
//     stat: {
//       screen: Stats,
//       navigationOptions: {

//         tabBarIcon: ({tintColor}) => (
//           <Image source={require('../../assets/images/Chart.png')}
//                 style={{height: 24, resizeMode: 'contain', tintColor}}
//          />
//         ),
//       },
//     },
//   },
//   {
//     lazy: true,
//     initialRouteName:'Dashboard',
//     swipeEnabled: true,
   
//     animationEnabled: true,
//     tabBarPosition: 'bottom',
//     navigationOptions: {
//       tabBarVisible: false,
//       animationEnabled: true,
//     },
//    // tabBarComponent: props => <CustomMainTabBar {...props} main={true} />,
//     tabBarOptions: {
//       activeTintColor: '#2CDEE4',
//       inactiveTintColor: 'grey',
//       showIcon: true,
//       showLabel: false,
//       allowFontScaling: false,
//       style:{backgroundColor:'#2D333C'}
//     },
//   },
// );

const App = createSwitchNavigator(
  {
    // Loading: EntryScreen,
   //App: AppTabsNavigator,
    Auth: AuthStack,
    DashboardStack:DashboardStack,
    
  },
  {
    initialRouteName:'Auth',
  },
);

export default createAppContainer(App);
