import React from "react";
import {Dimensions, View, TouchableOpacity, Text} from 'react-native'; 
import Icons from "../configs/design/icon";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import ResponsiveText from "./ResponsiveText";
import 'moment/min/moment-with-locales'
import moment from "moment";
import {FrenchConfig} from "./FrenchCalendar";
import { AntDesign } from '@expo/vector-icons'; 
const {width} = Dimensions.get('window');

export default class MonthsSlider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
    }
  }

  onLeftPress() {
    let {date} = this.state;
    date.subtract(1, 'months');
    this.setState({date});
    this.props.onChange(new Date(date.format("LLLL")));
  }

  onRightPress() {
    let {date} = this.state;
    date.add(1, 'months');
    this.setState({date});
    this.props.onChange(new Date(date.format("LLLL")));
    this.getDaysArrayByMonth();
  }

  getMonth() {
    const date = new Date(this.state.date.format("LLLL"));
    return `${FrenchConfig.monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }
  getDaysArrayByMonth() {
    var daysInMonth = moment().daysInMonth();
    var arrDays = [];
  
    while(daysInMonth) {
      var current = moment().date(daysInMonth);
      arrDays.push(current);
      daysInMonth--;
    }
    return arrDays;
  }
  render() {
    
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={this.onLeftPress.bind(this)}>
        <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>

        <ResponsiveText style={styles.text}>{this.getMonth()}</ResponsiveText>

        <TouchableOpacity onPress={this.onRightPress.bind(this)}>
        <AntDesign name="right" size={24} color="white" />
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = {
  container: {
    width: width,
    backgroundColor:'black',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {height: wp('4%'), resizeMode: 'contain'},
  text: {
    fontSize: "4%",
    color:'white',
    fontWeight:'bold',
    paddingHorizontal: wp('6%')
  }
}
