import React from "react";
import {Dimensions, View, TouchableOpacity} from 'react-native';
import Icons from "../configs/design/icon";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import ResponsiveText from "./ResponsiveText";
import 'moment/min/moment-with-locales'
import moment from "moment";
import {FrenchConfig} from "../configs/FrenchCalendar";

const {width} = Dimensions.get('window');

export default class MonthsSlider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: moment()
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
  }

  getMonth() {
    const date = new Date(this.state.date.format("LLLL"));
    return `${FrenchConfig.monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={this.onLeftPress.bind(this)}>
          {Icons.LeftTint(styles.icon)}
        </TouchableOpacity>

        <ResponsiveText style={styles.text}>{this.getMonth()}</ResponsiveText>

        <TouchableOpacity onPress={this.onRightPress.bind(this)}>
          {Icons.RightTint(styles.icon)}
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = {
  container: {
    width: width,
    backgroundColor: '#FFF0F0',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },
  icon: {height: wp('4%'), resizeMode: 'contain'},
  text: {
    fontSize: "4%",
    color: '#8D303C',
    paddingHorizontal: wp('6%')
  }
}
