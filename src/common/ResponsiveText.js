import React from 'react';
import {Text} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../configs/design/color';

export default class ResponsiveText extends React.Component {
  render() {
    let fontSize = wp('4%');
    if (this.props.style && this.props.style.fontSize) {
      fontSize = wp(this.props.style.fontSize);
    } else if (this.props.fontSize) {
      fontSize = wp(this.props.fontSize);
    }
    return (
      <Text style={[styles.text, this.props.style, {fontSize}]}>{this.props.children}</Text>
    )
  }
}

const styles = {
  text: {
    color: Color.PrimaryText,
  }
};
