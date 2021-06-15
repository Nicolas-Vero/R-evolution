import React from 'react';
import {StyleSheet, TouchableOpacity, Text, TextInput, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../configs/design/color';


export default class AuthInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
  }

  onFocus() {
    this.setState({active: true});
    if (this.props.onFocus)
      this.props.onFocus();
  }

  onBlur() {
    this.setState({active: false});
    if (this.props.onBlur)
      this.props.onBlur();
  }

  render() {
    return (

      <View style={[styles.container, this.props.containerStyle]}>
        {
          <View style={[this.props.leftStyle, styles.leftStyle]}>
            {
              this.props.leftIcon &&

              this.props.leftIcon
            }
          </View>
        }
        <View style={{
          flex: 1, borderColor: Color.Placeholder,
          borderBottomWidth: 1,
        }}>
          {
            this.props.label &&
            <Text style={{
              fontSize: wp('4%'),
              color: Color.SecondaryText,
              fontWeight: '500',
            }}>
              {
                this.props.label
              }
            </Text>
          }
          <TextInput
            autoCorrect={false}
            onChangeText={this.props.onChangeText}
            style={[styles.inputField, this.props.inputField]}
            placeholder={this.props.placeholder}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={Color.SecondaryText}
            value={this.props.value}
            keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
            secureTextEntry={this.props.secureTextEntry ? this.props.secureTextEntry : false}
            multiline={this.props.multiline}
            numberOfLines={this.props.numberOfLines ? 5 : 1}
            onBlur={this.onBlur.bind(this)}
            onFocus={this.onFocus.bind(this)}
            editable={this.props.editable}
            returnKeyType={this.props.search}
            onSubmitEditing={this.props.onSubmit}
          />
        </View>

        {
          this.props.rightIcon &&
          <TouchableOpacity style={[this.props.rightStyle, styles.rightStyle]}>
            {this.props.rightIcon}
          </TouchableOpacity>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 10,
    height: 40
  },
  leftStyle: {
   
    marginHorizontal: 10,
  },
  inputField: {
    flex: 1,
    fontSize: wp('4%'),
    fontWeight: '300',
    color: Color.PrimaryText,
  },
  inputLabel: {
    color: '#969696',
    fontSize: wp('4%'),

  }
})
