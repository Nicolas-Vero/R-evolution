import React from 'react';
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import Pager from '../common/Carrousel';
import { Button } from '../components/Button';
import {
  TouchableOpacity,
  View,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  ActivityIndicator,
  Modal,
  ColorPropType
} from 'react-native';
import {
  athlete_booking,
  get_athlete_active_courses,
  get_availabilities,
} from '../api/Athlete';
import SwitchSelector from 'react-native-switch-selector';
import { Avatar } from 'react-native-elements';
import {loadFonts} from '../configs/design/font';
const { width } = Dimensions.get('window');
import { LocaleConfig } from 'react-native-calendars';
import MonthsSlider from '../components/MonthsSlider';
import { get_appointement, get_coach_by_id } from '../api/Coach';
import {} from '../api/Availabilities';
import { FrenchConfig } from '../components/FrenchCalendar';
import { Ionicons } from '@expo/vector-icons';
import { DeleteButton } from '../components/Button';
import { athlete_active_appointement} from '../api/Athlete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE } from '../configs/Constants';
import { ModifyButton } from '../components/Button';
import { widthPercentageToDP } from 'react-native-responsive-screen';
LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['D', 'L', 'M', 'MM', 'J', 'V', 'S'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

const monthNames = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];
const dayNames = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
];
 moment.locale('fr', {
  months:
    'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split(
      '_',
    ),
  monthsShort:
    'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
  monthsParseExact: true,
  weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
  weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
  weekdaysMin: 'D_L_M_M_J_V_S'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[Aujourd’hui à] LT',
    nextDay: '[Demain à] LT',
    nextWeek: 'dddd [à] LT',
    lastDay: '[Hier à] LT',
    lastWeek: 'dddd [dernier à] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'dans %s',
    past: 'il y a %s',
    s: 'quelques secondes',
    m: 'une minute',
    mm: '%d minutes',
    h: 'une heure',
    hh: '%d heures',
    d: 'un jour',
    dd: '%d jours',
    M: 'un mois',
    MM: '%d mois',
    y: 'un an',
    yy: '%d ans',
  },
  dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
  ordinal: function (number) {
    return number + (number === 1 ? 'er' : 'e');
  },
  meridiemParse: /PD|MD/,
  isPM: function (input) {
    return input.charAt(0) === 'M';
  },
  // In case the meridiem units are not separated around 12, then implement
  // this function (look at locale/id.js for an example).
  // meridiemHour : function (hour, meridiem) {
  //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
  // },
  meridiem: function (hours, minutes, isLower) {
    return hours < 12 ? 'PD' : 'MD';
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4, // Used to determine first week of the year.
  },
 });
