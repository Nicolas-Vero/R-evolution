import React from 'react';
import { Dimensions, View, TouchableOpacity, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import 'moment/min/moment-with-locales';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
const { width } = Dimensions.get('window');

export default class MonthsSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
    };
  }

  onLeftPress() {
    let { date } = this.state;
    date.subtract(1, 'months');
    this.setState({ date });
    this.props.onChange(new Date(date.format('YYYY-MM-DD')));
    this.getDaysArrayByMonth();
  }

  onRightPress() {
    let { date } = this.state;
    date.add(1, 'months');
    this.setState({ date });
    this.props.onChange(new Date(date.format('YYYY-MM-DD')));
    this.getDaysArrayByMonth();
  }

  getMonth() {
    const date = new Date(this.state.date);
    return moment(date).format('MMMM');
  }
  getDaysArrayByMonth() {
    var daysInMonth = moment().daysInMonth();
    var arrDays = [];

    while (daysInMonth) {
      var current = moment().date(daysInMonth);

      arrDays.push(current);
      daysInMonth--;
    }
    return arrDays;
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={this.onLeftPress.bind(this)}>
            <AntDesign name="left" size={15} color="white" />
          </TouchableOpacity>

          <Text style={styles.text}>{this.getMonth().toUpperCase()}</Text>

          <TouchableOpacity onPress={this.onRightPress.bind(this)}>
            <AntDesign name="right" size={15} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    alignItems: 'center',
  },
  content: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 300,
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'MontserratBoldItalic',
    fontSize: 15,
    color: '#FFFFFF',
    marginVertical: 15,
  },
};
