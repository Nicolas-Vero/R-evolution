import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

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

const defaultStyle = StyleSheet.create({
    container: {
        width: 343, 
        height: 48, 
        backgroundColor: '#2CDEE4', 
        borderRadius: 3, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    textStyle: {
        color: "#FFFFFF"
    }
})