const options = [
  { label: 'MES RENDEZ-VOUS', value: 'MES RENDEZ-VOUS' },
  { label: 'RESERVER', value: 'RESERVER' },
];
export default class DashboardAthlete extends React.Component {
  state = {
    refresh: false,
    screen: 'MES RENDEZ-VOUS',
    user: {
      name: 'toto',
      avatar: '../../assets/icon.png',
    },
    coach_id:'',
    coach:{},
    currentDate:'',
    modalVisible:false,
    currentAvailabilities: [],
    book:[],
    // ajouter le coach id pour pouvoir associe des dispo a un coacg
    availabilities: [],
    athleteCourse:{},
    currentSlot:'',
    dayApointement:[],
    upcomingApointement:[],
};
 async componentDidMount(){
     await loadFonts();
    var user = await AsyncStorage.getItem(STORAGE.USER);
    user  = JSON.parse(user);
    this.setState({coach_id:user.coach.coach_id})
    console.log(user.coach.coach_id);

    get_athlete_active_courses().then((res)=>{
      this.setState({athleteCourse:res.data})
    })

    get_coach_by_id(this.state.coach_id).then((res)=>{
    this.setState({coach:{id:res.data.id,first_name:res.data.first_name,last_name:res.data.last_name}})
    })
    
    athlete_active_appointement({today:true}).then((res)=>{
       this.setState({dayApointement:res.data})
      })
        console.log('dayApointement',this.state.dayApointement && this.state.dayApointement.length?console.log('iiii'):console.log('ooo'))
      
    

      athlete_active_appointement({upcoming:true}).then((res)=>{
       this.setState({upcomingApointement:res.data})
      })
      console.log('upcoming',this.state.upcomingApointement && this.state.upcomingApointement.length?console.log('toto'):console.log('bobo'))

  }
  convertSlotToDateV2(slot) {
    switch (slot) {
      case 0:
        return {slot_start:'00:00',slot_end:'01:00'} ;
        break;
      case 1:
        return {slot_start:'01:00',slot_end:'02:00'} ;
        break;
      case 2:
        return {slot_start:'02:00',slot_end:'03:00'} ;
        break;
      case 3:
        return {slot_start:'03:00',slot_end:'04:00'} ;
        break;
      case 4:
        return {slot_start:'04:00',slot_end:'05:00'} ;
        break;
      case 5:
        return {slot_start:'05:00',slot_end:'06:00'} ;
        break;
      case 6:
        return {slot_start:'06:00',slot_end:'07:00'} ;
        break;
      case 7:
        return {slot_start:'07:00',slot_end:'08:00'} ;
        break;
      case 8:
        return {slot_start:'08:00',slot_end:'09:00'} ;
        break;
      case 9:
        return {slot_start:'09:00',slot_end:'10:00'} ;
        break;
      case 10:
        return {slot_start:'10:00',slot_end:'11:00'} ;
        break;
      case 11:
        return {slot_start:'11:00',slot_end:'12:00'} ;
        break;
      case 12:
        return {slot_start:'12:00',slot_end:'13:00'} ;
        break;
      case 13:
        return {slot_start:'13:00',slot_end:'14:00'} ;
        break;
      case 14:
        return {slot_start:'14:00',slot_end:'15:00'} ;
        break;
      case 15:
        return {slot_start:'15:00',slot_end:'16:00'} ;
        break;
      case 16:
        return {slot_start:'16:00',slot_end:'17:00'} ;
        break;
      case 17:
        return {slot_start:'17:00',slot_end:'18:00'} ;
        break;
      case 18:
        return {slot_start:'18:00',slot_end:'19:00'} ;
        break;
      case 19:
        return {slot_start:'19:00',slot_end:'10:00'} ;
        break;
      case 20:
        return {slot_start:'20:00',slot_end:'11:00'} ;
        break;
      case 21:
        return {slot_start:'21:00',slot_end:'12:00'} ;
        break;
      case 22:
        return {slot_start:'22:00',slot_end:'13:00'} ;
        break;
      case 23:
        return {slot_start:'23:00',slot_end:'00:00'} ;
        break;
      default:
        break;
    }
  }

  convertSlotToDate(slot) {
    switch (slot) {
      case 0:
        return '00:00 - 01:00';
        break;
      case 1:
        return '01:00 - 02:00';
        break;
      case 2:
        return '02:00 - 03:00';
        break;
      case 3:
        return '03:00 - 04:00';
        break;
      case 4:
        return '04:00 - 05:00';
        break;
      case 5:
        return '05:00 - 06:00';
        break;
      case 6:
        return '06:00 - 07:00';
        break;
      case 7:
        return '07:00 - 08:00';
        break;
      case 8:
        return '08:00 - 09:00';
        break;
      case 9:
        return '09:00 - 10:00';
        break;
      case 10:
        return '10:00 - 11:00';
        break;
      case 11:
        return '11:00 - 12:00';
        break;
      case 12:
        return '12:00 - 13:00';
        break;
      case 13:
        return '13:00 - 14:00';
        break;
      case 14:
        return '14:00 - 15:00';
        break;
      case 15:
        return '15:00 - 16:00';
        break;
      case 16:
        return '16:00 - 17:00';
        break;
      case 17:
        return '17:00 - 18:00';
        break;
      case 18:
        return '18:00 - 19:00';
        break;
      case 19:
        return '19:00 - 20:00';
        break;
      case 20:
        return '20:00 - 21:00';
        break;
      case 21:
        return '21:00 - 22:00';
        break;
      case 22:
        return '22:00 - 23:00';
        break;
      case 23:
        return '23:00 - 00:00';
        break;
      default:
        break;
    }
  }



