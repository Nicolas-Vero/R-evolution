import React, {Component} from 'react';
import {View} from 'react-native'
import {Button, Switch} from 'native-base';
import ResponsiveText from './ResponsiveText';
import {FrenchConfig} from './FrenchCalendar';
import { FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckBox } from 'react-native-elements';
import { get_availabilities, update_availabilities } from '../api/Availabilities';
import { loadFonts } from '../configs/design/font';
export default class SwitchButton extends Component {

  componentDidMount(){
    loadFonts
  }

  getSlotTime(time) {
    let date = new Date(time);
    const day = FrenchConfig.dayNames[date.getDay()];
    const month = FrenchConfig.monthNames[date.getMonth()];
    return `${day} ${date.getDate()} ${month}`;
  }

  getSlot(time, status, item, slots, ) {
    const {disabled} = this.props;
    var handler = this.props.handler;
    return (
      <View style={styles.container}>
        <ResponsiveText style={{ fontFamily:'Roboto', fontSize: '4%',color:'white'}}>{time}</ResponsiveText>
        {status==false?<ResponsiveText style={{fontFamily:'Roboto', fontSize: '4%',color:'white'}}>Indisponible</ResponsiveText>:<ResponsiveText style={{ fontSize: '4%',color:'#2CDEE4'}}>Disponible</ResponsiveText>}
        <CheckBox

                    size={30}
                    containerStyle={{
                      paddingLeft: 0,
                      marginLeft: 0,
                      backgroundColor: 'transparent',
                      borderWidth: 0,
                    }}
                    checkedColor="#2CDEE4"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="dot-circle-o"
                    checked={status === true}
                    value={status}
                    onPress={() => {
                      update_availabilities({slots,date:item.date}).then(()=>{handler(item.date)})
                      // update_availabilities(onChangeParams).then(get_availabilities())
                    }}
                  />
      </View>
    );
  }
  render() {

  
    const item = this.props.item;
    const slot_0 = item.slot_0
    const slot_1 = item.slot_1
    const slot_2 = item.slot_2
    const slot_3 = item.slot_3
    const slot_4 = item.slot_4
    const slot_5 = item.slot_5
    const slot_6 = item.slot_6
    const slot_7 = item.slot_7
    const slot_8 = item.slot_8
    const slot_9 = item.slot_9
    const slot_10 = item.slot_10
    const slot_11 = item.slot_11
    const slot_12 = item.slot_12
    const slot_13 = item.slot_13
    const slot_14 = item.slot_14
    const slot_15 = item.slot_15
    const slot_16 = item.slot_16
    const slot_17 = item.slot_17
    const slot_18 = item.slot_18
    const slot_19 = item.slot_19
    const slot_20 = item.slot_20
    const slot_21 = item.slot_21
    const slot_22 = item.slot_22
    const slot_23 = item.slot_23

    return (
      <View>
        {/* <LinearGradient
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
  >  */}
        
        <View style={styles.slotsContainer}>
          {this.getSlot('00:00 - 00:00 ',slot_0, item, {slot_0: !slot_0})}
          {this.getSlot('01:00 - 02:00 ',slot_1, item, {slot_1: !slot_1})}
          {this.getSlot('02:00 - 03:00 ',slot_2, item, {slot_2: !slot_2})}
          {this.getSlot('03:00 - 04:00 ',slot_3 , item, {slot_3: !slot_3})}
          {this.getSlot('04:00 - 05:00 ',slot_4 , item, {slot_4: !slot_4})}
          {this.getSlot('05:00 - 06:00 ',slot_5 , item, {slot_5: !slot_5})}
          {this.getSlot('06:00 - 07:00 ',slot_6 , item, {slot_6: !slot_6})}
          {this.getSlot('07:00 - 08:00 ',slot_7 , item, {slot_7: !slot_7})}
          {this.getSlot('08:00 - 09:00 ',slot_8 , item, {slot_8: !slot_8})}
          {this.getSlot('09:00 - 10:00 ',slot_9 , item, {slot_9: !slot_9})}
          {this.getSlot('10:00 - 11:00 ',slot_10 , item, {slot_10: !slot_10})}
          {this.getSlot('11:00 - 12:00 ',slot_11 , item, {slot_11: !slot_11})}
          {this.getSlot('12:00 - 13:00 ',slot_12 , item, {slot_12: !slot_12})}
          {this.getSlot('13:00 - 14:00 ',slot_13 , item, {slot_13: !slot_13})} 
          {this.getSlot('14:00 - 15:00 ',slot_14 , item, {slot_14: !slot_14})}
          {this.getSlot('15:00 - 16:00 ',slot_15 , item, {slot_15: !slot_15})}
          {this.getSlot('16:00 - 17:00 ',slot_16 , item, {slot_16: !slot_16})}
          {this.getSlot('17:00 - 18:00 ',slot_17 , item, {slot_17: !slot_17})}
          {this.getSlot('18:00 - 19:00 ',slot_18 , item, {slot_18: !slot_18})}
          {this.getSlot('19:00 - 20:00 ',slot_19, item, {slot_19: !slot_19})}
          {this.getSlot('20:00 - 21:00 ',slot_20, item, {slot_20: !slot_20})}
          {this.getSlot('21:00 - 22:00 ',slot_21 , item, {slot_21: !slot_21})}
          {this.getSlot('22:00 - 23:00 ',slot_22 , item, {slot_22: !slot_22})}
          {this.getSlot('23:00 - 00:00 ',slot_23, item, {slot_23: !slot_23})}
        </View>
        {/* </LinearGradient> */}
      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 3
  },
  slotsContainer: {
    paddingHorizontal: 10,
  },
  timeText: {
    fontSize: '4%',
    marginVertical: 10,
    marginHorizontal: 15,
    
    
  },
  background: {
    backgroundColor: 'black',
    flex: 1,
  },
};
