import React, {Component} from 'react';
import {View} from 'react-native'
import {Switch} from 'native-base';
import ResponsiveText from '../components/ResponsiveText';
import {FrenchConfig} from '../components/FrenchCalendar';
import { FlatList } from 'react-native';

export default class SwitchButton extends Component {

  getSlotTime(time) {
    let date = new Date(time);
    const day = FrenchConfig.dayNames[date.getDay()];
    const month = FrenchConfig.monthNames[date.getMonth()];
    return `${day} ${date.getDate()} ${month}`;
  }

  getSlot(time, status, item, onChangeParams) {
    const {disabled} = this.props;
    return (
      <View style={styles.container}>
        <ResponsiveText style={{ fontSize: '4%',color:'white'}}>{time}</ResponsiveText>
        <ResponsiveText style={{ fontSize: '4%',color:'white'}}>indisponible</ResponsiveText>
        <Switch thumbColor={'#fff'}
                disabled={disabled}
                onValueChange={() => this.props.onSlotAvailabilityChange(item.id, onChangeParams)}
                trackColor={{true: '#93D088', false: '#E26C6C'}}
                value={status}
                ios_backgroundColor={'#E26C6C'}
        />
      </View>
    );
  }
  render() {


    const item = this.props.item;

    const slot_1 = item.availabilities_slot_1
    const slot_2 = item.availabilities_slot_2
    const slot_3 = item.availabilities_slot_3
    const slot_4 = item.availabilities_slot_4
    const slot_5 = item.availabilities_slot_5
    const slot_6 = item.availabilities_slot_6
    const slot_7 = item.availabilities_slot_7
    const slot_8 = item.availabilities_slot_8
    const slot_9 = item.availabilities_slot_9
    const slot_10 = item.availabilities_slot_10
    const slot_11 = item.availabilities_slot_11
    const slot_12 = item.availabilities_slot_12
    const slot_13 = item.availabilities_slot_13
    const slot_14 = item.availabilities_slot_14
    const slot_15 = item.availabilities_slot_15
    const slot_16 = item.availabilities_slot_16
    const slot_17 = item.availabilities_slot_17
    const slot_18 = item.availabilities_slot_18
    const slot_19 = item.availabilities_slot_19
    const slot_20 = item.availabilities_slot_20
    const slot_21 = item.availabilities_slot_21
    const slot_22 = item.availabilities_slot_22
    const slot_23 = item.availabilities_slot_23
    const slot_24 = item.availabilities_slot_24
    return (
      <View>
        <ResponsiveText style={styles.timeText}>
        {/* <FlatList
            data={this.state.availabilities}
            extraData={this.state}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({item, index}) =>
              <Item />
            }
          /> */}
          {this.getSlotTime(item.date)}
        </ResponsiveText>
        <View style={styles.slotsContainer}>
          {this.getSlot('0 h - 1 h', slot_1, item, {slot_1: !slot_1})}
          {this.getSlot('1 h - 2 h', slot_2, item, {slot_2: !slot_2})}
          {this.getSlot('2 h - 3 h',slot_3 , item, {slot_3: !slot_3})}
          {this.getSlot('3 h - 4 h',slot_4 , item, {slot_4: !slot_4})}
          {this.getSlot('4 h - 5 h',slot_5 , item, {slot_5: !slot_5})}
          {this.getSlot('5 h - 6 h',slot_6 , item, {slot_6: !slot_6})}
          {this.getSlot('6 h - 7 h',slot_7 , item, {slot_7: !slot_7})}
          {this.getSlot('7 h - 8 h',slot_8 , item, {slot_8: !slot_8})}
          {this.getSlot('8 h - 9 h',slot_9 , item, {slot_9: !slot_9})}
          {this.getSlot('9 h - 10 h',slot_10 , item, {slot_10: !slot_10})}
          {this.getSlot('10 h - 11 h',slot_11 , item, {slot_11: !slot_11})}
          {this.getSlot('11 h - 12 h',slot_12 , item, {slot_12: !slot_12})}
          {this.getSlot('12 h - 13 h',slot_13 , item, {slot_13: !slot_13})}
          {this.getSlot('13 h - 14 h',slot_14 , item, {slot_14: !slot_14})}
          {this.getSlot('14 h - 15 h',slot_15 , item, {slot_15: !slot_15})}
          {this.getSlot('15 h - 16 h',slot_16 , item, {slot_16: !slot_16})}
          {this.getSlot('16 h - 17 h',slot_17 , item, {slot_17: !slot_17})}
          {this.getSlot('17 h - 18 h',slot_18 , item, {slot_18: !slot_18})}
          {this.getSlot('18 h - 19 h',slot_19 , item, {slot_19: !slot_19})}
          {this.getSlot('19 h - 20 h',slot_20 , item, {slot_20: !slot_20})}
          {this.getSlot('20 h - 21 h',slot_21 , item, {slot_21: !slot_21})}
          {this.getSlot('21 h - 22 h',slot_22 , item, {slot_22: !slot_22})}
          {this.getSlot('22 h - 23 h',slot_23 , item, {slot_23: !slot_23})}
          {this.getSlot('23 h - 00 h',slot_24 , item, {slot_24: !slot_24})}
        </View>
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