  getSlotTime(time) {
    let date = new Date(time);
    const day = FrenchConfig.dayNames[date.getDay()];
    const month = FrenchConfig.monthNames[date.getMonth()];
    return `${day} ${date.getDate()} ${month}`;
  }
  getDate(date = new Date()) {

   return  moment(date).format('YYYY-MM-DD');
  }

  handleRefresh = () => {
    this.setState({ refreshing: true });
  };

  fetchData = () => {
    dispatch(getAllDataAction(userParamData));
    setIsFetching(false);
  };

  show(item) {
    const params = {
      availability_date: item.availability_date,
      coachId: item.coachId,
    };
    get_availabilities(params)
      .then((res) => {
        this.setState({ currentAvailabilities: res });
        this.setState({ currentAvailabilities: res[0] });
      })
      .catch((error) => {
        console.log('Api call error');
        alert(error.message);
      });

    this.setState({ currentAvailabilities: item });
    this.setState({ refresh: !this.state.refresh });
  }
  getDaysArrayByMonth(date) {
    var daysInMonth = moment(date, 'DD-MM').daysInMonth();
    var arrDays = [];
    while (daysInMonth && daysInMonth >= 1) {
      var current = moment(date, 'DD-MM').date(daysInMonth);
      arrDays.push(current);
      daysInMonth--;
    }
    return arrDays.reverse();
  }
  getAvailabilities(item) {
    const  date  = moment(item.availability).format('YYYY-MM-DD')
   const  params = {date:date,coach_id:this.state.coach_id}
   get_availabilities(params).then((res)=>{
    
     const availabilitiesArray =[];
    const data =[
     {slot:0,value:res.data.slot_0},
     {slot:1,value:res.data.slot_1},
     {slot:2,value:res.data.slot_2},
     {slot:3,value:res.data.slot_3},
     {slot:4,value:res.data.slot_4},
     {slot:5,value:res.data.slot_5},
     {slot:6,value:res.data.slot_6},
     {slot:7,value:res.data.slot_7},
     {slot:8,value:res.data.slot_8},
     {slot:9,value:res.data.slot_9},
     {slot:10,value:res.data.slot_10},
     {slot:11,value:res.data.slot_11},
     {slot:12,value:res.data.slot_12},
     {slot:13,value:res.data.slot_13},
     {slot:14,value:res.data.slot_14},
     {slot:15,value:res.data.slot_15},
     {slot:16,value:res.data.slot_16},
     {slot:17,value:res.data.slot_17},
     {slot:18,value:res.data.slot_18},
     {slot:19,value:res.data.slot_19},
     {slot:20,value:res.data.slot_20},
     {slot:21,value:res.data.slot_21},
     {slot:22,value:res.data.slot_22},
     {slot:23,value:res.data.slot_23},
   ]
   data.forEach(element => {
     if(element.value==true){
      availabilitiesArray.push(element)
     }
    });
     this.setState({currentAvailabilities:availabilitiesArray})
     this.setState({ refresh: !this.state.refresh });
     console.log(this.state.currentAvailabilities)
   })
  }
  onMonthChange(date) {
    var item = [];
    var ArrayOfday = this.getDaysArrayByMonth(this.getDate(date));

    ArrayOfday.forEach((element) => {
     const  elementdaynum = moment(element).format('dd');
     const elementday = moment(element).format('D');
      element=  moment(element).format('YYYY-MM-DD')
      var Object = {
        availability_day: elementdaynum,
        availability_day_num : elementday,
        availability:element

      };
      item.push(Object);
    });
    this.setState({ availabilities: item });
  }
  
