import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {nav, colors} from '../../styles/index';
import {StackActions} from 'react-navigation';

export default class BackButton extends Component {
  constructor(props) {
    super(props);

    this.handleBackPress = this.handleBackPress.bind(this);
  }

  handleBackPress() {
    const {navigation} = this.props;
    // navigation.goBack(null);
    navigation.navigate('Dashboard');
  }

  render() {
    return (
      <View style={nav.backButton}>
        <TouchableOpacity onPress={this.handleBackPress}>
          <Icon name="cross" size={30} color={colors.otrageous} />
        </TouchableOpacity>
      </View>
    );
  }
}
