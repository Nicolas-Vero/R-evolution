import React from 'react';
import {Text, Image, TouchableOpacity, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP} from 'react-native-responsive-screen';
import Color from '../configs/design/color';
import ResponsiveText from './ResponsiveText';

export default class HomeGrid extends React.Component {
  getNotificationText() {
    if (this.props.notificationCount) {
      return (
        <View style={styles.notificationsView}>
          <ResponsiveText style={styles.notificationsText}>{this.props.notificationCount}</ResponsiveText>
        </View>
      );
    }
  }

  render() {
    const {icon, text} = this.props;
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
        {
          icon
        }
        <ResponsiveText style={styles.textStyle}>
          {text}
        </ResponsiveText>
        {this.getNotificationText()}

      </TouchableOpacity>
    )
  }
}

const styles = {
  container: {
    position: "relative",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: widthPercentageToDP('28%'),
    borderColor: 'rgba(244,244,244,0.5)',
    borderWidth: 1,
    borderRadius: 15,
    flexWrap: 'wrap',
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 6 },
    shadowOpacity: 0.1,
    elevation: 2,
    backgroundColor: '#ffffff'
  },
  textStyle: {
    color: '#ccc',
    textAlign: 'center',
    maxWidth: 90,
    marginTop: 5

  },
  notificationsView: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#ED6E74",
    height: widthPercentageToDP("6%"),
    width: widthPercentageToDP("6%"),
    borderRadius: widthPercentageToDP("3%"),
    justifyContent: "center",
    alignItems: "center"
  },
  notificationsText: {
    color: "#fff",
    fontSize: "3%",

  }
};