  async changeTaskList(date) {

    
    const formatdata = {
      date: date.dateString,
    };
    const curDate = moment(date.dateString).format('L')
    console.log('curr',curDate)
    this.setState({currentDate:curDate})
    get_appointement(formatdata).then((res) => {
     
      const arrayOfAppointment = res.data;
      const arrayOfPage = [];
      arrayOfAppointment.forEach((rdv) => {
        arrayOfPage.push(
          <TouchableOpacity onPress={()=>{console.log(rdv)}}>
          <View style={{flexDirection:'row',justifyContent:'space-around',alignContent:'center'}}key={rdv.id}>
            <View style={{justifyContent:'center',alignItems:'center'}}><Avatar
                size="medium"
                rounded
                source={{
                  uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
                }}
              /></View>
            <View style={{flexDirection:'column',marginRight:40}}>
              <View style={{flexDirection:'row'}}>
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>{rdv.athlete.first_name}</Text>
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>{rdv.athlete.last_name}</Text>
            </View>
            <Text>seance{rdv.session_number}/{rdv.athleteCourse.total_sessions}</Text>
            </View>
            <View style={{justifyContent:'center'}}>
              <Text style={{
                  fontWeight: 'bold',
                  fontSize: 20,}} >{this.convertSlotToDate(rdv.slot)}</Text>
            </View>
          </View>
          </TouchableOpacity>
          ,
        );
      });
      this.setState({ page: arrayOfPage });
      // console.log(this.state.page);
    });
  }
 
