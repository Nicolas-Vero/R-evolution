import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { get_book, update_availabilities } from '../api/Availabilities';
import { isEmpty } from 'lodash-es';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';

export default class SwitchButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookOfDay: [],
      currentBook: {},
      day: '',
      disable: false,
    };
  }
  componentDidMount() {
    this.setState({ day: moment().format('YYYY-MM-DD') });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.day !== prevProps.item.date) {
      get_book(this.props.item.date).then((res) => {
        var filterarray = [];
        res.data.forEach((element) => {
          filterarray.push({
            slot: element.slot,
            athlete: element.athlete,
          });
        });
        this.setState({ bookOfDay: filterarray });
      });
      this.setState({ day: this.props.item.date });
      this.setState({ disable: prevProps.day < prevProps.today });
    }
  }

  daybooked(currentSlot) {
    let currentBook = {};
    this.state.bookOfDay.forEach((day) => {
      if (currentSlot === day.slot) {
        currentBook = day.athlete;
      }
    });
    return currentBook;
  }

  async test(slots, item) {
    const req = await update_availabilities({
      slots,
      date: item.date,
    });
    this.props.handler && this.props.handler(item.date);
    // update_availabilities(onChangeParams).then(get_availabilities())
  }
  getSlot(time, status, item, slots) {
    var handler = this.props.handler;
    const currentBook = this.daybooked(
      parseInt(Object.keys(slots)[0].substring(5)),
    );
    const { disable } = this.state;
    return (
      <View style={styles.container}>
        <Text style={[styles.text, { color: disable ? '#979797' : '#FFF' }]}>
          {time}
        </Text>
        {status == false ? (
          isEmpty(currentBook) ? (
            <Text
              style={[styles.text, { color: disable ? '#979797' : '#FFF' }]}>
              Indisponible
            </Text>
          ) : (
            <View>
              <TouchableOpacity
                style={styles.userContainer}
                onPress={() => this.props.onAthletePress(currentBook)}>
                <Avatar
                  size={22}
                  rounded
                  source={{
                    uri: '/Users/nicolas/ReactNative/Revolution/R_evolution/assets/images/avatar.png',
                  }}
                />
                <Text
                  style={
                    styles.username
                  }>{`${currentBook.first_name} ${currentBook.last_name}`}</Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          <TouchableOpacity
            disabled={disable}
            onLongPress={() => this.props.onLinePress(time)}>
            <Text
              style={[
                styles.textColored,
                { color: disable ? '#979797' : '#2CDEE4' },
              ]}>
              Disponible
            </Text>
          </TouchableOpacity>
        )}
        <CheckBox
          disabled={this.state.disable}
          size={22}
          containerStyle={styles.checkBox}
          checkedColor="#2CDEE4"
          checkedIcon="dot-circle-o"
          uncheckedIcon="dot-circle-o"
          checked={status === true || !isEmpty(currentBook)}
          uncheckedColor={disable ? '#979797' : '#fff'}
          value={status}
          onPress={() => this.test(slots, item)}
        />
      </View>
    );
  }
  render() {
    const item = this.props.item;
    const slot_0 = item.slot_0;
    const slot_1 = item.slot_1;
    const slot_2 = item.slot_2;
    const slot_3 = item.slot_3;
    const slot_4 = item.slot_4;
    const slot_5 = item.slot_5;
    const slot_6 = item.slot_6;
    const slot_7 = item.slot_7;
    const slot_8 = item.slot_8;
    const slot_9 = item.slot_9;
    const slot_10 = item.slot_10;
    const slot_11 = item.slot_11;
    const slot_12 = item.slot_12;
    const slot_13 = item.slot_13;
    const slot_14 = item.slot_14;
    const slot_15 = item.slot_15;
    const slot_16 = item.slot_16;
    const slot_17 = item.slot_17;
    const slot_18 = item.slot_18;
    const slot_19 = item.slot_19;
    const slot_20 = item.slot_20;
    const slot_21 = item.slot_21;
    const slot_22 = item.slot_22;
    const slot_23 = item.slot_23;

    return (
      <View>
        <View style={styles.slotsContainer}>
          {this.getSlot('00:00 - 01:00', slot_0, item, { slot_0: !slot_0 })}
          {this.getSlot('01:00 - 02:00', slot_1, item, { slot_1: !slot_1 })}
          {this.getSlot('02:00 - 03:00', slot_2, item, { slot_2: !slot_2 })}
          {this.getSlot('03:00 - 04:00', slot_3, item, { slot_3: !slot_3 })}
          {this.getSlot('04:00 - 05:00', slot_4, item, { slot_4: !slot_4 })}
          {this.getSlot('05:00 - 06:00', slot_5, item, { slot_5: !slot_5 })}
          {this.getSlot('06:00 - 07:00', slot_6, item, { slot_6: !slot_6 })}
          {this.getSlot('07:00 - 08:00', slot_7, item, { slot_7: !slot_7 })}
          {this.getSlot('08:00 - 09:00', slot_8, item, { slot_8: !slot_8 })}
          {this.getSlot('09:00 - 10:00', slot_9, item, { slot_9: !slot_9 })}
          {this.getSlot('10:00 - 11:00', slot_10, item, { slot_10: !slot_10 })}
          {this.getSlot('11:00 - 12:00', slot_11, item, { slot_11: !slot_11 })}
          {this.getSlot('12:00 - 13:00', slot_12, item, { slot_12: !slot_12 })}
          {this.getSlot('13:00 - 14:00', slot_13, item, { slot_13: !slot_13 })}
          {this.getSlot('14:00 - 15:00', slot_14, item, { slot_14: !slot_14 })}
          {this.getSlot('15:00 - 16:00', slot_15, item, { slot_15: !slot_15 })}
          {this.getSlot('16:00 - 17:00', slot_16, item, { slot_16: !slot_16 })}
          {this.getSlot('17:00 - 18:00', slot_17, item, { slot_17: !slot_17 })}
          {this.getSlot('18:00 - 19:00', slot_18, item, { slot_18: !slot_18 })}
          {this.getSlot('19:00 - 20:00', slot_19, item, { slot_19: !slot_19 })}
          {this.getSlot('20:00 - 21:00', slot_20, item, { slot_20: !slot_20 })}
          {this.getSlot('21:00 - 22:00', slot_21, item, { slot_21: !slot_21 })}
          {this.getSlot('22:00 - 23:00', slot_22, item, { slot_22: !slot_22 })}
          {this.getSlot('23:00 - 00:00', slot_23, item, { slot_23: !slot_23 })}
        </View>
      </View>
    );
  }
}

const styles = {
  button: {
    backgroundColor: '#2CDEE4',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  text: {
    fontSize: 15,
    color: '#FFF',
    fontFamily: 'Roboto',
  },
  textColored: {
    fontSize: 15,
    color: '#2CDEE4',
    fontFamily: 'Roboto',
  },
  slotsContainer: {
    paddingHorizontal: 16,
  },
  checkBox: {
    zIndex: 1,
    margin: 0,
    padding: 0,
    paddingLeft: 0,
    marginLeft: 0,
  },
  userContainer: {
    backgroundColor: '#2CDEE4',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 3,
    borderRadius: 6,
  },
  username: {
    fontSize: 11,
    fontFamily: 'RobotoMedium',
    marginLeft: 12,
  },
};
