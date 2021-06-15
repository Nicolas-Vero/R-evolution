import React from 'react';
import {Text, View, Dimensions, TouchableOpacity} from 'react-native'
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { LinearGradient } from 'expo';
import ResponsiveText from './ResponsiveText';


const {width, height} = Dimensions.get('window');

export default class TabSwitch extends React.Component {
  renderTabs() {
    const {toggle, text} = this.props;
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={this.props.onToggleLeftPress}
          style={[styles.leftStyle, {
            backgroundColor: toggle ? '#fff' : 'transparent',
          }]}>
          <ResponsiveText style={{...styles.leftTextStyle, color: toggle ? '#68C8C7' : '#fff'}}>
            {text[0]}
          </ResponsiveText>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.onToggleRightPress}
                          style={[styles.rightStyle, {
                            backgroundColor: toggle ? 'transparent' : '#fff',
                          }]}>
          <ResponsiveText style={{...styles.rightTextStyle, color: toggle ? '#fff' : '#68C8C7'}}>
            {text[1]}
          </ResponsiveText>
        </TouchableOpacity>
      </View>
    )
  }

  renderButtons() {
    const {items, value, onChange} = this.props;
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
        {
          items.map((item, index) => {
            const backgroundColor = item === value ? 'white' : 'transparent';
            const color = item === value ? '#68C8C7' : 'white';

            return (
              <TouchableOpacity
                style={{...styles.bottomButtonItem, backgroundColor}}
                onPress={() => onChange(item)}
                key={index}>

                <ResponsiveText style={{...styles.buttonText, color}}>
                  {item}
                </ResponsiveText>

              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }

  render() {
    const {items} = this.props;
    return (
      <LinearGradient
        start={{x: 1, y: 0}} end={{x: 0, y: 0}}
        colors={['#F7A1A5', '#F2878C', '#EE7379']}
        style={[styles.container,this.props.style]}>
        {
          this.renderTabs()
        }
        {
          items &&
          this.renderButtons()
        }


      </LinearGradient>
    );
  }
}
const styles = {
  container: {
    width: width,
    // height: 60,
    paddingVertical: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    // flexDirection: 'row',
    paddingHorizontal: 15,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  leftStyle: {
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    flex: 1,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightStyle: {
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    flex: 1,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftTextStyle: {
    color: '#fff',
    fontSize: '4%'
  },
  rightTextStyle: {
    color: '#fff',
    fontSize: '4%'
  },
  bottomButtonItem: {
    flex: 1,
    borderWidth: 1,
    paddingHorizontals:5,
    borderColor: '#fff',
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
    shadowColor: '#888',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowBlur: 5,
    shadowOpacity: 0.3,
    shadowRadius: 1
  },
  buttonText: {
    color: '#fff',
    fontSize: '4%'
  }
}
