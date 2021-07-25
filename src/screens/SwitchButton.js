import React, {Component} from 'react';
import {View} from 'react-native'
import {Switch} from 'native-base';
import ResponsiveText from '../components/ResponsiveText';
import {FrenchConfig} from '../components/FrenchCalendar';
import { FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
        {status==false?<ResponsiveText style={{ fontSize: '4%',color:'white'}}>indisponible</ResponsiveText>:<ResponsiveText style={{ fontSize: '4%',color:'white'}}>Dispo</ResponsiveText>}
        <Switch thumbColor={'#fff'}
                disabled={disabled}
               onValueChange={() => this.props.onSlotAvailabilityChange(item.availability_id, onChangeParams)}
              //  onValueChange={() => console.log('iiiiiiii',item.availability_id, onChangeParams)}
                trackColor={{true: '#93D088', false: '#E26C6C'}}
                value={status}
                ios_backgroundColor={'#E26C6C'}
        />
      </View>
    );
  }
  render() {


    const item = this.props.item;
    console.log(item)
    const availability_slot_1 = item.availability_slot_1
    const availability_slot_2 = item.availability_slot_2
    const availability_slot_3 = item.availability_slot_3
    const availability_slot_4 = item.availability_slot_4
    const availability_slot_5 = item.availability_slot_5
    const availability_slot_6 = item.availability_slot_6
    const availability_slot_7 = item.availability_slot_7
    const availability_slot_8 = item.availability_slot_8
    const availability_slot_9 = item.availability_slot_9
    const availability_slot_10 = item.availability_slot_10
    const availability_slot_11 = item.availability_slot_11
    const availability_slot_12 = item.availability_slot_12
    const availability_slot_13 = item.availability_slot_13
    const availability_slot_14 = item.availability_slot_14
    const availability_slot_15 = item.availability_slot_15
    const availability_slot_16 = item.availability_slot_16
    const availability_slot_17 = item.availability_slot_17
    const availability_slot_18 = item.availability_slot_18
    const availability_slot_19 = item.availability_slot_19
    const availability_slot_20 = item.availability_slot_20
    const availability_slot_21 = item.availability_slot_21
    const availability_slot_22 = item.availability_slot_22
    const availability_slot_23 = item.availability_slot_23
    const availability_slot_24 = item.availability_slot_24
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
        <ResponsiveText style={styles.timeText}>
          {this.getSlotTime(item.date)}
        </ResponsiveText>
        <View style={styles.slotsContainer}>
          {this.getSlot('0 h - 1 h', availability_slot_1, item, {availability_slot_1: !availability_slot_1})}
          {this.getSlot('1 h - 2 h', availability_slot_2, item, {availability_slot_2: !availability_slot_2})}
          {this.getSlot('2 h - 3 h',availability_slot_3 , item, {availability_slot_3: !availability_slot_3})}
          {this.getSlot('3 h - 4 h',availability_slot_4 , item, {availability_slot_4: !availability_slot_4})}
          {this.getSlot('4 h - 5 h',availability_slot_5 , item, {availability_slot_5: !availability_slot_5})}
          {this.getSlot('5 h - 6 h',availability_slot_6 , item, {availability_slot_6: !availability_slot_6})}
          {this.getSlot('6 h - 7 h',availability_slot_7 , item, {availability_slot_7: !availability_slot_7})}
          {this.getSlot('7 h - 8 h',availability_slot_8 , item, {availability_slot_8: !availability_slot_8})}
          {this.getSlot('8 h - 9 h',availability_slot_9 , item, {availability_slot_9: !availability_slot_9})}
          {this.getSlot('9 h - 10 h',availability_slot_10 , item, {availability_slot_10: !availability_slot_10})}
          {this.getSlot('10 h - 11 h',availability_slot_11 , item, {availability_slot_11: !availability_slot_11})}
          {this.getSlot('11 h - 12 h',availability_slot_12 , item, {availability_slot_12: !availability_slot_12})}
          {this.getSlot('12 h - 13 h',availability_slot_13 , item, {availability_slot_13: !availability_slot_13})}
          {this.getSlot('13 h - 14 h',availability_slot_14 , item, {availability_slot_14: !availability_slot_14})} 
          {this.getSlot('14 h - 15 h',availability_slot_15 , item, {availability_slot_15: !availability_slot_15})}
          {this.getSlot('15 h - 16 h',availability_slot_16 , item, {availability_slot_16: !availability_slot_16})}
          {this.getSlot('16 h - 17 h',availability_slot_17 , item, {availability_slot_17: !availability_slot_17})}
          {this.getSlot('17 h - 18 h',availability_slot_18 , item, {availability_slot_18: !availability_slot_18})}
          {this.getSlot('18 h - 19 h',availability_slot_19 , item, {availability_slot_19: !availability_slot_19})}
          {this.getSlot('19 h - 20 h',availability_slot_20 , item, {availability_slot_20: !availability_slot_20})}
          {this.getSlot('20 h - 21 h',availability_slot_21 , item, {availability_slot_21: !availability_slot_21})}
          {this.getSlot('21 h - 22 h',availability_slot_22 , item, {availability_slot_22: !availability_slot_22})}
          {this.getSlot('22 h - 23 h',availability_slot_23 , item, {availability_slot_23: !availability_slot_23})}
          {this.getSlot('23 h - 00 h',availability_slot_24, item, {availability_slot_24: !availability_slot_24})}
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
    backgroundColor: 'black'
  },
  timeText: {
    fontSize: '4%',
    marginVertical: 10,
    marginHorizontal: 15,
    
    
  }
};
