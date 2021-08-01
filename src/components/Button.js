import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';
const {width} = Dimensions.get('window');
export const Button = (props) => {
    return (
    <TouchableOpacity onPress={props.onPress} disabled={props.loading}>
        {
            props.loading ? (
                <ActivityIndicator  size="large" color="#2CDEE4"/>
            ) : (
                <View style={{...defaultStyle.container, ...props.customContainerStyles}}>
                <Text style={{...defaultStyle.textStyle, ...props.customTextStyle}}>{props.title}</Text>
              </View>
            )

        }
    </TouchableOpacity>
    )
}
export const AddButton = (props) => {
    return (
    <TouchableOpacity onPress={props.onPress} disabled={props.loading}>
        {
            props.loading ? (
                <ActivityIndicator  size="large" color="#2CDEE4"/>
            ) : (
                <View style={{...defaultStyle.container, ...props.customContainerStyles}}>
                     <Entypo name="squared-plus" size={24} color="black" />
                <Text style={{...defaultStyle.textStyle, ...props.customTextStyle}}>{props.title}</Text>
              </View>
            )

        }
    </TouchableOpacity>
    )
}

const defaultStyle = StyleSheet.create({
    container: { 
        height: 48, 
        backgroundColor: '#2CDEE4', 
        borderRadius: 3, 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection:'row',
        marginLeft:10,
        marginRight:10
    },
    textStyle: {
        color: "#000000"
    }
})