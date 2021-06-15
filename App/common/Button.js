import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import ResponsiveText from './ResponsiveText';
import Color from '../configs/design/color';
import { LinearGradient } from 'expo';
import {Spinner} from 'native-base'

export default class Button extends React.Component {
  render() {
    const fontSize = this.props.textStyle && this.props.textStyle.fontSize ?
      this.props.textStyle.fontSize :
      undefined;
    const disabled_colors = this.props.colors ? this.props.colors : ['#68C8C7', '#79D8CC', '#95E4CB']
    const colors = this.props.colors ? this.props.colors : ['#68C8C7', '#79D8CC', '#95E4CB']
    return (
      <TouchableOpacity style={this.props.style}
                        disabled={this.props.disabled}
                        onPress={this.props.onPress}>
        <LinearGradient
          colors={this.props.disabled ? disabled_colors : colors}
          style={[styles.gradientStyle, this.props.gradientStyle]}
        >
          <View

            style={[styles.ButtonStyle, this.props.containerStyle]}
          >

            {
              this.props.leftIcon && !this.props.loading &&
              <View style={[styles.leftStyle, this.props.leftIconStyle]}>
                {this.props.leftIcon}
              </View>
            }
            {
              this.props.loading ? <Spinner size={'small'} color={'white'}/> :
                this.props.text &&
                <ResponsiveText style={[styles.textStyle, this.props.textStyle]} fontSize={fontSize}>
                  {this.props.text}
                </ResponsiveText>
            }
            {
              this.props.right && !this.props.loading &&
              <View style={[styles.leftStyle, this.props.rightIconStyle]}>
                {this.props.right}
              </View>
            }
          </View>
        </LinearGradient>
      </TouchableOpacity>

    );
  }
}

const styles = {

  gradientStyle: {
    borderRadius: 20,
    height: widthPercentageToDP('10%'),
    marginVertical: 10,
    elevation: 2,
  },
  ButtonStyle: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: Color.,
  },
  leftStyle: {},
  textStyle: {
    color: '#fff',
    fontSize: '2.5%',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
};
