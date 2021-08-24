import React, {Component} from 'react';
import {View} from 'react-native'
import {Button, Switch} from 'native-base';
import ResponsiveText from './ResponsiveText';
import {FrenchConfig} from './FrenchCalendar';
import { FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckBox } from 'react-native-elements';
import { get_availabilities, update_availabilities } from '../api/Availabilities';
export default class SwitchButton extends Component {

  getSlotTime(time) {
    let date = new Date(time);
    const day = FrenchConfig.dayNames[date.getDay()];
    const month = FrenchConfig.monthNames[date.getMonth()];
    return `${day} ${date.getDate()} ${month}`;
  }

  getSlot(time, status, item, onChangeParams, ) {
    const {disabled} = this.props;
    return (
      <View style={styles.container}>
        <ResponsiveText style={{ fontSize: '4%',color:'white'}}>{time}</ResponsiveText>
        {status==false?<ResponsiveText style={{ fontSize: '4%',color:'white'}}>indisponible</ResponsiveText>:<ResponsiveText style={{ fontSize: '4%',color:'#2CDEE4'}}>Disponible</ResponsiveText>}
        <CheckBox

                    size={40}
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
                      console.log(status)
                      update_availabilities(onChangeParams).then(get_availabilities())
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
        <LinearGradient
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
  > 
        
        <View style={styles.slotsContainer}>
          {this.getSlot('00:00 h - 00:00 h',slot_0, item, {slot_0: !slot_0})}
          {this.getSlot('01:00 h - 02:00 h',slot_1, item, {slot_1: !slot_1})}
          {this.getSlot('02:00 h - 03:00 h',slot_2, item, {slot_2: !slot_2})}
          {this.getSlot('03:00 h - 04:00 h',slot_3 , item, {slot_3: !slot_3})}
          {this.getSlot('04:00 h - 05:00 h',slot_4 , item, {slot_4: !slot_4})}
          {this.getSlot('05:00 h - 06:00 h',slot_5 , item, {slot_5: !slot_5})}
          {this.getSlot('06:00 h - 07:00 h',slot_6 , item, {slot_6: !slot_6})}
          {this.getSlot('07:00 h - 08:00 h',slot_7 , item, {slot_7: !slot_7})}
          {this.getSlot('08:00 h - 09:00 h',slot_8 , item, {slot_8: !slot_8})}
          {this.getSlot('09:00 h - 10:00 h',slot_9 , item, {slot_9: !slot_9})}
          {this.getSlot('10:00 h - 11:00 h',slot_10 , item, {slot_10: !slot_10})}
          {this.getSlot('11:00 h - 12:00 h',slot_11 , item, {slot_11: !slot_11})}
          {this.getSlot('12:00 h - 13:00 h',slot_12 , item, {slot_12: !slot_12})}
          {this.getSlot('13:00 h - 14:00 h',slot_13 , item, {slot_13: !slot_13})} 
          {this.getSlot('14:00 h - 15:00 h',slot_14 , item, {slot_14: !slot_14})}
          {this.getSlot('15:00 h - 16:00 h',slot_15 , item, {slot_15: !slot_15})}
          {this.getSlot('16:00 h - 17:00 h',slot_16 , item, {slot_16: !slot_16})}
          {this.getSlot('17:00 h - 18:00 h',slot_17 , item, {slot_17: !slot_17})}
          {this.getSlot('18:00 h - 19:00 h',slot_18 , item, {slot_18: !slot_18})}
          {this.getSlot('19:00 h - 20:00 h',slot_19, item, {slot_19: !slot_19})}
          {this.getSlot('20:00 h - 21:00 h',slot_20, item, {slot_20: !slot_20})}
          {this.getSlot('21:00 h - 22:00 h',slot_21 , item, {slot_21: !slot_21})}
          {this.getSlot('22:00 h - 23:00 h',slot_22 , item, {slot_22: !slot_22})}
          {this.getSlot('23:00 h - 00:00 h',slot_23, item, {slot_23: !slot_23})}
        </View>
        </LinearGradient>
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
    paddingVertical: 10
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
