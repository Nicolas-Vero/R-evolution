import React, {Component} from 'react';
import {StatusBar, TouchableOpacity, View, Platform} from 'react-native';
import Color from '../configs/design/color';
import { LinearGradient } from 'expo';


export default class AppHeader extends Component {
  render() {
    return (
      <LinearGradient
        start={{x: 1, y: 0}} end={{x: 0, y: 0}}
        colors={['#F7A1A5', '#F2878C', '#EE7379']}
        style={[styles.customStyle, this.props.containerStyle]}
      >
        <View style={styles.left}>
          {
            this.props.left &&
            <TouchableOpacity style={{padding: 10}} onPress={this.props.leftPress}>
              {this.props.left}
            </TouchableOpacity>
          }
        </View>
        <View style={[styles.body, this.props.bodyStyle]}>
          {
            this.props.body &&
            this.props.body
          }
        </View>
        <View style={[styles.right, this.props.rightStyle]}>
          {
            this.props.right &&
            <TouchableOpacity onPress={this.props.rightPress}>
              {this.props.right}
            </TouchableOpacity>
          }
        </View>
      </LinearGradient>
    );
  }
}

const styles = {
  customStyle: {
    height: Platform.OS === 'ios' ? 50 : 100,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Color.Primary,

  },
  left: {
    flex: 1,
  },
  body: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  right: {
    flex: 1,

  },
};
