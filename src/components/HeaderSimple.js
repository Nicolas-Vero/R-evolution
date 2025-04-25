import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const HeaderSimple = ({ title }) => {
    return (
        <View style={defaultStyle.container}>
            <View style={defaultStyle.textContainer}>
                <Text style={defaultStyle.text}>{title}</Text>
            </View>
        </View>
    );
};

export default HeaderSimple;

const defaultStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: width,
        height: 49,
        marginBottom: 29,
    },
    textContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
    },
    text: {
        fontStyle: 'italic',
        fontWeight: '800',
        fontSize: 22,
        color: '#FFFFFF',
        lineHeight: 24,
    },
});
