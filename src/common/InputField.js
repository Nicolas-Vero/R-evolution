import React from 'react';
import {StyleSheet, TouchableOpacity, Text, TextInput, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../configs/design/color';
import ResponsiveText from './ResponsiveText';


export default class InputField extends React.Component {

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

  onSubmit() {
    this.field.blur();
    this.props.onSubmitEditing && this.props.onSubmitEditing();
  }

  render() {

    const fixedHeight = this.props.label ? {} : {height: 40};
    const editableTextColor = this.props.editable === false ? Color.Placeholder : Color.PrimaryText;
    return (
      <View style={[styles.container, fixedHeight, this.props.containerStyle]}>
        {
          this.props.leftIcon &&
          <View style={[styles.leftStyle, this.props.leftStyle]}>
            {this.props.leftIcon}
          </View>
        }
        <View style={{flex: 1, flexDirection: "column", alignItems: "flex-start"}}>
          {
            this.props.label &&
            <View>
              <Text style={{
                fontSize: wp('4%'),
                color: Color.SecondaryText,
                fontWeight: '500',
              }}>
                {
                  this.props.label
                }
              </Text>
            </View>
          }
          <TextInput
            disabled={this.props.disabled}
            ref={ref => this.field = ref}
            autoCorrect={false}
            autoCapitalize='none'
            onChangeText={this.props.onChangeText}
            style={[styles.inputField, this.props.inputField, {color: editableTextColor}]}
            placeholder={this.props.placeholder}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={this.props.placeholderTextColor || Color.Placeholder}
            value={this.props.value}
            keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
            secureTextEntry={this.props.secureTextEntry ? this.props.secureTextEntry : false}
            multiline={this.props.multiline}
            numberOfLines={this.props.numberOfLines ? 5 : 1}
            onBlur={this.onBlur.bind(this)}
            onFocus={this.onFocus.bind(this)}
            editable={this.props.editable}
            returnKeyType={this.props.returnKeyType}
            onSubmitEditing={this.onSubmit.bind(this)}
          />
        </View>

        {
          this.props.rightIcon &&
          <TouchableOpacity style={[this.props.rightStyle, styles.rightStyle]} onPress={this.props.onRightPress}>
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
    paddingHorizontal: 10,
    borderRadius: 25,
    borderColor: Color.Placeholder,
    borderWidth: 1
  },
  leftStyle: {
    paddingHorizontal: 10,
  },
  inputField: {
    flex: 1,
    width: '100%',
    fontSize: wp('4%'),
    fontWeight: '300',
    color: Color.PrimaryText,
  },
  inputLabel: {
    color: '#969696',
    fontSize: wp('4%'),

  }
})