  render() {
    
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <SafeAreaView>
          
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar
                size="medium"
                rounded
                source={{
                  uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
                }}
              />
              <Text
                style={{
                  marginLeft: 20,
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: '#FFFFFF',
                  lineHeight: 24,
                }}>
                {this.state.user.name}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  navigate('Activite');
                }}
                style={{ marginLeft: 20, marginRight: 10 }}>
                <Ionicons
                  name="md-notifications-circle"
                  size={35}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: 20,
              borderBottomColor: '#2CDEE4',
              borderBottomWidth: 0.5,
              marginBottom: 35,
            }}></View>
          <View>
            <View style={{justifyContent:'center',alignItems:'center'}}>
              <SwitchSelector
                options={options}
                initial={0}
                onPress={(value) => this.setState({ screen: value })}
                backgroundColor="#1E2026"
                buttonColor="#2CDEE4"
                selectedColor="#1E2026"
                textColor="white"
                borderRadius={10}
                height={60}
                style={{width:widthPercentageToDP(95)}}
                hasPadding
                fontSize={15}
                selectedTextStyle={{fontFamily:'MontserratBoldItalic'}}
                textStyle={{fontFamily:'MontserratBoldItalic'}}
                valuePadding={3}
                borderColor="#1E2026"
              />
            </View>
            <View>{/*TO DO: passe les jours en francais  */}</View>
            {this.state.screen == 'MES RENDEZ-VOUS' ? (
              <View>
                <View style={{ alignItems: 'center' }}>
                  <Text
                    style={{
                      fontFamily:'MontserratBoldItalic',
                      fontSize: 25,
                      color: '#FFFFFF',
                      margin: 10,
                    }}>
                   AUJOURD'HUI
                  </Text>
                </View>
                {this.state.dayApointement && this.state.dayApointement.length? (
                    <FlatList
                    data={this.state.dayApointement}
                    extraData={this.state}
                    // onRefresh={onRefresh}
                    refreshing={this.state.refresh}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={()=>{console.log(item)}}
                      
                      >
                      <View style={{backgroundColor:'#2CDEE4', flexDirection:'row',height:70,justifyContent:'space-around',alignContent:'center',margin:10,borderRadius:5}}>
                        <View style={{justifyContent:'center',alignItems:'center'}}><Avatar
                            size={65}
                            rounded
                            source={{
                              uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
                            }}
                          /></View>
                        <View style={{justifyContent:'center',flexDirection:'column',marginRight:40}}>
                          <View style={{flexDirection:'row'}}> 
                            <Text style={{
                           fontFamily:'RobotoBold',
                              fontSize: 25,
                              marginBottom:5
                            }}>{item.athlete.first_name} {item.athlete.last_name}</Text>
                        </View>
                        <Text style={{ 
                           fontFamily:'Roboto',
                              fontSize: 10,
                              marginBottom:15
                            }}>Séance: {item.session_number}/{item.athleteCourse.total_sessions}</Text>
                        </View>
                        <View style={{justifyContent:'center'}}>
                          <Text style={{
                              fontWeight: 'bold',
                              fontSize: 20,}} >{this.convertSlotToDate(item.slot)}</Text>
                        </View>
                      </View>
                      </TouchableOpacity>
                    )}
                  /> 
                ) : (
                  <Text  style={{
                   fontFamily:'MontserratBoldItalic',
                    fontSize: 20,
                    color: '#FFFFFF',
                    margin: 10,
                  }}>pas de rendez-vous Aujourd'hui</Text>
                )}
                  <View style={{ alignItems: 'center' }}>
                  <Text
                    style={{
                      fontFamily:'MontserratBoldItalic',
                      fontSize: 25,
                      color: '#FFFFFF',
                      margin: 20,
                    }}>
                   À VENIR
                  </Text>
                </View>
                {this.state.upcomingApointement && this.state.upcomingApointement.length? (
                <FlatList
                data={this.state.upcomingApointement}
              extraData={this.state}
              // onRefresh={onRefresh}
              refreshing={this.state.refresh}
              keyExtractor={(item) => item.id}
              renderItem={({ item,index,separators }) => (
                <TouchableOpacity 
                onPress={()=>{console.log(item)}}>
                <View style={{flexDirection:'row',justifyContent:'space-around',alignContent:'center',backgroundColor:'#1E2026',margin:10,  borderRadius:5,}}>
                  <View style={{height:70, justifyContent:'center',alignItems:'center',}}><Avatar
                      size="medium"
                      rounded
                      source={{
                        uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
                      }}
                    /></View>
                  <View style={{
                    justifyContent:'center',
                    flexDirection:'column',marginRight:40}}>
                    <View style={{ flexDirection:'row'}}> 
                      <Text style={{
                        
                        fontWeight: 'bold',
                        fontSize: 17,
                        color:'white'
                      }}>{item.athlete.first_name}</Text>
                      <Text style={{
                        fontWeight: 'bold',
                        fontSize: 17,
                        color:'white'
                      }}>{item.athlete.last_name}</Text>
                  </View>
                  <Text style={{  fontSize: 12,  color:'white'}}>Séance : {item.session_number}/{item.athleteCourse.total_sessions}</Text>
                  </View>
                  <View style={{justifyContent:'center'}}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 15,
                        color:'white'
                        }} >{this.convertSlotToDate(item.slot)}</Text>
                  </View>
                </View>
                </TouchableOpacity>
              )}
            />
              
                  ) : (
                    <Text style={{
                      fontFamily:'MontserratBoldItalic',
                      fontSize: 20,
                      color: '#FFFFFF',
                      margin: 10,
                    }}> pas de rendez-vous Aujourd'hui</Text>
                )}
              </View>
            ) : (
              <View>

                <View style={{ height: 800 }}>
                <LinearGradient
                colors={['black', '#2D333C']}
                start={{
                  x: 0,
                  y: 0,
                }}
                end={{
                  x: 1,
                  y: 1,
                }}
                style={{
                  backgroundColor: 'black',
                  flex:1,
                 // justifyContent:"space-evenly"
                }}>
                  <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          setModalVisible(!this.state.modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{marginTop:30}}>        
               <Text style={{fontFamily:'Roboto',color:'white'}}>Es-tu sûr(e) de vouloir annuler la séance avec </Text> 
               <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
               <Text style={{fontFamily:'Roboto',color:'#2CDEE4'}}>{this.state.coach.first_name} {this.state.coach.last_name}</Text> 
               <Text style={{fontFamily:'Roboto',color:'white'}}>de</Text>
               <Text style={{fontFamily:'Roboto',color:'#2CDEE4'}}>{this.state.currentSlot.substring(0,5)}</Text>
               <Text style={{fontFamily:'Roboto',color:'white'}}>a</Text>
               <Text style={{fontFamily:'Roboto',color:'#2CDEE4'}}>{this.state.currentSlot.substring(8)}</Text>
               <Text style={{fontFamily:'Roboto',color:'white'}}>?</Text>
            </View>
            </View>
            <View style={{flexDirection:'row',marginTop:40}}>
            <Button
                          title="Oui"
                          customContainerStyles={{backgroundColor:'white',height:30, width:100,margin:5}}
                          customTextStyle={{color: "black", fontFamily:'RobotoBold',fontWeight:'bold',fontSize:10}}
                          onPress={() => {athlete_booking(this.state.book)}}
                        />
              <Button
                          title="Non"
                          customContainerStyles={{backgroundColor:'white',height:30, width:100,margin:5}}
                          customTextStyle={{color: "black", fontFamily:'RobotoBold',fontWeight:'bold',fontSize:10}}
                          onPress={() => this.setState({modalVisible:false})}
                        />
            </View>
          </View>
        </View>
      </Modal>
      <MonthsSlider onChange={this.onMonthChange.bind(this)} />
                    <View style={{margin:30, flexDirection:'row'}}>
                      <Text style={{color: '#FFFFFF'}}>Les diponibilités de </Text>
                      <Text style={{color: '#2CDEE4'}}>{this.state.coach.first_name}</Text>
                      <Text style={{color: '#2CDEE4'}}>{this.state.coach.last_name}</Text>
                    </View>
                    <View>
                      <FlatList
                        horizontal={true}
                        data={this.state.availabilities}
                        extraData={this.state}
                        // onRefresh={onRefresh}
                        refreshing={this.state.refresh}
                        keyExtractor={(item) => item.date}
                        renderItem={({ item }) => {
                         
                          // const backgroundColor = item.availability === this.state.selectedDate ? "#2CDEE4" : "#101010";
                           const backgroundColor = item.availability === this.state.selectedDate ? "#2CDEE4" : "#1E2026";
                           const textColor = item.availability === this.state.selectedDate ? "black" : "white";
                           return (
                             <TouchableOpacity
                               onPress={() => {
                                 this.setState({selectedDate:item.availability})
                                 this.getAvailabilities(item)
                               
                               }}>
                           <View style={[styles.day, {backgroundColor:backgroundColor}]}>
                               <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                               <Text style={{ color:textColor,justifyContent:'center',alignItems:'center',alignContent:'center' }}>
                                 {item.availability_day}
                               </Text>
                               <Text style={{ color:textColor, marginTop:10,justifyContent:'center',alignItems:'center',alignContent:'center' }}>
                                 {item.availability_day_num}
                               </Text>
                               </View>
                           </View>
                             </TouchableOpacity>
                           )
                         }}
                      />
                      <View style={{margin:30}}><Text style={{color: '#FFFFFF'}}>Tu peux annuler une séance jusqu'à 24h avant le début de celle-ci.</Text></View>
                      <FlatList
                        style={{ maxHeight: 550 }}
                        data={this.state.currentAvailabilities}
                        extraData={this.state}
                        //onRefresh={onRefresh}
                        refreshing={this.state.refresh}
                        keyExtractor={(item) => {item.slot}}
                        renderItem={({ item }) => (
                          <View style={{flexDirection:'row',justifyContent:'space-around',margin:10}}>
                          <Text style={{color: '#FFFFFF'}}>{ this.convertSlotToDate(item.slot)}</Text>
                          <DeleteButton  onPress={()=>{
                            console.log('itemm',this.state.selectedDate)
                            this.setState({currentSlot:this.convertSlotToDate(item.slot)})
                            const bookInformation = {date:this.state.selectedDate, coach_id:this.state.coach_id,currentSlot:item.slot,athlete_course_id:this.state.athleteCourse.id}
                            console.log('itemm',bookInformation)
                            this.setState({book:bookInformation})
                            this.setState({modalVisible:true})
                            }} title="Réserver ce crénaux"></DeleteButton>
                          </View>
                        )}
                      />
                    </View>
               
            </LinearGradient>
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  listonebyone: {},
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#1E2026",
    borderRadius: 20,
    padding: 35,
    height:200,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    padding: 10,
    elevation: 2,
    color:'white'

  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  ccontainer: {},
  item: {
    backgroundColor: '#2CDEE4',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  items: {
    flex: 1,
    borderRadius: 25,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  calendar: {
    borderRadius: 30,
    padding: 10,
    marginRight: 10,
    marginTop: 20,
  },
  background: {
    backgroundColor: 'black',
   
  },
  day: {
    height: 80,
    width: 50,
    backgroundColor: '#2D333C',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
