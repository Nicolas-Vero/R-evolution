import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
const { width } = Dimensions.get('window');
import {
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export const Button = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.loading}>
      {props.loading ? (
        <ActivityIndicator size="large" color="#2CDEE4" />
      ) : (
        <View
          style={{ ...defaultStyle.container, ...props.customContainerStyles }}>
          <Text style={{ ...defaultStyle.textStyle, ...props.customTextStyle }}>
            {props.title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
export const AddButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.loading}>
      {props.loading ? (
        <ActivityIndicator size="large" color="#2CDEE4" />
      ) : (
        <View
          style={{
            ...defaultStyle.Offercontainer,
            ...props.customContainerStyles,
          }}>
          <Entypo
            name="squared-plus"
            size={27}
            color="black"
            style={{ marginRight: 18 }}
          />
          <Text
            style={{
              ...defaultStyle.textStyleAddButton,
              ...props.customTextStyle,
            }}>
            {props.title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
export const ModifyButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.loading}>
      {props.loading ? (
        <ActivityIndicator size="large" color="#2CDEE4" />
      ) : (
        <View
          style={{
            ...defaultStyle.Modifycontainer,
            ...props.customContainerStyles,
          }}>
          <Text style={{ ...defaultStyle.textStyle, ...props.customTextStyle }}>
            {props.title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export const DeleteButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.loading}>
      {props.loading ? (
        <ActivityIndicator size="large" color="#2CDEE4" />
      ) : (
        <View
          style={{
            ...defaultStyle.Deletecontainer,
            ...props.customContainerStyles,
          }}>
          <Text
            style={{
              ...defaultStyle.deletetextStyle,
              ...props.customTextStyle,
            }}>
            {props.title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const defaultStyle = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#2CDEE4',
    borderRadius: 3,
    width: wp(92),
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'row',
  },
  Offercontainer: {
    height: 52,
    backgroundColor: '#2CDEE4',
    width: widthPercentageToDP(94),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  Modifycontainer: {
    height: 30,
    backgroundColor: 'green',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,

    marginRight: 10,
  },
  Deletecontainer: {
    height: 30,
    borderWidth: 1,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    borderColor: 'white',
    paddingRight: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  textStyleAddButton: {
    color: '#000000',
    fontWeight: '800',
    fontStyle: 'italic',
    marginLeft: 10,
    marginRight: 80,
  },
  deletetextStyle: {
    color: 'white',
  },
});
