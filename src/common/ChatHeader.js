import React, {Component} from 'react';
import {StatusBar, Image, TouchableOpacity, View} from 'react-native';
import Color from '../configs/design/color';
import { LinearGradient } from 'expo';
import ResponsiveText from './ResponsiveText';


export default class ChatHeader extends Component {
  render() {
    const {newMission} = this.props;

    return (
      <LinearGradient
        start={{x: 1, y: 0}} end={{x: 0, y: 0}}
        colors={['#F7A1A5', '#F2878C', '#EE7379']}
        style={[styles.customStyle, this.props.containerStyle]}
      >
        {
          this.props.left &&
          <TouchableOpacity style={{padding: 10}} onPress={this.props.leftPress}>
            {this.props.left}
          </TouchableOpacity>
        }
        {
          <View style={{marginHorizontal: 10}}>
            <Image
              source={{uri: this.props.avatar}}
              style={{width: 50, height: 50, borderRadius: 25}}
            />
          </View>
        }
        <View style={[styles.body, this.props.bodyStyle]}>
          {
            this.props.body &&
            this.props.body
          }
        </View>
        {
          this.props.rightText &&
          <TouchableOpacity style={{
            marginRight: 10
          }} onPress={this.props.rightPress}>
            <ResponsiveText style={{fontSize: '4%', color: '#fff', fontWeight: '400'}}>
              {newMission.name}
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontSize: '3.5%',
                color: '#fff',
                fontWeight: '400',
                textAlign: 'right'
              }}>
              {newMission.price}
            </ResponsiveText>

          </TouchableOpacity>
        }


      </LinearGradient>
    );
  }
}
const styles = {
  customStyle: {
    // height: 50,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Color.Primary,
    paddingVertical: 20
  },
  left: {
    flex: 1,

  },
  body: {
    flex: 1,
  },
  right: {
    flex: 1,

  },
};
